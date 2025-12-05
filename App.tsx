import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter'; // Used as Tag Filter
import MasonryGrid from './components/MasonryGrid';
import PromptModal from './components/PromptModal';
import SubmitPromptModal from './components/SubmitPromptModal';
import { PROMPTS, TRANSLATIONS } from './constants';
import { PromptData, User, Language } from './types';

const App: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese
  
  // State for prompts list (initialized with constants)
  const [allPrompts, setAllPrompts] = useState<PromptData[]>(PROMPTS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const t = TRANSLATIONS[language];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allPrompts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [allPrompts]);

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((prompt) => {
      // 1. Filter by Tag
      if (selectedTag && !prompt.tags.includes(selectedTag)) {
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
  }, [selectedTag, searchQuery, allPrompts]);

  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (selectedPrompt || isSubmitModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedPrompt, isSubmitModalOpen]);

  const handleAddPrompt = (data: Partial<PromptData>) => {
    const newId = (allPrompts.length + 1).toString();
    const newPrompt: PromptData = {
      id: newId,
      title: data.title || 'Untitled',
      description: data.description || '',
      content: data.content || '',
      tags: data.tags || [],
      imageUrl: data.imageUrl || `https://picsum.photos/800/800?random=${Date.now()}`,
      author: user?.name || 'Anonymous',
      likes: 0,
      model: 'image'
    };

    setAllPrompts([newPrompt, ...allPrompts]);
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <Header 
        user={user}
        setUser={setUser}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
        language={language}
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main>
        {/* Hero Section */}
        <div className="bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-center">
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
               Discover the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">Gemini Prompts</span>
             </h1>
             <p className="max-w-2xl mx-auto text-lg text-gray-500">
               {language === 'en' 
                 ? "A curated gallery of high-quality prompts for image generation. Optimized for Gemini 2.5 Flash & 3 Pro."
                 : "精选高质量 Gemini 提示词图库，专为 Gemini 2.5 Flash 和 3 Pro 优化。"}
             </p>
           </div>
           
           <CategoryFilter 
              tags={allTags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
              language={language}
           />
        </div>

        {/* Gallery */}
        <MasonryGrid 
          prompts={filteredPrompts} 
          onCardClick={setSelectedPrompt}
          language={language}
        />
      </main>

      {/* Detail Modal */}
      {selectedPrompt && (
        <PromptModal 
          prompt={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)} 
          language={language}
        />
      )}

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <SubmitPromptModal
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={handleAddPrompt}
          language={language}
        />
      )}

      {/* Footer */}
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