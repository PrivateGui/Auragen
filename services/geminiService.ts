
import { GoogleGenAI } from "@google/genai";
import type { GenerationSettings, GeneratedImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImageFromApi = async (prompt: string, settings: GenerationSettings): Promise<GeneratedImage[]> => {
  try {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: settings.numberOfImages,
          outputMimeType: 'image/jpeg',
          aspectRatio: settings.aspectRatio,
        },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("API returned no images.");
    }
    
    return response.generatedImages.map(image => {
        const base64ImageBytes: string = image.image.imageBytes;
        return {
            id: new Date().toISOString() + Math.random(),
            base64: base64ImageBytes,
            prompt: prompt,
            aspectRatio: settings.aspectRatio,
        };
    });

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};