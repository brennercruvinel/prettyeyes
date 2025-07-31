import { Extension } from '@tiptap/core';

export const ImprovedHardBreak = Extension.create({
  name: 'improvedHardBreak',

  addKeyboardShortcuts() {
    return {
      'Shift-Enter': ({ editor }) => {
        const { state } = editor;
        const { $from } = state.selection;
        
        // Check if we're in a code block
        if ($from.parent.type.name === 'codeBlock') {
          // In code blocks, insert a newline
          return editor.commands.insertContent('\n');
        }
        
        // Check if we're in a list item
        if ($from.parent.type.name === 'listItem' || 
            $from.parent.type.name === 'taskItem') {
          // Insert hard break and stay in the same list item
          return editor.commands.setHardBreak();
        }
        
        // Check if we're in a blockquote
        if ($from.parent.type.name === 'blockquote' || 
            $from.parent.type.spec.group?.includes('block')) {
          // For blockquotes and other block elements, insert hard break
          return editor.commands.setHardBreak();
        }
        
        // Default behavior - insert hard break
        return editor.commands.setHardBreak();
      },
      
      // Alternative shortcut
      'Mod-Enter': ({ editor }) => {
        return editor.commands.setHardBreak();
      },
    };
  },
});