import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';

// TODO: [Memory Leak] Add cleanup for DOM event listeners in destroy() method
// Current implementation doesn't remove dragstart, dragend, dragover, drop listeners
export const SimpleDragDrop = Extension.create({
  name: 'simpleDragDrop',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        view(editorView) {
          const handleHolder = document.createElement('div');
          handleHolder.className = 'simple-drag-handles';
          handleHolder.style.position = 'absolute';
          handleHolder.style.left = '0';
          handleHolder.style.top = '0';
          handleHolder.style.width = '100%';
          handleHolder.style.height = '100%';
          handleHolder.style.pointerEvents = 'none';
          handleHolder.style.zIndex = '1';
          
          editorView.dom.style.position = 'relative';
          editorView.dom.appendChild(handleHolder);

          const updateHandles = () => {
            handleHolder.innerHTML = '';
            
            editorView.dom.querySelectorAll(':scope > *').forEach((block, index) => {
              if (!(block instanceof HTMLElement)) return;
              
              const rect = block.getBoundingClientRect();
              const editorRect = editorView.dom.getBoundingClientRect();
              
              const handle = document.createElement('div');
              handle.className = 'drag-handle-simple';
              handle.draggable = true;
              handle.style.position = 'absolute';
              handle.style.left = '-30px';
              handle.style.top = `${rect.top - editorRect.top}px`;
              handle.style.width = '20px';
              handle.style.height = `${rect.height}px`;
              handle.style.cursor = 'grab';
              handle.style.pointerEvents = 'auto';
              handle.style.display = 'flex';
              handle.style.alignItems = 'center';
              handle.style.justifyContent = 'center';
              handle.dataset.blockIndex = String(index);
              
              const dots = document.createElement('div');
              dots.className = 'drag-dots';
              dots.innerHTML = `
                <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
                  <circle cx="2.5" cy="2.5" r="1.5"/>
                  <circle cx="7.5" cy="2.5" r="1.5"/>
                  <circle cx="2.5" cy="8" r="1.5"/>
                  <circle cx="7.5" cy="8" r="1.5"/>
                  <circle cx="2.5" cy="13.5" r="1.5"/>
                  <circle cx="7.5" cy="13.5" r="1.5"/>
                </svg>
              `;
              handle.appendChild(dots);
              
              handle.addEventListener('dragstart', (e) => {
                if (!e.dataTransfer) return;
                
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('blockIndex', String(index));
                
                block.classList.add('dragging');
                handle.style.cursor = 'grabbing';
              });
              
              handle.addEventListener('dragend', () => {
                block.classList.remove('dragging');
                handle.style.cursor = 'grab';
                document.querySelectorAll('.drag-over').forEach(el => {
                  el.classList.remove('drag-over');
                });
              });
              
              handleHolder.appendChild(handle);
            });
          };

          editorView.dom.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!e.dataTransfer) return;
            
            e.dataTransfer.dropEffect = 'move';
            
            const blocks = Array.from(editorView.dom.querySelectorAll(':scope > *'));
            const mouseY = e.clientY;
            
            blocks.forEach(block => {
              if (!(block instanceof HTMLElement)) return;
              block.classList.remove('drag-over');
            });
            
            for (let i = 0; i < blocks.length; i++) {
              const block = blocks[i];
              if (!(block instanceof HTMLElement)) continue;
              
              const rect = block.getBoundingClientRect();
              if (mouseY < rect.top + rect.height / 2) {
                block.classList.add('drag-over');
                break;
              } else if (i === blocks.length - 1) {
                block.classList.add('drag-over-bottom');
              }
            }
          });

          editorView.dom.addEventListener('drop', (e) => {
            e.preventDefault();
            if (!e.dataTransfer) return;
            
            const fromIndex = parseInt(e.dataTransfer.getData('blockIndex'));
            if (isNaN(fromIndex)) return;
            
            const blocks = Array.from(editorView.dom.querySelectorAll(':scope > *'));
            const mouseY = e.clientY;
            
            let toIndex = blocks.length;
            for (let i = 0; i < blocks.length; i++) {
              const block = blocks[i];
              if (!(block instanceof HTMLElement)) continue;
              
              const rect = block.getBoundingClientRect();
              if (mouseY < rect.top + rect.height / 2) {
                toIndex = i;
                break;
              }
            }
            
            if (fromIndex !== toIndex && fromIndex < blocks.length) {
              const view = editorView;
              const state = view.state;
              const tr = state.tr;
              
              let fromPos = 0;
              let toPos = 0;
              let nodeSize = 0;
              
              state.doc.forEach((node, offset, index) => {
                if (index === fromIndex) {
                  fromPos = offset;
                  nodeSize = node.nodeSize;
                }
                if (index === toIndex) {
                  toPos = offset;
                }
              });
              
              if (toIndex > fromIndex) {
                toPos -= nodeSize;
              }
              
              const node = state.doc.nodeAt(fromPos);
              if (node) {
                tr.delete(fromPos, fromPos + nodeSize);
                tr.insert(toPos, node);
                view.dispatch(tr);
              }
            }
            
            blocks.forEach(block => {
              if (block instanceof HTMLElement) {
                block.classList.remove('drag-over', 'drag-over-bottom', 'dragging');
              }
            });
            
            setTimeout(updateHandles, 0);
          });

          updateHandles();
          
          return {
            update: updateHandles,
            destroy: () => {
              handleHolder.remove();
            }
          };
        }
      })
    ];
  }
});