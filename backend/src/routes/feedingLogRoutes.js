import express from 'express';
import {
  getFeedingLogs,
  createFeedingLog,
  getFeedingLog,
  updateFeedingLog,
  deleteFeedingLog,
  getFeedingLogsSummary,
} from '../controllers/feedingLogController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/logs', authenticateToken, getFeedingLogs);
router.post('/logs', authenticateToken, createFeedingLog);
router.get('/logs/summary', authenticateToken, getFeedingLogsSummary);
router.get('/logs/:logId', authenticateToken, getFeedingLog);
router.put('/logs/:logId', authenticateToken, updateFeedingLog);
router.delete('/logs/:logId', authenticateToken, deleteFeedingLog);

export default router;
