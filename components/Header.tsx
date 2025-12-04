import React from 'react';
import { Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="bg-gradient-to-br from-brand-500 to-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
              <Sparkles size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Prompt<span className="text-brand-600">Verse</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all shadow-sm hover:shadow-md focus:shadow-md"
                placeholder="Search prompts (e.g., 'cyberpunk city', 'react code')..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
             <button className="text-sm font-medium text-gray-500 hover:text-gray-900 hidden sm:block">
               Submit Prompt
             </button>
             <button className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-full text-sm font-medium transition-transform transform active:scale-95 shadow-lg">
               Sign In
             </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden py-3 pb-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;