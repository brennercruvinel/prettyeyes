import { useState } from 'react';
import { FiX, FiGrid } from 'react-icons/fi';

interface TableModalProps {
  onClose: () => void;
  onInsert: (rows: number, cols: number, withHeader: boolean) => void;
}

export default function TableModal({ onClose, onInsert }: TableModalProps) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [withHeader, setWithHeader] = useState(true);
  const [hoveredCell, setHoveredCell] = useState({ row: -1, col: -1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsert(rows, cols, withHeader);
    onClose();
  };

  const handleGridClick = (row: number, col: number) => {
    setRows(row + 1);
    setCols(col + 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-github-surface border border-github-border rounded-lg w-full max-w-md relative z-10">
        <div className="flex items-center justify-between p-4 border-b border-github-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiGrid /> Insert Table
          </h3>
          <button
            onClick={onClose}
            className="text-github-muted hover:text-github-text"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-github-text mb-2">
              Select table size: {rows} × {cols}
            </label>
            <div className="inline-block bg-github-bg border border-github-border rounded p-2">
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 10 }, (_, rowIndex) => (
                  <div key={rowIndex} className="contents">
                    {Array.from({ length: 10 }, (_, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        type="button"
                        onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                        onMouseLeave={() => setHoveredCell({ row: -1, col: -1 })}
                        onClick={() => handleGridClick(rowIndex, colIndex)}
                        className={`w-6 h-6 border ${
                          rowIndex <= hoveredCell.row && colIndex <= hoveredCell.col
                            ? 'bg-blue-500 border-blue-500'
                            : rowIndex < rows && colIndex < cols
                            ? 'bg-gray-600 border-gray-600'
                            : 'bg-gray-800 border-gray-700'
                        } transition-colors`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-github-text mb-1">Rows</label>
              <input
                type="number"
                min="1"
                max="50"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-github-bg border border-github-border rounded focus:outline-none focus:border-github-accent"
              />
            </div>
            <div>
              <label className="block text-sm text-github-text mb-1">Columns</label>
              <input
                type="number"
                min="1"
                max="20"
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-github-bg border border-github-border rounded focus:outline-none focus:border-github-accent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="with-header"
              checked={withHeader}
              onChange={(e) => setWithHeader(e.target.checked)}
              className="rounded border-github-border"
            />
            <label htmlFor="with-header" className="text-sm text-github-text">
              Include header row
            </label>
          </div>

          <div className="bg-github-bg rounded p-3">
            <p className="text-xs text-github-muted mb-2">Preview:</p>
            <div className="overflow-auto">
              <table className="border-collapse text-xs">
                <tbody>
                  {Array.from({ length: Math.min(rows, 5) }, (_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: Math.min(cols, 5) }, (_, colIndex) => {
                        const isHeader = withHeader && rowIndex === 0;
                        const Tag = isHeader ? 'th' : 'td';
                        return (
                          <Tag
                            key={colIndex}
                            className={`border border-gray-600 px-2 py-1 ${
                              isHeader ? 'bg-gray-700 font-semibold' : ''
                            }`}
                          >
                            {isHeader ? `Header ${colIndex + 1}` : `Cell ${rowIndex + 1}-${colIndex + 1}`}
                          </Tag>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {(rows > 5 || cols > 5) && (
                <p className="text-xs text-github-muted mt-1">
                  ... and {rows > 5 ? rows - 5 : 0} more rows, {cols > 5 ? cols - 5 : 0} more columns
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-github-bg border border-github-border rounded hover:bg-github-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-github-accent text-white rounded hover:bg-blue-600 transition-colors"
            >
              Insert Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}