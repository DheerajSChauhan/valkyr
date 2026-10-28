import React, { useEffect, useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { warmupData } from '../../data/warmupData';
import { Exercise } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { ExerciseMedia, ExerciseAutoplayEmbed } from './ExerciseMedia';
import {
  X,
  BookOpen,
  Flame,
  Play,
  Layers,
  CheckCircle2,
  Repeat,
  Info,
  Calculator,
  Sparkles,
  Dumbbell,
  ShieldCheck,
  Film
} from 'lucide-react';

interface ProgramGuidebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'guidelines' | 'warmup' | 'blueprint';
}

function resolvePrescription(ex: Exercise, week: number) {
  const p = ex.prescriptions;
  if (!p) {
    return {
      sets: ex.defaultSets || 3,
      tech: week === 1 || week === 6 ? 'N/A' : 'Failure',
      earlyRpe: week === 1 || week === 6 ? '~7-8' : '~8-9',
      lastRpe: week === 1 || week === 6 ? '~8-9' : '10'
    };
  }
  if (week <= 1 && p.w1) return p.w1;
  if (week >= 2 && week <= 5 && p.w2_5) return p.w2_5;
  if (week === 6 && p.w6) return p.w6;
  if ((week === 7 || week === 8) && p.w7_8) return p.w7_8;
  if ((week === 9 || week === 10) && p.w9_10) return p.w9_10;
  if (week >= 11 && p.w11_12) return p.w11_12;
  return (
    p.w2_5 ||
    p.w7_8 || {
      sets: ex.defaultSets || 3,
      tech: 'Failure',
      earlyRpe: '~8-9',
      lastRpe: '10'
    }
  );
}

