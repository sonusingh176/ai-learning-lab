import express from "express";

import { chatWithDocument } from "../controllers/rag.controller.js";

const router = express.Router();

router.post("/chat", chatWithDocument);

export default router;