import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Timer, Plus, Minus, Square } from 'lucide-react';

export const RestTimerCapsule: React.FC = () => {
  const {
    restRemainingSec,
    restTotalSec,
    isTimerRunning,
    timerLabel,
    stopRestTimer,
    adjustRestTimer
  } = useFitness();

  if (restRemainingSec <= 0 && !isTimerRunning) return null;

  const minutes = Math.floor(restRemainingSec / 60);
  const seconds = restRemainingSec % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const pct = restTotalSec > 0 ? (restRemainingSec / restTotalSec) * 100 : 0;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md z-40 obsidian-timer-dock p-2.5 px-3.5 flex items-center justify-between gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Pulsing Timer Icon */}
        <div className="w-9 h-9 rounded-full bg-[#C7FF3D]/20 border border-[#C7FF3D]/40 flex items-center justify-center text-[#C7FF3D] shrink-0">
          <Timer className="w-4 h-4 animate-pulse" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tabular-nums text-white tracking-tight">
              {formattedTime}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30">
              Resting
            </span>
          </div>
          <p className="text-[10px] text-[#929895] truncate max-w-[160px] sm:max-w-xs">{timerLabel}</p>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => adjustRestTimer(-15)}
          className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          title="-15 seconds"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => adjustRestTimer(30)}
          className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          title="+30 seconds"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={stopRestTimer}
          className="btn-glass-subtle px-2.5 py-1.5 rounded-full flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 border-rose-500/30"
          title="Stop Timer"
        >
          <Square className="w-3 h-3 fill-rose-400" />
          <span>Stop</span>
        </button>
      </div>
    </div>
  );
};
