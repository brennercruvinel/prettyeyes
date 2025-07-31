import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Fragment } from '@tiptap/pm/model';

interface DraggedBlock {
  from: number;
  to: number;
  content: Fragment;
}

declare global {
  interface Window {
    __draggedBlock?: DraggedBlock;
  }
}

export const NotionDragDrop = Extension.create({
  name: 'notionDragDrop',

  addOptions() {
    return {
      handleWidth: 24,
      threshold: 100,
    }
  },

  addProseMirrorPlugins() {
    const options = this.options;

    return [
      new Plugin({
        key: new PluginKey('notionDragDrop'),
        
        state: {
          init() {
            return { hoveredBlock: null };
          },
          apply(tr, value) {
            const meta = tr.getMeta('notionDragDrop');
            if (meta) {
              return meta;
            }
            return value;
          }
        },

        props: {
          decorations(state) {
            const pluginState = this.getState(state);
            const hoveredBlock = pluginState?.hoveredBlock;
            if (!hoveredBlock) return DecorationSet.empty;

            const decorations: Decoration[] = [];
            const { from, to } = hoveredBlock;
            
            const widget = Decoration.widget(from, () => {
              const handle = document.createElement('div');
              handle.className = 'notion-drag-handle-widget';
              handle.draggable = true;
              handle.contentEditable = 'false';
              
              handle.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <circle cx="3" cy="3" r="1.5" />
                  <circle cx="9" cy="3" r="1.5" />
                  <circle cx="3" cy="6" r="1.5" />
                  <circle cx="9" cy="6" r="1.5" />
                  <circle cx="3" cy="9" r="1.5" />
                  <circle cx="9" cy="9" r="1.5" />
                </svg>
              `;
              
              // Store block position data
              handle.dataset.blockFrom = String(from);
              handle.dataset.blockTo = String(to);
              
              handle.addEventListener('dragstart', (e) => {
                if (!e.dataTransfer) return;
                
                // Store the position data
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', ''); // Required for Firefox
                
                // Store block info in a global variable
                window.__draggedBlock = {
                  from,
                  to,
                  content: state.doc.slice(from, to).content
                };
                
                // Add visual feedback
                const draggedElement = (e.target as HTMLElement).closest('.ProseMirror > *') as HTMLElement;
                if (draggedElement) {
                  draggedElement.classList.add('dragging');
                }
              });
              
              handle.addEventListener('dragend', () => {
                // Clean up
                delete window.__draggedBlock;
                document.querySelectorAll('.dragging').forEach(el => {
                  el.classList.remove('dragging');
                });
                document.querySelectorAll('.drag-over').forEach(el => {
                  el.classList.remove('drag-over');
                });
              });
              
              return handle;
            }, { 
              side: -1,
              key: 'drag-handle'
            });
            
            decorations.push(widget);
            return DecorationSet.create(state.doc, decorations);
          },

          handleDOMEvents: {
            mousemove: (view, event) => {
              const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
              if (!pos) {
                view.dispatch(view.state.tr.setMeta('notionDragDrop', { hoveredBlock: null }));
                return false;
              }

              const $pos = view.state.doc.resolve(pos.pos);
              const node = $pos.parent;
              
              // Check if we're in the editor's left margin area
              const editorRect = view.dom.getBoundingClientRect();
              const inMargin = event.clientX < editorRect.left + options.threshold;
              
              if (inMargin && node && $pos.depth === 1) {
                // Get the position of the parent block
                const from = $pos.before(1);
                const to = from + node.nodeSize;
                
                view.dispatch(
                  view.state.tr.setMeta('notionDragDrop', { 
                    hoveredBlock: { from, to } 
                  })
                );
              } else {
                view.dispatch(
                  view.state.tr.setMeta('notionDragDrop', { 
                    hoveredBlock: null 
                  })
                );
              }
              
              return false;
            },

            mouseleave: (view) => {
              view.dispatch(
                view.state.tr.setMeta('notionDragDrop', { 
                  hoveredBlock: null 
                })
              );
              return false;
            },

            dragover: (view, event) => {
              event.preventDefault();
              if (!event.dataTransfer) return false;
              
              event.dataTransfer.dropEffect = 'move';
              
              // Remove old drag-over classes
              document.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
              });
              
              // Find the element we're dragging over
              const pos = view.posAtCoords({ left: event.clientX, top: event.clientY });
              if (pos) {
                const $pos = view.state.doc.resolve(pos.pos);
                if ($pos.depth === 1) {
                  const blockElement = view.domAtPos($pos.before(1)).node as HTMLElement;
                  if (blockElement && blockElement.parentElement) {
                    blockElement.parentElement.classList.add('drag-over');
                  }
                }
              }
              
              return false;
            },

            drop: (view, event) => {
              event.preventDefault();
              
              const draggedBlock = window.__draggedBlock;
              if (!draggedBlock) return false;
              
              const dropPos = view.posAtCoords({ left: event.clientX, top: event.clientY });
              if (!dropPos) return false;
              
              const $dropPos = view.state.doc.resolve(dropPos.pos);
              
              // Ensure we're dropping at the block level
              if ($dropPos.depth !== 1) return false;
              
              const dropBlockPos = $dropPos.before(1);
              
              // Don't drop on the same position
              if (dropBlockPos === draggedBlock.from) return false;
              
              const tr = view.state.tr;
              
              // Calculate the correct positions
              let targetPos = dropBlockPos;
              
              // Delete the dragged content
              tr.delete(draggedBlock.from, draggedBlock.to);
              
              // Adjust target position if it's after the deleted content
              if (targetPos > draggedBlock.from) {
                targetPos -= (draggedBlock.to - draggedBlock.from);
              }
              
              // Insert at the new position
              tr.insert(targetPos, draggedBlock.content);
              
              view.dispatch(tr);
              
              // Clean up
              delete window.__draggedBlock;
              document.querySelectorAll('.dragging').forEach(el => {
                el.classList.remove('dragging');
              });
              document.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
              });
              
              return true;
            },

            dragleave: () => {
              document.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
              });
              return false;
            }
          }
        }
      })
    ];
  }
});