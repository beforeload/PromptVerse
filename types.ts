export interface PromptData {
  id: string;
  title: string;
  description: string;
  content: string; // The actual prompt
  tags: string[];
  imageUrl: string; // Placeholder or generated result
  author: string;
  likes: number;
  model: 'image';
  category?: string; // Optional to match API structure
  createdAt?: string;
  updatedAt?: string;
  sourceHandle?: string; // e.g. @midjourney_prompts
  sourceUrl?: string;    // e.g. https://instagram.com/p/xyz
}

export interface GenerationResult {
  imageUrl?: string;
  text?: string;
  error?: string;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}

export type Language = 'en' | 'zh';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
    aistudio?: AIStudio;
    adsbygoogle?: any[];
  }
}