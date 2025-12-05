import React, { useState, useRef } from 'react';
import { X, Send, Sparkles, Upload, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { PromptData, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface SubmitPromptModalProps {
  onClose: () => void;
  onSubmit: (data: Partial<PromptData>) => void;
  language: Language;
}

const SubmitPromptModal: React.FC<SubmitPromptModalProps> = ({ onClose, onSubmit, language }) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: '',
    imageUrl: '',
    sourceHandle: '',
    sourceUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = t.required;
    if (!formData.description.trim()) newErrors.description = t.required;
    if (!formData.content.trim()) newErrors.content = t.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onSubmit({
      title: formData.title,
      description: formData.description,
      content: formData.content,
      tags: tagsArray.length > 0 ? tagsArray : ['community'],
      imageUrl: formData.imageUrl || undefined,
      sourceHandle: formData.sourceHandle,
      sourceUrl: formData.sourceUrl
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{t.submitPrompt}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">{t.uploadImage}</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors
                  ${formData.imageUrl ? 'border-brand-300 bg-brand-50' : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'}
                `}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                {formData.imageUrl ? (
                  <div className="relative w-full h-48">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <span className="text-white text-sm font-medium">Click to change</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-gray-100 rounded-full text-gray-500">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{t.uploadHelp}</p>
                  </>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">{t.title}</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-brand-500 outline-none transition-all ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                placeholder="e.g. Neon Cyberpunk City"
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">{t.shortDesc}</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-brand-500 outline-none transition-all ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                placeholder="..."
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>

            {/* Source Info (New) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-gray-700 flex justify-between">
                   {t.sourceHandle} <span className="text-gray-400 font-normal text-xs">{t.optional}</span>
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <span className="text-gray-400 text-sm">@</span>
                   </div>
                   <input
                     type="text"
                     value={formData.sourceHandle}
                     onChange={(e) => setFormData({...formData, sourceHandle: e.target.value})}
                     className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                     placeholder="username"
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-gray-700 flex justify-between">
                   {t.sourceUrl} <span className="text-gray-400 font-normal text-xs">{t.optional}</span>
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <LinkIcon size={14} className="text-gray-400" />
                   </div>
                   <input
                     type="text"
                     value={formData.sourceUrl}
                     onChange={(e) => setFormData({...formData, sourceUrl: e.target.value})}
                     className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                     placeholder="https://..."
                   />
                 </div>
               </div>
            </div>

            {/* Prompt Content */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex justify-between">
                {t.prompt}
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-brand-500 outline-none transition-all font-mono text-sm ${errors.content ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`}
                placeholder="..."
              />
              {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">{t.tags} <span className="text-gray-400 font-normal">(comma separated)</span></label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="sci-fi, portrait, detailed..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:brightness-105 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
            >
              <Send size={18} />
              {t.submit}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitPromptModal;