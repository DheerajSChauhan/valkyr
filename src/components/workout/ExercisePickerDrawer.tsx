import React, { useState, useMemo } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Exercise, Equipment } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { CustomExerciseModal } from './CustomExerciseModal';
import { Search, X, Plus, Play, Dumbbell } from 'lucide-react';
import { ExerciseMedia } from './ExerciseMedia';
import { openYouTube } from '../../lib/media';

const MUSCLE_GROUPS: string[] = [
  'All',
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core',
  'Cardio',
  'Full Body'
];

const EQUIPMENT_OPTIONS: Equipment[] = [
  'Barbell',
  'Dumbbells',
  'Cables',
  'Machines',
  'Bodyweight',
  'Kettlebell',
  'Bands'
];

interface ExercisePickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}

export const ExercisePickerDrawer: React.FC<ExercisePickerDrawerProps> = ({
  isOpen,
  onClose,
  onSelect
}) => {
  const { exercises, addCustomExercise } = useFitness();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const filtered = useMemo(() => {
    return exercises.filter(ex => {
      const matchesSearch =
        searchQuery === '' ||
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ex.secondaryMuscles || []).some(m =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesMuscle = selectedMuscle === 'All' || ex.category === selectedMuscle;
      const matchesEquipment = selectedEquipment === 'All' || ex.equipment === selectedEquipment;
      return matchesSearch && matchesMuscle && matchesEquipment;
    });
  }, [exercises, searchQuery, selectedMuscle, selectedEquipment]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in"
        onClick={onClose}
      >
        <div
          className="bg-[#1C1F20] border border-white/15 w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-5 space-y-4 shadow-2xl max-h-[85vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                Exercise Picker
              </span>
              <h3 className="text-sm font-black text-white">
                Add movement to session or routine
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#929895]" />
            <input
              type="text"
              placeholder="Search exercise by name or muscle…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-4 py-2.5 pl-10 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
            />
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-black text-[#929895] shrink-0">
                Muscle Group
              </span>
              {MUSCLE_GROUPS.map(group => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedMuscle(group)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition border shrink-0 ${
                    selectedMuscle === group
                      ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D]'
                      : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-black text-[#929895] shrink-0">
                Equipment
              </span>
              {EQUIPMENT_OPTIONS.map(eq => (
                <button
                  key={eq}
                  type="button"
                  onClick={() => setSelectedEquipment(eq)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition border shrink-0 ${
                    selectedEquipment === eq
                      ? 'bg-[#65D9C0] text-[#101112] border-[#65D9C0]'
                      : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
                  }`}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filtered.length === 0 ? (
              <GlassCard variant="inset" className="text-center p-6 space-y-2">
                <Dumbbell className="w-8 h-8 text-[#929895] mx-auto" />
                <h4 className="text-sm font-bold text-white">No exercises found</h4>
                <p className="text-[10px] text-[#929895]">
                  Try adjusting your search or filters.
                </p>
              </GlassCard>
            ) : (
              filtered.map(ex => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => {
                    onSelect(ex);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-[#151718] border border-white/[0.08] hover:border-[#C7FF3D]/50 transition flex items-center justify-between gap-2 group"
                >
                  <ExerciseMedia
                    exercise={ex}
                    className="w-12 h-12 rounded-xl object-cover border border-white/[0.08] shrink-0"
                    showGif={false}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{ex.name}</h4>
                      {ex.videoId && (
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            openYouTube(ex.videoId || '');
                          }}
                          className="text-[#C7FF3D] hover:text-[#C7FF3D]/80 p-1"
                          title="Video demo"
                        >
                          <Play className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#929895] mt-0.5">
                      <span>{ex.targetMuscle}</span>
                      <span>•</span>
                      <span>{ex.equipment}</span>
                      <span>•</span>
                      <span>{ex.defaultSets} × {ex.defaultReps}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-[#C7FF3D] shrink-0">
                    Add →
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCustomModal(true)}
              className="flex-1 py-2 rounded-xl border border-dashed border-white/15 text-xs font-bold text-[#929895] hover:text-white hover:border-[#C7FF3D]/40 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Custom Exercise</span>
            </button>
          </div>
        </div>
      </div>

      {showCustomModal && (
        <CustomExerciseModal
          isOpen={showCustomModal}
          onClose={() => setShowCustomModal(false)}
          onExerciseCreated={ex => {
            setShowCustomModal(false);
            onSelect(ex);
            onClose();
          }}
        />
      )}
    </>
  );
};