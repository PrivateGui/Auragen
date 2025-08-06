
import React from 'react';
import type { GenerationSettings } from '../types';

interface SettingsPageProps {
  settings: GenerationSettings;
  setSettings: (settings: GenerationSettings) => void;
  clearCreations: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings, clearCreations }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold tracking-tighter animated-gradient-text mb-4">
        Settings
      </h2>
      <p className="text-gray-400 mb-8 max-w-lg mx-auto">
        Customize your image generation experience. Your preferences are saved automatically.
      </p>
      <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 sm:p-8 text-left space-y-8">
        
        <div>
          <label htmlFor="imageCount" className="text-lg font-semibold text-gray-200">Number of Images</label>
          <p className="text-sm text-gray-500 mb-4">Choose how many images to generate at once.</p>
          <div className="flex items-center space-x-4">
            <input 
              id="imageCount"
              type="range" 
              min="1" 
              max="4" 
              step="1" 
              value={settings.numberOfImages} 
              onChange={e => setSettings({...settings, numberOfImages: parseInt(e.target.value)})} 
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" 
            />
            <span className="font-bold text-lg text-purple-300 w-8 text-center bg-gray-700/50 rounded-md py-1">{settings.numberOfImages}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-200">Manage Data</h3>
          <p className="text-sm text-gray-500 mb-3">Permanently delete all your saved images from this browser.</p>
           <button 
            onClick={clearCreations}
            className="px-4 py-2 text-sm font-medium text-red-400 bg-red-900/50 border border-red-500/50 rounded-lg hover:bg-red-900/80 transition-colors">
              Clear All Creations
           </button>
        </div>

      </div>
    </div>
  );
};