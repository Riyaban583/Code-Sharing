import React from 'react';
import Navbar from '../components/Navbar';
import { Star, GitFork, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_SNIPPETS = [
  { id: '1', title: 'Glassmorphism Login', author: 'AlexD', language: 'html', likes: 124, forks: 45, time: '2 hours ago' },
  { id: '2', title: 'React Todo Zustand', author: 'SarahW', language: 'javascript', likes: 89, forks: 12, time: '5 hours ago' },
  { id: '3', title: 'CSS Grid Layouts', author: 'CssNinja', language: 'css', likes: 256, forks: 88, time: '1 day ago' },
  { id: '4', title: 'Python Web Scraper', author: 'PyDev', language: 'python', likes: 145, forks: 34, time: '2 days ago' },
];

const GalleryPage = () => {
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
              className="w-full md:w-80 bg-secondary/50 border border-glassBorder rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Trending', 'Recent', 'HTML/CSS', 'JavaScript', 'Python', 'Rust'].map((tag, i) => (
             <button key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-secondary/50 text-mutedForeground hover:text-white hover:bg-secondary'}`}>
               {tag}
             </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_SNIPPETS.map((snippet) => (
            <div key={snippet.id} className="glass-panel group hover:-translate-y-1 transition-all duration-300">
              <div className="p-5 border-b border-glassBorder space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-primary transition-colors">{snippet.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-mutedForeground">
                      <User size={12} />
                      {snippet.author}
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-secondary/50 rounded text-xs font-mono uppercase tracking-wider text-mutedForeground">
                    {snippet.language}
                  </span>
                </div>
                
                <div className="h-32 bg-secondary/30 rounded-lg border border-glassBorder relative overflow-hidden flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                  <p className="font-mono text-xs text-mutedForeground opacity-50 px-4">
                    // Code preview not available
                    <br/><br/>
                    function magic() {'{'}<br/>
                    &nbsp;&nbsp;return "awesome";<br/>
                    {'}'}
                  </p>
                </div>
              </div>
              
              <div className="px-5 py-3 flex items-center justify-between text-xs text-mutedForeground bg-black/20">
                <span>{snippet.time}</span>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Star size={14} /> {snippet.likes}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <GitFork size={14} /> {snippet.forks}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GalleryPage;
