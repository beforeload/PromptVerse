import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import MasonryGrid from './components/MasonryGrid';
import PromptModal from './components/PromptModal';
import { PROMPTS } from './constants';
import { PromptCategory, PromptData } from './types';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>(PromptCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);

  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter((prompt) => {
      // 1. Filter by Category
      if (selectedCategory !== PromptCategory.ALL && prompt.category !== selectedCategory) {
        return false;
      }
      // 2. Filter by Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          prompt.title.toLowerCase().includes(query) ||
          prompt.description.toLowerCase().includes(query) ||
          prompt.tags.some(tag => tag.toLowerCase().includes(query)) ||
          prompt.content.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (selectedPrompt) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedPrompt]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <Header 
        onSearch={setSearchQuery} 
      />
      
      <main>
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
               Discover the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">Gemini Prompts</span>
             </h1>
             <p className="max-w-2xl mx-auto text-xl text-gray-500">
               A curated gallery of high-quality prompts for image generation, coding, writing, and more. Optimized for Gemini 2.5 Flash & 3 Pro.
             </p>
           </div>
           
           <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
           />
        </div>

        {/* Gallery */}
        <MasonryGrid 
          prompts={filteredPrompts} 
          onCardClick={setSelectedPrompt} 
        />
      </main>

      {/* Detail Modal */}
      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
        />
      )}

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <p className="text-gray-400 text-sm mb-2">© 2024 PromptVerse. All rights reserved.</p>
          <p className="text-gray-400 text-xs">Built for Gemini API Demo</p>
        </div>
      </footer>
    </div>
  );
};

export default App;