export const ProgramGuidebookModal: React.FC<ProgramGuidebookModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'guidelines'
}) => {
  const {
    programPlans,
    activeProgram,
    startProgramPlan,
    unsubscribeProgram,
    programWeek,
    setProgramWeek,
    workouts,
    startWorkout,
    userProfile
  } = useFitness();

  const [tab, setTab] = useState<'guidelines' | 'warmup' | 'blueprint'>(initialTab);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    activeProgram.programId || 'prog-jeff-nippard-bts'
  );
  const [previewWeek, setPreviewWeek] = useState<number>(programWeek || 1);
  const [previewDaySlot, setPreviewDaySlot] = useState<number>(1);
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const [activeSubPreview, setActiveSubPreview] = useState<{
    exId: string;
    subIdx: number;
  } | null>(null);
  const [warmupCalcWeight, setWarmupCalcWeight] = useState<number>(
    userProfile.unit === 'kg' ? 80 : 175
  );
  const [activeWarmupVideo, setActiveWarmupVideo] = useState<{
    name: string;
    id: string;
    start: number;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const bodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      touchAction: document.body.style.touchAction
    };
    document.documentElement.classList.add('modal-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.documentElement.classList.remove('modal-open');
      Object.assign(document.body.style, bodyStyle);
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlan =
    programPlans.find(p => p.id === selectedPlanId) || programPlans[0];

  const isRampingPreview = previewWeek >= 6;
  const dayPrefix = isRampingPreview ? 'ramping-d' : 'foundation-d';
  const targetWorkoutId = `${dayPrefix}${previewDaySlot}`;
  const previewWorkout =
    workouts.find(w => w.id === targetWorkoutId) || workouts[0];

  const round2_5 = (v: number) => Math.round(v / 2.5) * 2.5;

  const DAY_TABS = [
    { slot: 1, code: 'D1', label: 'D1 • Upper Strength' },
    { slot: 2, code: 'D2', label: 'D2 • Lower Strength' },
    { slot: 3, code: 'D3', label: 'D3 • Pull Hypertrophy' },
    { slot: 4, code: 'D4', label: 'D4 • Push Hypertrophy' },
    { slot: 5, code: 'D5', label: 'D5 • Legs Hypertrophy' }
  ];

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#161819] border border-white/15 w-full max-w-3xl rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Hero Header */}
        <div className="relative p-5 sm:p-6 border-b border-white/10 bg-gradient-to-r from-[#C7FF3D]/15 via-[#1C1F20] to-[#141617]">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#C7FF3D] text-[#101112]">
                  {currentPlan.badge}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                  By {currentPlan.author}
                </span>
                {activeProgram.isStarted && activeProgram.programId === currentPlan.id && (
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#65D9C0]/20 text-[#65D9C0] border border-[#65D9C0]/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active Program (Week {programWeek})
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                {currentPlan.title}
              </h2>
              <p className="text-xs text-[#929895] font-medium">
                {currentPlan.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn-glass-subtle w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Program Selector + Navigation Tabs */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 bg-[#101112]/90 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setTab('guidelines')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 ${
                  tab === 'guidelines'
                    ? 'bg-[#C7FF3D] text-[#101112]'
                    : 'text-[#929895] hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>PDF Guidelines & Rules</span>
              </button>
              <button
                type="button"
                onClick={() => setTab('warmup')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 ${
                  tab === 'warmup'
                    ? 'bg-[#C7FF3D] text-[#101112]'
                    : 'text-[#929895] hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Warm-Up Protocol</span>
              </button>
              <button
                type="button"
                onClick={() => setTab('blueprint')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 ${
                  tab === 'blueprint'
                    ? 'bg-[#C7FF3D] text-[#101112]'
                    : 'text-[#929895] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>12-Week PDF Matrix</span>
              </button>
            </div>

            {programPlans.length > 1 && (
              <select
                value={selectedPlanId}
                onChange={e => setSelectedPlanId(e.target.value)}
                className="bg-[#101112] border border-white/15 rounded-xl px-3 py-1.5 text-xs font-bold text-[#C7FF3D] focus:outline-none focus:border-[#C7FF3D]"
              >
                {programPlans.map(p => (
                  <option key={p.id} value={p.id}>
                    Plan: {p.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: PROGRAM GUIDELINES & OVERVIEW */}
          {tab === 'guidelines' && (
            <div className="space-y-5">
              {/* Executive Summary Card */}
              <GlassCard variant="elevated" className="p-4 sm:p-5 space-y-3 border border-[#C7FF3D]/25">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> What This Program Is About
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-white/90">
                    <span className="px-2 py-0.5 rounded-md bg-white/10">
                      {currentPlan.totalWeeks} Weeks
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">
                      {currentPlan.daysPerWeek} Days/Week
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10">
                      {currentPlan.sessionDurationMin}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F5F2] leading-relaxed">
                  {currentPlan.aboutSummary}
                </p>
                <div className="p-3 rounded-xl bg-[#101112]/80 border border-white/10 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#65D9C0]">
                    Weekly Training Split Architecture
                  </div>
                  <div className="text-xs font-bold text-white">
                    {currentPlan.splitOverview}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#101112]/80 border border-white/10 space-y-1.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-[#FF9A58]">
                    Progression & Overload Logic
                  </div>
                  <div className="text-xs text-[#929895] leading-relaxed">
                    {currentPlan.progressionPhilosophy}
                  </div>
                </div>
              </GlassCard>

              {/* Important Program Notes (Read Before Starting — PDF Page 2) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C7FF3D]" />
                    <span>Important Program Notes (Read Before Starting)</span>
                  </h3>
                  <span className="text-[10px] font-bold text-[#929895]">
                    PDF Page 2 Guidelines
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {currentPlan.importantNotes.map(note => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-2xl bg-[#1C1F20] border border-white/10 flex items-start gap-3"
                    >
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30 shrink-0 mt-0.5">
                        {note.badge}
                      </span>
                      <div className="space-y-1">
                        <h4 className="text-xs sm:text-sm font-black text-white">
                          {note.title}
                        </h4>
                        <p className="text-xs text-[#929895] leading-relaxed">
                          {note.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block Architecture Comparison (Foundation vs Ramping) */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-widest text-white px-1">
                  Periodization Blocks Breakdown
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPlan.blocks.map((block, bIdx) => (
                    <div
                      key={block.id}
                      className={`p-4 rounded-2xl border space-y-2 ${
                        bIdx === 0
                          ? 'bg-[#1C1F20] border-[#C7FF3D]/35'
                          : 'bg-[#1C1F20] border-[#65D9C0]/35'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            bIdx === 0
                              ? 'bg-[#C7FF3D]/15 text-[#C7FF3D]'
                              : 'bg-[#65D9C0]/15 text-[#65D9C0]'
                          }`}
                        >
                          {block.weeksLabel}
                        </span>
                        <span className="text-[10px] font-bold text-[#929895]">
                          {block.workoutIds.length} Workouts / Week
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-white">{block.name}</h4>
                      <p className="text-xs text-[#929895] leading-relaxed">
                        {block.focusSummary}
                      </p>
                      <div className="p-2.5 rounded-xl bg-[#121415] border border-white/[0.06] text-[11px] text-white/90">
                        <strong className="text-[#C7FF3D]">Intensity Progression: </strong>
                        {block.rpeProtocol}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last-Set Intensity Techniques Glossary */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-widest text-white px-1 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#FF9A58]" />
                  <span>Last-Set Intensity Techniques Guide</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentPlan.intensityTechniques.map(tech => (
                    <div
                      key={tech.name}
                      className="p-3.5 rounded-2xl bg-[#1C1F20] border border-white/10 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-white">{tech.name}</span>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FF9A58]/15 text-[#FF9A58] border border-[#FF9A58]/30">
                          {tech.tag}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#C7FF3D]">
                        {tech.summary}
                      </p>
                      <p className="text-[11px] text-[#929895] leading-relaxed">
                        {tech.howToExecute}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WARM-UP PROTOCOL (PDF PAGE 3) */}
          {tab === 'warmup' && (
            <div className="space-y-5">
              {/* General Warm-Up Protocol */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      Part 1: General Warm-Up Protocol (5–10 Mins Max)
                    </h3>
                    <p className="text-xs text-[#929895]">
                      Perform before every workout in the program. Click any drill for its auto-playing YouTube timestamp demo.
                    </p>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30">
                    PDF Page 3
                  </span>
                </div>

                {activeWarmupVideo && (
                  <ExerciseAutoplayEmbed
                    videoId={activeWarmupVideo.id}
                    videoStart={activeWarmupVideo.start}
                    title={activeWarmupVideo.name}
                    onSwitchToGif={() => setActiveWarmupVideo(null)}
                  />
                )}

                <div className="space-y-2">
                  {warmupData.general.map(item => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#1C1F20] border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-xl bg-[#121415] border border-white/10 text-xs font-black text-[#C7FF3D] shrink-0">
                          {item.prescription}
                        </span>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white">
                            {item.name}
                          </div>
                          {item.yt && (
                            <div className="text-[10px] text-[#929895]">
                              YouTube Demo Timestamp: 0:{String(item.yt.start).padStart(2, '0')}
                            </div>
                          )}
                        </div>
                      </div>

                      {item.yt && (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveWarmupVideo({
                              name: item.name,
                              id: item.yt!.id,
                              start: item.yt!.start || 0
                            })
                          }
                          className="btn-electric-lime px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0"
                        >
                          <Play className="w-3 h-3 fill-[#101112]" />
                          <span>Autoplay Demo</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercise-Specific Warm-Up Pyramid + Interactive Calculator */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between gap-2 flex-wrap px-1">
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-[#65D9C0]" />
                      <span>Part 2: Exercise-Specific Warm-Up Pyramids</span>
                    </h3>
                    <p className="text-xs text-[#929895]">
                      Perform according to the number of warm-up sets listed for each exercise in the program.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-[#1C1F20] px-3 py-1.5 rounded-xl border border-[#C7FF3D]/30">
                    <span className="text-[11px] font-bold text-[#929895]">
                      Working Weight ({userProfile.unit}):
                    </span>
                    <input
                      type="number"
                      step="2.5"
                      value={warmupCalcWeight}
                      onChange={e => setWarmupCalcWeight(parseFloat(e.target.value) || 0)}
                      className="w-20 bg-[#101112] border border-white/15 rounded-lg px-2 py-1 text-xs font-black text-[#C7FF3D] text-center focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-[#1C1F20] border border-white/10 space-y-1.5">
                    <div className="text-xs font-black text-[#C7FF3D] uppercase">
                      1 Warm-Up Set Listed
                    </div>
                    <p className="text-xs text-white/90">
                      Use <strong>~60%</strong> of planned working weight for ~6–10 reps (or until you feel warm and loose).
                    </p>
                    <div className="text-xs font-black text-[#65D9C0] pt-1">
                      Calculated: Set #1 = {round2_5(warmupCalcWeight * 0.6)} {userProfile.unit} × 6–10 reps
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1C1F20] border border-[#C7FF3D]/30 space-y-1.5">
                    <div className="text-xs font-black text-[#C7FF3D] uppercase">
                      2 Warm-Up Sets Listed (Mini Pyramid)
                    </div>
                    <p className="text-xs text-white/90">
                      Warm-Up Set #1 = <strong>~50%</strong> × 6–10 reps
                      <br />
                      Warm-Up Set #2 = <strong>~70%</strong> × 4–6 reps
                    </p>
                    <div className="text-xs font-black text-[#65D9C0] pt-1">
                      S1: {round2_5(warmupCalcWeight * 0.5)} {userProfile.unit} × 6–10 | S2:{' '}
                      {round2_5(warmupCalcWeight * 0.7)} {userProfile.unit} × 4–6
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1C1F20] border border-white/10 space-y-1.5">
                    <div className="text-xs font-black text-[#C7FF3D] uppercase">
                      3 Warm-Up Sets Listed (Full Pyramid)
                    </div>
                    <p className="text-xs text-white/90">
                      Set #1 = <strong>~45%</strong> × 6–10 reps | Set #2 = <strong>~65%</strong> × 4–6 reps | Set #3 = <strong>~85%</strong> × 3–4 reps
                    </p>
                    <div className="text-xs font-black text-[#65D9C0] pt-1">
                      S1: {round2_5(warmupCalcWeight * 0.45)} | S2: {round2_5(warmupCalcWeight * 0.65)} | S3:{' '}
                      {round2_5(warmupCalcWeight * 0.85)} {userProfile.unit}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1C1F20] border border-white/10 space-y-1.5">
                    <div className="text-xs font-black text-[#C7FF3D] uppercase">
                      4 Warm-Up Sets Listed (Heavy Compounds)
                    </div>
                    <p className="text-xs text-white/90">
                      Set #1 = <strong>~45%</strong> × 6–10 | Set #2 = <strong>~60%</strong> × 4–6 | Set #3 = <strong>~75%</strong> × 3–5 | Set #4 = <strong>~85%</strong> × 2–4 reps
                    </p>
                    <div className="text-xs font-black text-[#65D9C0] pt-1">
                      S1: {round2_5(warmupCalcWeight * 0.45)} | S2: {round2_5(warmupCalcWeight * 0.6)} | S3:{' '}
                      {round2_5(warmupCalcWeight * 0.75)} | S4: {round2_5(warmupCalcWeight * 0.85)}{' '}
                      {userProfile.unit}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 12-WEEK PDF MATRIX & EXERCISE EXPLORER */}
          {tab === 'blueprint' && (
            <div className="space-y-4">
              {/* Week 1..12 Selector */}
              <div className="p-3.5 rounded-2xl bg-[#1C1F20] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-white">
                    Select Program Week (Inspect Exact PDF Prescriptions)
                  </span>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30">
                    {previewWeek === 1
                      ? 'Week 1 • Foundation Intro / Deload (RPE 6–9)'
                      : previewWeek <= 5
                      ? `Week ${previewWeek} • Foundation Overload (Last Set RPE 10)`
                      : previewWeek === 6
                      ? 'Week 6 • Ramping Block Intro / Reset (RPE 6–9)'
                      : `Week ${previewWeek} • Ramping Peak Block (Last Set RPE 10)`}
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                  {Array.from({ length: 12 }, (_, idx) => idx + 1).map(w => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => {
                        setPreviewWeek(w);
                        setActiveVideoKey(null);
                        setActiveSubPreview(null);
                      }}
                      className={`py-1.5 rounded-lg text-[10px] font-black transition border ${
                        previewWeek === w
                          ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D]'
                          : w <= 5
                          ? 'bg-[#121415] text-white/80 border-white/10 hover:border-[#C7FF3D]/50'
                          : 'bg-[#121415] text-[#65D9C0] border-white/10 hover:border-[#65D9C0]/50'
                      }`}
                    >
                      W{w}
                    </button>
                  ))}
                </div>

                {/* Day 1..5 Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                  {DAY_TABS.map(d => (
                    <button
                      key={d.slot}
                      type="button"
                      onClick={() => {
                        setPreviewDaySlot(d.slot);
                        setActiveVideoKey(null);
                        setActiveSubPreview(null);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition border ${
                        previewDaySlot === d.slot
                          ? 'bg-white text-[#101112] border-white'
                          : 'bg-[#121415] text-[#929895] border-white/10 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Workout Day Header */}
              <div className="flex items-center justify-between gap-3 px-1 flex-wrap">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    Week {previewWeek} • {previewWorkout.title}
                  </h4>
                  <p className="text-xs text-[#929895]">
                    Default view shows integrated GIFs. Click <strong className="text-[#C7FF3D]">YouTube Autoplay</strong> or any <strong className="text-[#65D9C0]">PDF Alternate Exercise</strong> to preview.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setProgramWeek(previewWeek);
                    onClose();
                    startWorkout(previewWorkout);
                  }}
                  className="btn-electric-lime px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-[#101112]" />
                  <span>Start Week {previewWeek} Session</span>
                </button>
              </div>

              {/* Exercises Table Cards for Week & Day */}
              <div className="space-y-3">
                {previewWorkout.exercises.map((ex, idx) => {
                  const presc = resolvePrescription(ex, previewWeek);
                  const isMainVideoOpen = activeVideoKey === ex.id;
                  const activeSub =
                    activeSubPreview && activeSubPreview.exId === ex.id
                      ? ex.substitutions?.[activeSubPreview.subIdx]
                      : null;

                  return (
                    <div
                      key={ex.id}
                      className="p-4 rounded-2xl bg-[#1C1F20] border border-white/10 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                        <div className="flex items-start gap-3 min-w-0">
                          <ExerciseMedia
                            exercise={ex}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/10 shrink-0"
                          />
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md bg-[#C7FF3D]/15 text-[#C7FF3D] text-[10px] font-black">
                                #{idx + 1}
                              </span>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C7FF3D]">
                                {ex.targetMuscle} • {ex.equipment}
                              </span>
                              {presc.tech && presc.tech !== 'N/A' && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FF9A58]/15 text-[#FF9A58] border border-[#FF9A58]/30 flex items-center gap-1">
                                  <Flame className="w-3 h-3" /> Last Set: {presc.tech}
                                </span>
                              )}
                            </div>
                            <h5 className="text-sm sm:text-base font-black text-white">
                              {ex.name}
                            </h5>
                            {/* Prescription Metrics Strip */}
                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-white/90 pt-0.5">
                              <span className="px-2 py-0.5 rounded-lg bg-[#121415] border border-white/10 text-[#929895]">
                                Warm-up: <strong className="text-white">{ex.warmupSets || '1-2'}</strong>
                              </span>
                              <span className="px-2 py-0.5 rounded-lg bg-[#121415] border border-[#C7FF3D]/30 text-[#C7FF3D]">
                                Working: <strong>{presc.sets} sets × {ex.defaultReps}</strong>
                              </span>
                              <span className="px-2 py-0.5 rounded-lg bg-[#121415] border border-white/10 text-[#929895]">
                                Early RPE: <strong className="text-white">{presc.earlyRpe}</strong>
                              </span>
                              <span className="px-2 py-0.5 rounded-lg bg-[#121415] border border-[#FF9A58]/30 text-[#FF9A58]">
                                Last RPE: <strong>{presc.lastRpe}</strong>
                              </span>
                              <span className="px-2 py-0.5 rounded-lg bg-[#121415] border border-white/10 text-[#929895]">
                                Rest: <strong className="text-white">{Math.round(ex.defaultRestSec / 60)} min</strong>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Toggle GIF vs YouTube Autoplay */}
                        {ex.videoId && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSubPreview(null);
                              setActiveVideoKey(isMainVideoOpen ? null : ex.id);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shrink-0 ${
                              isMainVideoOpen
                                ? 'bg-[#C7FF3D] text-[#101112]'
                                : 'btn-glass-subtle text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D]'
                            }`}
                          >
                            {isMainVideoOpen ? (
                              <>
                                <Film className="w-3.5 h-3.5" />
                                <span>GIF View</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-[#C7FF3D]" />
                                <span>YouTube Autoplay</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Main Exercise Autoplay YouTube Embed */}
                      {isMainVideoOpen && ex.videoId && (
                        <ExerciseAutoplayEmbed
                          videoId={ex.videoId}
                          videoStart={ex.videoStart}
                          title={ex.name}
                          onSwitchToGif={() => setActiveVideoKey(null)}
                        />
                      )}

                      {/* Coach Notes from PDF */}
                      <div className="p-2.5 px-3 rounded-xl bg-[#121415] border border-white/[0.06] text-xs text-[#929895] flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-[#C7FF3D] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">PDF Notes:</strong> {ex.notes}
                        </span>
                      </div>

                      {/* PDF Substitution Options 1 & 2 */}
                      {ex.substitutions && ex.substitutions.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#65D9C0] flex items-center gap-1">
                              <Repeat className="w-3 h-3" />
                              <span>PDF Alternate Exercises (Click to Preview GIF & Autoplay Video)</span>
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ex.substitutions.map((sub, sIdx) => {
                              const isSubSelected =
                                activeSubPreview?.exId === ex.id &&
                                activeSubPreview?.subIdx === sIdx;
                              return (
                                <button
                                  key={sub.name}
                                  type="button"
                                  onClick={() => {
                                    setActiveVideoKey(null);
                                    setActiveSubPreview(
                                      isSubSelected ? null : { exId: ex.id, subIdx: sIdx }
                                    );
                                  }}
                                  className={`p-2.5 rounded-xl border text-left transition flex items-center justify-between gap-2 ${
                                    isSubSelected
                                      ? 'bg-[#65D9C0]/15 border-[#65D9C0] text-white'
                                      : 'bg-[#121415] border-white/10 hover:border-[#65D9C0]/50 text-white/90'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <ExerciseMedia
                                      exercise={{
                                        id: `${ex.id}-sub-${sIdx + 1}`,
                                        name: sub.name,
                                        mediaUrl: sub.mediaUrl,
                                        equipment: sub.equipment,
                                        targetMuscle: ex.targetMuscle
                                      }}
                                      className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                                      showBadge={false}
                                    />
                                    <div className="min-w-0">
                                      <div className="text-[10px] font-black uppercase text-[#65D9C0]">
                                        Substitution Option {sIdx + 1}
                                      </div>
                                      <div className="text-xs font-bold text-white truncate">
                                        {sub.name}
                                      </div>
                                      <div className="text-[10px] text-[#929895]">
                                        {sub.equipment} {sub.videoId ? '• ▶ YouTube Demo' : ''}
                                      </div>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-black text-[#65D9C0] shrink-0">
                                    {isSubSelected ? 'Hide' : 'Preview'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Active Substitution Preview Panel (GIF + Autoplay YouTube) */}
                          {activeSub && (
                            <div className="p-3.5 rounded-2xl bg-[#121415] border border-[#65D9C0]/40 space-y-3 animate-in fade-in">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <ExerciseMedia
                                    exercise={{
                                      id: `${ex.id}-sub-preview`,
                                      name: activeSub.name,
                                      mediaUrl: activeSub.mediaUrl,
                                      equipment: activeSub.equipment,
                                      targetMuscle: ex.targetMuscle
                                    }}
                                    className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                                  />
                                  <div>
                                    <span className="text-[10px] font-black uppercase text-[#65D9C0]">
                                      Alternate Movement Preview
                                    </span>
                                    <h6 className="text-sm font-black text-white">
                                      {activeSub.name} ({activeSub.equipment})
                                    </h6>
                                    <p className="text-[11px] text-[#929895]">
                                      {activeSub.notes}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {activeSub.videoId && (
                                <ExerciseAutoplayEmbed
                                  videoId={activeSub.videoId}
                                  videoStart={activeSub.videoStart}
                                  title={activeSub.name}
                                  onSwitchToGif={() => setActiveSubPreview(null)}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#121415] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#929895]">
            <Dumbbell className="w-4 h-4 text-[#C7FF3D]" />
            <span>
              Starting the program wires your Weekly Planner, Week 1–12 progression, and smart overload targets.
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {activeProgram.isStarted && activeProgram.programId === currentPlan.id && (
              <button
                type="button"
                onClick={unsubscribeProgram}
                className="px-4 py-2.5 rounded-xl text-xs font-black text-[#FCA5A5] bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 flex-1 sm:flex-initial"
              >
                Unfollow
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="btn-glass-subtle px-4 py-2.5 rounded-xl text-xs font-bold text-white flex-1 sm:flex-initial"
            >
              Close Preview
            </button>
            <button
              type="button"
              onClick={() => {
                startProgramPlan(currentPlan.id, previewWeek);
                onClose();
              }}
              className="btn-electric-lime px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-[#C7FF3D]/25 flex-1 sm:flex-initial"
            >
              <Play className="w-3.5 h-3.5 fill-[#101112]" />
              <span>
                {activeProgram.isStarted && activeProgram.programId === currentPlan.id
                  ? `Sync Program to Week ${previewWeek}`
                  : `Activate & Start Program (Week ${previewWeek})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
