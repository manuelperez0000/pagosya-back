import express from 'express';
import { getChats, createChat } from './controller.js';
import validateToken from '../../midelwares/validateToken.js';

const router = express.Router();

router.get('/', validateToken, getChats);
router.post('/', validateToken, createChat);

export default router;
