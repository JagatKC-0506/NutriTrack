const milestones = [
  {
    age: '6 Months', emoji: '🥣', text: 'Start complementary foods',
    detail: 'At 6 months, your baby\'s iron stores begin to deplete, making it time to introduce iron-rich complementary foods. Start with single-ingredient purees like iron-fortified rice cereal, pureed meat, or mashed legumes. Continue breast milk or formula as the primary nutrition source.',
    source: 'WHO — When to introduce complementary foods',
  },
  {
    age: '9 Months', emoji: '✋', text: 'Introduce finger foods',
    detail: 'Around 9 months, babies develop the pincer grasp (thumb and forefinger) and can pick up small pieces of food. Offer soft finger foods like cooked carrot sticks, banana pieces, or soft toast. Always supervise and ensure pieces are small enough to prevent choking.',
    source: 'WHO — Developmental readiness for finger foods',
  },
  {
    age: '12 Months', emoji: '🍽️', text: 'Begin family meals',
    detail: 'By 12 months, most babies can eat the same foods as the rest of the family (cut into safe sizes). This is a great time to transition from separate baby meals to shared family meals. Continue to avoid choking hazards like whole grapes, nuts, and popcorn.',
    source: 'WHO — Transition to family foods',
  },
  {
    age: '18 Months', emoji: '🥤', text: 'Wean from bottle to cup',
    detail: 'Prolonged bottle use can cause tooth decay and affect oral motor development. Start by replacing one bottle feeding per day with a cup, then gradually increase. Use an open cup or a straw cup rather than sippy cups, which are better for oral development.',
    source: 'WHO — Bottle weaning recommendations',
  },
  {
    age: '24 Months', emoji: '🍴', text: 'Use utensils independently',
    detail: 'By age 2, most children can use a spoon and fork with some skill. Let your child practice regularly even if it\'s messy. Offer pre-loaded utensils and let them bring the food to their mouth. Praise attempts and avoid correcting them too much — proficiency comes with practice.',
    source: 'WHO — Self-feeding milestones',
  },
];

export default function MilestoneCard({ onInfo }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Feeding Milestones</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-700">
        {milestones.map((m, i) => (
          <button
            key={i}
            onClick={() => onInfo?.({
              title: `${m.age}: ${m.text}`,
              detail: m.detail,
              source: m.source,
              icon: m.emoji,
            })}
            className="flex-shrink-0 w-40 bg-[#1c1b21] rounded-2xl p-4 border border-[#2b2c37] shadow-lg text-left hover:border-pink-500/30 hover:shadow-xl transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
              <span className="text-lg" aria-hidden="true">{m.emoji}</span>
            </div>
            <p className="text-xs font-semibold text-purple-400">{m.age}</p>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{m.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
