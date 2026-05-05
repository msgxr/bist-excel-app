export default function Pagination({ currentPage, totalPages, onChange }) {
  const go = (page) => onChange(Math.min(Math.max(1, page), totalPages));
  const isFirst = currentPage === 1;
  const isLast  = currentPage === totalPages;

  return (
    <nav className="pagination" aria-label="Sayfalama">
      <button className="btn" onClick={() => go(1)} disabled={isFirst}>İlk</button>
      <button className="btn" onClick={() => go(currentPage - 1)} disabled={isFirst}>←</button>
      <span className="pagination__info">Sayfa {currentPage} / {totalPages}</span>
      <button className="btn" onClick={() => go(currentPage + 1)} disabled={isLast}>→</button>
      <button className="btn" onClick={() => go(totalPages)} disabled={isLast}>Son</button>
    </nav>
  );
}
