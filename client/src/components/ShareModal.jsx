import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../store/useUiStore';
import { useEditorStore } from '../store/useEditorStore';
import { X, Copy, Check, Link as LinkIcon } from 'lucide-react';

const ShareModal = () => {
  const { isShareModalOpen, setShareModalOpen, addToast } = useUiStore();
  const { code } = useEditorStore();

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareData, setShareData] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleShare = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/code/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: code, 
          language: "workspace",
          title: title || "Untitled Snippet",
          author: author || "Anonymous"
        })
      });

      const data = await response.json();

      const url = `http://localhost:5173/s/${data._id}`;

      setShareData({
        url,
        id: data._id
      });

      addToast("Snippet shared successfully!", "success");
    } catch (error) {
      console.error(error);
      addToast("Error sharing snippet", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shareData) return;

    navigator.clipboard.writeText(shareData.url);
    setCopied(true);
    addToast("Link copied!", "info");

    setTimeout(() => setCopied(false), 2000);
  };

  const resetModal = () => {
    setShareModalOpen(false);
    setTimeout(() => {
      setShareData(null);
      setTitle('');
      setAuthor('');
      setCopied(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isShareModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={resetModal}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
            className="fixed top-1/2 left-1/2 glass-panel p-6 rounded-xl w-[90vw] max-w-[400px] text-foreground z-[101] shadow-2xl"
          >
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Share Workspace</h2>
              <button onClick={resetModal} className="text-mutedForeground hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {!shareData ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-mutedForeground mb-1.5">Snippet Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Awesome Glassmorphism" 
                    className="w-full bg-secondary/50 border border-glassBorder rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-mutedForeground mb-1.5">Author Name</label>
                  <input 
                    type="text" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. John Doe" 
                    className="w-full bg-secondary/50 border border-glassBorder rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans text-white"
                  />
                </div>
                
                <button 
                  onClick={handleShare} 
                  disabled={loading}
                  className="w-full glass-button mt-4 py-2.5 rounded-lg font-medium text-white bg-primary flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <LinkIcon size={18} /> Generate Share Link
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center mb-4">
                  Successfully generated share link!
                </div>
                
                <div className="flex gap-2">
                  <input 
                    value={shareData.url} 
                    readOnly 
                    className="flex-1 bg-secondary/50 border border-glassBorder rounded-lg px-4 py-2.5 text-sm font-mono text-mutedForeground focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="p-2.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-glassBorder transition-colors text-white"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>
                
                <div className="text-center mt-6">
                  <button onClick={resetModal} className="text-sm text-mutedForeground hover:text-white transition-colors">
                    Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;