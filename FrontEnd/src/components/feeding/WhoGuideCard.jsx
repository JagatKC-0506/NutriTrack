import { CheckCircle2, Info } from 'lucide-react';

const guideDetails = {
  'Exclusively breastfeed or use iron-fortified formula': {
    detail: 'Breast milk is the ideal food for infants — it contains all the nutrients, antibodies, and hydration a baby needs for the first 6 months. If breastfeeding is not possible, iron-fortified infant formula is the only safe alternative. Cow\'s milk, goat\'s milk, or plant-based milks should NOT be given before 12 months as they lack essential nutrients and can stress the kidneys.',
    source: 'WHO — Exclusive breastfeeding for optimal infant health',
  },
  'Feed on demand — watch for early hunger cues': {
    detail: 'Early hunger cues include sucking motions, rooting (turning head toward touch), and bringing hands to mouth. Crying is a late sign of hunger. Feeding on demand — whenever your baby shows these cues — helps establish milk supply and ensures your baby gets enough nutrition. Newborns typically feed 8–12 times per 24 hours.',
    source: 'WHO — Infant and young child feeding counselling',
  },
  'No water or other fluids needed': {
    detail: 'Breast milk and formula are composed of about 87% water — more than enough to keep your baby hydrated even in hot weather. Giving water to infants under 6 months can interfere with electrolyte balance, reduce milk intake, and cause malnutrition. After 6 months, small amounts of water can be introduced with solid foods.',
    source: 'WHO — Infant feeding in emergencies',
  },
  'No solid foods at this stage': {
    detail: 'Before 6 months, a baby\'s digestive system is not ready for solid foods. The gut lining is still developing, and enzymes needed to digest complex foods are not fully active. Early introduction of solids can also increase the risk of choking, allergies, and obesity. The WHO recommends exclusive breastfeeding for the first 6 months.',
    source: 'WHO — Complementary feeding guidance',
  },
  'Continue breastfeeding or formula': {
    detail: 'Breast milk or formula remains the primary source of nutrition even as solids are introduced. Milk provides essential fats, proteins, and micronutrients that solid foods alone cannot replace at this stage. Continue offering breast or bottle before solids to ensure your baby gets enough milk.',
    source: 'WHO — Guiding principles for complementary feeding',
  },
  'Introduce complementary soft foods': {
    detail: 'Start with smooth, mashed, or soft-cooked foods that are easy to swallow. Iron-rich foods (pureed meat, iron-fortified cereal) should be prioritized first since baby\'s iron stores begin to deplete at 6 months. Introduce one food at a time and gradually increase variety and texture.',
    source: 'WHO — Complementary feeding of the breastfed child',
  },
  'Feed 2–3 small meals per day': {
    detail: 'At 6–8 months, a baby\'s stomach is roughly the size of their fist. Start with 2–3 small meals (about 2–4 tablespoons each) per day, gradually increasing as the baby grows. Offer a variety of foods from different food groups at each meal. Always follow with breast milk or formula.',
    source: 'WHO — Infant feeding recommendations',
  },
  'Offer mashed or pureed foods': {
    detail: 'Soft, mashed textures help babies learn to swallow semi-solid foods safely. As your baby gets used to eating, gradually move from pureed to mashed to soft finger foods (around 8–9 months). This progression helps develop oral motor skills needed for speech and chewing.',
    source: 'WHO — Texture progression in complementary feeding',
  },
  'Feed 3–4 meals plus healthy snacks': {
    detail: 'As babies grow, their nutritional needs increase. By 9 months, aim for 3–4 main meals plus 1–2 nutritious snacks per day. Each meal should include a source of protein, carbohydrates, healthy fats, and fruits/vegetables. Continue to offer breast milk or formula alongside meals.',
    source: 'WHO — Feeding frequency for older infants',
  },
  'Encourage self-feeding with finger foods': {
    detail: 'Self-feeding is a crucial developmental milestone. Offer soft finger foods like cooked vegetable strips, soft fruit pieces, or toast fingers. Let your baby hold and explore food — messy eating is part of learning. Self-feeding builds fine motor skills, hand-eye coordination, and independence.',
    source: 'WHO — Responsive feeding practices',
  },
  'Offer a variety of textures and tastes': {
    detail: 'Exposing your baby to different flavors and textures early on helps prevent picky eating later. Include bitter greens, tangy fruits, and mild spices alongside familiar tastes. Research shows that repeated exposure (10–15 attempts) increases acceptance of new foods. Keep offering even if initially refused.',
    source: 'WHO — Dietary diversity for infants and young children',
  },
};

export default function WhoGuideCard({ ageMonths, onInfo }) {
  const guides = [
    {
      min: 0, max: 6,
      title: '0–6 Months: Milk Only',
      tips: [
        'Exclusively breastfeed or use iron-fortified formula',
        'Feed on demand — watch for early hunger cues',
        'No water or other fluids needed',
        'No solid foods at this stage',
      ],
    },
    {
      min: 6, max: 9,
      title: '6–8 Months: Introducing Solids',
      tips: [
        'Continue breastfeeding or formula',
        'Introduce complementary soft foods',
        'Feed 2–3 small meals per day',
        'Offer mashed or pureed foods',
      ],
    },
    {
      min: 9, max: 99,
      title: '9–23 Months: Exploring & Growing',
      tips: [
        'Continue breastfeeding or formula',
        'Feed 3–4 meals plus healthy snacks',
        'Encourage self-feeding with finger foods',
        'Offer a variety of textures and tastes',
      ],
    },
  ];

  const guide = [...guides].reverse().find(g => ageMonths >= g.min) || guides[0];

  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Today's Feeding Guide</h2>
      <div className="bg-[#1c1b21] rounded-2xl p-5 border border-[#2b2c37] shadow-lg">
        <div className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 text-[10px] font-medium px-2.5 py-1 rounded-full mb-4">
          <CheckCircle2 size={12} />
          {guide.title}
        </div>
        <ul className="space-y-3">
          {guide.tips.map((tip, i) => {
            const details = guideDetails[tip];
            return (
              <li key={i}>
                {details ? (
                  <button
                    onClick={() => onInfo?.({
                      title: tip,
                      detail: details.detail,
                      source: details.source,
                      icon: '📋',
                    })}
                    className="w-full text-left flex items-start gap-3 text-sm text-slate-400 hover:text-slate-200 transition-colors group"
                  >
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="flex-1">{tip}</span>
                    <Info size={12} className="text-slate-600 group-hover:text-pink-400 transition-colors mt-1 flex-shrink-0" />
                  </button>
                ) : (
                  <div className="flex items-start gap-3 text-sm text-slate-400">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
