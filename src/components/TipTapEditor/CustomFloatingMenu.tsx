import { useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import {
  RiH1,
  RiH2,
  RiListUnordered,
  RiTable2,
  RiCommandLine,
  RiFileTextLine,
} from "react-icons/ri";

interface CustomFloatingMenuProps {
  editor: Editor;
  onOpenCommandPalette: () => void;
  onOpenTemplates?: () => void;
}

export default function CustomFloatingMenu({
  editor,
  onOpenCommandPalette,
  onOpenTemplates,
}: CustomFloatingMenuProps) {
  const floatingMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updateFloatingMenu = () => {
      const { selection } = editor.state;
      const { $from } = selection;

      // Check if we're in an empty paragraph
      const isEmptyParagraph =
        $from.parent.type.name === "paragraph" &&
        $from.parent.content.size === 0 &&
        selection.empty;

      if (!isEmptyParagraph || !floatingMenuRef.current) {
        if (floatingMenuRef.current) {
          floatingMenuRef.current.style.display = "none";
        }
        return;
      }

      // Get cursor coordinates
      try {
        const coords = editor.view.coordsAtPos($from.pos);

        if (floatingMenuRef.current) {
          floatingMenuRef.current.style.display = "flex";
          floatingMenuRef.current.style.position = "fixed";
          floatingMenuRef.current.style.left = `${Math.max(10, coords.left - 150)}px`;
          floatingMenuRef.current.style.top = `${coords.top}px`;
          floatingMenuRef.current.style.zIndex = "100";
        }
      } catch {
        // Silently handle positioning errors
      }
    };

    const handleSelectionUpdate = () => {
      setTimeout(updateFloatingMenu, 0);
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
      ref={floatingMenuRef}
      className="floating-menu"
      style={{ display: "none" }}
    >
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <RiH1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <RiH2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
      >
        <RiListUnordered size={16} />
      </button>
      <button
        onClick={() =>
          editor.commands.insertContent(
            "| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n",
          )
        }
        title="Table"
      >
        <RiTable2 size={16} />
      </button>
      <button
        onClick={onOpenCommandPalette}
        title="Command Palette (Cmd+K or /)"
      >
        <RiCommandLine size={16} />
      </button>
      {onOpenTemplates && (
        <button
          disabled
          className="relative opacity-50 cursor-not-allowed"
          title="README Templates (Coming Soon)"
        >
          <RiFileTextLine size={16} />
          <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-[8px] text-gray-500 whitespace-nowrap">soon</span>
        </button>
      )}
    </div>
  );
}
