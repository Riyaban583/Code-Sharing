import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Star, GitFork, User, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const GalleryPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/code');
        const data = await response.json();
        setSnippets(data);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSnippets();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredSnippets = snippets.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Community Gallery
            </h1>
            <p className="text-mutedForeground mt-2">Discover and fork snippets from developers worldwide.</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedForeground" size={18} />
            <input 
              type="text" 
              placeholder="Search snippets..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 bg-secondary/50 border border-glassBorder rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans text-white"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Trending', 'Recent', 'HTML/CSS', 'JavaScript', 'React', 'Fullstack'].map((tag, i) => (
             <button key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-secondary/50 text-mutedForeground hover:text-white hover:bg-secondary'}`}>
               {tag}
             </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : filteredSnippets.length === 0 ? (
          <div className="text-center py-20 text-mutedForeground">
            No snippets found. Be the first to share one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSnippets.map((snippet) => (
              <Link to={`/s/${snippet._id}`} key={snippet._id} className="glass-panel group hover:-translate-y-1 transition-all duration-300 block">
                <div className="p-5 border-b border-glassBorder space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">{snippet.title || 'Untitled Snippet'}</h3>
                      <div className="flex items-center gap-2 text-xs text-mutedForeground">
                        <User size={12} />
                        {snippet.author || 'Anonymous'}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-secondary/50 rounded text-xs font-mono uppercase tracking-wider text-mutedForeground">
                      {snippet.language || 'web'}
                    </span>
                  </div>
                  
                  <div className="h-32 bg-secondary/30 rounded-lg border border-glassBorder relative overflow-hidden flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                    <p className="font-mono text-xs text-mutedForeground opacity-70 px-4 whitespace-pre-wrap line-clamp-5 text-left w-full h-full p-4 overflow-hidden">
                      {typeof snippet.code === 'object' 
                        ? (snippet.code.js || snippet.code.html || snippet.code.css || '// No code content') 
                        : (snippet.code || '// No code content')}
                    </p>
                  </div>
                </div>
                
                <div className="px-5 py-3 flex items-center justify-between text-xs text-mutedForeground bg-black/20">
                  <span className="flex items-center gap-1.5"><Clock size={12}/> {formatDate(snippet.createdAt)}</span>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                      <Star size={14} /> {snippet.likes || 0}
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                      <GitFork size={14} /> {snippet.forks || 0}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default GalleryPage;
