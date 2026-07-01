// WHO Child Growth Standards (LMS values)
// L = Box-Cox power, M = Median, S = Coefficient of variation
// Data from WHO Multicentre Growth Reference Study (MGRS)

const LMS = {
  weight_kg: {
    male: [
      { age: 0, L: 0.3487, M: 3.3464, S: 0.14602 },
      { age: 1, L: 0.2297, M: 4.4709, S: 0.13395 },
      { age: 2, L: 0.0948, M: 5.5675, S: 0.12385 },
      { age: 3, L: -0.0289, M: 6.3762, S: 0.11727 },
      { age: 4, L: -0.1299, M: 7.0023, S: 0.11324 },
      { age: 5, L: -0.2049, M: 7.5105, S: 0.11096 },
      { age: 6, L: -0.2574, M: 7.9297, S: 0.10989 },
      { age: 7, L: -0.2935, M: 8.2842, S: 0.10958 },
      { age: 8, L: -0.3182, M: 8.5899, S: 0.10971 },
      { age: 9, L: -0.3349, M: 8.8581, S: 0.11008 },
      { age: 10, L: -0.3459, M: 9.0975, S: 0.11057 },
      { age: 11, L: -0.3527, M: 9.3144, S: 0.11111 },
      { age: 12, L: -0.3564, M: 9.5134, S: 0.11166 },
      { age: 13, L: -0.3575, M: 9.6982, S: 0.11219 },
      { age: 14, L: -0.3564, M: 9.8718, S: 0.11269 },
      { age: 15, L: -0.3535, M: 10.0361, S: 0.11316 },
      { age: 16, L: -0.3491, M: 10.1924, S: 0.11359 },
      { age: 17, L: -0.3435, M: 10.3416, S: 0.11400 },
      { age: 18, L: -0.3368, M: 10.4845, S: 0.11438 },
      { age: 19, L: -0.3294, M: 10.6217, S: 0.11474 },
      { age: 20, L: -0.3213, M: 10.7538, S: 0.11508 },
      { age: 21, L: -0.3128, M: 10.8813, S: 0.11541 },
      { age: 22, L: -0.3040, M: 11.0046, S: 0.11572 },
      { age: 23, L: -0.2950, M: 11.1241, S: 0.11602 },
      { age: 24, L: -0.2860, M: 11.2402, S: 0.11631 },
      { age: 27, L: -0.2607, M: 11.5712, S: 0.11713 },
      { age: 30, L: -0.2372, M: 11.8814, S: 0.11788 },
      { age: 33, L: -0.2156, M: 12.1738, S: 0.11856 },
      { age: 36, L: -0.1959, M: 12.4507, S: 0.11918 },
      { age: 39, L: -0.1780, M: 12.7139, S: 0.11974 },
      { age: 42, L: -0.1619, M: 12.9646, S: 0.12026 },
      { age: 45, L: -0.1475, M: 13.2037, S: 0.12073 },
      { age: 48, L: -0.1346, M: 13.4320, S: 0.12116 },
      { age: 51, L: -0.1231, M: 13.6502, S: 0.12156 },
      { age: 54, L: -0.1129, M: 13.8589, S: 0.12193 },
      { age: 57, L: -0.1039, M: 14.0588, S: 0.12227 },
      { age: 60, L: -0.0959, M: 14.2504, S: 0.12258 },
    ],
    female: [
      { age: 0, L: 0.3809, M: 3.2322, S: 0.14171 },
      { age: 1, L: 0.1714, M: 4.1873, S: 0.13724 },
      { age: 2, L: -0.0274, M: 5.1282, S: 0.12988 },
      { age: 3, L: -0.1867, M: 5.8458, S: 0.12289 },
      { age: 4, L: -0.3012, M: 6.4237, S: 0.11758 },
      { age: 5, L: -0.3760, M: 6.8984, S: 0.11388 },
      { age: 6, L: -0.4206, M: 7.2971, S: 0.11133 },
      { age: 7, L: -0.4443, M: 7.6389, S: 0.10952 },
      { age: 8, L: -0.4544, M: 7.9390, S: 0.10818 },
      { age: 9, L: -0.4556, M: 8.2076, S: 0.10715 },
      { age: 10, L: -0.4512, M: 8.4526, S: 0.10632 },
      { age: 11, L: -0.4432, M: 8.6795, S: 0.10562 },
      { age: 12, L: -0.4331, M: 8.8924, S: 0.10501 },
      { age: 13, L: -0.4217, M: 9.0940, S: 0.10446 },
      { age: 14, L: -0.4096, M: 9.2863, S: 0.10395 },
      { age: 15, L: -0.3971, M: 9.4707, S: 0.10348 },
      { age: 16, L: -0.3845, M: 9.6483, S: 0.10304 },
      { age: 17, L: -0.3719, M: 9.8197, S: 0.10262 },
      { age: 18, L: -0.3594, M: 9.9855, S: 0.10222 },
      { age: 19, L: -0.3471, M: 10.1461, S: 0.10184 },
      { age: 20, L: -0.3351, M: 10.3019, S: 0.10148 },
      { age: 21, L: -0.3234, M: 10.4534, S: 0.10114 },
      { age: 22, L: -0.3121, M: 10.6009, S: 0.10081 },
      { age: 23, L: -0.3011, M: 10.7448, S: 0.10049 },
      { age: 24, L: -0.2906, M: 10.8853, S: 0.10019 },
      { age: 27, L: -0.2619, M: 11.2834, S: 0.09937 },
      { age: 30, L: -0.2375, M: 11.6566, S: 0.09865 },
      { age: 33, L: -0.2168, M: 12.0078, S: 0.09802 },
      { age: 36, L: -0.1992, M: 12.3391, S: 0.09746 },
      { age: 39, L: -0.1842, M: 12.6524, S: 0.09697 },
      { age: 42, L: -0.1714, M: 12.9493, S: 0.09654 },
      { age: 45, L: -0.1604, M: 13.2312, S: 0.09616 },
      { age: 48, L: -0.1510, M: 13.4994, S: 0.09583 },
      { age: 51, L: -0.1428, M: 13.7550, S: 0.09554 },
      { age: 54, L: -0.1358, M: 13.9990, S: 0.09529 },
      { age: 57, L: -0.1297, M: 14.2322, S: 0.09507 },
      { age: 60, L: -0.1245, M: 14.4554, S: 0.09488 },
    ],
  },
  height_cm: {
    male: [
      { age: 0, L: 1, M: 49.8842, S: 0.03795 },
      { age: 1, L: 1, M: 54.7244, S: 0.03579 },
      { age: 2, L: 1, M: 58.4249, S: 0.03420 },
      { age: 3, L: 1, M: 61.4292, S: 0.03292 },
      { age: 4, L: 1, M: 63.8860, S: 0.03187 },
      { age: 5, L: 1, M: 65.9026, S: 0.03101 },
      { age: 6, L: 1, M: 67.6236, S: 0.03029 },
      { age: 7, L: 1, M: 69.1645, S: 0.02970 },
      { age: 8, L: 1, M: 70.5994, S: 0.02920 },
      { age: 9, L: 1, M: 71.9687, S: 0.02877 },
      { age: 10, L: 1, M: 73.2812, S: 0.02841 },
      { age: 11, L: 1, M: 74.5388, S: 0.02810 },
      { age: 12, L: 1, M: 75.7488, S: 0.02784 },
      { age: 13, L: 1, M: 76.9186, S: 0.02761 },
      { age: 14, L: 1, M: 78.0533, S: 0.02741 },
      { age: 15, L: 1, M: 79.1558, S: 0.02723 },
      { age: 16, L: 1, M: 80.2283, S: 0.02708 },
      { age: 17, L: 1, M: 81.2722, S: 0.02694 },
      { age: 18, L: 1, M: 82.2885, S: 0.02682 },
      { age: 19, L: 1, M: 83.2779, S: 0.02671 },
      { age: 20, L: 1, M: 84.2410, S: 0.02661 },
      { age: 21, L: 1, M: 85.1783, S: 0.02652 },
      { age: 22, L: 1, M: 86.0904, S: 0.02644 },
      { age: 23, L: 1, M: 86.9776, S: 0.02637 },
      { age: 24, L: 1, M: 87.8406, S: 0.02630 },
      { age: 27, L: 1, M: 90.3031, S: 0.02618 },
      { age: 30, L: 1, M: 92.5846, S: 0.02612 },
      { age: 33, L: 1, M: 94.7086, S: 0.02610 },
      { age: 36, L: 1, M: 96.6924, S: 0.02611 },
      { age: 39, L: 1, M: 98.5483, S: 0.02613 },
      { age: 42, L: 1, M: 100.2863, S: 0.02617 },
      { age: 45, L: 1, M: 101.9155, S: 0.02622 },
      { age: 48, L: 1, M: 103.4438, S: 0.02627 },
      { age: 51, L: 1, M: 104.8780, S: 0.02633 },
      { age: 54, L: 1, M: 106.2245, S: 0.02639 },
      { age: 57, L: 1, M: 107.4892, S: 0.02645 },
      { age: 60, L: 1, M: 108.6775, S: 0.02651 },
    ],
    female: [
      { age: 0, L: 1, M: 49.1477, S: 0.03790 },
      { age: 1, L: 1, M: 53.6872, S: 0.03640 },
      { age: 2, L: 1, M: 57.0673, S: 0.03521 },
      { age: 3, L: 1, M: 59.8029, S: 0.03414 },
      { age: 4, L: 1, M: 62.0899, S: 0.03322 },
      { age: 5, L: 1, M: 64.0301, S: 0.03242 },
      { age: 6, L: 1, M: 65.7311, S: 0.03171 },
      { age: 7, L: 1, M: 67.2915, S: 0.03110 },
      { age: 8, L: 1, M: 68.7505, S: 0.03055 },
      { age: 9, L: 1, M: 70.1435, S: 0.03006 },
      { age: 10, L: 1, M: 71.4819, S: 0.02963 },
      { age: 11, L: 1, M: 72.7710, S: 0.02925 },
      { age: 12, L: 1, M: 74.0151, S: 0.02891 },
      { age: 13, L: 1, M: 75.2185, S: 0.02861 },
      { age: 14, L: 1, M: 76.3859, S: 0.02833 },
      { age: 15, L: 1, M: 77.5215, S: 0.02808 },
      { age: 16, L: 1, M: 78.6287, S: 0.02785 },
      { age: 17, L: 1, M: 79.7103, S: 0.02764 },
      { age: 18, L: 1, M: 80.7688, S: 0.02745 },
      { age: 19, L: 1, M: 81.8059, S: 0.02728 },
      { age: 20, L: 1, M: 82.8230, S: 0.02712 },
      { age: 21, L: 1, M: 83.8212, S: 0.02698 },
      { age: 22, L: 1, M: 84.8014, S: 0.02685 },
      { age: 23, L: 1, M: 85.7644, S: 0.02673 },
      { age: 24, L: 1, M: 86.7107, S: 0.02662 },
      { age: 27, L: 1, M: 89.4293, S: 0.02636 },
      { age: 30, L: 1, M: 91.9412, S: 0.02618 },
      { age: 33, L: 1, M: 94.2752, S: 0.02606 },
      { age: 36, L: 1, M: 96.4530, S: 0.02599 },
      { age: 39, L: 1, M: 98.4901, S: 0.02596 },
      { age: 42, L: 1, M: 100.3979, S: 0.02595 },
      { age: 45, L: 1, M: 102.1862, S: 0.02597 },
      { age: 48, L: 1, M: 103.8635, S: 0.02601 },
      { age: 51, L: 1, M: 105.4371, S: 0.02606 },
      { age: 54, L: 1, M: 106.9135, S: 0.02612 },
      { age: 57, L: 1, M: 108.2986, S: 0.02618 },
      { age: 60, L: 1, M: 109.5980, S: 0.02625 },
    ],
  },
};

