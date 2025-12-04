import { GoogleGenAI } from "@google/genai";

// Declaration for the custom window property used for key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}

const checkApiKey = async () => {
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
       await window.aistudio.openSelectKey();
    }
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  await checkApiKey();

  // Using gemini-3-pro-image-preview as requested for high quality
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
        if (window.aistudio) await window.aistudio.openSelectKey();
        throw new Error("API Key validation failed. Please select a key again.");
    }
    throw error;
  }
};

export const generateVideo = async (prompt: string): Promise<string> => {
  await checkApiKey();

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("No video URI in response");

    // Fetch the actual video bytes using the API key
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!response.ok) throw new Error("Failed to download video content");

    const blob = await response.blob();
    return URL.createObjectURL(blob);

  } catch (error) {
    console.error("Gemini Video Generation Error:", error);
     if (error instanceof Error && error.message.includes("Requested entity was not found")) {
        if (window.aistudio) await window.aistudio.openSelectKey();
        throw new Error("API Key validation failed. Please select a key again.");
    }
    throw new Error("Failed to generate video response.");
  }
};