import { Plus } from 'lucide-react';

export default function FloatingLogButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-5 z-[101] flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
      aria-label="Log feeding"
    >
      <Plus size={20} />
      <span className="text-sm font-semibold">Log Feeding</span>
    </button>
  );
}
