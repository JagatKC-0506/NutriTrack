import { useState } from 'react';
import { Info, X } from 'lucide-react';

const foods = [
  { emoji: '🍌', name: 'Banana', age: '6+ months', desc: 'Rich in potassium and easy to mash. A great first food.' },
  { emoji: '🍎', name: 'Apple Puree', age: '6+ months', desc: 'Gentle on digestion and packed with vitamin C.' },
  { emoji: '🍠', name: 'Sweet Potato', age: '6+ months', desc: 'High in vitamin A with a naturally soft texture.' },
  { emoji: '🥣', name: 'Rice Cereal', age: '6+ months', desc: 'Iron-fortified and easy to digest. Mix with milk.' },
  { emoji: '🥕', name: 'Carrot', age: '6+ months', desc: 'Beta-carotene rich and naturally sweet when cooked.' },
  { emoji: '🥑', name: 'Avocado', age: '6+ months', desc: 'Full of healthy fats. Creamy texture babies love.' },
];

export default function RecommendedFoodsSection({ onSelectFood }) {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Recommended Foods</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin scrollbar-thumb-slate-700">
        {foods.map((food) => (
          <button
            key={food.name}
            onClick={() => setSelected(selected?.name === food.name ? null : food)}
            className={`flex-shrink-0 w-36 rounded-2xl p-4 border shadow-lg text-left transition-all hover:border-pink-500/30 hover:shadow-xl ${
              selected?.name === food.name
                ? 'border-pink-500/40 bg-pink-500/5'
                : 'bg-[#1c1b21] border-[#2b2c37]'
            }`}
            aria-label={`Learn about ${food.name}`}
          >
            <div className="text-3xl mb-2" aria-hidden="true">{food.emoji}</div>
            <p className="text-sm font-semibold text-slate-200">{food.name}</p>
            <p className="text-[10px] text-green-400 mt-0.5">{food.age}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
              <Info size={10} />
              <span>Tap for details</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-3 bg-[#1c1b21] rounded-2xl p-4 border border-pink-500/20 shadow-lg flex items-start gap-3">
          <span className="text-2xl flex-shrink-0" aria-hidden="true">{selected.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-200">{selected.name}</p>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors"
                aria-label="Close details"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-[10px] text-green-400 mt-1">{selected.age}</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{selected.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
