import PregnancyGrowth from '../models/PregnancyGrowth.js';

/**
 * Get all pregnancy weight records for the authenticated user
 */
export async function getRecords(req, res) {
  try {
    const records = await PregnancyGrowth.findAll({
      where: { user_id: req.user.id },
      order: [['week', 'ASC']],
    });
    res.json(records);
  } catch (error) {
    console.error('Error fetching pregnancy growth records:', error);
    res.status(500).json({ detail: 'Failed to fetch records' });
  }
}

/**
 * Create a new pregnancy weight record
 */
export async function createRecord(req, res) {
  try {
    const { week, weight_kg, record_date, notes } = req.body;

    if (!week || !weight_kg) {
      return res.status(400).json({ detail: 'Week and weight are required' });
    }
    if (week < 1 || week > 42) {
      return res.status(400).json({ detail: 'Week must be between 1 and 42' });
    }

    const record = await PregnancyGrowth.create({
      user_id: req.user.id,
      week,
      weight_kg,
      record_date: record_date || new Date().toISOString().split('T')[0],
      notes: notes || null,
    });

    res.status(201).json(record);
  } catch (error) {
    console.error('❌ Error creating pregnancy record:', error.message);
    res.status(500).json({ detail: 'Failed to create record: ' + error.message });
  }
}

/**
 * Get a specific pregnancy weight record
 */
export async function getRecord(req, res) {
  try {
    const record = await PregnancyGrowth.findOne({
      where: { id: req.params.recordId, user_id: req.user.id },
    });

    if (!record) {
      return res.status(404).json({ detail: 'Record not found' });
    }

    res.json(record);
  } catch (error) {
    console.error('Error fetching pregnancy record:', error);
    res.status(500).json({ detail: 'Failed to fetch record' });
  }
}

/**
 * Update a pregnancy weight record
 */
export async function updateRecord(req, res) {
  try {
    const record = await PregnancyGrowth.findOne({
      where: { id: req.params.recordId, user_id: req.user.id },
    });

    if (!record) {
      return res.status(404).json({ detail: 'Record not found' });
    }

    await record.update({
      week: req.body.week ?? record.week,
      weight_kg: req.body.weight_kg ?? record.weight_kg,
      record_date: req.body.record_date ?? record.record_date,
      notes: req.body.notes !== undefined ? req.body.notes : record.notes,
    });

    res.json(record);
  } catch (error) {
    console.error('Error updating pregnancy record:', error);
    res.status(500).json({ detail: 'Failed to update record' });
  }
}

/**
 * Delete a pregnancy weight record
 */
export async function deleteRecord(req, res) {
  try {
    const record = await PregnancyGrowth.findOne({
      where: { id: req.params.recordId, user_id: req.user.id },
    });

    if (!record) {
      return res.status(404).json({ detail: 'Record not found' });
    }

    await record.destroy();
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting pregnancy record:', error);
    res.status(500).json({ detail: 'Failed to delete record' });
  }
}