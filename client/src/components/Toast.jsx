import React from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Sparkles
} from "lucide-react";

import { useUiStore } from "../store/useUiStore";
import { useEditorStore } from "../store/useEditorStore";

const ToastContainer = () => {

  const {
    toasts,
    removeToast
  } = useUiStore();

  const { theme } =
    useEditorStore();

  const isDark =
    theme === "vs-dark";

  // ====================================
  // TOAST CONFIG
  // ====================================
  const getToastConfig = (type) => {

    switch (type) {

      case "success":

        return {

          icon: (
            <CheckCircle2
              size={22}
              className="text-green-400"
            />
          ),

          border:
            "border-green-500/20",

          glow:
            "shadow-[0_0_30px_rgba(34,197,94,0.25)]",

          progress:
            "bg-green-400",

          badge:
            "bg-green-500/10 text-green-400",

        };

      case "error":

        return {

          icon: (
            <AlertCircle
              size={22}
              className="text-red-400"
            />
          ),

          border:
            "border-red-500/20",

          glow:
            "shadow-[0_0_30px_rgba(239,68,68,0.25)]",

          progress:
            "bg-red-400",

          badge:
            "bg-red-500/10 text-red-400",

        };

      default:

        return {

          icon: (
            <Info
              size={22}
              className="text-orange-400"
            />
          ),

          border:
            "border-orange-500/20",

          glow:
            "shadow-[0_0_30px_rgba(255,140,0,0.25)]",

          progress:
            "bg-orange-400",

          badge:
            "bg-orange-500/10 text-orange-400",

        };

    }

  };

  return (

    <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-4">

      <AnimatePresence>

        {toasts?.map((toast) => {

          const config =
            getToastConfig(toast.type);

          return (

            <motion.div
              key={toast.id}

              initial={{
                opacity: 0,
                x: 120,
                scale: 0.8,
                rotate: 2
              }}

              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                rotate: 0
              }}

              exit={{
                opacity: 0,
                x: 120,
                scale: 0.8
              }}

              transition={{
                duration: 0.35
              }}

              whileHover={{
                scale: 1.02
              }}

              className={`relative overflow-hidden min-w-[340px] max-w-[420px] rounded-[28px] border backdrop-blur-2xl px-5 py-5 flex items-start gap-4 transition-all duration-300 ${
                config.border
              } ${
                config.glow
              } ${
                isDark
                  ? "bg-zinc-950/90 text-white"
                  : "bg-white text-black"
              }`}
            >

              {/* Top Glow */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

              {/* Background Glow */}
              <div className="absolute top-[-60px] right-[-60px] w-[150px] h-[150px] bg-orange-500/10 blur-3xl rounded-full"></div>

              {/* Progress Bar */}
              <motion.div
                initial={{
                  width: "100%"
                }}

                animate={{
                  width: "0%"
                }}

                transition={{
                  duration: 4,
                  ease: "linear"
                }}

                className={`absolute bottom-0 left-0 h-[3px] ${config.progress}`}
              />

              {/* Icon */}
              <motion.div
                initial={{
                  scale: 0.8
                }}

                animate={{
                  scale: 1
                }}

                transition={{
                  type: "spring"
                }}

                className="relative z-10 mt-1"
              >

                {config.icon}

              </motion.div>

              {/* Content */}
              <div className="relative z-10 flex-1">

                {/* Badge */}
                <div className="flex items-center gap-2 mb-2">

                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${config.badge}`}
                  >

                    {toast.type || "info"}

                  </div>

                  <div className="flex items-center gap-1 text-orange-400 text-xs">

                    <Sparkles size={12} />

                    <span>
                      NoteCode
                    </span>

                  </div>

                </div>

                {/* Message */}
                <p
                  className={`text-sm leading-7 font-medium ${
                    isDark
                      ? "text-gray-200"
                      : "text-gray-700"
                  }`}
                >

                  {toast.message}

                </p>

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

                onClick={() =>
                  removeToast(toast.id)
                }

                className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${
                  isDark
                    ? "hover:bg-zinc-800 text-gray-400 hover:text-white"
                    : "hover:bg-orange-100 text-gray-500"
                }`}
              >

                <X size={16} />

              </motion.button>

            </motion.div>

          );

        })}

      </AnimatePresence>

    </div>
  );
};

export default ToastContainer;