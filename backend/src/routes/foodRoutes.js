import express from 'express';
import {
  getAllFoods,
  getFoodsByType,
  getFoodsByCategory,
  getPregnancyFoods,
  getFoodsByNutrientGroup,
  getFoodsByTrimester,
  getFoodsByDietType,
  searchFoods,
  getNutrientGroups,
  createFood,
  updateFood,
  deleteFood
} from '../controllers/foodController.js';

const router = express.Router();

// Public routes
router.get('/all', getAllFoods);
router.get('/type/:type', getFoodsByType);
router.get('/category/:category', getFoodsByCategory);
router.get('/pregnancy', getPregnancyFoods);
router.get('/nutrient-group/:group', getFoodsByNutrientGroup);
router.get('/trimester/:trimester', getFoodsByTrimester);
router.get('/diet-type/:dietType', getFoodsByDietType);
router.get('/search', searchFoods);
router.get('/nutrient-groups', getNutrientGroups);

// Admin routes (optional - add auth later if needed)
router.post('/create', createFood);
router.put('/update/:id', updateFood);
router.delete('/delete/:id', deleteFood);

export default router;
