export function formatMetricValue(value: string | number): string {
  if (typeof value === 'number') {
    return Intl.NumberFormat('pt-PT', { maximumFractionDigits: 1 }).format(value);
  }
  return value;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

