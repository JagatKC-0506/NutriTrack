/**
 * Get nutrition tips
 */
export const getNutritionTips = (req, res) => {
  const tips = {
    tips: [
      'Eat plenty of fruits and vegetables',
      'Include iron-rich foods like lean meat and beans',
      'Take prenatal vitamins with folic acid',
      'Stay hydrated - drink plenty of water',
      'Eat calcium-rich foods for bone health',
    ],
  };
  return res.json(tips);
};

/**
 * Get safe and unsafe foods
 */
export const getSafeUnsafeFoods = (req, res) => {
  const foods = {
    safe: [
      'Pasteurized dairy',
      'Cooked meats',
      'Washed fruits and vegetables',
      'Eggs (fully cooked)',
      'Beans and legumes',
    ],
    unsafe: [
      'Raw fish',
      'Unpasteurized cheese',
      'Deli meats (unless heated)',
      'Alcohol',
      'Raw or undercooked eggs',
    ],
  };
  return res.json(foods);
};

/**
 * Get vaccine schedule
 */
export const getVaccineSchedule = (req, res) => {
  const schedule = {
    schedule: [
      {
        vaccine: 'Tdap (Tetanus, Diphtheria, Pertussis)',
        timing: '27–36 weeks of pregnancy (preferably early in this window)',
        note: 'Recommended during every pregnancy to protect baby from whooping cough',
      },
      {
        vaccine: 'Influenza (Flu shot - inactivated)',
        timing: 'Any trimester (ideally before or during flu season)',
        note: 'Safe and recommended; get every year',
      },
      {
        vaccine: 'COVID-19 (updated 2025-2026 formulation)',
        timing: 'Any trimester',
        note: 'Strongly recommended; protects mom and passes antibodies to baby',
      },
      {
        vaccine: 'RSV (Abrysvo by Pfizer only)',
        timing: '32–36 weeks of pregnancy (September–January in most areas)',
        note: 'Seasonal; protects baby from severe RSV in first 6 months',
      },
    ],
    source: 'Based on CDC and ACOG guidelines (2025)',
    disclaimer: 'Always consult your healthcare provider for personalized advice',
  };
  return res.json(schedule);
};

/**
 * Get feeding guide
 */
export const getFeedingGuide = (req, res) => {
  const guide = {
    by_age: {
      '0-6 months': 'Exclusive breast milk or formula',
      '6-8 months': 'Introduce purees, 2-3 meals',
      '9-12 months': 'Finger foods, 3 meals + snacks',
    },
  };
  return res.json(guide);
};

/**
 * Get daily tip
 */
