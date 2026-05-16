import React from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { useUiStore } from '../store/useUiStore';
import { Layout, Columns, RefreshCcw } from 'lucide-react';

const ControlPanel = () => {
  const { language, setLanguage, theme, setTheme, resetSnippet } = useEditorStore();
  const { setViewMode, viewMode } = useUiStore();

  const languages = [
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
    { id: 'js', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'python', name: 'Python' },
    { id: 'cpp', name: 'C++' },
    { id: 'json', name: 'JSON' },
    { id: 'rust', name: 'Rust' },
  ];

  return (
    <div className="h-12 border-b border-glassBorder bg-secondary/20 flex items-center justify-between px-4">
      <div className="flex items-center gap-4 text-sm">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-black/40 border border-glassBorder rounded-md px-2 py-1 outline-none text-white cursor-pointer focus:border-primary/50 transition-colors"
        >
          {languages.map(l => (
            <option key={l.id} value={l.id} className="bg-background">{l.name}</option>
          ))}
        </select>

        <div className="h-4 w-px bg-glassBorder"></div>

        <select 
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-black/40 border border-glassBorder rounded-md px-2 py-1 outline-none text-white cursor-pointer focus:border-primary/50 transition-colors"
        >
          <option value="vs-dark" className="bg-background">VS Dark</option>
          <option value="light" className="bg-background">Light</option>
        </select>
        
        <button 
          onClick={resetSnippet}
          className="flex items-center gap-1.5 text-mutedForeground hover:text-white px-2 py-1 rounded-md hover:bg-black/20 transition-colors ml-2"
        >
          <RefreshCcw size={14} />
          Reset
        </button>
      </div>

      <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-glassBorder">
        <button 
          onClick={() => setViewMode('editor')}
          className={`px-3 py-1 rounded-md flex items-center gap-2 text-xs transition-colors ${viewMode === 'editor' ? 'bg-black/60 shadow-inner border border-white/5 text-primary font-medium' : 'text-mutedForeground hover:text-white'}`}
        >
          <Layout size={14} />
          Editor
        </button>
        <button 
          onClick={() => setViewMode('split')}
          className={`px-3 py-1 rounded-md flex items-center gap-2 text-xs transition-colors ${viewMode === 'split' ? 'bg-black/60 shadow-inner border border-white/5 text-primary font-medium' : 'text-mutedForeground hover:text-white'}`}
        >
          <Columns size={14} />
          Split
        </button>
        <button 
          onClick={() => setViewMode('preview')}
          className={`px-3 py-1 rounded-md flex items-center gap-2 text-xs transition-colors ${viewMode === 'preview' ? 'bg-black/60 shadow-inner border border-white/5 text-primary font-medium' : 'text-mutedForeground hover:text-white'}`}
        >
          <Layout size={14} className="rotate-90" />
          Preview
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
