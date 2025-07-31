import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import BadgeView from './BadgeView';

export interface BadgeAttributes {
  label: string;
  message: string;
  color: string;
  style?: string;
  logo?: string;
  logoColor?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    badge: {
      setBadge: (attributes: BadgeAttributes) => ReturnType;
    };
  }
}

export const Badge = Node.create({
  name: 'badge',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      label: {
        default: 'label',
      },
      message: {
        default: 'message',
      },
      color: {
        default: 'blue',
      },
      style: {
        default: 'flat',
      },
      logo: {
        default: null,
      },
      logoColor: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src*="shields.io"]',
        getAttrs: (dom) => {
          const src = (dom as HTMLImageElement).src;
          const url = new URL(src);
          const pathParts = url.pathname.split('/');
          
          return {
            label: pathParts[2] || 'label',
            message: pathParts[3] || 'message',
            color: pathParts[4] || 'blue',
            style: url.searchParams.get('style') || 'flat',
            logo: url.searchParams.get('logo') || null,
            logoColor: url.searchParams.get('logoColor') || null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { label, message, color, style, logo, logoColor } = HTMLAttributes;
    const params = new URLSearchParams();
    
    if (style && style !== 'flat') params.append('style', style);
    if (logo) params.append('logo', logo);
    if (logoColor) params.append('logoColor', logoColor);
    
    const queryString = params.toString();
    const src = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}${queryString ? '?' + queryString : ''}`;
    
    return ['img', mergeAttributes(HTMLAttributes, { src }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BadgeView);
  },

  addCommands() {
    return {
      setBadge: (attributes) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});