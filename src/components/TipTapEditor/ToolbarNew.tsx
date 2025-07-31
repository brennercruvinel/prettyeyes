import { Editor } from "@tiptap/react";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiCode,
  FiList,
  FiLink,
  FiImage,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
} from "react-icons/fi";
import { RiStrikethrough } from "react-icons/ri";
import { BiCodeBlock } from "react-icons/bi";
import { MdFormatListNumbered, MdFormatQuote, MdUndo, MdRedo } from "react-icons/md";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  interface ToolButtonProps {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
  }

  const ToolButton = ({ onClick, isActive = false, disabled = false, title, children }: ToolButtonProps) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        relative p-2 rounded-md transition-all duration-150
        ${isActive 
          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
        }
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900
      `}
    >
      {children}
    </button>
  );

  const Divider = () => (
    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
  );

  return (
    <div className="flex items-center gap-1 px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Text Formatting */}
      <div className="flex items-center gap-0.5">
        <ToolButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <FiBold size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <FiItalic size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <FiUnderline size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <RiStrikethrough size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Inline Code"
        >
          <FiCode size={18} />
        </ToolButton>
      </div>

      <Divider />

      {/* Headings */}
      <div className="flex items-center gap-0.5">
        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <span className="text-sm font-bold">H1</span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <span className="text-sm font-bold">H2</span>
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <span className="text-sm font-bold">H3</span>
        </ToolButton>
      </div>

      <Divider />

      {/* Lists */}
      <div className="flex items-center gap-0.5">
        <ToolButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <FiList size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <MdFormatListNumbered size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
        >
          <MdFormatQuote size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <BiCodeBlock size={18} />
        </ToolButton>
      </div>

      <Divider />

      {/* Alignment */}
      <div className="flex items-center gap-0.5">
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <FiAlignLeft size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <FiAlignCenter size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <FiAlignRight size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          title="Justify"
        >
          <FiAlignJustify size={18} />
        </ToolButton>
      </div>

      <Divider />

      {/* Actions */}
      <div className="flex items-center gap-0.5">
        <ToolButton
          onClick={() => {
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          isActive={editor.isActive("link")}
          title="Add Link"
        >
          <FiLink size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => {
            const url = window.prompt("Enter image URL:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          title="Add Image"
        >
          <FiImage size={18} />
        </ToolButton>
      </div>

      <Divider />

      {/* History */}
      <div className="flex items-center gap-0.5 ml-auto">
        <ToolButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <MdUndo size={18} />
        </ToolButton>
        <ToolButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <MdRedo size={18} />
        </ToolButton>
      </div>
    </div>
  );
}