import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ControlPanel from '../components/ControlPanel';
import CodeEditor from '../components/CodeEditor';
import LivePreview from '../components/LivePreview';
import AIPanel from '../components/AIPanel';
import ShareModal from '../components/ShareModal';
import CommandPalette from '../components/CommandPalette';
import { useEditorStore } from '../store/useEditorStore';
import { useUiStore } from '../store/useUiStore';

const Home = () => {
  const { language } = useEditorStore();
  const { viewMode, isPreviewFullscreen, addToast } = useUiStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      addToast(`Loaded snippet ${id}`, 'success');
    }
  }, [id, addToast]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <ControlPanel />
      
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full w-full flex p-4 gap-4">
          
          {/* Editor Panel */}
          {(viewMode === 'split' || viewMode === 'editor') && !isPreviewFullscreen && (
            <div className={`glass-panel overflow-hidden relative ${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}>
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-20"></div>
              <CodeEditor language={language} />
            </div>
          )}

          {/* Preview Panel */}
          {(viewMode === 'split' || viewMode === 'preview' || isPreviewFullscreen) && (
            <div className={`glass-panel overflow-hidden transition-all duration-300 ease-in-out ${
              isPreviewFullscreen 
                ? 'fixed inset-4 z-50 shadow-2xl' 
                : viewMode === 'split' 
                  ? 'w-1/2' 
                  : 'w-full'
            }`}>
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-accent to-pink-500 z-20"></div>
              <LivePreview />
            </div>
          )}

        </div>
      </main>

      <AIPanel />
      <ShareModal />
      <CommandPalette />
    </div>
  );
};

export default Home;