function findReference(age, sex, metric) {
  const table = LMS[metric]?.[sex];
  if (!table) return null;

  if (age <= table[0].age) return table[0];
  if (age >= table[table.length - 1].age) return table[table.length - 1];

  for (let i = 0; i < table.length - 1; i++) {
    const lower = table[i];
    const upper = table[i + 1];
    if (age >= lower.age && age <= upper.age) {
      if (age === lower.age) return lower;
      if (age === upper.age) return upper;
      const fraction = (age - lower.age) / (upper.age - lower.age);
      return {
        age,
        L: lower.L + (upper.L - lower.L) * fraction,
        M: lower.M + (upper.M - lower.M) * fraction,
        S: lower.S + (upper.S - lower.S) * fraction,
      };
    }
  }
  return table[table.length - 1];
}

export function calculateZScore(value, ageMonths, sex, metric) {
  if (value == null || isNaN(value) || value <= 0) return null;
  if (sex !== 'male' && sex !== 'female') return null;

  const sexKey = sex;
  const ref = findReference(ageMonths, sexKey, metric);
  if (!ref) return null;

  const { L, M, S } = ref;

  if (L === 0) {
    return Math.log(value / M) / S;
  }
  return (Math.pow(value / M, L) - 1) / (L * S);
}

function normCdf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1 + sign * y);
}

