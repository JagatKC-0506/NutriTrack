export const metricConfig = {
  weight: { key: 'weight_kg', label: 'Weight', unit: 'kg', icon: '⚖️' },
  height: { key: 'height_cm', label: 'Height', unit: 'cm', icon: '📏' },
};

export function buildChartPoints(baby, growthRecords) {
  const points = [];

  if (baby && baby.date_of_birth) {
    points.push({
      date: new Date(baby.date_of_birth).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight_kg: baby.weight_at_birth_kg,
      height_cm: baby.height_at_birth_cm,
      isBirth: true,
    });
  }

  const recordPoints = [...growthRecords]
    .reverse()
    .map((record) => ({
      date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight_kg: record.weight_kg,
      height_cm: record.height_cm,
      isBirth: false,
    }));

  return [...points, ...recordPoints];
}

export function buildChartValues(chartPoints, metricKey) {
  return chartPoints
    .map(point => ({ ...point, value: point[metricKey] }))
    .filter(point => point.value !== null && point.value !== undefined);
}

export function buildLinePath(chartValues, width = 300, height = 140) {
  if (chartValues.length === 0) return '';
  const padding = 12;
  const stepX = (width - padding * 2) / Math.max(chartValues.length - 1, 1);

  const values = chartValues.map(p => p.value);
  const chartMin = Math.min(...values);
  const chartMax = Math.max(...values);
  const chartRange = chartMax - chartMin || 1;

  return chartValues
    .map((point, index) => {
      const x = padding + index * stepX;
      const y = height - padding - ((point.value - chartMin) / chartRange) * (height - padding * 2);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

export function getChartRange(chartValues) {
  if (chartValues.length === 0) return { min: 0, max: 0, range: 1 };
  const values = chartValues.map(p => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max, range: max - min || 1 };
}
