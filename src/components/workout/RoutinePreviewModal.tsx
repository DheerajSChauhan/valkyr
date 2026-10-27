import React, { useState } from 'react';
import { CatalogRoutinePlan } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { convertRoutineDayToWorkout } from './routineUtils';
import {
  X,
  Play,
  Copy,
  Check,
  Clock,
  Dumbbell,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Flame
} from 'lucide-react';

interface RoutinePreviewModalProps {
  plan: CatalogRoutinePlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RoutinePreviewModal: React.FC<RoutinePreviewModalProps> = ({
  plan,
  isOpen,
  onClose
}) => {
  const { exercises: libraryExercises, startWorkout, createCustomWorkout, showToast } = useFitness();
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [hasCloned, setHasCloned] = useState(false);

  if (!isOpen || !plan) return null;

  const currentDay = plan.days[selectedDayIdx] || plan.days[0];

  const handleStartDayWorkout = () => {
    if (!currentDay) return;
    const workout = convertRoutineDayToWorkout(plan, currentDay, libraryExercises);
    startWorkout(workout);
    onClose();
  };

  const handleCloneAllDays = () => {
    plan.days.forEach(day => {
      const workout = convertRoutineDayToWorkout(plan, day, libraryExercises);
      createCustomWorkout({
        title: workout.title,
        subtitle: workout.subtitle,
        category: workout.category,
        level: workout.level,
        durationMin: workout.durationMin,
        targetMuscles: workout.targetMuscles,
        equipment: workout.equipment,
        exercises: workout.exercises,
        image: workout.image
      });
    });

    setHasCloned(true);
    showToast(`✓ Cloned all ${plan.days.length} days of "${plan.shortTitle}" to My Workouts!`);
    setTimeout(() => setHasCloned(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-[#141617] border border-white/10 shadow-2xl overflow-hidden text-[#F5F5F2]">
        
        {/* Cover Header */}
        <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden">
          <img
            src={plan.coverImage}
            alt={plan.title}
            className="w-full h-full object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141617] via-[#141617]/60 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center transition active:scale-95"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badges on Cover */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C7FF3D] text-[#101112] text-[10px] font-black uppercase tracking-wider">
              {plan.daysBadge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/20 text-white text-[10px] font-bold">
              {plan.goalBadge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/20 text-[#65D9C0] text-[10px] font-bold">
              {plan.level}
            </span>
          </div>

          {/* Title Info */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
              CURATED SPLIT • {plan.author.toUpperCase()}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mt-0.5">
              {plan.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
          {/* Plan Description & Quick Stats */}
          <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/5 space-y-2">
            <p className="text-xs text-[#929895] leading-relaxed">
              {plan.description}
            </p>
            <div className="flex items-center gap-3 text-[11px] text-[#929895] pt-1 border-t border-white/5 flex-wrap">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C7FF3D]" />
                {plan.duration}
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="w-3.5 h-3.5 text-[#65D9C0]" />
                {plan.equipment}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#FF9A58]" />
                {plan.days.length} Microcycle Days
              </span>
            </div>
          </div>

          {/* Day Selector Pills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#929895]">
              <span>Select Split Day</span>
              <span className="text-[#C7FF3D]">
                Day {selectedDayIdx + 1} of {plan.days.length}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {plan.days.map((day, idx) => {
                const isSelected = idx === selectedDayIdx;
                return (
                  <button
                    key={day.dayNumber}
                    type="button"
                    onClick={() => setSelectedDayIdx(idx)}
                    className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D] shadow-md shadow-[#C7FF3D]/20'
                        : 'bg-[#181A1B] text-[#929895] hover:text-white border-white/10'
                    }`}
                  >
                    <span>Day {day.dayNumber}</span>
                    <span className="text-[10px] opacity-80 truncate max-w-[90px]">
                      {day.dayTitle.replace(/Day \d+:? ?/i, '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Overview */}
          {currentDay && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-white">
                    {currentDay.dayTitle}
                  </h4>
                  <p className="text-[11px] text-[#65D9C0] font-medium">
                    {currentDay.focus}
                  </p>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-black/50 text-[#929895] border border-white/10">
                  {currentDay.exercises.length} Exercises
                </span>
              </div>

              {/* Exercises List */}
              <div className="space-y-2">
                {currentDay.exercises.map((ex, exIdx) => (
                  <div
                    key={`${ex.name}-${exIdx}`}
                    className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-3 hover:border-white/15 transition"
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-white/10 text-[10px] font-black text-white flex items-center justify-center shrink-0">
                          {exIdx + 1}
                        </span>
                        <h5 className="text-xs sm:text-sm font-black text-white truncate">
                          {ex.name}
                        </h5>
                      </div>
                      <p className="text-[10px] text-[#929895] pl-7">
                        {ex.notes}
                      </p>
                    </div>

                    <div className="text-right shrink-0 space-y-0.5">
                      <div className="text-xs font-black text-[#C7FF3D] tracking-tight">
                        {ex.sets} × {ex.reps}
                      </div>
                      <div className="text-[10px] text-[#929895]">
                        Rest {ex.rest}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 border-t border-white/10 bg-[#101112] flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCloneAllDays}
            disabled={hasCloned}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] border ${
              hasCloned
                ? 'bg-[#65D9C0]/20 text-[#65D9C0] border-[#65D9C0]/40'
                : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border-white/10'
            }`}
          >
            {hasCloned ? (
              <>
                <Check className="w-4 h-4 text-[#65D9C0]" />
                <span>Saved to My Workouts</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#C7FF3D]" />
                <span>Clone Routine ({plan.days.length} Days)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleStartDayWorkout}
            className="flex-1 py-3 px-3 rounded-xl bg-[#C7FF3D] hover:bg-[#d5ff5e] text-[#101112] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#C7FF3D]/25 active:scale-[0.98] transition-all"
          >
            <Play className="w-4 h-4 fill-[#101112]" />
            <span>Start Day {currentDay?.dayNumber || 1}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
