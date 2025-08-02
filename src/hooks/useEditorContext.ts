import { useContext } from 'react';
import { EditorContext } from '../contexts/EditorContextInternal';

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within EditorProvider');
  }
  return context;
}