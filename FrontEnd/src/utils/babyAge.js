/**
 * Baby Age Calculation Utilities
 * Provides consistent age formatting across the app
 * 
 * Format:
 * - 0-7 days: "X days"
 * - 8-30 days: "X weeks"
 * - 31-365 days: "X months"
 * - 365+ days: "X years"
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Calculate baby age with detailed breakdown
 * @param {string} dobString - Date of birth as ISO string
 * @returns {object} - { label, days, weeks, months, years }
 */
export const calculateBabyAgeDetailed = (dobString) => {
  if (!dobString) {
    return {
      label: 'Age unknown',
      days: null,
      weeks: null,
      months: null,
      years: null
    };
  }

  const dob = new Date(dobString);
  if (Number.isNaN(dob.getTime())) {
    return {
      label: 'Age unknown',
      days: null,
      weeks: null,
      months: null,
      years: null
    };
  }

  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedDob = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());

  const daysOld = Math.floor((normalizedToday - normalizedDob) / DAY_MS);

  if (daysOld < 0) {
    return {
      label: 'Baby not born yet',
      days: 0,
      weeks: 0,
      months: 0,
      years: 0
    };
  }

  const weeks = Math.floor(daysOld / 7);
  const months = Math.floor(daysOld / 30.44);
  const years = Math.floor(daysOld / 365.25);

  let label;

  // First week (0-7 days): show days
  if (daysOld <= 7) {
    label = `${daysOld} day${daysOld !== 1 ? 's' : ''}`;
  }
  // First month (8-30 days): show weeks
  else if (daysOld <= 30) {
    label = `${weeks} week${weeks !== 1 ? 's' : ''}`;
  }
  // First year (31-365 days): show months
  else if (daysOld <= 365) {
    label = `${months} month${months !== 1 ? 's' : ''}`;
  }
  // After first year: show years
  else {
    label = `${years} year${years !== 1 ? 's' : ''}`;
  }

  return {
    label,
    days: daysOld,
    weeks,
    months,
    years
  };
};

/**
 * Get simple age label for display
 * @param {string} dobString - Date of birth as ISO string
 * @returns {string} - Formatted age label
 */
export const getBabyAgeLabel = (dobString) => {
  return calculateBabyAgeDetailed(dobString).label;
};

/**
 * Get baby age in months (for schedule calculations)
 * @param {string} dobString - Date of birth as ISO string
 * @returns {number} - Age in months (capped at 24 for UI purposes)
 */
export const getBabyAgeMonths = (dobString) => {
  if (!dobString) return 0;

  const dob = new Date(dobString);
  if (Number.isNaN(dob.getTime())) return 0;

  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const normalizedDob = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());

  const daysOld = Math.floor((normalizedToday - normalizedDob) / DAY_MS);
  if (daysOld < 0) return 0;

  const monthsValue = daysOld / 30.44;
  return Math.min(24, monthsValue); // cap at 24 months for UI
};
