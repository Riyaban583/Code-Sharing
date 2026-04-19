import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useEditorStore } from '../store/useEditorStore';

const CodeEditor = ({ language }) => {
  const { code, setCode, theme } = useEditorStore();
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    setCode(language, value);
  };

  return (
    <div className="w-full h-full relative group">
      <div className="absolute top-2 right-4 z-10 px-2 py-1 rounded-md bg-secondary/80 backdrop-blur-md text-xs font-mono text-mutedForeground uppercase tracking-wider group-hover:opacity-100 transition-opacity">
        {language}
      </div>
      <Editor
        height="100%"
        language={language}
        value={code[language]}
        theme={theme === 'vs-dark' ? 'vs-dark' : 'light'}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
          matchBrackets: "always",
        }}
        loading={<div className="flex items-center justify-center h-full text-mutedForeground">Loading editor...</div>}
      />
    </div>
  );
};

export default CodeEditor;
