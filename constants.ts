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
    title: 'React Component Tutorial',
    description: 'A video tutorial showing how to create a complex React component.',
    content: 'A cinematic coding tutorial video showing a developer typing a React functional component using TypeScript and Tailwind CSS for a "Dashboard Card". Close up shots of the screen, mechanical keyboard, soft studio lighting, tech atmosphere.',
    category: PromptCategory.CODING,
    tags: ['react', 'typescript', 'tailwind', 'video'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    author: 'DevMaster',
    likes: 856,
    model: 'video'
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
    title: 'Sustainable Living Guide',
    description: 'A video guide about sustainable living tips.',
    content: 'A documentary style video about "Top 10 Tips for Sustainable Living in 2024". Shots of recycling, solar panels, organic gardening, happy people in nature. High quality, 4k, bright and uplifting style.',
    category: PromptCategory.WRITING,
    tags: ['sustainability', 'documentary', 'lifestyle'],
    imageUrl: 'https://picsum.photos/800/500?random=5',
    author: 'ContentKing',
    likes: 670,
    model: 'video'
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
    title: 'Office Life Scene',
    description: 'Professional business environment scene.',
    content: 'A video clip of a busy modern open-plan office, diverse team collaborating at a whiteboard, glass walls, natural light, corporate atmosphere, slow motion, shallow depth of field.',
    category: PromptCategory.BUSINESS,
    tags: ['business', 'office', 'collaboration'],
    imageUrl: 'https://picsum.photos/800/600?random=7',
    author: 'OfficeWizard',
    likes: 450,
    model: 'video'
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
    title: 'Data Visualization',
    description: 'Animated data visualization graphics.',
    content: 'Futuristic 3D data visualization video, glowing charts and graphs, floating numbers, blue and cyan color scheme, technology background, smooth animation, 60fps.',
    category: PromptCategory.CODING,
    tags: ['data', 'tech', 'animation', '3d'],
    imageUrl: 'https://picsum.photos/800/600?random=9',
    author: 'PyCoder',
    likes: 920,
    model: 'video'
  }
];