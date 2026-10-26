import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { WeekCalendarStrip } from '../components/planner/WeekCalendarStrip';
import { ScheduleDayCard } from '../components/planner/ScheduleDayCard';
import { CustomProgramModal } from '../components/planner/CustomProgramModal';
import { GlassCard } from '../components/common/GlassCard';
import { Layers, X, Plus, Trash2 } from 'lucide-react';

export const PlannerScreen: React.FC = () => {
  const {
    scheduleDays,
    workouts,
    customPrograms,
    assignWorkoutToDay,
    applySplitTemplate,
    saveCustomProgram,
    deleteCustomProgram,
    applyCustomProgram
  } = useFitness();

  const [selectedDayId, setSelectedDayId] = useState<string>('plan-fri');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showCustomProgramModal, setShowCustomProgramModal] = useState(false);
  const [deletingProgramId, setDeletingProgramId] = useState<string | null>(null);

  const selectedDay = scheduleDays.find(d => d.id === selectedDayId) || scheduleDays[0];

  return (
    <div className="space-y-5 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Weekly Planner
          </h1>
          <p className="text-xs text-[#929895] font-medium">
            Schedule 12-week Foundation & Ramping blocks or custom training splits
          </p>
        </div>
      </div>

      {/* Week Calendar Strip Component */}
      <GlassCard variant="standard" className="p-3.5 sm:p-4">
        <WeekCalendarStrip
          days={scheduleDays}
          selectedDayId={selectedDayId}
          onSelectDay={id => setSelectedDayId(id)}
        />
      </GlassCard>

      {/* Active Selected Day Schedule Card */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            SCHEDULED SESSION
          </h2>
          <span className="text-[11px] font-bold text-[#C7FF3D]">
            {selectedDay.dayName} Active
          </span>
        </div>

        <ScheduleDayCard
          day={selectedDay}
          onOpenAssignModal={() => setIsAssignModalOpen(true)}
        />
      </section>

      {/* Periodization Split Templates (Fixes Bug #7: resets non-template days to Rest) */}
      <section className="space-y-2.5">
        <div className="flex items-center gap-2 px-1">
          <Layers className="w-3.5 h-3.5 text-[#C7FF3D]" />
          <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            12-WEEK PROGRAM & SPLIT TEMPLATES
          </h2>
          <button
            type="button"
            onClick={() => setShowCustomProgramModal(true)}
            className="btn-electric-lime px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#C7FF3D]/25"
          >
            <Plus className="w-3 h-3 fill-[#101112]" />
            <span>Build Custom Program</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => applySplitTemplate('Foundation5')}
            className="p-3 rounded-2xl bg-[#1C1F20] border border-[#C7FF3D]/30 hover:border-[#C7FF3D] text-left transition group"
          >
            <span className="text-[10px] font-black uppercase text-[#C7FF3D]">Weeks 1–5</span>
            <h4 className="text-xs font-extrabold text-white mt-0.5 group-hover:text-[#C7FF3D] transition">
              Foundation 5-Day
            </h4>
            <p className="text-[10px] text-[#929895] mt-1">Upper/Lower + PPL</p>
          </button>

          <button
            type="button"
            onClick={() => applySplitTemplate('Ramping5')}
            className="p-3 rounded-2xl bg-[#1C1F20] border border-[#65D9C0]/30 hover:border-[#65D9C0] text-left transition group"
          >
            <span className="text-[10px] font-black uppercase text-[#65D9C0]">Weeks 6–12</span>
            <h4 className="text-xs font-extrabold text-white mt-0.5 group-hover:text-[#65D9C0] transition">
              Ramping Peak 5-Day
            </h4>
            <p className="text-[10px] text-[#929895] mt-1">High-Volume Overload</p>
          </button>

          <button
            type="button"
            onClick={() => applySplitTemplate('PPL')}
            className="p-3 rounded-2xl bg-[#1C1F20] border border-white/[0.08] hover:border-[#C7FF3D]/50 text-left transition group"
          >
            <span className="text-[10px] font-black uppercase text-[#C7FF3D]">Split 3</span>
            <h4 className="text-xs font-extrabold text-white mt-0.5 group-hover:text-[#C7FF3D] transition">
              Push / Pull / Legs
            </h4>
            <p className="text-[10px] text-[#929895] mt-1">4 days / week</p>
          </button>

          <button
            type="button"
            onClick={() => applySplitTemplate('UpperLower')}
            className="p-3 rounded-2xl bg-[#1C1F20] border border-white/[0.08] hover:border-[#65D9C0]/50 text-left transition group"
          >
            <span className="text-[10px] font-black uppercase text-[#65D9C0]">Split 4</span>
            <h4 className="text-xs font-extrabold text-white mt-0.5 group-hover:text-[#65D9C0] transition">
              Upper / Lower
            </h4>
            <p className="text-[10px] text-[#929895] mt-1">4 days / week</p>
          </button>

          <button
            type="button"
            onClick={() => applySplitTemplate('FullBody')}
            className="p-3 rounded-2xl bg-[#1C1F20] border border-white/[0.08] hover:border-[#FF9A58]/50 text-left transition group"
          >
            <span className="text-[10px] font-black uppercase text-[#FF9A58]">Split 5</span>
            <h4 className="text-xs font-extrabold text-white mt-0.5 group-hover:text-[#FF9A58] transition">
              Full Body Matrix
            </h4>
            <p className="text-[10px] text-[#929895] mt-1">3 days / week (Mon/Wed/Fri)</p>
          </button>

          {/* User-Created Custom Programs */}
          {customPrograms.map(p => {
            const assignedDays = Object.values(p.scheduleMap || {}).filter(
              Boolean
            ).length;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  applyCustomProgram(p.id);
                }}
                className="p-3 rounded-2xl bg-[#1C1F20] border border-[#C7FF3D]/30 hover:border-[#C7FF3D] text-left transition group"
              >
                <span className="text-[10px] font-black uppercase text-[#C7FF3D]">
                  Custom Program
                </span>
                <h4 className="text-xs font-extrabold text-white mt-0.5 group-hover:text-[#C7FF3D] transition truncate">
                  {p.title}
                </h4>
                <p className="text-[10px] text-[#929895] mt-1 line-clamp-1">
                  {p.subtitle}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#929895]">
                  <span>{p.daysPerWeek} days/week</span>
                  <span>•</span>
                  <span>{assignedDays} assigned</span>
                </div>
                <div className="mt-2.5 flex gap-1">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      applyCustomProgram(p.id);
                    }}
                    className="flex-1 btn-glass-subtle py-1.5 rounded-xl text-[10px] font-bold text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D]"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      setDeletingProgramId(p.id);
                    }}
                    className="w-8 h-8 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/20 flex items-center justify-center"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {showCustomProgramModal && (
        <CustomProgramModal
          isOpen={showCustomProgramModal}
          onClose={() => setShowCustomProgramModal(false)}
        />
      )}
      {deletingProgramId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C1F20] border border-white/15 w-full max-w-sm rounded-[24px] p-5 space-y-4 shadow-2xl">
            <h4 className="text-base font-black text-white">Delete Program?</h4>
            <p className="text-xs text-[#929895]">
              This will remove the custom program from your library.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingProgramId(null)}
                className="btn-glass-subtle flex-1 py-2.5 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!deletingProgramId) return;
                  deleteCustomProgram(deletingProgramId);
                  setDeletingProgramId(null);
                }}
                className="bg-rose-600 hover:bg-rose-500 text-white flex-1 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-rose-900/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Workout Modal using context `workouts` (including cloned routines!) */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-[#1C1F20] border border-white/15 w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-5 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-white">
                  Assign to {selectedDay.dayName}
                </h3>
                <p className="text-[11px] text-[#929895]">
                  Select from {workouts.length} routines (including 12-week program & cloned workouts)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto flex-1">
              {workouts.map(w => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => {
                    assignWorkoutToDay(selectedDay.id, w.id);
                    setIsAssignModalOpen(false);
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-[#151718] border border-white/[0.08] hover:border-[#C7FF3D] transition flex items-center gap-3 group"
                >
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase text-[#C7FF3D]">
                      {w.programPhase || w.category} • {w.durationMin}m
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#C7FF3D] transition truncate">
                      {w.title}
                    </h4>
                    <p className="text-[10px] text-[#929895] truncate">{w.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
