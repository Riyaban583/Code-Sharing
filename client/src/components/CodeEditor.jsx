import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

import {
  Code2,
  Sparkles,
  Circle
} from "lucide-react";

import { motion } from "framer-motion";

import { useEditorStore } from "../store/useEditorStore";

const CodeEditor = ({ language }) => {

  const {
    code,
    setCode,
    theme
  } = useEditorStore();

  const editorRef = useRef(null);

  // Editor Mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // Code Change
  const handleEditorChange = (value = "") => {
    setCode(language, value);
  };

  const isDark = theme === "vs-dark";

  return (

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{
        scale: 1.005
      }}
      className={`relative w-full h-full rounded-[30px] overflow-hidden border transition-all duration-300 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,140,0,0.15)] ${
        isDark
          ? "bg-zinc-950/90 border-orange-500/20"
          : "bg-white border-orange-200"
      }`}
    >

      {/* Top Glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

      {/* Floating Glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[180px] h-[180px] bg-orange-500/10 blur-3xl rounded-full"></div>

      {/* Header */}
      <div
        className={`relative z-10 flex items-center justify-between px-5 py-4 border-b backdrop-blur-xl ${
          isDark
            ? "bg-zinc-900/70 border-orange-500/10"
            : "bg-orange-50 border-orange-200"
        }`}
      >

        {/* Left Section */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08
            }}
            className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,140,0,0.4)]"
          >

            <div className="absolute inset-0 rounded-2xl bg-orange-500 blur-xl opacity-40"></div>

            <Code2
              className="relative z-10"
              size={20}
            />

          </motion.div>

          {/* Title */}
          <div>

            <h2
              className={`text-lg font-bold tracking-wide ${
                isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >

              {language} Editor

            </h2>

            <p className="text-xs text-orange-400 uppercase tracking-widest">
              Live Coding Workspace
            </p>

          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Live Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">

            <Circle
              size={10}
              className="fill-green-400 text-green-400 animate-pulse"
            />

            <span className="text-xs text-orange-300 font-medium">
              LIVE
            </span>

          </div>

          {/* Language Badge */}
          <motion.div
            whileHover={{
              scale: 1.05
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border ${
              isDark
                ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                : "bg-orange-100 text-orange-600 border-orange-200"
            }`}
          >

            {language}

          </motion.div>

          {/* AI Badge */}
          <motion.div
            whileHover={{
              scale: 1.05
            }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 border border-orange-500/20"
          >

            <Sparkles
              size={14}
              className="text-orange-400"
            />

            <span className="text-xs text-orange-300 font-semibold">
              AI Enabled
            </span>

          </motion.div>

        </div>

      </div>

      {/* Monaco Editor */}
      <div className="h-[calc(100%-78px)] relative">

        {/* Side Glow */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-orange-500/40 via-transparent to-orange-500/40 z-10"></div>

        <Editor
          height="100%"
          language={language}
          value={code[language] || ""}
          theme={isDark ? "vs-dark" : "light"}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{

            minimap: {
              enabled: false
            },

            fontSize: 16,

            fontFamily:
              "'JetBrains Mono', 'Fira Code', monospace",

            lineHeight: 28,

            fontLigatures: true,

            padding: {
              top: 20,
              bottom: 20,
            },

            scrollBeyondLastLine: false,

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            formatOnPaste: true,

            formatOnType: true,

            autoClosingBrackets: "always",

            autoClosingQuotes: "always",

            matchBrackets: "always",

            wordWrap: "on",

            suggestOnTriggerCharacters: true,

            renderLineHighlight: "all",

            roundedSelection: true,

            cursorWidth: 3,

            cursorStyle: "line",

            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },

          }}

          loading={

            <div
              className={`flex flex-col items-center justify-center h-full gap-4 ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >

              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear"
                }}
                className="w-10 h-10 border-4 border-orange-500/20 border-t-orange-500 rounded-full"
              />

              <p className="text-orange-400 font-medium">
                Loading Futuristic Editor...
              </p>

            </div>

          }
        />

      </div>

    </motion.div>
  );
};

export default CodeEditor;