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
  Sparkles,
  ArrowRight
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
    openGuidebook,
    programPlans,
    startProgramPlan,
    setCurrentScreen
  } = useFitness();

  const weekScrollRef = useRef<HTMLDivElement>(null);

  if (!activeProgram.isStarted || !activeProgram.programId) {
    const suggestedProgram = programPlans[0];

    return (
      <section
        aria-label="Choose a training program"
        className="rounded-2xl sm:rounded-3xl bg-[#181A1B]/95 border border-white/10 p-4 sm:p-5 shadow-2xl relative overflow-hidden space-y-4"
      >
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#C7FF3D]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="space-y-1 relative">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C7FF3D] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#C7FF3D]">
              No active program
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Choose your next training plan
          </h2>
          <p className="text-[11px] text-[#929895] font-medium max-w-lg">
            Follow a structured program to get a personalized workout queue, progression tracking, and weekly guidance.
          </p>
        </div>

        {suggestedProgram && (
          <div className="rounded-2xl bg-gradient-to-br from-[#202523] via-[#1A1D1E] to-[#141617] border border-[#C7FF3D]/30 p-4 space-y-3 relative">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#C7FF3D]">
                Suggested for you
              </span>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                {suggestedProgram.title}
              </h3>
              <p className="text-[11px] text-[#929895] mt-1">
                {suggestedProgram.daysPerWeek} days/week • {suggestedProgram.totalWeeks} weeks • {suggestedProgram.level}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentScreen('workouts')}
              className="w-full py-3 px-4 rounded-xl bg-[#C7FF3D] hover:bg-[#d5ff5e] text-[#101112] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C7FF3D]/30 transition-all"
            >
              <span>BROWSE WORKOUT LIBRARY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    );
  }

  const activePlan = programPlans.find(plan => plan.id === activeProgram.programId);
  const activeBlock =
    activePlan?.blocks.find(block => programWeek >= block.weekStart && programWeek <= block.weekEnd) ||
    activePlan?.blocks[0];
  const programDays = activeBlock
    ? Object.entries(activeBlock.scheduleMap)
        .filter((entry): entry is [string, string] => Boolean(entry[1]))
        .map(([dayId, workoutId], index) => {
          const workout = workouts.find(item => item.id === workoutId);
          const title = workout?.title || `Day ${index + 1}`;
          return {
            slot: index + 1,
            code: `D${index + 1}`,
            name: title.split(':')[1]?.trim() || title,
            workoutId
          };
        })
    : [];
  const maxProgramWeeks = activePlan?.totalWeeks || 12;

  const currentSlot = activeProgram.currentDaySlot || 1;
  const selectedDayInfo =
    programDays.find(d => d.slot === currentSlot) || programDays[0];

  const queuedWorkout =
    workouts.find(w => w.id === selectedDayInfo?.workoutId) || workouts[0];

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
              ACTIVE PROGRAM • {activePlan?.title || 'Training Plan'}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {activeBlock?.name || 'Current Training Block'}
          </h2>
          <p className="text-[11px] text-[#929895] font-medium">
            Week {programWeek} • {activeBlock?.focusSummary || activePlan?.subtitle}
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
          {Array.from({ length: maxProgramWeeks }, (_, idx) => idx + 1).map(w => {
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
            {activeProgram.completedSessionKeys.filter(k => k.startsWith(`w${programWeek}-`)).length} / {programDays.length} Done
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {programDays.map(day => {
            const isQueued = currentSlot === day.slot;
            const isCompleted = activeProgram.completedSessionKeys.includes(
              `w${programWeek}-d${day.slot}`
            );
            const isUpNextHighlight = day.slot === currentSlot;

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
            {queuedWorkout.title || 'Next workout'}
          </h3>
          <p className="text-[11px] text-[#929895] mt-0.5">
            {queuedWorkout.subtitle || activeBlock?.focusSummary || 'Your next scheduled workout'}
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
          {queuedWorkout.targetMuscles.slice(0, 2).map((muscle, index) => (
            <span
              key={muscle}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                index === 0
                  ? 'bg-[#C7FF3D]/10 border border-[#C7FF3D]/30 text-[#C7FF3D]'
                  : 'bg-[#65D9C0]/10 border border-[#65D9C0]/30 text-[#65D9C0]'
              }`}
            >
              {muscle}
            </span>
          ))}
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
