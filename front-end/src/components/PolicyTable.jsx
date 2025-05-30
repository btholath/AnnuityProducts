// components/PolicyTable.jsx
import React from 'react';

function PolicyTable({ loading, policies, columnsToExport, allColumns, toggleColumn, onEdit, onDelete, currentPage, totalPages, setCurrentPage }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            {allColumns.map(col => (
              <th key={col}>
                <input
                  type="checkbox"
                  checked={columnsToExport.includes(col)}
                  onChange={() => toggleColumn(col)}
                  className="form-check-input me-1"
                />
                {col}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {policies.map(policy => (
            <tr key={policy._id}>
              {columnsToExport.map(col => (
                <td key={col}>{col.split('.').reduce((o, i) => o?.[i], policy)}</td>
              ))}
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(policy)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(policy._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`btn btn-sm mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PolicyTable;