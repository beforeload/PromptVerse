import React from 'react';
import { PromptCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: PromptCategory;
  onSelectCategory: (category: PromptCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          {Object.values(PromptCategory).map((category) => {
             const isSelected = selectedCategory === category;
             return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isSelected 
                    ? 'bg-brand-600 text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }
                `}
              >
                {category}
              </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;