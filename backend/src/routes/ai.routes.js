import express from 'express';
import { generateContent } from '../controller/ai.controller.js';
import { chatWithThinkMate } from '../controller/thinkmate.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes - requires authentication
router.post('/generate', authMiddleware, generateContent);
router.post('/chat', authMiddleware, chatWithThinkMate);

export default router;
