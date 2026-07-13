import { Baby } from 'lucide-react';

const stages = [
  {
    min: 0, max: 6,
    label: 'Milk Only',
    message: 'Your baby is growing fast! Breast milk or formula provides all the nutrition they need right now.',
    color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
  },
  {
    min: 6, max: 9,
    label: 'Introducing Solids',
    message: 'Your baby is ready to explore new tastes! Start with single-ingredient purees alongside milk.',
    color: 'from-green-500/10 to-green-600/5 border-green-500/20',
  },
  {
    min: 9, max: 12,
    label: 'Exploring Foods',
    message: 'Your baby is becoming a little food explorer! Offer soft finger foods and let them practice.',
    color: 'from-orange-500/10 to-orange-600/5 border-orange-500/20',
  },
  {
    min: 12, max: 99,
    label: 'Family Meals',
    message: 'Your baby can now enjoy many family foods! Focus on balanced meals and healthy habits.',
    color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
  },
];

function getStage(months) {
  return stages.find(s => months >= s.min && months < s.max) || stages[0];
}

export default function BabyOverviewCard({ name, ageLabel, ageMonths }) {
  const stage = getStage(ageMonths);

  return (
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/20 flex-shrink-0">
        <Baby size={28} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-slate-200">{name || 'Baby'}</h1>
        <p className="text-xs text-slate-500 mt-0.5">{ageLabel}</p>
        <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full border bg-gradient-to-br ${stage.color}`}>
          <span className="text-[10px] font-medium text-slate-300">{stage.label}</span>
        </div>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">{stage.message}</p>
      </div>
    </div>
  );
}
