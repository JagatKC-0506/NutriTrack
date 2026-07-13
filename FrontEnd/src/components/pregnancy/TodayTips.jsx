import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { DAILY_TIPS } from '../../data/vaccineEnrichment';

export default function TodayTips() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTip = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % DAILY_TIPS.length);
  }, []);

  const prevTip = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + DAILY_TIPS.length) % DAILY_TIPS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTip, 8000);
    return () => clearInterval(timer);
  }, [nextTip]);

  const currentTip = DAILY_TIPS[currentIndex];

  return (
    <motion.div
      className="today-tips"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="today-tips-header">
        <Lightbulb size={18} />
        <h3>Today's Health Tip</h3>
      </div>

      <div className="today-tips-carousel">
        <button className="today-tips-nav-btn" onClick={prevTip} aria-label="Previous tip">
          <ChevronLeft size={18} />
        </button>

        <div className="today-tips-content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="today-tips-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span className="today-tips-icon">{currentTip.icon}</span>
              <p className="today-tips-text">{currentTip.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="today-tips-nav-btn" onClick={nextTip} aria-label="Next tip">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="today-tips-dots">
        {DAILY_TIPS.map((_, i) => (
          <span
            key={i}
            className={`today-tips-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </motion.div>
  );
}
