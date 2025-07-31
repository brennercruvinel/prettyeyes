import { useState } from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';

interface CollapsibleModalProps {
  onClose: () => void;
  onInsert: (summary: string, content: string, defaultOpen: boolean) => void;
}

export default function CollapsibleModal({ onClose, onInsert }: CollapsibleModalProps) {
  const [summary, setSummary] = useState('Click to expand');
  const [content, setContent] = useState('Your content here...');
  const [defaultOpen, setDefaultOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsert(summary || 'Click to expand', content || 'Your content here...', defaultOpen);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-github-surface border border-github-border rounded-lg w-full max-w-2xl relative z-10">
        <div className="flex items-center justify-between p-4 border-b border-github-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiChevronDown /> Create Collapsible Section
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
            <label className="block text-sm text-github-text mb-1">Summary Text</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Click to expand"
              className="w-full px-3 py-2 bg-github-bg border border-github-border rounded focus:outline-none focus:border-github-accent"
              required
            />
            <p className="text-xs text-github-muted mt-1">
              This text will always be visible and users can click on it to expand/collapse the content
            </p>
          </div>

          <div>
            <label className="block text-sm text-github-text mb-1">Collapsible Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the content that will be hidden/shown..."
              rows={6}
              className="w-full px-3 py-2 bg-github-bg border border-github-border rounded focus:outline-none focus:border-github-accent"
              required
            />
            <p className="text-xs text-github-muted mt-1">
              This content will be hidden by default and shown when the user clicks the summary
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="default-open"
              checked={defaultOpen}
              onChange={(e) => setDefaultOpen(e.target.checked)}
              className="rounded border-github-border"
            />
            <label htmlFor="default-open" className="text-sm text-github-text">
              Expand by default
            </label>
          </div>

          <div>
            <p className="text-xs text-github-muted mb-2">Preview:</p>
            <div className="bg-github-bg rounded p-4 border border-github-border">
              <details open={defaultOpen}>
                <summary className="cursor-pointer hover:text-github-accent flex items-center gap-1">
                  <FiChevronDown className={`transition-transform ${defaultOpen ? 'rotate-0' : '-rotate-90'}`} size={16} />
                  {summary || 'Click to expand'}
                </summary>
                <div className="mt-2 pl-6 text-sm text-github-muted">
                  {content.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {line || '\u00A0'}
                    </p>
                  ))}
                </div>
              </details>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-600/50 rounded p-3">
            <p className="text-sm text-blue-300">
              <strong>Note:</strong> Collapsible sections are great for:
            </p>
            <ul className="text-sm text-blue-300 mt-1 ml-4 list-disc">
              <li>Additional details that might clutter the main content</li>
              <li>Optional installation steps or advanced configurations</li>
              <li>Troubleshooting sections</li>
              <li>Long code examples or logs</li>
            </ul>
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
              Insert Collapsible
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}