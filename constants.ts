
import type { AspectRatio, GenerationSettings } from './types';

export const ASPECT_RATIOS: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3", "3:4"];

export const CREATIONS_STORAGE_KEY = 'auraGenCreations';
export const SETTINGS_STORAGE_KEY = 'auraGenSettings';

export const DEFAULT_SETTINGS: GenerationSettings = {
  aspectRatio: "1:1",
  numberOfImages: 1,
};