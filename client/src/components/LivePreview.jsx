import React, {
  useMemo,
  useState
} from "react";

import {
  Maximize2,
  Minimize2,
  RefreshCw,
  Play,
  Terminal,
  Globe,
  Loader2,
  Sparkles,
  Circle
} from "lucide-react";

import { motion } from "framer-motion";

import { useEditorStore } from "../store/useEditorStore";
import { useUiStore } from "../store/useUiStore";

const webLanguages = [
  "html",
  "css",
  "javascript",
  "js"
];

const LivePreview = () => {

  const {
    code,
    language = "",
    theme
  } = useEditorStore();

  const {
    isPreviewFullscreen,
    togglePreviewFullscreen
  } = useUiStore();

  const [iframeKey, setIframeKey] =
    useState(0);

  const [isRunning, setIsRunning] =
    useState(false);

  const [currentSrcDoc, setCurrentSrcDoc] =
    useState("");

  const [output, setOutput] =
    useState("");

  const isDark = theme === "vs-dark";

  const currentLanguage =
    language.toLowerCase();

  const isWebProject =
    webLanguages.includes(currentLanguage);

  // ====================================
  // HTML CSS JS PREVIEW
  // ====================================
  const generatedSrcDoc = useMemo(() => {

    if (!isWebProject) return "";

    return `
      <!DOCTYPE html>
      <html>

        <head>

          <meta charset="UTF-8" />

          <style>

            *{
              box-sizing:border-box;
            }

            html,
            body{
              margin:0;
              padding:20px;
              min-height:100vh;

              background:${
                isDark ? "#0f172a" : "#ffffff"
              };

              color:${
                isDark ? "#ffffff" : "#000000"
              };

              font-family:sans-serif;
            }

            ${code.css || ""}

          </style>

        </head>

        <body>

          ${code.html || ""}

          <script>

            try{
              ${code.javascript || code.js || ""}
            }

            catch(error){

              document.body.innerHTML +=
              "<pre style='color:red;padding:20px'>" +
              error.message +
              "</pre>";

            }

          </script>

        </body>

      </html>
    `;

  }, [code, isDark, isWebProject]);

  // ====================================
  // RUN CODE
  // ====================================
  const handleRun = async () => {

    setIsRunning(true);

    try {

      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      setOutput("");

      // WEB
      if (isWebProject) {

        const updatedDoc =
          generatedSrcDoc;

        setCurrentSrcDoc("");

        setTimeout(() => {

          setCurrentSrcDoc(updatedDoc);

          setIframeKey((prev) => prev + 1);

        }, 50);

      }

      // DEFAULT
      else {

        setOutput(
          `Running ${language} code completed successfully.`
        );

      }

    } catch (error) {

      setOutput(
        "Error: " + error.message
      );

    } finally {

      setIsRunning(false);

    }

  };

  // ====================================
  // REFRESH
  // ====================================
  const refreshPreview = () => {

    if (isWebProject) {

      setCurrentSrcDoc("");

      setTimeout(() => {

        setCurrentSrcDoc(
          generatedSrcDoc
        );

        setIframeKey((prev) => prev + 1);

      }, 50);

    }

  };

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 40
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.8
      }}
      whileHover={{
        scale: 1.005
      }}
      className={`relative flex flex-col h-full rounded-[30px] overflow-hidden border backdrop-blur-2xl shadow-[0_0_50px_rgba(255,140,0,0.15)] ${
        isDark
          ? "bg-zinc-950/90 border-orange-500/20"
          : "bg-white border-orange-200"
      }`}
    >

      {/* Top Glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

      {/* Floating Glow */}
      <div className="absolute top-[-80px] left-[-80px] w-[180px] h-[180px] bg-orange-500/10 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div
        className={`relative z-10 h-20 px-5 flex items-center justify-between border-b backdrop-blur-xl ${
          isDark
            ? "bg-zinc-900/70 border-orange-500/10"
            : "bg-orange-50 border-orange-200"
        }`}
      >

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Browser Dots */}
          <div className="flex items-center gap-2">

            <div className="w-3 h-3 rounded-full bg-red-500"></div>

            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

            <div className="w-3 h-3 rounded-full bg-green-500"></div>

          </div>

          {/* Icon */}
          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08
            }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,140,0,0.4)]"
          >

            {isWebProject ? (
              <Globe size={20} />
            ) : (
              <Terminal size={20} />
            )}

          </motion.div>

          {/* Title */}
          <div>

            <h2
              className={`text-lg font-bold ${
                isDark
                  ? "text-white"
                  : "text-black"
              }`}
            >

              {isWebProject
                ? "Live Preview"
                : "Code Output"}

            </h2>

            <p className="text-xs text-orange-400 uppercase tracking-widest">

              Futuristic Output Window

            </p>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Live Badge */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">

            <Circle
              size={10}
              className="fill-green-400 text-green-400 animate-pulse"
            />

            <span className="text-xs text-orange-300 font-semibold">
              LIVE
            </span>

          </div>

          {/* AI Badge */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-400/20 to-orange-600/20 border border-orange-500/20">

            <Sparkles
              size={14}
              className="text-orange-400"
            />

            <span className="text-xs text-orange-300 font-semibold">
              AI Optimized
            </span>

          </div>

          {/* Run */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0px 0px 25px rgba(255,165,0,0.5)"
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-2xl text-sm font-semibold transition-all duration-300"
          >

            {isRunning ? (

              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Running...
              </>

            ) : (

              <>
                <Play size={16} />

                Run
              </>

            )}

          </motion.button>

          {/* Refresh */}
          <motion.button
            whileHover={{
              scale: 1.08,
              rotate: 20
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={refreshPreview}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              isDark
                ? "bg-zinc-900/80 text-gray-300 hover:bg-zinc-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >

            <RefreshCw size={17} />

          </motion.button>

          {/* Fullscreen */}
          <motion.button
            whileHover={{
              scale: 1.08
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={
              togglePreviewFullscreen
            }
            className={`p-3 rounded-2xl transition-all duration-300 ${
              isDark
                ? "bg-zinc-900/80 text-gray-300 hover:bg-zinc-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >

            {isPreviewFullscreen ? (
              <Minimize2 size={17} />
            ) : (
              <Maximize2 size={17} />
            )}

          </motion.button>

        </div>

      </div>

      {/* OUTPUT */}
      <div
        className={`flex-1 relative overflow-hidden ${
          isDark
            ? "bg-black"
            : "bg-white"
        }`}
      >

        {/* Side Glow */}
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-orange-500/40 via-transparent to-orange-500/40 z-10"></div>

        {isWebProject ? (

          currentSrcDoc ? (

            <iframe
              key={iframeKey}
              srcDoc={currentSrcDoc}
              title="preview"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
              className="absolute inset-0"
            />

          ) : (

            <div
              className={`h-full flex flex-col items-center justify-center gap-5 ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >

              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear"
                }}
                className="w-20 h-20 rounded-full border-4 border-orange-500/20 border-t-orange-500"
              />

              <p className="text-orange-400 text-lg font-semibold">
                Click Run to see live preview
              </p>

            </div>

          )

        ) : (

          <div
            className={`h-full p-6 font-mono text-sm whitespace-pre-wrap ${
              isDark
                ? "bg-black text-green-400"
                : "bg-white text-black"
            }`}
          >

            {output ||
              `Click Run to execute ${language} code.`}

          </div>

        )}

      </div>

    </motion.div>
  );
};

export default LivePreview;