export enum PromptCategory {
  ALL = 'All',
  PHOTOGRAPHY = 'Photography',
  DIGITAL_ART = 'Digital Art',
  CODING = 'Coding',
  WRITING = 'Writing',
  BUSINESS = 'Business',
  THREE_D_DESIGN = '3D Design'
}

export interface PromptData {
  id: string;
  title: string;
  description: string;
  content: string; // The actual prompt
  category: PromptCategory;
  tags: string[];
  imageUrl: string; // Placeholder or generated result
  author: string;
  likes: number;
  model: 'image' | 'text'; // Simplified model type for UI logic
}

export interface GenerationResult {
  imageUrl?: string;
  text?: string;
  error?: string;
}