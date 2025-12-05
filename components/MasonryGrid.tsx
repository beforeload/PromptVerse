import React from 'react';
import PromptCard from './PromptCard';
import { PromptData, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface MasonryGridProps {
  prompts: PromptData[];
  onCardClick: (prompt: PromptData) => void;
  language: Language;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ prompts, onCardClick, language }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {prompts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">{t.noPrompts}</p>
          <button 
             className="mt-4 text-brand-600 font-medium hover:underline"
             onClick={() => window.location.reload()}
          >
             {t.reset}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="h-full">
              <PromptCard prompt={prompt} onClick={onCardClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MasonryGrid;