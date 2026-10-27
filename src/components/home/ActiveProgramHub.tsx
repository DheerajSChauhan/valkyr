import React, { useRef } from 'react';
import { Workout } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import {
  Layers,
  Play,
  Clock,
  Dumbbell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ActiveProgramHubProps {
  onStartWorkout?: (workout: Workout) => void;
}

interface MicrocycleDay {
  slot: number;
  code: string;
  name: string;
  workoutId: string;
}

export const ActiveProgramHub: React.FC<ActiveProgramHubProps> = ({ onStartWorkout }) => {
  const {
    programWeek,
    setProgramWeek,
    activeProgram,
    advanceProgramDayOrWeek,
    workouts,
    startWorkout,
    setSelectedWorkoutDetail,
    openGuidebook
  } = useFitness();

  const weekScrollRef = useRef<HTMLDivElement>(null);

  const isRamping = programWeek >= 6;
  const phasePrefix = isRamping ? 'ramping-' : 'foundation-';

  const MICROCYCLE_DAYS: MicrocycleDay[] = [
    { slot: 1, code: 'D1', name: 'Upper', workoutId: `${phasePrefix}d1` },
    { slot: 2, code: 'D2', name: 'Lower', workoutId: `${phasePrefix}d2` },
    { slot: 3, code: 'D3', name: 'Pull', workoutId: `${phasePrefix}d3` },
    { slot: 4, code: 'D4', name: 'Push', workoutId: `${phasePrefix}d4` },
    { slot: 5, code: 'D5', name: 'Legs', workoutId: `${phasePrefix}d5` }
  ];

  // Resolve currently selected or queued workout (defaults to D2 Lower as requested in prompt)
  const currentSlot = activeProgram.currentDaySlot || 2;
  const selectedDayInfo =
    MICROCYCLE_DAYS.find(d => d.slot === currentSlot) || MICROCYCLE_DAYS[1];

  const queuedWorkout =
    workouts.find(w => w.id === selectedDayInfo.workoutId) ||
    workouts.find(w => w.id === 'foundation-d2') ||
    workouts[1] ||
    workouts[0];

  const handleStartWorkout = () => {
    if (onStartWorkout) {
      onStartWorkout(queuedWorkout);
    } else {
      startWorkout(queuedWorkout);
    }
  };

  const scrollWeeks = (direction: 'left' | 'right') => {
    if (weekScrollRef.current) {
      const offset = direction === 'left' ? -140 : 140;
      weekScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="Zone 1: Active Program Hub"
      className="rounded-2xl sm:rounded-3xl bg-[#181A1B]/95 border border-white/10 p-4 sm:p-5 shadow-2xl relative overflow-hidden space-y-4"
    >
      {/* Background ambient radial highlight */}
      <div
        className="absolute -top-16 -right-16 w-52 h-52 bg-[#C7FF3D]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header & Subtitle */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#C7FF3D] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#C7FF3D] truncate">
              ACTIVE PROGRAM • JEFF NIPPARD - Transformation System
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {isRamping ? 'Ramping Hypertrophy Block' : 'Foundation Strength Block'}
          </h2>
          <p className="text-[11px] text-[#929895] font-medium">
            {programWeek === 1
              ? 'Week 1 Deload & Technique Intro (RPE 6–9 • Leave 1–3 reps in tank)'
              : programWeek <= 5
              ? `Week ${programWeek}: Foundation Overload (Last Set RPE 10 Failure)`
              : `Week ${programWeek}: Ramping Peak (Last Set Failure + Partials)`}
          </p>
        </div>

        {/* Quick Guidebook / Blueprint Action */}
        <button
          type="button"
          onClick={() => openGuidebook('guidelines')}
          className="shrink-0 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-bold text-[#F5F5F2] flex items-center gap-1.5 active:scale-95 transition-all"
          title="Open PDF Guidelines"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#C7FF3D]" />
          <span className="hidden sm:inline">Guidebook</span>
        </button>
      </div>

      {/* Compact Week Carousel (W1 to W12) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#929895]">
          <span>Program Schedule</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollWeeks('left')}
              className="p-1 rounded hover:bg-white/10 text-white/70 active:scale-90 transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-white font-black">Week {programWeek}</span>
            <button
              type="button"
              onClick={() => scrollWeeks('right')}
              className="p-1 rounded hover:bg-white/10 text-white/70 active:scale-90 transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div
          ref={weekScrollRef}
          tabIndex={0}
          role="region"
          aria-label="Weeks carousel"
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {Array.from({ length: 12 }, (_, idx) => idx + 1).map(w => {
            const isActive = programWeek === w;
            const weekDoneCount = [1, 2, 3, 4, 5].filter(s =>
              activeProgram.completedSessionKeys.includes(`w${w}-d${s}`)
            ).length;

            return (
              <button
                key={w}
                type="button"
                onClick={() => setProgramWeek(w)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-black transition-all duration-200 active:scale-95 flex items-center gap-1 border ${
                  isActive
                    ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D] shadow-md shadow-[#C7FF3D]/25 ring-2 ring-[#C7FF3D]/30'
                    : 'bg-[#151718] text-[#929895] hover:text-white border-white/10 hover:border-[#C7FF3D]/40'
                }`}
              >
                <span>W{w}</span>
                {weekDoneCount === 5 && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-[#101112]' : 'bg-[#65D9C0]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Microcycle Day Queue: D1 (Upper), D2 (Lower - Highlighted "Up Next"), D3 (Pull), D4 (Push), D5 (Legs) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-bold text-[#929895]">
          <span className="uppercase tracking-wider">Microcycle Day Queue</span>
          <span className="text-[#C7FF3D]">
            {activeProgram.completedSessionKeys.filter(k => k.startsWith(`w${programWeek}-`)).length} / 5 Done
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {MICROCYCLE_DAYS.map(day => {
            const isQueued = currentSlot === day.slot;
            const isCompleted = activeProgram.completedSessionKeys.includes(
              `w${programWeek}-d${day.slot}`
            );
            const isUpNextHighlight = day.slot === 2;

            return (
              <button
                key={day.code}
                type="button"
                onClick={() => advanceProgramDayOrWeek(day.slot)}
                className={`relative p-2 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between min-h-[58px] ${
                  isQueued
                    ? 'bg-[#C7FF3D]/15 border-[#C7FF3D] shadow-lg shadow-[#C7FF3D]/15'
                    : isCompleted
                    ? 'bg-[#65D9C0]/10 border-[#65D9C0]/40 text-[#65D9C0]'
                    : isUpNextHighlight
                    ? 'bg-[#1E2319] border-[#C7FF3D]/60'
                    : 'bg-[#151718] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[11px] font-black ${
                      isQueued
                        ? 'text-[#C7FF3D]'
                        : isCompleted
                        ? 'text-[#65D9C0]'
                        : isUpNextHighlight
                        ? 'text-[#C7FF3D]'
                        : 'text-white'
                    }`}
                  >
                    {day.code}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-[#65D9C0]" />
                  ) : isQueued || isUpNextHighlight ? (
                    <Sparkles className="w-3 h-3 text-[#C7FF3D]" />
                  ) : null}
                </div>

                <div className="min-w-0">
                  <span
                    className={`text-[10px] font-bold block truncate ${
                      isQueued
                        ? 'text-white'
                        : isCompleted
                        ? 'text-[#65D9C0]'
                        : 'text-[#929895]'
                    }`}
                  >
                    {day.name}
                  </span>
                  {isUpNextHighlight && (
                    <span className="text-[8px] font-extrabold uppercase text-[#C7FF3D] tracking-tighter block leading-none mt-0.5">
                      Up Next
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* "Up Next" Hero Box */}
      <div className="rounded-2xl bg-gradient-to-br from-[#202523] via-[#1A1D1E] to-[#141617] border border-[#C7FF3D]/30 p-4 sm:p-5 space-y-3.5 shadow-xl relative overflow-hidden">
        {/* Glow accent in hero box */}
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-[#C7FF3D]/15 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Top Tag */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C7FF3D]/15 text-[#C7FF3D] text-[10px] font-black uppercase tracking-wider border border-[#C7FF3D]/30">
            <Flame className="w-3 h-3 fill-[#C7FF3D]" />
            UP NEXT IN PROGRAM
          </span>
          <button
            type="button"
            onClick={() => setSelectedWorkoutDetail(queuedWorkout)}
            className="text-[11px] font-bold text-[#929895] hover:text-[#C7FF3D] transition"
          >
            Details →
          </button>
        </div>

        {/* Workout Title */}
        <div>
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
            {queuedWorkout.title || 'Foundation D2: Lower (Strength Focus)'}
          </h3>
          <p className="text-[11px] text-[#929895] mt-0.5">
            {queuedWorkout.subtitle || 'Weeks 1–5 Block • 6 Exercises • RPE & Failure Progression'}
          </p>
        </div>

        {/* Badges: "54m", "6 Exercises", "Quads", "Hamstrings & Glutes" */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-[11px] font-bold">
            <Clock className="w-3 h-3 text-[#C7FF3D]" />
            {queuedWorkout.durationMin || 54}m
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-white text-[11px] font-bold">
            <Dumbbell className="w-3 h-3 text-[#C7FF3D]" />
            {queuedWorkout.exercises?.length || 6} Exercises
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#C7FF3D]/10 border border-[#C7FF3D]/30 text-[#C7FF3D] text-[11px] font-bold">
            Quads
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#65D9C0]/10 border border-[#65D9C0]/30 text-[#65D9C0] text-[11px] font-bold">
            Hamstrings & Glutes
          </span>
        </div>

        {/* Primary Action: Full-width high-contrast button "[ ▶ START WORKOUT ]" */}
        <button
          type="button"
          onClick={handleStartWorkout}
          className="w-full py-3.5 px-4 rounded-xl bg-[#C7FF3D] hover:bg-[#d5ff5e] text-[#101112] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C7FF3D]/30 hover:shadow-[#C7FF3D]/50 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-[#101112]" />
          <span>START WORKOUT</span>
        </button>
      </div>
    </section>
  );
};
