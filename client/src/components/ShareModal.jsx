import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '../store/useUiStore';
import { useEditorStore } from '../store/useEditorStore';
import { X, Copy, Check, Link as LinkIcon } from 'lucide-react';

const ShareModal = () => {
  const { isShareModalOpen, setShareModalOpen, addToast } = useUiStore();
  const { code } = useEditorStore();

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareData, setShareData] = useState(null);

  const handleShare = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/code/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: code?.html || code,   // depending on your store
          language: "javascript",
          title: "My Snippet"
        })
      });

      const data = await response.json();

      const url = `http://localhost:5173/code/${data._id}`;

      setShareData({
        url,
        id: data._id
      });

      addToast("Snippet shared successfully!", "success");
    } catch (error) {
      console.error(error);
      addToast("Error sharing snippet", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!shareData) return;

    navigator.clipboard.writeText(shareData.url);
    setCopied(true);
    addToast("Link copied!", "info");

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isShareModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60"
            onClick={() => setShareModalOpen(false)}
          />

          <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] p-6 rounded w-[400px] text-white">
            
            <div className="flex justify-between mb-4">
              <h2>Share Snippet</h2>
              <button onClick={() => setShareModalOpen(false)}>
                <X />
              </button>
            </div>

            {!shareData ? (
              <button onClick={handleShare} disabled={loading}>
                {loading ? "Generating..." : (
                  <>
                    <LinkIcon size={18} /> Generate Link
                  </>
                )}
              </button>
            ) : (
              <div>
                <input value={shareData.url} readOnly />

                <button onClick={copyToClipboard}>
                  {copied ? <Check /> : <Copy />}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;