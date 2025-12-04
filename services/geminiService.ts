import { GoogleGenAI } from "@google/genai";

// Declaration for the custom window property used for key selection
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}

export const generateImage = async (prompt: string): Promise<string> => {
  // 1. Check/Request API Key selection for High-Quality Image/Veo models
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
       await window.aistudio.openSelectKey();
       // Assuming success after returning, per instructions to not wait/race
    }
  }

  // 2. Initialize Client
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

    // 3. Extract Image
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
        // Retry logic for key selection if needed, but for now just throw
        if (window.aistudio) await window.aistudio.openSelectKey();
        throw new Error("API Key validation failed. Please select a key again.");
    }
    throw error;
  }
};

export const generateText = async (prompt: string): Promise<string> => {
  // For text, we use standard flash model
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Text Generation Error:", error);
    throw new Error("Failed to generate text response.");
  }
};