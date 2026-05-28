import React, {
  useState,
  useCallback,
  useRef,
  useEffect
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  X,
  Send,
  Sparkles,
  Code2,
  MessageSquare,
  Bot,
  Cpu,
  Loader2
} from "lucide-react";

import { GoogleGenAI } from "@google/genai";

import { useUiStore } from "../store/useUiStore";
import { useEditorStore } from "../store/useEditorStore";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const suggestionPrompts = [
  "Optimize my code",
  "Explain this logic",
  "Fix bugs in code",
  "Generate clean UI",
];

const AIPanel = () => {

  const {
    isAIPanelOpen,
    toggleAIPanel
  } = useUiStore();

  const {
    language,
    theme
  } = useEditorStore();

  const isDark = theme === "vs-dark";

  const [messages, setMessages] =
    useState([
      {
        id: 1,
        role: "assistant",
        content:
          "👋 Welcome to NoteCode AI Assistant.\n\nAsk me anything about your code, UI, debugging, optimization, or project architecture.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, isTyping]);

  // ====================================
  // SEND MESSAGE
  // ====================================
  const handleSubmit = useCallback(
    async (e) => {

      e.preventDefault();

      if (!input.trim() || isTyping)
        return;

      const currentInput = input;

      const userMessage = {
        id: Date.now(),
        role: "user",
        content: currentInput,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      setInput("");

      setIsTyping(true);

      try {

        const result =
          await ai.models.generateContent({

            model:
              "gemini-2.5-flash",

            contents: [
              {
                role: "user",

                parts: [
                  {
                    text: `You are a futuristic ${language} coding assistant.

User Query:
${currentInput}

Provide clear, developer-friendly, modern coding guidance.`,
                  },
                ],
              },
            ],

            config: {
              temperature: 0.7,
            },

          });

        const aiReply =
          result?.text ||
          "No response generated.";

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: aiReply,
          },
        ]);

      } catch (error) {

        console.error(
          "Gemini SDK Error:",
          error
        );

        let errorMessage =
          "⚠️ Unable to fetch AI response.";

        if (
          error.message?.includes("404")
        ) {
          errorMessage =
            "⚠️ AI model not found.";
        }

        if (
          error.message?.includes("429")
        ) {
          errorMessage =
            "⚠️ Rate limit exceeded.";
        }

        if (
          error.message?.includes("401")
        ) {
          errorMessage =
            "⚠️ Invalid Gemini API Key.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "assistant",
            content: errorMessage,
          },
        ]);

      } finally {

        setIsTyping(false);

      }

    },
    [input, language, isTyping]
  );

  // ====================================
  // RENDER MESSAGE
  // ====================================
  const renderMessage = (msg) => {

    const isAssistant =
      msg.role === "assistant";

    return (

      <motion.div
        key={msg.id}

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className={`flex gap-3 ${
          !isAssistant
            ? "flex-row-reverse"
            : ""
        }`}
      >

        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
            isAssistant
              ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-[0_0_20px_rgba(255,140,0,0.4)]"
              : "bg-zinc-800 text-orange-400 border border-orange-500/20"
          }`}
        >

          {isAssistant ? (
            <Bot size={18} />
          ) : (
            <MessageSquare size={18} />
          )}

        </div>

        {/* Bubble */}
        <div
          className={`relative overflow-hidden p-4 rounded-3xl max-w-[85%] whitespace-pre-wrap break-words text-sm leading-7 border backdrop-blur-xl ${
            isAssistant
              ? isDark
                ? "bg-zinc-900/80 border-orange-500/10 text-gray-200 rounded-tl-none"
                : "bg-orange-50 border-orange-200 text-black rounded-tl-none"
              : "bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-tr-none border-orange-500/20"
          }`}
        >

          {/* Glow */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

          {msg.content}

        </div>

      </motion.div>

    );

  };

  return (

    <AnimatePresence>

      {isAIPanelOpen && (

        <motion.div
          initial={{
            x: 450,
            opacity: 0
          }}

          animate={{
            x: 0,
            opacity: 1
          }}

          exit={{
            x: 450,
            opacity: 0
          }}

          transition={{
            type: "spring",
            damping: 25,
            stiffness: 220
          }}

          className={`fixed top-24 right-5 bottom-5 w-[380px] lg:w-[430px] z-40 flex flex-col overflow-hidden rounded-[35px] border backdrop-blur-2xl shadow-[0_0_60px_rgba(255,140,0,0.2)] ${
            isDark
              ? "bg-zinc-950/95 border-orange-500/20"
              : "bg-white border-orange-200"
          }`}
        >

          {/* Glow */}
          <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-orange-500/10 blur-3xl rounded-full"></div>

          {/* Top Border */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

          {/* HEADER */}
          <div className="relative z-10 flex items-center justify-between px-5 py-5 border-b border-orange-500/10">

            {/* Left */}
            <div className="flex items-center gap-4">

              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.08
                }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,140,0,0.4)]"
              >

                <Sparkles size={22} />

              </motion.div>

              <div>

                <h3
                  className={`text-2xl font-black ${
                    isDark
                      ? "text-white"
                      : "text-black"
                  }`}
                >

                  AI Assistant

                </h3>

                <p className="text-xs text-orange-400 uppercase tracking-widest">

                  Powered by Gemini AI

                </p>

              </div>

            </div>

            {/* Close */}
            <motion.button
              whileHover={{
                scale: 1.08,
                rotate: 90
              }}

              whileTap={{
                scale: 0.95
              }}

              onClick={toggleAIPanel}

              className={`p-3 rounded-2xl transition-all duration-300 ${
                isDark
                  ? "bg-zinc-900/80 text-white hover:bg-zinc-800"
                  : "bg-orange-50 text-black"
              }`}
            >

              <X size={18} />

            </motion.button>

          </div>

          {/* SUGGESTIONS */}
          <div className="relative z-10 px-5 py-4 flex flex-wrap gap-2 border-b border-orange-500/10">

            {suggestionPrompts.map(
              (prompt, index) => (

                <motion.button
                  key={index}

                  whileHover={{
                    scale: 1.05
                  }}

                  whileTap={{
                    scale: 0.95
                  }}

                  onClick={() =>
                    setInput(prompt)
                  }

                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                    isDark
                      ? "bg-zinc-900/80 text-orange-300 border border-orange-500/10 hover:bg-zinc-800"
                      : "bg-orange-50 text-orange-600 border border-orange-200"
                  }`}
                >

                  {prompt}

                </motion.button>

              )
            )}

          </div>

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">

            {messages.map(renderMessage)}

            {/* Typing Loader */}
            {isTyping && (

              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">

                  <Cpu size={18} />

                </div>

                <div
                  className={`p-4 rounded-3xl rounded-tl-none border backdrop-blur-xl ${
                    isDark
                      ? "bg-zinc-900/80 border-orange-500/10"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >

                  <div className="flex gap-2">

                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"></div>

                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-150"></div>

                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-300"></div>

                  </div>

                </div>

              </div>

            )}

            <div ref={messagesEndRef} />

          </div>

          {/* INPUT */}
          <div className="relative z-10 p-4 border-t border-orange-500/10">

            <form
              onSubmit={handleSubmit}
              className="flex gap-3"
            >

              <input
                value={input}

                onChange={(e) =>
                  setInput(e.target.value)
                }

                placeholder="Ask AI anything..."

                disabled={isTyping}

                className={`flex-1 px-5 py-4 rounded-2xl outline-none border transition-all duration-300 ${
                  isDark
                    ? "bg-zinc-900/80 text-white border-orange-500/10 focus:border-orange-500"
                    : "bg-orange-50 text-black border-orange-200"
                }`}
              />

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0px 0px 25px rgba(255,165,0,0.4)"
                }}

                whileTap={{
                  scale: 0.95
                }}

                type="submit"

                disabled={
                  !input.trim() ||
                  isTyping
                }

                className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 text-white flex items-center justify-center disabled:opacity-50 shadow-[0_0_20px_rgba(255,140,0,0.3)]"
              >

                {isTyping ? (

                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                ) : (

                  <Send size={20} />

                )}

              </motion.button>

            </form>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
};

export default AIPanel;