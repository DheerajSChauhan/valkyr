import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Exercise, Equipment } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { X, Play, Film } from 'lucide-react';

const TARGET_MUSCLE_OPTIONS: string[] = [
  'Upper Chest',
  'Mid & Lower Chest',
  'Lats',
  'Upper Back & Lats',
  'Front & Lateral Delts',
  'Lateral Delts',
  'Rear Delts',
  'Quadriceps',
  'Hamstrings & Glutes',
  'Hamstrings',
  'Calves',
  'Biceps',
  'Triceps',
  'Core & Abs'
];

const SECONDARY_MUSCLE_OPTIONS: string[] = [
  ...TARGET_MUSCLE_OPTIONS,
  'Front Delts',
  'Traps',
  'Forearms',
  'Glutes',
  'Adductors'
];

const REST_TIMER_OPTIONS: number[] = [60, 90, 120, 180, 240];

const EQUIPMENT_OPTIONS_IN_MODAL: Equipment[] = [
  'Barbell',
  'Dumbbells',
  'Cables',
  'Machines',
  'Bodyweight',
  'Kettlebell',
  'Bands'
];

const extractYouTubeId = (input: string): string | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
};

interface CustomExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExerciseCreated: (exercise: Exercise) => void;
}

export const CustomExerciseModal: React.FC<CustomExerciseModalProps> = ({
  isOpen,
  onClose,
  onExerciseCreated
}) => {
  const { addCustomExercise } = useFitness();

  const [name, setName] = useState('');
  const [targetMuscle, setTargetMuscle] = useState(TARGET_MUSCLE_OPTIONS[0]);
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<Equipment>('Barbell');
  const [defaultSets, setDefaultSets] = useState(3);
  const [defaultReps, setDefaultReps] = useState('8-10');
  const [defaultRestSec, setDefaultRestSec] = useState(120);
  const [notes, setNotes] = useState('');
  const [youtubeInput, setYoutubeInput] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const resolvedVideoId = extractYouTubeId(youtubeInput);
  const nameError = name.trim().length === 0;

  const toggleSecondary = (muscle: string) => {
    setSecondaryMuscles(prev =>
      prev.includes(muscle) ? prev.filter(m => m !== muscle) : [...prev, muscle]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError) return;
    const exercise: Omit<Exercise, 'id'> = {
      name: name.trim(),
      targetMuscle,
      secondaryMuscles: secondaryMuscles.length > 0 ? secondaryMuscles : undefined,
      equipment,
      category: targetMuscle,
      defaultSets: Math.max(1, Math.min(10, defaultSets)),
      defaultReps: defaultReps.trim() || '8-10',
      defaultRestSec: Math.max(15, Math.min(900, defaultRestSec)),
      notes: notes.trim(),
      videoId: resolvedVideoId || undefined,
      mediaUrl: mediaUrl.trim() || undefined,
      isCustom: true
    };
    const createdExercise = addCustomExercise(exercise);
    onExerciseCreated(createdExercise);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1F20] border border-white/15 w-full max-w-md rounded-[30px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-[#C7FF3D]/15 via-[#1C1F20] to-[#1C1F20]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C7FF3D]/15 border border-[#C7FF3D]/30 flex items-center justify-center text-[#C7FF3D]">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                Custom Exercise Creator
              </span>
              <h3 className="text-sm font-black text-white">Build your own movement</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-white">
              Exercise Name <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Pendulum Squat / Viking Press"
              value={name}
              onChange={e => setName(e.target.value)}
              className={`w-full bg-[#151718] border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7FF3D] ${
                nameError ? 'border-[#EF4444]' : 'border-white/[0.08]'
              }`}
            />
            {nameError && (
              <p className="text-[10px] text-[#EF4444] font-bold">Exercise name is required</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white">Image or GIF URL</label>
            <input
              type="text"
              placeholder="/exercises/my-exercise.gif or https://..."
              value={mediaUrl}
              onChange={e => setMediaUrl(e.target.value)}
              className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
            />
            <p className="text-[10px] text-[#929895]">
              For built-in exercises, place a GIF at public/exercises/&lt;exercise-id&gt;.gif.
            </p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-white">
              Primary Target Muscle
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TARGET_MUSCLE_OPTIONS.map(muscle => (
                <button
                  key={muscle}
                  type="button"
                  onClick={() => setTargetMuscle(muscle)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                    targetMuscle === muscle
                      ? 'bg-[#C7FF3D]/20 text-[#C7FF3D] border-[#C7FF3D]/50'
                      : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                  }`}
                >
                  {muscle}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-white">
              Secondary Muscles
            </label>
            <div className="flex flex-wrap gap-2">
              {SECONDARY_MUSCLE_OPTIONS.map(muscle => (
                <button
                  key={muscle}
                  type="button"
                  onClick={() => toggleSecondary(muscle)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                    secondaryMuscles.includes(muscle)
                      ? 'bg-[#65D9C0]/20 text-[#65D9C0] border-[#65D9C0]/50'
                      : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                  }`}
                >
                  {muscle}
                </button>
              ))}
            </div>
            {secondaryMuscles.length > 0 && (
              <p className="text-[10px] text-[#65D9C0] font-bold">
                {secondaryMuscles.join(', ')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="flex items-center justify-between text-xs font-bold text-white">
              <span>Equipment</span>
            </label>
            <div className="flex gap-2">
              {EQUIPMENT_OPTIONS_IN_MODAL.map(eq => (
                <button
                  key={eq}
                  type="button"
                  onClick={() => setEquipment(eq)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
                    equipment === eq
                      ? 'bg-[#65D9C0]/20 text-[#65D9C0] border-[#65D9C0]/50'
                      : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                  }`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Default Working Sets</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDefaultSets(Math.max(1, defaultSets - 1))}
                  className="btn-glass-subtle w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white"
                >
                  −
                </button>
                <span className="w-8 text-center text-xs font-black text-white tabular-nums">
                  {defaultSets}
                </span>
                <button
                  type="button"
                  onClick={() => setDefaultSets(Math.min(10, defaultSets + 1))}
                  className="btn-glass-subtle w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white"
                >
                  +
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Default Rep Range</label>
              <input
                type="text"
                placeholder="8-10"
                value={defaultReps}
                onChange={e => setDefaultReps(e.target.value)}
                className="bg-[#151718] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white">Default Rest (sec)</label>
              <div className="flex gap-1">
                {REST_TIMER_OPTIONS.map(sec => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setDefaultRestSec(sec)}
                    className={`px-2 py-1.5 rounded-xl text-[10px] font-bold transition border ${
                      defaultRestSec === sec
                        ? 'bg-[#FF9A58]/20 text-[#FF9A58] border-[#FF9A58]/50'
                        : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white">Coaching Cue / Form Notes</label>
            <textarea
              rows={3}
              placeholder="Tips for good form, tempo, and common mistakes…"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-white">
              YouTube Video (URL or 11-char ID)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="https://youtu.be/dQw4w9WgXcQ"
                value={youtubeInput}
                onChange={e => setYoutubeInput(e.target.value)}
                className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
              {youtubeInput.trim() && (
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold ${
                  resolvedVideoId ? 'text-[#65D9C0]' : 'text-[#EF4444]'
                }`}>
                  {resolvedVideoId ? `✓ ${resolvedVideoId}` : 'Invalid URL / ID'}
                </span>
              )}
            </div>
            {resolvedVideoId && (
              <button
                type="button"
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${resolvedVideoId}`, '_blank')
                }
                className="w-full py-2 rounded-xl border border-[#C7FF3D]/30 text-xs font-bold text-[#C7FF3D] flex items-center justify-center gap-1.5 hover:bg-[#C7FF3D]/10 transition"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Open Video Demo</span>
              </button>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-glass-subtle py-2.5 rounded-xl text-xs font-bold text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-electric-lime py-2.5 rounded-xl text-xs font-black shadow-lg shadow-[#C7FF3D]/25"
            >
              Create Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};