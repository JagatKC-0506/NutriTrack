import { Food } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const getFoodsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const foods = await Food.findAll({ where: { type } });
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Food.findAll({ where: { category } });
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const getPregnancyFoods = async (req, res) => {
  try {
    const recommended = await Food.findAll({ where: { type: 'recommended' } });
    const avoid = await Food.findAll({ where: { type: 'avoid' } });
    res.json({ recommended, avoid });
  } catch (error) {
    console.error('Error fetching pregnancy foods:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const getFoodsByNutrientGroup = async (req, res) => {
  try {
    const { group } = req.params;
    const foods = await Food.findAll({
      where: { nutrient_group: group, type: 'recommended' }
    });
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods by nutrient group:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const getFoodsByTrimester = async (req, res) => {
  try {
    const { trimester } = req.params;
    const trimesterMap = { '1': 'Trimester 1', '2': 'Trimester 2', '3': 'Trimester 3' };
    const dbTrimester = trimesterMap[trimester] || trimester;
    const foods = await Food.findAll({
      where: {
        [Op.or]: [{ trimester: 'All' }, { trimester: dbTrimester }],
        type: 'recommended'
      }
    });
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods by trimester:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const getFoodsByDietType = async (req, res) => {
  try {
    const { dietType } = req.params;
    const foods = await Food.findAll({
      where: { diet_type: dietType, type: 'recommended' }
    });
    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods by diet type:', error);
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
};

export const searchFoods = async (req, res) => {
  try {
    const { q, dietType } = req.query;
    const whereClause = {};
    if (q) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { category: { [Op.like]: `%${q}%` } },
        { nutrient_group: { [Op.like]: `%${q}%` } },
        { nutrients: { [Op.like]: `%${q}%` } }
      ];
    }
    if (dietType) {
      whereClause.diet_type = dietType;
    }
    const foods = await Food.findAll({ where: whereClause });
    res.json(foods);
  } catch (error) {
    console.error('Error searching foods:', error);
    res.status(500).json({ error: 'Failed to search foods' });
  }
};

export const getNutrientGroups = async (req, res) => {
  try {
    const groups = await Food.findAll({
      attributes: ['nutrient_group'],
      where: { nutrient_group: { [Op.ne]: null }, type: 'recommended' },
      group: ['nutrient_group']
    });
    const uniqueGroups = [...new Set(groups.map(g => g.nutrient_group))];
    const groupInfo = {
      "Iron Rich Foods": "Iron supports red blood cell production and prevents anemia. Pair with vitamin C for better absorption.",
      "Calcium Rich Foods": "Calcium builds strong bones and teeth for your baby and maintains your bone density.",
      "Protein Rich Foods": "Protein is the building block for your baby's cells, muscles, and tissues.",
      "Folate Rich Foods": "Folate prevents neural tube defects in early pregnancy. Essential before and during pregnancy.",
      "Vitamin D Foods": "Vitamin D helps absorb calcium and supports immune function throughout pregnancy.",
      "Omega-3 Foods": "Omega-3 DHA supports your baby's brain and eye development, especially in the third trimester.",
      "Fiber Rich Foods": "Fiber prevents constipation, stabilizes blood sugar, and supports digestive health.",
      "Hydration": "Proper hydration supports amniotic fluid levels, prevents UTIs, and reduces swelling."
    };
    res.json(uniqueGroups.filter(g => g && g !== 'Foods to Avoid').map(g => ({
      name: g,
      description: groupInfo[g] || ''
    })));
  } catch (error) {
    console.error('Error fetching nutrient groups:', error);
    res.status(500).json({ error: 'Failed to fetch nutrient groups' });
  }
};

export const createFood = async (req, res) => {
  try {
    const fields = ['name','nepali_name','emoji','category','food_type','description','type','trimester','nutrient_group','diet_type','nutrients','benefits','serving_size','calories','protein','iron','calcium','folate','vitamin_d','omega3','fiber','hydration','warning','reason_to_avoid','safer_alternative','image','is_recommended'];
    const body = {};
    fields.forEach(f => { if (req.body[f] !== undefined) body[f] = req.body[f]; });
    body.is_recommended = body.is_recommended !== undefined ? body.is_recommended : true;
    body.trimester = body.trimester || 'All';
    const food = await Food.create(body);
    res.status(201).json(food);
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ error: 'Failed to create food' });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByPk(id);
    if (!food) return res.status(404).json({ error: 'Food not found' });
    await food.update(req.body);
    res.json(food);
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).json({ error: 'Failed to update food' });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByPk(id);
    if (!food) return res.status(404).json({ error: 'Food not found' });
    await food.destroy();
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ error: 'Failed to delete food' });
  }
};
