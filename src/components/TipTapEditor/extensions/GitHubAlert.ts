import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import GitHubAlertView from './GitHubAlertView';

export type AlertType = 'note' | 'tip' | 'important' | 'warning' | 'caution';

export interface GitHubAlertAttributes {
  type: AlertType;
  content?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    githubAlert: {
      setGitHubAlert: (attrs: GitHubAlertAttributes) => ReturnType;
    };
  }
}

export const GitHubAlert = Node.create({
  name: 'githubAlert',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      type: {
        default: 'note',
        parseHTML: element => element.getAttribute('data-type') || 'note',
        renderHTML: attributes => {
          return {
            'data-type': attributes.type,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type]',
        getAttrs: (dom) => {
          const type = (dom as HTMLElement).getAttribute('data-type');
          if (['note', 'tip', 'important', 'warning', 'caution'].includes(type || '')) {
            return { type };
          }
          return false;
        },
      },
      {
        tag: 'blockquote',
        getAttrs: (dom) => {
          const firstLine = (dom as HTMLElement).textContent?.split('\n')[0] || '';
          const match = firstLine.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
          if (match) {
            return { type: match[1].toLowerCase() };
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
        class: `github-alert github-alert-${HTMLAttributes.type}`,
      }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(GitHubAlertView);
  },

  addCommands() {
    return {
      setGitHubAlert: (attrs) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { type: attrs.type },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: attrs.content || 'Enter your alert content here...' }],
            },
          ],
        });
      },
    };
  },
});