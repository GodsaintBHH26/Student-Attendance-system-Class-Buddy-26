import express from 'express';
import { regUser, logUser } from '../controller/authController.js';

const router = express.Router();

router.post('/register', regUser);
router.post('/login', logUser);

export default router;