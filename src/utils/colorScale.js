import { toNumber } from './numberParser';

const STOPS = [
  { p: 0.000, color: [255,   0,   0] },
  { p: 0.166, color: [255, 127,   0] },
  { p: 0.333, color: [255, 255,   0] },
  { p: 0.500, color: [  0, 255,   0] },
  { p: 0.666, color: [  0, 255, 255] },
  { p: 0.833, color: [  0,   0, 255] },
  { p: 1.000, color: [139,   0, 255] },
];

export function getPriceColor(value, min, max) {
  const v = toNumber(value);
  if (!Number.isFinite(v) || max === min) return 'transparent';
  const p = Math.min(Math.max((v - min) / (max - min), 0), 1);

  let c1 = STOPS[0], c2 = STOPS[STOPS.length - 1], t = 0;
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (p >= STOPS[i].p && p <= STOPS[i + 1].p) {
      c1 = STOPS[i];
      c2 = STOPS[i + 1];
      t = (p - c1.p) / (c2.p - c1.p);
      break;
    }
  }

  const r = Math.round(c1.color[0] + (c2.color[0] - c1.color[0]) * t);
  const g = Math.round(c1.color[1] + (c2.color[1] - c1.color[1]) * t);
  const b = Math.round(c1.color[2] + (c2.color[2] - c1.color[2]) * t);
  return `rgb(${r},${g},${b})`;
}

export function getContrastColor(rgb) {
  if (rgb === 'transparent') return '#0f172a';
  const m = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!m) return '#0f172a';
  const luminance = (0.2126 * +m[1] + 0.7152 * +m[2] + 0.0722 * +m[3]) / 255;
  return luminance > 0.6 ? '#0f172a' : '#ffffff';
}
