import { GoogleGenAI } from "@google/genai";

export const generateAnswer = async (
  question,
  retrievedChunks
) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const context = retrievedChunks
    .map((item, index) => {
      return `Context ${index + 1}:\n${item.chunk}`;
    })
    .join("\n\n");

  const prompt = `
Answer the question using only the provided context.

If the answer is not available in the context,
say that the information was not found
in the uploaded document.

Do not invent facts.

Context:
${context}

Question:
${question}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt
  });

  return response.text;
};