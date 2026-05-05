import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { toNumber } from '../utils/numberParser';
import { PRICE_COLUMN } from '../constants/columns';

export function useBistData() {
  const [data, setData] = useState([]);
  const [minMax, setMinMax] = useState({ min: 0, max: 1 });
  const [error, setError] = useState(null);

  const loadFile = useCallback((file) => {
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const wb = XLSX.read(evt.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
        setData(rows);
        const vals = rows.map((r) => toNumber(r[PRICE_COLUMN])).filter(Number.isFinite);
        const min = Math.min(...vals);
        const max = Math.max(...vals);
        setMinMax({ min, max: min === max ? min + 1 : max });
      } catch {
        setError('Dosya okunamadı. Lütfen geçerli bir Excel dosyası seçin.');
      }
    };
    reader.onerror = () => setError('Dosya yüklenirken bir hata oluştu.');
    reader.readAsArrayBuffer(file);
  }, []);

  return { data, minMax, error, loadFile };
}
