import { PromptCategory, PromptData } from './types';

export const PROMPTS: PromptData[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk Street',
    description: 'A futuristic city street at night with heavy rain and neon lights.',
    content: 'Cinematic shot of a cyberpunk city street at rainy night, neon signs reflecting in puddles, towering skyscrapers, flying cars, volumetric fog, highly detailed, photorealistic, 8k resolution, blade runner style.',
    category: PromptCategory.PHOTOGRAPHY,
    tags: ['cyberpunk', 'city', 'neon', 'sci-fi'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    author: 'NeoArtist',
    likes: 1240,
    model: 'image'
  },
  {
    id: '2',
    title: 'React Component Generator',
    description: 'Create a complex React component with Tailwind CSS.',
    content: 'Write a React functional component using TypeScript and Tailwind CSS for a "Dashboard Card" that displays a line chart using recharts. It should have a title, a value, a percentage change indicator (green for up, red for down), and the chart at the bottom. The design should be modern and clean.',
    category: PromptCategory.CODING,
    tags: ['react', 'typescript', 'tailwind', 'frontend'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    author: 'DevMaster',
    likes: 856,
    model: 'text'
  },
  {
    id: '3',
    title: 'Minimalist Logo Design',
    description: 'Prompt for generating a clean, vector-style logo.',
    content: 'A minimalist vector logo design for a coffee shop named "Bean & Leaf", combining a coffee bean and a leaf shape, line art style, black on white background, sophisticated, modern typography.',
    category: PromptCategory.DIGITAL_ART,
    tags: ['logo', 'minimalist', 'vector', 'branding'],
    imageUrl: 'https://picsum.photos/800/800?random=3',
    author: 'DesignPro',
    likes: 2300,
    model: 'image'
  },
  {
    id: '4',
    title: 'Fantasy Landscape',
    description: 'Epic fantasy world with floating islands.',
    content: 'A breathtaking fantasy landscape featuring floating islands with waterfalls cascading into the clouds below, ancient ruins, dragon flying in distance, golden hour lighting, matte painting style, artstation HQ.',
    category: PromptCategory.DIGITAL_ART,
    tags: ['fantasy', 'landscape', 'concept art'],
    imageUrl: 'https://picsum.photos/800/1200?random=4',
    author: 'SkyWalker',
    likes: 1540,
    model: 'image'
  },
  {
    id: '5',
    title: 'SEO Blog Post Writer',
    description: 'Generate an SEO-optimized blog post about sustainable living.',
    content: 'Write a comprehensive, SEO-optimized blog post about "Top 10 Tips for Sustainable Living in 2024". Include a catchy title, an introduction hook, H2 and H3 headings, and a conclusion. Tone should be encouraging and practical.',
    category: PromptCategory.WRITING,
    tags: ['seo', 'blog', 'marketing'],
    imageUrl: 'https://picsum.photos/800/500?random=5',
    author: 'ContentKing',
    likes: 670,
    model: 'text'
  },
  {
    id: '6',
    title: 'Isometric 3D Room',
    description: 'A cozy gaming setup in isometric 3D style.',
    content: 'Isometric 3D render of a cozy gamer bedroom, purple and blue led lighting, multiple monitors, mechanical keyboard, bean bag chair, posters on wall, clay render style, soft lighting, 4k, blender 3d.',
    category: PromptCategory.THREE_D_DESIGN,
    tags: ['3d', 'isometric', 'interior', 'gaming'],
    imageUrl: 'https://picsum.photos/800/800?random=6',
    author: 'RenderGod',
    likes: 3400,
    model: 'image'
  },
  {
    id: '7',
    title: 'Business Email Professional',
    description: 'Rewrite a rough draft into a professional email.',
    content: 'Rewrite the following email draft to be more professional, polite, and concise: "Hey boss, I can\'t come in tomorrow cause I\'m sick. Will finish the report later."',
    category: PromptCategory.BUSINESS,
    tags: ['email', 'professional', 'productivity'],
    imageUrl: 'https://picsum.photos/800/600?random=7',
    author: 'OfficeWizard',
    likes: 450,
    model: 'text'
  },
  {
    id: '8',
    title: 'Portrait of an Elder',
    description: 'Highly detailed portrait photography.',
    content: 'Portrait photography of an elderly fisherman with a weathered face, intense eyes, wearing a yellow raincoat, rainy weather, natural lighting, shot on 85mm lens, f/1.8, bokeh background, national geographic style.',
    category: PromptCategory.PHOTOGRAPHY,
    tags: ['portrait', 'photography', 'realistic'],
    imageUrl: 'https://picsum.photos/600/800?random=8',
    author: 'PhotoGenic',
    likes: 1120,
    model: 'image'
  },
  {
    id: '9',
    title: 'Python Data Analysis Script',
    description: 'Pandas script to analyze CSV data.',
    content: 'Write a Python script using Pandas to read a CSV file named "sales_data.csv", clean the missing values in the "price" column by filling with the mean, group by "region", and calculate the total revenue. Output the result to a new CSV.',
    category: PromptCategory.CODING,
    tags: ['python', 'pandas', 'data science'],
    imageUrl: 'https://picsum.photos/800/600?random=9',
    author: 'PyCoder',
    likes: 920,
    model: 'text'
  }
];