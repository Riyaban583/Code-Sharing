import React from "react";
import {
  Layout,
  Columns,
  RefreshCcw,
  Code2,
  Sparkles
} from "lucide-react";

import { motion } from "framer-motion";

import { useEditorStore } from "../store/useEditorStore";
import { useUiStore } from "../store/useUiStore";

const ControlPanel = () => {

  const {
    language,
    setLanguage,
    theme,
    resetSnippet
  } = useEditorStore();

  const {
    setViewMode,
    viewMode
  } = useUiStore();

  const languages = [
    { id: "html", name: "HTML" },
    { id: "css", name: "CSS" },
    { id: "javascript", name: "JavaScript" },
    { id: "typescript", name: "TypeScript" },
    { id: "python", name: "Python" },
    { id: "cpp", name: "C++" },
    { id: "java", name: "Java" },
    { id: "json", name: "JSON" },
    { id: "rust", name: "Rust" }
  ];

  const isDark = theme === "vs-dark";

  return (

    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`relative z-20 px-3 md:px-6 py-3 flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-center lg:justify-between border-b backdrop-blur-2xl ${
        isDark
          ? "bg-black/60 border-orange-500/10"
          : "bg-white/70 border-orange-200"
      }`}
    >

      {/* Left Section */}
     <div className="flex flex-wrap items-center gap-2 md:gap-5 w-full lg:w-auto">
        {/* Language Dropdown */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative"
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-2xl"></div>

          <Code2
            size={18}
            className="absolute left-4 top-4 text-orange-500 z-10"
          />

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
  className={`relative z-10 pl-12 pr-4 py-3 w-full md:w-auto rounded-2xl border outline-none text-sm font-semibold transition-all duration-300 backdrop-blur-xl ${
              isDark
                ? "bg-zinc-900/80 text-white border-orange-500/20 focus:border-orange-500"
                : "bg-white text-black border-orange-200"
            }`}
          >

            {languages.map((lang) => (

              <option
                key={lang.id}
                value={lang.id}
              >
                {lang.name}
              </option>

            ))}

          </select>

        </motion.div>

        {/* Reset Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(255,165,0,0.3)"
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={resetSnippet}
          className={`flex items-center justify-center gap-2 px-4 md:px-5 py-3 text-xs md:text-sm font-semibold transition-all duration-300 ${
            isDark
              ? "bg-zinc-900/80 text-white hover:bg-zinc-800 border border-orange-500/10"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >

          <RefreshCcw size={17} />

          Reset

        </motion.button>

        {/* AI Status */}
        {/* <div className="hidden md:flex items-center gap-2 px-4 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">

          <Sparkles
            size={16}
            className="text-orange-400"
          />

          <span className="text-sm text-orange-300 font-medium">
            AI Ready
          </span>

        </div> */}

      </div>

      {/* Right Section */}
      <div
  className={`w-full lg:w-auto flex items-center justify-center p-1.5 rounded-2xl overflow-x-auto ${
          isDark
            ? "bg-zinc-900/80 border border-orange-500/10"
            : "bg-gray-100"
        }`}
      >

        {/* Editor */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setViewMode("editor")
          }
          className={`px-3 md:px-5 py-3 rounded-xl flex items-center gap-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
            viewMode === "editor"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-[0_0_20px_rgba(255,140,0,0.5)]"
              : isDark
              ? "text-gray-300 hover:bg-zinc-800"
              : "text-gray-700"
          }`}
        >

          <Layout size={17} />

          Editor

        </motion.button>

        {/* Split */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setViewMode("split")
          }
          className={`hidden lg:flex px-3 md:px-5 py-3 rounded-xl flex items-center gap-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
            viewMode === "split"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-[0_0_20px_rgba(255,140,0,0.5)]"
              : isDark
              ? "text-gray-300 hover:bg-zinc-800"
              : "text-gray-700"
          }`}
        >

          <Columns size={17} />

          Split

        </motion.button>

        {/* Output */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setViewMode("preview")
          }
          className={`px-3 md:px-5 py-3 rounded-xl flex items-center gap-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
            viewMode === "preview"
              ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-[0_0_20px_rgba(255,140,0,0.5)]"
              : isDark
              ? "text-gray-300 hover:bg-zinc-800"
              : "text-gray-700"
          }`}
        >

          <Layout
            size={17}
            className="rotate-90"
          />

          Output

        </motion.button>

      </div>

    </motion.div>
  );
};

export default ControlPanel;