import React from 'react';
import { Exercise, Equipment } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { Search, Play, Dumbbell, Repeat } from 'lucide-react';
import { ExerciseMedia } from './ExerciseMedia';

interface ExerciseDirectoryViewProps {
  filteredExercises: Exercise[];
  hasActiveDirectoryFilters: boolean;
  directorySearch: string;
  directoryMuscle: string;
  directoryEquipment: string;
  getExerciseBestStats: (
    id: string
  ) => {
    bestWeight: number;
    bestReps: number;
    estimated1RM: number;
    setsCompleted: number;
    volume: number;
  } | null;
  onDirectorySearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDirectoryMuscleChange: (group: string) => void;
  onDirectoryEquipmentChange: (eq: string) => void;
  onResetDirectoryFilters: () => void;
  DIRECTORY_MUSCLE_GROUPS: string[];
  DIRECTORY_EQUIPMENT: (string | Equipment)[];
  onOpenExerciseDetail: (exercise: Exercise) => void;
}

export const ExerciseDirectoryView: React.FC<ExerciseDirectoryViewProps> = ({
  filteredExercises,
  hasActiveDirectoryFilters,
  directorySearch,
  directoryMuscle,
  directoryEquipment,
  getExerciseBestStats,
  onDirectorySearchChange,
  onDirectoryMuscleChange,
  onDirectoryEquipmentChange,
  onResetDirectoryFilters,
  DIRECTORY_MUSCLE_GROUPS,
  DIRECTORY_EQUIPMENT,
  onOpenExerciseDetail
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#929895]" />
        <input
          type="text"
          placeholder="Search exercises by name, target muscle, or PDF substitution…"
          value={directorySearch}
          onChange={onDirectorySearchChange}
          className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-4 py-2.5 pl-10 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
        />
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black text-[#929895] shrink-0">Muscle Group</span>
          {DIRECTORY_MUSCLE_GROUPS.map(group => (
            <button
              key={group}
              type="button"
              onClick={() => onDirectoryMuscleChange(group)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition border shrink-0 ${
                directoryMuscle === group
                  ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D]'
                  : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black text-[#929895] shrink-0">Equipment</span>
          {DIRECTORY_EQUIPMENT.map(eq => (
            <button
              key={String(eq)}
              type="button"
              onClick={() => onDirectoryEquipmentChange(String(eq))}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition border shrink-0 ${
                directoryEquipment === eq
                  ? 'bg-[#65D9C0] text-[#101112] border-[#65D9C0]'
                  : 'bg-[#151718] text-[#929895] border-white/[0.06] hover:text-white'
              }`}
            >
              {eq}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-[#929895] px-1">
        <span>
          Showing <strong className="text-white">{filteredExercises.length}</strong> exercises (Default GIF + YouTube Autoplay)
        </span>
        {hasActiveDirectoryFilters && (
          <button
            type="button"
            onClick={onResetDirectoryFilters}
            className="text-[#C7FF3D] font-bold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {filteredExercises.length > 0 ? (
        <div className="space-y-3">
          {filteredExercises.slice(0, 60).map(ex => {
            const stats = getExerciseBestStats(ex.id);
            return (
              <GlassCard key={ex.id} variant="standard" className="p-3.5 sm:p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <ExerciseMedia
                      exercise={ex}
                      className="w-20 h-20 rounded-xl object-cover border border-white/[0.08] shrink-0"
                      showGif={false}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-black text-white">{ex.name}</h3>
                      <div className="flex flex-wrap gap-1.5 text-[10px] mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-[#C7FF3D]/10 text-[#C7FF3D] border border-[#C7FF3D]/25">
                          {ex.targetMuscle}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[#F5F5F2] border border-white/10">
                          {ex.equipment}
                        </span>
                        <span className="text-[#929895]">
                          {ex.defaultSets} × {ex.defaultReps}
                        </span>
                        <span className="text-[#929895]">{ex.defaultRestSec}s rest</span>
                      </div>
                      <p className="text-[11px] text-white/75 italic mt-1.5 line-clamp-2">
                        {ex.notes}
                      </p>
                      {ex.substitutions && ex.substitutions.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="text-[10px] font-bold text-[#65D9C0] flex items-center gap-1">
                            <Repeat className="w-3 h-3" /> Alternates:
                          </span>
                          {ex.substitutions.map(sub => (
                            <button
                              key={sub.name}
                              type="button"
                              onClick={event => {
                                event.stopPropagation();
                                onOpenExerciseDetail({
                                  ...ex,
                                  id: `${ex.id}-sub-${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                                  name: sub.name,
                                  equipment: sub.equipment,
                                  videoId: sub.videoId,
                                  mediaUrl: sub.mediaUrl,
                                  notes: sub.notes || ex.notes
                                });
                              }}
                              className="text-[10px] px-2 py-0.2 rounded-md bg-[#65D9C0]/10 text-[#65D9C0] border border-[#65D9C0]/25"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {(ex.videoId || ex.mediaUrl) && (
                    <button
                      type="button"
                      onClick={() => onOpenExerciseDetail(ex)}
                      className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-xs font-black text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D] transition flex items-center gap-1 shrink-0"
                      title="View exercise GIF or YouTube demo"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#C7FF3D]" />
                      <span>View Demo</span>
                    </button>
                  )}
                </div>

                <div className="p-2.5 rounded-xl bg-[#151718] border border-white/[0.06]">
                  {stats ? (
                    <div className="text-xs">
                      <span className="font-bold text-white">Best Logged: </span>
                      <span className="text-[#C7FF3D] font-black">{stats.bestWeight}</span>
                      <span className="text-[#929895]"> × {stats.bestReps}</span>
                      <span className="text-[#929895]"> • Est. 1RM {stats.estimated1RM}</span>
                      <span className="text-[10px] text-[#929895] ml-2">
                        ({stats.setsCompleted} sets • {stats.volume.toLocaleString()} total vol)
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-[#929895]">
                      Not logged yet — log your first set to unlock smart double-progression targets &amp; 1RM
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard variant="inset" className="text-center p-8 space-y-3">
          <div className="w-10 h-10 rounded-full bg-white/[0.06] text-[#929895] mx-auto flex items-center justify-center">
            <Dumbbell className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">No exercises found</h3>
          <p className="text-xs text-[#929895] max-w-xs mx-auto">
            Try adjusting your search, muscle group, or equipment filter.
          </p>
          {hasActiveDirectoryFilters && (
            <button
              type="button"
              onClick={onResetDirectoryFilters}
              className="btn-electric-lime px-4 py-2 rounded-xl text-xs font-bold mt-2"
            >
              Clear Filters
            </button>
          )}
        </GlassCard>
      )}
    </div>
  );
};
