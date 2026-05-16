import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Code, Terminal, Paintbrush } from "lucide-react";

const ViewCode = () => {
  const { id } = useParams();
  const [codeData, setCodeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/code/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setCodeData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!codeData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="text-red-500 text-6xl">❌</div>
          <h2 className="text-2xl font-bold">Snippet Not Found</h2>
          <Link to="/gallery" className="glass-button px-6 py-2 rounded-lg font-medium">
            Go to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const renderCodeBlock = (title, codeString, icon) => {
    if (!codeString) return null;
    return (
      <div className="glass-panel overflow-hidden mb-6">
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 border-b border-glassBorder">
          {icon}
          <h3 className="font-medium text-white">{title}</h3>
        </div>
        <div className="p-4 bg-black/40 overflow-x-auto">
          <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
            {codeString}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <div className="max-w-5xl mx-auto w-full p-6 md:p-8 flex-1">
        
        <div className="glass-panel p-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
              {codeData.title || "Shared Workspace"}
            </h1>
            <p className="text-mutedForeground text-sm">
              By <span className="text-white font-medium">{codeData.author || "Anonymous"}</span> • {new Date(codeData.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Link to={`/s/${id}`} className="glass-button px-6 py-2 rounded-lg font-medium text-white bg-primary/20">
            Open in Editor
          </Link>
        </div>

        {typeof codeData.code === "object" ? (
          <div className="space-y-6">
            {renderCodeBlock("HTML", codeData.code.html, <Code size={18} className="text-orange-400" />)}
            {renderCodeBlock("CSS", codeData.code.css, <Paintbrush size={18} className="text-blue-400" />)}
            {renderCodeBlock("JavaScript", codeData.code.js, <Terminal size={18} className="text-yellow-400" />)}
          </div>
        ) : (
          renderCodeBlock("Code", codeData.code, <Terminal size={18} className="text-primary" />)
        )}

      </div>
    </div>
  );
};

export default ViewCode;