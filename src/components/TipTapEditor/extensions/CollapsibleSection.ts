import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CollapsibleView from './CollapsibleView';

export interface CollapsibleAttributes {
  summary: string;
  content?: string;
  defaultOpen?: boolean;
  open?: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    collapsible: {
      setCollapsible: (summary: string) => ReturnType;
      setCollapsibleSection: (attrs: CollapsibleAttributes) => ReturnType;
      toggleCollapsible: () => ReturnType;
    };
  }
}

export const CollapsibleSection = Node.create({
  name: 'collapsible',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      summary: {
        default: 'Click to expand',
      },
      open: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'details',
        getAttrs: (dom) => ({
          summary: (dom as HTMLElement).querySelector('summary')?.textContent || 'Click to expand',
          open: (dom as HTMLElement).hasAttribute('open'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes);
    if (attrs.open) {
      attrs.open = '';
    } else {
      delete attrs.open;
    }
    
    return [
      'details',
      attrs,
      ['summary', {}, HTMLAttributes.summary],
      ['div', { class: 'details-content' }, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CollapsibleView);
  },

  addCommands() {
    return {
      setCollapsible: (summary) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { summary },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Content goes here...' }],
            },
          ],
        });
      },
      setCollapsibleSection: (attrs) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { summary: attrs.summary, open: attrs.defaultOpen || false },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: attrs.content || 'Content goes here...' }],
            },
          ],
        });
      },
      toggleCollapsible: () => ({ editor, commands }) => {
        const { from } = editor.state.selection;
        const node = editor.state.doc.nodeAt(from);
        
        if (node && node.type.name === 'collapsible') {
          return commands.updateAttributes('collapsible', { open: !node.attrs.open });
        }
        
        return false;
      },
    };
  },
});