import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Code,
  Terminal,
  Paintbrush,
  ArrowLeft,
  ExternalLink
} from "lucide-react";

import Navbar from "../components/Navbar";
import { useEditorStore } from "../store/useEditorStore";

const ViewCode = () => {
  const { id } = useParams();
  const { theme } = useEditorStore();

  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isDark = theme === "vs-dark";
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(
  `${API_URL}/api/code/${id}`
);

        if (!response.ok) {
          throw new Error("Snippet not found");
        }

        const data = await response.json();
        setCodeData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [id]);

  const renderCodeBlock = (
    title,
    codeString,
    icon
  ) => {
    if (!codeString) return null;

    return (
      <div
        className={`rounded-2xl overflow-hidden border shadow-lg ${
          isDark
            ? "bg-zinc-900 border-orange-500/20"
            : "bg-white border-orange-200"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-3 px-5 py-4 border-b ${
            isDark
              ? "bg-black border-orange-500/20"
              : "bg-orange-50 border-orange-200"
          }`}
        >
          {icon}
          <h3 className="font-semibold">
            {title}
          </h3>
        </div>

        {/* Code */}
        <div
          className={`p-5 overflow-x-auto ${
            isDark
              ? "bg-black text-green-400"
              : "bg-gray-50 text-black"
          }`}
        >
          <pre className="text-sm font-mono whitespace-pre-wrap">
            {codeString}
          </pre>
        </div>
      </div>
    );
  };

  // Loading State
  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          isDark
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <Navbar />

        <div className="flex justify-center items-center h-[80vh]">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Error State
  if (!codeData) {
    return (
      <div
        className={`min-h-screen ${
          isDark
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        <Navbar />

        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="text-6xl mb-4">
            ❌
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Snippet Not Found
          </h2>

          <Link
            to="/gallery"
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header Card */}
        <div
          className={`rounded-2xl border p-6 mb-8 shadow-lg flex flex-col md:flex-row justify-between gap-5 ${
            isDark
              ? "bg-zinc-900 border-orange-500/20"
              : "bg-white border-orange-200"
          }`}
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {codeData.title ||
                "Shared Workspace"}
            </h1>

            <p className="text-orange-500 text-sm">
              By{" "}
              {codeData.author ||
                "Anonymous"}{" "}
              •{" "}
              {new Date(
                codeData.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/gallery"
              className={`px-5 py-3 rounded-xl border flex items-center gap-2 ${
                isDark
                  ? "border-orange-500/20"
                  : "border-orange-200"
              }`}
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <Link
              to={`/s/${id}`}
              className="px-5 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Open Editor
            </Link>
          </div>
        </div>

        {/* Code Blocks */}
        {typeof codeData.code ===
        "object" ? (
          <div className="space-y-6">
            {renderCodeBlock(
              "HTML",
              codeData.code.html,
              <Code
                size={18}
                className="text-orange-500"
              />
            )}

            {renderCodeBlock(
              "CSS",
              codeData.code.css,
              <Paintbrush
                size={18}
                className="text-blue-500"
              />
            )}

            {renderCodeBlock(
              "JavaScript",
              codeData.code.javascript ||
                codeData.code.js,
              <Terminal
                size={18}
                className="text-yellow-500"
              />
            )}
          </div>
        ) : (
          renderCodeBlock(
            "Code",
            codeData.code,
            <Terminal
              size={18}
              className="text-orange-500"
            />
          )
        )}
      </div>
    </div>
  );
};

export default ViewCode;