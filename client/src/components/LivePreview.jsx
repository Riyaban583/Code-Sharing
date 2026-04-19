import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import { useUiStore } from '../store/useUiStore';

const LivePreview = () => {
  const { code } = useEditorStore();
  const { isPreviewFullscreen, togglePreviewFullscreen } = useUiStore();
  const [srcDoc, setSrcDoc] = useState('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>
              ${code.css}
            </style>
          </head>
          <body>
            ${code.html}
            <script>
              try {
                ${code.js}
              } catch (err) {
                console.error(err);
              }
            </script>
          </body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [code.html, code.css, code.js]);

  const refreshPreview = () => setKey(prev => prev + 1);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 rounded-lg overflow-hidden border border-glassBorder shadow-inner relative">
      <div className="h-10 bg-secondary/30 border-b border-glassBorder flex items-center justify-between px-3">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={refreshPreview}
            className="p-1.5 text-mutedForeground hover:text-white rounded-md hover:bg-white/10 transition-colors"
            title="Refresh Preview"
          >
            <RefreshCw size={14} />
          </button>
          <button 
            onClick={togglePreviewFullscreen}
            className="p-1.5 text-mutedForeground hover:text-white rounded-md hover:bg-white/10 transition-colors"
            title={isPreviewFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            {isPreviewFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white relative">
        <iframe
          key={key}
          srcDoc={srcDoc}
          title="code-preview"
          sandbox="allow-scripts allow-modals"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0 bg-white"
        />
      </div>
    </div>
  );
};

export default LivePreview;
