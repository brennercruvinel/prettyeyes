import type { IconType } from "react-icons";

export interface ToolbarButton {
  icon: IconType;
  label: string;
  action: () => void;
  shortcut?: string;
  isActive?: boolean;
  type?: "button" | "dropdown";
}

export interface ToolbarGroup {
  name: string;
  buttons: ToolbarButton[];
}

export type AlertType = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

export interface Alert {
  type: AlertType;
  content: string;
  icon: IconType;
  color: string;
}

export interface TextSelection {
  start: number;
  end: number;
}

export interface EditorState {
  content: string;
  markdown: string;
  selection: TextSelection;
}

export interface PreviewProps {
  markdown: string;
  className?: string;
}

export interface EditorProps {
  initialContent?: string;
  onChange?: (markdown: string) => void;
  className?: string;
  importedMarkdown?: string;
}
