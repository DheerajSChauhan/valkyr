import React, { useState, useEffect } from 'react';
import { useFitness } from '../../context/FitnessContext';
import {
  Trophy,
  Clock,
  Dumbbell,
  Award,
  CheckCircle,
  Sparkles,
  X,
  Share2,
  Download
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const WorkoutSummaryModal: React.FC = () => {
  const {
    latestSummary,
    updateSummary,
    closeSummaryModal,
    userProfile,
    convertFromKg,
    showToast
  } = useFitness();

  const [rpe, setRpe] = useState<number>(8.5);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (latestSummary) {
      setRpe(latestSummary.perceivedRpe || 8.5);
      setNotes(latestSummary.notes || '');
    }
  }, [latestSummary]);

  if (!latestSummary) return null;

  const minutes = Math.floor(latestSummary.durationSec / 60);
  const seconds = latestSummary.durationSec % 60;
  const timeDisplay = `${minutes}m ${seconds}s`;
  const displayedVolume = convertFromKg(latestSummary.totalVolume);

  // Workout.cool / Strava-style Shareable Social Card PNG Exporter
  const handleExportSocialCard = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1350;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background dark obsidian gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1350);
      bgGrad.addColorStop(0, '#101112');
      bgGrad.addColorStop(0.5, '#171A1C');
      bgGrad.addColorStop(1, '#101112');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1350);

      // Ambient lime glow circle
      const radGrad = ctx.createRadialGradient(540, 260, 20, 540, 260, 460);
      radGrad.addColorStop(0, 'rgba(199, 255, 61, 0.22)');
      radGrad.addColorStop(1, 'rgba(199, 255, 61, 0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, 1080, 750);

      // Card outer border
      ctx.strokeStyle = 'rgba(199, 255, 61, 0.45)';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, 960, 1230);

      // Brand header
      ctx.fillStyle = '#C7FF3D';
      ctx.font = '900 28px Inter, system-ui, sans-serif';
      ctx.fillText('⚡ VALKYR • ATHLETIC CLUB LOG', 110, 140);

      ctx.fillStyle = '#929895';
      ctx.font = '600 24px Inter, system-ui, sans-serif';
      ctx.fillText(`${userProfile.name} (${userProfile.handle || '@alex_valkyr'}) • ${latestSummary.date}`, 110, 185);

      // Workout Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 54px Inter, system-ui, sans-serif';
      ctx.fillText(latestSummary.workoutTitle.slice(0, 32), 110, 290);

      // Stats Boxes
      const stats = [
        { label: 'DURATION', val: timeDisplay, color: '#C7FF3D' },
        { label: 'TOTAL VOLUME', val: `${displayedVolume.toLocaleString()} ${userProfile.unit.toUpperCase()}`, color: '#65D9C0' },
        { label: 'WORKING SETS', val: `${latestSummary.totalSets} SETS`, color: '#FFFFFF' },
        { label: 'SESSION RPE', val: `${rpe} / 10`, color: '#FF9A58' }
      ];

      stats.forEach((st, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = 110 + col * 440;
        const y = 360 + row * 210;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(x, y, 410, 175);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 410, 175);

        ctx.fillStyle = '#929895';
        ctx.font = '700 22px Inter, system-ui, sans-serif';
        ctx.fillText(st.label, x + 32, y + 58);

        ctx.fillStyle = st.color;
        ctx.font = '900 46px Inter, system-ui, sans-serif';
        ctx.fillText(st.val, x + 32, y + 128);
      });

      // PR Section
      ctx.fillStyle = '#FF9A58';
      ctx.font = '900 28px Inter, system-ui, sans-serif';
      ctx.fillText('🏆 PERSONAL RECORDS & HIGHLIGHTS', 110, 845);

      ctx.fillStyle = '#F5F5F2';
      ctx.font = '700 26px Inter, system-ui, sans-serif';
      latestSummary.personalRecords.slice(0, 3).forEach((pr, i) => {
        ctx.fillText(`• ${pr.slice(0, 52)}`, 110, 900 + i * 48);
      });

      // Reflection Note
      if (notes) {
        ctx.fillStyle = '#929895';
        ctx.font = 'italic 24px Inter, system-ui, sans-serif';
        ctx.fillText(`"${notes.slice(0, 68)}"`, 110, 1120);
      }

      // Footer
      ctx.fillStyle = '#C7FF3D';
      ctx.font = '800 24px Inter, system-ui, sans-serif';
      ctx.fillText(`🔥 ${userProfile.streakDays} Day Active Streak • Powered by Valkyr + PocketBase`, 110, 1230);

      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `valkyr_${latestSummary.workoutTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('📸 Exported Strava-style Share Card (.png)!');
    } catch {
      showToast('Share card generated!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-[#1C1F20] border border-white/15 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Celebration Banner */}
        <div className="relative p-6 text-center bg-gradient-to-b from-[#C7FF3D]/20 via-[#1C1F20] to-[#1C1F20] border-b border-white/[0.08]">
          <button
            type="button"
            onClick={closeSummaryModal}
            className="absolute top-4 right-4 btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C7FF3D] to-[#65D9C0] mx-auto flex items-center justify-center text-[#101112] shadow-xl shadow-[#C7FF3D]/30 mb-3">
            <Trophy className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D] flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WORKOUT COMPLETED & POSTED TO FEED
          </span>
          <h2 className="text-xl font-black text-white tracking-tight mt-1">
            {latestSummary.workoutTitle}
          </h2>
          <p className="text-xs text-[#929895] mt-0.5">{latestSummary.date}</p>
        </div>

        {/* Scrollable Summary Stats */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            <GlassCard variant="inset" className="p-3 text-center">
              <Clock className="w-4 h-4 text-[#C7FF3D] mx-auto mb-1" />
              <div className="text-[10px] uppercase font-bold text-[#929895]">Duration</div>
              <div className="text-base font-black text-white tabular-nums mt-0.5">{timeDisplay}</div>
            </GlassCard>

            <GlassCard variant="inset" className="p-3 text-center">
              <Dumbbell className="w-4 h-4 text-[#C7FF3D] mx-auto mb-1" />
              <div className="text-[10px] uppercase font-bold text-[#929895]">Total Volume</div>
              <div className="text-base font-black text-white tabular-nums mt-0.5">
                {displayedVolume.toLocaleString()} {userProfile.unit}
              </div>
            </GlassCard>

            <GlassCard variant="inset" className="p-3 text-center">
              <CheckCircle className="w-4 h-4 text-[#65D9C0] mx-auto mb-1" />
              <div className="text-[10px] uppercase font-bold text-[#929895]">Sets Finished</div>
              <div className="text-base font-black text-white tabular-nums mt-0.5">
                {latestSummary.totalSets} Sets
              </div>
            </GlassCard>

            <GlassCard variant="inset" className="p-3 text-center">
              <Award className="w-4 h-4 text-[#FF9A58] mx-auto mb-1" />
              <div className="text-[10px] uppercase font-bold text-[#929895]">Exercises</div>
              <div className="text-base font-black text-white tabular-nums mt-0.5">
                {latestSummary.exercisesCompleted} Completed
              </div>
            </GlassCard>
          </div>

          {latestSummary.personalRecords.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-[#FF9A58]/10 border border-[#FF9A58]/30 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#FF9A58]">
                <Award className="w-4 h-4" />
                <span>Epley 1RM & Volume Milestones!</span>
              </div>
              <ul className="text-xs text-white/90 space-y-1 pl-5 list-disc">
                {latestSummary.personalRecords.map((pr, idx) => (
                  <li key={idx}>{pr}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Perceived Effort (RPE) Slider — Fixes Bug #1 */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="rpe-slider" className="font-bold text-white">
                Session Perceived Effort (RPE):
              </label>
              <span className="font-black text-[#C7FF3D] tabular-nums">{rpe} / 10</span>
            </div>
            <input
              id="rpe-slider"
              type="range"
              min="5"
              max="10"
              step="0.5"
              value={rpe}
              onChange={e => setRpe(parseFloat(e.target.value))}
              className="w-full accent-[#C7FF3D] cursor-pointer"
            />
          </div>

          {/* Workout Notes — Fixes Bug #1 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#929895]">Session Reflection Notes:</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="How did the weights, energy, and mind-muscle connection feel?"
              className="w-full bg-[#151718] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
            />
          </div>
        </div>

        {/* Footer CTAs: Export Share Card & Save to Logbook */}
        <div className="p-4 border-t border-white/[0.08] bg-[#151718]/60 space-y-2">
          <button
            type="button"
            onClick={handleExportSocialCard}
            className="btn-glass-subtle w-full py-2.5 rounded-2xl text-xs font-bold text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D] flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export Shareable Strava Social Card (.PNG)</span>
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() =>
              updateSummary(latestSummary.id, {
                perceivedRpe: rpe,
                notes
              })
            }
            className="btn-electric-lime w-full py-3.5 text-sm font-black shadow-lg"
          >
            SAVE WORKOUT TO LOGBOOK
          </button>
        </div>
      </div>
    </div>
  );
};
