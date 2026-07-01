import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Baby from './Baby.js';

const DevelopmentMilestone = sequelize.define('DevelopmentMilestone', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  baby_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Baby,
      key: 'id',
    },
    allowNull: false,
  },
  milestone_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  milestone_key: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  expected_age_months: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  completed_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'development_milestones',
  timestamps: true,
});

DevelopmentMilestone.belongsTo(Baby, { foreignKey: 'baby_id', onDelete: 'CASCADE' });
Baby.hasMany(DevelopmentMilestone, { foreignKey: 'baby_id', onDelete: 'CASCADE' });

export default DevelopmentMilestone;
