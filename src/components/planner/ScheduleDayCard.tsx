import React from 'react';
import { ScheduledDay } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { Play, Check, Moon, Clock, Dumbbell, CalendarPlus, Repeat } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

interface ScheduleDayCardProps {
  day: ScheduledDay;
  onOpenAssignModal: () => void;
}

export const ScheduleDayCard: React.FC<ScheduleDayCardProps> = ({ day, onOpenAssignModal }) => {
  const { toggleDayComplete, toggleRestDay, startWorkout, setSelectedWorkoutDetail } = useFitness();

  return (
    <GlassCard variant="elevated" className="space-y-4 p-4 sm:p-5">
      {/* Day Title & Status Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#C7FF3D]">
            {day.dayName}, Oct {day.dayNumber}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs text-[#929895] font-semibold">{day.time}</span>
        </div>

        {/* Completion Checkmark Pill */}
        <button
          type="button"
          onClick={() => toggleDayComplete(day.id)}
          className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 transition ${
            day.isCompleted
              ? 'bg-[#C7FF3D] text-[#101112] shadow-md shadow-[#C7FF3D]/20'
              : 'btn-glass-subtle text-[#929895]'
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{day.isCompleted ? 'Completed' : 'Mark Done'}</span>
        </button>
      </div>

      {/* Card Body: Workout or Rest Day */}
      {day.isRestDay ? (
        <div className="p-5 rounded-2xl bg-[#151718] border border-white/[0.08] text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#65D9C0]/15 text-[#65D9C0] mx-auto flex items-center justify-center">
            <Moon className="w-5 h-5" />
          </div>
          <h4 className="text-base font-black text-white">Scheduled Rest & Recovery</h4>
          <p className="text-xs text-[#929895] max-w-xs mx-auto">
            Light stretching, protein synthesis, and hydration. Let muscle fibers rebuild.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => toggleRestDay(day.id)}
              className="btn-glass-subtle px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:text-[#C7FF3D]"
            >
              Convert to Training Day
            </button>
          </div>
        </div>
      ) : day.workout ? (
        <div className="space-y-3">
          <div className="flex gap-3.5 items-center p-3 rounded-2xl bg-[#151718] border border-white/[0.08]">
            <img
              src={day.workout.image}
              alt={day.workout.title}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7FF3D]">
                {day.workout.category}
              </span>
              <h4 className="text-sm font-black text-white truncate">{day.workout.title}</h4>
              <div className="flex items-center gap-2 text-[11px] text-[#929895] mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C7FF3D]" /> {day.workout.durationMin}m
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Dumbbell className="w-3 h-3 text-[#C7FF3D]" /> {day.workout.exercises.length} moves
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => startWorkout(day.workout!)}
              className="btn-electric-lime flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-[#101112]" />
              <span>START THIS SESSION</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedWorkoutDetail(day.workout!)}
              className="btn-glass-subtle px-3 py-2.5 rounded-xl text-xs font-bold text-white"
            >
              Routine
            </button>
            <button
              type="button"
              onClick={onOpenAssignModal}
              className="btn-glass-subtle px-3 py-2.5 rounded-xl text-xs font-bold text-[#929895] hover:text-[#C7FF3D] flex items-center gap-1"
              title="Change assigned workout"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Change</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#151718] border border-dashed border-white/15 text-center space-y-2.5">
          <div className="text-xs text-[#929895]">No workout assigned for this day</div>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onOpenAssignModal}
              className="btn-electric-lime px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Assign Workout</span>
            </button>
            <button
              type="button"
              onClick={() => toggleRestDay(day.id)}
              className="btn-glass-subtle px-3 py-2 rounded-xl text-xs font-bold text-white"
            >
              Set Rest Day
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
