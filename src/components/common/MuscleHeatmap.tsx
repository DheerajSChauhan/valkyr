import React, { useState } from 'react';
import { GlassCard } from './GlassCard';

export interface MuscleIntensityMap {
  [muscleGroup: string]: number; // 0 (rested) to 3 (high volume)
}

interface MuscleHeatmapProps {
  intensities: MuscleIntensityMap;
  compact?: boolean;
}

const COLOR_SCALE = [
  'rgba(255, 255, 255, 0.08)', // 0: Untrained / Fully Rested
  'rgba(101, 217, 192, 0.45)', // 1: Light Volume / Primed (Teal)
  'rgba(199, 255, 61, 0.72)',  // 2: Optimal Hypertrophy Stimulus (Electric Lime)
  'rgba(255, 154, 88, 0.85)'   // 3: Peak Overload / Recovering (Amber)
];

export const MuscleHeatmap: React.FC<MuscleHeatmapProps> = ({
  intensities,
  compact = false
}) => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const getLevel = (keys: string[]): number => {
    let max = 0;
    for (const k of keys) {
      for (const [mName, val] of Object.entries(intensities)) {
        if (mName.toLowerCase().includes(k.toLowerCase())) {
          if (val > max) max = val;
        }
      }
    }
    return Math.min(3, max);
  };

  const getFill = (keys: string[]) => COLOR_SCALE[getLevel(keys)];

  const muscleZones = [
    { label: 'Chest (Clavicular & Sternal)', keys: ['Chest', 'Upper Chest', 'Mid & Lower Chest'] },
    { label: 'Lats & Upper Back', keys: ['Lats', 'Back', 'Upper Back', 'Traps'] },
    { label: 'Deltoids (Front, Lateral, Rear)', keys: ['Delts', 'Shoulders', 'Lateral Delts', 'Rear Delts'] },
    { label: 'Quadriceps & Adductors', keys: ['Quadriceps', 'Quads', 'Adductors'] },
    { label: 'Hamstrings & Glutes', keys: ['Hamstrings', 'Glutes'] },
    { label: 'Arms (Biceps & Triceps)', keys: ['Biceps', 'Triceps', 'Arms'] },
    { label: 'Core & Calves', keys: ['Core', 'Abs', 'Calves'] }
  ];

  return (
    <GlassCard variant="standard" className="p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D] block">
            ANATOMICAL STIMULUS MAP
          </span>
          <h3 className="text-sm font-black text-white">
            Anterior & Posterior Muscle Volume Split
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 text-[10px] font-bold text-[#929895]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-white/15 inline-block" /> Rested
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#65D9C0]/60 inline-block" /> Light
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#C7FF3D] inline-block" /> Optimal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FF9A58] inline-block" /> Peak
          </span>
        </div>
      </div>

      {/* Dual Front / Back Anatomical SVG Silhouettes */}
      <div className="grid grid-cols-2 gap-3 items-center py-2 bg-[#151718]/90 rounded-2xl border border-white/[0.06] px-3">
        {/* FRONT (ANTERIOR) */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#929895] mb-1">
            Anterior (Front)
          </span>
          <svg
            viewBox="0 0 160 280"
            className={`${compact ? 'h-44' : 'h-56'} w-auto select-none`}
          >
            {/* Head & Neck */}
            <circle cx="80" cy="24" r="14" fill="rgba(255,255,255,0.12)" />
            <rect x="74" y="38" width="12" height="10" rx="3" fill="rgba(255,255,255,0.1)" />

            {/* Traps */}
            <polygon
              points="58,48 74,42 86,42 102,48 96,54 64,54"
              fill={getFill(['Traps', 'Upper Traps'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer hover:opacity-80 transition"
              onClick={() => setSelectedMuscle('Upper Traps')}
            />

            {/* Delts (Left & Right) */}
            <rect
              x="40"
              y="48"
              width="16"
              height="24"
              rx="7"
              fill={getFill(['Delts', 'Lateral Delts', 'Front Delts', 'Shoulders'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Front & Lateral Delts')}
            />
            <rect
              x="104"
              y="48"
              width="16"
              height="24"
              rx="7"
              fill={getFill(['Delts', 'Lateral Delts', 'Front Delts', 'Shoulders'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Front & Lateral Delts')}
            />

            {/* Chest (Pectorals) */}
            <rect
              x="57"
              y="52"
              width="22"
              height="24"
              rx="5"
              fill={getFill(['Chest', 'Upper Chest', 'Mid & Lower Chest'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Chest (Pectorals)')}
            />
            <rect
              x="81"
              y="52"
              width="22"
              height="24"
              rx="5"
              fill={getFill(['Chest', 'Upper Chest', 'Mid & Lower Chest'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Chest (Pectorals)')}
            />

            {/* Biceps */}
            <rect
              x="36"
              y="74"
              width="14"
              height="28"
              rx="6"
              fill={getFill(['Biceps', 'Arms'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Biceps Brachii')}
            />
            <rect
              x="110"
              y="74"
              width="14"
              height="28"
              rx="6"
              fill={getFill(['Biceps', 'Arms'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Biceps Brachii')}
            />

            {/* Forearms */}
            <rect x="33" y="104" width="12" height="28" rx="5" fill="rgba(255,255,255,0.12)" />
            <rect x="115" y="104" width="12" height="28" rx="5" fill="rgba(255,255,255,0.12)" />

            {/* Core & Abs */}
            <rect
              x="62"
              y="78"
              width="36"
              height="44"
              rx="6"
              fill={getFill(['Core', 'Abs'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Core & Rectus Abdominis')}
            />

            {/* Quadriceps */}
            <rect
              x="55"
              y="126"
              width="22"
              height="62"
              rx="9"
              fill={getFill(['Quadriceps', 'Quads', 'Legs'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Quadriceps & Adductors')}
            />
            <rect
              x="83"
              y="126"
              width="22"
              height="62"
              rx="9"
              fill={getFill(['Quadriceps', 'Quads', 'Legs'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Quadriceps & Adductors')}
            />

            {/* Calves / Tibialis */}
            <rect
              x="57"
              y="194"
              width="17"
              height="52"
              rx="7"
              fill={getFill(['Calves'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Calves (Gastrocnemius & Soleus)')}
            />
            <rect
              x="86"
              y="194"
              width="17"
              height="52"
              rx="7"
              fill={getFill(['Calves'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Calves (Gastrocnemius & Soleus)')}
            />
          </svg>
        </div>

        {/* BACK (POSTERIOR) */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#929895] mb-1">
            Posterior (Back)
          </span>
          <svg
            viewBox="0 0 160 280"
            className={`${compact ? 'h-44' : 'h-56'} w-auto select-none`}
          >
            {/* Head */}
            <circle cx="80" cy="24" r="14" fill="rgba(255,255,255,0.12)" />

            {/* Upper & Mid Traps */}
            <polygon
              points="58,44 80,38 102,44 90,70 70,70"
              fill={getFill(['Traps', 'Upper Back'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Trapezius & Rhomboids')}
            />

            {/* Rear Delts */}
            <rect
              x="40"
              y="48"
              width="16"
              height="22"
              rx="7"
              fill={getFill(['Rear Delts', 'Delts', 'Shoulders'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Posterior Deltoids')}
            />
            <rect
              x="104"
              y="48"
              width="16"
              height="22"
              rx="7"
              fill={getFill(['Rear Delts', 'Delts', 'Shoulders'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Posterior Deltoids')}
            />

            {/* Lats (V-Taper) */}
            <polygon
              points="56,56 78,68 78,108 62,104"
              fill={getFill(['Lats', 'Back', 'Upper Back & Lats'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Latissimus Dorsi (Lats)')}
            />
            <polygon
              points="104,56 82,68 82,108 98,104"
              fill={getFill(['Lats', 'Back', 'Upper Back & Lats'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Latissimus Dorsi (Lats)')}
            />

            {/* Triceps */}
            <rect
              x="36"
              y="72"
              width="14"
              height="30"
              rx="6"
              fill={getFill(['Triceps', 'Arms'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Triceps Brachii (Long & Lateral Head)')}
            />
            <rect
              x="110"
              y="72"
              width="14"
              height="30"
              rx="6"
              fill={getFill(['Triceps', 'Arms'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Triceps Brachii (Long & Lateral Head)')}
            />

            {/* Forearms */}
            <rect x="33" y="104" width="12" height="28" rx="5" fill="rgba(255,255,255,0.12)" />
            <rect x="115" y="104" width="12" height="28" rx="5" fill="rgba(255,255,255,0.12)" />

            {/* Glutes */}
            <rect
              x="56"
              y="110"
              width="23"
              height="26"
              rx="8"
              fill={getFill(['Glutes', 'Hamstrings & Glutes'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Gluteus Maximus & Medius')}
            />
            <rect
              x="81"
              y="110"
              width="23"
              height="26"
              rx="8"
              fill={getFill(['Glutes', 'Hamstrings & Glutes'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Gluteus Maximus & Medius')}
            />

            {/* Hamstrings */}
            <rect
              x="56"
              y="138"
              width="21"
              height="52"
              rx="8"
              fill={getFill(['Hamstrings', 'Hamstrings & Glutes'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Hamstrings (Biceps Femoris)')}
            />
            <rect
              x="83"
              y="138"
              width="21"
              height="52"
              rx="8"
              fill={getFill(['Hamstrings', 'Hamstrings & Glutes'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Hamstrings (Biceps Femoris)')}
            />

            {/* Posterior Calves */}
            <rect
              x="57"
              y="194"
              width="17"
              height="52"
              rx="7"
              fill={getFill(['Calves'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Calves (Gastrocnemius & Soleus)')}
            />
            <rect
              x="86"
              y="194"
              width="17"
              height="52"
              rx="7"
              fill={getFill(['Calves'])}
              stroke="#101112"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelectedMuscle('Calves (Gastrocnemius & Soleus)')}
            />
          </svg>
        </div>
      </div>

      {/* Selected Muscle Pill or Breakdown Chips */}
      {selectedMuscle && (
        <div className="px-3 py-2 rounded-xl bg-[#C7FF3D]/10 border border-[#C7FF3D]/30 flex items-center justify-between text-xs">
          <span className="font-bold text-white">
            Inspecting: <strong className="text-[#C7FF3D]">{selectedMuscle}</strong>
          </span>
          <button
            type="button"
            onClick={() => setSelectedMuscle(null)}
            className="text-[10px] font-bold text-[#929895] hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {!compact && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {muscleZones.slice(0, 4).map(z => {
            const lvl = getLevel(z.keys);
            const statusText =
              lvl === 0 ? 'Fresh' : lvl === 1 ? 'Primed' : lvl === 2 ? 'Optimal' : 'Peak Load';
            return (
              <div
                key={z.label}
                className="p-2.5 rounded-xl bg-[#151718] border border-white/[0.06] space-y-0.5"
              >
                <div className="text-[10px] text-[#929895] truncate">{z.label}</div>
                <div
                  className={`text-xs font-black ${
                    lvl >= 2 ? 'text-[#C7FF3D]' : lvl === 1 ? 'text-[#65D9C0]' : 'text-white/70'
                  }`}
                >
                  {statusText}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
};
