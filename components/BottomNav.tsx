
import React from 'react';
import { HomeIcon, GalleryIcon, SettingsIcon } from './icons/Icons';
import type { View } from '../types';

interface BottomNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({ icon, label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-20 h-16 transition-colors duration-300 ${
        active ? 'text-purple-300' : 'text-gray-400 hover:text-purple-300'
      }`}
      aria-label={label}
    >
      {icon}
      <span className={`text-xs mt-1 font-medium tracking-wide ${active ? 'text-purple-300' : 'text-gray-500'}`}>{label}</span>
    </button>
  );

interface BottomNavProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/80 backdrop-blur-xl border-t border-gray-800/50 flex md:hidden items-center justify-around z-40">
      <BottomNavItem 
        icon={<HomeIcon />} 
        label="Generate" 
        active={activeView === 'generate'} 
        onClick={() => setActiveView('generate')} 
      />
      <BottomNavItem 
        icon={<GalleryIcon />} 
        label="Creations" 
        active={activeView === 'creations'} 
        onClick={() => setActiveView('creations')} 
      />
      <BottomNavItem 
        icon={<SettingsIcon />} 
        label="Settings" 
        active={activeView === 'settings'} 
        onClick={() => setActiveView('settings')}
      />
    </footer>
  );
};