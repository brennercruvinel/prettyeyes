import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EditorStore {
  content: string;
  markdown: string;
  fileName: string;
  isDirty: boolean;
  lastSavedAt: Date | null;

  updateContent: (content: string) => void;
  updateMarkdown: (markdown: string) => void;
  updateFileName: (fileName: string) => void;
  markAsClean: () => void;
  resetEditor: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      content: "",
      markdown: "",
      fileName: "README.md",
      isDirty: false,
      lastSavedAt: null,

      updateContent: (content) => set({ content, isDirty: true }),
      updateMarkdown: (markdown) => set({ markdown }),
      updateFileName: (fileName) => set({ fileName }),
      markAsClean: () => set({ isDirty: false, lastSavedAt: new Date() }),
      resetEditor: () =>
        set({
          content: "",
          markdown: "",
          fileName: "README.md",
          isDirty: false,
          lastSavedAt: null,
        }),
    }),
    {
      name: "prettyeyes-editor",
      partialize: (state) => ({
        content: state.content,
        fileName: state.fileName,
      }),
    },
  ),
);
