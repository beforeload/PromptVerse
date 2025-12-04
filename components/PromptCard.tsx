import React from 'react';
import { Heart, Copy, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { PromptData } from '../types';

interface PromptCardProps {
  prompt: PromptData;
  onClick: (prompt: PromptData) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(prompt)}
    >
      {/* Image Container */}
      <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={prompt.imageUrl} 
          alt={prompt.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Numeric ID Badge - Top Left */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-white/10">
           <span className="text-white text-xs font-bold font-mono">#{prompt.id}</span>
        </div>

        {/* Type Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
          {prompt.model === 'image' ? (
            <ImageIcon size={14} className="text-purple-600" />
          ) : (
            <VideoIcon size={14} className="text-blue-600" />
          )}
        </div>

        {/* Floating Actions on Hover - Top Right */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button 
            onClick={handleCopy}
            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
            title="Copy Prompt"
          >
             {copied ? <span className="text-green-600 font-bold text-xs">✓</span> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">
            {prompt.title}
          </h3>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {prompt.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
               {prompt.author.substring(0, 2).toUpperCase()}
             </div>
             <span className="text-xs text-gray-500 font-medium">{prompt.author}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 group-hover:text-pink-500 transition-colors">
            <Heart size={14} className={prompt.likes > 1000 ? "fill-current" : ""} />
            <span className="text-xs font-medium">{prompt.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;