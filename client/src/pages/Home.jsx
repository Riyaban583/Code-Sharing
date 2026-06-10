import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";
import ControlPanel from "../components/ControlPanel";
import CodeEditor from "../components/CodeEditor";
import LivePreview from "../components/LivePreview";
import AIPanel from "../components/AIPanel";
import ShareModal from "../components/ShareModal";
import CommandPalette from "../components/CommandPalette";
import ToastContainer from "../components/Toast";

// Stores
import { useEditorStore } from "../store/useEditorStore";
import { useUiStore } from "../store/useUiStore";

const Home = () => {
  const { language, setFullCode, theme } = useEditorStore();

  const {
    viewMode,
    isPreviewFullscreen,
    addToast
  } = useUiStore();

  const { id } = useParams();

  const isDark = theme === "vs-dark";
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch shared snippet
  useEffect(() => {
    if (!id) return;

    const fetchSnippet = async () => {
      try {
        const response = await fetch(
  `${API_URL}/api/code/${id}`
);

        if (!response.ok) {
          throw new Error("Snippet not found");
        }

        const data = await response.json();

        if (
          data.code &&
          typeof data.code === "object"
        ) {
          setFullCode(data.code);

          addToast(
            `Loaded: ${data.title || "Snippet"}`,
            "success"
          );
        } 
        else if (
          data.code &&
          typeof data.code === "string"
        ) {
          setFullCode({
            html: data.code,
            css: "",
            javascript: ""
          });

          addToast(
            `Loaded: ${data.title || "Snippet"}`,
            "success"
          );
        }
      } catch (error) {
        console.error(error);

        addToast(
          "Failed to load snippet",
          "error"
        );
      }
    };

    fetchSnippet();
  }, [id, setFullCode, addToast]);

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden ${
        isDark
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      {/* Navbar */}
      <Navbar />

      {/* Top Controls */}
      <ControlPanel />

      {/* Main Editor Section */}
     <main className="flex-1 overflow-y-auto p-2 md:p-4">
       <div className="h-full flex flex-col lg:flex-row gap-4 relative">
          
          {/* Code Editor */}
          {(viewMode === "editor" ||
            viewMode === "split") &&
            !isPreviewFullscreen && (
              <div
               className={`rounded-2xl overflow-hidden border shadow-lg ${
  viewMode === "split"
    ? "w-full lg:w-1/2 h-[350px] lg:h-full"
    : "w-full"
                } ${
                  isDark
                    ? "bg-black border-orange-500/20"
                    : "bg-white border-orange-200"
                }`}
              >
                <CodeEditor language={language} />
              </div>
            )}

          {/* Preview */}
          {(viewMode === "preview" ||
            viewMode === "split" ||
            isPreviewFullscreen) && (
            <div
             className={`rounded-2xl overflow-hidden border shadow-lg ${
  isPreviewFullscreen
    ? "fixed inset-4 z-50"
    : viewMode === "split"
    ? "w-full lg:w-1/2 h-[300px] lg:h-full"
    : "w-full h-full"
              } ${
                isDark
                  ? "bg-black border-orange-500/20"
                  : "bg-white border-orange-200"
              }`}
            >
              <LivePreview />
            </div>
          )}
        </div>
      </main>

      {/* Global Components */}
      <AIPanel />
      <ShareModal />
      <CommandPalette />
      <ToastContainer />
    </div>
  );
};

export default Home;