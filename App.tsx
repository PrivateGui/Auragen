
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { ImageGrid } from './components/ImageGrid';
import { PromptForm } from './components/PromptForm';
import { ParticleBackground } from './components/ParticleBackground';
import { SettingsPage } from './components/Settings';
import { generateImageFromApi } from './services/geminiService';
import type { GeneratedImage, GenerationSettings, View } from './types';
import { DEFAULT_SETTINGS, CREATIONS_STORAGE_KEY, SETTINGS_STORAGE_KEY } from './constants';

function App() {
  const [prompt, setPrompt] = useState<string>('');
  
  const [settings, setSettings] = useState<GenerationSettings>(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
      return DEFAULT_SETTINGS;
    }
  });

  const [images, setImages] = useState<GeneratedImage[]>(() => {
    try {
      const savedImages = localStorage.getItem(CREATIONS_STORAGE_KEY);
      return savedImages ? JSON.parse(savedImages) : [];
    } catch (error) {
      console.error("Failed to load images from localStorage", error);
      return [];
    }
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>('generate');

  useEffect(() => {
    try {
      localStorage.setItem(CREATIONS_STORAGE_KEY, JSON.stringify(images));
    } catch (error) {
      console.error("Failed to save images to localStorage", error);
    }
  }, [images]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
    }
  }, [settings]);

  const clearCreations = () => {
    if (confirm('Are you sure you want to delete all your creations? This action cannot be undone.')) {
      setImages([]);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    if (activeView !== 'generate') {
      setActiveView('generate');
    }

    try {
      const newImages = await generateImageFromApi(prompt, settings);
      setImages(prevImages => [...newImages, ...prevImages]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, settings, isLoading, activeView]);
  
  const renderContent = () => {
    switch(activeView) {
      case 'settings':
        return <SettingsPage settings={settings} setSettings={setSettings} clearCreations={clearCreations} />;
      case 'creations':
        return <ImageGrid 
                  images={images} 
                  isLoading={false}
                  numberOfImagesToLoad={settings.numberOfImages}
                  emptyState={
                    <div className="flex flex-col items-center justify-center text-center h-[50vh]">
                      <h2 className="text-3xl font-bold animated-gradient-text">No Creations Yet</h2>
                      <p className="mt-4 text-gray-400 max-w-md">
                        Your generated images will appear here. Go to the "Generate" tab to start creating!
                      </p>
                    </div>
                  }
                />;
      case 'generate':
      default:
        return <ImageGrid images={images} isLoading={isLoading} numberOfImagesToLoad={settings.numberOfImages} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-200">
      <ParticleBackground />
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <BottomNav activeView={activeView} setActiveView={setActiveView} />
      
      <div className="md:ml-16">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 pt-24 pb-64 md:pb-48">
          {renderContent()}
        </main>
      </div>

      {activeView === 'generate' && (
        <PromptForm
          prompt={prompt}
          setPrompt={setPrompt}
          settings={settings}
          setSettings={setSettings}
          isLoading={isLoading}
          error={error}
          onSubmit={handleGenerate}
        />
      )}
    </div>
  );
}

export default App;