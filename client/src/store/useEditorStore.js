import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

const initialDraft = {
  html: '<!-- Welcome to NoteCode v2.0 -->\n<div class="container">\n  <h1>Hello World</h1>\n  <p>Start typing to see live updates</p>\n</div>',
  css: '/* Glassmorphism theme */\nbody {\n  margin: 0;\n  padding: 0;\n  background: #0f172a;\n  color: #f8fafc;\n  font-family: system-ui, sans-serif;\n}\n.container {\n  padding: 2rem;\n  text-align: center;\n}\nh1 {\n  color: #3b82f6;\n}',
  js: '// JavaScript goes here\nconsole.log("Welcome to NoteCode!");',
};

export const useEditorStore = create(
  persist(
    (set, get) => ({
      code: initialDraft,
      language: 'html',
      theme: 'vs-dark',
      snippetId: nanoid(10),
      isShared: false,
      lastSaved: Date.now(),
      
      setCode: (lang, value) => {
        set((state) => ({
          code: { ...state.code, [lang]: value },
          isShared: false,
          lastSaved: Date.now()
        }));
      },
      
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme }),
      
      shareSnippet: () => {
        const id = get().snippetId;
        // In a real app we'd call an API here
        set({ isShared: true });
        return id;
      },
      
      resetSnippet: () => {
        set({
          code: initialDraft,
          snippetId: nanoid(10),
          isShared: false,
          lastSaved: Date.now()
        });
      }
    }),
    {
      name: 'notecode-editor-storage',
      partialize: (state) => ({ 
        code: state.code,
        theme: state.theme,
        lastSaved: state.lastSaved
      }),
    }
  )
);
