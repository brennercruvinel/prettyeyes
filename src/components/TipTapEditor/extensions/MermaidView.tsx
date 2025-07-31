import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiEdit2, FiCheck, FiX, FiCode } from 'react-icons/fi';
import mermaid from 'mermaid';

const MermaidView = ({ node, updateAttributes }: NodeViewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempCode, setTempCode] = useState(node.attrs.code);
  const [error, setError] = useState<string | null>(null);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const id = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#1f2937',
        primaryTextColor: '#fff',
        primaryBorderColor: '#374151',
        lineColor: '#5b21b6',
        secondaryColor: '#4b5563',
        tertiaryColor: '#374151',
        background: '#111827',
        mainBkg: '#1f2937',
        secondBkg: '#374151',
        tertiaryBkg: '#4b5563',
      },
    });
  }, []);

  const renderDiagram = useCallback(async (code: string) => {
    if (!mermaidRef.current) return;

    try {
      setError(null);
      mermaidRef.current.innerHTML = '';
      
      const { svg } = await mermaid.render(id.current, code);
      mermaidRef.current.innerHTML = svg;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to render diagram');
      mermaidRef.current.innerHTML = `<div class="text-red-400 text-sm p-4">Error: ${err instanceof Error ? err.message : 'Failed to render diagram'}</div>`;
    }
  }, []);

  useEffect(() => {
    if (!isEditing && mermaidRef.current) {
      renderDiagram(node.attrs.code);
    }
  }, [node.attrs.code, isEditing, renderDiagram]);

  const handleSave = async () => {
    try {
      setError(null);
      // Validate the diagram before saving
      await mermaid.parse(tempCode);
      updateAttributes({ code: tempCode });
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid Mermaid syntax');
    }
  };

  const handleCancel = () => {
    setTempCode(node.attrs.code);
    setError(null);
    setIsEditing(false);
  };

  const diagramTypes = [
    { name: 'Flowchart', example: 'graph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[OK]\n    B -->|No| D[End]' },
    { name: 'Sequence', example: 'sequenceDiagram\n    Alice->>John: Hello John\n    John-->>Alice: Hi Alice' },
    { name: 'Gantt', example: 'gantt\n    title A Gantt Diagram\n    dateFormat YYYY-MM-DD\n    section Section\n    Task 1 :a1, 2023-01-01, 30d\n    Task 2 :after a1, 20d' },
    { name: 'Class', example: 'classDiagram\n    class Animal\n    Animal : +String name\n    Animal : +move()\n    class Dog\n    Dog : +bark()\n    Animal <|-- Dog' },
    { name: 'State', example: 'stateDiagram-v2\n    [*] --> Still\n    Still --> [*]\n    Still --> Moving\n    Moving --> Still\n    Moving --> Crash\n    Crash --> [*]' },
    { name: 'Pie', example: 'pie title Pets\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15' },
  ];

  return (
    <NodeViewWrapper className="my-4">
      <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <FiCode className="text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Mermaid Diagram</span>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            contentEditable={false}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <FiEdit2 size={16} />
          </button>
        </div>

        {!isEditing ? (
          <div className="p-4">
            <div ref={mermaidRef} className="flex justify-center" />
            {error && (
              <div className="mt-2 text-red-400 text-sm bg-red-900/20 rounded p-2">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4" contentEditable={false}>
            <div className="mb-3">
              <label className="block text-sm text-gray-400 mb-2">Diagram Type Examples:</label>
              <div className="flex flex-wrap gap-2">
                {diagramTypes.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => setTempCode(type.example)}
                    className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded border border-gray-700"
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={tempCode}
              onChange={(e) => setTempCode(e.target.value)}
              className="w-full h-64 px-3 py-2 bg-gray-800 border border-gray-700 rounded font-mono text-sm focus:outline-none focus:border-purple-500"
              placeholder="Enter Mermaid diagram code..."
              spellCheck={false}
            />

            {error && (
              <div className="mt-2 text-red-400 text-sm bg-red-900/20 rounded p-2">
                {error}
              </div>
            )}

            <div className="mt-3 flex justify-between items-center">
              <a
                href="https://mermaid.js.org/syntax/flowchart.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Mermaid Documentation →
              </a>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-1"
                >
                  <FiX size={14} /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-500 rounded flex items-center gap-1"
                >
                  <FiCheck size={14} /> Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default MermaidView;