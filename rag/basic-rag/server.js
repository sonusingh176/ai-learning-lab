import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import documentRoutes from "./routes/document.routes.js";
import ragRoutes from "./routes/rag.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

// Document routes
app.use("/api/documents", documentRoutes);

// New RAG chat API
app.use("/api/rag", ragRoutes);

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RAG backend is running",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
