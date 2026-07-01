/**
 * HOSPITAL VISIT MODEL
 * =====================
 * Defines the HospitalVisit schema for the database
 * Stores hospital / clinic visit logs for a user and (optionally) a baby
 */

import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import User from './User.js';
import Baby from './Baby.js';

const HospitalVisit = sequelize.define('HospitalVisit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },

  // Optional - visit can be for the mother (null) or a specific baby
  baby_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Baby,
      key: 'id',
    },
  },

  // Who the visit was for: mother or baby
  visit_for: {
    type: DataTypes.ENUM('mother', 'baby'),
    defaultValue: 'mother',
    allowNull: false,
  },

  hospital_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  doctor_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  // Reason / type of visit, e.g. "Routine Checkup", "Emergency", "Follow-up"
  reason: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  visit_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  // Free-text notes / diagnosis / prescription summary
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // Optional date for a scheduled follow-up
  follow_up_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM('completed', 'upcoming'),
    defaultValue: 'completed',
    allowNull: false,
  },
}, {
  tableName: 'hospital_visits',
  timestamps: true,
});

HospitalVisit.belongsTo(User, { foreignKey: 'user_id' });
HospitalVisit.belongsTo(Baby, { foreignKey: 'baby_id' });
User.hasMany(HospitalVisit, { foreignKey: 'user_id' });
Baby.hasMany(HospitalVisit, { foreignKey: 'baby_id' });

export default HospitalVisit;
