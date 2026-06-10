import React from "react";
import {
  Share2,
  Grid3X3,
  Sparkles,
  Sun,
  Moon,
  Code2,
  User,
  BellDot
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useEditorStore } from "../store/useEditorStore";
import { useUiStore } from "../store/useUiStore";

const Navbar = () => {

  const { isShared, theme, setTheme } = useEditorStore();

  const {
    toggleAIPanel,
    setShareModalOpen
  } = useUiStore();

  const isDark = theme === "vs-dark";

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "vs-dark");
  };

  return (

    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`sticky top-0 z-50 px-3 md:px-6 py-3 flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-center lg:justify-between border-b backdrop-blur-2xl ${
        isDark
          ? "bg-black/70 border-orange-500/10"
          : "bg-white/70 border-orange-200"
      }`}
    >

      {/* Left Section */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 group"
        >

          {/* Animated Logo */}
          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08
            }}
            className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,140,0,0.5)]"
          >

            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-orange-500 blur-xl opacity-40"></div>

            <Code2 size={24} className="relative z-10" />

          </motion.div>

          {/* Text */}
          <div>

           <h1
  className={`text-lg md:text-2xl font-black tracking-wide ${
    isDark ? "text-white" : "text-black"
  }`}
>

              Note
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Code
              </span>

            </h1>

            <p className="hidden sm:block text-xs text-orange-400 tracking-widest uppercase">
  Futuristic Code Editor
</p>

          </div>

        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-4">

          {/* Gallery */}
          <motion.div
            whileHover={{ scale: 1.05 }}
          >

            <Link
              to="/gallery"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-orange-400 hover:bg-zinc-900/80"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              }`}
            >

              <Grid3X3 size={18} />

              Gallery

            </Link>

          </motion.div>

          {/* Live Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">

            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

            <span className="text-sm text-orange-300">
              Live Workspace
            </span>

          </div>

        </div>

      </div>

      {/* Right Section */}
     <div className="w-full lg:w-auto flex flex-wrap items-center justify-center gap-2">

        {/* Notifications */}
        <motion.button
          whileHover={{
            scale: 1.08
          }}
          whileTap={{
            scale: 0.95
          }}
          className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 ${
            isDark
              ? "bg-zinc-900/80 text-orange-400 hover:bg-zinc-800"
              : "bg-orange-50 text-orange-600"
          }`}
        >

          <BellDot size={18} />

        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 10
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={handleThemeToggle}
          className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 ${
            isDark
              ? "bg-zinc-900/80 text-orange-400 hover:bg-zinc-800"
              : "bg-orange-50 text-orange-600"
          }`}
        >

          {isDark ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}

        </motion.button>

        {/* AI Assistant */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px rgba(255,165,0,0.4)"
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={toggleAIPanel}
          className={`px-2 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm flex items-center gap-2 transition-all duration-300 font-semibold ${
            isDark
              ? "bg-zinc-900/80 text-orange-400 hover:bg-zinc-800"
              : "bg-orange-50 text-orange-600"
          }`}
        >

          <Sparkles size={18} />
          <span className="hidden md:inline">
  AI Assistant
</span>

        </motion.button>

        {/* Share Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 30px rgba(255,165,0,0.5)"
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() =>
            setShareModalOpen(true)
          }
          disabled={isShared}
          className={`px-2 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm flex items-center gap-2 text-white font-semibold transition-all duration-300 ${
            isShared
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
          }`}
        >

          <Share2 size={18} />

         <span className="hidden md:inline">
  {isShared ? "Shared" : "Share"}
</span>

        </motion.button>

        {/* Profile */}
        <motion.button
          whileHover={{
            scale: 1.08
          }}
          whileTap={{
            scale: 0.95
          }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,140,0,0.4)]"
        >

          <User size={20} />

        </motion.button>

      </div>

    </motion.nav>
  );
};

export default Navbar;