export function zScoreToPercentile(zScore) {
  if (zScore == null || isNaN(zScore)) return null;
  return Math.round(normCdf(zScore) * 100);
}

export function getGrowthCategory(zScore, metric) {
  if (zScore == null || isNaN(zScore)) return { category: 'Unknown', color: '#9ba4b5' };

  if (metric === 'weight_kg') {
    if (zScore < -3) return { category: 'Severely Underweight', color: '#ef4444' };
    if (zScore < -2) return { category: 'Underweight', color: '#f97316' };
    if (zScore <= 1) return { category: 'Normal', color: '#22c55e' };
    if (zScore <= 2) return { category: 'Above Average', color: '#eab308' };
    return { category: 'Overweight', color: '#ef4444' };
  }

  if (zScore < -3) return { category: 'Severely Stunted', color: '#ef4444' };
  if (zScore < -2) return { category: 'Stunted', color: '#f97316' };
  if (zScore <= 1) return { category: 'Normal', color: '#22c55e' };
  if (zScore <= 2) return { category: 'Above Average', color: '#eab308' };
  return { category: 'Very Tall', color: '#a855f7' };
}

export function analyzeGrowth(record, baby) {
  if (!record || !baby) return null;

  const gender = baby.gender;
  if (gender !== 'male' && gender !== 'female') {
    return { _skip: true, _note: 'Set baby gender for WHO growth percentiles' };
  }

  const ageMonths = record.age_months;
  const sex = gender;

  const metrics = ['weight_kg', 'height_cm'];
  const result = {};

  metrics.forEach((metric) => {
    const value = record[metric];
    if (value == null) {
      result[metric] = null;
      return;
    }

    const whoMetric = metric;
    const zScore = calculateZScore(value, ageMonths, sex, whoMetric);
    const percentile = zScoreToPercentile(zScore);
    const { category, color } = getGrowthCategory(zScore, whoMetric);

    result[metric] = {
      z_score: zScore ? Math.round(zScore * 100) / 100 : null,
      percentile,
      category,
      color,
    };
  });

  return result;
}

export function calculateTrend(latest, previous) {
  if (!latest || !previous) return null;

  const metrics = [
    { key: 'weight_kg', label: 'Weight', unit: 'kg', icon: '⚖️' },
    { key: 'height_cm', label: 'Height', unit: 'cm', icon: '📏' },
  ];

  return metrics.map(({ key, label, unit, icon }) => {
    const latestVal = latest[key];
    const prevVal = previous[key];

    if (latestVal == null || prevVal == null) {
      return { key, label, unit, icon, delta: null, direction: 'unknown', text: 'No data', color: '#9ba4b5' };
    }

    const delta = Math.round((latestVal - prevVal) * 100) / 100;
    let direction, text, color;

    if (Math.abs(delta) < 0.01) {
      direction = 'stable';
      text = `${icon} ${label}: Stable`;
      color = '#9ba4b5';
    } else if (delta > 0) {
      direction = 'up';
      text = `${icon} ${label}: ↑ +${delta} ${unit}`;
      color = '#22c55e';
    } else {
      direction = 'down';
      text = `${icon} ${label}: ↓ ${delta} ${unit}`;
      color = '#ef4444';
    }

    return { key, label, unit, icon, delta, direction, text, color };
  });
}

export default LMS;
