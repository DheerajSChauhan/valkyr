import React, { useState } from 'react';
import { useFitness, getPrescriptionForWeek } from '../../context/FitnessContext';
import { Exercise } from '../../types';
import {
  Play,
  Clock,
  Dumbbell,
  X,
  Bookmark,
  Target,
  Info,
  Repeat,
  Flame,
  BookOpen,
  Film,
  Check
} from 'lucide-react';
import { ExerciseMedia, ExerciseAutoplayEmbed } from './ExerciseMedia';

export const WorkoutDetailModal: React.FC = () => {
  const {
    selectedWorkoutDetail,
    setSelectedWorkoutDetail,
    startWorkout,
    toggleBookmark,
    programWeek,
    openGuidebook,
    swapWorkoutExerciseInPlan,
    exercises
  } = useFitness();

  const [activeVideoExId, setActiveVideoExId] = useState<string | null>(null);
  const [expandedAltExId, setExpandedAltExId] = useState<string | null>(null);
  const [previewSubVideo, setPreviewSubVideo] = useState<{
    exId: string;
    subIdx: number;
  } | null>(null);

  if (!selectedWorkoutDetail) return null;

  const isProgramWorkout =
    selectedWorkoutDetail.programPhase === 'Foundation (W1-5)' ||
    selectedWorkoutDetail.programPhase === 'Ramping (W6-12)';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setSelectedWorkoutDetail(null)}
    >
      <div
        className="bg-[#1C1F20] border border-white/15 w-full max-w-2xl rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Cover Image Header */}
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <img
            src={selectedWorkoutDetail.image}
            alt={selectedWorkoutDetail.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F20] via-[#1C1F20]/55 to-transparent" />

          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-black/65 text-[#C7FF3D] border border-[#C7FF3D]/30 backdrop-blur-md">
                {selectedWorkoutDetail.programPhase || selectedWorkoutDetail.category}
              </span>
              {selectedWorkoutDetail.dayCode && (
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-black/65 text-white border border-white/15 backdrop-blur-md">
                  Week {programWeek} • {selectedWorkoutDetail.dayCode}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedWorkoutDetail(null);
                  openGuidebook('guidelines');
                }}
                className="btn-glass-subtle px-2.5 py-1.5 rounded-full text-[11px] font-bold text-[#C7FF3D] border-[#C7FF3D]/30 flex items-center gap-1"
                title="View PDF Program Guidelines & Warm-Up Protocol"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>PDF Guide</span>
              </button>
              <button
                type="button"
                onClick={() => toggleBookmark(selectedWorkoutDetail.id)}
                className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-white"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    selectedWorkoutDetail.isBookmarked
                      ? 'fill-[#C7FF3D] text-[#C7FF3D]'
                      : ''
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setSelectedWorkoutDetail(null)}
                className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {selectedWorkoutDetail.title}
            </h2>
            <p className="text-xs text-[#929895] font-medium mt-0.5">
              {selectedWorkoutDetail.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-2xl bg-[#151718] border border-white/[0.08]">
              <Clock className="w-4 h-4 text-[#C7FF3D] mx-auto mb-1" />
              <div className="text-[10px] uppercase font-bold text-[#929895]">Duration</div>
              <div className="text-xs font-black text-white mt-0.5">
                {selectedWorkoutDetail.durationMin} mins
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#151718] border border-white/[0.08]">
              <Target className="w-4 h-4 text-[#C7FF3D] mx-auto mb-1" />
              <div className="text-[10px] uppercase font-bold text-[#929895]">Difficulty</div>
              <div className="text-xs font-black text-white mt-0.5">
                {selectedWorkoutDetail.level}
              </div>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#151718] border border-white/[0.08]">
              <Dumbbell className="w-4 h-4 text-[#C7FF3D] mx-auto mb-1" />
              <div className="text-[10px] uppercase font-bold text-[#929895]">Exercises</div>
              <div className="text-xs font-black text-white mt-0.5">
                {selectedWorkoutDetail.exercises.length} moves
              </div>
            </div>
          </div>

          {/* Active Week Periodization Rule Banner */}
          {isProgramWorkout && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#C7FF3D]/15 via-[#151718] to-[#151718] border border-[#C7FF3D]/30 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#C7FF3D]">
                  {programWeek === 1 || programWeek === 6
                    ? `Week ${programWeek} Intro / Acclimation Protocol`
                    : `Week ${programWeek} High-Intensity Overload Protocol`}
                </div>
                <p className="text-[11px] text-white/90">
                  {programWeek === 1 || programWeek === 6
                    ? 'Leave 1–3 reps in the tank (~6–9 RPE). No post-failure techniques this week.'
                    : 'Early Sets at ~8–9 RPE • Push the Last Set of every exercise to true Failure (RPE 10) + prescribed intensity techniques.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedWorkoutDetail(null);
                  openGuidebook('warmup');
                }}
                className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-[10px] font-black text-[#65D9C0] shrink-0"
              >
                Warm-Up Guide
              </button>
            </div>
          )}

          {/* Exercise Order Breakdown with Default GIF, Autoplay YouTube & Alternate Exercises */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#929895]">
                Exercise Prescription, Autoplay Demos & PDF Substitutions
              </span>
              <span className="text-[10px] font-bold text-[#C7FF3D]">
                GIF Default • Click Video or Alternates
              </span>
            </div>

            <div className="space-y-3">
              {selectedWorkoutDetail.exercises.map((ex, idx) => {
                const presc = getPrescriptionForWeek(ex, programWeek);
                const isVideoOpen = activeVideoExId === ex.id;
                const isAltExpanded = expandedAltExId === ex.id;

                return (
                  <div
                    key={`${ex.id}-${idx}`}
                    className="p-3.5 rounded-2xl bg-[#151718] border border-white/[0.08] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <ExerciseMedia
                          exercise={ex}
                          className="w-16 h-16 rounded-xl object-cover border border-white/[0.08] shrink-0"
                        />
                        <div className="w-6 h-6 rounded-lg bg-[#C7FF3D]/15 text-[#C7FF3D] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-extrabold uppercase text-[#C7FF3D]">
                              {ex.targetMuscle} • {ex.equipment}
                            </span>
                            {ex.warmupSets && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-white/[0.06] text-[#929895]">
                                Warm-up: {ex.warmupSets} sets
                              </span>
                            )}
                            {presc.tech && presc.tech !== 'N/A' && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#FF9A58]/15 text-[#FF9A58] border border-[#FF9A58]/30 flex items-center gap-0.5">
                                <Flame className="w-2.5 h-2.5" /> {presc.tech}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-black text-white leading-snug">
                            {ex.name}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-[#929895]">
                            <span className="text-white">
                              {presc.sets} sets × {ex.defaultReps}
                            </span>
                            <span>•</span>
                            <span>Early RPE {presc.earlyRpe}</span>
                            <span>•</span>
                            <span className="text-[#FF9A58]">Last RPE {presc.lastRpe}</span>
                            <span>•</span>
                            <span>Rest {ex.defaultRestSec}s</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: YouTube Autoplay & Alternates */}
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 shrink-0">
                        {ex.videoId && (
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewSubVideo(null);
                              setActiveVideoExId(isVideoOpen ? null : ex.id);
                            }}
                            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition flex items-center gap-1 ${
                              isVideoOpen
                                ? 'bg-[#C7FF3D] text-[#101112]'
                                : 'btn-glass-subtle text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D]'
                            }`}
                          >
                            {isVideoOpen ? (
                              <>
                                <Film className="w-3 h-3" />
                                <span>GIF</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-[#C7FF3D]" />
                                <span>YouTube</span>
                              </>
                            )}
                          </button>
                        )}

                        {ex.substitutions && ex.substitutions.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedAltExId(isAltExpanded ? null : ex.id)
                            }
                            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 ${
                              isAltExpanded
                                ? 'bg-[#65D9C0] text-[#101112]'
                                : 'btn-glass-subtle text-[#65D9C0] border-[#65D9C0]/30 hover:border-[#65D9C0]'
                            }`}
                          >
                            <Repeat className="w-3 h-3" />
                            <span>Alternates ({ex.substitutions.length})</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Autoplay YouTube Embed */}
                    {isVideoOpen && ex.videoId && (
                      <ExerciseAutoplayEmbed
                        videoId={ex.videoId}
                        videoStart={ex.videoStart}
                        title={ex.name}
                        onSwitchToGif={() => setActiveVideoExId(null)}
                      />
                    )}

                    {/* PDF Coaching Note */}
                    <div className="p-2 px-2.5 rounded-xl bg-[#101112]/70 border border-white/[0.05] text-[11px] text-[#929895] flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#C7FF3D] shrink-0 mt-0.5" />
                      <span>{ex.notes}</span>
                    </div>

                    {/* Compact PDF Alternate Exercise Pills (Always Visible + Expandable) */}
                    {ex.substitutions && ex.substitutions.length > 0 && !isAltExpanded && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] font-bold text-[#929895]">
                          PDF Alternates:
                        </span>
                        {ex.substitutions.map((sub, sIdx) => (
                          <button
                            key={sub.name}
                            type="button"
                            onClick={() => setExpandedAltExId(ex.id)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#65D9C0]/10 text-[#65D9C0] border border-[#65D9C0]/25 hover:bg-[#65D9C0]/20 transition"
                          >
                            Opt {sIdx + 1}: {sub.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Expanded Alternate Exercise Selector with GIF, Autoplay YouTube & 1-Tap Swap */}
                    {isAltExpanded && ex.substitutions && (
                      <div className="p-3 rounded-2xl bg-[#101112] border border-[#65D9C0]/35 space-y-2.5 animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#65D9C0]">
                            PDF Biomechanical Substitutions for {ex.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedAltExId(null);
                              setPreviewSubVideo(null);
                            }}
                            className="text-[10px] font-bold text-[#929895] hover:text-white"
                          >
                            Hide
                          </button>
                        </div>

                        <div className="space-y-2">
                          {ex.substitutions.map((sub, sIdx) => {
                            const isSubVideoOpen =
                              previewSubVideo?.exId === ex.id &&
                              previewSubVideo?.subIdx === sIdx;

                            const libraryMatch = exercises.find(
                              e => e.name.toLowerCase() === sub.name.toLowerCase()
                            );

                            const candidateEx: Exercise = libraryMatch || {
                              id: `${ex.id}-sub-${sIdx + 1}`,
                              name: sub.name,
                              targetMuscle: ex.targetMuscle,
                              secondaryMuscles: ex.secondaryMuscles,
                              equipment: sub.equipment,
                              category: ex.category,
                              defaultSets: ex.defaultSets,
                              defaultReps: ex.defaultReps,
                              defaultRestSec: ex.defaultRestSec,
                              warmupSets: ex.warmupSets,
                              notes: sub.notes || ex.notes,
                              videoId: sub.videoId,
                              mediaUrl: sub.mediaUrl
                            };

                            return (
                              <div
                                key={sub.name}
                                className="p-2.5 rounded-xl bg-[#171A1C] border border-white/10 space-y-2"
                              >
                                <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <ExerciseMedia
                                      exercise={candidateEx}
                                      className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-[#65D9C0]/20 text-[#65D9C0]">
                                          Option {sIdx + 1}
                                        </span>
                                        <span className="text-xs font-black text-white truncate">
                                          {sub.name}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-[#929895] mt-0.5 line-clamp-2">
                                        {sub.equipment} • {sub.notes || ex.notes}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {sub.videoId && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setPreviewSubVideo(
                                            isSubVideoOpen
                                              ? null
                                              : { exId: ex.id, subIdx: sIdx }
                                          )
                                        }
                                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition flex items-center gap-1 ${
                                          isSubVideoOpen
                                            ? 'bg-[#C7FF3D] text-[#101112]'
                                            : 'btn-glass-subtle text-[#C7FF3D]'
                                        }`}
                                      >
                                        <Play className="w-2.5 h-2.5 fill-current" />
                                        <span>{isSubVideoOpen ? 'Hide Demo' : 'Autoplay'}</span>
                                      </button>
                                    )}

                                    <button
                                      type="button"
                                      onClick={() => {
                                        swapWorkoutExerciseInPlan(
                                          selectedWorkoutDetail.id,
                                          idx,
                                          candidateEx
                                        );
                                        setExpandedAltExId(null);
                                      }}
                                      className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-[#65D9C0] text-[#101112] hover:opacity-90 transition flex items-center gap-1"
                                    >
                                      <Check className="w-3 h-3 stroke-[3]" />
                                      <span>Use Alternate</span>
                                    </button>
                                  </div>
                                </div>

                                {isSubVideoOpen && sub.videoId && (
                                  <ExerciseAutoplayEmbed
                                    videoId={sub.videoId}
                                    videoStart={sub.videoStart}
                                    title={sub.name}
                                    onSwitchToGif={() => setPreviewSubVideo(null)}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Start CTA */}
        <div className="p-4 border-t border-white/[0.08] bg-[#151718]/90">
          <button
            type="button"
            onClick={() => {
              const workout = selectedWorkoutDetail;
              setSelectedWorkoutDetail(null);
              startWorkout(workout);
            }}
            className="btn-electric-lime w-full py-3.5 text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-[#C7FF3D]/25"
          >
            <Play className="w-4 h-4 fill-[#101112]" />
            <span>START WEEK {programWeek} WORKOUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
