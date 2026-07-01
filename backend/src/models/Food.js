import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Food = sequelize.define(
  'Food',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nepali_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    food_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('recommended', 'avoid'),
      allowNull: false,
      defaultValue: 'recommended',
    },
    trimester: {
      type: DataTypes.ENUM('All', 'Trimester 1', 'Trimester 2', 'Trimester 3'),
      allowNull: false,
      defaultValue: 'All',
    },
    nutrient_group: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diet_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nutrients: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    serving_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    protein: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    iron: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    calcium: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    folate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vitamin_d: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    omega3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fiber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hydration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    warning: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reason_to_avoid: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    safer_alternative: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_recommended: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: 'foods',
  }
);

export default Food;
