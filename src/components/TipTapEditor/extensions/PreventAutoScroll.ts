import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';

export const PreventAutoScroll = Extension.create({
  name: 'preventAutoScroll',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          // Override the default scrollToSelection behavior
          handleScrollToSelection: () => {
            // Return true to prevent the default scroll behavior
            return true;
          },
        },
      }),
    ];
  },

  addOptions() {
    return {
      // Allow manual scroll when needed
      enableScroll: false,
    };
  },

  addCommands() {
    return {
      // Custom focus command that doesn't scroll
      focusWithoutScroll: () => ({ editor, view }) => {
        const { from, to } = editor.state.selection;
        
        // Save current scroll position
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        
        // Focus the editor
        view.focus();
        
        // Restore scroll position
        requestAnimationFrame(() => {
          window.scrollTo(scrollX, scrollY);
        });
        
        return true;
      },
    };
  },
});