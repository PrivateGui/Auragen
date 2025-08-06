
import React from 'react';
import { ImageCard, SkeletonCard } from './ImageCard';
import type { GeneratedImage } from '../types';

interface ImageGridProps {
  images: GeneratedImage[];
  isLoading: boolean;
  numberOfImagesToLoad: number;
  emptyState?: React.ReactNode;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, numberOfImagesToLoad, emptyState }) => {
  if (isLoading && images.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(numberOfImagesToLoad)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!isLoading && images.length === 0) {
    return emptyState ? <>{emptyState}</> : (
      <div className="flex flex-col items-center justify-center text-center h-[50vh]">
        <h2 className="text-3xl font-bold animated-gradient-text">Welcome to AuraGen</h2>
        <p className="mt-4 text-gray-400 max-w-md">
          Unleash your creativity. Describe anything you can imagine in the prompt below and watch it come to life.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {isLoading && <SkeletonCard />}
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};