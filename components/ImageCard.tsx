
import React from 'react';
import type { GeneratedImage, AspectRatio } from '../types';
import { DownloadIcon, ShareIcon } from './icons/Icons';

interface ImageCardProps {
  image: GeneratedImage;
}

const getAspectRatioClass = (ratio: AspectRatio): string => {
    const map: Record<AspectRatio, string> = {
        '1:1': 'aspect-square',
        '16:9': 'aspect-video',
        '9:16': 'aspect-[9/16]',
        '4:3': 'aspect-[4/3]',
        '3:4': 'aspect-[3/4]',
    };
    return map[ratio] || 'aspect-square';
};

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const imageUrl = `data:image/jpeg;base64,${image.base64}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `auragen-${image.prompt.slice(0, 20).replace(/\s/g, '_')}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], `auragen-image.jpeg`, { type: 'image/jpeg' });
      if (navigator.share) {
        await navigator.share({
          title: 'AI Image from AuraGen',
          text: `Image generated from the prompt: "${image.prompt}"`,
          files: [file],
        });
      } else {
        alert('Web Share API is not supported in your browser.');
      }
    } catch(err) {
      console.error("Sharing failed", err)
      alert('Sharing failed. Please try downloading the image instead.');
    }
  }

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg shadow-black/40 border border-gray-800/50 transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-800/60 ${getAspectRatioClass(image.aspectRatio)}`}>
      <img
        src={imageUrl}
        alt={image.prompt}
        className={`w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105`}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end h-full">
         <div className="transition-all transform-gpu duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
            <p className="text-sm text-gray-200 line-clamp-2 font-medium">{image.prompt}</p>
            <div className="flex items-center space-x-2 mt-3">
              <button onClick={handleDownload} className="h-9 w-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors duration-200" aria-label="Download Image">
                <DownloadIcon />
              </button>
              <button onClick={handleShare} className="h-9 w-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors duration-200" aria-label="Share Image">
                <ShareIcon />
              </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export const SkeletonCard: React.FC = () => (
  <div className="aspect-square rounded-2xl bg-gray-800/50 border border-gray-700/50 p-4 animate-pulse">
    <div className="w-full h-full bg-gray-700/50 rounded-lg"></div>
  </div>
);