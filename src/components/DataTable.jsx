import { COLUMNS, PRICE_COLUMN } from '../constants/columns';
import { getPriceColor, getContrastColor } from '../utils/colorScale';

export default function DataTable({ rows, minMax, sortKey, sortOrder, onToggleSort }) {
  const sortArrow = (key) => {
    if (sortKey !== key) return null;
    return <span className="sort-arrow">{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>;
  };

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className="data-table__th"
                onClick={() => onToggleSort(col.key)}
                aria-sort={sortKey === col.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                {col.label}{sortArrow(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const bg = getPriceColor(row[PRICE_COLUMN], minMax.min, minMax.max);
            const fg = getContrastColor(bg);
            return (
              <tr key={`${row['BIST Adı']}-${i}`} className="data-table__row">
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className="data-table__td"
                    style={
                      col.key === PRICE_COLUMN
                        ? { backgroundColor: bg, color: fg, fontWeight: 700 }
                        : undefined
                    }
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
