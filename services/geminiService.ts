import { GoogleGenAI } from "@google/genai";

export const generateImage = async (prompt: string): Promise<string> => {
  // 1. Check/Request API Key selection for High-Quality Image/Veo models
  if (window.aistudio) {
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
       await window.aistudio.openSelectKey();
       // Assuming success after returning, per instructions to not wait/race
    }
  }

  const generate = async () => {
    // 2. Initialize Client
    // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    
    throw new Error("No image generated.");
  };

  try {
    return await generate();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Handle "Requested entity was not found" error by prompting for key selection again
    if (error.message && error.message.includes("Requested entity was not found")) {
      if (window.aistudio) {
         console.log("Re-requesting API Key selection due to entity not found error.");
         await window.aistudio.openSelectKey();
         // Retry the generation once
         return await generate();
      }
    }

    throw error;
  }
};
