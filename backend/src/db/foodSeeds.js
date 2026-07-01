import { Food } from '../models/index.js';

const foodSeeds = [
  // ===================================================================
  // HYDRATION
  // ===================================================================
  {
    name: "Water", nepali_name: "पानी", emoji: "🫗", category: "Hydration", food_type: "Drink",
    nutrient_group: "Hydration", diet_type: "Vegetarian",
    nutrients: ["Electrolytes"],
    benefits: "Essential for maintaining amniotic fluid levels, preventing UTIs, and reducing swelling during pregnancy",
    description: "Essential for maintaining amniotic fluid levels and preventing UTIs",
    serving_size: "8 glasses daily", trimester: "All", type: "recommended", is_recommended: true,
    calories: "0", protein: "0 g", iron: "0 mg", calcium: "0 mg", folate: "0 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "0 g", hydration: "100%"
  },
  {
    name: "Coconut Water", nepali_name: "नरिवलको पानी", emoji: "🥥", category: "Hydration", food_type: "Natural Drink",
    nutrient_group: "Hydration", diet_type: "Vegetarian",
    nutrients: ["Potassium", "Magnesium", "Electrolytes", "Vitamin C"],
    benefits: "Natural source of electrolytes, helps prevent dehydration and relieves pregnancy fatigue",
    description: "Natural electrolytes that help prevent dehydration during pregnancy",
    serving_size: "1 glass", trimester: "All", type: "recommended", is_recommended: true,
    calories: "44", protein: "0.5 g", iron: "0.1 mg", calcium: "17 mg", folate: "0 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "0 g", hydration: "95%"
  },
  {
    name: "Lemon Water", nepali_name: "निबुवा पानी", emoji: "🍋", category: "Hydration", food_type: "Drink",
    nutrient_group: "Hydration", diet_type: "Vegetarian",
    nutrients: ["Vitamin C", "Electrolytes", "Potassium"],
    benefits: "Helps relieve morning sickness, boosts vitamin C intake, and keeps you hydrated",
    description: "Relieves morning sickness and boosts vitamin C intake",
    serving_size: "1 glass", trimester: "All", type: "recommended", is_recommended: true,
    calories: "6", protein: "0.1 g", iron: "0 mg", calcium: "3 mg", folate: "2 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "0 g", hydration: "98%"
  },
  {
    name: "Buttermilk", nepali_name: "मट्ठा", emoji: "🥛", category: "Dairy", food_type: "Fermented Drink",
    nutrient_group: "Hydration", diet_type: "Vegetarian",
    nutrients: ["Calcium", "Probiotics", "Vitamin B12", "Potassium"],
    benefits: "Aids digestion, prevents acidity and heartburn common in pregnancy, and keeps you cool",
    description: "Aids digestion and prevents acidity and heartburn during pregnancy",
    serving_size: "1 glass", trimester: "All", type: "recommended", is_recommended: true,
    calories: "40", protein: "3 g", iron: "0 mg", calcium: "116 mg", folate: "5 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "0 g", hydration: "92%"
  },
  {
    name: "Homemade Soup", nepali_name: "तरकारीको झोल", emoji: "🍜", category: "Hydration", food_type: "Soup",
    nutrient_group: "Hydration", diet_type: "Vegetarian",
    nutrients: ["Vitamin A", "Vitamin C", "Electrolytes", "Iron"],
    benefits: "Nutritious liquid meal that keeps you hydrated and provides easily digestible nutrients",
    description: "Nutritious liquid meal for hydration and easy digestion",
    serving_size: "1 bowl", trimester: "All", type: "recommended", is_recommended: true,
    calories: "60", protein: "2 g", iron: "0.5 mg", calcium: "20 mg", folate: "15 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "1 g", hydration: "90%"
  },
  {
    name: "Bottle Gourd", nepali_name: "लौका", emoji: "🥒", category: "Vegetables", food_type: "Gourd",
    nutrient_group: "Hydration", diet_type: "Vegetarian",
    nutrients: ["Vitamin C", "Iron", "Fiber", "Magnesium", "Potassium"],
    benefits: "Very high water content keeps you hydrated, easy to digest and gentle on the stomach",
    description: "High water content for hydration and easy digestion during pregnancy",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "20", protein: "0.6 g", iron: "0.4 mg", calcium: "26 mg", folate: "6 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "1 g", hydration: "96%"
  },

  // ===================================================================
  // FIBER RICH FOODS
  // ===================================================================
  {
    name: "Brown Rice", nepali_name: "खैरो चामल", emoji: "🍚", category: "Cereals & Grains", food_type: "Whole Grain",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "B Vitamins", "Magnesium", "Selenium", "Phosphorus"],
    benefits: "Unpolished rice rich in fiber prevents constipation and provides sustained energy for pregnancy",
    description: "Unpolished rice rich in fiber prevents constipation during pregnancy",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "216", protein: "4.5 g", iron: "0.8 mg", calcium: "20 mg", folate: "8 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3.5 g", hydration: "73%"
  },
  {
    name: "Beaten Rice", nepali_name: "चिउरा", emoji: "🍚", category: "Cereals & Grains", food_type: "Flattened Rice",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "Iron", "Vitamin B1", "Carbohydrates"],
    benefits: "Light and easy to digest, provides quick energy and helps with morning sickness when eaten with curd",
    description: "Light and easy to digest, good for morning sickness relief",
    serving_size: "1 cup (50g)", trimester: "All", type: "recommended", is_recommended: true,
    calories: "180", protein: "3 g", iron: "1.5 mg", calcium: "8 mg", folate: "0 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "2 g", hydration: "12%"
  },
  {
    name: "Wheat Roti", nepali_name: "गहुँको रोटी", emoji: "🫓", category: "Cereals & Grains", food_type: "Flatbread",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "B Vitamins", "Iron", "Magnesium", "Selenium"],
    benefits: "Whole wheat provides fiber for digestion and complex carbohydrates for steady energy throughout the day",
    description: "Whole wheat fiber aids digestion and provides steady pregnancy energy",
    serving_size: "2 medium rotis", trimester: "All", type: "recommended", is_recommended: true,
    calories: "210", protein: "7 g", iron: "2 mg", calcium: "24 mg", folate: "20 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "4 g", hydration: "35%"
  },
  {
    name: "Dhido", nepali_name: "ढिडो", emoji: "🌾", category: "Cereals & Grains", food_type: "Porridge",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "Iron", "B Vitamins", "Magnesium"],
    benefits: "Traditional Nepali staple made from buckwheat or millet, rich in fiber and minerals for digestive health",
    description: "Traditional Nepali staple rich in fiber and minerals for digestive health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "200", protein: "5 g", iron: "1.8 mg", calcium: "15 mg", folate: "10 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "4.5 g", hydration: "70%"
  },
  {
    name: "Corn", nepali_name: "मकै", emoji: "🌽", category: "Cereals & Grains", food_type: "Grain",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "B Vitamins", "Magnesium", "Vitamin C", "Antioxidants"],
    benefits: "Contains fiber and folate, supports digestive health and provides energy for expectant mothers",
    description: "Fiber and folate support digestive health during pregnancy",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "177", protein: "5.4 g", iron: "0.9 mg", calcium: "6 mg", folate: "38 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "4 g", hydration: "73%"
  },
  {
    name: "Millet", nepali_name: "कोदो", emoji: "🌾", category: "Cereals & Grains", food_type: "Millet",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "Iron", "Magnesium", "B Vitamins", "Calcium"],
    benefits: "High in iron and fiber, helps prevent anemia and constipation. A traditional Nepali pregnancy food",
    description: "High in iron and fiber, helps prevent anemia and constipation",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "208", protein: "6 g", iron: "3 mg", calcium: "30 mg", folate: "12 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "5 g", hydration: "70%"
  },
  {
    name: "Banana", nepali_name: "केरा", emoji: "🍌", category: "Fruits", food_type: "Fruit",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Potassium", "Vitamin B6", "Fiber", "Vitamin C", "Magnesium"],
    benefits: "Rich in potassium to prevent leg cramps and fiber to prevent constipation during pregnancy",
    description: "Rich in potassium and fiber for leg cramps and constipation relief",
    serving_size: "1 medium", trimester: "All", type: "recommended", is_recommended: true,
    calories: "105", protein: "1.3 g", iron: "0.3 mg", calcium: "6 mg", folate: "24 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3.1 g", hydration: "75%"
  },
  {
    name: "Apple", nepali_name: "स्याउ", emoji: "🍎", category: "Fruits", food_type: "Fruit",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "Vitamin C", "Antioxidants", "Potassium"],
    benefits: "Pectin fiber aids digestion and antioxidants support immune health during pregnancy",
    description: "Pectin fiber aids digestion and antioxidants support immune health",
    serving_size: "1 medium", trimester: "All", type: "recommended", is_recommended: true,
    calories: "95", protein: "0.5 g", iron: "0.1 mg", calcium: "6 mg", folate: "3 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "4.4 g", hydration: "86%"
  },
  {
    name: "Pear", nepali_name: "नास्पाती", emoji: "🍐", category: "Fruits", food_type: "Fruit",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "Vitamin C", "Vitamin K", "Copper"],
    benefits: "Gentle fiber helps regulate digestion and prevents constipation common in pregnancy",
    description: "Gentle fiber regulates digestion and prevents pregnancy constipation",
    serving_size: "1 medium", trimester: "All", type: "recommended", is_recommended: true,
    calories: "101", protein: "0.6 g", iron: "0.2 mg", calcium: "9 mg", folate: "7 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "5.5 g", hydration: "84%"
  },
  {
    name: "Pumpkin", nepali_name: "फर्सी", emoji: "🎃", category: "Vegetables", food_type: "Gourd",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Vitamin A", "Fiber", "Vitamin C", "Potassium", "Iron"],
    benefits: "Beta-carotene supports fetal vision development, fiber aids digestion and prevents constipation",
    description: "Beta-carotene for vision development and fiber for digestion",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "50", protein: "1.8 g", iron: "0.8 mg", calcium: "22 mg", folate: "21 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3 g", hydration: "92%"
  },
  {
    name: "Cabbage", nepali_name: "बन्दा गोभी", emoji: "🥬", category: "Vegetables", food_type: "Cruciferous",
    nutrient_group: "Fiber Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Fiber", "Vitamin C", "Vitamin K", "Folate", "Manganese"],
    benefits: "High in vitamin C and fiber, supports immunity and prevents digestive discomfort during pregnancy",
    description: "High in vitamin C and fiber for immunity and digestive comfort",
    serving_size: "1 cup shredded", trimester: "All", type: "recommended", is_recommended: true,
    calories: "22", protein: "1.1 g", iron: "0.4 mg", calcium: "36 mg", folate: "38 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "2.2 g", hydration: "93%"
  },

  // ===================================================================
  // VITAMIN D FOODS
  // ===================================================================
  {
    name: "Milk", nepali_name: "दूध", emoji: "🥛", category: "Dairy", food_type: "Milk",
    nutrient_group: "Vitamin D Foods", diet_type: "Vegetarian",
    nutrients: ["Vitamin D", "Calcium", "Protein", "Vitamin B12", "Phosphorus"],
    benefits: "Rich in calcium and vitamin D for baby's bone development, also provides high-quality protein for growth",
    description: "Rich in calcium and vitamin D for baby's bone and teeth development",
    serving_size: "1 cup (250ml)", trimester: "All", type: "recommended", is_recommended: true,
    calories: "150", protein: "8 g", iron: "0.1 mg", calcium: "300 mg", folate: "12 mcg",
    vitamin_d: "120 IU", omega3: "0 g", fiber: "0 g", hydration: "88%"
  },
  {
    name: "Eggs", nepali_name: "अण्डा", emoji: "🥚", category: "Animal Protein", food_type: "Eggs",
    nutrient_group: "Vitamin D Foods", diet_type: "Non-Vegetarian",
    nutrients: ["Vitamin D", "Protein", "Choline", "Vitamin B12", "Selenium"],
    benefits: "Complete protein with choline for baby's brain development and vitamin D for bone health",
    description: "Complete protein with choline for baby's brain development",
    serving_size: "2 eggs", trimester: "All", type: "recommended", is_recommended: true,
    calories: "140", protein: "12 g", iron: "1.8 mg", calcium: "50 mg", folate: "44 mcg",
    vitamin_d: "82 IU", omega3: "0.1 g", fiber: "0 g", hydration: "76%"
  },
  {
    name: "Mushrooms", nepali_name: "च्याउ", emoji: "🍄", category: "Vegetables", food_type: "Fungus",
    nutrient_group: "Vitamin D Foods", diet_type: "Vegetarian",
    nutrients: ["Vitamin D", "B Vitamins", "Selenium", "Potassium", "Fiber"],
    benefits: "One of the few plant sources of vitamin D, supports bone health and immune function during pregnancy",
    description: "Plant source of vitamin D for bone and immune health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "44", protein: "3.4 g", iron: "0.8 mg", calcium: "2 mg", folate: "21 mcg",
    vitamin_d: "400 IU", omega3: "0 g", fiber: "2 g", hydration: "91%"
  },

  // ===================================================================
  // OMEGA-3 FOODS
  // ===================================================================
  {
    name: "Walnuts", nepali_name: "ओखर", emoji: "🌰", category: "Nuts & Seeds", food_type: "Tree Nut",
    nutrient_group: "Omega-3 Foods", diet_type: "Vegetarian",
    nutrients: ["Omega-3", "Protein", "Folate", "Vitamin E", "Magnesium"],
    benefits: "Rich in plant-based omega-3 (ALA) essential for baby's brain and eye development during pregnancy",
    description: "Rich in omega-3 for baby's brain and eye development",
    serving_size: "4-5 halves", trimester: "All", type: "recommended", is_recommended: true,
    calories: "185", protein: "4.3 g", iron: "0.8 mg", calcium: "28 mg", folate: "27 mcg",
    vitamin_d: "0 IU", omega3: "2.5 g", fiber: "1.9 g", hydration: "4%"
  },
  {
    name: "Flax Seeds", nepali_name: "अलसी", emoji: "🌱", category: "Nuts & Seeds", food_type: "Seed",
    nutrient_group: "Omega-3 Foods", diet_type: "Vegetarian",
    nutrients: ["Omega-3", "Fiber", "Lignans", "Magnesium", "Thiamine"],
    benefits: "Excellent plant source of omega-3 for fetal brain development and fiber for digestive health",
    description: "Plant omega-3 for brain development and fiber for digestion",
    serving_size: "1 tbsp ground", trimester: "All", type: "recommended", is_recommended: true,
    calories: "55", protein: "1.9 g", iron: "0.6 mg", calcium: "26 mg", folate: "7 mcg",
    vitamin_d: "0 IU", omega3: "2.3 g", fiber: "2.8 g", hydration: "5%"
  },
  {
    name: "Freshwater Fish", nepali_name: "माछा", emoji: "🐟", category: "Animal Protein", food_type: "Fish",
    nutrient_group: "Omega-3 Foods", diet_type: "Non-Vegetarian",
    nutrients: ["Omega-3", "Protein", "Vitamin D", "Vitamin B12", "Iodine"],
    benefits: "Rich in omega-3 DHA crucial for baby's brain development, also provides lean protein and iodine",
    description: "Rich in omega-3 DHA for baby's brain development",
    serving_size: "100g cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "120", protein: "20 g", iron: "1.5 mg", calcium: "80 mg", folate: "10 mcg",
    vitamin_d: "200 IU", omega3: "1.5 g", fiber: "0 g", hydration: "75%"
  },
  {
    name: "Soybeans", nepali_name: "भटमास", emoji: "🫘", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Omega-3 Foods", diet_type: "Vegetarian",
    nutrients: ["Omega-3", "Protein", "Iron", "Folate", "Fiber"],
    benefits: "Complete plant protein with omega-3, iron, and fiber — an excellent pregnancy superfood for Nepali mothers",
    description: "Complete plant protein with omega-3 for overall pregnancy health",
    serving_size: "1/2 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "148", protein: "14 g", iron: "4.4 mg", calcium: "88 mg", folate: "46 mcg",
    vitamin_d: "0 IU", omega3: "0.5 g", fiber: "5 g", hydration: "65%"
  },

  // ===================================================================
  // PROTEIN RICH FOODS
  // ===================================================================
  {
    name: "Moong Dal", nepali_name: "मुङ्ग दाल", emoji: "🫘", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Protein Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Protein", "Fiber", "Folate", "Iron", "Magnesium"],
    benefits: "Easily digestible dal rich in protein and folate, ideal for pregnancy with anti-nausea properties",
    description: "Easily digestible protein and folate for pregnancy health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "212", protein: "14 g", iron: "2.5 mg", calcium: "27 mg", folate: "160 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "8 g", hydration: "72%"
  },
  {
    name: "Black Gram", nepali_name: "मासको दाल", emoji: "🫘", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Protein Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Protein", "Iron", "Folate", "Fiber", "Calcium"],
    benefits: "High in protein and iron, helps build baby's tissues and prevents maternal anemia",
    description: "High in protein and iron for fetal tissue growth and anemia prevention",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "200", protein: "12 g", iron: "3.5 mg", calcium: "60 mg", folate: "120 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "6 g", hydration: "70%"
  },
  {
    name: "Chicken", nepali_name: "कुखुराको मासु", emoji: "🍗", category: "Animal Protein", food_type: "Poultry",
    nutrient_group: "Protein Rich Foods", diet_type: "Non-Vegetarian",
    nutrients: ["Protein", "B Vitamins", "Iron", "Zinc", "Selenium"],
    benefits: "Lean protein supports baby's muscle and tissue development, iron prevents maternal anemia",
    description: "Lean protein for fetal muscle development and iron for anemia prevention",
    serving_size: "100g cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "165", protein: "31 g", iron: "1 mg", calcium: "11 mg", folate: "4 mcg",
    vitamin_d: "2 IU", omega3: "0 g", fiber: "0 g", hydration: "65%"
  },
  {
    name: "Peanuts", nepali_name: "बदाम", emoji: "🥜", category: "Nuts & Seeds", food_type: "Legume",
    nutrient_group: "Protein Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Protein", "Folate", "Vitamin E", "Magnesium", "Healthy Fats"],
    benefits: "Affordable protein source with folate for neural tube development and healthy fats for baby's growth",
    description: "Affordable protein and folate for neural tube and baby's growth",
    serving_size: "1/4 cup", trimester: "All", type: "recommended", is_recommended: true,
    calories: "207", protein: "9 g", iron: "1.3 mg", calcium: "26 mg", folate: "68 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "2.4 g", hydration: "3%"
  },
  {
    name: "Paneer", nepali_name: "पनीर", emoji: "🧀", category: "Dairy", food_type: "Fresh Cheese",
    nutrient_group: "Protein Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Protein", "Calcium", "Vitamin B12", "Phosphorus", "Zinc"],
    benefits: "Rich in high-quality protein and calcium for baby's muscle and bone development",
    description: "High-quality protein and calcium for baby's muscle and bone development",
    serving_size: "100g", trimester: "All", type: "recommended", is_recommended: true,
    calories: "265", protein: "18 g", iron: "0 mg", calcium: "500 mg", folate: "0 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "0 g", hydration: "63%"
  },
  {
    name: "Green Peas", nepali_name: "केराउ", emoji: "🫛", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Protein Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Protein", "Fiber", "Vitamin K", "Vitamin C", "Folate"],
    benefits: "Good source of plant protein and fiber that supports digestive health during pregnancy",
    description: "Plant protein and fiber to support digestive health",
    serving_size: "1/2 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "67", protein: "4.5 g", iron: "1.2 mg", calcium: "18 mg", folate: "50 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "4.4 g", hydration: "80%"
  },
  {
    name: "Cowpeas", nepali_name: "बोडी", emoji: "🫘", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Protein Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Protein", "Folate", "Fiber", "Iron", "Potassium"],
    benefits: "Widely eaten in Nepal, provides protein and fiber for steady energy and digestive health",
    description: "Nepali staple legume providing protein and fiber for energy",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "200", protein: "13 g", iron: "2.5 mg", calcium: "40 mg", folate: "140 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "6 g", hydration: "70%"
  },
  {
    name: "Rahar Dal", nepali_name: "रहर दाल", emoji: "🫘", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Protein Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Protein", "Folate", "Fiber", "B Vitamins", "Magnesium"],
    benefits: "Common Nepali dal rich in protein and folate, essential for fetal neural tube development",
    description: "Common Nepali dal with protein and folate for neural tube health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "195", protein: "11 g", iron: "2 mg", calcium: "25 mg", folate: "135 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "5 g", hydration: "72%"
  },

  // ===================================================================
  // IRON RICH FOODS
  // ===================================================================
  {
    name: "Spinach", nepali_name: "पालुङ्गो", emoji: "🥬", category: "Green Vegetables", food_type: "Leafy Green",
    nutrient_group: "Iron Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Iron", "Folate", "Vitamin A", "Vitamin C", "Calcium"],
    benefits: "Excellent source of iron and folate, helps prevent anemia and supports neural tube development",
    description: "Rich in iron and folate to prevent anemia and support neural tube development",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "41", protein: "5.3 g", iron: "6.4 mg", calcium: "245 mg", folate: "263 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "4.3 g", hydration: "91%"
  },
  {
    name: "Masoor Dal", nepali_name: "मसुर दाल", emoji: "🫘", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Iron Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Iron", "Folate", "Protein", "Fiber", "Magnesium"],
    benefits: "Quick-cooking dal rich in iron and folate, helps maintain healthy blood and prevent anemia",
    description: "Quick-cooking dal rich in iron and folate for healthy blood",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "220", protein: "16 g", iron: "6.6 mg", calcium: "38 mg", folate: "358 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "16 g", hydration: "70%"
  },
  {
    name: "Chickpeas", nepali_name: "चना", emoji: "🫘", category: "Pulses & Legumes", food_type: "Legume",
    nutrient_group: "Iron Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Iron", "Folate", "Protein", "Fiber", "Manganese"],
    benefits: "High in iron and fiber, supports energy levels and prevents constipation during pregnancy",
    description: "High in iron and fiber for energy and digestive health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "268", protein: "14.5 g", iron: "4.8 mg", calcium: "80 mg", folate: "282 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "12.5 g", hydration: "66%"
  },
  {
    name: "Pumpkin Seeds", nepali_name: "फर्सीको गेडा", emoji: "🌰", category: "Nuts & Seeds", food_type: "Seed",
    nutrient_group: "Iron Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Iron", "Zinc", "Magnesium", "Protein", "Healthy Fats"],
    benefits: "Excellent source of iron and zinc, supports immune function and energy during pregnancy",
    description: "Excellent source of iron and zinc for immune function and energy",
    serving_size: "1/4 cup", trimester: "All", type: "recommended", is_recommended: true,
    calories: "180", protein: "8.5 g", iron: "4.2 mg", calcium: "12 mg", folate: "16 mcg",
    vitamin_d: "0 IU", omega3: "0.1 g", fiber: "1.7 g", hydration: "4%"
  },
  {
    name: "Pomegranate", nepali_name: "अनार", emoji: "🍎", category: "Fruits", food_type: "Fruit",
    nutrient_group: "Iron Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Iron", "Vitamin C", "Folate", "Antioxidants", "Potassium"],
    benefits: "Rich in iron and vitamin C (which boosts iron absorption), supports healthy blood flow to baby",
    description: "Rich in iron and vitamin C for healthy blood flow and iron absorption",
    serving_size: "1/2 cup seeds", trimester: "All", type: "recommended", is_recommended: true,
    calories: "83", protein: "1.7 g", iron: "0.3 mg", calcium: "5 mg", folate: "38 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3.5 g", hydration: "78%"
  },
  {
    name: "Mutton", nepali_name: "खसीको मासु", emoji: "🍖", category: "Animal Protein", food_type: "Red Meat",
    nutrient_group: "Iron Rich Foods", diet_type: "Non-Vegetarian",
    nutrients: ["Iron", "Protein", "Vitamin B12", "Zinc", "Selenium"],
    benefits: "Rich in heme iron which is easily absorbed, helps prevent and treat maternal anemia",
    description: "Rich in heme iron for anemia prevention and protein for fetal growth",
    serving_size: "100g cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "280", protein: "25 g", iron: "3.5 mg", calcium: "15 mg", folate: "5 mcg",
    vitamin_d: "2 IU", omega3: "0 g", fiber: "0 g", hydration: "60%"
  },
  {
    name: "Beetroot", nepali_name: "चुकन्दर", emoji: "🫘", category: "Vegetables", food_type: "Root Vegetable",
    nutrient_group: "Iron Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Iron", "Folate", "Fiber", "Vitamin C", "Potassium"],
    benefits: "Contains iron and folate for blood health, betaine supports liver function during pregnancy",
    description: "Iron and folate for blood health during pregnancy",
    serving_size: "1/2 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "37", protein: "1.4 g", iron: "1.1 mg", calcium: "10 mg", folate: "74 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "2 g", hydration: "88%"
  },
  {
    name: "Garden Cress Seeds", nepali_name: "चम्सुर", emoji: "🌱", category: "Nuts & Seeds", food_type: "Seed",
    nutrient_group: "Iron Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Iron", "Folate", "Protein", "Fiber", "Calcium"],
    benefits: "Traditional Nepali pregnancy superfood, extremely high in iron and folate. Often given to new mothers for recovery",
    description: "Traditional pregnancy superfood very high in iron and folate",
    serving_size: "1 tbsp", trimester: "All", type: "recommended", is_recommended: true,
    calories: "45", protein: "2 g", iron: "2.5 mg", calcium: "27 mg", folate: "40 mcg",
    vitamin_d: "0 IU", omega3: "0.1 g", fiber: "1 g", hydration: "5%"
  },

  // ===================================================================
  // CALCIUM RICH FOODS
  // ===================================================================
  {
    name: "Curd", nepali_name: "दही", emoji: "🥣", category: "Dairy", food_type: "Fermented Dairy",
    nutrient_group: "Calcium Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Calcium", "Protein", "Probiotics", "Vitamin B12", "Phosphorus"],
    benefits: "High in calcium for baby's bone development and probiotics for maternal digestive health",
    description: "High in calcium for bones and probiotics for digestive health",
    serving_size: "1 cup", trimester: "All", type: "recommended", is_recommended: true,
    calories: "150", protein: "13 g", iron: "0 mg", calcium: "300 mg", folate: "10 mcg",
    vitamin_d: "80 IU", omega3: "0 g", fiber: "0 g", hydration: "85%"
  },
  {
    name: "Sesame Seeds", nepali_name: "तिल", emoji: "🌱", category: "Nuts & Seeds", food_type: "Seed",
    nutrient_group: "Calcium Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Calcium", "Iron", "Magnesium", "Copper", "Zinc"],
    benefits: "Very high in calcium for baby's bone and teeth formation, also provides iron and healthy fats",
    description: "Very high in calcium for baby's bone and teeth formation",
    serving_size: "1 tbsp", trimester: "All", type: "recommended", is_recommended: true,
    calories: "52", protein: "1.6 g", iron: "1.3 mg", calcium: "88 mg", folate: "10 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "1 g", hydration: "3%"
  },
  {
    name: "Mustard Greens", nepali_name: "रायोको साग", emoji: "🥬", category: "Green Vegetables", food_type: "Leafy Green",
    nutrient_group: "Calcium Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Calcium", "Iron", "Folate", "Vitamin K", "Vitamin A"],
    benefits: "Rich in calcium and folate, supports bone development and helps prevent neural tube defects",
    description: "Rich in calcium and folate for bone and neural tube health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "36", protein: "3.6 g", iron: "1.8 mg", calcium: "165 mg", folate: "130 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3 g", hydration: "91%"
  },
  {
    name: "Radish Leaves", nepali_name: "मुलाको साग", emoji: "🥬", category: "Green Vegetables", food_type: "Leafy Green",
    nutrient_group: "Calcium Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Calcium", "Iron", "Vitamin A", "Vitamin C", "Folate"],
    benefits: "Highly nutritious leafy green rich in calcium and iron, commonly used in Nepali cooking",
    description: "Nutritious leafy green rich in calcium and iron for pregnancy",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "25", protein: "1.5 g", iron: "1.5 mg", calcium: "190 mg", folate: "55 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "1.5 g", hydration: "93%"
  },
  {
    name: "Amaranth Leaves", nepali_name: "लट्टे साग", emoji: "🥬", category: "Green Vegetables", food_type: "Leafy Green",
    nutrient_group: "Calcium Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Calcium", "Iron", "Folate", "Vitamin A", "Vitamin C"],
    benefits: "Very high in calcium and iron, commonly available in Nepal, supports bone health and anemia prevention",
    description: "Very high in calcium for bones and iron for anemia prevention",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "30", protein: "3 g", iron: "2.5 mg", calcium: "276 mg", folate: "85 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "2.1 g", hydration: "91%"
  },
  {
    name: "Drumsticks", nepali_name: "सजिबन", emoji: "🥦", category: "Vegetables", food_type: "Pod Vegetable",
    nutrient_group: "Calcium Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Calcium", "Iron", "Vitamin C", "Vitamin A", "Protein"],
    benefits: "Highly nutritious vegetable rich in calcium and iron, commonly available in Nepali markets and supports bone health",
    description: "Nutrient-rich vegetable high in calcium and iron for pregnancy health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "64", protein: "3.5 g", iron: "1.5 mg", calcium: "170 mg", folate: "35 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3 g", hydration: "86%"
  },

  // ===================================================================
  // FOLATE RICH FOODS
  // ===================================================================
  {
    name: "Fenugreek Leaves", nepali_name: "मेथीको साग", emoji: "🌿", category: "Green Vegetables", food_type: "Leafy Green",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Folate", "Iron", "Fiber", "Vitamin K", "Calcium"],
    benefits: "Excellent source of folate for neural tube development and iron for red blood cell formation",
    description: "Excellent folate source for neural tube development in early pregnancy",
    serving_size: "1/2 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "32", protein: "2.5 g", iron: "3.2 mg", calcium: "95 mg", folate: "120 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3.5 g", hydration: "88%"
  },
  {
    name: "Cauliflower", nepali_name: "काउली", emoji: "🥦", category: "Green Vegetables", food_type: "Cruciferous",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Folate", "Vitamin C", "Vitamin K", "Fiber", "B Vitamins"],
    benefits: "Rich in folate and vitamin C, supports neural tube development and immune function during pregnancy",
    description: "Rich in folate and vitamin C for neural tube and immune health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "28", protein: "2 g", iron: "0.4 mg", calcium: "22 mg", folate: "55 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "2.9 g", hydration: "92%"
  },
  {
    name: "Orange", nepali_name: "सुन्तला", emoji: "🍊", category: "Fruits", food_type: "Citrus",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Vitamin C", "Folate", "Fiber", "Potassium", "Thiamine"],
    benefits: "Excellent source of vitamin C that boosts iron absorption and folate for baby's neural tube development",
    description: "Excellent source of vitamin C for iron absorption and folate for neural tube",
    serving_size: "1 medium", trimester: "All", type: "recommended", is_recommended: true,
    calories: "62", protein: "1.2 g", iron: "0.1 mg", calcium: "52 mg", folate: "40 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3.1 g", hydration: "86%"
  },
  {
    name: "Guava", nepali_name: "अम्बा", emoji: "🍈", category: "Fruits", food_type: "Fruit",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Vitamin C", "Folate", "Fiber", "Potassium", "Vitamin A"],
    benefits: "Exceptionally high in vitamin C (4x more than orange), rich in folate, and affordable year-round in Nepal",
    description: "Exceptionally high in vitamin C and folate, affordable in Nepal year-round",
    serving_size: "1 medium", trimester: "All", type: "recommended", is_recommended: true,
    calories: "68", protein: "1.4 g", iron: "0.3 mg", calcium: "22 mg", folate: "49 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3 g", hydration: "81%"
  },
  {
    name: "Papaya", nepali_name: "मेवा", emoji: "🧡", category: "Fruits", food_type: "Fruit",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Folate", "Vitamin C", "Vitamin A", "Fiber", "Potassium"],
    benefits: "Ripe papaya is rich in folate, vitamin C, and vitamin A, supports immune function and fetal development — only eat fully ripe",
    description: "Ripe papaya provides folate, vitamin C, and vitamin A for fetal development",
    serving_size: "1 cup diced (ripe only)", trimester: "All", type: "recommended", is_recommended: true,
    calories: "55", protein: "0.9 g", iron: "0.1 mg", calcium: "24 mg", folate: "53 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "2.5 g", hydration: "88%"
  },
  {
    name: "Mango", nepali_name: "आँप", emoji: "🥭", category: "Fruits", food_type: "Fruit",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Folate", "Vitamin C", "Vitamin A", "Fiber", "Potassium"],
    benefits: "Seasonal fruit rich in folate and vitamin A, supports neural tube development and vision health",
    description: "Seasonal fruit rich in folate and vitamin A for development",
    serving_size: "1 medium (seasonal)", trimester: "All", type: "recommended", is_recommended: true,
    calories: "150", protein: "1.4 g", iron: "0.3 mg", calcium: "18 mg", folate: "71 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3.3 g", hydration: "83%"
  },
  {
    name: "Bitter Gourd", nepali_name: "करेला", emoji: "🥒", category: "Vegetables", food_type: "Gourd",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Folate", "Vitamin C", "Iron", "Fiber", "Magnesium"],
    benefits: "Contains folate and iron, helps regulate blood sugar levels — important for preventing gestational diabetes",
    description: "Contains folate and iron, helps regulate blood sugar in pregnancy",
    serving_size: "1/2 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "24", protein: "1 g", iron: "0.6 mg", calcium: "14 mg", folate: "51 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "1.6 g", hydration: "92%"
  },
  {
    name: "Okra", nepali_name: "भिण्डी", emoji: "🫘", category: "Green Vegetables", food_type: "Pod Vegetable",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Folate", "Vitamin C", "Fiber", "Magnesium", "Vitamin K"],
    benefits: "Good source of folate and fiber, helps prevent neural tube defects and supports digestive health",
    description: "Good source of folate for neural tube health and fiber for digestion",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "36", protein: "2 g", iron: "0.6 mg", calcium: "50 mg", folate: "46 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "3 g", hydration: "90%"
  },
  {
    name: "Green Beans", nepali_name: "हरियो सिमी", emoji: "🫘", category: "Green Vegetables", food_type: "Legume",
    nutrient_group: "Folate Rich Foods", diet_type: "Vegetarian",
    nutrients: ["Folate", "Vitamin C", "Fiber", "Vitamin K", "Silicon"],
    benefits: "Provides folate for neural tube development, fiber for digestion, and essential minerals for bone health",
    description: "Folate for neural tube, fiber for digestion, minerals for bone health",
    serving_size: "1 cup cooked", trimester: "All", type: "recommended", is_recommended: true,
    calories: "44", protein: "2.4 g", iron: "1.2 mg", calcium: "37 mg", folate: "41 mcg",
    vitamin_d: "0 IU", omega3: "0 g", fiber: "4 g", hydration: "89%"
  },

  // ===================================================================
  // FOODS TO AVOID
  // ===================================================================
  {
    name: "Alcohol", nepali_name: "रक्सी/जाँड", emoji: "⚠️", category: "Beverages", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "No amount of alcohol is safe during pregnancy",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Causes fetal alcohol syndrome, developmental delays, and birth defects",
    reason_to_avoid: "Alcohol including raksi, jaand, beer, and wine crosses the placenta and can cause fetal alcohol spectrum disorders, developmental delays, and low birth weight. No safe level exists during pregnancy",
    safer_alternative: "Non-alcoholic beverages, buttermilk, lemon water, or fruit juice",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Tobacco", nepali_name: "सुर्ती/गुटखा", emoji: "⚠️", category: "Beverages", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Extremely harmful during pregnancy — avoid all forms including chewing tobacco",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Increases risk of miscarriage, premature birth, and low birth weight",
    reason_to_avoid: "Tobacco in any form (smoking, chewing, surti, gutkha) restricts fetal oxygen supply, increases miscarriage risk, causes premature birth, low birth weight, and sudden infant death syndrome (SIDS)",
    safer_alternative: "Seek professional help to quit. Chew sugar-free gum or fennel seeds instead",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Excess Caffeine", nepali_name: "धेरै चिया/कफी", emoji: "⚠️", category: "Beverages", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Limit caffeine to less than 200mg daily (about 2 small cups of tea)",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Excessive caffeine increases risk of low birth weight and miscarriage",
    reason_to_avoid: "High caffeine intake is linked to increased risk of miscarriage, low birth weight, and fetal growth restriction. Many Nepali women drink strong chiya multiple times daily — limit to 1-2 small cups",
    safer_alternative: "Herbal teas (pregnancy-safe), decaf tea, or warm milk",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Raw or Undercooked Eggs", nepali_name: "काँचो अण्डा", emoji: "⚠️", category: "Animal Protein", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Non-Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Risk of Salmonella infection which can cause severe illness",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Risk of Salmonella food poisoning causing severe vomiting and dehydration",
    reason_to_avoid: "Raw or undercooked eggs may contain Salmonella bacteria, causing severe food poisoning that is especially dangerous during pregnancy",
    safer_alternative: "Fully cooked eggs — hard-boiled, well-scrambled, or fully set omelets",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Raw or Undercooked Meat", nepali_name: "काँचो मासु", emoji: "⚠️", category: "Animal Protein", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Non-Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Risk of toxoplasmosis and serious bacterial infections",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Risk of toxoplasmosis, Salmonella, and E. coli infection",
    reason_to_avoid: "Raw or undercooked meat including sekuwa (barbecue) that isn't fully cooked may contain Toxoplasma, Salmonella, and E. coli that can severely harm both mother and baby",
    safer_alternative: "Well-cooked meat cooked to safe internal temperature throughout",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Unpasteurized Milk", nepali_name: "खाँचको दूध", emoji: "⚠️", category: "Dairy", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Common in villages — always boil milk thoroughly before drinking",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Risk of Listeria infection which can cause miscarriage or severe illness",
    reason_to_avoid: "Unpasteurized or raw milk commonly sold in Nepali villages can contain Listeria, Brucella, and other harmful bacteria. Always boil milk thoroughly before consuming during pregnancy",
    safer_alternative: "Boiled or pasteurized milk, or packaged milk from trusted brands",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "High Mercury Fish", nepali_name: "धेरै पारा भएको माछा", emoji: "⚠️", category: "Seafood", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Non-Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Large predatory fish like shark, swordfish, and king mackerel",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "High mercury levels can harm baby's developing nervous system",
    reason_to_avoid: "Large predatory fish accumulate high levels of mercury which can cross the placenta and damage the fetal nervous system. While less common in Nepal, avoid imported canned tuna and large ocean fish",
    safer_alternative: "Freshwater fish from clean sources, in moderation (2-3 servings per week)",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Raw Fish", nepali_name: "काँचो माछा", emoji: "⚠️", category: "Seafood", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Non-Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Risk of harmful bacteria and parasites harmful to pregnancy",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Risk of bacterial or parasitic infection including Listeria and Salmonella",
    reason_to_avoid: "Raw or undercooked fish including sushi-style preparations may contain harmful bacteria, viruses, and parasites that cause foodborne illness especially dangerous during pregnancy",
    safer_alternative: "Well-cooked freshwater fish from trusted sources",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Unwashed Raw Vegetables", nepali_name: "नधोइएको तरकारी", emoji: "⚠️", category: "Vegetables", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "May carry toxoplasmosis from soil — wash all vegetables thoroughly",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "Risk of toxoplasmosis infection from soil-borne parasites",
    reason_to_avoid: "Unwashed raw vegetables and fruits can carry Toxoplasma gondii from contaminated soil. In Nepal where fresh vegetables are used daily, wash all produce thoroughly with clean water and salt water soak",
    safer_alternative: "Thoroughly washed and cooked vegetables, or soak raw salad vegetables in salt water for 10 minutes",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Street Food", nepali_name: "सडक खाना", emoji: "⚠️", category: "General", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "High risk of food contamination and poor hygiene during pregnancy",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "High risk of food poisoning, hepatitis, and bacterial infections",
    reason_to_avoid: "Street food including momo, chatpate, panipuri, and other roadside items may be prepared under unhygienic conditions. Risk of hepatitis A, typhoid, food poisoning, and stomach infections is significantly higher during pregnancy",
    safer_alternative: "Home-cooked meals prepared with clean water and proper hygiene. If eating out, choose established restaurants",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
  {
    name: "Unripe Papaya", nepali_name: "काँचो मेवा", emoji: "⚠️", category: "Fruits", food_type: "Unsafe",
    nutrient_group: "Foods to Avoid", diet_type: "Vegetarian",
    nutrients: [], benefits: "Not applicable",
    description: "Raw/unripe papaya contains latex that may trigger uterine contractions",
    serving_size: "N/A", trimester: "All", type: "avoid", is_recommended: false,
    warning: "May stimulate uterine contractions and increase miscarriage risk",
    reason_to_avoid: "Unripe or semi-ripe papaya contains high concentration of latex (including papain) that may stimulate uterine contractions and has been associated with increased miscarriage risk. Only eat fully ripe papaya",
    safer_alternative: "Fully ripe papaya (yellow/orange all over), or other safe fruits like banana, apple, or guava",
    calories: "N/A", protein: "N/A", iron: "N/A", calcium: "N/A", folate: "N/A",
    vitamin_d: "N/A", omega3: "N/A", fiber: "N/A", hydration: "N/A"
  },
];

const seedFoods = async () => {
  try {
    await Food.destroy({ where: {} });
    await Food.bulkCreate(foodSeeds);
    const vegRecommended = foodSeeds.filter(f => f.diet_type === 'Vegetarian' && f.is_recommended);
    const nonVegRecommended = foodSeeds.filter(f => f.diet_type === 'Non-Vegetarian' && f.is_recommended);
    const avoidCount = foodSeeds.filter(f => !f.is_recommended).length;
    const totalRecommended = vegRecommended.length + nonVegRecommended.length;
    console.log(`✅ ${foodSeeds.length} food items seeded (${totalRecommended} recommended: ${vegRecommended.length} vegetarian + ${nonVegRecommended.length} non-vegetarian, ${avoidCount} to avoid)`);
  } catch (error) {
    console.error('❌ Error seeding food items:', error);
  }
};

export default seedFoods;
