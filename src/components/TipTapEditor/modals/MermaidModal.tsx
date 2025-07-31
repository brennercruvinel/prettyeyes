import { useState } from 'react';
import { FiX, FiActivity } from 'react-icons/fi';

interface MermaidModalProps {
  onClose: () => void;
  onInsert: (code: string) => void;
}

const mermaidTemplates = {
  flowchart: `graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]`,
  sequence: `sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!`,
  gantt: `gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d`,
  pie: `pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15`,
  classDiagram: `classDiagram
    Class01 <|-- AveryLongClass : Cool
    Class03 *-- Class04
    Class05 o-- Class06
    Class07 .. Class08
    Class09 --> C2 : Where am i?
    Class09 --* C3
    Class09 --|> Class07
    Class07 : equals()
    Class07 : Object[] elementData
    Class01 : size()
    Class01 : int chimp
    Class01 : int gorilla
    Class08 <--> C2: Cool label`,
  stateDiagram: `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`,
};

export default function MermaidModal({ onClose, onInsert }: MermaidModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof mermaidTemplates>('flowchart');
  const [code, setCode] = useState(mermaidTemplates.flowchart);

  const handleTemplateChange = (template: keyof typeof mermaidTemplates) => {
    setSelectedTemplate(template);
    setCode(mermaidTemplates[template]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onInsert(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="bg-github-surface border border-github-border rounded-lg w-full max-w-3xl max-h-[90vh] relative z-10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-github-border">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiActivity /> Insert Mermaid Diagram
          </h3>
          <button
            onClick={onClose}
            className="text-github-muted hover:text-github-text"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div>
              <label className="block text-sm text-github-text mb-2">Diagram Type</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(mermaidTemplates).map(([key]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTemplateChange(key as keyof typeof mermaidTemplates)}
                    className={`px-3 py-2 text-sm rounded border transition-all ${
                      selectedTemplate === key
                        ? 'border-github-accent bg-github-bg text-github-accent'
                        : 'border-github-border hover:border-github-muted'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-github-text mb-1">Diagram Code</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 bg-github-bg border border-github-border rounded focus:outline-none focus:border-github-accent font-mono text-sm"
                placeholder="Enter your Mermaid diagram code..."
                required
              />
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600/50 rounded p-3">
              <p className="text-sm text-yellow-300">
                <strong>Tip:</strong> Mermaid diagrams will be rendered when you preview your document. 
                You can edit the diagram code anytime by selecting it and pressing Delete, then inserting a new one.
              </p>
            </div>

            <div className="bg-github-bg rounded p-3">
              <p className="text-xs text-github-muted mb-1">Common Syntax:</p>
              <ul className="text-xs text-github-muted space-y-1">
                <li>• Flowchart: <code>{`A[Square] --> B(Round)`}</code></li>
                <li>• Sequence: <code>{`Alice->>Bob: Message`}</code></li>
                <li>• Class: <code>{`Class01 <|-- Class02`}</code></li>
                <li>• State: <code>{`[*] --> State1`}</code></li>
                <li>• Gantt: <code>Task :a1, 2024-01-01, 30d</code></li>
              </ul>
            </div>
          </div>

          <div className="p-4 border-t border-github-border flex justify-end gap-2">
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
              Insert Diagram
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}