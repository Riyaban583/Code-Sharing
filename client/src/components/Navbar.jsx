import React from 'react';
import { Share2, Play, Layout, Terminal, Grid3X3, Sparkles } from 'lucide-react';
import { useEditorStore } from '../store/useEditorStore';
import { useUiStore } from '../store/useUiStore';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isShared, shareSnippet } = useEditorStore();
  const { toggleAIPanel, setShareModalOpen } = useUiStore();

  return (
    <nav className="h-16 border-b border-glassBorder bg-glass backdrop-blur-glass flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all">
            N
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">NoteCode</span>
        </Link>
        <div className="h-6 w-px bg-glassBorder mx-2"></div>
        <Link to="/gallery" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-medium">
          <Grid3X3 size={16} />
          Gallery
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleAIPanel}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-accent bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-all shine-effect disabled:opacity-50"
        >
          <Sparkles size={16} />
          AI Assistant
        </button>
        
        <div className="h-6 w-px bg-glassBorder mx-1"></div>
        
        <button 
          onClick={() => setShareModalOpen(true)}
          disabled={isShared}
          className="glass-button flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 size={16} />
          {isShared ? 'Shared!' : 'Share'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
