export const VALIDATION_RANGES = {
  weight_kg: { min: 0.5, max: 40, label: 'Weight' },
  height_cm: { min: 20, max: 180, label: 'Height' },
};

export function validateGrowthRecord(baby, recordData) {
  const errors = [];
  const { date, weight_kg, height_cm } = recordData;

  if (!date) {
    errors.push('Measurement date is required');
  } else {
    const measurementDate = new Date(date);
    if (Number.isNaN(measurementDate.getTime())) {
      errors.push('Measurement date is invalid');
    } else {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (measurementDate > today) {
        errors.push('Measurement date cannot be in the future');
      }
      if (baby && baby.date_of_birth) {
        const dob = new Date(baby.date_of_birth);
        dob.setHours(0, 0, 0, 0);
        if (measurementDate < dob) {
          errors.push('Measurement date cannot be before baby\'s birth date');
        }
      }
    }
  }

  validateNumericField('weight_kg', weight_kg, VALIDATION_RANGES.weight_kg, errors);
  validateNumericField('height_cm', height_cm, VALIDATION_RANGES.height_cm, errors);

  return errors;
}

function validateNumericField(fieldName, value, range, errors) {
  if (value === null || value === undefined || value === '') {
    errors.push(`${range.label} is required`);
    return;
  }

  const num = Number(value);
  if (Number.isNaN(num)) {
    errors.push(`${range.label} must be a valid number`);
    return;
  }

  if (num <= 0) {
    errors.push(`${range.label} must be greater than 0`);
    return;
  }

  if (num < range.min || num > range.max) {
    errors.push(`${range.label} must be between ${range.min} and ${range.max}`);
  }
}

export function calculateAgeMonths(birthDate, measurementDate) {
  const birth = new Date(birthDate);
  const measure = new Date(measurementDate);

  let years = measure.getFullYear() - birth.getFullYear();
  let months = measure.getMonth() - birth.getMonth();
  let days = measure.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(measure.getFullYear(), measure.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  const dayFraction = days / 30.44;

  return Math.round((totalMonths + dayFraction) * 100) / 100;
}
