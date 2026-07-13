import { FeedingLog, Baby } from '../models/index.js';
import { Op } from 'sequelize';

export const getFeedingLogs = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { baby_id, start_date, end_date, type, search, limit, offset } = req.query;

    const where = { user_id: userId };

    if (baby_id) where.baby_id = baby_id;

    if (start_date || end_date) {
      where.date = {};
      if (start_date) where.date[Op.gte] = start_date;
      if (end_date) where.date[Op.lte] = end_date;
    }

    if (type) where.feeding_type = type;

    if (search) {
      where[Op.or] = [
        { food_name: { [Op.like]: `%${search}%` } },
        { notes: { [Op.like]: `%${search}%` } },
      ];
    }

    const logs = await FeedingLog.findAndCountAll({
      where,
      order: [['date', 'DESC'], ['time', 'DESC']],
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    });

    return res.json({
      logs: logs.rows,
      total: logs.count,
    });
  } catch (error) {
    console.error(`Error fetching feeding logs: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching feeding logs' });
  }
};

export const createFeedingLog = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { baby_id, feeding_type, food_name, quantity, quantity_unit, duration, date, time, side, texture, notes } = req.body;

    if (!baby_id) {
      return res.status(400).json({ detail: 'baby_id is required' });
    }

    const baby = await Baby.findOne({ where: { id: baby_id, user_id: userId } });
    if (!baby) {
      return res.status(404).json({ detail: 'Baby not found' });
    }

    const logDate = date || new Date().toISOString().split('T')[0];
    const logTime = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const newLog = await FeedingLog.create({
      user_id: userId,
      baby_id,
      feeding_type,
      food_name: food_name || null,
      quantity: quantity || null,
      quantity_unit: quantity_unit || null,
      duration: duration || null,
      side: side || null,
      texture: texture || null,
      date: logDate,
      time: logTime,
      notes: notes || null,
    });

    return res.status(201).json(newLog);
  } catch (error) {
    console.error(`Error creating feeding log: ${error.message}`);
    return res.status(500).json({ detail: 'Error creating feeding log' });
  }
};

export const getFeedingLog = async (req, res, next) => {
  try {
    const { logId } = req.params;
    const userId = req.user.id;

    const log = await FeedingLog.findOne({
      where: { id: logId, user_id: userId },
    });

    if (!log) {
      return res.status(404).json({ detail: 'Feeding log not found' });
    }

    return res.json(log);
  } catch (error) {
    console.error(`Error fetching feeding log: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching feeding log' });
  }
};

export const updateFeedingLog = async (req, res, next) => {
  try {
    const { logId } = req.params;
    const userId = req.user.id;
    const { feeding_type, food_name, quantity, quantity_unit, duration, date, time, side, texture, notes } = req.body;

    const log = await FeedingLog.findOne({
      where: { id: logId, user_id: userId },
    });

    if (!log) {
      return res.status(404).json({ detail: 'Feeding log not found' });
    }

    const updateData = {};
    if (feeding_type !== undefined) updateData.feeding_type = feeding_type;
    if (food_name !== undefined) updateData.food_name = food_name;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (quantity_unit !== undefined) updateData.quantity_unit = quantity_unit;
    if (duration !== undefined) updateData.duration = duration;
    if (side !== undefined) updateData.side = side;
    if (texture !== undefined) updateData.texture = texture;
    if (date !== undefined) updateData.date = date;
    if (time !== undefined) updateData.time = time;
    if (notes !== undefined) updateData.notes = notes;

    await log.update(updateData);
    return res.json(log);
  } catch (error) {
    console.error(`Error updating feeding log: ${error.message}`);
    return res.status(500).json({ detail: 'Error updating feeding log' });
  }
};

export const deleteFeedingLog = async (req, res, next) => {
  try {
    const { logId } = req.params;
    const userId = req.user.id;

    const log = await FeedingLog.findOne({
      where: { id: logId, user_id: userId },
    });

    if (!log) {
      return res.status(404).json({ detail: 'Feeding log not found' });
    }

    await log.destroy();
    return res.json({ msg: 'Feeding log deleted' });
  } catch (error) {
    console.error(`Error deleting feeding log: ${error.message}`);
    return res.status(500).json({ detail: 'Error deleting feeding log' });
  }
};

export const getFeedingLogsSummary = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { baby_id, start_date, end_date } = req.query;

    const where = { user_id: userId };
    if (baby_id) where.baby_id = baby_id;
    if (start_date || end_date) {
      where.date = {};
      if (start_date) where.date[Op.gte] = start_date;
      if (end_date) where.date[Op.lte] = end_date;
    }

    const logs = await FeedingLog.findAll({ where });

    const total = logs.length;
    const breastfeeding = logs.filter(l => l.feeding_type === 'breast').length;
    const formula = logs.filter(l => l.feeding_type === 'formula').length;
    const solids = logs.filter(l => l.feeding_type === 'solids').length;
    const water = logs.filter(l => l.feeding_type === 'water').length;

    return res.json({ total, breastfeeding, formula, solids, water });
  } catch (error) {
    console.error(`Error fetching feeding summary: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching feeding summary' });
  }
};
