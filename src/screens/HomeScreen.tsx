import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { FeaturedWorkoutCard } from '../components/workout/FeaturedWorkoutCard';
import { WorkoutCard } from '../components/workout/WorkoutCard';
import { HevyRoutineBuilderModal } from '../components/workout/HevyRoutineBuilderModal';
import { MetricCard } from '../components/common/MetricCard';
import { ProgressRing } from '../components/common/ProgressRing';
import { GlassCard } from '../components/common/GlassCard';
import {
  Flame,
  Clock,
  Activity,
  ChevronRight,
  Play,
  Layers,
  Users,
  Plus,
  Zap,
  BookOpen,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    workouts,
    activeSession,
    resumeWorkout,
    startEmptyWorkout,
    userProfile,
    setCurrentScreen,
    workoutSummaries,
    scheduleDays,
    programWeek,
    setProgramWeek,
    activeProgram,
    programPlans,
    advanceProgramDayOrWeek,
    getNextProgramWorkout,
    openGuidebook,
    convertFromKg,
    communityPosts
  } = useFitness();

  const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

  const currentPlan =
    programPlans.find(p => p.id === activeProgram.programId) || programPlans[0];

  const isRamping = programWeek >= 6;
  const phasePrefix = isRamping ? 'ramping-' : 'foundation-';
  const featuredWorkout = getNextProgramWorkout();

  const otherWorkouts = workouts
    .filter(w => w.id !== featuredWorkout.id && w.id.startsWith(phasePrefix))
    .slice(0, 4);

  const weeklyTarget = userProfile.availableDaysPerWeek || 5;
  const weekCompletedSlots = [1, 2, 3, 4, 5].filter(s =>
    activeProgram.completedSessionKeys.includes(`w${programWeek}-d${s}`)
  ).length;
  const scheduledDoneCount = scheduleDays.filter(
    d => d.isCompleted && !d.isRestDay
  ).length;
  const weeklyCompleted = Math.min(
    weeklyTarget,
    Math.max(weekCompletedSlots, scheduledDoneCount)
  );
  const weeklyProgressPct = Math.min(
    100,
    Math.round((weeklyCompleted / weeklyTarget) * 100)
  );

  const total60Completed = activeProgram.completedSessionKeys.length;
  const totalProgramPct = Math.min(100, Math.round((total60Completed / 60) * 100));

  const loggedSeconds = workoutSummaries.reduce((acc, s) => acc + s.durationSec, 0);
  const activeMinutes = 175 + Math.round(loggedSeconds / 60);

  const loggedVolumeKg = workoutSummaries.reduce((acc, s) => acc + s.totalVolume, 0);
  const totalWeeklyVolume = convertFromKg(48200 + loggedVolumeKg);
  const formattedVolume = `${(totalWeeklyVolume / 1000).toFixed(1)}k`;

  const MICROCYCLE_DAYS = [
    { slot: 1, code: 'D1', name: 'Upper' },
    { slot: 2, code: 'D2', name: 'Lower' },
    { slot: 3, code: 'D3', name: 'Pull' },
    { slot: 4, code: 'D4', name: 'Push' },
    { slot: 5, code: 'D5', name: 'Legs' }
  ];

  return (
    <div className="space-y-6 pb-28">
      {/* Active Workout In-Progress Floating Banner */}
      {activeSession && (
        <div
          onClick={resumeWorkout}
          className="p-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#C7FF3D]/25 via-[#1C1F20] to-[#1C1F20] border border-[#C7FF3D]/40 flex items-center justify-between gap-3 shadow-xl cursor-pointer hover:border-[#C7FF3D] transition group"
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

      {/* 12-Week Hypertrophy Program Command Center & Progression Hub */}
      <GlassCard variant="elevated" className="p-4 sm:p-5 space-y-3.5 border border-[#C7FF3D]/25">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C7FF3D]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                ACTIVE PROGRAM • {currentPlan.author.toUpperCase()}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
              {currentPlan.title}
            </h2>
            <p className="text-[11px] text-[#929895]">
              {programWeek === 1
                ? 'Week 1: Foundation Intro / Deload (RPE 6–9 • Leave 1–3 reps in tank)'
                : programWeek <= 5
                ? `Week ${programWeek}: Foundation Block Overload (Early RPE 8–9 • Last Set RPE 10 Failure)`
                : programWeek === 6
                ? 'Week 6: Ramping Block Intro / Reset (RPE 6–9 • New Biomechanical Exercises)'
                : `Week ${programWeek}: Ramping Peak Block (Last Set RPE 10 + Failure / LLPs / Myo-reps)`}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => openGuidebook('guidelines')}
              className="btn-electric-lime px-3 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1.5 shadow-md"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>PDF Guidelines</span>
            </button>
            <button
              type="button"
              onClick={() => openGuidebook('warmup')}
              className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#65D9C0] border-[#65D9C0]/30 hover:border-[#65D9C0] flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Warm-Up</span>
            </button>
          </div>
        </div>

        {/* 12-Week Selector Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1">
          {Array.from({ length: 12 }, (_, idx) => idx + 1).map(w => {
            const weekDoneCount = [1, 2, 3, 4, 5].filter(s =>
              activeProgram.completedSessionKeys.includes(`w${w}-d${s}`)
            ).length;
            return (
              <button
                key={w}
                type="button"
                onClick={() => setProgramWeek(w)}
                className={`relative py-1.5 rounded-lg text-[10px] font-black transition border ${
                  programWeek === w
                    ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D] shadow-sm'
                    : w <= 5
                    ? 'bg-[#151718] text-white/80 border-white/[0.06] hover:border-[#C7FF3D]/40'
                    : 'bg-[#151718] text-[#65D9C0] border-white/[0.06] hover:border-[#65D9C0]/40'
                }`}
              >
                <span>W{w}</span>
                {weekDoneCount === 5 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#65D9C0] border border-[#101112]" />
                )}
              </button>
            );
          })}
        </div>

        {/* 5-Day Weekly Microcycle Stepper */}
        <div className="pt-1 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#929895]">
            <span className="uppercase tracking-wider">
              Week {programWeek} Microcycle Progression (Click Day to Queue)
            </span>
            <span className="text-[#C7FF3D]">
              {weekCompletedSlots}/5 Week {programWeek} Sessions Done ({totalProgramPct}% Total Program)
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {MICROCYCLE_DAYS.map(d => {
              const isDone = activeProgram.completedSessionKeys.includes(
                `w${programWeek}-d${d.slot}`
              );
              const isCurrent = activeProgram.currentDaySlot === d.slot;
              return (
                <button
                  key={d.code}
                  type="button"
                  onClick={() => advanceProgramDayOrWeek(d.slot)}
                  className={`p-2 rounded-xl border text-left transition flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#C7FF3D]/15 border-[#C7FF3D] text-white'
                      : isDone
                      ? 'bg-[#65D9C0]/10 border-[#65D9C0]/40 text-[#65D9C0]'
                      : 'bg-[#141617] border-white/[0.06] text-[#929895] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-black">{d.code}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-3 h-3 text-[#65D9C0]" />
                    ) : isCurrent ? (
                      <Sparkles className="w-3 h-3 text-[#C7FF3D]" />
                    ) : null}
                  </div>
                  <span className="text-[10px] font-bold truncate mt-0.5">{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Featured Workout Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-white/90">
              UP NEXT IN PROGRAM • WEEK {programWeek} DAY {activeProgram.currentDaySlot}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => openGuidebook('blueprint')}
            className="text-[11px] font-bold text-[#C7FF3D] hover:underline"
          >
            Inspect 12-Week PDF Table →
          </button>
        </div>

        <FeaturedWorkoutCard workout={featuredWorkout} />
      </section>

      {/* Weekly Activity & Habit Overview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            WEEKLY MOMENTUM
          </h2>
          <button
            type="button"
            onClick={() => setCurrentScreen('progress')}
            className="text-[11px] font-bold text-[#C7FF3D] hover:underline flex items-center gap-0.5"
          >
            <span>Analytics & Muscle Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <GlassCard variant="elevated" className="flex items-center justify-between gap-4 p-4 sm:p-5">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#C7FF3D]">
              TARGET: {weeklyTarget} SESSIONS / WEEK
            </span>
            <h3 className="text-lg font-black text-white tracking-tight">
              {weeklyCompleted} of {weeklyTarget} Workouts Done
            </h3>
            <p className="text-xs text-[#929895]">
              {workoutSummaries.length > 0
                ? `Logged ${workoutSummaries.length} session(s) in logbook. Double-progression weights active!`
                : 'Complete each program day to auto-advance through the 12-week transformation system.'}
            </p>
          </div>

          <ProgressRing
            progress={weeklyProgressPct}
            size={68}
            strokeWidth={6}
            strokeColor="#C7FF3D"
            trackColor="rgba(255, 255, 255, 0.08)"
          >
            <span className="text-xs font-black text-white tabular-nums">
              {weeklyProgressPct}%
            </span>
          </ProgressRing>
        </GlassCard>

        <div className="grid grid-cols-3 gap-2.5">
          <MetricCard
            icon={<Clock className="w-4 h-4" />}
            label="Active Time"
            value={`${activeMinutes}m`}
            trend="+12%"
            accentColor="#C7FF3D"
          />
          <MetricCard
            icon={<Activity className="w-4 h-4" />}
            label="Volume"
            value={formattedVolume}
            subtitle={userProfile.unit}
            accentColor="#65D9C0"
          />
          <MetricCard
            icon={<Flame className="w-4 h-4" />}
            label="Streak"
            value={`${userProfile.streakDays}d`}
            trend="Active"
            accentColor="#FF9A58"
          />
        </div>
      </section>

      {/* Strava Social Club Teaser Card */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[#C7FF3D]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
              LIVE CLUB ACTIVITY
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCurrentScreen('community')}
            className="text-[11px] font-bold text-[#C7FF3D] hover:underline flex items-center gap-0.5"
          >
            <span>Open Feed ({communityPosts.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {communityPosts[0] && (
          <div
            onClick={() => setCurrentScreen('community')}
            className="p-3.5 rounded-2xl bg-[#1C1F20] border border-white/10 hover:border-[#C7FF3D]/40 transition cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={communityPosts[0].authorAvatar}
                alt={communityPosts[0].authorName}
                className="w-9 h-9 rounded-full object-cover border border-[#C7FF3D]/40 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-black text-white truncate">
                  {communityPosts[0].authorName} finished {communityPosts[0].workoutTitle}
                </div>
                <div className="text-[10px] text-[#929895] truncate">
                  {convertFromKg(communityPosts[0].totalVolumeKg).toLocaleString()}{' '}
                  {userProfile.unit} volume • 🔥 {communityPosts[0].kudosCount} Kudos
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#C7FF3D] shrink-0" />
          </div>
        )}
      </section>

      {/* Recommended Training Routines */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap px-1">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            {isRamping ? 'RAMPING BLOCK DAYS (W6–12)' : 'FOUNDATION BLOCK DAYS (W1–5)'}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setCurrentScreen('workouts')}
              className="text-[11px] font-bold text-[#C7FF3D] hover:underline flex items-center gap-0.5"
            >
              <span>All {workouts.length} Routines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => startEmptyWorkout()}
              className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              <span>Empty Workout</span>
            </button>
            <button
              type="button"
              onClick={() => setShowRoutineBuilder(true)}
              className="btn-electric-lime px-3 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1 shadow-lg shadow-[#C7FF3D]/25"
            >
              <Plus className="w-3 h-3 fill-[#101112]" />
              <span>Create Routine</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {otherWorkouts.map(w => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      </section>

      {showRoutineBuilder && (
        <HevyRoutineBuilderModal
          isOpen={showRoutineBuilder}
          onClose={() => setShowRoutineBuilder(false)}
        />
      )}
    </div>
  );
};
