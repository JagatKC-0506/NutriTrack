import { Clock, ChevronRight, Frown } from 'lucide-react';

const typeLabels = {
  breast: { emoji: '🤱', label: 'Breastfeeding' },
  breast_milk: { emoji: '🍶', label: 'Breast Milk' },
  formula: { emoji: '🍼', label: 'Formula' },
  solids: { emoji: '🥣', label: 'Solid Food' },
  water: { emoji: '💧', label: 'Water' },
};

const sideLabels = { left: 'Left', right: 'Right', both: 'Both' };
const textureLabels = {
  puree: 'Puree',
  mashed: 'Mashed',
  finger_food: 'Finger Food',
  family_food: 'Family Food',
};

function formatTime(isoTime) {
  if (!isoTime) return '';
  const [h, m] = isoTime.split(':');
  const date = new Date();
  date.setHours(parseInt(h), parseInt(m));
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function RecentFeedingCard({ lastFeeding, onViewHistory, onLogFirst }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Recent Feeding</h2>

      {lastFeeding ? (
        <div className="bg-[#1c1b21] rounded-2xl p-5 border border-[#2b2c37] shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl" aria-hidden="true">{(typeLabels[lastFeeding.feeding_type] || {}).emoji || '🍼'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200">
                {(typeLabels[lastFeeding.feeding_type] || {}).label || lastFeeding.feeding_type}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {lastFeeding.food_name && (
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">{lastFeeding.food_name}</span>
                )}
                {lastFeeding.duration && (
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">{lastFeeding.duration} min</span>
                )}
                {lastFeeding.quantity && (
                  <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">{lastFeeding.quantity} {lastFeeding.quantity_unit || ''}</span>
                )}
                {lastFeeding.side && (
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">{sideLabels[lastFeeding.side] || lastFeeding.side}</span>
                )}
                {lastFeeding.texture && (
                  <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full">{textureLabels[lastFeeding.texture] || lastFeeding.texture}</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock size={12} className="text-slate-500" />
                <span className="text-xs text-slate-500">{formatTime(lastFeeding.time)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onViewHistory}
            className="w-full mt-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800/50 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="View complete feeding history"
          >
            View Feeding History
            <ChevronRight size={14} />
          </button>
        </div>
      ) : (
        <div className="bg-[#1c1b21] rounded-2xl p-6 border border-[#2b2c37] shadow-lg text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mx-auto mb-3">
            <Frown size={22} className="text-slate-500" />
          </div>
          <p className="text-sm text-slate-500 mb-4">No feeding has been logged yet.</p>
          <button
            onClick={onLogFirst}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-pink-700 transition-all"
          >
            Log First Feeding
          </button>
        </div>
      )}
    </div>
  );
}
