import React, { useState, useMemo, useEffect } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Workout, Exercise, WorkoutCategory, DifficultyLevel, Equipment } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { ExercisePickerDrawer } from './ExercisePickerDrawer';
import { ExerciseMedia, ExerciseAutoplayEmbed } from './ExerciseMedia';
import {
  X,
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Clock,
  Dumbbell,
  Target,
  Share2,
  Save,
  Play,
  Film
} from 'lucide-react';

type IntensityTechnique =
  | 'None'
  | 'Failure'
  | 'Failure + LLPs (Extend set)'
  | 'Myo-reps'
  | 'Static Stretch (30s)'
  | 'Drop Set'
  | 'Rest-Pause';

const INTENSITY_OPTIONS: IntensityTechnique[] = [
  'None',
  'Failure',
  'Failure + LLPs (Extend set)',
  'Myo-reps',
  'Static Stretch (30s)',
  'Drop Set',
  'Rest-Pause'
];

const REST_OPTIONS: number[] = [60, 90, 120, 150, 180, 240];

const CATEGORY_OPTIONS: WorkoutCategory[] = [
  'Hypertrophy',
  'Strength',
  'Full Body',
  'Fat Loss',
  'Bodyweight',
  'Cardio',
  'Mobility',
  'Recovery'
];

const LEVEL_OPTIONS: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

interface RoutineExercise {
  exercise: Exercise;
  sets: number;
  repRange: string;
  restSec: number;
  warmupSets: string;
  earlyRpe: string;
  lastRpe: string;
  intensity: IntensityTechnique;
}

interface RoutineDraft {
  title: string;
  subtitle: string;
  category: WorkoutCategory;
  level: DifficultyLevel;
  durationMin: number;
  shareWithClub: boolean;
  customGuidelinesText: string;
}

interface HevyRoutineBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutToEdit?: Workout;
}

const EMPTY_DRAFT: RoutineDraft = {
  title: '',
  subtitle: '',
  category: 'Hypertrophy',
  level: 'Intermediate',
  durationMin: 60,
  shareWithClub: false,
  customGuidelinesText: ''
};

