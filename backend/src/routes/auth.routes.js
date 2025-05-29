import express from 'express';
import { registerUser, loginUser, getUserProfile, verifyToken } from '../controller/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);
router.get('/verify', authMiddleware, verifyToken);

export default router;
