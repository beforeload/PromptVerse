import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  language: Language;
}

const CategoryFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onSelectTag, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full bg-white pb-6 pt-2 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-start gap-2">
          {/* All Button */}
          <button
            onClick={() => onSelectTag(null)}
            className={`
              whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
              ${selectedTag === null 
                ? 'bg-black text-white shadow-sm' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {t.all}
          </button>

          {/* Dynamic Tags */}
          {tags.map((tag) => {
             const isSelected = selectedTag === tag;
             return (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className={`
                  whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 capitalize
                  ${isSelected 
                    ? 'bg-black text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                #{tag}
              </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;