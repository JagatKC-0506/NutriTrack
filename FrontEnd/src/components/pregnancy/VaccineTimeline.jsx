import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Syringe, Stethoscope, Baby, Heart } from 'lucide-react';
import { PREGNANCY_TIMELINE } from '../../data/vaccineEnrichment';

const TYPE_ICONS = {
  vaccine: Syringe,
  test: Stethoscope,
  appointment: Calendar,
  ultrasound: Heart,
  milestone: Baby,
};

export default function VaccineTimeline({ currentWeek }) {
  const week = currentWeek || 0;

  const timeline = useMemo(() => {
    return PREGNANCY_TIMELINE.map((item, index) => ({
      ...item,
      isPast: item.week <= week,
      isCurrent: item.week === week || (item.week <= week && (!PREGNANCY_TIMELINE[index + 1] || PREGNANCY_TIMELINE[index + 1].week > week)),
      isFuture: item.week > week,
    }));
  }, [week]);

  const visibleTimeline = useMemo(() => {
    const currentIndex = timeline.findIndex(t => t.week >= week);
    const start = Math.max(0, currentIndex - 2);
    const end = Math.min(timeline.length, Math.max(currentIndex + 4, 6));
    return timeline.slice(start, end);
  }, [timeline, week]);

  return (
    <motion.div
      className="vaccine-timeline"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="vaccine-timeline-title">Pregnancy Journey Timeline</h3>
      <p className="vaccine-timeline-subtitle">Key milestones and checkups throughout your pregnancy</p>

      <div className="vaccine-timeline-track">
        {visibleTimeline.map((item, index) => {
          const IconComponent = TYPE_ICONS[item.type] || Calendar;

          return (
            <motion.div
              key={item.week}
              className={`vaccine-timeline-item ${item.isCurrent ? 'current' : ''} ${item.isPast && !item.isCurrent ? 'past' : ''} ${item.isFuture ? 'future' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="vaccine-timeline-connector">
                <div className={`vaccine-timeline-dot ${item.isCurrent ? 'current' : ''}`}>
                  <IconComponent size={14} />
                </div>
                {index < visibleTimeline.length - 1 && (
                  <div className={`vaccine-timeline-line ${item.isPast ? 'past' : ''}`} />
                )}
              </div>

              <div className="vaccine-timeline-content">
                <div className="vaccine-timeline-week">
                  <span className="vaccine-timeline-week-badge">
                    Week {item.week}
                  </span>
                </div>
                <h4 className="vaccine-timeline-item-title">{item.label}</h4>
                {item.description && (
                  <p className="vaccine-timeline-item-desc">{item.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
