import { useState, useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
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
  RiFlowChart,
  RiExpandUpDownLine,
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
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  category: string;
}

export default function CommandPaletteNotion({
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
    // Text
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
      description: "Create a simple list",
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
      title: "To-do List",
      description: "Track tasks with checkboxes",
      icon: RiCheckboxLine,
      category: "Basic blocks",
      action: () => {
        editor.chain().focus().toggleBulletList().run();
        editor.chain().focus().toggleTaskList().run();
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
      title: "Code",
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
    // Advanced
    {
      id: "table",
      title: "Table",
      description: "Add a table",
      icon: RiTable2,
      category: "Advanced",
      action: onInsertTable,
    },
    {
      id: "image",
      title: "Image",
      description: "Upload or embed with a link",
      icon: RiImageLine,
      category: "Media",
      action: onInsertImage,
    },
    {
      id: "link",
      title: "Link",
      description: "Add a web link",
      icon: RiLink,
      category: "Media",
      action: onInsertLink,
    },
    // Embeds
    {
      id: "mermaid",
      title: "Mermaid Diagram",
      description: "Create flowcharts and diagrams",
      icon: RiFlowChart,
      category: "Embeds",
      action: onInsertMermaid,
    },
    {
      id: "collapsible",
      title: "Toggle List",
      description: "Hide and show content",
      icon: RiExpandUpDownLine,
      category: "Embeds",
      action: onInsertCollapsible,
    },
    {
      id: "alert",
      title: "Callout",
      description: "Make information stand out",
      icon: RiAlertLine,
      category: "Embeds",
      action: onInsertAlert,
    },
    {
      id: "badge",
      title: "Badge",
      description: "Add status badges",
      icon: RiShieldLine,
      category: "Embeds",
      action: onInsertBadge,
    },
    {
      id: "kbd",
      title: "Keyboard Shortcut",
      description: "Show keyboard keys",
      icon: RiMarkdownLine,
      category: "Embeds",
      action: onInsertKeyboard,
    },
  ];

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(search.toLowerCase()) ||
      command.description.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

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
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
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

  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector('.notion-command-item.selected');
      selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  return (
    <>
      <div className="notion-modal-backdrop" onClick={onClose} />
      <div className="notion-modal notion-command-palette">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a command or search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="notion-command-input"
        />
        
        <div ref={listRef} className="notion-command-list">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-[var(--notion-text-tertiary)]">
              No results found
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, commands]) => (
              <div key={category}>
                <div className="notion-command-category">
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
                      className={`notion-command-item ${isSelected ? 'selected' : ''}`}
                    >
                      <command.icon 
                        size={20} 
                        className="notion-command-item-icon"
                      />
                      <div className="notion-command-item-content">
                        <div className="notion-command-item-title">
                          {command.title}
                        </div>
                        <div className="notion-command-item-description">
                          {command.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}