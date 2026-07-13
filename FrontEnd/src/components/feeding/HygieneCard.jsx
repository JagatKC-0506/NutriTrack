import { Hand, UtensilsCrossed, Droplets, Refrigerator, Info } from 'lucide-react';

const items = [
  {
    icon: Hand, text: 'Wash hands before feeding', color: 'text-blue-400',
    detail: 'Hand washing is the single most effective way to prevent the spread of germs to your baby. Before every feeding and food preparation, wash your hands with soap and clean running water for at least 20 seconds. This prevents the transmission of bacteria like E. coli and Salmonella that can cause severe diarrhea in infants.',
    source: 'WHO — Hand hygiene in infant feeding',
  },
  {
    icon: UtensilsCrossed, text: 'Use clean utensils and bottles', color: 'text-green-400',
    detail: 'Baby bottles, nipples, spoons, and bowls must be sterilized before first use and thoroughly washed with hot, soapy water after every feeding. Bacteria thrive in milk residue and can multiply rapidly. For babies under 6 months, consider boiling bottles and nipples for 5 minutes daily to ensure sterilization.',
    source: 'WHO — Safe preparation and storage of infant formula',
  },
  {
    icon: Droplets, text: 'Use safe drinking water', color: 'text-cyan-400',
    detail: 'If your baby is formula-fed, always use safe drinking water that has been boiled and cooled to at least 70°C (158°F) to prepare formula. This kills harmful bacteria like Cronobacter that can be present in powdered formula. Tap water should be boiled and cooled until your baby is at least 6 months old.',
    source: 'WHO — Guidelines for drinking-water quality',
  },
  {
    icon: Refrigerator, text: 'Store breast milk and food safely', color: 'text-purple-400',
    detail: 'Breast milk can be stored at room temperature (up to 25°C) for 4 hours, in a refrigerator (4°C) for up to 4 days, and in a freezer (-18°C) for up to 6 months. Prepared formula must be refrigerated and used within 24 hours. Never reheat food more than once, and discard any unfinished food after a meal.',
    source: 'WHO — Safe food handling for infants',
  },
];

export default function HygieneCard({ onInfo }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Hygiene Tips</h2>
      <div className="bg-[#1c1b21] rounded-2xl p-5 border border-[#2b2c37] shadow-lg">
        <div className="space-y-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => onInfo?.({
                  title: item.text,
                  detail: item.detail,
                  source: item.source,
                  icon: '🧼',
                })}
                className="w-full text-left flex items-start gap-2.5 hover:bg-slate-800/30 rounded-xl p-2 -mx-2 transition-colors group"
              >
                <Icon size={16} className={`${item.color} mt-0.5 flex-shrink-0`} />
                <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors flex-1">{item.text}</span>
                <Info size={12} className="text-slate-600 group-hover:text-pink-400 transition-colors mt-1 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
