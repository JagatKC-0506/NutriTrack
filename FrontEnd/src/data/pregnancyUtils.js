const DAY_MS = 24 * 60 * 60 * 1000;

export function calculateTrimester(dueDateString) {
  if (!dueDateString) return { trimester: 'Trimester 1', weeksPregnant: 0 };

  const dueDate = new Date(dueDateString);
  if (Number.isNaN(dueDate.getTime())) return { trimester: 'Trimester 1', weeksPregnant: 0 };

  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const estimatedLmp = new Date(dueDate.getTime() - 280 * DAY_MS);
  const normalizedLmp = new Date(estimatedLmp.getFullYear(), estimatedLmp.getMonth(), estimatedLmp.getDate());

  const daysPregnant = Math.floor((normalizedToday - normalizedLmp) / DAY_MS);
  if (daysPregnant < 0) return { trimester: 'Trimester 1', weeksPregnant: 0 };

  const weeksPregnant = Math.min(40, Math.floor(daysPregnant / 7));

  let trimester;
  if (weeksPregnant < 13) trimester = 'Trimester 1';
  else if (weeksPregnant < 28) trimester = 'Trimester 2';
  else trimester = 'Trimester 3';

  return { trimester, weeksPregnant };
}

export function getVaccineStatus(vaccineName, weeksPregnant, userReminders, enrichment) {
  const completed = userReminders.find(
    r => r.vaccine_name === vaccineName && r.status === 'completed'
  );
  if (completed) return 'completed';

  if (!enrichment) return 'optional';
  const category = enrichment.category || 'recommended';

  if (category === 'risk-based') return 'optional';

  const [startWeek, endWeek] = enrichment.recommendedWeeks || [0, 40];

  if (weeksPregnant > endWeek + 2) return 'overdue';
  if (weeksPregnant >= startWeek && weeksPregnant <= endWeek + 2) return 'due-soon';
  return 'upcoming';
}

export const NAV_SECTIONS = [
  {
    path: '/pregnant/vaccines/list',
    icon: '💉',
    title: 'Vaccine Recommendations',
    desc: 'Personalized vaccine list with educational info',
    color: 'var(--vaccine-blue)',
    bgClass: 'nav-card-blue',
  },
  {
    path: '/pregnant/vaccines/daily',
    icon: '✅',
    title: 'Daily Care',
    desc: 'Checklist & health tips',
    color: 'var(--success-green)',
    bgClass: 'nav-card-green',
  },
  {
    path: '/pregnant/vaccines/health',
    icon: '🩺',
    title: 'Medical Tests',
    desc: 'Trimester-by-trimester screenings',
    color: 'var(--warning-orange)',
    bgClass: 'nav-card-orange',
  },
  {
    path: '/pregnant/vaccines/resources',
    icon: '🆘',
    title: 'Resources & Safety',
    desc: 'Emergency signs & vaccines to avoid',
    color: 'var(--upcoming-red)',
    bgClass: 'nav-card-red',
  },
];
