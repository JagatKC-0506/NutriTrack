/**
 * VACCINE CONTROLLER
 * ==================
 * Handles all vaccine-related operations including:
 * - Fetching available vaccines from database
 * - Managing user vaccine reminders (CRUD operations)
 * - Tracking vaccination status and doses
 */

import { Vaccine, Reminder, Baby } from '../models/index.js';

/**
 * Get all vaccines from database
 * Returns a list of all available vaccines sorted alphabetically
 * Includes recommendation status for each vaccine
 * 
 * @route   GET /api/vaccines
 * @access  Public
 * @returns {Array} List of vaccine objects with all fields including 'recommended'
 */
export const getAllVaccines = async (req, res, next) => {
  try {
    const vaccines = await Vaccine.findAll({
      order: [['name', 'ASC']],
    });

    return res.json(vaccines);
  } catch (error) {
    console.error(`Error fetching vaccines: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching vaccines' });
  }
};

/**
 * Get vaccine by ID
 * Returns detailed information about a specific vaccine
 * 
 * @route   GET /api/vaccines/:vaccineId
 * @access  Public
 * @param   {number} vaccineId - The ID of the vaccine to retrieve
 * @returns {Object} Vaccine object with all details
 */
export const getVaccineById = async (req, res, next) => {
  try {
    const { vaccineId } = req.params;

    const vaccine = await Vaccine.findByPk(vaccineId);

    if (!vaccine) {
      return res.status(404).json({ detail: 'Vaccine not found' });
    }

    return res.json(vaccine);
  } catch (error) {
    console.error(`Error fetching vaccine: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching vaccine' });
  }
};

/**
 * Get all vaccines for pregnant women
 * Returns vaccines with recipient_type 'mother' or 'both'
 * Includes both recommended and optional vaccines
 * 
 * @route   GET /api/vaccines/mother
 * @access  Public
 * @returns {Array} List of vaccines safe/suitable for pregnant women
 */
export const getMotherVaccines = async (req, res, next) => {
  try {
    const vaccines = await Vaccine.findAll({
      where: {
        recipient_type: ['mother', 'both'],
      },
      order: [['recommended', 'DESC'], ['name', 'ASC']],
    });

    return res.json(vaccines);
  } catch (error) {
    console.error(`Error fetching mother vaccines: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching mother vaccines' });
  }
};

/**
 * Get all vaccine reminders for the current user
 * Returns user-specific vaccine reminders sorted by date
 * 
 * @route   GET /api/vaccines/reminders/user
 * @access  Private (requires authentication)
 * @returns {Array} List of user's vaccine reminders with status and dates
 */
export const getUserVaccineReminders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { baby_id } = req.query;
    const babyId = baby_id ? parseInt(baby_id, 10) : null;

    const whereClause = { user_id: userId, type: 'vaccine' };
    if (babyId) {
      whereClause.baby_id = babyId;
    }

    // If baby-specific request and no reminders exist, migrate legacy reminders (baby_id null)
    if (babyId) {
      const existingForBaby = await Reminder.count({
        where: { user_id: userId, type: 'vaccine', baby_id: babyId },
      });

      if (existingForBaby === 0) {
        await Reminder.update(
          { baby_id: babyId },
          { where: { user_id: userId, type: 'vaccine', baby_id: null } }
        );
      }
    }

    const reminders = await Reminder.findAll({
      where: whereClause,
      order: [['reminder_date', 'ASC']],
    });

    // Fix birth-dose reminders to match baby's DOB (prevents 7-day offset)
    if (babyId && reminders.length > 0) {
      const baby = await Baby.findOne({ where: { id: babyId, user_id: userId } });
      if (baby?.date_of_birth) {
        const dob = new Date(baby.date_of_birth);
        const dobString = `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, '0')}-${String(dob.getDate()).padStart(2, '0')}`;

        const birthDoseIds = reminders
          .filter(r => r.age_due_months === 0 && r.reminder_date !== dobString)
          .map(r => r.id);

        if (birthDoseIds.length > 0) {
          await Reminder.update(
            { reminder_date: dobString },
            { where: { id: birthDoseIds } }
          );

          reminders.forEach(r => {
            if (birthDoseIds.includes(r.id)) {
              r.reminder_date = dobString;
            }
          });
        }
      }
    }

    return res.json(reminders);
  } catch (error) {
    console.error(`Error fetching vaccine reminders: ${error.message}`);
    return res.status(500).json({ detail: 'Error fetching vaccine reminders' });
  }
};

/**
 * Create a vaccine reminder for the current user
 * Allows users to schedule vaccine reminders with specific doses and dates
 * 
 * @route   POST /api/vaccines/reminders
 * @access  Private (requires authentication)
 * @body    {Object} Reminder data including vaccine name, date, dose info, recipient
 * @returns {Object} Newly created reminder object
 */
export const createVaccineReminder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      vaccine_name,
      reminder_date,
      dose_number,
      total_doses,
      recipient,
      age_due_months,
      description,
      vaccine_icon,
      baby_id,
    } = req.body;

    // Normalize date to YYYY-MM-DD format for consistent comparison
    let normalizedDate = reminder_date;
    if (reminder_date && reminder_date.includes('T')) {
      normalizedDate = reminder_date.split('T')[0];
    }

    // For birth-dose vaccines, align reminder date with baby's DOB if available
    if (age_due_months === 0 && baby_id) {
      const baby = await Baby.findOne({ where: { id: baby_id, user_id: userId } });
      if (baby?.date_of_birth) {
        const dob = new Date(baby.date_of_birth);
        normalizedDate = `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, '0')}-${String(dob.getDate()).padStart(2, '0')}`;
      }
    }

    // Check if reminder already exists for this vaccine and dose (most important check)
    const existingReminder = await Reminder.findOne({
      where: {
        user_id: userId,
        type: 'vaccine',
        vaccine_name: vaccine_name,
        dose_number: dose_number || 1,
        baby_id: baby_id || null,
      }
    });

    if (existingReminder) {
      console.log(`Reminder already exists for ${vaccine_name} dose ${dose_number || 1}`);
      return res.status(200).json(existingReminder);
    }

    // Create new reminder with all provided information
    const newReminder = await Reminder.create({
      user_id: userId,
      baby_id: baby_id || null,
      type: 'vaccine',
      title: vaccine_name,
      vaccine_name,
      reminder_date: normalizedDate,
      dose_number,
      total_doses,
      recipient,
      age_due_months,
      description,
      vaccine_icon,
      status: 'pending', // Default status for new reminders
    });

    return res.status(201).json(newReminder);
  } catch (error) {
    console.error(`Error creating vaccine reminder: ${error.message}`);
    return res.status(500).json({ detail: 'Error creating vaccine reminder' });
  }
};

/**
 * Update vaccine reminder status
 * Marks a reminder as completed and records the date
 * Used when user confirms they've taken the vaccine dose
 * 
 * @route   PATCH /api/vaccines/reminders/:reminderId/status
 * @access  Private (requires authentication)
 * @param   {number} reminderId - The ID of the reminder to update
 * @body    {Object} Status update data (status, last_dose_date)
 * @returns {Object} Updated reminder object
 */
export const updateVaccineReminderStatus = async (req, res, next) => {
  try {
    const { reminderId } = req.params;
    const userId = req.user.id;
    const { status, last_dose_date } = req.body;

    // Find the reminder for this user
    const reminder = await Reminder.findOne({
      where: { id: reminderId, user_id: userId, type: 'vaccine' },
    });

    if (!reminder) {
      return res.status(404).json({ detail: 'Vaccine reminder not found' });
    }

    // Update reminder status and record dose date
    let normalizedDoseDate = last_dose_date;
    if (!normalizedDoseDate) {
      const now = new Date();
      normalizedDoseDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    } else if (normalizedDoseDate.includes('T')) {
      normalizedDoseDate = normalizedDoseDate.split('T')[0];
    }

    await reminder.update({
      status: status || 'completed',
      last_dose_date: normalizedDoseDate,
    });

    return res.json(reminder);
  } catch (error) {
    console.error(`Error updating vaccine reminder: ${error.message}`);
    return res.status(500).json({ detail: 'Error updating vaccine reminder' });
  }
};

/**
 * Delete vaccine reminder
 * Removes a specific reminder from the user's schedule
 * 
 * @route   DELETE /api/vaccines/reminders/:reminderId
 * @access  Private (requires authentication)
 * @param   {number} reminderId - The ID of the reminder to delete
 * @returns {void} No content on successful deletion
 */
export const deleteVaccineReminder = async (req, res, next) => {
  try {
    const { reminderId } = req.params;
    const userId = req.user.id;

    // Find the reminder for this user
    const reminder = await Reminder.findOne({
      where: { id: reminderId, user_id: userId, type: 'vaccine' },
    });

    if (!reminder) {
      return res.status(404).json({ detail: 'Vaccine reminder not found' });
    }

    // Delete the reminder
    await reminder.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(`Error deleting vaccine reminder: ${error.message}`);
    return res.status(500).json({ detail: 'Error deleting vaccine reminder' });
  }
};

/**
 * Clean up duplicate vaccine reminders
 * Removes duplicate reminders for the same vaccine and dose, keeping only the newest
 * 
 * @route   POST /api/vaccines/reminders/cleanup
 * @access  Private (requires authentication)
 * @returns {Object} Cleanup status
 */
export const cleanupDuplicateReminders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get all vaccine reminders for this user
    const reminders = await Reminder.findAll({
      where: { user_id: userId, type: 'vaccine' },
      order: [['id', 'DESC']]
    });

    // Group by vaccine_name + dose_number
    const reminderGroups = {};
    reminders.forEach(reminder => {
      const key = `${reminder.vaccine_name}|${reminder.dose_number || 1}`;
      if (!reminderGroups[key]) {
        reminderGroups[key] = [];
      }
      reminderGroups[key].push(reminder);
    });

    // Delete duplicates, keeping only the newest
    let deletedCount = 0;
    for (const [key, group] of Object.entries(reminderGroups)) {
      if (group.length > 1) {
        // Keep the first one (newest due to DESC order), delete the rest
        for (let i = 1; i < group.length; i++) {
          await group[i].destroy();
          deletedCount++;
          console.log(`Deleted duplicate reminder for ${key}`);
        }
      }
    }

    return res.status(200).json({ 
      detail: `Cleanup completed. Deleted ${deletedCount} duplicate reminders.`,
      deletedCount
    });
  } catch (error) {
    console.error(`Error cleaning up duplicate reminders: ${error.message}`);
    return res.status(500).json({ detail: 'Error cleaning up duplicate reminders' });
  }
};
