import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import User from './User.js';
import Baby from './Baby.js';

const FeedingLog = sequelize.define('FeedingLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' },
  },
  baby_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Baby, key: 'id' },
  },
  feeding_type: {
    type: DataTypes.ENUM('breast', 'breast_milk', 'formula', 'solids', 'water'),
    allowNull: false,
  },
  food_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  quantity_unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Duration in minutes (for breastfeeding/bottle)',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  side: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Breastfeeding side: left, right, both',
  },
  texture: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Solid food texture: puree, mashed, finger_food, family_food',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'feeding_logs',
  timestamps: true,
  underscored: true,
});

FeedingLog.belongsTo(User, { foreignKey: 'user_id' });
FeedingLog.belongsTo(Baby, { foreignKey: 'baby_id' });
User.hasMany(FeedingLog, { foreignKey: 'user_id' });
Baby.hasMany(FeedingLog, { foreignKey: 'baby_id' });

export default FeedingLog;
