import React, { useState } from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

import {
  X,
  Copy,
  Check,
  Link as LinkIcon,
  Share2,
  Sparkles,
  ShieldCheck,
  Globe,
  Loader2
} from "lucide-react";

import { useUiStore } from "../store/useUiStore";
import { useEditorStore } from "../store/useEditorStore";

const ShareModal = () => {

  const {
    isShareModalOpen,
    setShareModalOpen,
    addToast
  } = useUiStore();

  const {
    code,
    theme
  } = useEditorStore();

  const [copied, setCopied] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [shareData, setShareData] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [author, setAuthor] =
    useState("");

  const isDark = theme === "vs-dark";

  // ====================================
  // SHARE CODE
  // ====================================
  const API_URL = import.meta.env.VITE_API_URL;
  const handleShare = async () => {

    try {

      setLoading(true);

      const response = await fetch(
  `${API_URL}/api/code/save`,
  {
    method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            code,
            language: "workspace",
            title:
              title ||
              "Untitled Snippet",
            author:
              author ||
              "Anonymous",
          }),

        }
      );

      const data =
        await response.json();

     const shareUrl =
  `${window.location.origin}/s/${data._id}`;

      setShareData({
        url: shareUrl,
        id: data._id,
      });

      addToast(
        "Snippet shared successfully!",
        "success"
      );

    } catch (error) {

      console.error(error);

      addToast(
        "Failed to share snippet",
        "error"
      );

    } finally {

      setLoading(false);

    }

  };

  // ====================================
  // COPY LINK
  // ====================================
  const copyToClipboard =
    async () => {

      if (!shareData) return;

      await navigator.clipboard.writeText(
        shareData.url
      );

      setCopied(true);

      addToast(
        "Link copied successfully!",
        "success"
      );

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    };

  // ====================================
  // CLOSE MODAL
  // ====================================
  const closeModal = () => {

    setShareModalOpen(false);

    setTimeout(() => {

      setShareData(null);

      setTitle("");

      setAuthor("");

      setCopied(false);

    }, 300);

  };

  return (

    <AnimatePresence>

      {isShareModalOpen && (

        <>

          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              x: "-50%",
              y: "-50%",
            }}

            animate={{
              opacity: 1,
              scale: 1,
              x: "-50%",
              y: "-50%",
            }}

            exit={{
              opacity: 0,
              scale: 0.85,
              x: "-50%",
              y: "-50%",
            }}

            transition={{
              duration: 0.3
            }}

            className={`fixed top-1/2 left-1/2 z-[101] w-[92%] max-w-lg overflow-hidden rounded-[35px] border backdrop-blur-2xl shadow-[0_0_80px_rgba(255,140,0,0.2)] ${
              isDark
                ? "bg-zinc-950/95 border-orange-500/20"
                : "bg-white border-orange-200"
            }`}
          >

            {/* Glow */}
            <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-orange-500/10 blur-3xl rounded-full"></div>

            {/* Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

            {/* Header */}
            <div className="relative z-10 px-7 py-6 border-b border-orange-500/10 flex items-center justify-between">

              {/* Left */}
              <div className="flex items-center gap-4">

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.08
                  }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,140,0,0.4)]"
                >

                  <Share2 size={22} />

                </motion.div>

                {/* Text */}
                <div>

                  <h2
                    className={`text-2xl font-black ${
                      isDark
                        ? "text-white"
                        : "text-black"
                    }`}
                  >

                    Share Project

                  </h2>

                  <p className="text-xs text-orange-400 uppercase tracking-widest">

                    Generate Secure Share Link

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
                onClick={closeModal}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  isDark
                    ? "bg-zinc-900/80 text-white hover:bg-zinc-800"
                    : "bg-orange-50 text-black"
                }`}
              >

                <X size={18} />

              </motion.button>

            </div>

            {/* BODY */}
            <div className="relative z-10 p-7">

              {!shareData ? (

                <div className="space-y-6">

                  {/* AI Badge */}
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-400/10 to-orange-600/10 border border-orange-500/20">

                    <Sparkles
                      size={18}
                      className="text-orange-400"
                    />

                    <span className="text-orange-300 text-sm font-semibold">

                      AI Optimized Sharing Enabled

                    </span>

                  </div>

                  {/* Title */}
                  <div>

                    <label className="text-sm font-semibold text-orange-400">

                      Project Title

                    </label>

                    <input
                      type="text"
                      placeholder="Enter project title"
                      value={title}
                      onChange={(e) =>
                        setTitle(e.target.value)
                      }
                      className={`w-full mt-3 px-5 py-4 rounded-2xl border outline-none transition-all duration-300 ${
                        isDark
                          ? "bg-zinc-900/80 text-white border-orange-500/20 focus:border-orange-500"
                          : "bg-orange-50 text-black border-orange-200"
                      }`}
                    />

                  </div>

                  {/* Author */}
                  <div>

                    <label className="text-sm font-semibold text-orange-400">

                      Author Name

                    </label>

                    <input
                      type="text"
                      placeholder="Enter author name"
                      value={author}
                      onChange={(e) =>
                        setAuthor(e.target.value)
                      }
                      className={`w-full mt-3 px-5 py-4 rounded-2xl border outline-none transition-all duration-300 ${
                        isDark
                          ? "bg-zinc-900/80 text-white border-orange-500/20 focus:border-orange-500"
                          : "bg-orange-50 text-black border-orange-200"
                      }`}
                    />

                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-green-500/10 border border-green-500/20">

                    <ShieldCheck
                      size={20}
                      className="text-green-400"
                    />

                    <div>

                      <p className="text-green-400 font-semibold text-sm">

                        Secure Sharing Enabled

                      </p>

                      <p className="text-gray-400 text-xs mt-1">

                        Your code will be safely accessible using a unique link.

                      </p>

                    </div>

                  </div>

                  {/* Share Button */}
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0px 0px 30px rgba(255,165,0,0.5)"
                    }}

                    whileTap={{
                      scale: 0.95
                    }}

                    onClick={handleShare}

                    disabled={loading}

                    className="w-full mt-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                  >

                    {loading ? (

                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Generating Link...
                      </>

                    ) : (

                      <>
                        <LinkIcon size={20} />

                        Generate Share Link
                      </>

                    )}

                  </motion.button>

                </div>

              ) : (

                <div className="space-y-6">

                  {/* Success */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1
                    }}

                    className="flex flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-green-500/10 border border-green-500/20"
                  >

                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">

                      <Check
                        size={36}
                        className="text-green-400"
                      />

                    </div>

                    <div className="text-center">

                      <h3 className="text-green-400 text-xl font-bold">

                        Link Generated Successfully

                      </h3>

                      <p className="text-gray-400 text-sm mt-2">

                        Your project is now ready to share.

                      </p>

                    </div>

                  </motion.div>

                  {/* Share URL */}
                  <div>

                    <label className="text-sm font-semibold text-orange-400">

                      Share URL

                    </label>

                    <div className="flex gap-3 mt-3">

                      <div
                        className={`flex-1 px-5 py-4 rounded-2xl border text-sm overflow-hidden truncate ${
                          isDark
                            ? "bg-zinc-900/80 text-white border-orange-500/20"
                            : "bg-orange-50 text-black border-orange-200"
                        }`}
                      >

                        {shareData.url}

                      </div>

                      {/* Copy */}
                      <motion.button
                        whileHover={{
                          scale: 1.08
                        }}

                        whileTap={{
                          scale: 0.95
                        }}

                        onClick={copyToClipboard}

                        className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-4 rounded-2xl shadow-[0_0_20px_rgba(255,140,0,0.4)]"
                      >

                        {copied ? (
                          <Check size={20} />
                        ) : (
                          <Copy size={20} />
                        )}

                      </motion.button>

                    </div>

                  </div>

                  {/* Public Badge */}
                  <div className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">

                    <Globe
                      size={20}
                      className="text-orange-400"
                    />

                    <div>

                      <p className="text-orange-300 font-semibold text-sm">

                        Publicly Accessible

                      </p>

                      <p className="text-gray-400 text-xs mt-1">

                        Anyone with this link can view your shared code.

                      </p>

                    </div>

                  </div>

                  {/* Close */}
                  <motion.button
                    whileHover={{
                      scale: 1.03
                    }}

                    whileTap={{
                      scale: 0.95
                    }}

                    onClick={closeModal}

                    className="w-full py-4 rounded-2xl border border-orange-500/20 text-orange-400 hover:bg-orange-500/10 transition-all duration-300 font-semibold"
                  >

                    Close

                  </motion.button>

                </div>

              )}

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>
  );
};

export default ShareModal;