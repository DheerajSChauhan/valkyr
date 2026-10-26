import React from 'react';
import { Workout } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { Bookmark, Clock, Dumbbell, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

interface WorkoutCardProps {
  workout: Workout;
  onEditRoutine?: () => void;
  onDeleteRoutine?: () => void;
  onDuplicateRoutine?: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onEditRoutine,
  onDeleteRoutine,
  onDuplicateRoutine
}) => {
  const { toggleBookmark, setSelectedWorkoutDetail, startWorkout } = useFitness();

  return (
    <GlassCard variant="standard" className="p-3.5 sm:p-4 hover:border-white/20 transition-all">
      <div className="flex gap-3.5 items-start">
        {/* Thumbnail */}
        <div
          onClick={() => setSelectedWorkoutDetail(workout)}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 cursor-pointer group"
        >
          <img
            src={workout.image}
            alt={workout.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <span className="absolute bottom-1.5 left-1.5 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-black/60 text-[#C7FF3D] border border-[#C7FF3D]/30 backdrop-blur-sm">
            {workout.durationMin}m
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7FF3D]">
              {workout.category}
            </span>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                toggleBookmark(workout.id);
              }}
              className="text-[#929895] hover:text-[#C7FF3D] transition p-1"
              title="Bookmark workout"
            >
              <Bookmark
                className={`w-4 h-4 ${workout.isBookmarked ? 'fill-[#C7FF3D] text-[#C7FF3D]' : ''}`}
              />
            </button>
          </div>

          <h3
            onClick={() => setSelectedWorkoutDetail(workout)}
            className="text-sm sm:text-base font-extrabold text-[#F5F5F2] hover:text-[#C7FF3D] transition cursor-pointer truncate mt-0.5"
          >
            {workout.title}
          </h3>
          <p className="text-[11px] text-[#929895] truncate mt-0.5">{workout.subtitle}</p>

          <div className="flex items-center gap-2 text-[11px] text-[#929895] font-medium mt-2 flex-wrap">
            <div className="flex items-center gap-1">
              <Dumbbell className="w-3 h-3 text-[#C7FF3D]" />
              <span>{workout.exercises.length} moves</span>
            </div>
            <span>•</span>
            <span className="text-white/80">{workout.level}</span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={() => setSelectedWorkoutDetail(workout)}
              className="text-[11px] font-bold text-[#C7FF3D] flex items-center gap-0.5 hover:underline"
            >
              <span>View Routine</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => startWorkout(workout)}
              className="btn-electric-lime px-3 py-1 rounded-xl text-xs font-black"
            >
              Start
            </button>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06]">
              {onDuplicateRoutine && (
                <button
                  type="button"
                  onClick={onDuplicateRoutine}
                  className="text-[10px] font-bold text-[#65D9C0] hover:underline"
                >
                  Duplicate
                </button>
              )}
              {workout.isCustom && (
                <>
                  {onEditRoutine && (
                  <button
                    type="button"
                    onClick={onEditRoutine}
                    className="text-[10px] font-bold text-[#C7FF3D] hover:underline flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit Routine</span>
                  </button>
                  )}
                  {onDeleteRoutine && (
                  <button
                    type="button"
                    onClick={onDeleteRoutine}
                    className="text-[10px] font-bold text-[#EF4444] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete Routine</span>
                  </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
