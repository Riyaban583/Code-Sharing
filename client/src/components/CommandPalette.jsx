import React, { useEffect, useState } from 'react';
import { useUiStore } from '../store/useUiStore';
import { useEditorStore } from '../store/useEditorStore';
import { Search, Monitor, Moon, Sun, Copy, Share2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandPalette = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen, toggleAIPanel, setShareModalOpen } = useUiStore();
  const { setTheme } = useEditorStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const actions = [
    { id: 1, label: 'Share Snippet', icon: <Share2 size={16} />, action: () => { setShareModalOpen(true); setCommandPaletteOpen(false); } },
    { id: 2, label: 'Toggle AI Assistant', icon: <Terminal size={16} />, action: () => { toggleAIPanel(); setCommandPaletteOpen(false); } },
    { id: 3, label: 'Theme: Dark', icon: <Moon size={16} />, action: () => { setTheme('vs-dark'); setCommandPaletteOpen(false); } },
    { id: 4, label: 'Theme: Light', icon: <Sun size={16} />, action: () => { setTheme('light'); setCommandPaletteOpen(false); } },
  ];

  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-start justify-center pt-[15vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-lg glass-panel border border-glassBorder shadow-2xl overflow-hidden"
        >
          <div className="flex items-center px-4 border-b border-glassBorder bg-secondary/30">
            <Search size={20} className="text-mutedForeground" />
            <input 
              autoFocus
              type="text" 
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none focus:outline-none text-foreground px-3 py-4 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="text-xs text-mutedForeground bg-black/40 px-2 py-1 rounded">ESC</div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto py-2">
            <div className="px-3 py-1.5 text-xs font-semibold text-mutedForeground uppercase tracking-wider">
              Suggestions
            </div>
            {filteredActions.length > 0 ? (
              filteredActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm text-foreground hover:bg-white/10 hover:text-primary transition-colors focus:bg-white/10 focus:outline-none"
                >
                  <div className="text-mutedForeground group-hover:text-primary">
                    {action.icon}
                  </div>
                  {action.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-mutedForeground">
                No commands found.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;