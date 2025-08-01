import React, { useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { EditorContext } from './EditorContextInternal';

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