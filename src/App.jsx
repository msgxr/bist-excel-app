import { NAME_COLUMN, PRICE_COLUMN } from './constants/columns';
import { useBistData } from './hooks/useBistData';
import { useTableState } from './hooks/useTableState';
import { exportToExcel, exportToPDF } from './utils/exportUtils';
import Toolbar from './components/Toolbar';
import DataTable from './components/DataTable';
import Pagination from './components/Pagination';

export default function App() {
  const { data, minMax, error, loadFile } = useBistData();
  const {
    searchInput, setSearchInput,
    applySearch, clearSearch,
    sortKey, sortOrder,
    sortBy, toggleSort,
    sorted, paginated,
    currentPage, totalPages,
    setCurrentPage,
  } = useTableState(data);

  return (
    <div className="page">
      <div className="watermark" aria-hidden="true" />

      <div className="container">
        <header className="page-header">
          <img
            src="/borsa-i-stanbul-logo-yatay.png"
            alt="Borsa İstanbul"
            className="logo"
          />
          <h1 className="page-title">BIST Dashboard</h1>
        </header>

        <Toolbar
          onFileChange={loadFile}
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          onSearch={applySearch}
          onClearSearch={clearSearch}
          onSortByName={(order) => sortBy(NAME_COLUMN, order)}
          onSortByPrice={(order) => sortBy(PRICE_COLUMN, order)}
          onExportExcel={() => exportToExcel(sorted)}
          onExportPDF={() => exportToPDF(sorted)}
        />

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <div className="status-bar" aria-live="polite">
          <strong>Toplam Kayıt:</strong> {sorted.length}
          {' | '}
          <strong>Sayfa:</strong> {currentPage} / {totalPages}
        </div>

        {paginated.length > 0 ? (
          <>
            <DataTable
              rows={paginated}
              minMax={minMax}
              sortKey={sortKey}
              sortOrder={sortOrder}
              onToggleSort={toggleSort}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
          </>
        ) : (
          <p className="empty-state">
            Görüntülenecek veri yok. Lütfen bir Excel dosyası yükleyin.
          </p>
        )}
      </div>
    </div>
  );
}
