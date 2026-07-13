import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const PregnancyGrowth = sequelize.define('PregnancyGrowth', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  week: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 42,
    },
  },
  weight_kg: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  record_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pregnancy_growth',
  timestamps: false,
  
});

export default PregnancyGrowth;