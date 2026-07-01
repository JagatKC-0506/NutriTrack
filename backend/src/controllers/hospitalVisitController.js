import { HospitalVisit, Baby } from '../models/index.js';

/**
 * GET /api/hospital-visits
 * Get all hospital visit logs for the current user (optionally filtered by baby_id)
 */
export const getHospitalVisits = async (req, res) => {
  try {
    const userId = req.user.id;
    const { baby_id } = req.query;

    const where = { user_id: userId };
    if (baby_id) {
      where.baby_id = baby_id;
    }

    const visits = await HospitalVisit.findAll({
      where,
      order: [['visit_date', 'DESC']],
    });

    return res.json(visits);
  } catch (error) {
    console.error(`Error fetching hospital visits: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching hospital visits' });
  }
};

/**
 * GET /api/hospital-visits/:visitId
 */
export const getHospitalVisit = async (req, res) => {
  try {
    const { visitId } = req.params;
    const userId = req.user.id;

    const visit = await HospitalVisit.findOne({
      where: { id: visitId, user_id: userId },
    });

    if (!visit) {
      return res.status(404).json({ detail: 'Hospital visit not found' });
    }

    return res.json(visit);
  } catch (error) {
    console.error(`Error fetching hospital visit: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching hospital visit' });
  }
};

/**
 * POST /api/hospital-visits
 * Create a new hospital visit log
 */
export const createHospitalVisit = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      baby_id,
      visit_for,
      hospital_name,
      doctor_name,
      reason,
      visit_date,
      notes,
      follow_up_date,
      status,
    } = req.body;

    if (!hospital_name || !visit_date) {
      return res.status(400).json({ detail: 'hospital_name and visit_date are required' });
    }

    if (baby_id) {
      const baby = await Baby.findOne({ where: { id: baby_id, user_id: userId } });
      if (!baby) {
        return res.status(404).json({ detail: 'Baby not found' });
      }
    }

    const newVisit = await HospitalVisit.create({
      user_id: userId,
      baby_id: baby_id || null,
      visit_for: visit_for || (baby_id ? 'baby' : 'mother'),
      hospital_name,
      doctor_name: doctor_name || null,
      reason: reason || null,
      visit_date,
      notes: notes || null,
      follow_up_date: follow_up_date || null,
      status: status || 'completed',
    });

    return res.status(201).json(newVisit);
  } catch (error) {
    console.error(`Error creating hospital visit: ${error.message}`);
    return res.status(500).json({ detail: 'Error creating hospital visit' });
  }
};

/**
 * PUT /api/hospital-visits/:visitId
 */
export const updateHospitalVisit = async (req, res) => {
  try {
    const { visitId } = req.params;
    const userId = req.user.id;

    const visit = await HospitalVisit.findOne({
      where: { id: visitId, user_id: userId },
    });

    if (!visit) {
      return res.status(404).json({ detail: 'Hospital visit not found' });
    }

    const {
      baby_id,
      visit_for,
      hospital_name,
      doctor_name,
      reason,
      visit_date,
      notes,
      follow_up_date,
      status,
    } = req.body;

    const updateData = {};
    if (baby_id !== undefined) updateData.baby_id = baby_id;
    if (visit_for !== undefined) updateData.visit_for = visit_for;
    if (hospital_name !== undefined) updateData.hospital_name = hospital_name;
    if (doctor_name !== undefined) updateData.doctor_name = doctor_name;
    if (reason !== undefined) updateData.reason = reason;
    if (visit_date !== undefined) updateData.visit_date = visit_date;
    if (notes !== undefined) updateData.notes = notes;
    if (follow_up_date !== undefined) updateData.follow_up_date = follow_up_date;
    if (status !== undefined) updateData.status = status;

    await visit.update(updateData);

    return res.json(visit);
  } catch (error) {
    console.error(`Error updating hospital visit: ${error.message}`);
    return res.status(500).json({ detail: 'Error updating hospital visit' });
  }
};

/**
 * DELETE /api/hospital-visits/:visitId
 */
export const deleteHospitalVisit = async (req, res) => {
  try {
    const { visitId } = req.params;
    const userId = req.user.id;

    const visit = await HospitalVisit.findOne({
      where: { id: visitId, user_id: userId },
    });

    if (!visit) {
      return res.status(404).json({ detail: 'Hospital visit not found' });
    }

    await visit.destroy();
    return res.json({ msg: 'Hospital visit deleted' });
  } catch (error) {
    console.error(`Error deleting hospital visit: ${error.message}`);
    return res.status(500).json({ detail: 'Error deleting hospital visit' });
  }
};
