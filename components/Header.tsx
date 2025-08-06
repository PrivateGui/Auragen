
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 md:left-16 right-0 h-16 flex items-center px-4 sm:px-8 bg-black/10 backdrop-blur-xl border-b border-gray-800/50 z-30">
        <h1 className="text-xl font-bold tracking-widest uppercase animated-gradient-text">
            AuraGen
        </h1>
    </header>
  );
};