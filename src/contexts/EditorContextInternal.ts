import { createContext } from 'react';
import type { EditorContextType } from '../types/editor-context.types';

export const EditorContext = createContext<EditorContextType | undefined>(undefined);