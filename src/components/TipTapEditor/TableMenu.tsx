import { Editor } from "@tiptap/react";
import { 
  FiPlus, 
  FiMinus, 
  FiTrash2, 
  FiColumns,
  FiGrid
} from "react-icons/fi";
import { 
  RiInsertColumnLeft, 
  RiInsertColumnRight, 
  RiInsertRowTop,
  RiInsertRowBottom,
  RiDeleteColumn,
  RiDeleteRow,
  RiMergeCellsHorizontal,
  RiSplitCellsHorizontal
} from "react-icons/ri";

interface TableMenuProps {
  editor: Editor;
}

export default function TableMenu({ editor }: TableMenuProps) {
  if (!editor.isActive('table')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-github-surface border border-github-border rounded-lg shadow-lg p-2 flex items-center gap-1 z-50">
      <div className="flex items-center gap-1 pr-2 border-r border-github-border">
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-2 hover:bg-github-border rounded transition-colors"
          title="Insert column before"
        >
          <RiInsertColumnLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="p-2 hover:bg-github-border rounded transition-colors"
          title="Insert column after"
        >
          <RiInsertColumnRight size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="p-2 hover:bg-github-border rounded transition-colors text-red-400"
          title="Delete column"
        >
          <RiDeleteColumn size={18} />
        </button>
      </div>
      
      <div className="flex items-center gap-1 px-2 border-r border-github-border">
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-2 hover:bg-github-border rounded transition-colors"
          title="Insert row above"
        >
          <RiInsertRowTop size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="p-2 hover:bg-github-border rounded transition-colors"
          title="Insert row below"
        >
          <RiInsertRowBottom size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="p-2 hover:bg-github-border rounded transition-colors text-red-400"
          title="Delete row"
        >
          <RiDeleteRow size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1 px-2 border-r border-github-border">
        <button
          onClick={() => editor.chain().focus().mergeCells().run()}
          className="p-2 hover:bg-github-border rounded transition-colors"
          title="Merge cells"
          disabled={!editor.can().mergeCells()}
        >
          <RiMergeCellsHorizontal size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().splitCell().run()}
          className="p-2 hover:bg-github-border rounded transition-colors"
          title="Split cell"
          disabled={!editor.can().splitCell()}
        >
          <RiSplitCellsHorizontal size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          className="p-2 hover:bg-github-border rounded transition-colors"
          title="Toggle header row"
        >
          <FiGrid size={18} />
        </button>
      </div>

      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="p-2 hover:bg-red-900/50 rounded transition-colors text-red-400 ml-2"
        title="Delete table"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
}