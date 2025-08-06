
export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export interface GenerationSettings {
  aspectRatio: AspectRatio;
  numberOfImages: number;
}

export interface GeneratedImage {
  id: string;
  base64: string;
  prompt: string;
  aspectRatio: AspectRatio;
}

export type View = 'generate' | 'creations' | 'settings';