export const HevyRoutineBuilderModal: React.FC<HevyRoutineBuilderModalProps> = ({
  isOpen,
  onClose,
  workoutToEdit
}) => {
  const { createCustomWorkout, updateCustomWorkout } = useFitness();
  const [draft, setDraft] = useState<RoutineDraft>({ ...EMPTY_DRAFT });
  const [routineExercises, setRoutineExercises] = useState<RoutineExercise[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [previewVideoExId, setPreviewVideoExId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setDraft({ ...EMPTY_DRAFT });
      setRoutineExercises([]);
      setTitleError(false);
      setPickerOpen(false);
      setPreviewVideoExId(null);
      return;
    }
    if (workoutToEdit) {
      setDraft({
        title: workoutToEdit.title,
        subtitle: workoutToEdit.subtitle,
        category: workoutToEdit.category as WorkoutCategory,
        level: workoutToEdit.level as DifficultyLevel,
        durationMin: workoutToEdit.durationMin,
        shareWithClub: Boolean(workoutToEdit.isPublic),
        customGuidelinesText: (workoutToEdit.customGuidelines || []).join('\n')
      });
      setRoutineExercises(
        workoutToEdit.exercises.map(ex => ({
          exercise: ex,
          sets: ex.defaultSets,
          repRange: ex.defaultReps,
          restSec: ex.defaultRestSec,
          warmupSets: ex.warmupSets || '1-2',
          earlyRpe: ex.prescriptions?.w2_5?.earlyRpe || '~8-9',
          lastRpe: ex.prescriptions?.w2_5?.lastRpe || '10',
          intensity:
            (ex.prescriptions?.w2_5?.tech as IntensityTechnique) || 'Failure'
        }))
      );
    } else {
      setDraft({ ...EMPTY_DRAFT });
      setRoutineExercises([]);
      setTitleError(false);
    }
  }, [isOpen, workoutToEdit]);

  const computedStats = useMemo(() => {
    const totalRestSec = routineExercises.reduce(
      (sum, re) => sum + re.sets * re.restSec,
      0
    );
    const durationMin = Math.max(
      15,
      Math.ceil(totalRestSec / 60) + routineExercises.length * 3 + 5
    );
    const targetMuscles = new Set<string>();
    const equipmentSet = new Set<Equipment>();
    routineExercises.forEach(re => {
      targetMuscles.add(re.exercise.targetMuscle);
      (re.exercise.secondaryMuscles || []).forEach(m => targetMuscles.add(m));
      equipmentSet.add(re.exercise.equipment);
    });
    return {
      durationMin,
      targetMuscles: Array.from(targetMuscles).sort(),
      equipment: Array.from(equipmentSet)
    };
  }, [routineExercises]);

  const handleAddExercise = (ex: Exercise) => {
    if (routineExercises.some(re => re.exercise.id === ex.id)) return;
    setRoutineExercises(prev => [
      ...prev,
      {
        exercise: ex,
        sets: Math.max(1, Math.min(10, ex.defaultSets)),
        repRange: ex.defaultReps,
        restSec: ex.defaultRestSec,
        warmupSets: ex.warmupSets || '1-2',
        earlyRpe: '~8-9',
        lastRpe: '10',
        intensity: 'Failure'
      }
    ]);
    setPickerOpen(false);
  };

  const updatePrescription = (
    idx: number,
    field: keyof Omit<RoutineExercise, 'exercise'>,
    value: string | number
  ) => {
    setRoutineExercises(prev =>
      prev.map((re, i) => (i === idx ? { ...re, [field]: value } : re))
    );
  };

  const moveExercise = (idx: number, dir: -1 | 1) => {
    setRoutineExercises(prev => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const removeExercise = (idx: number) => {
    setRoutineExercises(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!draft.title.trim()) {
      setTitleError(true);
      return;
    }
    const workoutExercises: Exercise[] = routineExercises.map(re => ({
      ...re.exercise,
      defaultSets: re.sets,
      defaultReps: re.repRange,
      defaultRestSec: re.restSec,
      warmupSets: re.warmupSets,
      prescriptions: {
        w1: {
          sets: Math.max(1, re.sets - 1),
          tech: 'N/A',
          earlyRpe: '~7-8',
          lastRpe: '~8-9'
        },
        w2_5: {
          sets: re.sets,
          tech: re.intensity === 'None' ? 'N/A' : re.intensity,
          earlyRpe: re.earlyRpe,
          lastRpe: re.lastRpe
        }
      }
    }));

    const parsedGuidelines = draft.customGuidelinesText
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    const input = {
      title: draft.title.trim(),
      subtitle:
        draft.subtitle.trim() ||
        `${routineExercises.length} Exercises • Custom Hypertrophy Routine`,
      category: draft.category,
      level: draft.level,
      durationMin: computedStats.durationMin,
      targetMuscles:
        computedStats.targetMuscles.length > 0
          ? computedStats.targetMuscles
          : ['Full Body'],
      equipment:
        computedStats.equipment.length > 0 ? computedStats.equipment : (['Dumbbells'] as Equipment[]),
      exercises: workoutExercises,
      image: workoutToEdit?.image,
      programPhase: 'Standalone' as const,
      shareWithClub: draft.shareWithClub,
      customGuidelines: parsedGuidelines.length > 0 ? parsedGuidelines : undefined
    };

    if (workoutToEdit) {
      updateCustomWorkout(workoutToEdit.id, input as Partial<Workout>);
    } else {
      createCustomWorkout(input);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1F20] border border-white/15 w-full max-w-xl rounded-[30px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-[#C7FF3D]/15 via-[#1C1F20] to-[#1C1F20]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C7FF3D]/15 border border-[#C7FF3D]/30 flex items-center justify-center text-[#C7FF3D]">
              <Save className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                {workoutToEdit ? 'Edit Custom Workout' : 'Custom Workout Library Builder'}
              </span>
              <h3 className="text-sm font-black text-white">
                {workoutToEdit
                  ? `Editing "${workoutToEdit.title}"`
                  : 'Create Custom Workout Plan with GIFs & YouTube'}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-[10px] font-bold text-white cursor-pointer">
              <input
                type="checkbox"
                checked={draft.shareWithClub}
                onChange={e => setDraft({ ...draft, shareWithClub: e.target.checked })}
                className="accent-[#C7FF3D]"
              />
              <span className="hidden sm:inline">Share with Club</span>
              <Share2 className="w-3 h-3 text-[#C7FF3D]" />
            </label>
            <button
              type="button"
              onClick={onClose}
              className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Routine Metadata */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-white">
                Workout Title <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Jeff Nippard Arm & Deltoid Specialization"
                value={draft.title}
                onChange={e => {
                  setTitleError(false);
                  setDraft({ ...draft, title: e.target.value });
                }}
                className={`w-full bg-[#151718] border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7FF3D] ${
                  titleError ? 'border-[#EF4444]' : 'border-white/[0.08]'
                }`}
              />
              {titleError && (
                <p className="text-[10px] text-[#EF4444] font-bold">Title is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Subtitle / Block Focus</label>
              <input
                type="text"
                placeholder="e.g. Lengthened Partials, RPE 10 Last Set & Warm-Up Pyramids"
                value={draft.subtitle}
                onChange={e => setDraft({ ...draft, subtitle: e.target.value })}
                className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white">
                Custom Workout Guidelines / Warm-Up Notes (Optional, 1 per line)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Perform 2 warm-up pyramid sets (50% & 70%) before first compound movement…"
                value={draft.customGuidelinesText}
                onChange={e =>
                  setDraft({ ...draft, customGuidelinesText: e.target.value })
                }
                className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORY_OPTIONS.slice(0, 4).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setDraft({ ...draft, category: cat })}
                      className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition border ${
                        draft.category === cat
                          ? 'bg-[#C7FF3D]/20 text-[#C7FF3D] border-[#C7FF3D]/50'
                          : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Difficulty</label>
                <div className="flex flex-wrap gap-1.5">
                  {LEVEL_OPTIONS.map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setDraft({ ...draft, level: lvl })}
                      className={`px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition border ${
                        draft.level === lvl
                          ? 'bg-[#65D9C0]/20 text-[#65D9C0] border-[#65D9C0]/50'
                          : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exercise Picker & Prescription Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#929895]">
                  Exercises, Sets, RPE & Last-Set Intensity
                </span>
                <p className="text-[10px] text-[#929895]">
                  {routineExercises.length} movements • Includes GIF + YouTube Autoplay + PDF Substitutions
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="btn-electric-lime px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#C7FF3D]/25"
              >
                <Plus className="w-3 h-3 fill-[#101112]" />
                <span>Add Exercise</span>
              </button>
            </div>

            {routineExercises.length === 0 && (
              <GlassCard variant="inset" className="text-center p-6 space-y-2">
                <Dumbbell className="w-7 h-7 text-[#929895] mx-auto" />
                <h4 className="text-sm font-bold text-white">No exercises added yet</h4>
                <p className="text-[11px] text-[#929895]">
                  Click &ldquo;Add Exercise&rdquo; to pick from the PDF &amp; GIF library, or create a custom exercise with a YouTube link.
                </p>
              </GlassCard>
            )}

            {routineExercises.map((re, idx) => {
              const isVideoOpen = previewVideoExId === re.exercise.id;
              return (
                <GlassCard
                  key={re.exercise.id}
                  variant="standard"
                  className="p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <ExerciseMedia
                        exercise={re.exercise}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                        showBadge={false}
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-white truncate">
                          {idx + 1}. {re.exercise.name}
                        </h4>
                        <p className="text-[10px] text-[#929895] truncate">
                          {re.exercise.targetMuscle} • {re.exercise.equipment}
                          {re.exercise.substitutions?.length
                            ? ` • ${re.exercise.substitutions.length} PDF Alternates`
                            : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {re.exercise.videoId && (
                        <button
                          type="button"
                          onClick={() =>
                            setPreviewVideoExId(isVideoOpen ? null : re.exercise.id)
                          }
                          className="btn-glass-subtle px-2 py-1 rounded-lg text-[10px] font-bold text-[#C7FF3D] flex items-center gap-1"
                        >
                          {isVideoOpen ? (
                            <Film className="w-3 h-3" />
                          ) : (
                            <Play className="w-3 h-3 fill-[#C7FF3D]" />
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveExercise(idx, -1)}
                        className="w-7 h-7 rounded-xl btn-glass-subtle flex items-center justify-center text-[10px] font-black disabled:opacity-30"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === routineExercises.length - 1}
                        onClick={() => moveExercise(idx, 1)}
                        className="w-7 h-7 rounded-xl btn-glass-subtle flex items-center justify-center text-[10px] font-black disabled:opacity-30"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeExercise(idx)}
                        className="w-7 h-7 rounded-xl text-rose-400 hover:bg-[#EF4444]/20 flex items-center justify-center"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {isVideoOpen && re.exercise.videoId && (
                    <ExerciseAutoplayEmbed
                      videoId={re.exercise.videoId}
                      videoStart={re.exercise.videoStart}
                      title={re.exercise.name}
                      onSwitchToGif={() => setPreviewVideoExId(null)}
                    />
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#929895]">
                        Working Sets
                      </label>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updatePrescription(idx, 'sets', Math.max(1, re.sets - 1))
                          }
                          className="w-6 h-6 rounded-lg btn-glass-subtle flex items-center justify-center text-xs font-black"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs font-black text-white tabular-nums">
                          {re.sets}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updatePrescription(idx, 'sets', Math.min(10, re.sets + 1))
                          }
                          className="w-6 h-6 rounded-lg btn-glass-subtle flex items-center justify-center text-xs font-black"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#929895]">
                        Rep Range
                      </label>
                      <input
                        type="text"
                        value={re.repRange}
                        onChange={e =>
                          updatePrescription(idx, 'repRange', e.target.value)
                        }
                        className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-2 py-1.5 text-[10px] font-black text-white focus:outline-none focus:border-[#C7FF3D]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#929895]">
                        Rest Period
                      </label>
                      <select
                        value={re.restSec}
                        onChange={e =>
                          updatePrescription(idx, 'restSec', Number(e.target.value))
                        }
                        className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-2 py-1.5 text-[10px] font-black text-white focus:outline-none focus:border-[#C7FF3D]"
                      >
                        {REST_OPTIONS.map(sec => (
                          <option key={sec} value={sec}>
                            {sec}s
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#929895]">
                        Last-Set Technique
                      </label>
                      <select
                        value={re.intensity}
                        onChange={e =>
                          updatePrescription(idx, 'intensity', e.target.value)
                        }
                        className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-2 py-1.5 text-[10px] font-black text-[#FF9A58] focus:outline-none focus:border-[#C7FF3D]"
                      >
                        {INTENSITY_OPTIONS.map(tech => (
                          <option key={tech} value={tech}>
                            {tech}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </GlassCard>
              );
            })}

            {/* Computed Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-[#151718] border border-white/[0.08] text-center">
                <Clock className="w-4 h-4 text-[#C7FF3D] mx-auto mb-1" />
                <div className="text-[10px] uppercase font-bold text-[#929895]">
                  Est. Duration
                </div>
                <div className="text-xs font-black text-white">
                  {computedStats.durationMin} min
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151718] border border-white/[0.08] text-center">
                <Target className="w-4 h-4 text-[#65D9C0] mx-auto mb-1" />
                <div className="text-[10px] uppercase font-bold text-[#929895]">
                  Target Muscles
                </div>
                <div className="text-xs font-black text-white truncate">
                  {computedStats.targetMuscles.join(', ') || '—'}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#151718] border border-white/[0.08] text-center">
                <Dumbbell className="w-4 h-4 text-[#FF9A58] mx-auto mb-1" />
                <div className="text-[10px] uppercase font-bold text-[#929895]">
                  Equipment
                </div>
                <div className="text-xs font-black text-white truncate">
                  {computedStats.equipment.join(', ') || '—'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#151718] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-glass-subtle py-2.5 rounded-xl text-xs font-bold text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 btn-electric-lime py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#C7FF3D]/25"
          >
            {workoutToEdit ? 'Save Changes' : 'Save to Custom Workout Library'}
          </button>
        </div>
      </div>

      {pickerOpen && (
        <ExercisePickerDrawer
          isOpen={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelect={handleAddExercise}
        />
      )}
    </div>
  );
};