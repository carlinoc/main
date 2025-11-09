export function formatPrice(value: number | string): string {
  const num = Number(value);
  if (isNaN(num)) return '0.00';
  return num.toFixed(2);
}
