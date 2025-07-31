import { Editor } from "@tiptap/react";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiCode,
  FiList,
  FiLink,
  FiImage,
} from "react-icons/fi";
import { 
  RiStrikethrough, 
  RiH1, 
  RiH2, 
  RiH3,
  RiListOrdered,
  RiDoubleQuotesL,
  RiCodeBoxLine
} from "react-icons/ri";

interface ToolbarProps {
  editor: Editor | null;
}

export default function ToolbarNotion({ editor }: ToolbarProps) {
  if (!editor) return null;

  const ToolButton = ({ 
    onClick, 
    isActive = false, 
    title, 
    children 
  }: any) => (
    <button
      onClick={onClick}
      title={title}
      className={`
        relative p-1.5 rounded transition-all duration-150
        ${isActive 
          ? 'bg-[var(--notion-bg-active)] text-[var(--notion-accent-text)]' 
          : 'text-[var(--notion-text-secondary)] hover:text-[var(--notion-text)] hover:bg-[var(--notion-bg-hover)]'
        }
      `}
    >
      {children}
    </button>
  );

  const Separator = () => (
    <div className="w-px h-4 bg-[var(--notion-border)] mx-1" />
  );

  return (
    <div className="flex items-center gap-1 px-4 py-1.5 bg-[var(--notion-bg)] border-b border-[var(--notion-border)]">
      {/* Text Format */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        <FiBold size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        <FiItalic size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline"
      >
        <FiUnderline size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <RiStrikethrough size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        title="Code"
      >
        <FiCode size={16} />
      </ToolButton>

      <Separator />

      {/* Headers */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <RiH1 size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <RiH2 size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        <RiH3 size={16} />
      </ToolButton>

      <Separator />

      {/* Lists */}
      <ToolButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <FiList size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <RiListOrdered size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Quote"
      >
        <RiDoubleQuotesL size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        title="Code Block"
      >
        <RiCodeBoxLine size={16} />
      </ToolButton>

      <Separator />

      {/* Insert */}
      <ToolButton
        onClick={() => {
          const url = window.prompt("Enter URL:");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        isActive={editor.isActive("link")}
        title="Link"
      >
        <FiLink size={16} />
      </ToolButton>
      
      <ToolButton
        onClick={() => {
          const url = window.prompt("Enter image URL:");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        title="Image"
      >
        <FiImage size={16} />
      </ToolButton>
    </div>
  );
}