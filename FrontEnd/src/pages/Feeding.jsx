import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBabyContext } from '../context/BabyContext';
import { getBabyAgeMonths, calculateBabyAgeDetailed } from '../utils/babyAge';
import { useFeedingData } from '../hooks/useFeedingData';
import BottomNavigation from '../components/BottomNavigation';
import LogModal from '../components/feeding/LogModal';
import InfoModal from '../components/feeding/InfoModal';
import BabyOverviewCard from '../components/feeding/BabyOverviewCard';
import WhoGuideCard from '../components/feeding/WhoGuideCard';
import RecommendedFoodsSection from '../components/feeding/RecommendedFoodsSection';
import FoodsToAvoidSection from '../components/feeding/FoodsToAvoidSection';
import DailyTipCard from '../components/feeding/DailyTipCard';
import HygieneCard from '../components/feeding/HygieneCard';
import MilestoneCard from '../components/feeding/MilestoneCard';
import RecentFeedingCard from '../components/feeding/RecentFeedingCard';
import FloatingLogButton from '../components/feeding/FloatingLogButton';
import { Baby } from 'lucide-react';

export default function Feeding() {
  const navigate = useNavigate();
  const { selectedBaby, babies, setSelectedBaby } = useBabyContext();
  const { lastFeeding, addLog, updateLog } = useFeedingData(selectedBaby);

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [info, setInfo] = useState(null);

  const babyAgeMonths = selectedBaby ? getBabyAgeMonths(selectedBaby.date_of_birth) : 0;
  const babyAgeLabel = selectedBaby ? calculateBabyAgeDetailed(selectedBaby.date_of_birth).label : 'Unknown';

  return (
    <div className="min-h-screen bg-[#0f172a] pb-24">
      <header className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-xl border-b border-[#2b2c37]">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Back to home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
          <span className="text-sm font-semibold text-slate-200">Feeding Guide</span>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
            <Baby size={18} className="text-white" />
          </div>
        </div>
        {babies?.length > 1 && (
          <div className="px-4 pb-3 max-w-lg mx-auto">
            <select
              value={selectedBaby?.id || ''}
              onChange={(e) => {
                const baby = babies.find(b => b.id === parseInt(e.target.value));
                if (baby) setSelectedBaby(baby);
              }}
              className="w-full bg-[#1c1b21] border border-[#2b2c37] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-pink-500/50"
              aria-label="Select baby"
            >
              {babies.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        )}
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <BabyOverviewCard
          name={selectedBaby?.name}
          ageLabel={babyAgeLabel}
          ageMonths={babyAgeMonths}
        />

        <WhoGuideCard ageMonths={babyAgeMonths} onInfo={setInfo} />

        {babyAgeMonths >= 6 && <RecommendedFoodsSection />}

        <FoodsToAvoidSection onInfo={setInfo} />

        <DailyTipCard onInfo={setInfo} />

        <HygieneCard onInfo={setInfo} />

        <MilestoneCard onInfo={setInfo} />

        <RecentFeedingCard
          lastFeeding={lastFeeding}
          onViewHistory={() => navigate('/feeding/history')}
          onLogFirst={() => setIsLogModalOpen(true)}
        />
      </main>

      <FloatingLogButton onClick={() => setIsLogModalOpen(true)} />

      {isLogModalOpen && (
        <LogModal
          type={null}
          onClose={() => setIsLogModalOpen(false)}
          onSubmit={addLog}
          onUpdate={updateLog}
          babyAgeMonths={babyAgeMonths}
        />
      )}

      {info && (
        <InfoModal
          title={info.title}
          detail={info.detail}
          source={info.source}
          icon={info.icon}
          onClose={() => setInfo(null)}
        />
      )}

      <BottomNavigation activeTab="Feeding" />
    </div>
  );
}
