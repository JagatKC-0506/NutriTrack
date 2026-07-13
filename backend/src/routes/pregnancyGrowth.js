import express from 'express';
import {
  getRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from '../controllers/pregnancyGrowthController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/pregnancy-growth/records
 * Get all pregnancy weight records for the current user
 */
router.get('/records', authenticateToken, getRecords);

/**
 * POST /api/pregnancy-growth/records
 * Create a new pregnancy weight record
 * Body: { week, weight_kg, record_date?, notes? }
 */
router.post('/records', authenticateToken, createRecord);

/**
 * GET /api/pregnancy-growth/records/:recordId
 * Get a specific pregnancy weight record
 */
router.get('/records/:recordId', authenticateToken, getRecord);

/**
 * PUT /api/pregnancy-growth/records/:recordId
 * Update a pregnancy weight record
 */
router.put('/records/:recordId', authenticateToken, updateRecord);

/**
 * DELETE /api/pregnancy-growth/records/:recordId
 * Delete a pregnancy weight record
 */
router.delete('/records/:recordId', authenticateToken, deleteRecord);

export default router;