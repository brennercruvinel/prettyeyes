import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Gapcursor from "@tiptap/extension-gapcursor";
import { SimpleDragDrop } from "./extensions/SimpleDragDrop";
import { PreventAutoScroll } from "./extensions/PreventAutoScroll";
import { useState, useEffect } from "react";
import CommandPalette from "./CommandPalette";
import CustomBubbleMenu from "./CustomBubbleMenu";
import Toolbar from "./Toolbar";
import ImageModal from "./modals/ImageModal";
import LinkModal from "./modals/LinkModal";
import TableModal from "./modals/TableModalNew";
import BadgeModal from "./modals/BadgeModal";
import MermaidModal from "./modals/MermaidModal";
import AlertModal from "./modals/AlertModal";
import CollapsibleModal from "./modals/CollapsibleModal";
import KeyboardModal from "./modals/KeyboardModal";
import TemplateSelector from "./TemplateSelector";
import TableMenu from "./TableMenu";
import DOMPurify from "dompurify";
import {
  configureMarked,
  createTurndownService,
  isHTML,
} from "./markdownConfig";
import { marked } from "marked";

configureMarked();
const turndownService = createTurndownService();

interface TipTapEditorProps {
  content?: string;
  htmlContent?: string;
  onChange?: (htmlContent: string) => void;
  onMarkdownChange?: (markdownContent: string) => void;
}


const processHTMLContent = (html: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const textContent = tempDiv.textContent || "";

  const markdownPatterns = [
    /!\[[^\]]*\]\([^)]+\)/,
    /\[[^\]]+\]\([^)]+\)/,
    /\*\*[^*]+\*\*/,
    /#{1,6}\s/,
    /```[\s\S]*?```/,
    /^\s*[-*+]\s/m,
    /^\s*>/m,
  ];

  const hasMarkdownSyntax = markdownPatterns.some((pattern) =>
    pattern.test(textContent),
  );

  if (hasMarkdownSyntax) {
    return processMarkdownToHTML(textContent);
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "ul",
      "ol",
      "li",
      "blockquote",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
      "strike",
      "code",
      "pre",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "div",
      "span",
      "input", // Para checkboxes
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "id",
      "target",
      "rel",
      "type",
      "checked",
      "disabled",
    ],
    ALLOW_DATA_ATTR: true,
  });
}

const processMarkdownToHTML = (markdown: string): string => {
  try {
    let processedMarkdown = markdown;

    processedMarkdown = processedMarkdown.replace(
      /<div\s+align=["']center["']>/gi,
      '<div style="text-align: center;">',
    );

    const lines = processedMarkdown.split("\n");
    const processedLines = lines.map((line) => {
      const imageMatches = line.match(/!\[[^\]]*\]\([^)]+\)/g);
      if (imageMatches && imageMatches.length > 1) {
        const hasBadges = imageMatches.some(
          (img) =>
            img.includes("shields.io") ||
            img.includes("badge") ||
            img.includes("style=for-the-badge"),
        );
        if (hasBadges) {
          return `<p class="badge-container">${line}</p>`;
        }
      }
      return line;
    });
    processedMarkdown = processedLines.join("\n");

    const html = marked(processedMarkdown) as string;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Processar badges para garantir que fiquem inline
    tempDiv.querySelectorAll("p.badge-container").forEach((p) => {
      (p as HTMLElement).style.whiteSpace = "nowrap";
      (p as HTMLElement).style.overflowX = "auto";
    });

    // Garantir que imagens (especialmente badges) fiquem inline
    tempDiv.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";

      // Se é um badge (shields.io ou tem "badge" no alt/src)
      if (
        src.includes("shields.io") ||
        src.includes("badge") ||
        alt.toLowerCase().includes("badge")
      ) {
        img.style.display = "inline-block";
        img.style.verticalAlign = "middle";
        img.style.margin = "0 4px";
        // Garantir que o pai não quebre a linha
        const parent = img.parentElement;
        if (parent && parent.tagName === "P") {
          parent.style.whiteSpace = "nowrap";
          parent.style.overflowX = "auto";
        }
      }
    });

    // Processar divs com align center
    tempDiv
      .querySelectorAll('div[style*="text-align: center"]')
      .forEach((div) => {
        (div as HTMLElement).style.textAlign = "center";
        (div as HTMLElement).style.margin = "1em 0";
      });

    // Processar links para abrir em nova aba se externos
    tempDiv.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("http")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });

    // Processar blocos de código
    tempDiv.querySelectorAll("pre").forEach((pre) => {
      pre.style.backgroundColor = "#161b22";
      pre.style.padding = "16px";
      pre.style.borderRadius = "6px";
      pre.style.overflow = "auto";
    });

    const processedHtml = tempDiv.innerHTML;

    return DOMPurify.sanitize(processedHtml, {
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "br",
        "hr",
        "ul",
        "ol",
        "li",
        "blockquote",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "s",
        "del",
        "strike",
        "code",
        "pre",
        "a",
        "img",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "div",
        "span",
        "input", // Para checkboxes
        "kbd",
        "sup",
        "sub", // Tags adicionais do GitHub
      ],
      ALLOWED_ATTR: [
        "href",
        "src",
        "alt",
        "title",
        "class",
        "id",
        "target",
        "rel",
        "type",
        "checked",
        "disabled",
        "data-language",
        "style",
        "align",
      ],
      ALLOW_DATA_ATTR: true,
    });
  } catch {
    return markdown; // Retorna o markdown original em caso de erro
  }
}

