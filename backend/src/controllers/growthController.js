import { GrowthRecord, Baby } from '../models/index.js';
import { validateGrowthRecord, calculateAgeMonths } from '../utils/growthValidation.js';
import { analyzeGrowth } from '../utils/whoStandards.js';

export const getGrowthRecords = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const records = await GrowthRecord.findAll({
      where: { user_id: userId },
      order: [['date', 'DESC']],
    });

    return res.json(records);
  } catch (error) {
    console.error(`Error fetching growth records: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching growth records' });
  }
};

export const createGrowthRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { baby_id, weight_kg, height_cm, date } = req.body;

    const baby = await Baby.findOne({ where: { id: baby_id, user_id: userId } });
    if (!baby) {
      return res.status(404).json({ detail: 'Baby not found' });
    }

    const errors = validateGrowthRecord(baby, { date, weight_kg, height_cm });
    if (errors.length > 0) {
      return res.status(400).json({ detail: errors[0], errors });
    }

    const measurementDate = date || new Date().toISOString();
    const ageMonths = calculateAgeMonths(baby.date_of_birth, measurementDate);

    const newRecord = await GrowthRecord.create({
      user_id: userId,
      baby_id,
      age_months: Math.round(ageMonths),
      weight_kg: parseFloat(weight_kg),
      height_cm: parseFloat(height_cm),
      date: measurementDate,
    });

    const who_analysis = analyzeGrowth(newRecord, baby);

    return res.status(201).json({ ...newRecord.toJSON(), who_analysis });
  } catch (error) {
    console.error(`Error creating growth record: ${error.message}`);
    return res.status(500).json({ detail: 'Error creating growth record' });
  }
};

export const getGrowthRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const userId = req.user.id;

    const record = await GrowthRecord.findOne({
      where: { id: recordId, user_id: userId },
    });

    if (!record) {
      return res.status(404).json({ detail: 'Record not found' });
    }

    return res.json(record);
  } catch (error) {
    console.error(`Error fetching growth record: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching growth record' });
  }
};

export const updateGrowthRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const userId = req.user.id;
    const { weight_kg, height_cm, date } = req.body;

    const record = await GrowthRecord.findOne({
      where: { id: recordId, user_id: userId },
    });

    if (!record) {
      return res.status(404).json({ detail: 'Record not found' });
    }

    const baby = await Baby.findOne({ where: { id: record.baby_id, user_id: userId } });

    const errors = validateGrowthRecord(baby || record, {
      date: date || record.date,
      weight_kg: weight_kg ?? record.weight_kg,
      height_cm: height_cm ?? record.height_cm,
    });
    if (errors.length > 0) {
      return res.status(400).json({ detail: errors[0], errors });
    }

    const updateData = {};
    const measurementDate = date || record.date;

    if (baby) {
      updateData.age_months = Math.round(calculateAgeMonths(baby.date_of_birth, measurementDate));
    }
    if (weight_kg !== undefined) updateData.weight_kg = parseFloat(weight_kg);
    if (height_cm !== undefined) updateData.height_cm = parseFloat(height_cm);
    if (date !== undefined) updateData.date = date;

    await record.update(updateData);

    const who_analysis = analyzeGrowth(record, baby);

    return res.json({ ...record.toJSON(), who_analysis });
  } catch (error) {
    console.error(`Error updating growth record: ${error.message}`);
    return res.status(500).json({ detail: 'Error updating growth record' });
  }
};

export const deleteGrowthRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const userId = req.user.id;

    const record = await GrowthRecord.findOne({
      where: { id: recordId, user_id: userId },
    });

    if (!record) {
      return res.status(404).json({ detail: 'Record not found' });
    }

    await record.destroy();
    return res.json({ msg: 'Record deleted' });
  } catch (error) {
    console.error(`Error deleting growth record: ${error.message}`);
    return res.status(500).json({ detail: 'Error deleting growth record' });
  }
};
