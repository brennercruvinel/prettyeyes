import { useState } from 'react';
import { FiX, FiCommand } from 'react-icons/fi';

interface KeyboardModalProps {
  onClose: () => void;
  onInsert: (keys: string[]) => void;
  selectedText?: string;
}

const commonShortcuts = [
  { name: 'Copy', keys: ['Ctrl', 'C'], mac: ['Cmd', 'C'] },
  { name: 'Paste', keys: ['Ctrl', 'V'], mac: ['Cmd', 'V'] },
  { name: 'Cut', keys: ['Ctrl', 'X'], mac: ['Cmd', 'X'] },
  { name: 'Undo', keys: ['Ctrl', 'Z'], mac: ['Cmd', 'Z'] },
  { name: 'Redo', keys: ['Ctrl', 'Y'], mac: ['Cmd', 'Shift', 'Z'] },
  { name: 'Save', keys: ['Ctrl', 'S'], mac: ['Cmd', 'S'] },
  { name: 'Select All', keys: ['Ctrl', 'A'], mac: ['Cmd', 'A'] },
  { name: 'Find', keys: ['Ctrl', 'F'], mac: ['Cmd', 'F'] },
  { name: 'New Tab', keys: ['Ctrl', 'T'], mac: ['Cmd', 'T'] },
  { name: 'Close Tab', keys: ['Ctrl', 'W'], mac: ['Cmd', 'W'] },
];

export default function KeyboardModal({ onClose, onInsert, selectedText }: KeyboardModalProps) {
  const [customKeys, setCustomKeys] = useState(selectedText || '');
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keys = customKeys.split(/[\s+]+/).filter(k => k.length > 0);
    if (keys.length > 0) {
      onInsert(keys);
      onClose();
    }
  };

  const handleShortcutClick = (shortcut: typeof commonShortcuts[0]) => {
    const keys = isMac && shortcut.mac ? shortcut.mac : shortcut.keys;
    onInsert(keys);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-github-surface border border-github-border rounded-lg w-full max-w-2xl relative z-10">
        <div className="flex items-center justify-between p-4 border-b border-github-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiCommand /> Insert Keyboard Shortcut
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
            <label className="block text-sm text-github-text mb-1">Custom Keys</label>
            <input
              type="text"
              value={customKeys}
              onChange={(e) => setCustomKeys(e.target.value)}
              placeholder="e.g., Ctrl+Alt+Delete or Cmd+Shift+P"
              className="w-full px-3 py-2 bg-github-bg border border-github-border rounded focus:outline-none focus:border-github-accent"
              autoFocus
            />
            <p className="text-xs text-github-muted mt-1">
              Enter keys separated by + or spaces. Each key will be displayed in its own box.
            </p>
          </div>

          <div>
            <p className="text-sm text-github-text mb-2">Common Shortcuts:</p>
            <div className="grid grid-cols-2 gap-2">
              {commonShortcuts.map((shortcut) => {
                const keys = isMac && shortcut.mac ? shortcut.mac : shortcut.keys;
                return (
                  <button
                    key={shortcut.name}
                    type="button"
                    onClick={() => handleShortcutClick(shortcut)}
                    className="flex items-center justify-between px-3 py-2 bg-github-bg border border-github-border rounded hover:border-github-accent transition-colors"
                  >
                    <span className="text-sm text-github-muted">{shortcut.name}</span>
                    <div className="flex items-center gap-1">
                      {keys.map((key, i) => (
                        <span key={i} className="flex items-center">
                          <kbd className="px-2 py-1 text-xs bg-github-surface border border-github-border rounded">
                            {key}
                          </kbd>
                          {i < keys.length - 1 && <span className="text-github-muted mx-1">+</span>}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-github-bg rounded p-3">
            <p className="text-xs text-github-muted mb-2">Preview:</p>
            <div className="flex items-center gap-1">
              {(customKeys ? customKeys.split(/[\s+]+/).filter(k => k.length > 0) : ['Key']).map((key, i) => (
                <span key={i} className="flex items-center">
                  <kbd className="px-2 py-1 text-sm bg-github-surface border border-github-border rounded">
                    {key}
                  </kbd>
                  {i < customKeys.split(/[\s+]+/).filter(k => k.length > 0).length - 1 && 
                    <span className="text-github-muted mx-1">+</span>
                  }
                </span>
              ))}
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
              Insert Shortcut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}