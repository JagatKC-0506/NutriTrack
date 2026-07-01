import express from 'express';
import {
  getHospitalVisits,
  createHospitalVisit,
  getHospitalVisit,
  updateHospitalVisit,
  deleteHospitalVisit,
} from '../controllers/hospitalVisitController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET /api/hospital-visits
 * Get all hospital visit logs for the current user (optional ?baby_id=)
 */
router.get('/', authenticateToken, getHospitalVisits);

/**
 * POST /api/hospital-visits
 * Create a new hospital visit log
 */
router.post('/', authenticateToken, createHospitalVisit);

/**
 * GET /api/hospital-visits/:visitId
 */
router.get('/:visitId', authenticateToken, getHospitalVisit);

/**
 * PUT /api/hospital-visits/:visitId
 */
router.put('/:visitId', authenticateToken, updateHospitalVisit);

/**
 * DELETE /api/hospital-visits/:visitId
 */
router.delete('/:visitId', authenticateToken, deleteHospitalVisit);

export default router;
