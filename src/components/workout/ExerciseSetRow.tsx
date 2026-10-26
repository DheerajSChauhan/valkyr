import React from 'react';
import { SetLog, Unit } from '../../types';
import { Check, Trash2 } from 'lucide-react';

interface ExerciseSetRowProps {
  set: SetLog;
  exerciseIndex: number;
  setIndex: number;
  unit: Unit;
  onUpdate: (field: 'weight' | 'reps', value: number | string) => void;
  onToggleComplete: () => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const ExerciseSetRow: React.FC<ExerciseSetRowProps> = ({
  set,
  setIndex,
  unit,
  onUpdate,
  onToggleComplete,
  onRemove,
  canRemove
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-2 p-2.5 rounded-2xl border transition duration-200 ${
        set.completed
          ? 'bg-[#C7FF3D]/10 border-[#C7FF3D]/40 shadow-sm'
          : 'bg-[#151718]/80 border-white/[0.08]'
      }`}
    >
      {/* Set Number & Previous Reference */}
      <div className="min-w-[80px] sm:min-w-[90px]">
        <div className="flex items-center gap-1.5">
          <span className={`text-xs font-black ${set.isLastSet ? 'text-[#FF9A58]' : 'text-white'}`}>
            Set {set.setNumber}
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white/[0.06] text-[#929895] border border-white/[0.08]">
            RPE {set.targetRpe}
          </span>
        </div>
        <div className="text-[10px] text-[#929895] truncate mt-0.5 tabular-nums">
          {set.previousWeight
            ? `Prev: ${set.previousWeight}${unit} × ${set.previousReps}`
            : `Target: ${set.targetReps} reps`}
        </div>
      </div>

      {/* Numeric Inputs */}
      <div className="flex items-center gap-1.5">
        {/* Weight */}
        <div className="relative">
          <input
            type="number"
            inputMode="decimal"
            placeholder={unit}
            value={set.weight}
            onChange={e => onUpdate('weight', e.target.value)}
            className="set-number-input w-16 sm:w-20 px-2 py-1.5 text-center text-xs sm:text-sm font-black text-white"
          />
        </div>

        <span className="text-[#929895] text-xs font-bold">×</span>

        {/* Reps */}
        <div className="relative">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Reps"
            value={set.reps}
            onChange={e => onUpdate('reps', e.target.value)}
            className="set-number-input w-14 sm:w-16 px-2 py-1.5 text-center text-xs sm:text-sm font-black text-white"
          />
        </div>

        {/* Completion Checkmark */}
        <button
          type="button"
          onClick={onToggleComplete}
          className={`w-9 h-8 sm:w-10 sm:h-9 rounded-xl font-black text-xs flex items-center justify-center transition-all duration-200 active:scale-95 ${
            set.completed
              ? 'bg-[#C7FF3D] text-[#101112] shadow-lg shadow-[#C7FF3D]/30'
              : 'btn-glass-subtle text-[#929895] hover:text-white'
          }`}
          title={set.completed ? 'Mark Incomplete' : 'Complete Set & Start Rest Timer'}
        >
          <Check className={`w-4 h-4 ${set.completed ? 'stroke-[3]' : ''}`} />
        </button>

        {/* Remove set if > 1 */}
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-white/20 hover:text-rose-400 p-1 transition"
            title="Remove set"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
