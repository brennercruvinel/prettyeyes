import React, { createContext, useContext, useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';

interface EditorContextType {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editor, setEditor] = useState<Editor | null>(null);

  const handleSetEditor = useCallback((newEditor: Editor | null) => {
    setEditor(newEditor);
  }, []);

  return (
    <EditorContext.Provider value={{ editor, setEditor: handleSetEditor }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within EditorProvider');
  }
  return context;
}