import React, { useEffect, useState } from 'react';
import { X, Play, Film, Dumbbell } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { ExerciseMedia, ExerciseAutoplayEmbed } from './ExerciseMedia';

export const ExerciseDetailModal: React.FC = () => {
  const { selectedExerciseDetail, setSelectedExerciseDetail } = useFitness();
  const [showVideo, setShowVideo] = useState(false);
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    if (selectedExerciseDetail) {
      setShowVideo(false);
      setShowGif(true);
    }
  }, [selectedExerciseDetail?.id]);

  if (!selectedExerciseDetail) return null;
  const exercise = selectedExerciseDetail;

  const close = () => {
    setShowVideo(false);
    setShowGif(true);
    setSelectedExerciseDetail(null);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
      onClick={close}
    >
      <div
        className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-[#141617] border border-white/10 shadow-2xl p-4 sm:p-5 space-y-4"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
              Exercise Detail
            </span>
            <h2 className="text-xl font-black text-white truncate">{exercise.name}</h2>
            <div className="flex items-center gap-2 text-[11px] text-[#929895] mt-1">
              <span>{exercise.targetMuscle}</span>
              <span>•</span>
              <span>{exercise.equipment}</span>
            </div>
          </div>
          <button type="button" onClick={close} className="btn-glass-subtle w-9 h-9 rounded-full flex items-center justify-center" aria-label="Close exercise detail">
            <X className="w-4 h-4" />
          </button>
        </div>

        {showVideo && exercise.videoId ? (
          <ExerciseAutoplayEmbed videoId={exercise.videoId} videoStart={exercise.videoStart} title={exercise.name} onSwitchToGif={() => { setShowVideo(false); setShowGif(true); }} />
        ) : showGif ? (
          <ExerciseMedia exercise={exercise} className="w-full aspect-video rounded-2xl" showBadge={false} />
        ) : (
          <ExerciseMedia exercise={exercise} className="w-full aspect-video rounded-2xl" showBadge={false} showGif={false} />
        )}

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { setShowGif(true); setShowVideo(false); }} className={`btn-glass-subtle px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 ${showGif ? 'border-[#C7FF3D] text-[#C7FF3D]' : ''}`}>
          <Film className="w-3.5 h-3.5" /> GIF
          </button>
          {exercise.videoId && (
            <button type="button" onClick={() => { setShowVideo(true); setShowGif(false); }} className={`btn-glass-subtle px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 ${showVideo ? 'border-[#C7FF3D] text-[#C7FF3D]' : ''}`}>
              <Play className="w-3.5 h-3.5" /> YouTube
            </button>
          )}
        </div>

        <div className="p-3 rounded-2xl bg-[#151718] border border-white/[0.08] text-xs text-[#929895] flex items-start gap-2">
          <Dumbbell className="w-4 h-4 text-[#C7FF3D] shrink-0" />
          <p>{exercise.notes || `${exercise.defaultSets} sets of ${exercise.defaultReps}`}</p>
        </div>
      </div>
    </div>
  );
};
