import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { COLUMNS } from '../constants/columns';

export function exportToExcel(rows) {
  if (!rows.length) return;
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'BIST Verileri');
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(
    new Blob([buf], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    }),
    'bist_verileri.xlsx',
  );
}

export function exportToPDF(rows) {
  if (!rows.length) return;
  const doc = new jsPDF({ unit: 'pt' });
  doc.setFontSize(14);
  doc.text('BIST Verileri', 40, 40);
  doc.autoTable({
    startY: 60,
    head: [COLUMNS.map((c) => c.label)],
    body: rows.map((r) => COLUMNS.map((c) => String(r[c.key] ?? ''))),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [23, 105, 170] },
  });
  doc.save('bist_verileri.pdf');
}
