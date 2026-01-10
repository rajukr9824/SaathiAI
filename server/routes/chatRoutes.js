import express from "express";
import { chat } from "../controllers/chatController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/chat/message
router.post("/message", auth, chat);

export default router;
