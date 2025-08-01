import { useState, useCallback, useEffect } from 'react';
import { Editor } from '@tiptap/react';

interface UseEditorStateReturn {
  editor: Editor | null;
  isEditorReady: boolean;
  setEditor: (editor: Editor | null) => void;
  executeCommand: (callback: (editor: Editor) => void) => void;
}

export function useEditorState(): UseEditorStateReturn {
  const [editor, setEditorState] = useState<Editor | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (editor) {
      // Check if editor is ready
      const checkReady = () => {
        const ready = !!(editor && !editor.isDestroyed && editor.view);
        setIsEditorReady(ready);
      };

      checkReady();

      // Listen for editor updates
      const updateHandler = () => checkReady();
      
      editor.on('create', updateHandler);
      editor.on('update', updateHandler);
      editor.on('destroy', () => setIsEditorReady(false));

      return () => {
        editor.off('create', updateHandler);
        editor.off('update', updateHandler);
      };
    } else {
      setIsEditorReady(false);
    }
  }, [editor]);

  const setEditor = useCallback((newEditor: Editor | null) => {
    setEditorState(newEditor);
  }, []);

  const executeCommand = useCallback((callback: (editor: Editor) => void) => {
    if (editor && !editor.isDestroyed && editor.view) {
      callback(editor);
      
      // Forçar atualização após executar comando
      // Disparar uma transação vazia para garantir que os listeners sejam notificados
      setTimeout(() => {
        if (editor && !editor.isDestroyed && editor.view) {
          const { state, view } = editor;
          const tr = state.tr;
          view.dispatch(tr);
        }
      }, 50);
    } else {
      console.warn('Editor is not ready for commands');
    }
  }, [editor]);

  return {
    editor,
    isEditorReady,
    setEditor,
    executeCommand
  };
}