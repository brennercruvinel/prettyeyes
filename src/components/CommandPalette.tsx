import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
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
  RiShieldLine,
  RiAlertLine,
  RiSeparator,
  RiEmojiStickerLine,
  RiUserLine,
  RiHashtag,
} from "react-icons/ri";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createListNode } from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { $createCodeNode } from "@lexical/code";
import { $createQuoteNode } from "@lexical/rich-text";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";

interface Command {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  action: () => void;
  keywords: string[];
}

export default function CommandPalette() {
  const [editor] = useLexicalComposerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const commands: Command[] = [
    {
      id: "heading1",
      name: "Título 1",
      description: "Inserir título principal",
      icon: RiH1,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h1"));
          }
        });
      },
      keywords: ["h1", "heading", "titulo", "principal"],
    },
    {
      id: "heading2",
      name: "Título 2",
      description: "Inserir subtítulo",
      icon: RiH2,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h2"));
          }
        });
      },
      keywords: ["h2", "heading", "subtitulo"],
    },
    {
      id: "heading3",
      name: "Título 3",
      description: "Inserir título de seção",
      icon: RiH3,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode("h3"));
          }
        });
      },
      keywords: ["h3", "heading", "secao"],
    },
    {
      id: "bullet-list",
      name: "Lista com marcadores",
      description: "Criar lista não ordenada",
      icon: RiListUnordered,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createListNode("bullet"));
          }
        });
      },
      keywords: ["lista", "bullet", "marcadores", "ul"],
    },
    {
      id: "numbered-list",
      name: "Lista numerada",
      description: "Criar lista ordenada",
      icon: RiListOrdered,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createListNode("number"));
          }
        });
      },
      keywords: ["lista", "numerada", "ordered", "ol"],
    },
    {
      id: "check-list",
      name: "Lista de tarefas",
      description: "Criar lista com checkboxes",
      icon: RiCheckboxLine,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createListNode("check"));
          }
        });
      },
      keywords: ["lista", "tarefas", "checkbox", "todo"],
    },
    {
      id: "quote",
      name: "Citação",
      description: "Inserir bloco de citação",
      icon: RiDoubleQuotesL,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createQuoteNode());
          }
        });
      },
      keywords: ["citacao", "quote", "blockquote"],
    },
    {
      id: "code-block",
      name: "Bloco de código",
      description: "Inserir bloco de código",
      icon: RiCodeBoxLine,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createCodeNode());
          }
        });
      },
      keywords: ["codigo", "code", "block", "programa"],
    },
    {
      id: "horizontal-rule",
      name: "Linha horizontal",
      description: "Inserir separador",
      icon: RiSeparator,
      action: () => {
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
      },
      keywords: ["linha", "separador", "hr", "divisor"],
    },
    {
      id: "table",
      name: "Tabela",
      description: "Inserir tabela",
      icon: RiTable2,
      action: () => {
        // This will trigger the table modal
        const event = new CustomEvent("open-table-modal");
        window.dispatchEvent(event);
      },
      keywords: ["tabela", "table", "grid"],
    },
    {
      id: "image",
      name: "Imagem",
      description: "Inserir imagem",
      icon: RiImageLine,
      action: () => {
        const event = new CustomEvent("open-image-modal");
        window.dispatchEvent(event);
      },
      keywords: ["imagem", "image", "foto", "picture"],
    },
    {
      id: "link",
      name: "Link",
      description: "Inserir link",
      icon: RiLink,
      action: () => {
        const event = new CustomEvent("open-link-modal");
        window.dispatchEvent(event);
      },
      keywords: ["link", "url", "hyperlink"],
    },
    {
      id: "badge",
      name: "Badge",
      description: "Inserir badge do GitHub",
      icon: RiShieldLine,
      action: () => {
        const event = new CustomEvent("open-badge-modal");
        window.dispatchEvent(event);
      },
      keywords: ["badge", "shield", "emblema"],
    },
    {
      id: "alert",
      name: "Alerta",
      description: "Inserir alerta do GitHub",
      icon: RiAlertLine,
      action: () => {
        const event = new CustomEvent("open-alert-modal");
        window.dispatchEvent(event);
      },
      keywords: ["alerta", "alert", "aviso", "nota"],
    },
    {
      id: "emoji",
      name: "Emoji",
      description: "Inserir emoji",
      icon: RiEmojiStickerLine,
      action: () => {
        const event = new CustomEvent("open-emoji-picker");
        window.dispatchEvent(event);
      },
      keywords: ["emoji", "emoticon", "smiley"],
    },
    {
      id: "mention",
      name: "Mencionar usuário",
      description: "Mencionar @usuário",
      icon: RiUserLine,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertText("@");
          }
        });
      },
      keywords: ["mention", "user", "usuario", "@"],
    },
    {
      id: "issue",
      name: "Referenciar issue",
      description: "Referenciar #issue",
      icon: RiHashtag,
      action: () => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertText("#");
          }
        });
      },
      keywords: ["issue", "number", "numero", "#"],
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.name.toLowerCase().includes(searchLower) ||
      cmd.description.toLowerCase().includes(searchLower) ||
      cmd.keywords.some((k) => k.toLowerCase().includes(searchLower))
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          // Check if we're at the start of a line or after a space
          const textBefore =
            range.startContainer.textContent?.slice(0, range.startOffset) || "";
          if (
            textBefore === "" ||
            textBefore.endsWith(" ") ||
            textBefore.endsWith("\n")
          ) {
            e.preventDefault();
            setPosition({
              top: rect.bottom + window.scrollY + 5,
              left: rect.left + window.scrollX,
            });
            setIsOpen(true);
            setSearch("");
            setSelectedIndex(0);
          }
        }
      } else if (isOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsOpen(false);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, search, selectedIndex, filteredCommands]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed z-50 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl w-96 max-h-96 overflow-hidden"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="p-3 border-b border-[#30363d]">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(0);
          }}
          placeholder="Digite para buscar comandos..."
          className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
        />
      </div>

      <div className="overflow-y-auto max-h-80">
        {filteredCommands.length === 0 ? (
          <div className="p-4 text-center text-[#8b949e]">
            Nenhum comando encontrado
          </div>
        ) : (
          filteredCommands.map((cmd, index) => (
            <button
              key={cmd.id}
              onClick={() => {
                cmd.action();
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-[#161b22] transition-colors ${
                index === selectedIndex ? "bg-[#161b22]" : ""
              }`}
            >
              <cmd.icon size={20} />
              <div className="text-left flex-1">
                <div className="text-[#c9d1d9] font-medium">{cmd.name}</div>
                <div className="text-[#8b949e] text-sm">{cmd.description}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>,
    document.body,
  );
}
