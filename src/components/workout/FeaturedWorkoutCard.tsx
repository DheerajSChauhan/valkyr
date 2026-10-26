import React from 'react';
import { Workout } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { Play, Clock, Dumbbell, Flame } from 'lucide-react';

interface FeaturedWorkoutCardProps {
  workout: Workout;
}

export const FeaturedWorkoutCard: React.FC<FeaturedWorkoutCardProps> = ({ workout }) => {
  const { startWorkout, setSelectedWorkoutDetail } = useFitness();

  return (
    <div className="featured-hero-glass overflow-hidden transition-all duration-300">
      {/* Background Cinematic Image with Gradient */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden">
        <img
          src={workout.image}
          alt={workout.title}
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-[#101112]/60 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[#C7FF3D] border border-[#C7FF3D]/30 shadow-md flex items-center gap-1">
            <Flame className="w-3 h-3 fill-[#C7FF3D]" /> Today's Focus
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 border border-white/15">
            {workout.level}
          </span>
        </div>

        {/* Title & Motivational Tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5">
          <span className="text-[10px] font-black tracking-widest uppercase text-[#C7FF3D] block mb-1">
            SHOW UP. GET STRONGER.
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            {workout.title}
          </h2>
          <p className="text-xs text-[#929895] font-medium line-clamp-1 mt-0.5">
            {workout.subtitle}
          </p>
        </div>
      </div>

      {/* Card Info & CTA */}
      <div className="p-4 sm:p-5 pt-3 space-y-3.5">
        <div className="flex items-center gap-3 text-xs text-[#929895] font-semibold flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C7FF3D]" />
            <span>{workout.durationMin} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="w-3.5 h-3.5 text-[#C7FF3D]" />
            <span>{workout.exercises.length} Exercises</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {workout.targetMuscles.slice(0, 3).map(m => (
              <span
                key={m}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-[#F5F5F2] border border-white/10"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => startWorkout(workout)}
            className="btn-electric-lime flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm shadow-lg"
          >
            <Play className="w-4 h-4 fill-[#101112]" />
            <span>START WORKOUT</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedWorkoutDetail(workout)}
            className="btn-glass-subtle py-3 px-4 rounded-[14px] text-xs font-bold text-white hover:border-white/30"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
