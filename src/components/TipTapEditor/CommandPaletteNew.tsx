import { useState, useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import Portal from "./Portal";
import {
  RiH1,
  RiH2,
  RiH3,
  RiListUnordered,
  RiListOrdered,
  RiCheckboxLine,
  RiDoubleQuotesL,
  RiCodeBoxLine,
  RiTable2,
  RiImageLine,
  RiLink,
  RiSeparator,
  RiAlertLine,
  RiShieldLine,
  RiArrowRightLine,
  RiFlowChart,
  RiExpandUpDownLine,
  RiCheckDoubleLine,
  RiMarkdownLine,
} from "react-icons/ri";

interface CommandPaletteProps {
  editor: Editor;
  onClose: () => void;
  onInsertAlert: () => void;
  onInsertTable: () => void;
  onInsertImage: () => void;
  onInsertLink: () => void;
  onInsertBadge: () => void;
  onInsertMermaid: () => void;
  onInsertCollapsible: () => void;
  onInsertKeyboard: () => void;
}

interface Command {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  action: () => void;
  category: string;
}

export default function CommandPalette({
  editor,
  onClose,
  onInsertAlert,
  onInsertTable,
  onInsertImage,
  onInsertLink,
  onInsertBadge,
  onInsertMermaid,
  onInsertCollapsible,
  onInsertKeyboard,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    // Basic blocks
    {
      id: "h1",
      title: "Heading 1",
      description: "Big section heading",
      icon: RiH1,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        onClose();
      },
    },
    {
      id: "h2",
      title: "Heading 2",
      description: "Medium section heading",
      icon: RiH2,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        onClose();
      },
    },
    {
      id: "h3",
      title: "Heading 3",
      description: "Small section heading",
      icon: RiH3,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        onClose();
      },
    },
    {
      id: "bullet-list",
      title: "Bullet List",
      description: "Create a simple bullet list",
      icon: RiListUnordered,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleBulletList().run();
        onClose();
      },
    },
    {
      id: "numbered-list",
      title: "Numbered List",
      description: "Create a numbered list",
      icon: RiListOrdered,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleOrderedList().run();
        onClose();
      },
    },
    {
      id: "task-list",
      title: "Task List",
      description: "Track tasks with checkboxes",
      icon: RiCheckboxLine,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleBulletList().run();
        editor.chain().focus().toggleTaskItem({ checked: false }).run();
        onClose();
      },
    },
    {
      id: "quote",
      title: "Quote",
      description: "Capture a quote",
      icon: RiDoubleQuotesL,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleBlockquote().run();
        onClose();
      },
    },
    {
      id: "code-block",
      title: "Code Block",
      description: "Display code with syntax highlighting",
      icon: RiCodeBoxLine,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleCodeBlock().run();
        onClose();
      },
    },
    {
      id: "divider",
      title: "Divider",
      description: "Visually divide blocks",
      icon: RiSeparator,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().setHorizontalRule().run();
        onClose();
      },
    },
    {
      id: "strike",
      title: "Strikethrough",
      description: "Strike through selected text",
      icon: RiCheckDoubleLine,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleStrike().run();
        onClose();
      },
    },
    {
      id: "inline-code",
      title: "Inline Code",
      description: "Format as inline code",
      icon: RiCodeBoxLine,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleCode().run();
        onClose();
      },
    },
    // Advanced
    {
      id: "table",
      title: "Table",
      description: "Insert a table",
      icon: RiTable2,
      category: "Advanced",
      action: onInsertTable,
    },
    {
      id: "mermaid",
      title: "Mermaid Diagram",
      description: "Insert flowchart, sequence diagram, etc.",
      icon: RiFlowChart,
      category: "Advanced",
      action: onInsertMermaid,
    },
    {
      id: "collapsible",
      title: "Collapsible Section",
      description: "Create expandable content section",
      icon: RiExpandUpDownLine,
      category: "Advanced",
      action: onInsertCollapsible,
    },
    // Media
    {
      id: "image",
      title: "Image",
      description: "Upload or embed with link",
      icon: RiImageLine,
      category: "Media",
      action: onInsertImage,
    },
    {
      id: "link",
      title: "Link",
      description: "Add a link",
      icon: RiLink,
      category: "Media",
      action: onInsertLink,
    },
    // GitHub
    {
      id: "alert",
      title: "GitHub Alert",
      description: "Create styled alert boxes",
      icon: RiAlertLine,
      category: "GitHub",
      action: onInsertAlert,
    },
    {
      id: "badge",
      title: "Badge",
      description: "Create custom badge",
      icon: RiShieldLine,
      category: "GitHub",
      action: onInsertBadge,
    },
    {
      id: "kbd",
      title: "Keyboard Key",
      description: "Insert keyboard shortcut",
      icon: RiMarkdownLine,
      category: "GitHub",
      action: onInsertKeyboard,
    },
  ];

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(search.toLowerCase()) ||
      command.description.toLowerCase().includes(search.toLowerCase()) ||
      command.category.toLowerCase().includes(search.toLowerCase()),
  );

  const groupedCommands = filteredCommands.reduce(
    (acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = [];
      }
      acc[command.category].push(command);
      return acc;
    },
    {} as Record<string, Command[]>,
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredCommands.length - 1),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredCommands, selectedIndex, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector('.command-item-selected');
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  return (
    <Portal>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{ zIndex: 9998 }}
      />
      
      {/* Command Palette */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] max-h-[70vh] bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{ zIndex: 9999 }}
      >
        {/* Search Input */}
        <div className="border-b border-[#30363d]">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-4 bg-transparent text-[#c9d1d9] placeholder-[#8b949e] outline-none text-base"
          />
        </div>

        {/* Command List */}
        <div ref={listRef} className="flex-1 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-5 py-8 text-center text-[#8b949e]">
              No commands found
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, commands]) => (
              <div key={category}>
                <div className="px-5 py-2 text-xs font-semibold text-[#8b949e] uppercase tracking-wider">
                  {category}
                </div>
                {commands.map((command) => {
                  const globalIndex = filteredCommands.indexOf(command);
                  const isSelected = globalIndex === selectedIndex;
                  return (
                    <button
                      key={command.id}
                      onClick={command.action}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`
                        w-full px-5 py-3 flex items-center gap-3 hover:bg-[#30363d] transition-colors
                        ${isSelected ? 'bg-[#1f6feb] command-item-selected' : ''}
                      `}
                    >
                      <command.icon 
                        size={20} 
                        className={isSelected ? 'text-white' : 'text-[#8b949e]'} 
                      />
                      <div className="flex-1 text-left">
                        <div className={`font-medium ${isSelected ? 'text-white' : 'text-[#c9d1d9]'}`}>
                          {command.title}
                        </div>
                        <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-[#8b949e]'}`}>
                          {command.description}
                        </div>
                      </div>
                      <RiArrowRightLine 
                        size={16} 
                        className={isSelected ? 'text-white' : 'text-[#8b949e]'} 
                      />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </Portal>
  );
}