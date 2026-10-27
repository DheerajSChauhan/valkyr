import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { ActiveProgramHub } from '../components/home/ActiveProgramHub';
import { WeeklyMomentumCard } from '../components/home/WeeklyMomentumCard';
import { LiveClubPresenceBanner } from '../components/home/LiveClubPresenceBanner';
import { FollowingFeedList } from '../components/home/FollowingFeedList';
import { Play, ChevronRight } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { activeSession, resumeWorkout } = useFitness();

  return (
    <div className="space-y-5 pb-32 max-w-lg mx-auto">
      {/* Active Workout In-Progress Floating Banner (if session is running) */}
      {activeSession && (
        <div
          onClick={resumeWorkout}
          role="button"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && resumeWorkout()}
          className="p-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#C7FF3D]/25 via-[#1C1F20] to-[#1C1F20] border border-[#C7FF3D]/40 flex items-center justify-between gap-3 shadow-xl cursor-pointer hover:border-[#C7FF3D] transition group active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#C7FF3D] text-[#101112] flex items-center justify-center font-black shrink-0">
              <Play className="w-4 h-4 fill-[#101112]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#C7FF3D]">
                  WORKOUT IN PROGRESS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] animate-ping" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-white truncate">
                {activeSession.workoutTitle}
              </h4>
            </div>
          </div>
          <span className="text-xs font-black text-[#C7FF3D] group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
            <span>Resume</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      )}

      {/* Zone 1: Active Program Hub */}
      <ActiveProgramHub />

      {/* Zone 2: Weekly Momentum (Telemetry Strip) */}
      <WeeklyMomentumCard />

      {/* Zone 3: Live Club Activity */}
      <LiveClubPresenceBanner />

      {/* Zone 4: Following Feed (Chronological Workout Activity) */}
      <FollowingFeedList />
    </div>
  );
};

export default HomeScreen;
