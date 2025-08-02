import { useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiCodeLine,
  RiCommandLine,
} from "react-icons/ri";
import { FiLink } from "react-icons/fi";

interface CustomBubbleMenuProps {
  editor: Editor;
  insertLink?: () => void;
  onOpenCommandPalette?: () => void;
}

export default function CustomBubbleMenu({
  editor,
  onOpenCommandPalette,
}: CustomBubbleMenuProps) {
  const bubbleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updateBubbleMenu = () => {
      const { selection } = editor.state;
      const { from, to } = selection;

      // Show only when text is selected
      if (from === to || !bubbleMenuRef.current) {
        if (bubbleMenuRef.current) {
          bubbleMenuRef.current.style.display = "none";
        }
        return;
      }

      // Get selection coordinates
      try {
        const start = editor.view.coordsAtPos(from);
        const end = editor.view.coordsAtPos(to);

        if (bubbleMenuRef.current) {
          bubbleMenuRef.current.style.display = "flex";
          bubbleMenuRef.current.style.position = "fixed";
          const menuWidth = 320; // Approximate width of menu
          const menuHeight = 40;
          const padding = 10;
          
          // Calculate position to appear above the selection
          const left = Math.max(padding, Math.min(window.innerWidth - menuWidth - padding, (start.left + end.left) / 2 - menuWidth / 2));
          const top = start.top - menuHeight - 15; // 15px gap above selection
          
          // If too close to top, show below
          const finalTop = top < padding ? end.bottom + 15 : top;
          
          bubbleMenuRef.current.style.left = `${left}px`;
          bubbleMenuRef.current.style.top = `${finalTop}px`;
          bubbleMenuRef.current.style.zIndex = "1000";
        }
      } catch (e) {
        console.warn("Bubble menu positioning failed:", e);
      }
    };

    const handleSelectionUpdate = () => {
      setTimeout(updateBubbleMenu, 0);
    };

    editor.on("selectionUpdate", handleSelectionUpdate);
    editor.on("transaction", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
      editor.off("transaction", handleSelectionUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      ref={bubbleMenuRef}
      className="bubble-menu"
      style={{ display: "none" }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <RiBold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <RiItalic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        title="Underline"
      >
        <RiUnderline size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title="Strikethrough"
      >
        <RiStrikethrough size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
        title="Inline Code"
      >
        <RiCodeLine size={16} />
      </button>
      <button
        onClick={() => {
          const previousUrl = editor.getAttributes('link').href;
          const url = window.prompt('URL:', previousUrl);
          if (url === null) {
            return;
          }
          if (url === '') {
            editor.chain().focus().unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }}
        className={editor.isActive("link") ? "is-active" : ""}
        title="Add Link"
      >
        <FiLink className="w-4 h-4" />
      </button>
      {onOpenCommandPalette && (
        <>
          <div className="separator" />
          <button
            onClick={() => {
              onOpenCommandPalette();
            }}
            title="Command Palette (Cmd+K or /)"
          >
            <RiCommandLine size={16} />
          </button>
        </>
      )}
    </div>
  );
}
