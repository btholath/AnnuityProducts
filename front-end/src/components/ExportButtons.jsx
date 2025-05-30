// components/ExportButtons.jsx
import React from 'react';
import * as XLSX from 'xlsx';

function ExportButtons({ data, columns }) {
  const exportFile = (type) => {
    const processed = data.map(row =>
      columns.reduce((acc, col) => {
        acc[col] = col.split('.').reduce((o, i) => o?.[i], row);
        return acc;
      }, {})
    );

    if (type === 'json') {
      const blob = new Blob([JSON.stringify(processed, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'policies.json';
      link.click();
    } else if (type === 'csv' || type === 'xlsx') {
      const ws = XLSX.utils.json_to_sheet(processed);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Policies');
      XLSX.writeFile(wb, `policies.${type}`);
    }
  };

  return (
    <div className="mb-3">
      <button className="btn btn-outline-secondary me-2" onClick={() => exportFile('xlsx')}>Export to Excel</button>
      <button className="btn btn-outline-secondary me-2" onClick={() => exportFile('csv')}>Export to CSV</button>
      <button className="btn btn-outline-secondary" onClick={() => exportFile('json')}>Export to JSON</button>
    </div>
  );
}

export default ExportButtons;