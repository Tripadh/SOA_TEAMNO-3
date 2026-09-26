import './DataTable.css';

export default function DataTable({
  columns = [],
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found',
  className = ''
}) {
  return (
    <div className={`table-container ${className}`}>
      <table className="clinical-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th 
                key={col.key || col.header} 
                style={{ textAlign: col.align || 'left', width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty-cell">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row[keyField] || idx}>
                {columns.map(col => (
                  <td 
                    key={col.key || col.header} 
                    style={{ textAlign: col.align || 'left' }}
                  >
                    {col.render ? col.render(row[col.key], row, idx) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
