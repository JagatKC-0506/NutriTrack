import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, ChevronDown, Calendar, ClipboardList } from 'lucide-react';
import { MEDICAL_TESTS } from '../../data/vaccineEnrichment';

const TRIMESTER_ORDER = ['Trimester 1', 'Trimester 2', 'Trimester 3'];

export default function MedicalTests({ currentTrimester }) {
  const [activeTrimester, setActiveTrimester] = useState(currentTrimester || 'Trimester 1');

  const orderedTrimesters = useMemo(() => {
    if (currentTrimester && TRIMESTER_ORDER.includes(currentTrimester)) {
      const idx = TRIMESTER_ORDER.indexOf(currentTrimester);
      return [
        ...TRIMESTER_ORDER.slice(idx),
        ...TRIMESTER_ORDER.slice(0, idx),
      ];
    }
    return TRIMESTER_ORDER;
  }, [currentTrimester]);

  return (
    <motion.div
      className="medical-tests"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="medical-tests-header">
        <Beaker size={20} />
        <h3>Recommended Medical Tests</h3>
      </div>

      <div className="medical-tests-tabs">
        {orderedTrimesters.map((tri) => (
          <button
            key={tri}
            className={`medical-tests-tab ${activeTrimester === tri ? 'active' : ''}`}
            onClick={() => setActiveTrimester(tri)}
          >
            {tri.replace('Trimester ', 'T')}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrimester}
          className="medical-tests-list"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {(MEDICAL_TESTS[activeTrimester] || []).map((test, index) => (
            <motion.div
              key={test.name}
              className="medical-test-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <span className="medical-test-icon">{test.icon}</span>
              <div className="medical-test-info">
                <h4 className="medical-test-name">{test.name}</h4>
                <p className="medical-test-desc">{test.description}</p>
                <div className="medical-test-meta">
                  <span className="medical-test-when">
                    <Calendar size={12} />
                    {test.when}
                  </span>
                  <span className="medical-test-purpose">
                    <ClipboardList size={12} />
                    {test.purpose}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
