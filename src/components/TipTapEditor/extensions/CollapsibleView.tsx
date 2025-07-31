import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiEdit2, FiCheck, FiX } from 'react-icons/fi';

const CollapsibleView = ({ node, updateAttributes }: NodeViewProps) => {
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [tempSummary, setTempSummary] = useState(node.attrs.summary);

  const handleSaveSummary = () => {
    updateAttributes({ summary: tempSummary });
    setIsEditingSummary(false);
  };

  const handleCancelEdit = () => {
    setTempSummary(node.attrs.summary);
    setIsEditingSummary(false);
  };

  const toggleOpen = () => {
    updateAttributes({ open: !node.attrs.open });
  };

  return (
    <NodeViewWrapper className="my-3">
      <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2 flex-1" onClick={toggleOpen}>
            {node.attrs.open ? (
              <FiChevronDown className="text-gray-400" size={16} />
            ) : (
              <FiChevronRight className="text-gray-400" size={16} />
            )}
            
            {!isEditingSummary ? (
              <span className="text-sm font-medium text-gray-300">
                {node.attrs.summary}
              </span>
            ) : (
              <div className="flex items-center gap-2 flex-1" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={tempSummary}
                  onChange={(e) => setTempSummary(e.target.value)}
                  className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:border-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveSummary();
                    } else if (e.key === 'Escape') {
                      handleCancelEdit();
                    }
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSaveSummary}
                  className="text-green-400 hover:text-green-300"
                >
                  <FiCheck size={16} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-400 hover:text-red-300"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>
          
          {!isEditingSummary && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingSummary(true);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-200"
              contentEditable={false}
            >
              <FiEdit2 size={14} />
            </button>
          )}
        </div>
        
        {node.attrs.open && (
          <div className="px-4 py-3 border-t border-gray-700">
            <NodeViewContent className="prose prose-invert max-w-none" />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default CollapsibleView;