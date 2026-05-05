import { useState, useMemo } from 'react';
import { toNumber } from '../utils/numberParser';
import { NAME_COLUMN, ITEMS_PER_PAGE } from '../constants/columns';

const NUMERIC_KEYS = new Set(['BIST Fiyatı', 'Açılış', 'Kapanış']);

export function useTableState(data) {
  const [searchInput, setSearchInput]   = useState('');
  const [searchTerm, setSearchTerm]     = useState('');
  const [sortKey, setSortKey]           = useState(NAME_COLUMN);
  const [sortOrder, setSortOrder]       = useState('asc');
  const [currentPage, setCurrentPage]   = useState(1);

  const applySearch = () => {
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const sortBy = (key, order = 'asc') => {
    setSortKey(key);
    setSortOrder(order);
    setCurrentPage(1);
  };

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const filtered = useMemo(
    () =>
      !searchTerm
        ? data
        : data.filter((row) =>
            (row[NAME_COLUMN] ?? '').toString().toLowerCase().includes(searchTerm.toLowerCase()),
          ),
    [data, searchTerm],
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (NUMERIC_KEYS.has(sortKey)) {
          const diff = toNumber(a[sortKey]) - toNumber(b[sortKey]);
          return sortOrder === 'asc' ? diff : -diff;
        }
        const cmp = (a[sortKey] ?? '').toString().localeCompare((b[sortKey] ?? '').toString(), 'tr');
        return sortOrder === 'asc' ? cmp : -cmp;
      }),
    [filtered, sortKey, sortOrder],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const safePage   = Math.min(currentPage, totalPages);
  const paginated  = sorted.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  return {
    searchInput, setSearchInput,
    applySearch, clearSearch,
    sortKey, sortOrder,
    sortBy, toggleSort,
    sorted, paginated,
    currentPage: safePage, totalPages,
    setCurrentPage,
  };
}
