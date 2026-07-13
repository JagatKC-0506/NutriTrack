import { AlertTriangle, Info } from 'lucide-react';

const items = [
  {
    food: 'Honey before 12 months',
    reason: 'Risk of infant botulism — a rare but serious illness.',
    detail: 'Honey can contain spores of Clostridium botulinum. In babies under 12 months, the digestive system is not mature enough to destroy these spores. They can germinate and produce a toxin that causes muscle weakness, difficulty feeding, and breathing problems. After 12 months, the digestive system can handle them safely.',
    source: 'WHO & CDC Infant Feeding Guidelines',
  },
  {
    food: 'Whole grapes',
    reason: 'Choking hazard — always cut into small pieces.',
    detail: 'Whole grapes are the perfect size and shape to block a baby\'s airway completely. They are firm, slippery, and can compress to seal the throat. Always slice grapes lengthwise into quarters before serving — even for toddlers. This rule applies to cherry tomatoes and similar round foods too.',
    source: 'WHO Infant Feeding Guidelines — Choking Prevention',
  },
  {
    food: 'Popcorn and hard nuts',
    reason: 'Difficult to chew and a choking risk for young children.',
    detail: 'Popcorn, whole nuts, and hard candies are common choking hazards because they are difficult for babies and young children to chew properly. Pieces can easily become lodged in the airway. Avoid until at least age 4, or until your child can reliably chew and swallow these foods safely.',
    source: 'American Academy of Pediatrics — Choking Prevention',
  },
  {
    food: 'Sugary drinks and juice',
    reason: 'Empty calories that can cause tooth decay and poor appetite.',
    detail: 'Sugary drinks and fruit juices fill your baby\'s small stomach with empty calories, leaving less room for nutritious foods. They also contribute to tooth decay (even in emerging teeth) and can create a preference for sweet tastes. Offer water or milk instead. Whole fruits are far better than juice.',
    source: 'WHO — Guideline: Sugars intake for infants and young children',
  },
  {
    food: 'Excess salt and processed food',
    reason: 'Baby kidneys cannot process high sodium levels safely.',
    detail: 'A baby\'s kidneys are not fully developed and cannot handle high levels of sodium. Excess salt can damage kidney function and contribute to high blood pressure later in life. Avoid adding salt to baby food and check labels on packaged foods. Most of a baby\'s sodium should come naturally from breast milk, formula, or whole foods.',
    source: 'WHO — Complementary feeding: Family foods for infants and young children',
  },
];

export default function FoodsToAvoidSection({ onInfo }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Foods to Avoid</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onInfo?.({
              title: item.food,
              detail: item.detail,
              source: item.source,
              icon: '⚠️',
            })}
            className="w-full text-left bg-[#1c1b21] rounded-xl p-4 border border-orange-500/20 shadow-lg hover:border-orange-500/40 hover:shadow-xl transition-all group"
            aria-label={`Learn why to avoid ${item.food}`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-200">{item.food}</p>
                  <Info size={12} className="text-slate-600 group-hover:text-pink-400 transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.reason}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
