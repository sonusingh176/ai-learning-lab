import express from "express";
import upload from "../config/multer.js";

import {
  uploadDocument,
} from "../controllers/document.controller.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("document"),
  uploadDocument
);

export default router;

/**
 * Understand 
 * upload.single("document"):
   It tells Multer to accept one uploaded file with the field name document.

 */