export default function TipTapEditor({
  content = "",
  htmlContent,
  onChange,
  onMarkdownChange,
}: TipTapEditorProps) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showMermaidModal, setShowMermaidModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCollapsibleModal, setShowCollapsibleModal] = useState(false);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);

  const editor = useEditor({
    autofocus: false,
    extensions: [
      StarterKit.configure({
        gapcursor: false, // Desabilitar gapcursor do StarterKit
        // codeBlock: false, // Vamos usar CodeBlockLowlight ao invés
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-disc list-outside ml-4",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-decimal list-outside ml-4",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "ml-2",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-600 pl-4 italic",
          },
        },
        code: {
          HTMLAttributes: {
            class: "bg-gray-800 px-1 py-0.5 rounded text-sm font-mono",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "my-2",
          },
        },
        hardBreak: {
          keepMarks: true,
        },
      }),
      // CodeBlockLowlight.configure({
      //   lowlight,
      //   HTMLAttributes: {
      //     class: "bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto",
      //     spellcheck: "false",
      //   },
      //   languageClassPrefix: "language-",
      //   defaultLanguage: "plaintext",
      // }),
      TaskList.configure({
        HTMLAttributes: {
          class: "list-none pl-0",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start mb-2",
        },
      }),
      Table.configure({
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 100,
        HTMLAttributes: {
          class: "tiptap-table",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "tiptap-table-row",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "tiptap-table-header",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "tiptap-table-cell",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "text-blue-400 hover:text-blue-300 underline cursor-pointer",
        },
        validate: href => /^https?:\/\//.test(href),
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "inline",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color.configure({ types: [TextStyle.name] }),
      TextStyle,
      Placeholder.configure({
        placeholder: "Start writing your README...",
        emptyEditorClass: "is-editor-empty",
      }),
      Typography,
      Gapcursor,
      SimpleDragDrop,
      PreventAutoScroll,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const markdown = turndownService.turndown(html);
      onChange?.(html);
      onMarkdownChange?.(markdown);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[500px] p-8",
        spellcheck: "false",
      },
      scrollThreshold: 0,
      scrollMargin: 0,
      handlePaste: (_view, event) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        event.preventDefault();

        // Obter dados do clipboard
        const htmlData = clipboardData.getData("text/html");
        const textData = clipboardData.getData("text/plain");

        // Priorizar texto puro quando colando de fontes como GitHub
        // GitHub coloca HTML no clipboard mas queremos processar como Markdown
        if (textData) {
          // Sempre tentar processar como Markdown primeiro
          // pois é mais comum colar Markdown do que HTML puro
          const cleanHTML = processMarkdownToHTML(textData);

          editor
            .chain()
            .focus()
            .insertContent(cleanHTML, {
              parseOptions: {
                preserveWhitespace: "full",
              },
            })
            .run();

          return true;
        }

        // Se não tem texto, tentar HTML
        if (htmlData) {
          const processedHtml = processHTMLContent(htmlData);

          editor
            .chain()
            .focus()
            .insertContent(processedHtml, {
              parseOptions: {
                preserveWhitespace: "full",
              },
            })
            .run();

          return true;
        }

        return false;
      },
    },
  });

  // Processar conteúdo inicial apenas na primeira vez
  useEffect(() => {
    if (content && editor && !editor.isDestroyed) {
      // Detectar se é HTML ou Markdown
      if (isHTML(content)) {
        // É HTML, processar e inserir
        const processedHtml = processHTMLContent(content);
        editor.commands.setContent(processedHtml);
      } else {
        // Assumir que é Markdown
        const cleanHTML = processMarkdownToHTML(content);
        editor.commands.setContent(cleanHTML);
      }
    }
  }, [content, editor]);

  // Manter o conteúdo HTML quando voltar do modo markdown
  useEffect(() => {
    if (htmlContent && editor && !editor.isDestroyed && !content) {
      editor.commands.setContent(htmlContent);
    }
  }, [htmlContent, editor, content]);

  // Handle command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key, 'metaKey:', e.metaKey, 'ctrlKey:', e.ctrlKey);
      
      // Abrir com / ou Cmd+K/Ctrl+K
      console.log('Editor exists:', !!editor, 'Is focused:', editor?.isFocused);
      
      if (editor) {
        console.log('Editor is focused:', editor.isFocused);
        
        if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
          const { $from } = editor.state.selection;
          const textBefore = $from.nodeBefore?.textContent || "";

          // Só abrir command palette se não estiver no meio de um texto
          if (!textBefore || textBefore.endsWith(" ") || textBefore === "") {
            e.preventDefault();
            console.log('Opening command palette with /');
            setShowCommandPalette(true);
          }
        }
      }
      
      // Sempre permitir Cmd/Ctrl+K, mesmo sem foco
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        console.log('Opening command palette with Cmd/Ctrl+K');
        setShowCommandPalette(true);
      }

      if (e.key === "Escape") {
        console.log('Closing command palette');
        setShowCommandPalette(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [editor]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-github-muted">Loading editor...</div>
      </div>
    );
  }

  const insertAlert = () => {
    setShowAlertModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertAlert = (type: string, content: string) => {
    // editor.commands.setGitHubAlert({ type: type as any, content });
    const alertColors: Record<string, string> = {
      note: "#0969da",
      tip: "#1a7f37",
      important: "#8250df",
      warning: "#9a6700",
      caution: "#d1242f"
    };
    
    const alertHTML = `
      <blockquote class="github-alert github-alert-${type}" style="border-left: 4px solid ${alertColors[type]}; padding: 16px; margin: 16px 0; border-radius: 6px; background-color: ${alertColors[type]}1a;">
        <p><strong>[!${type.toUpperCase()}]</strong></p>
        <p>${content}</p>
      </blockquote>
    `;
    
    editor.chain().focus().insertContent(alertHTML).run();
  };

  const insertTable = () => {
    setShowTableModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertTable = (rows: number, cols: number) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
  };

  const insertImage = () => {
    setShowImageModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertImage = (url: string, alt?: string) => {
    editor.chain().focus().setImage({ src: url, alt }).run();
  };

  const insertLink = () => {
    setShowLinkModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertLink = (url: string, text?: string) => {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, "");

    if (selectedText) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}">${text || url}</a>`)
        .run();
    }
  };

  const insertBadge = () => {
    setShowBadgeModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertBadge = (label: string, message: string, color: string, style?: string) => {
    // (editor.commands as any).setBadge({ label, message, color, style: style || 'flat' });
    const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}${style ? `?style=${style}` : ''}`;
    editor.chain().focus().setImage({ src: badgeUrl, alt: `${label} ${message}` }).run();
  };

  const insertMermaid = () => {
    setShowMermaidModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertMermaid = (code: string) => {
    // editor.commands.setMermaidBlock({ code });
    const mermaidHTML = `<pre><code class="language-mermaid">${code}</code></pre>`;
    editor.chain().focus().insertContent(mermaidHTML).run();
  };

  const insertCollapsible = () => {
    setShowCollapsibleModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertCollapsible = (summary: string, content: string, defaultOpen: boolean) => {
    // editor.commands.setCollapsibleSection({ summary, content, defaultOpen });
    const collapsibleHTML = `<details${defaultOpen ? ' open' : ''}>
<summary>${summary}</summary>

${content}

</details>`;
    editor.chain().focus().insertContent(collapsibleHTML).run();
  };

  const insertKeyboard = () => {
    setShowKeyboardModal(true);
    setShowCommandPalette(false);
  };

  const handleInsertKeyboard = (keys: string[]) => {
    const kbdHTML = keys.map(key => `<kbd>${key}</kbd>`).join('+');
    editor.chain().focus().insertContent(kbdHTML).run();
  };

  const handleUseTemplate = (templateContent: string) => {
    const htmlContent = processMarkdownToHTML(templateContent);
    editor.commands.setContent(htmlContent);
  };

  return (
    <div className="relative w-full h-full bg-github-bg flex flex-col">
      {/* Fixed Toolbar at top */}
      <div className="border-b border-github-border bg-github-surface sticky top-0 z-50">
        <Toolbar editor={editor} />
      </div>
      
      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">

      {/* Custom Bubble Menu */}
      <CustomBubbleMenu
        editor={editor}
        insertLink={insertLink}
        onOpenCommandPalette={() => setShowCommandPalette(true)}
      />

        {/* Main Editor */}
        <div className="max-w-4xl mx-auto relative">
          <EditorContent editor={editor} />
          
          {/* Table Menu - appears when cursor is in a table */}
          <TableMenu editor={editor} />
        </div>
      </div>

      {/* Command Palette - Renderizado fora da estrutura principal */}
      {showCommandPalette && (
        <CommandPalette
          editor={editor}
          onClose={() => setShowCommandPalette(false)}
          onInsertAlert={insertAlert}
          onInsertTable={insertTable}
          onInsertImage={insertImage}
          onInsertLink={insertLink}
          onInsertBadge={insertBadge}
          onInsertMermaid={insertMermaid}
          onInsertCollapsible={insertCollapsible}
          onInsertKeyboard={insertKeyboard}
        />
      )}

      {/* Image Modal */}
      <ImageModal
        opened={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleInsertImage}
      />

      {/* Link Modal */}
      <LinkModal
        opened={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onInsert={handleInsertLink}
        selectedText={editor.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to,
          ""
        )}
      />

      {/* Table Modal */}
      <TableModal
        opened={showTableModal}
        onClose={() => setShowTableModal(false)}
        onInsert={handleInsertTable}
      />

      {/* Template Selector */}
      {showTemplates && (
        <TemplateSelector
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={handleUseTemplate}
        />
      )}

      {/* Badge Modal */}
      <BadgeModal
        opened={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        onInsert={handleInsertBadge}
      />

      {/* Mermaid Modal */}
      {showMermaidModal && (
        <MermaidModal
          onClose={() => setShowMermaidModal(false)}
          onInsert={handleInsertMermaid}
        />
      )}

      {/* Alert Modal */}
      {showAlertModal && (
        <AlertModal
          onClose={() => setShowAlertModal(false)}
          onInsert={handleInsertAlert}
        />
      )}

      {/* Collapsible Modal */}
      {showCollapsibleModal && (
        <CollapsibleModal
          onClose={() => setShowCollapsibleModal(false)}
          onInsert={handleInsertCollapsible}
        />
      )}

      {/* Keyboard Modal */}
      {showKeyboardModal && (
        <KeyboardModal
          onClose={() => setShowKeyboardModal(false)}
          onInsert={handleInsertKeyboard}
          selectedText={editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ""
          )}
        />
      )}
    </div>
  );
}
