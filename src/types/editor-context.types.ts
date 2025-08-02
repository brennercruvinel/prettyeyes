import { Editor } from '@tiptap/react';

export interface EditorContextType {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}