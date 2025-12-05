import { PromptData } from '../types';
import { PROMPTS } from '../constants';

// Initialize mock database with constants and dummy dates
let mockPrompts: PromptData[] = PROMPTS.map(p => ({
  ...p,
  category: 'photography', // Default mock category
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const promptService = {
  // GET /api/prompts/
  getPrompts: async (): Promise<PromptData[]> => {
    await delay(500); // Simulate network loading
    return [...mockPrompts];
  },

  // GET /api/prompts/{id}/
  getPromptById: async (id: string): Promise<PromptData | undefined> => {
    await delay(300);
    return mockPrompts.find(p => p.id === id);
  },

  // POST /api/prompts/
  createPrompt: async (data: Omit<PromptData, 'id' | 'likes' | 'createdAt' | 'updatedAt'>): Promise<PromptData> => {
    await delay(600);
    const newId = (Math.max(...mockPrompts.map(p => parseInt(p.id) || 0)) + 1).toString();
    const newPrompt: PromptData = {
      ...data,
      id: newId,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPrompts = [newPrompt, ...mockPrompts];
    return newPrompt;
  },

  // PUT/PATCH /api/prompts/{id}/
  updatePrompt: async (id: string, data: Partial<PromptData>): Promise<PromptData> => {
    await delay(400);
    const index = mockPrompts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Prompt not found');
    
    const updatedPrompt = {
      ...mockPrompts[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    mockPrompts[index] = updatedPrompt;
    return updatedPrompt;
  },

  // DELETE /api/prompts/{id}/
  deletePrompt: async (id: string): Promise<void> => {
    await delay(400);
    mockPrompts = mockPrompts.filter(p => p.id !== id);
  },

  // POST /api/prompts/{id}/like/
  likePrompt: async (id: string): Promise<PromptData> => {
    await delay(200); // Faster response for interactions
    const index = mockPrompts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Prompt not found');

    const updatedPrompt = {
      ...mockPrompts[index],
      likes: mockPrompts[index].likes + 1,
      updatedAt: new Date().toISOString()
    };
    mockPrompts[index] = updatedPrompt;
    return updatedPrompt;
  }
};