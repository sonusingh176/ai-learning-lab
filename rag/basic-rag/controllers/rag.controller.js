import { getDocument } from "../services/document.store.js";
import { retrieveChunks } from "../services/retrieval.service.js";
import { generateAnswer } from "../services/generation.service.js";

export const chatWithDocument = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    // Validate request
    if (!documentId || !question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "documentId and question are required"
      });
    }

    // Get uploaded document
    const document = getDocument(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found. Please upload the PDF again."
      });
    }

    // Retrieve relevant chunks
    const retrievedChunks = retrieveChunks(
      question,
      document.chunks
    );

    if (retrievedChunks.length === 0) {
      return res.status(200).json({
        success: true,
        answer: "The information was not found in the uploaded document.",
        sources: []
      });
    }

    // Generate answer using Gemini
    const answer = await generateAnswer(
      question,
      retrievedChunks
    );

    return res.status(200).json({
      success: true,
      answer,
      sources: retrievedChunks.map((item) => ({
        chunkIndex: item.index,
        score: item.score,
        text: item.chunk
      }))
    });

  } catch (error) {
    console.error("RAG chat error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate answer"
    });
  }
};