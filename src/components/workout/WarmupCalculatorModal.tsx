import React, { useState } from 'react';
import { warmupData } from '../../data/warmupData';
import { Unit } from '../../types';
import { Flame, X, Calculator, Play } from 'lucide-react';

interface WarmupCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWorkingWeight?: number;
  exerciseName?: string;
  warmupCountHint?: string;
  unit: Unit;
}

export const WarmupCalculatorModal: React.FC<WarmupCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialWorkingWeight = 80,
  exerciseName = 'Compound Lift',
  warmupCountHint = '2-3',
  unit
}) => {
  const [workingWeight, setWorkingWeight] = useState<number>(initialWorkingWeight || 80);
  const [activeDrillVideo, setActiveDrillVideo] = useState<{
    name: string;
    id: string;
    start: number;
  } | null>(null);

  if (!isOpen) return null;

  const round2_5 = (v: number) => Math.round(v / 2.5) * 2.5;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#1C1F20] border border-white/15 w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-[#C7FF3D]/15 via-[#1C1F20] to-[#1C1F20]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C7FF3D]/15 border border-[#C7FF3D]/30 flex items-center justify-center text-[#C7FF3D]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                ACCLIMATION PYRAMID & DYNAMIC WARM-UP
              </span>
              <h3 className="text-sm sm:text-base font-black text-white truncate">
                {exerciseName} ({warmupCountHint} Warm-Up Sets)
              </h3>
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
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Working Weight Input */}
          <div className="p-4 rounded-2xl bg-[#151718] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white">
                Planned Working Weight ({unit.toUpperCase()})
              </label>
              <span className="text-[10px] font-bold text-[#C7FF3D]">
                Rounded to nearest 2.5 {unit}
              </span>
            </div>
            <input
              type="number"
              step="2.5"
              value={workingWeight}
              onChange={e => setWorkingWeight(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#1C1F20] border border-[#C7FF3D]/40 rounded-xl px-3.5 py-2.5 text-base font-black text-[#C7FF3D] focus:outline-none"
            />
          </div>

          {/* 4 Pyramid Tiers */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#929895]">
              Feeder Set Pyramids
            </h4>

            <div className="p-3.5 rounded-2xl bg-[#151718] border border-white/[0.08] space-y-1">
              <div className="text-xs font-extrabold text-white">
                1 Warm-Up Set Listed (Isolation / Machine)
              </div>
              <div className="text-xs text-[#929895]">
                Set 1:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.6)} {unit}
                </strong>{' '}
                (60%) × 6–10 reps
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#151718] border border-[#C7FF3D]/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white">
                  2 Warm-Up Sets Listed (Mini Pyramid)
                </span>
                <span className="text-[10px] font-black text-[#C7FF3D] uppercase">
                  Most Common
                </span>
              </div>
              <div className="text-xs text-[#929895]">
                Set 1:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.5)} {unit}
                </strong>{' '}
                (50%) × 6–10 &nbsp;|&nbsp; Set 2:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.7)} {unit}
                </strong>{' '}
                (70%) × 4–6 reps
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#151718] border border-white/[0.08] space-y-1">
              <div className="text-xs font-extrabold text-white">
                3 Warm-Up Sets Listed (Full Compound Pyramid)
              </div>
              <div className="text-xs text-[#929895]">
                S1:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.45)} {unit}
                </strong>{' '}
                (45%) × 6–10 &nbsp;|&nbsp; S2:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.65)} {unit}
                </strong>{' '}
                (65%) × 4–6 &nbsp;|&nbsp; S3:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.85)} {unit}
                </strong>{' '}
                (85%) × 3–4
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#151718] border border-white/[0.08] space-y-1">
              <div className="text-xs font-extrabold text-white">
                4 Warm-Up Sets Listed (Heavy Squat / Press / RDL)
              </div>
              <div className="text-xs text-[#929895]">
                S1:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.45)}
                </strong>{' '}
                (45%) &nbsp;|&nbsp; S2:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.6)}
                </strong>{' '}
                (60%) &nbsp;|&nbsp; S3:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.75)}
                </strong>{' '}
                (75%) &nbsp;|&nbsp; S4:{' '}
                <strong className="text-[#C7FF3D] font-black">
                  {round2_5(workingWeight * 0.85)} {unit}
                </strong>{' '}
                (85%) × 2–4
              </div>
            </div>
          </div>

          {/* Active Video Player for General Warm-Up Drills */}
          {activeDrillVideo && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#C7FF3D]">
                  Playing: {activeDrillVideo.name}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveDrillVideo(null)}
                  className="text-[#929895] hover:text-white"
                >
                  Close Video
                </button>
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/15">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeDrillVideo.id}?start=${activeDrillVideo.start}&autoplay=1&mute=1&playsinline=1&rel=0`}
                  title={activeDrillVideo.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* General Dynamic Mobility Sequence */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#929895] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#FF9A58]" />
              <span>5-Min General Dynamic Warm-Up Sequence</span>
            </h4>
            <div className="space-y-2">
              {warmupData.general.map(item => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2.5 p-3 rounded-2xl bg-[#151718] border border-white/[0.06]"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-[#929895]">
                      {item.prescription}
                      {item.yt && item.yt.start
                        ? ` • Timestamp 0:${String(item.yt.start).padStart(2, '0')}`
                        : ''}
                    </div>
                  </div>
                  {item.yt && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDrillVideo({
                          name: item.name,
                          id: item.yt!.id,
                          start: item.yt!.start || 0
                        })
                      }
                      className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#C7FF3D] flex items-center gap-1 shrink-0"
                    >
                      <Play className="w-3 h-3 fill-[#C7FF3D]" />
                      <span>Demo</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
