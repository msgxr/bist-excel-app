export function toNumber(val) {
  if (typeof val === 'number') return val;
  if (typeof val !== 'string') return Number(val) || 0;
  const num = Number(val.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(num) ? num : 0;
}
