import React, { useEffect, useRef } from 'react';
import { Sparkles, LogOut, PlusCircle, Globe, Search } from 'lucide-react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  user: User | null;
  setUser: (user: User | null) => void;
  onOpenSubmit: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  setUser, 
  onOpenSubmit, 
  language, 
  setLanguage,
  searchQuery,
  setSearchQuery
}) => {
  const t = TRANSLATIONS[language];
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Google script is loaded
    if (window.google && !user) {
      try {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Client ID
          callback: (response: any) => {
            console.log("Encoded JWT ID token: " + response.credential);
            setUser({
              name: "Demo User",
              email: "demo@example.com",
              picture: "https://lh3.googleusercontent.com/a/ACg8ocIq8d18_jUu1uDk563w_k7098L0v6144565=s96-c"
            });
          }
        });

        if (googleBtnRef.current) {
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "medium", // Changed from large to medium for a more compact look
            shape: "pill",
            text: "signin_with" 
          });
        }
      } catch (e) {
        console.error("Google Sign-in init failed", e);
      }
    }
  }, [user, setUser]);

  // Fallback login for demo
  const handleMockLogin = () => {
    setUser({
        name: "Demo User",
        email: "demo@example.com",
        picture: "https://ui-avatars.com/api/?name=Demo+User&background=0ea5e9&color=fff"
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="bg-gradient-to-br from-brand-500 to-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
              <Sparkles size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
              Prompt<span className="text-brand-600">Verse</span>
            </span>
          </div>

          {/* Search Bar - Centered/Flexible */}
          <div className="flex-1 max-w-2xl mx-auto relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
             </div>
             <input
               type="text"
               className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm shadow-sm transition-all"
               placeholder={t.searchPlaceholder}
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
             {/* Language Switcher */}
             <button
               onClick={toggleLanguage}
               className="p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all duration-200 group relative"
               title={language === 'en' ? "Switch to Chinese" : "切换到英文"}
             >
               <Globe size={20} />
               {/* Tooltip on hover */}
               <span className="absolute top-full right-0 mt-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                 {language === 'en' ? '中文' : 'English'}
               </span>
             </button>

             {/* Submit Prompt Icon Button */}
             <button 
                onClick={onOpenSubmit}
                className="p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all duration-200 group relative"
                title={t.submitPrompt}
              >
                <PlusCircle size={22} />
                <span className="absolute top-full right-0 mt-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {t.submitPrompt}
                </span>
             </button>

             {user ? (
               <div className="flex items-center gap-3 animate-in fade-in pl-2 border-l border-gray-200">
                   <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border border-gray-200" />
                   <button 
                    onClick={() => setUser(null)}
                    className="ml-1 text-gray-400 hover:text-red-500"
                    title="Sign Out"
                   >
                     <LogOut size={18} />
                   </button>
               </div>
             ) : (
               <div className="flex items-center">
                  {/* Container for Google Button */}
                  <div ref={googleBtnRef} className="overflow-hidden min-h-[32px]"></div>
                  
                  {/* Fallback button - only shown if Google button container is empty (or script failed) */}
                  <button 
                    onClick={handleMockLogin}
                    className="flex items-center gap-2 bg-brand-600 text-white border border-transparent hover:bg-brand-700 px-3 py-1.5 rounded-full text-xs font-bold transition-transform transform active:scale-95 shadow-sm"
                    style={{ display: window.google ? 'none' : 'flex' }}
                  >
                     {t.signIn}
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;