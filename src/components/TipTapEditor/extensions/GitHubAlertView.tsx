import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { useState } from 'react';
import { 
  FiInfo, 
  FiAlertCircle, 
  FiAlertTriangle, 
  FiZap,
  FiX,
  FiChevronDown
} from 'react-icons/fi';
import type { AlertType } from './GitHubAlert';

const alertConfig = {
  note: {
    icon: FiInfo,
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-600',
    iconColor: 'text-blue-400',
    title: 'Note',
  },
  tip: {
    icon: FiZap,
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-600',
    iconColor: 'text-green-400',
    title: 'Tip',
  },
  important: {
    icon: FiAlertCircle,
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-600',
    iconColor: 'text-purple-400',
    title: 'Important',
  },
  warning: {
    icon: FiAlertTriangle,
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-600',
    iconColor: 'text-yellow-400',
    title: 'Warning',
  },
  caution: {
    icon: FiX,
    bgColor: 'bg-red-900/20',
    borderColor: 'border-red-600',
    iconColor: 'text-red-400',
    title: 'Caution',
  },
};

const GitHubAlertView = ({ node, updateAttributes, deleteNode }: NodeViewProps) => {
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const config = alertConfig[node.attrs.type as AlertType];
  const Icon = config.icon;

  const handleTypeChange = (newType: AlertType) => {
    updateAttributes({ type: newType });
    setShowTypeSelector(false);
  };

  return (
    <NodeViewWrapper className="my-3">
      <div className={`border-l-4 ${config.borderColor} ${config.bgColor} rounded-r-lg p-4 relative group`}>
        <div className="flex items-start gap-3">
          <div className="relative">
            <button
              onClick={() => setShowTypeSelector(!showTypeSelector)}
              contentEditable={false}
              className={`${config.iconColor} hover:opacity-80 transition-opacity flex items-center gap-1`}
            >
              <Icon size={20} />
              <FiChevronDown size={12} />
            </button>
            
            {showTypeSelector && (
              <div
                contentEditable={false}
                className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 py-1 min-w-[150px]"
              >
                {Object.entries(alertConfig).map(([type, conf]) => {
                  const TypeIcon = conf.icon;
                  return (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type as AlertType)}
                      className={`w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-700 transition-colors ${
                        type === node.attrs.type ? 'bg-gray-700' : ''
                      }`}
                    >
                      <TypeIcon size={16} className={conf.iconColor} />
                      <span className="text-sm text-gray-300">{conf.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className={`font-semibold mb-1 ${config.iconColor}`}>
              {config.title}
            </div>
            <NodeViewContent className="prose prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0" />
          </div>
          
          <button
            onClick={deleteNode}
            contentEditable={false}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default GitHubAlertView;