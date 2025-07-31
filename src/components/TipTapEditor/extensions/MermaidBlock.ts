import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MermaidView from './MermaidView';

export interface MermaidAttributes {
  code: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mermaid: {
      setMermaidDiagram: (code: string) => ReturnType;
      setMermaidBlock: (attrs: MermaidAttributes) => ReturnType;
    };
  }
}

export const MermaidBlock = Node.create({
  name: 'mermaid',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      code: {
        default: `graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]`,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="mermaid"]',
        getAttrs: (dom) => ({
          code: (dom as HTMLElement).getAttribute('data-code') || '',
        }),
      },
      {
        tag: 'pre',
        getAttrs: (dom) => {
          const codeEl = (dom as HTMLElement).querySelector('code.language-mermaid');
          if (codeEl) {
            return {
              code: codeEl.textContent || '',
            };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'mermaid',
        'data-code': HTMLAttributes.code,
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidView);
  },

  addCommands() {
    return {
      setMermaidDiagram: (code) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { code },
        });
      },
      setMermaidBlock: (attrs) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs,
        });
      },
    };
  },
});