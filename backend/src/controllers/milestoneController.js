import { DevelopmentMilestone, Baby } from '../models/index.js';

export const getMilestones = async (req, res, next) => {
  try {
    const { babyId } = req.params;
    const userId = req.user.id;

    const baby = await Baby.findOne({ where: { id: babyId, user_id: userId } });
    if (!baby) {
      return res.status(404).json({ detail: 'Baby not found' });
    }

    const milestones = await DevelopmentMilestone.findAll({
      where: { baby_id: babyId },
      order: [['expected_age_months', 'ASC']],
    });

    return res.json(milestones);
  } catch (error) {
    console.error(`Error fetching milestones: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching milestones' });
  }
};

export const createMilestone = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { baby_id, milestone_name, milestone_key, expected_age_months, completed, completed_date, notes } = req.body;

    const baby = await Baby.findOne({ where: { id: baby_id, user_id: userId } });
    if (!baby) {
      return res.status(404).json({ detail: 'Baby not found' });
    }

    const existing = await DevelopmentMilestone.findOne({
      where: { baby_id, milestone_key },
    });
    if (existing) {
      return res.status(409).json({ detail: 'Milestone already exists for this baby' });
    }

    const milestone = await DevelopmentMilestone.create({
      baby_id,
      milestone_name,
      milestone_key,
      expected_age_months,
      completed: completed || false,
      completed_date: completed ? (completed_date || new Date().toISOString().split('T')[0]) : null,
      notes: notes || null,
    });

    return res.status(201).json(milestone);
  } catch (error) {
    console.error(`Error creating milestone: ${error.message}`);
    return res.status(500).json({ detail: 'Error creating milestone' });
  }
};

export const updateMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { completed, completed_date, notes } = req.body;

    const milestone = await DevelopmentMilestone.findByPk(id, {
      include: [{ model: Baby, where: { user_id: userId }, required: true }],
    });

    if (!milestone) {
      return res.status(404).json({ detail: 'Milestone not found' });
    }

    const updateData = {};
    if (completed !== undefined) {
      updateData.completed = completed;
      updateData.completed_date = completed ? (completed_date || new Date().toISOString().split('T')[0]) : null;
    }
    if (notes !== undefined) updateData.notes = notes;
    if (completed_date !== undefined && completed) updateData.completed_date = completed_date;
    updateData.updatedAt = new Date();

    await milestone.update(updateData);
    return res.json(milestone);
  } catch (error) {
    console.error(`Error updating milestone: ${error.message}`);
    return res.status(500).json({ detail: 'Error updating milestone' });
  }
};

export const deleteMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const milestone = await DevelopmentMilestone.findByPk(id, {
      include: [{ model: Baby, where: { user_id: userId }, required: true }],
    });

    if (!milestone) {
      return res.status(404).json({ detail: 'Milestone not found' });
    }

    await milestone.destroy();
    return res.status(204).end();
  } catch (error) {
    console.error(`Error deleting milestone: ${error.message}`);
    return res.status(500).json({ detail: 'Error deleting milestone' });
  }
};
