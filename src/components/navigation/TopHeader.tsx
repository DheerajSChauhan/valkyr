import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Flame, Bell, Sparkles } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const { userProfile, toggleUnit, showToast } = useFitness();

  return (
    <header className="sticky top-0 z-30 bg-[#101112]/80 backdrop-blur-2xl border-b border-white/[0.08] px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* User Info & Avatar */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full object-cover border border-[#C7FF3D]/40 shadow-md ring-1 ring-white/10"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#101112] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D]" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-widest text-[#C7FF3D] uppercase">VALKYR</span>
              <span className="text-white/20">•</span>
              <span className="text-[11px] text-[#929895] font-semibold">{userProfile.greeting},</span>
              <span className="text-[11px] font-bold text-[#C7FF3D] flex items-center gap-0.5">
                <Flame className="w-3 h-3 fill-[#C7FF3D]" /> {userProfile.streakDays}d streak
              </span>
            </div>
            <h1 className="text-sm font-extrabold text-[#F5F5F2] tracking-tight truncate">
              {userProfile.name}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Unit Toggle Pill (KG / LBS) */}
          <button
            type="button"
            onClick={toggleUnit}
            className="btn-glass-subtle px-2.5 py-1.5 rounded-full text-xs font-black tracking-wider text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D]/60 shadow-sm"
            title="Toggle Weight Unit"
          >
            {userProfile.unit.toUpperCase()}
          </button>

          {/* Quick Notification Icon */}
          <button
            type="button"
            onClick={() => showToast('🔔 Daily training reminder: Rest, hydrate, and hit targets.')}
            className="btn-glass-subtle w-9 h-9 rounded-full flex items-center justify-center text-[#929895] hover:text-white"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
