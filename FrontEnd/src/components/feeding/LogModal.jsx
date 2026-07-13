import { useState, useEffect, useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const typeOptions = [
  { value: 'breast', icon: '🤱', label: 'Breastfeeding' },
  { value: 'formula', icon: '🍼', label: 'Formula' },
  { value: 'solids', icon: '🥣', label: 'Solid Food' },
  { value: 'water', icon: '💧', label: 'Water' },
];

const textureOptions = ['Puree', 'Mashed', 'Finger Food', 'Family Food'];
const sideOptions = ['Left', 'Right', 'Both'];

export default function LogModal({
  type,
  initialData = null,
  onClose,
  onSubmit,
  onUpdate,
  babyAgeMonths,
}) {
  const isEditing = !!initialData;
  const [selectedType, setSelectedType] = useState(type || null);

  const [duration, setDuration] = useState(initialData?.duration || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || '');
  const [foodName, setFoodName] = useState(initialData?.food_name || '');
  const [side, setSide] = useState(initialData?.side || '');
  const [texture, setTexture] = useState(initialData?.texture || '');
  const [notes, setNotes] = useState(initialData?.notes || '');

  const availableTypes = useMemo(() => {
    if (babyAgeMonths == null) return typeOptions;
    return typeOptions.filter(t => {
      if (t.value === 'solids' || t.value === 'water') return babyAgeMonths >= 6;
      return true;
    });
  }, [babyAgeMonths]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    if (!isEditing) {
      setDuration('');
      setQuantity('');
      setFoodName('');
      setSide('');
      setTexture('');
      setNotes('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedType) return;

    const data = { feeding_type: selectedType };

    switch (selectedType) {
      case 'breast':
        data.duration = duration ? parseInt(duration) : null;
        data.side = side || null;
        break;
      case 'formula':
        data.quantity = quantity ? parseFloat(quantity) : null;
        data.quantity_unit = 'ml';
        data.food_name = foodName || null;
        break;
      case 'solids':
        data.food_name = foodName || null;
        data.quantity = quantity ? parseFloat(quantity) : null;
        data.quantity_unit = 'tbsp';
        data.texture = texture || null;
        break;
      case 'breast_milk':
        data.quantity = quantity ? parseFloat(quantity) : null;
        data.quantity_unit = 'ml';
        break;
      case 'water':
        data.quantity = quantity ? parseFloat(quantity) : null;
        data.quantity_unit = 'ml';
        break;
    }

    if (notes) data.notes = notes;

    if (isEditing) {
      onUpdate?.(initialData.id, data);
    } else {
      onSubmit?.(data);
    }
    onClose?.();
  };

  const showTypeSelector = !isEditing && !type;

  const config = typeOptions.find(t => t.value === selectedType);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1c1b21] rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Log feeding"
        >
          <div className="flex items-center justify-between p-5 border-b border-[#2b2c37]">
            <h2 className="text-base font-semibold text-slate-200">
              {isEditing ? 'Edit Feeding' : showTypeSelector ? 'Log Feeding' : `Log ${config?.label || ''}`}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {showTypeSelector && (
              <div>
                <label className="text-xs text-slate-500 mb-3 block">Select feeding type</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTypes.map(t => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => handleTypeChange(t.value)}
                      className={`flex items-center gap-2 rounded-xl p-3 border text-sm transition-all ${
                        selectedType === t.value
                          ? 'border-pink-500/40 bg-pink-500/10 text-slate-200'
                          : 'border-[#2b2c37] bg-[#22212a] text-slate-400 hover:text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-lg">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
                {babyAgeMonths < 6 && (
                  <p className="text-[10px] text-amber-400/70 mt-2 text-center">
                    Solid Food and Water become available after 6 months
                  </p>
                )}
              </div>
            )}

            {selectedType && !showTypeSelector && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{config?.icon}</span>
                <span className="text-sm font-medium text-slate-300">{config?.label}</span>
              </div>
            )}

            {selectedType === 'breast' && (
              <>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Duration (minutes)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500 mb-2 block">Side</label>
                  <div className="flex gap-2">
                    {sideOptions.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSide(side === s.toLowerCase() ? '' : s.toLowerCase())}
                        className={`flex-1 rounded-xl py-2.5 text-xs font-medium border transition-all ${
                          side === s.toLowerCase()
                            ? 'border-pink-500/40 bg-pink-500/10 text-pink-400'
                            : 'border-[#2b2c37] bg-[#22212a] text-slate-500 hover:text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedType === 'breast_milk' && (
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Quantity (ml)</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 90"
                  className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                />
              </div>
            )}

            {selectedType === 'formula' && (
              <>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Quantity (ml)</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 120"
                    className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Formula name (optional)</label>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g. Enfamil, Similac"
                    className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                  />
                </div>
              </>
            )}

            {selectedType === 'solids' && (
              <>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Food name</label>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g. Mashed banana, Rice cereal"
                    className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Quantity (tbsp, optional)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-500 mb-2 block">Texture</label>
                  <div className="grid grid-cols-2 gap-2">
                    {textureOptions.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTexture(texture === t.toLowerCase().replace(' ', '_') ? '' : t.toLowerCase().replace(' ', '_'))}
                        className={`rounded-xl py-2.5 text-xs font-medium border transition-all ${
                          texture === t.toLowerCase().replace(' ', '_')
                            ? 'border-pink-500/40 bg-pink-500/10 text-pink-400'
                            : 'border-[#2b2c37] bg-[#22212a] text-slate-500 hover:text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedType === 'water' && (
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block">Quantity (ml)</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 30"
                  className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50"
                />
              </div>
            )}

            {selectedType && (
              <>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      selectedType === 'breast' ? 'How did feeding go? Any discomfort?' :
                      selectedType === 'breast_milk' ? 'How much was left over?' :
                      selectedType === 'formula' ? 'Any leftovers? How was baby\'s appetite?' :
                      selectedType === 'solids' ? 'Did baby enjoy it? Any reactions?' :
                      'Any observations...'
                    }
                    className="w-full bg-[#22212a] border border-[#2b2c37] rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50 resize-none"
                    rows={2}
                    aria-label="Additional notes"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg shadow-pink-500/20"
                >
                  {isEditing ? 'Update' : 'Log'}
                </button>
              </>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
