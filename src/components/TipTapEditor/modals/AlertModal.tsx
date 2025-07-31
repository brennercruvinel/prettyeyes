import { useState } from 'react';
import { FiX, FiAlertCircle, FiInfo, FiAlertTriangle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface AlertModalProps {
  onClose: () => void;
  onInsert: (type: string, content: string) => void;
  defaultType?: 'note' | 'tip' | 'important' | 'warning' | 'caution';
}

const alertTypes = [
  { 
    type: 'note', 
    title: 'Note', 
    icon: FiInfo, 
    color: '#0969da', 
    bgColor: '#0969da1a',
    description: 'Useful information that users should know, even when skimming content.'
  },
  { 
    type: 'tip', 
    title: 'Tip', 
    icon: FiCheckCircle, 
    color: '#1a7f37', 
    bgColor: '#1a7f371a',
    description: 'Helpful advice for doing things better or more easily.'
  },
  { 
    type: 'important', 
    title: 'Important', 
    icon: FiAlertCircle, 
    color: '#8250df', 
    bgColor: '#8250df1a',
    description: 'Key information users need to know to achieve their goal.'
  },
  { 
    type: 'warning', 
    title: 'Warning', 
    icon: FiAlertTriangle, 
    color: '#9a6700', 
    bgColor: '#9a67001a',
    description: 'Urgent info that needs immediate user attention to avoid problems.'
  },
  { 
    type: 'caution', 
    title: 'Caution', 
    icon: FiXCircle, 
    color: '#d1242f', 
    bgColor: '#d1242f1a',
    description: 'Advises about risks or negative outcomes of certain actions.'
  },
];

export default function AlertModal({ onClose, onInsert, defaultType = 'note' }: AlertModalProps) {
  const [selectedType, setSelectedType] = useState(defaultType);
  const [content, setContent] = useState('');

  const selectedAlert = alertTypes.find(a => a.type === selectedType)!;
  const Icon = selectedAlert.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsert(selectedType, content || 'Your alert message here');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-github-surface border border-github-border rounded-lg w-full max-w-2xl relative z-10">
        <div className="flex items-center justify-between p-4 border-b border-github-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiAlertCircle /> Create GitHub Alert
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
            <label className="block text-sm text-github-text mb-2">Alert Type</label>
            <div className="grid grid-cols-5 gap-2">
              {alertTypes.map((alert) => {
                const AlertIcon = alert.icon;
                return (
                  <button
                    key={alert.type}
                    type="button"
                    onClick={() => setSelectedType(alert.type as 'note' | 'tip' | 'important' | 'warning' | 'caution')}
                    className={`p-3 rounded border transition-all ${
                      selectedType === alert.type
                        ? 'border-github-accent shadow-md'
                        : 'border-github-border hover:border-github-muted'
                    }`}
                    style={{
                      backgroundColor: selectedType === alert.type ? alert.bgColor : 'transparent',
                      borderColor: selectedType === alert.type ? alert.color : undefined
                    }}
                  >
                    <AlertIcon size={24} style={{ color: alert.color }} className="mx-auto mb-1" />
                    <div className="text-xs">{alert.title}</div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-github-muted mt-2">{selectedAlert.description}</p>
          </div>

          <div>
            <label className="block text-sm text-github-text mb-1">Alert Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your alert message..."
              rows={4}
              className="w-full px-3 py-2 bg-github-bg border border-github-border rounded focus:outline-none focus:border-github-accent"
            />
          </div>

          <div>
            <p className="text-xs text-github-muted mb-2">Preview:</p>
            <div 
              className="rounded-md p-4 border-l-4"
              style={{ 
                borderColor: selectedAlert.color,
                backgroundColor: selectedAlert.bgColor
              }}
            >
              <div className="flex items-start gap-2">
                <Icon size={20} style={{ color: selectedAlert.color }} className="mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: selectedAlert.color }}>
                    [{selectedAlert.title.toUpperCase()}]
                  </p>
                  <p className="text-sm mt-1 text-github-text">
                    {content || 'Your alert message here'}
                  </p>
                </div>
              </div>
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
              Insert Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}