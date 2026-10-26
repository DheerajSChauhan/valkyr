import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ExerciseSetRow } from './ExerciseSetRow';
import { WarmupCalculatorModal } from './WarmupCalculatorModal';
import { ExercisePickerDrawer } from './ExercisePickerDrawer';
import { Exercise } from '../../types';
import {
  Play,
  Pause,
  CheckCircle,
  X,
  Plus,
  Repeat,
  Info,
  Calculator,
  Flame,
  BookOpen,
  Film,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { ExerciseMedia, ExerciseAutoplayEmbed } from './ExerciseMedia';

export const ActiveWorkoutModal: React.FC = () => {
  const {
    activeSession,
    setActiveSession,
    pauseWorkout,
    resumeWorkout,
    updateSet,
    toggleSetComplete,
    addSet,
    removeSet,
    replaceExercise,
    finishWorkout,
    cancelWorkout,
    userProfile,
    programWeek,
    exercises,
    addExerciseToActiveSession,
    openGuidebook
  } = useFitness();

  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sessionTitle, setSessionTitle] = useState(
    activeSession ? activeSession.workoutTitle : ''
  );
  const [subModalExerciseIdx, setSubModalExerciseIdx] = useState<number | null>(null);
  const [subPreviewVideoIdx, setSubPreviewVideoIdx] = useState<number | null>(null);
  const [warmupModalExIdx, setWarmupModalExIdx] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!activeSession) return null;

  const minutes = Math.floor(activeSession.elapsedTimeSec / 60);
  const seconds = activeSession.elapsedTimeSec % 60;
  const formattedDuration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;

  let totalSets = 0;
  let completedSets = 0;
  activeSession.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      totalSets++;
      if (s.completed) completedSets++;
    });
  });
  const progressPct = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  // Resolve curated PDF substitutions + original movement + same-muscle movements for the Exercise Swap Drawer
  const targetSwapEx =
    subModalExerciseIdx !== null ? activeSession.exercises[subModalExerciseIdx] : null;

  const curatedSwapOptions: Exercise[] = [];
  const sameMuscleOptions: Exercise[] = [];

  if (targetSwapEx) {
    const rootOriginal = targetSwapEx.originalExercise || targetSwapEx;

    // If currently swapped to an alternate, offer the Original PDF Exercise as the top option to switch back
    if (
      targetSwapEx.swappedFromName &&
      rootOriginal.name.toLowerCase() !== targetSwapEx.name.toLowerCase()
    ) {
      curatedSwapOptions.push(rootOriginal);
    }

    (rootOriginal.substitutions || targetSwapEx.substitutions)?.forEach((sub, idx) => {
      if (sub.name.toLowerCase() === targetSwapEx.name.toLowerCase()) return;
      const existingInLib = exercises.find(
        e => e.name.toLowerCase() === sub.name.toLowerCase()
      );
      if (existingInLib) {
        curatedSwapOptions.push({
          ...existingInLib,
          videoId: sub.videoId || existingInLib.videoId,
          notes: sub.notes || existingInLib.notes,
          mediaUrl: sub.mediaUrl || existingInLib.mediaUrl
        });
      } else {
        curatedSwapOptions.push({
          id: `${rootOriginal.id}-sub-${idx + 1}`,
          name: sub.name,
          targetMuscle: rootOriginal.targetMuscle,
          secondaryMuscles: rootOriginal.secondaryMuscles,
          equipment: sub.equipment,
          category: rootOriginal.category,
          defaultSets: rootOriginal.defaultSets,
          defaultReps: rootOriginal.defaultReps,
          defaultRestSec: rootOriginal.defaultRestSec,
          warmupSets: rootOriginal.warmupSets,
          notes: sub.notes || rootOriginal.notes,
          videoId: sub.videoId || rootOriginal.videoId,
          mediaUrl: sub.mediaUrl || rootOriginal.mediaUrl,
          substitutions: rootOriginal.substitutions,
          prescriptions: rootOriginal.prescriptions
        });
      }
    });

    exercises.forEach(cand => {
      const alreadyInCurated = curatedSwapOptions.some(
        c => c.name.toLowerCase() === cand.name.toLowerCase()
      );
      if (
        cand.id !== targetSwapEx.id &&
        cand.name.toLowerCase() !== targetSwapEx.name.toLowerCase() &&
        !alreadyInCurated &&
        (cand.targetMuscle === targetSwapEx.targetMuscle ||
          cand.category === targetSwapEx.category)
      ) {
        sameMuscleOptions.push(cand);
      }
    });
  }

  const warmupTargetEx =
    warmupModalExIdx !== null ? activeSession.exercises[warmupModalExIdx] : null;
  const warmupTargetWeight = warmupTargetEx?.sets?.[0]?.weight
    ? parseFloat(String(warmupTargetEx.sets[0].weight)) || 80
    : 80;

  return (
    <div className="fixed inset-0 z-50 bg-[#101112] overflow-y-auto pb-44 animate-in fade-in duration-200">
      {/* Sticky Active Workout Control Bar */}
      <div className="sticky top-0 z-40 bg-[#101112]/90 backdrop-blur-2xl border-b border-white/[0.1] px-4 py-3 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C7FF3D] animate-ping" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C7FF3D]">
                WEEK {activeSession.programWeek || programWeek}{' '}
                {activeSession.dayCode ? `• ${activeSession.dayCode} ` : ''}SESSION LIVE
              </span>
            </div>
            {activeSession.workoutId.startsWith('freestyle-') ? (
              <input
                type="text"
                value={sessionTitle}
                onChange={e => setSessionTitle(e.target.value)}
                onBlur={e => {
                  const next = e.target.value.trim();
                  setSessionTitle(next);
                  setActiveSession(prev =>
                    prev ? { ...prev, workoutTitle: next || prev.workoutTitle } : null
                  );
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="text-base font-black text-white bg-transparent border-b border-[#C7FF3D]/50 focus:border-[#C7FF3D] focus:outline-none truncate max-w-[220px]"
                autoFocus
              />
            ) : (
              <h2 className="text-base font-black text-white truncate leading-tight">
                {activeSession.workoutTitle}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openGuidebook('guidelines')}
              className="btn-glass-subtle px-2.5 py-1.5 rounded-full text-[11px] font-bold text-[#C7FF3D] border-[#C7FF3D]/30 hidden sm:flex items-center gap-1"
              title="Open PDF Program Notes & Warm-up Guide"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>PDF Guide</span>
            </button>

            <div className="px-3 py-1.5 rounded-full bg-[#1C1F20] border border-white/10 text-xs font-black tabular-nums text-white flex items-center gap-1.5 shadow-inner">
              <span className="text-[#C7FF3D]">⏱️</span>
              <span>{formattedDuration}</span>
            </div>

            <button
              type="button"
              onClick={activeSession.isPaused ? resumeWorkout : pauseWorkout}
              className="btn-glass-subtle w-9 h-9 rounded-full flex items-center justify-center text-white"
              title={activeSession.isPaused ? 'Resume Session' : 'Pause Session'}
            >
              {activeSession.isPaused ? (
                <Play className="w-4 h-4 fill-[#C7FF3D] text-[#C7FF3D]" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => finishWorkout(8.5)}
              className="btn-electric-lime px-3.5 py-1.5 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#C7FF3D]/25"
            >
              <CheckCircle className="w-4 h-4" />
              <span>FINISH</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCancelConfirm(true)}
              className="btn-glass-subtle w-9 h-9 rounded-full flex items-center justify-center text-rose-400 hover:text-rose-300"
              title="Cancel Workout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-2.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-[#929895] mb-1">
            <span>
              Progress: {completedSets} of {totalSets} Working Sets Completed
            </span>
            <span className="text-[#C7FF3D]">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C7FF3D] to-[#65D9C0] transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Exercises List Container */}
      <div className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
        {activeSession.exercises.map((ex, exIdx) => {
          const isVideoOpen = activeVideoKey === `${ex.id}-${exIdx}`;
          const lastSetTech = ex.sets[ex.sets.length - 1]?.intensityTech;
          const rootOriginal = ex.originalExercise || ex;
          const pdfSubs = rootOriginal.substitutions || ex.substitutions || [];

          return (
            <GlassCard
              key={`${ex.id}-${exIdx}`}
              variant="standard"
              className="p-4 sm:p-5 space-y-3.5"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div className="flex items-start gap-3 min-w-0">
                  <ExerciseMedia
                    exercise={ex}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/[0.08] shrink-0"
                  />
                  <div className="w-8 h-8 rounded-xl bg-[#C7FF3D]/15 border border-[#C7FF3D]/30 flex items-center justify-center font-black text-xs text-[#C7FF3D] shrink-0 mt-0.5">
                    #{exIdx + 1}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C7FF3D]">
                        {ex.targetMuscle} • {ex.equipment}
                      </span>
                      {ex.warmupSets && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-white/[0.06] text-[#929895]">
                          Warm-up: {ex.warmupSets} sets
                        </span>
                      )}
                      {lastSetTech && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#FF9A58]/15 text-[#FF9A58] border border-[#FF9A58]/30 flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" /> Last Set: {lastSetTech}
                        </span>
                      )}
                      {ex.swappedFromName && (
                        <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-[#65D9C0]/20 text-[#65D9C0] border border-[#65D9C0]/30">
                          Alternate for {ex.swappedFromName}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-white tracking-tight leading-snug">
                      {ex.name}
                    </h3>
                  </div>
                </div>

                {/* Action Pills: Warm-Up Calc, YouTube Autoplay, Swap */}
                <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                  <button
                    type="button"
                    onClick={() => setWarmupModalExIdx(exIdx)}
                    className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#65D9C0] hover:text-white flex items-center gap-1"
                    title="Calculate Warm-Up Pyramid"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Warm-Up</span>
                  </button>

                  {ex.videoId && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveVideoKey(isVideoOpen ? null : `${ex.id}-${exIdx}`)
                      }
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                        isVideoOpen
                          ? 'bg-[#C7FF3D] text-[#101112]'
                          : 'btn-glass-subtle text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D]'
                      }`}
                    >
                      {isVideoOpen ? (
                        <>
                          <Film className="w-3.5 h-3.5" />
                          <span>GIF View</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-[#C7FF3D]" />
                          <span>YouTube</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSubPreviewVideoIdx(null);
                      setSubModalExerciseIdx(exIdx);
                    }}
                    className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#929895] hover:text-[#C7FF3D] flex items-center gap-1"
                    title="Swap with PDF Alternate Exercise"
                  >
                    <Repeat className="w-3 h-3" />
                    <span>Alternates</span>
                  </button>
                </div>
              </div>

              {/* Inline YouTube Auto-Play Embed */}
              {isVideoOpen && ex.videoId && (
                <ExerciseAutoplayEmbed
                  videoId={ex.videoId}
                  videoStart={ex.videoStart}
                  title={ex.name}
                  onSwitchToGif={() => setActiveVideoKey(null)}
                />
              )}

              {/* Quick 1-Tap PDF Alternate Exercise Switcher Bar */}
              {pdfSubs.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl bg-[#141618] border border-white/[0.06]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#65D9C0] flex items-center gap-1 mr-1">
                    <Repeat className="w-3 h-3" /> PDF Alternates:
                  </span>
                  {ex.swappedFromName && (
                    <button
                      type="button"
                      onClick={() => replaceExercise(exIdx, rootOriginal)}
                      className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30 hover:bg-[#C7FF3D] hover:text-[#101112] transition flex items-center gap-1"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Original: {rootOriginal.name}</span>
                    </button>
                  )}
                  {pdfSubs.map((sub, sIdx) => {
                    const isCurrent = ex.name.toLowerCase() === sub.name.toLowerCase();
                    return (
                      <button
                        key={sub.name}
                        type="button"
                        disabled={isCurrent}
                        onClick={() => {
                          const existing = exercises.find(
                            e => e.name.toLowerCase() === sub.name.toLowerCase()
                          );
                          const candidate: Exercise = existing
                            ? {
                                ...existing,
                                videoId: sub.videoId || existing.videoId,
                                notes: sub.notes || existing.notes,
                                mediaUrl: sub.mediaUrl || existing.mediaUrl
                              }
                            : {
                                id: `${rootOriginal.id}-sub-${sIdx + 1}`,
                                name: sub.name,
                                targetMuscle: rootOriginal.targetMuscle,
                                secondaryMuscles: rootOriginal.secondaryMuscles,
                                equipment: sub.equipment,
                                category: rootOriginal.category,
                                defaultSets: rootOriginal.defaultSets,
                                defaultReps: rootOriginal.defaultReps,
                                defaultRestSec: rootOriginal.defaultRestSec,
                                warmupSets: rootOriginal.warmupSets,
                                notes: sub.notes || rootOriginal.notes,
                                videoId: sub.videoId,
                                mediaUrl: sub.mediaUrl
                              };
                          replaceExercise(exIdx, candidate);
                        }}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border transition ${
                          isCurrent
                            ? 'bg-[#65D9C0] text-[#101112] border-[#65D9C0] font-black'
                            : 'bg-white/[0.04] text-white/85 border-white/10 hover:border-[#65D9C0] hover:text-[#65D9C0]'
                        }`}
                      >
                        Opt {sIdx + 1}: {sub.name} ({sub.equipment})
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Smart Double-Progression Target Banner */}
              {ex.progressionBanner && (
                <div className="rounded-xl bg-[#C7FF3D]/[0.08] border border-[#C7FF3D]/25 p-2 px-3 text-[11px] font-semibold text-[#C7FF3D] flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span>{ex.progressionBanner}</span>
                </div>
              )}

              {/* PDF Coach Cue */}
              <div className="rounded-xl bg-[#151718] border border-white/[0.06] p-2.5 px-3 text-[11px] text-[#929895] flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#C7FF3D] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Coach Cue:</strong> {ex.notes}
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {ex.sets.map((set, sIdx) => (
                  <ExerciseSetRow
                    key={set.id}
                    set={set}
                    exerciseIndex={exIdx}
                    setIndex={sIdx}
                    unit={userProfile.unit}
                    onUpdate={(field, val) => updateSet(exIdx, sIdx, field, val)}
                    onToggleComplete={() => toggleSetComplete(exIdx, sIdx)}
                    onRemove={() => removeSet(exIdx, sIdx)}
                    canRemove={ex.sets.length > 1}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => addSet(exIdx)}
                className="w-full py-2 rounded-xl border border-dashed border-white/15 text-xs font-bold text-[#929895] hover:text-white hover:border-[#C7FF3D]/40 transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Working Set</span>
              </button>
            </GlassCard>
          );
        })}

        {/* + Add Exercise to Session */}
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="w-full py-3 rounded-xl border border-dashed border-[#C7FF3D]/50 text-xs font-bold text-[#C7FF3D] hover:bg-[#C7FF3D]/10 transition flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Exercise to Session</span>
        </button>
      </div>

      {/* Curated Exercise Substitution Modal Drawer with GIF + Autoplay YouTube Preview */}
      {subModalExerciseIdx !== null && targetSwapEx && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
          onClick={() => setSubModalExerciseIdx(null)}
        >
          <div
            className="bg-[#1C1F20] border border-white/15 w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] p-5 space-y-4 shadow-2xl max-h-[88vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#65D9C0]">
                  PDF Alternate Exercise Switcher
                </span>
                <h4 className="text-sm sm:text-base font-black text-white">
                  Swap {targetSwapEx.name}
                </h4>
                <p className="text-[11px] text-[#929895]">
                  Preview integrated GIF or Autoplay YouTube demo before swapping
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubModalExerciseIdx(null)}
                className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {curatedSwapOptions.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#C7FF3D]">
                    PDF Program Recommended Substitutions
                  </span>
                  {curatedSwapOptions.map((cand, idx) => {
                    const isPreviewingVideo = subPreviewVideoIdx === idx;
                    return (
                      <div
                        key={`${cand.id}-${idx}`}
                        className="p-3.5 rounded-2xl bg-[#151718] border border-[#C7FF3D]/35 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2.5">
                          <div className="flex items-center gap-3 min-w-0">
                            <ExerciseMedia
                              exercise={cand}
                              className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-[#C7FF3D]/15 text-[#C7FF3D]">
                                  PDF Option {idx + 1}
                                </span>
                                <span className="text-xs sm:text-sm font-black text-white truncate">
                                  {cand.name}
                                </span>
                              </div>
                              <div className="text-[10px] text-[#65D9C0] font-bold mt-0.5">
                                {cand.targetMuscle} • {cand.equipment}
                              </div>
                              <p className="text-[10px] text-[#929895] mt-0.5 line-clamp-2">
                                {cand.notes}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
                            {cand.videoId && (
                              <button
                                type="button"
                                onClick={() =>
                                  setSubPreviewVideoIdx(isPreviewingVideo ? null : idx)
                                }
                                className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black transition flex items-center gap-1 ${
                                  isPreviewingVideo
                                    ? 'bg-[#C7FF3D] text-[#101112]'
                                    : 'btn-glass-subtle text-[#C7FF3D]'
                                }`}
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>{isPreviewingVideo ? 'Hide Video' : 'Autoplay'}</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                replaceExercise(subModalExerciseIdx, cand);
                                setSubModalExerciseIdx(null);
                              }}
                              className="btn-electric-lime px-3 py-1.5 rounded-xl text-xs font-black shrink-0"
                            >
                              Swap →
                            </button>
                          </div>
                        </div>

                        {isPreviewingVideo && cand.videoId && (
                          <ExerciseAutoplayEmbed
                            videoId={cand.videoId}
                            videoStart={cand.videoStart}
                            title={cand.name}
                            onSwitchToGif={() => setSubPreviewVideoIdx(null)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {sameMuscleOptions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#929895]">
                    Other {targetSwapEx.targetMuscle} Movements in Library
                  </span>
                  {sameMuscleOptions.slice(0, 12).map(cand => (
                    <button
                      key={cand.id}
                      type="button"
                      onClick={() => {
                        replaceExercise(subModalExerciseIdx, cand);
                        setSubModalExerciseIdx(null);
                      }}
                      className="w-full text-left p-2.5 rounded-2xl bg-[#151718] border border-white/[0.08] hover:border-[#C7FF3D]/50 transition flex items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ExerciseMedia
                          exercise={cand}
                          className="w-11 h-11 rounded-xl object-cover border border-white/10 shrink-0"
                          showBadge={false}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            {cand.name}
                          </div>
                          <div className="text-[10px] text-[#929895]">
                            {cand.targetMuscle} • {cand.equipment}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#C7FF3D] shrink-0">
                        Select
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Working-Weight Warm-Up Pyramid Calculator Modal */}
      <WarmupCalculatorModal
        isOpen={warmupModalExIdx !== null}
        onClose={() => setWarmupModalExIdx(null)}
        initialWorkingWeight={warmupTargetWeight}
        exerciseName={warmupTargetEx?.name}
        warmupCountHint={warmupTargetEx?.warmupSets || '2-3'}
        unit={userProfile.unit}
      />

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C1F20] border border-white/15 w-full max-w-sm rounded-[24px] p-5 space-y-4 shadow-2xl">
            <h4 className="text-base font-black text-white">Discard Workout?</h4>
            <p className="text-xs text-[#929895]">
              Are you sure you want to exit? Your recorded sets for this session will not be saved to your history.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="btn-glass-subtle flex-1 py-2.5 rounded-xl text-xs font-bold"
              >
                Keep Training
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCancelConfirm(false);
                  cancelWorkout();
                }}
                className="bg-rose-600 hover:bg-rose-500 text-white flex-1 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-rose-900/30"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {pickerOpen && (
        <ExercisePickerDrawer
          isOpen={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelect={addExerciseToActiveSession}
        />
      )}
    </div>
  );
};
