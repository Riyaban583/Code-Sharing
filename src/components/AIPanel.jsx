import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../store/useUiStore';
import { X, Send, Sparkles, Code2, MessageSquare, Loader2 } from 'lucide-react';
import { useEditorStore } from '../store/useEditorStore';

const AIPanel = () => {
  const { isAIPanelOpen, toggleAIPanel } = useUiStore();
  const { code, language } = useEditorStore();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI coding assistant. How can I help you with your code today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I see you are working on some ${language} code. I've analyzed it and here is an optimized suggestion for your work.`
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isAIPanelOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-20 right-4 w-80 lg:w-96 bottom-4 z-40 flex flex-col glass-panel overflow-hidden border-l border-t border-glassBorder shadow-[0_8px_32px_rgba(139,92,246,0.15)]"
        >
          <div className="flex items-center justify-between p-4 border-b border-glassBorder bg-secondary/50">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles size={18} />
              <h3 className="font-semibold text-purple-900">AI Assistant</h3>
            </div>
            <button 
              onClick={toggleAIPanel}
              className="p-1 hover:bg-black/5 rounded-md text-mutedForeground hover:text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 text-sm ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'assistant' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
                }`}>
                  {msg.role === 'assistant' ? <Code2 size={14} /> : <MessageSquare size={14} />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[85%] ${
                  msg.role === 'assistant' 
                    ? 'bg-secondary/50 text-foreground rounded-tl-none border border-glassBorder' 
                    : 'bg-primary/90 text-white rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                  <Sparkles size={14} />
                </div>
                <div className="p-4 rounded-2xl bg-secondary/50 rounded-tl-none border border-glassBorder flex space-x-1">
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-glassBorder bg-background/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Claude..."
                className="flex-1 bg-secondary/50 border border-glassBorder rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-sans"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-accent hover:bg-accent/90 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIPanel;
