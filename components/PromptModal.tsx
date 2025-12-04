import React, { useState, useEffect } from 'react';
import { X, Copy, Zap, Check, Image as ImageIcon, Type as TypeIcon, Terminal, AlertCircle } from 'lucide-react';
import { PromptData } from '../types';
import { generateImage, generateText } from '../services/geminiService';

interface PromptModalProps {
  prompt: PromptData | null;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reset state when prompt changes
  useEffect(() => {
    setGeneratedContent(null);
    setError(null);
    setIsGenerating(false);
  }, [prompt]);

  if (!prompt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);

    try {
      let result = '';
      if (prompt.model === 'image') {
        result = await generateImage(prompt.content);
      } else {
        result = await generateText(prompt.content);
      }
      setGeneratedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 md:hidden bg-white/50 backdrop-blur-md p-2 rounded-full text-gray-800 hover:bg-white"
        >
          <X size={20} />
        </button>

        {/* Left Side: Visuals */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col border-r border-gray-100 overflow-y-auto">
          <div className="p-6 flex-grow flex items-center justify-center bg-gray-100/50 relative min-h-[300px]">
             {generatedContent && prompt.model === 'image' ? (
                <div className="relative w-full h-full flex flex-col items-center gap-4 animate-in fade-in">
                    <img 
                      src={generatedContent} 
                      alt="Generated Result" 
                      className="w-full h-auto object-contain rounded-lg shadow-lg"
                    />
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                       Generated with Gemini 3 Pro
                    </span>
                </div>
             ) : generatedContent && prompt.model === 'text' ? (
                <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200 font-mono text-sm whitespace-pre-wrap text-gray-700 overflow-auto max-h-[500px]">
                   {generatedContent}
                </div>
             ) : (
                <img 
                  src={prompt.imageUrl} 
                  alt={prompt.title} 
                  className="w-full h-auto object-contain max-h-[60vh] md:max-h-full rounded-lg"
                />
             )}

             {isGenerating && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                 <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-4"></div>
                 <p className="text-brand-800 font-medium animate-pulse">
                   {prompt.model === 'image' ? 'Dreaming up pixels...' : 'Thinking...'}
                 </p>
               </div>
             )}
          </div>
          
          {/* Generation Error */}
          {error && (
            <div className="p-4 bg-red-50 border-t border-red-100 text-red-700 text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 flex flex-col max-h-[50vh] md:max-h-[90vh]">
          {/* Header */}
          <div className="p-6 md:p-8 pb-4 border-b border-gray-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border
                  ${prompt.model === 'image' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}
                `}>
                  {prompt.model === 'image' ? 'Image Gen' : 'Text Gen'}
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-500 text-sm font-medium">{prompt.category}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {prompt.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="hidden md:block text-gray-400 hover:text-gray-900 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 md:p-8 py-6 overflow-y-auto flex-grow space-y-8">
            {/* The Prompt */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Terminal size={16} /> Prompt
                </h3>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 relative group">
                <p className="font-mono text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {prompt.content}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {prompt.description}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gray-300 hover:text-gray-900 transition-colors cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 md:p-8 pt-4 border-t border-gray-100 bg-white sticky bottom-0">
             <button
               onClick={handleGenerate}
               disabled={isGenerating}
               className={`
                 w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-brand-200 transition-all transform active:scale-[0.98]
                 ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:shadow-brand-300 hover:brightness-105'}
               `}
             >
               {isGenerating ? (
                 <>Generating...</>
               ) : (
                 <>
                   <Zap size={20} className="fill-white" />
                   {prompt.model === 'image' ? 'Generate Image with Gemini' : 'Run Prompt with Gemini'}
                 </>
               )}
             </button>
             {prompt.model === 'image' && (
               <p className="text-center text-xs text-gray-400 mt-3">
                 Uses Gemini 3 Pro. Requires your own API Key via AI Studio.
               </p>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PromptModal;