export const getDailyTip = (req, res) => {
  const tips = [
    'Stay hydrated - drink plenty of water',
    'Walk daily for light exercise',
    'Rest when needed - listen to your body',
    'Eat nutrient-rich meals',
    'Keep track of your symptoms',
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  return res.json({ tip: randomTip });
};

/**
 * Get growth milestones reference data (months 0-12)
 */
export const getGrowthMilestones = (req, res) => {
  const milestones = [
    {
      month: 0, title: 'Newborn (0–1 Month)', description: 'Your baby is adjusting to life outside the womb. They communicate through crying and are soothed by your touch and voice.',
      development: [
        { key: 'lifts_head_tummy', name: 'Lifts head briefly when on tummy', emoji: '👶', ageMonths: 0 },
        { key: 'grasp_reflex', name: 'Strong grasp reflex (holds your finger)', emoji: '✊', ageMonths: 0 },
        { key: 'focus_8_12', name: 'Focuses on faces 8–12 inches away', emoji: '👀', ageMonths: 0 },
        { key: 'startle_reflex', name: 'Moro (startle) reflex — reacts to loud sounds', emoji: '😲', ageMonths: 0 },
        { key: 'turns_to_voice', name: 'Turns head toward familiar voices', emoji: '👂', ageMonths: 0 },
      ],
      nutrition: 'Exclusive breastfeeding on demand (8–12 times per day). No water or other foods needed. Ensure proper latch and positioning. If formula-feeding, follow pediatrician\'s guidance on type and quantity.',
      vaccines: ['BCG (at birth or soon after)', 'Hepatitis B — 1st dose (within 24 hours)', 'Polio (OPV-0) — at birth'],
      warning_signs: ['Not feeding well or very weak suck', 'Excessive sleepiness — difficult to wake for feeds', 'Yellow skin or eyes (jaundice) lasting >2 weeks', 'No stool in first 24–48 hours', 'Rapid or difficult breathing', 'Umbilical cord redness or discharge'],
    },
    {
      month: 1, title: '1 Month Old', description: 'Your baby is becoming more alert. They start making small sounds and following you with their eyes.',
      development: [
        { key: 'head_turn_tummy', name: 'Lifts head and turns side to side on tummy', emoji: '💪', ageMonths: 1 },
        { key: 'follows_light', name: 'Follows a moving light or toy briefly with eyes', emoji: '👀', ageMonths: 1 },
        { key: 'coos', name: 'Makes cooing and gurgling sounds', emoji: '🗣️', ageMonths: 1 },
        { key: 'recognizes_parents', name: 'Recognizes parents\' faces and voices', emoji: '😊', ageMonths: 1 },
        { key: 'moves_arms_legs', name: 'Moves arms and legs symmetrically', emoji: '🦵', ageMonths: 1 },
      ],
      nutrition: 'Continue exclusive breastfeeding on demand (8–12 times/day). Baby may have growth spurt around 2–3 weeks; feed more frequently during this time. Monitor wet diapers (6–8 per day) to ensure adequate intake.',
      vaccines: ['Hepatitis B — 2nd dose (if not given at birth, give now)'],
      warning_signs: ['Not gaining weight or poor feeding', 'Persistent jaundice beyond 2 weeks', 'No response to loud sounds', 'Stiff or floppy body', 'Excessive crying or extreme fussiness', 'Fewer than 6 wet diapers in 24 hours'],
    },
    {
      month: 2, title: '2 Months Old', description: 'Social smiles begin! Your baby becomes more interactive and may start to soothe themselves by sucking on their hand.',
      development: [
        { key: 'social_smile', name: 'Smiles socially in response to you', emoji: '😊', ageMonths: 2 },
        { key: 'coos_more', name: 'Coos and makes vowel sounds (ahh, ooh)', emoji: '🗣️', ageMonths: 2 },
        { key: 'follows_person', name: 'Follows a person or toy with eyes across midline', emoji: '👀', ageMonths: 2 },
        { key: 'holds_head_45', name: 'Holds head up at 45° on tummy', emoji: '💪', ageMonths: 2 },
        { key: 'hand_to_mouth', name: 'Brings hand to mouth', emoji: '🤚', ageMonths: 2 },
      ],
      nutrition: 'Continue exclusive breastfeeding on demand. At 2 months, baby may space feeds to 7–9 times per day. Continue monitoring wet diapers. Consider vitamin D supplement (400 IU daily) if exclusively breastfed.',
      vaccines: ['Pentavalent — 1st dose (DPT+HepB+Hib)', 'Polio (IPV/OPV) — 1st dose', 'PCV (Pneumococcal) — 1st dose', 'Rotavirus — 1st dose (oral)', 'DTaP — if using separate vaccine schedule'],
      warning_signs: ['Not smiling at people', 'No response to loud sounds', 'Does not track moving objects with eyes', 'Unable to hold head up at all on tummy', 'Arms or legs seem stiff or floppy', 'Cries excessively (more than 3 hours/day)'],
    },
    {
      month: 3, title: '3 Months Old', description: 'Your baby is getting stronger and more coordinated. They love to play and interact with you.',
      development: [
        { key: 'holds_head_up', name: 'Holds head up steadily and pushes up on forearms (tummy time)', emoji: '💪', ageMonths: 3 },
        { key: 'opens_hands', name: 'Opens and closes hands, discovers fingers', emoji: '🖐️', ageMonths: 3 },
        { key: 'babbles', name: 'Babbles and makes sounds when talked to', emoji: '🗣️', ageMonths: 3 },
        { key: 'reaches_for_toys', name: 'Reaches for and bats at dangling toys', emoji: '🧸', ageMonths: 3 },
        { key: 'recognizes_objects', name: 'Recognizes familiar objects and people from a distance', emoji: '😊', ageMonths: 3 },
      ],
      nutrition: 'Continue exclusive breastfeeding. Baby\'s feeding may become more efficient — feeds may be shorter but still frequent. Do NOT introduce solid foods yet. Baby\'s digestive system is not ready.',
      vaccines: ['Pentavalent — 2nd dose', 'Polio (IPV/OPV) — 2nd dose', 'PCV — 2nd dose', 'Rotavirus — 2nd dose (oral)'],
      warning_signs: ['Not responding to sounds or your voice', 'Not smiling at people', 'Does not follow moving objects with eyes', 'Does not reach for or grasp toys', 'Head still flops back when pulled to sit', 'Not gaining weight adequately'],
    },
    {
      month: 4, title: '4 Months Old', description: 'Your baby is becoming more mobile and expressive. They love to play and explore with their mouth and hands.',
      development: [
        { key: 'rolls_over', name: 'Rolls over from tummy to back', emoji: '🔄', ageMonths: 4 },
        { key: 'grasps_rattle', name: 'Grasps and shakes a rattle or toy', emoji: '✊', ageMonths: 4 },
        { key: 'sits_with_support', name: 'Sits with support (pillows or your lap)', emoji: '🪑', ageMonths: 4 },
        { key: 'laughs_aloud', name: 'Laughs out loud', emoji: '😂', ageMonths: 4 },
        { key: 'mouths_objects', name: 'Brings objects to mouth to explore', emoji: '👄', ageMonths: 4 },
      ],
      nutrition: 'Continue exclusive breastfeeding. Breast milk or formula remains the sole source of nutrition. Wait until 6 months for solids. Baby may show interest in food — this is curiosity, not readiness.',
      vaccines: ['Pentavalent — 3rd dose', 'Polio (IPV/OPV) — 3rd dose', 'PCV — 3rd dose', 'Rotavirus — 3rd dose (oral, if using Rotarix schedule)'],
      warning_signs: ['Not rolling over in either direction', 'Does not coo or make sounds', 'Eyes cross most of the time or do not move together', 'Does not grasp or hold objects', 'Seems floppy or stiff', 'Does not watch things as they move'],
    },
    {
      month: 5, title: '5 Months Old', description: 'Your baby is becoming more aware of their surroundings and may start showing preferences for people and toys.',
      development: [
        { key: 'reaches_accurately', name: 'Reaches accurately for objects', emoji: '✋', ageMonths: 5 },
        { key: 'sits_tripod', name: 'Sits briefly in tripod position (leaning forward on hands)', emoji: '🧘', ageMonths: 5 },
        { key: 'responds_to_name', name: 'Turns head toward familiar people when named', emoji: '👂', ageMonths: 5 },
        { key: 'razz_sounds', name: 'Makes razzing or bubbling sounds', emoji: '🫧', ageMonths: 5 },
        { key: 'explores_hands', name: 'Explores objects with hands and mouth', emoji: '🖐️', ageMonths: 5 },
      ],
      nutrition: 'Continue exclusive breastfeeding. At 5 months, baby may be ready for solid foods if showing signs (good head control, sitting with support, loss of tongue thrust reflex). Most babies are ready at 6 months — discuss with your pediatrician.',
      vaccines: ['As per 4-month schedule if any doses were delayed'],
      warning_signs: ['Not reaching for objects', 'Does not turn toward sounds', 'Not making vowel sounds', 'Seems unusually stiff or tight muscles', 'Does not bring objects to mouth', 'Arches back excessively'],
    },
    {
      month: 6, title: '6 Months Old', description: 'A major milestone — time to introduce solid foods! Your baby is now ready to start their food journey alongside breast milk.',
      development: [
        { key: 'sits_independently', name: 'Sits independently for short periods', emoji: '🧘', ageMonths: 6 },
        { key: 'transfers_objects', name: 'Transfers objects from one hand to the other', emoji: '🤲', ageMonths: 6 },
        { key: 'babbles_consonants', name: 'Babbles with consonant sounds (ba, da, ma)', emoji: '🗣️', ageMonths: 6 },
        { key: 'recognizes_name', name: 'Responds to own name', emoji: '👂', ageMonths: 6 },
        { key: 'stranger_anxiety', name: 'Shows stranger anxiety (may cling to parents)', emoji: '😰', ageMonths: 6 },
      ],
      nutrition: 'Introduce solid foods — start with iron-rich purees (mashed dal, mashed pumpkin, mashed banana). Continue breastfeeding alongside solids. Start with 1–2 meals per day, 2–3 tablespoons per meal. Do NOT add salt, sugar, or honey. Continue vitamin D supplement.',
      vaccines: ['Measles — 1st dose (usually at 9 months in Nepal\'s schedule)', 'Check with local immunization center for schedule at 6 months', 'Vitamin A supplement (may be given starting at 6 months)'],
      warning_signs: ['Not sitting with any support', 'Does not reach for or grasp objects', 'No babbling or vocal sounds', 'Does not seem to recognize familiar people', 'Poor head control still', 'Not showing interest in solid foods when offered'],
    },
    {
      month: 7, title: '7 Months Old', description: 'Your baby is becoming more mobile — crawling may begin! They understand more of what you say and may start responding to simple words.',
      development: [
        { key: 'crawling_begins', name: 'Begins crawling (army crawl or on all fours)', emoji: '🐛', ageMonths: 7 },
        { key: 'pincer_starts', name: 'Begins developing pincer grasp (thumb + finger)', emoji: '🤏', ageMonths: 7 },
        { key: 'responds_to_no', name: 'Responds to "no" by stopping briefly', emoji: '🚫', ageMonths: 7 },
        { key: 'sits_well', name: 'Sits well without support', emoji: '🧘', ageMonths: 7 },
        { key: 'plays_peekaboo', name: 'Enjoys peek-a-boo and pat-a-cake games', emoji: '🫣', ageMonths: 7 },
      ],
      nutrition: 'Continue breastfeeding and increase solid foods to 2–3 meals per day. Offer mashed soft foods: rice with dal, mashed vegetables (pumpkin, carrot, potato), mashed fruits (banana, papaya, apple puree). Introduce a variety of tastes. No salt, sugar, or honey.',
      vaccines: ['As per local immunization schedule — check with your health center'],
      warning_signs: ['Not trying to move or crawl', 'Does not reach for objects', 'Does not respond to sounds or name', 'Seems unusually floppy', 'Does not make any consonant sounds', 'Does not show interest in solid foods'],
    },
    {
      month: 8, title: '8 Months Old', description: 'Your baby is on the move! Crawling becomes more coordinated and they explore everything within reach.',
      development: [
        { key: 'creeps_crawls', name: 'Creeps or crawls well on hands and knees', emoji: '🐛', ageMonths: 8 },
        { key: 'pulls_to_stand', name: 'Pulls self to stand holding onto furniture', emoji: '🧍', ageMonths: 8 },
        { key: 'pincer_grasp', name: 'Uses pincer grasp to pick up small objects', emoji: '🤏', ageMonths: 8 },
        { key: 'says_baba_mama', name: 'Babbles "baba" and "mama" (not yet meaningfully)', emoji: '🗣️', ageMonths: 8 },
        { key: 'stranger_anxiety_peak', name: 'Stranger anxiety peaks — may cry with unfamiliar people', emoji: '😰', ageMonths: 8 },
      ],
      nutrition: 'Continue breastfeeding + 3 meals of solids per day. Introduce mashed or soft finger foods: soft roti pieces, steamed vegetable sticks, soft cooked dal, curd (yogurt), well-cooked egg yolk. Encourage self-feeding with hands.',
      vaccines: ['Measles — 1st dose (if not given at 6mo)', 'Check local schedule for any due vaccines'],
      warning_signs: ['Not crawling or moving at all', 'Does not bear weight on legs when held standing', 'Does not search for dropped objects', 'No babbling at all', 'Does not respond to name', 'Shows no affection toward caregivers'],
    },
    {
      month: 9, title: '9 Months Old', description: 'Your baby is becoming more independent and curious. They understand simple commands and may start cruising along furniture.',
      development: [
        { key: 'cruises', name: 'Cruises along furniture (walks holding on)', emoji: '🚶', ageMonths: 9 },
        { key: 'understands_no', name: 'Understands and responds to "no"', emoji: '🚫', ageMonths: 9 },
        { key: 'gestures_bye', name: 'Waves bye-bye and claps hands', emoji: '👋', ageMonths: 9 },
        { key: 'points', name: 'Points at objects with index finger', emoji: '👉', ageMonths: 9 },
        { key: 'object_permanence', name: 'Understands object permanence (looks for hidden toys)', emoji: '🧩', ageMonths: 9 },
      ],
      nutrition: 'Continue breastfeeding + 3 meals + snacks. Offer chopped rather than pureed foods to encourage chewing. Include: soft rice, well-cooked dal, mashed vegetables, curd, soft fruits, steamed momo filling (without spices). Baby can drink small amounts of water from a cup.',
      vaccines: ['Measles — 1st dose (if not yet given)', 'Vitamin A supplement (first dose — check local protocol)', 'JE (Japanese Encephalitis) — if endemic region, check schedule'],
      warning_signs: ['Cannot sit without support', 'Does not crawl or bear weight on legs', 'Does not babble (mama, baba, dada)', 'Does not recognize familiar people', 'Does not look where you point', 'Seems to lose previously gained skills'],
    },
    {
      month: 10, title: '10 Months Old', description: 'Your baby is building toward walking. They love to mimic sounds and actions, and their personality really shines through.',
      development: [
        { key: 'stands_alone', name: 'Stands alone briefly without support', emoji: '🧍', ageMonths: 10 },
        { key: 'cruises_well', name: 'Cruises confidently along furniture', emoji: '🚶', ageMonths: 10 },
        { key: 'says_mama_dada', name: 'Says "mama" and "dada" meaningfully', emoji: '🗣️', ageMonths: 10 },
        { key: 'understands_commands', name: 'Understands simple commands ("give me the ball")', emoji: '👂', ageMonths: 10 },
        { key: 'imitates_sounds', name: 'Imitates sounds and actions of others', emoji: '🪞', ageMonths: 10 },
      ],
      nutrition: 'Continue breastfeeding + 3 meals + 2 snacks. Offer family foods (minus salt/spice) chopped into safe sizes. Include: soft roti, rice, dal, vegetables, eggs, curd, fruits. Encourage cup drinking. Avoid choking hazards: whole grapes, nuts, hard candies.',
      vaccines: ['Check local immunization schedule for 9–12 month vaccines', 'Vitamin A supplement (if due)'],
      warning_signs: ['Cannot stand when supported', 'Does not search for hidden objects', 'Does not babble or make sounds', 'Does not wave bye-bye or clap', 'Does not show recognition of familiar words', 'Seems unusually fearful or withdrawn'],
    },
    {
      month: 11, title: '11 Months Old', description: 'Your baby may take their first steps! They understand far more than they can express and love to explore their environment.',
      development: [
        { key: 'first_steps', name: 'May take first steps (walks with support or alone)', emoji: '🚶', ageMonths: 11 },
        { key: 'says_few_words', name: 'Says 1–2 simple words besides mama/dada', emoji: '🗣️', ageMonths: 11 },
        { key: 'follows_commands', name: 'Follows simple one-step commands ("bring the cup")', emoji: '👂', ageMonths: 11 },
        { key: 'uses_spoon', name: 'Attempts to use spoon (messy but trying)', emoji: '🥄', ageMonths: 11 },
        { key: 'shows_preferences', name: 'Shows clear preferences for toys and foods', emoji: '😋', ageMonths: 11 },
      ],
      nutrition: 'Continue breastfeeding + 3 meals + 2 snacks. Baby can eat most family foods (chopped, not spicy). Include a variety of foods: rice, roti, dal, vegetables, fruits, eggs, curd, paneer, fish. Cut foods into small, safe pieces. Continue to offer water from a cup.',
      vaccines: ['Measles — 2nd dose (if using 2-dose schedule; check local protocol)', 'Vitamin A supplement (if due)', 'Any catch-up vaccines as needed'],
      warning_signs: ['Not pulling to stand or cruising', 'Does not point or gesture', 'Does not say "mama" or "dada"', 'Does not understand simple commands', 'Does not mimic sounds or actions', 'Loses previously acquired skills (regression)'],
    },
    {
      month: 12, title: '12 Months Old (1 Year)', description: 'Happy first birthday! Your baby is now a toddler — walking, saying words, and showing a strong sense of independence.',
      development: [
        { key: 'walks_independently', name: 'Walks independently (may still be unsteady)', emoji: '🚶', ageMonths: 12 },
        { key: 'says_3_words', name: 'Says 2–3 simple words beyond mama/dada', emoji: '🗣️', ageMonths: 12 },
        { key: 'points_to_interest', name: 'Points to show you something interesting', emoji: '👉', ageMonths: 12 },
        { key: 'assists_dressing', name: 'Assists with dressing (holds out arm for sleeve)', emoji: '👕', ageMonths: 12 },
        { key: 'drinks_from_cup', name: 'Drinks from a cup with some spills', emoji: '🥤', ageMonths: 12 },
      ],
      nutrition: 'Transition to family diet (3 meals + 2 snacks) alongside continued breastfeeding if desired. Baby can eat most well-cooked foods: rice, roti, dal, vegetables, fruits, eggs, milk, curd, paneer, fish, chicken (shredded). Introduce whole milk if weaning from formula. Avoid honey until after 12 months.',
      vaccines: ['Measles, Mumps, Rubella (MMR) — 1st dose', 'PCV booster (if due)', 'Hepatitis A — 1st dose (check schedule)', 'Vitamin A supplement (high-dose, per protocol)', 'Any catch-up vaccines'],
      warning_signs: ['Not standing or walking', 'Does not point to objects or pictures', 'Does not say any single words', 'Does not understand simple commands', 'Seems to lose previously acquired skills', 'Excessive mouthing of objects beyond 12 months', 'No eye contact or shared attention'],
    },
  ];

  return res.json(milestones);
};
