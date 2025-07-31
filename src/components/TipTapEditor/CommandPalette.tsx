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

  const commands: Command[] = [
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
      id: "table",
      title: "Table",
      description: "Insert a table",
      icon: RiTable2,
      category: "Advanced",
      action: onInsertTable,
    },
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredCommands, selectedIndex, onClose]);

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

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40" 
        onClick={onClose}
      />
      
      {/* Command Palette Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 command-palette">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="command-palette-input"
        />

        <div className="command-palette-list">
          {Object.entries(groupedCommands).map(([category, commands]) => (
            <div key={category}>
              <div className="px-4 py-2 text-sm font-medium text-github-muted border-b border-github-border">
                {category}
              </div>
              {commands.map((command) => {
                const globalIndex = filteredCommands.indexOf(command);
                return (
                  <button
                    key={command.id}
                    onClick={command.action}
                    className={`command-palette-item ${globalIndex === selectedIndex ? "selected" : ""}`}
                  >
                    <command.icon size={20} />
                    <div className="command-palette-item-content">
                      <div className="command-palette-item-title">
                        {command.title}
                      </div>
                      <div className="command-palette-item-description">
                        {command.description}
                      </div>
                    </div>
                    <RiArrowRightLine size={16} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
