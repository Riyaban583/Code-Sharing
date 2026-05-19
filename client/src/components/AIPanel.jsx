import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../store/useUiStore';
import { useEditorStore } from '../store/useEditorStore';
import { X, Send, Sparkles, Code2, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const AIPanel = () => {
  const { isAIPanelOpen, toggleAIPanel } = useUiStore();
  const { language } = useEditorStore();

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content:
        'Hi! I am your AI coding assistant. How can I help you with your code today?'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!input.trim() || isTyping) return;

      const currentInput = input;

      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: currentInput
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a ${language} coding assistant.

User Query:
${currentInput}

Provide helpful coding answers clearly.`
                }
              ]
            }
          ],
          config: {
            temperature: 0.7,
          },
        });

        const aiReply =
          result?.text || "No response generated.";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: aiReply
          }
        ]);

      } catch (error) {
        console.error("Gemini SDK Error:", error);

        let errorMessage =
          "⚠️ Error: Unable to fetch response from Gemini.";

        if (error.message?.includes("404")) {
          errorMessage =
            "⚠️ Error: Model not found.";
        }

        if (error.message?.includes("429")) {
          errorMessage =
            "⚠️ Rate limit exceeded. Try again later.";
        }

        if (error.message?.includes("401")) {
          errorMessage =
            "⚠️ Invalid Gemini API Key.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            content: errorMessage
          }
        ]);

      } finally {
        setIsTyping(false);
      }
    },
    [input, language, isTyping]
  );

  const renderMessage = (msg) => {
    const isAssistant = msg.role === 'assistant';

    return (
      <div
        key={msg.id}
        className={`flex gap-3 text-sm ${
          !isAssistant ? 'flex-row-reverse' : ''
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isAssistant
              ? 'bg-accent/20 text-accent'
              : 'bg-primary/20 text-primary'
          }`}
        >
          {isAssistant ? (
            <Code2 size={14} />
          ) : (
            <MessageSquare size={14} />
          )}
        </div>

        <div
          className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap break-words ${
            isAssistant
              ? 'bg-secondary/50 text-foreground rounded-tl-none border border-glassBorder'
              : 'bg-primary/90 text-white rounded-tr-none'
          }`}
        >
          {msg.content}
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isAIPanelOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200
          }}
          className="fixed top-20 right-4 w-80 lg:w-96 bottom-4 z-40 flex flex-col glass-panel overflow-hidden border-l border-t border-glassBorder shadow-[0_8px_32px_rgba(139,92,246,0.15)]"
        >
          <div className="flex items-center justify-between p-4 border-b border-glassBorder bg-secondary/50">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles size={18} />
              <h3 className="font-semibold text-purple-900">
                AI Assistant
              </h3>
            </div>

            <button
              onClick={toggleAIPanel}
              className="p-1 hover:bg-black/5 rounded-md"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map(renderMessage)}

            {isTyping && (
              <div className="flex gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles size={14} />
                </div>

                <div className="p-4 rounded-2xl bg-secondary/50 flex space-x-1">
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce delay-150" />
                  <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-glassBorder bg-background/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI..."
                disabled={isTyping}
                className="flex-1 bg-secondary/50 border border-glassBorder rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent/50 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-accent text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIPanel;