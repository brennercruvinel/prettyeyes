import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiMoreVertical } from "react-icons/fi";
import type { ReactNode } from "react";

interface Block {
  id: string;
  type: string;
  content: string;
  level?: number;
}

interface SortableBlockItemProps {
  id: string;
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

export function SortableBlockItem({ id, icon, title, onClick }: SortableBlockItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group flex items-center gap-2 p-2 rounded-lg text-sm
        bg-github-bg border border-github-border
        hover:bg-github-surface hover:border-github-muted
        cursor-pointer transition-colors
        ${isDragging ? "shadow-lg" : ""}
      `}
      onClick={onClick}
    >
      <div
        {...attributes}
        {...listeners}
        className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
      >
        <FiMoreVertical className="w-4 h-4 text-github-muted" />
      </div>
      
      <div className="text-github-muted">{icon}</div>
      
      <div className="flex-1 truncate text-github-text">
        {title}
      </div>
    </div>
  );
}