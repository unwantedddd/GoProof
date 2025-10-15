import { Router } from 'express';
import { logIn, signUp, logOut, getMe } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/signup', signUp);

router.post('/login', logIn);

router.post('/logout', logOut);

router.get('/me', authMiddleware, getMe);

export default router;