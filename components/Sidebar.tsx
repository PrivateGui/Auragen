
import React from 'react';
import { HomeIcon, GalleryIcon, SettingsIcon, SparklesIcon } from './icons/Icons';
import type { View } from '../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300
      group relative
      ${active
        ? 'bg-purple-600/20 text-purple-300'
        : 'text-gray-500 hover:bg-gray-700/50 hover:text-gray-300'
      }
    `}
    aria-label={label}
  >
    {icon}
    <span
      className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-gray-200 text-xs
                 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100
                 transition-opacity duration-300 pointer-events-none"
    >
      {label}
    </span>
  </button>
);

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-16 bg-black/30 backdrop-blur-xl border-r border-gray-800/50 flex-col items-center py-6 space-y-6 z-40">
      <div className="text-purple-500">
        <SparklesIcon className="w-8 h-8"/>
      </div>
      <nav className="flex flex-col items-center space-y-4">
        <NavItem 
          icon={<HomeIcon />} 
          label="Generate" 
          active={activeView === 'generate'} 
          onClick={() => setActiveView('generate')} 
        />
        <NavItem 
          icon={<GalleryIcon />} 
          label="My Creations" 
          active={activeView === 'creations'} 
          onClick={() => setActiveView('creations')} 
        />
        <NavItem 
          icon={<SettingsIcon />} 
          label="Settings" 
          active={activeView === 'settings'} 
          onClick={() => setActiveView('settings')}
        />
      </nav>
    </aside>
  );
};