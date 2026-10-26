import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useFitness();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 py-2 rounded-full obsidian-glass-elevated border border-[#C7FF3D]/40 text-[#F5F5F2] text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
      <Sparkles className="w-3.5 h-3.5 text-[#C7FF3D]" />
      <span>{toastMessage}</span>
    </div>
  );
};
