import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { CustomProgram, DifficultyLevel } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { X, Play, Moon, Clock, Calendar, Users, Save } from 'lucide-react';

const DAYS: {
  id:
    | 'plan-mon'
    | 'plan-tue'
    | 'plan-wed'
    | 'plan-thu'
    | 'plan-fri'
    | 'plan-sat'
    | 'plan-sun';
  label: string;
}[] = [
  { id: 'plan-mon', label: 'Mon' },
  { id: 'plan-tue', label: 'Tue' },
  { id: 'plan-wed', label: 'Wed' },
  { id: 'plan-thu', label: 'Thu' },
  { id: 'plan-fri', label: 'Fri' },
  { id: 'plan-sat', label: 'Sat' },
  { id: 'plan-sun', label: 'Sun' }
];

interface CustomProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomProgramModal: React.FC<CustomProgramModalProps> = ({
  isOpen,
  onClose
}) => {
  const { workouts, userProfile, saveCustomProgram, applyCustomProgram } = useFitness();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [totalWeeks, setTotalWeeks] = useState<number>(8);
  const [level, setLevel] = useState<DifficultyLevel>('Intermediate');
  const [guidelinesText, setGuidelinesText] = useState(
    'Perform 5-10 min general warm-up + pyramid sets before each session.\nTake early sets to RPE 8-9 and final set to RPE 10 failure.'
  );
  const [isPublic, setIsPublic] = useState(false);
  const [assignment, setAssignment] = useState<Record<string, string | null>>({
    'plan-mon': workouts[0]?.id || null,
    'plan-tue': workouts[1]?.id || null,
    'plan-wed': null,
    'plan-thu': workouts[2]?.id || null,
    'plan-fri': workouts[3]?.id || null,
    'plan-sat': workouts[4]?.id || null,
    'plan-sun': null
  });

  const daysPerWeek = Object.values(assignment).filter(Boolean).length;

  const handleSaveAndApply = () => {
    if (!title.trim()) return;
    const guidelines = guidelinesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const program: Omit<CustomProgram, 'id' | 'createdAt'> = {
      title: title.trim(),
      subtitle: subtitle.trim() || `${totalWeeks}-Week Custom Hypertrophy Plan`,
      authorName: userProfile.name,
      isPublic,
      daysPerWeek,
      totalWeeks,
      level,
      guidelines,
      scheduleMap: assignment as CustomProgram['scheduleMap']
    };
    const programId = saveCustomProgram(program);
    applyCustomProgram(programId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1C1F20] border border-white/15 w-full max-w-lg rounded-[30px] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-[#C7FF3D]/15 via-[#1C1F20] to-[#1C1F20]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C7FF3D]/15 border border-[#C7FF3D]/30 flex items-center justify-center text-[#C7FF3D]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                Custom Workout Program Architect
              </span>
              <h3 className="text-sm font-black text-white">
                Build a Multi-Week Program Plan & Guidelines
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

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-white">
                Program Plan Name <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Custom 8-Week Aesthetic Specialization"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Duration (Weeks)</label>
                <input
                  type="number"
                  min={1}
                  max={52}
                  value={totalWeeks}
                  onChange={e => setTotalWeeks(parseInt(e.target.value, 10) || 8)}
                  className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs font-black text-[#C7FF3D] focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white">Difficulty</label>
                <select
                  value={level}
                  onChange={e => setLevel(e.target.value as DifficultyLevel)}
                  className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#C7FF3D]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white">
                What This Program Is About (Overview)
              </label>
              <textarea
                rows={2}
                placeholder="Describe the hypertrophy or strength goals of this block…"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white">
                Program Guidelines & Progression Rules (1 per line)
              </label>
              <textarea
                rows={3}
                value={guidelinesText}
                onChange={e => setGuidelinesText(e.target.value)}
                className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={e => setIsPublic(e.target.checked)}
                  className="accent-[#C7FF3D]"
                />
                <span>Share with Club (Public)</span>
                <Users className="w-3 h-3 text-[#C7FF3D]" />
              </label>
              <span className="text-[10px] font-bold text-[#C7FF3D]">
                {daysPerWeek} Training Day{daysPerWeek !== 1 ? 's' : ''} / Week
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#929895]">
              Assign Workouts from Library (or Rest) to Each Day
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DAYS.map(day => {
                const workoutId = assignment[day.id];
                const workout = workoutId
                  ? workouts.find(w => w.id === workoutId)
                  : undefined;
                return (
                  <GlassCard key={day.id} variant="standard" className="p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black ${
                          workoutId === null
                            ? 'bg-[#151718] text-[#929895] border border-white/[0.08]'
                            : 'bg-[#C7FF3D]/20 text-[#C7FF3D] border border-[#C7FF3D]/50'
                        }`}
                      >
                        {workoutId === null ? (
                          <Moon className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3 fill-[#C7FF3D]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white">{day.label}</div>
                        <div className="text-[10px] text-[#929895] truncate">
                          {workout ? workout.title : 'Rest & Recovery Day'}
                        </div>
                      </div>
                      <Clock className="w-3 h-3 text-[#929895] shrink-0" />
                    </div>
                    <select
                      value={workoutId ?? 'rest'}
                      onChange={e =>
                        setAssignment(prev => ({
                          ...prev,
                          [day.id]: e.target.value === 'rest' ? null : e.target.value
                        }))
                      }
                      className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-2 py-1.5 text-[10px] font-black text-white focus:outline-none focus:border-[#C7FF3D]"
                    >
                      <option value="rest">Rest & Recovery Day</option>
                      {workouts.map(w => (
                        <option key={w.id} value={w.id}>
                          {w.title} ({w.durationMin}m)
                        </option>
                      ))}
                    </select>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/[0.08] bg-[#151718] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-glass-subtle py-2.5 rounded-xl text-xs font-bold text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAndApply}
            disabled={!title.trim()}
            className="flex-1 btn-electric-lime py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-[#C7FF3D]/25 disabled:opacity-40"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save & Activate Program</span>
          </button>
        </div>
      </div>
    </div>
  );
};