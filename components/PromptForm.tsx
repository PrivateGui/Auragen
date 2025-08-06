
import React, { useRef } from 'react';
import type { GenerationSettings } from '../types';
import { ASPECT_RATIOS } from '../constants';
import { AspectRatioIcon, LoadingIcon, SparklesIcon } from './icons/Icons';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  settings: GenerationSettings;
  setSettings: (settings: GenerationSettings) => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: () => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  settings,
  setSettings,
  isLoading,
  error,
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  const activeIndex = ASPECT_RATIOS.indexOf(settings.aspectRatio);
  const buttonWidthRem = 2.25; // w-9 class
  const transformValue = activeIndex * buttonWidthRem;

  return (
    <div className="fixed bottom-0 left-0 md:left-16 right-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/90 to-transparent p-4 pb-20 md:pb-4 sm:p-6 z-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/30 p-2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <textarea
                ref={textareaRef}
                value={prompt}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="A hyper-realistic portrait of a cyborg philosopher..."
                className="w-full h-12 sm:min-h-[3rem] max-h-40 p-3 bg-transparent resize-none text-gray-200 placeholder-gray-500 focus:outline-none flex-grow transition-all duration-300"
                rows={1}
                disabled={isLoading}
            />
            <div className="flex items-center space-x-2 self-end sm:self-center">
                <div className="relative flex items-center p-1 bg-gray-800/70 rounded-xl">
                  <div
                      className="absolute top-1 left-1 h-9 w-9 bg-purple-600/60 rounded-lg shadow-inner transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(${transformValue}rem)` }}
                  />
                  {ASPECT_RATIOS.map((ratio) => (
                      <button
                          key={ratio}
                          onClick={() => setSettings({ ...settings, aspectRatio: ratio })}
                          className={`relative z-10 w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-300 ${
                              settings.aspectRatio === ratio ? 'text-white' : 'text-gray-400 hover:text-gray-100'
                          }`}
                          aria-label={`Set aspect ratio to ${ratio}`}
                      >
                          <AspectRatioIcon ratio={ratio} />
                      </button>
                  ))}
                </div>
                
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="group relative h-12 w-28 overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-lg font-bold text-white disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                >
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                    {isLoading ? <LoadingIcon /> : (
                        <span className="relative flex items-center gap-2">
                            <SparklesIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125"/>
                            Gen
                        </span>
                    )}
                </button>
            </div>
        </div>
        {error && <p className="text-red-400 text-center text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};