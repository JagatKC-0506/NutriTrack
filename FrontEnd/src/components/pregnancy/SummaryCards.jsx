import { motion } from 'framer-motion';
import { ShieldCheck, CalendarClock, Stethoscope, Beaker, Percent } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function SummaryCards({ completedVaccines, totalRecommended, upcomingAppointments, pendingTests, completionPercent }) {
  const cards = [
    {
      icon: ShieldCheck,
      label: 'Vaccines',
      value: `${completedVaccines} / ${totalRecommended}`,
      subtext: 'Completed',
      color: 'var(--success-green)',
      bgClass: 'summary-card-green',
    },
    {
      icon: CalendarClock,
      label: 'Appointments',
      value: upcomingAppointments,
      subtext: 'Upcoming',
      color: 'var(--vaccine-blue)',
      bgClass: 'summary-card-blue',
    },
    {
      icon: Beaker,
      label: 'Tests',
      value: pendingTests,
      subtext: 'Pending',
      color: 'var(--warning-orange)',
      bgClass: 'summary-card-orange',
    },
    {
      icon: Percent,
      label: 'Progress',
      value: `${completionPercent}%`,
      subtext: 'Overall',
      color: 'var(--vaccine-blue)',
      bgClass: 'summary-card-purple',
    },
  ];

  return (
    <motion.div
      className="summary-cards-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <motion.div
          key={card.label}
          className={`summary-card ${card.bgClass}`}
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
          <card.icon className="summary-card-icon" size={22} style={{ color: card.color }} />
          <span className="summary-card-value" style={{ color: card.color }}>{card.value}</span>
          <span className="summary-card-label">{card.label}</span>
          <span className="summary-card-subtext">{card.subtext}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
