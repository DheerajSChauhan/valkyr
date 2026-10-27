import React, { useState, useEffect } from 'react';
import { LiveClubMember } from '../../types';
import { defaultLiveClubMembers } from '../../data/mockDashboard';
import { useFitness } from '../../context/FitnessContext';
import { Activity, ChevronRight, Users, Zap } from 'lucide-react';

interface LiveClubPresenceBannerProps {
  members?: LiveClubMember[];
  onClickBanner?: () => void;
}

export const LiveClubPresenceBanner: React.FC<LiveClubPresenceBannerProps> = ({
  members = defaultLiveClubMembers,
  onClickBanner
}) => {
  const { setCurrentScreen } = useFitness();
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);

  // Automatically cycle through member statuses every 4 seconds to give a lively, real-time pulse
  useEffect(() => {
    if (members.length <= 1) return;
    const interval = setInterval(() => {
      setActiveMemberIndex(prev => (prev + 1) % members.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [members.length]);

  const currentMember = members[activeMemberIndex] || members[0];

  const handleBannerClick = () => {
    if (onClickBanner) {
      onClickBanner();
    } else {
      setCurrentScreen('community');
    }
  };

  return (
    <section
      aria-label="Zone 3: Live Club Activity"
      onClick={handleBannerClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleBannerClick()}
      className="rounded-2xl bg-gradient-to-r from-[#172018] via-[#181B1C] to-[#181A1B] border border-[#C7FF3D]/25 hover:border-[#C7FF3D]/50 p-3.5 sm:p-4 shadow-xl transition-all duration-200 active:scale-[0.99] cursor-pointer group relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 -left-6 -translate-y-1/2 w-24 h-24 bg-[#C7FF3D]/15 rounded-full blur-xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-3 relative z-10 flex-wrap sm:flex-nowrap">
        {/* Left: Green pulsing beacon + Live count */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D]" />
            <span className="absolute w-4 h-4 rounded-full bg-[#C7FF3D] animate-ping opacity-75" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-white tracking-wide">
              Live in Gym:
            </span>
            <span className="text-xs font-black text-[#C7FF3D]">
              {members.length} Active
            </span>
          </div>
        </div>

        {/* Center: Overlapping avatar cluster + Active status tag */}
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-start sm:justify-center">
          {/* Overlapping Avatar Cluster */}
          <div className="flex -space-x-2 shrink-0">
            {members.map((m, idx) => {
              const isSelected = idx === activeMemberIndex;
              return (
                <button
                  key={m.userId}
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setActiveMemberIndex(idx);
                  }}
                  className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform duration-200 ${
                    isSelected
                      ? 'border-[#C7FF3D] scale-110 z-10 ring-2 ring-[#C7FF3D]/40'
                      : 'border-[#181A1B] hover:scale-105'
                  }`}
                  title={`${m.name} - ${m.status}`}
                >
                  <img
                    src={m.avatarUrl}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Current status tag */}
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] sm:text-[11px] font-bold text-[#F5F5F2] truncate max-w-[200px] sm:max-w-[260px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65D9C0]" />
              <span className="truncate">{currentMember.status}</span>
            </span>
          </div>
        </div>

        {/* Right: Chevron or club link */}
        <div className="flex items-center gap-1 text-[11px] font-bold text-[#C7FF3D] shrink-0 ml-auto sm:ml-0">
          <span className="hidden sm:inline">Club</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </section>
  );
};
