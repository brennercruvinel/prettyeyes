import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';

const BadgeView = ({ node, updateAttributes }: NodeViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAttrs, setTempAttrs] = useState(node.attrs);
  const editRef = useRef<HTMLDivElement>(null);

  const colors = [
    { name: 'blue', value: 'blue' },
    { name: 'green', value: 'green' },
    { name: 'yellow', value: 'yellow' },
    { name: 'red', value: 'red' },
    { name: 'purple', value: 'purple' },
    { name: 'pink', value: 'pink' },
    { name: 'indigo', value: 'indigo' },
    { name: 'gray', value: 'gray' },
    { name: 'black', value: 'black' },
  ];

  const styles = [
    { name: 'Flat', value: 'flat' },
    { name: 'Flat Square', value: 'flat-square' },
    { name: 'Plastic', value: 'plastic' },
    { name: 'For The Badge', value: 'for-the-badge' },
  ];

  const commonLogos = [
    { name: 'None', value: '' },
    { name: 'JavaScript', value: 'javascript' },
    { name: 'TypeScript', value: 'typescript' },
    { name: 'React', value: 'react' },
    { name: 'Node.js', value: 'node.js' },
    { name: 'Python', value: 'python' },
    { name: 'GitHub', value: 'github' },
    { name: 'npm', value: 'npm' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setIsEditing(false);
        setTempAttrs(node.attrs);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, node.attrs]);

  const handleSave = () => {
    updateAttributes(tempAttrs);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempAttrs(node.attrs);
    setIsEditing(false);
  };

  const getBadgeUrl = (attrs: typeof node.attrs) => {
    const params = new URLSearchParams();
    if (attrs.style && attrs.style !== 'flat') params.append('style', attrs.style);
    if (attrs.logo) params.append('logo', attrs.logo);
    if (attrs.logoColor) params.append('logoColor', attrs.logoColor);
    
    const queryString = params.toString();
    return `https://img.shields.io/badge/${encodeURIComponent(attrs.label)}-${encodeURIComponent(attrs.message)}-${attrs.color}${queryString ? '?' + queryString : ''}`;
  };

  return (
    <NodeViewWrapper className="inline-block">
      {!isEditing ? (
        <span className="inline-block group relative">
          <img 
            src={getBadgeUrl(node.attrs)} 
            alt={`${node.attrs.label}: ${node.attrs.message}`}
            className="inline-block align-middle"
          />
          <button
            onClick={() => setIsEditing(true)}
            className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 p-1 rounded shadow-lg"
            contentEditable={false}
          >
            <FiEdit2 size={12} className="text-gray-300" />
          </button>
        </span>
      ) : (
        <div 
          ref={editRef}
          className="inline-block bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl"
          contentEditable={false}
        >
          <div className="space-y-2 w-64">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Label</label>
              <input
                type="text"
                value={tempAttrs.label}
                onChange={(e) => setTempAttrs({ ...tempAttrs, label: e.target.value })}
                className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Message</label>
              <input
                type="text"
                value={tempAttrs.message}
                onChange={(e) => setTempAttrs({ ...tempAttrs, message: e.target.value })}
                className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Color</label>
                <select
                  value={tempAttrs.color}
                  onChange={(e) => setTempAttrs({ ...tempAttrs, color: e.target.value })}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
                >
                  {colors.map(color => (
                    <option key={color.value} value={color.value}>{color.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Style</label>
                <select
                  value={tempAttrs.style}
                  onChange={(e) => setTempAttrs({ ...tempAttrs, style: e.target.value })}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
                >
                  {styles.map(style => (
                    <option key={style.value} value={style.value}>{style.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">Logo</label>
              <select
                value={tempAttrs.logo || ''}
                onChange={(e) => setTempAttrs({ ...tempAttrs, logo: e.target.value || null })}
                className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm"
              >
                {commonLogos.map(logo => (
                  <option key={logo.value} value={logo.value}>{logo.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-2">
              <label className="block text-xs text-gray-400 mb-1">Preview</label>
              <div className="bg-gray-800 p-2 rounded text-center">
                <img 
                  src={getBadgeUrl(tempAttrs)} 
                  alt="Badge preview"
                  className="inline-block"
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-1"
              >
                <FiX size={14} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded flex items-center gap-1"
              >
                <FiCheck size={14} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default BadgeView;