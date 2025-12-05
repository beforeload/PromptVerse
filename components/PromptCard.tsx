import React from 'react';
import { Heart, Copy, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { PromptData } from '../types';

interface PromptCardProps {
  prompt: PromptData;
  onClick: (prompt: PromptData) => void;
  onLike: (prompt: PromptData) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick, onLike }) => {
  const [copied, setCopied] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
        setLiked(true);
        onLike(prompt);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(prompt)}
    >
      {/* Image Container - Fixed to 1:1 Aspect Ratio */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
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
          <ImageIcon size={14} className="text-purple-600" />
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
          {/* Source Info */}
          <div className="flex items-center min-w-0 mr-2">
             {prompt.sourceHandle && (
               prompt.sourceUrl ? (
                 <a 
                   href={prompt.sourceUrl}
                   target="_blank" 
                   rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()}
                   className="text-xs text-gray-400 hover:text-brand-600 truncate flex items-center gap-1 transition-colors"
                   title={`Source: ${prompt.sourceHandle}`}
                 >
                   <span className="truncate max-w-[120px]">{prompt.sourceHandle}</span>
                   <ExternalLink size={10} className="flex-shrink-0" />
                 </a>
               ) : (
                 <span className="text-xs text-gray-400 truncate block max-w-[120px]" title={prompt.sourceHandle}>
                   {prompt.sourceHandle}
                 </span>
               )
             )}
          </div>

          <button 
            onClick={handleLike}
            className={`flex-shrink-0 flex items-center gap-1 transition-colors ${liked ? "text-pink-500" : "text-gray-400 group-hover:text-pink-500"}`}
          >
            <Heart size={14} className={liked || prompt.likes > 1000 ? "fill-current" : ""} />
            <span className="text-xs font-medium">{prompt.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;