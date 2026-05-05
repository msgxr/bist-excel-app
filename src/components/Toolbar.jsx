export default function Toolbar({
  onFileChange,
  searchInput,
  onSearchChange,
  onSearch,
  onClearSearch,
  onSortByName,
  onSortByPrice,
  onExportExcel,
  onExportPDF,
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-row">
        <label className="toolbar-label" htmlFor="file-upload">Excel Dosyası:</label>
        <input
          id="file-upload"
          className="file-input"
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => onFileChange(e.target.files?.[0])}
        />
      </div>

      <div className="toolbar-row">
        <label className="toolbar-label" htmlFor="search-input">Arama:</label>
        <input
          id="search-input"
          className="search-input"
          type="text"
          placeholder="BIST adı ara…"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button className="btn btn--primary" onClick={onSearch}>Ara</button>
        <button className="btn" onClick={onClearSearch}>Temizle</button>
      </div>

      <div className="toolbar-row">
        <span className="toolbar-label">Sıralama:</span>
        <button className="btn" onClick={() => onSortByName('asc')}>A → Z</button>
        <button className="btn" onClick={() => onSortByName('desc')}>Z → A</button>
        <button className="btn" onClick={() => onSortByPrice('asc')}>Fiyat ↑</button>
        <button className="btn" onClick={() => onSortByPrice('desc')}>Fiyat ↓</button>
      </div>

      <div className="toolbar-row">
        <button className="btn btn--primary" onClick={onExportExcel}>Excel'e Aktar</button>
        <button className="btn" onClick={onExportPDF}>PDF'e Aktar</button>
      </div>
    </div>
  );
}
