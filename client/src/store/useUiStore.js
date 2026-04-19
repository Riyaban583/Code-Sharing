import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isAIPanelOpen: false,
  isPreviewFullscreen: false,
  isCommandPaletteOpen: false,
  isShareModalOpen: false,
  viewMode: 'split', // split, editor, preview
  toasts: [],
  
  toggleAIPanel: () => set((state) => ({ isAIPanelOpen: !state.isAIPanelOpen })),
  togglePreviewFullscreen: () => set((state) => ({ isPreviewFullscreen: !state.isPreviewFullscreen })),
  setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
  setShareModalOpen: (isOpen) => set({ isShareModalOpen: isOpen }),
  setViewMode: (mode) => set({ viewMode: mode }),
  
  addToast: (message, type = 'info') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, 3000);
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}));
