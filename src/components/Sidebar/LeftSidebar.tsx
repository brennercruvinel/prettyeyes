import { useState, useEffect, useRef } from "react";
import { Editor } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableBlockItem } from "./SortableBlockItem";
import { FiFileText, FiList, FiCode, FiImage, FiTable, FiHash, FiAlignLeft, FiBox } from "react-icons/fi";

interface Block {
  id: string;
  type: string;
  content: string;
  level?: number;
}

interface LeftSidebarProps {
  editor: Editor | null;
  isEditorReady: boolean;
}

const getBlockIcon = (type: string) => {
  switch (type) {
    case "heading":
      return <FiHash className="w-4 h-4" />;
    case "paragraph":
      return <FiAlignLeft className="w-4 h-4" />;
    case "bulletList":
    case "orderedList":
    case "taskList":
      return <FiList className="w-4 h-4" />;
    case "codeBlock":
      return <FiCode className="w-4 h-4" />;
    case "image":
      return <FiImage className="w-4 h-4" />;
    case "table":
      return <FiTable className="w-4 h-4" />;
    case "blockquote":
      return <FiBox className="w-4 h-4" />;
    default:
      return <FiFileText className="w-4 h-4" />;
  }
};

const getBlockTitle = (block: Block): string => {
  if (block.type === "heading") {
    return `H${block.level || 1}: ${block.content.slice(0, 30)}${block.content.length > 30 ? "..." : ""}`;
  }
  
  const typeNames: Record<string, string> = {
    paragraph: "Paragraph",
    bulletList: "Bullet List",
    orderedList: "Ordered List",
    taskList: "Task List",
    codeBlock: "Code Block",
    image: "Image",
    table: "Table",
    blockquote: "Blockquote",
  };

  const typeName = typeNames[block.type] || block.type;
  const preview = block.content.slice(0, 30);
  return preview ? `${typeName}: ${preview}${block.content.length > 30 ? "..." : ""}` : typeName;
};

export function LeftSidebar({ editor, isEditorReady }: LeftSidebarProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const updateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Extract blocks from editor content
  useEffect(() => {
    if (!editor || !isEditorReady) return;

    const updateBlocks = () => {
      // Cancelar timeout anterior se existir
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Agendar nova atualização com pequeno delay
      updateTimeoutRef.current = setTimeout(() => {
        const newBlocks: Block[] = [];
        let blockId = 0;

        editor.state.doc.forEach((node) => {
          if (node.isBlock && node.type.name !== "doc") {
            const block: Block = {
              id: `block-${blockId++}`,
              type: node.type.name,
              content: node.textContent,
              level: node.attrs?.level,
            };
            newBlocks.push(block);
          }
        });

        setBlocks(newBlocks);
      }, 100); // Pequeno delay para agrupar múltiplas atualizações
    };

    // Initial update
    updateBlocks();
    
    // Listen for all content changes
    editor.on("update", updateBlocks);
    // Performance: Removed selectionUpdate listener to prevent unnecessary rerenders
    
    // Store reference to transaction handler for proper cleanup
    const transactionHandler = ({ transaction }: { transaction: any }) => {
      // Só atualizar se a transação modificou o documento
      if (transaction.docChanged) {
        updateBlocks();
      }
    };
    editor.on("transaction", transactionHandler);

    return () => {
      // Limpar timeout pendente
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      editor.off("update", updateBlocks);
      // Fixed: Use correct handler reference for cleanup
      editor.off("transaction", transactionHandler);
    };
  }, [editor, isEditorReady]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((item) => item.id === active.id);
      const newIndex = blocks.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && editor) {
        // Get all block positions
        const blockPositions: { pos: number; size: number; node: Node }[] = [];

        // Fixed: Variable now declared before use
        editor.state.doc.forEach((node, offset) => {
          if (node.isBlock && node.type.name !== "doc") {
            blockPositions.push({
              pos: offset,
              size: node.nodeSize,
              node: node
            });
          }
        });

        if (blockPositions[oldIndex] && blockPositions[newIndex]) {
          const { state } = editor;
          const { tr } = state;

          // Get the node to move
          const nodeToMove = blockPositions[oldIndex].node;
          const fromPos = blockPositions[oldIndex].pos;
          const nodeSize = blockPositions[oldIndex].size;

          // Calculate target position
          let targetPos = blockPositions[newIndex].pos;
          
          // Delete the node from its current position
          tr.delete(fromPos, fromPos + nodeSize);
          
          // Adjust target position if moving down
          if (newIndex > oldIndex) {
            targetPos -= nodeSize;
          }
          
          // Insert the node at the new position
          tr.insert(targetPos, nodeToMove);
          
          // Dispatch the transaction
          editor.view.dispatch(tr);
        }
      }
    }
  };

  const handleBlockClick = (blockId: string) => {
    if (!editor) return;

    const blockIndex = parseInt(blockId.split("-")[1]);
    let currentIndex = 0;
    let targetPos = 0;

    editor.state.doc.forEach((node, offset) => {
      if (node.isBlock && node.type.name !== "doc") {
        if (currentIndex === blockIndex) {
          targetPos = offset;
          return false;
        }
        currentIndex++;
      }
    });

    if (targetPos > 0) {
      editor.commands.setTextSelection(targetPos + 1);
      editor.commands.focus();
    }
  };

  return (
    <div className="w-64 bg-github-surface border-r border-github-border h-full flex flex-col">
      <div className="p-4 border-b border-github-border">
        <h2 className="text-sm font-semibold text-github-text">Document Structure</h2>
        <p className="text-xs text-github-muted mt-1">Drag to reorder blocks</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {blocks.length === 0 ? (
          <div className="text-center py-8 text-github-muted text-sm">
            Start writing to see document structure
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1">
                {blocks.map((block) => (
                  <SortableBlockItem
                    key={block.id}
                    id={block.id}
                    icon={getBlockIcon(block.type)}
                    title={getBlockTitle(block)}
                    onClick={() => handleBlockClick(block.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}