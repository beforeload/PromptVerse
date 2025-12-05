import { PromptData, Language } from './types';

export const TRANSLATIONS = {
  en: {
    searchPlaceholder: "Search prompts (e.g., 'cyberpunk', 'logo')...",
    submitPrompt: "Submit Prompt",
    signIn: "Sign in with Google",
    all: "All",
    noPrompts: "No prompts found matching your criteria.",
    reset: "Reset Filters",
    copy: "Copy Prompt",
    copied: "Copied",
    runGemini: "Run Prompt with Gemini",
    imageGen: "Image Gen",
    desc: "Description",
    tags: "Tags",
    prompt: "Prompt",
    generating: "Generating...",
    uploadImage: "Upload Example Image",
    uploadHelp: "Click or drag image to upload",
    title: "Title",
    shortDesc: "Short Description",
    submit: "Submit Prompt",
    required: "Required"
  },
  zh: {
    searchPlaceholder: "搜索提示词 (例如 '赛博朋克', 'Logo')...",
    submitPrompt: "提交提示词",
    signIn: "使用 Google 登录",
    all: "全部",
    noPrompts: "没有找到匹配的提示词。",
    reset: "重置筛选",
    copy: "复制提示词",
    copied: "已复制",
    runGemini: "使用 Gemini 运行",
    imageGen: "图像生成",
    desc: "描述",
    tags: "标签",
    prompt: "提示词内容",
    generating: "生成中...",
    uploadImage: "上传示例图片",
    uploadHelp: "点击或拖拽上传图片",
    title: "标题",
    shortDesc: "简短描述",
    submit: "提交提示词",
    required: "必填"
  }
};

export const PROMPTS: PromptData[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk Street',
    description: 'A futuristic city street at night with heavy rain and neon lights.',
    content: 'Cinematic shot of a cyberpunk city street at rainy night, neon signs reflecting in puddles, towering skyscrapers, flying cars, volumetric fog, highly detailed, photorealistic, 8k resolution, blade runner style.',
    tags: ['cyberpunk', 'city', 'neon', 'sci-fi'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    author: 'NeoArtist',
    likes: 1240,
    model: 'image'
  },
  {
    id: '3',
    title: 'Minimalist Logo Design',
    description: 'Prompt for generating a clean, vector-style logo.',
    content: 'A minimalist vector logo design for a coffee shop named "Bean & Leaf", combining a coffee bean and a leaf shape, line art style, black on white background, sophisticated, modern typography.',
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
    tags: ['fantasy', 'landscape', 'concept art'],
    imageUrl: 'https://picsum.photos/800/1200?random=4',
    author: 'SkyWalker',
    likes: 1540,
    model: 'image'
  },
  {
    id: '6',
    title: 'Isometric 3D Room',
    description: 'A cozy gaming setup in isometric 3D style.',
    content: 'Isometric 3D render of a cozy gamer bedroom, purple and blue led lighting, multiple monitors, mechanical keyboard, bean bag chair, posters on wall, clay render style, soft lighting, 4k, blender 3d.',
    tags: ['3d', 'isometric', 'interior', 'gaming'],
    imageUrl: 'https://picsum.photos/800/800?random=6',
    author: 'RenderGod',
    likes: 3400,
    model: 'image'
  },
  {
    id: '8',
    title: 'Portrait of an Elder',
    description: 'Highly detailed portrait photography.',
    content: 'Portrait photography of an elderly fisherman with a weathered face, intense eyes, wearing a yellow raincoat, rainy weather, natural lighting, shot on 85mm lens, f/1.8, bokeh background, national geographic style.',
    tags: ['portrait', 'photography', 'realistic'],
    imageUrl: 'https://picsum.photos/600/800?random=8',
    author: 'PhotoGenic',
    likes: 1120,
    model: 'image'
  },
  {
    id: '10',
    title: 'Ancient Chinese Temple',
    description: 'Atmospheric shot of an ancient temple in the mountains.',
    content: 'Photorealistic image of an ancient Chinese temple nestled in misty mountains at sunrise, traditional architecture, red lanterns, cherry blossoms falling, mystical atmosphere, 8k, unreal engine 5.',
    tags: ['china', 'architecture', 'landscape', 'culture'],
    imageUrl: 'https://picsum.photos/800/600?random=10',
    author: 'ChenArt',
    likes: 1890,
    model: 'image'
  },
  {
    id: '11',
    title: 'Cute 3D Character',
    description: 'Pixar style 3D character design.',
    content: 'Adorable 3D character render of a small robot gardener holding a flower, Pixar style, big expressive eyes, soft textures, sunny garden background, bokeh, bright colors, 4k.',
    tags: ['character', '3d', 'cute', 'robot'],
    imageUrl: 'https://picsum.photos/800/800?random=11',
    author: 'ToonMaster',
    likes: 2100,
    model: 'image'
  }
];