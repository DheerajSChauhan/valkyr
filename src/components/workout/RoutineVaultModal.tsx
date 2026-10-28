import React, { useState, useMemo } from 'react';
import { CatalogRoutinePlan, VaultRoutine } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { X, Search, Clock, Dumbbell, Layers, ArrowRight, Filter, Calendar, Copy } from 'lucide-react';
import { convertRoutineDayToWorkout } from './routineUtils';

interface RoutineVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  routines: CatalogRoutinePlan[];
  onSelectRoutine: (routine: CatalogRoutinePlan | VaultRoutine) => void;
}

export const RoutineVaultModal: React.FC<RoutineVaultModalProps> = ({ isOpen, onClose, routines, onSelectRoutine }) => {
  const { exercises: libraryExercises, createCustomWorkout, showToast } = useFitness();

  const [search, setSearch] = useState('');
  const [goalFilter, setGoalFilter] = useState('All');
  const [daysFilter, setDaysFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const [hasCloned, setHasCloned] = useState(false);

  const GOAL_OPTIONS = ['All', 'Hypertrophy', 'Strength', 'Power & Hypertrophy', 'Aesthetics'];
  const DAYS_OPTIONS = ['All', '3 Days', '4 Days', '6 Days'];
  const LEVEL_OPTIONS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const EQUIPMENT_OPTIONS = ['All', 'Full Gym', 'Barbell & Dumbbells'];

  const allVaultPlans: CatalogRoutinePlan[] = useMemo(() => routines, [routines]);

  const filteredPlans = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allVaultPlans.filter(plan => {
      if (q) {
        const mt = plan.title.toLowerCase().includes(q);
        const ma = plan.author.toLowerCase().includes(q);
        const mg = plan.goal.toLowerCase().includes(q);
        const mtg = plan.tags.some(t => t.toLowerCase().includes(q));
        const me = plan.days.some(d => d.exercises.some(e => e.name.toLowerCase().includes(q) || e.targetMuscle.toLowerCase().includes(q)));
        if (!mt && !ma && !mg && !mtg && !me) return false;
      }
      if (goalFilter !== 'All') {
        const g = plan.goal.toLowerCase().includes(goalFilter.toLowerCase()) || plan.tags.some(t => t.toLowerCase().includes(goalFilter.toLowerCase()));
        if (!g) return false;
      }
      if (daysFilter !== 'All') {
        if (plan.daysPerWeek !== parseInt(daysFilter, 10)) return false;
      }
      if (levelFilter !== 'All' && plan.level !== levelFilter) return false;
      if (equipmentFilter !== 'All' && !plan.equipment.toLowerCase().includes(equipmentFilter.toLowerCase())) return false;
      return true;
    });
  }, [allVaultPlans, search, goalFilter, daysFilter, levelFilter, equipmentFilter]);

  const handleQuickClone = (plan: CatalogRoutinePlan, e: React.MouseEvent) => {
    e.stopPropagation();
    plan.days.forEach(day => {
      const workout = convertRoutineDayToWorkout(plan, day, libraryExercises);
      createCustomWorkout({ title: workout.title, subtitle: workout.subtitle, category: workout.category, level: workout.level, durationMin: workout.durationMin, targetMuscles: workout.targetMuscles, equipment: workout.equipment, exercises: workout.exercises, image: workout.image });
    });
    setHasCloned(true);
    showToast(`Cloned all ${plan.days.length} days of "${plan.shortTitle}" to My Workouts!`);
    setTimeout(() => setHasCloned(false), 2500);
  };

  if (!isOpen) return null;

  return (

    <div className="mobile-sheet__body mobile-top-safe overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#C7FF3D]/15 flex items-center justify-center text-[#C7FF3D]">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight">Routine Vault</h2>
        </div>
        <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white flex items-center justify-center transition active:scale-95 shrink-0" aria-label="Close vault">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 sm:p-4 pb-3 border-b border-white/5 space-y-3 bg-[#121415] rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-[#929895] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search split name, muscle, author..." className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-[#929895] focus:outline-none focus:border-[#C7FF3D] transition" />
          {search && (
            <button type="button" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="space-y-2 text-[11px]">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-extrabold uppercase text-[#929895] shrink-0 mr-1">Goal:</span>
            {GOAL_OPTIONS.map(g => (
              <button key={g} type="button" onClick={() => setGoalFilter(g)} className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black transition border ${goalFilter === g ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D]' : 'bg-[#181A1B] text-[#929895] hover:text-white border-white/10'}`}>{g}</button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-extrabold uppercase text-[#929895] shrink-0 mr-1">Days:</span>
            {DAYS_OPTIONS.map(d => (
              <button key={d} type="button" onClick={() => setDaysFilter(d)} className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black transition border ${daysFilter === d ? 'bg-[#65D9C0] text-[#101112] border-[#65D9C0]' : 'bg-[#181A1B] text-[#929895] hover:text-white border-white/10'}`}>{d}</button>
            ))}
            <span className="text-[10px] font-extrabold uppercase text-[#929895] shrink-0 mx-1">Level:</span>
            {LEVEL_OPTIONS.map(lvl => (
              <button key={lvl} type="button" onClick={() => setLevelFilter(lvl)} className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black transition border ${levelFilter === lvl ? 'bg-[#FF9A58] text-[#101112] border-[#FF9A58]' : 'bg-[#181A1B] text-[#929895] hover:text-white border-white/10'}`}>{lvl}</button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-extrabold uppercase text-[#929895] shrink-0 mr-1">Equipment:</span>
            {EQUIPMENT_OPTIONS.map(eq => (
              <button key={eq} type="button" onClick={() => setEquipmentFilter(eq)} className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black transition border ${equipmentFilter === eq ? 'bg-[#65D9C0] text-[#101112] border-[#65D9C0]' : 'bg-[#181A1B] text-[#929895] hover:text-white border-white/10'}`}>{eq}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-2 flex items-center justify-between text-[11px] text-[#929895] font-bold bg-[#141617] rounded-t-xl">
        <span>Showing <strong className="text-white">{filteredPlans.length}</strong> matching training plans</span>
        {(goalFilter !== 'All' || daysFilter !== 'All' || levelFilter !== 'All' || search) && (
          <button type="button" onClick={() => { setGoalFilter('All'); setDaysFilter('All'); setLevelFilter('All'); setEquipmentFilter('All'); setSearch(''); }} className="text-[#C7FF3D] hover:underline">Reset Filters</button>
        )}
      </div>


      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
        {filteredPlans.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <Dumbbell className="w-7 h-7 text-[#929895] mx-auto opacity-50" />
            <h4 className="text-sm font-bold text-white">No plans matched your filters</h4>
            <p className="text-xs text-[#929895]">Try adjusting your search keywords or resetting your filters.</p>
          </div>
        ) : (
          filteredPlans.map(plan => (
            <article key={plan.id} onClick={() => onSelectRoutine(plan)} className="rounded-2xl bg-[#181A1B] border border-white/10 hover:border-[#C7FF3D]/50 p-3 sm:p-4 transition-all duration-200 cursor-pointer group space-y-2 hover:shadow-xl">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5 min-w-0">
                  <img src={plan.coverImage} alt={plan.title} className="w-14 h-14 rounded-xl object-cover shrink-0 brightness-90 group-hover:scale-105 transition-transform" />
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-[#C7FF3D]/15 text-[#C7FF3D] text-[9px] font-black uppercase tracking-wider">{plan.daysBadge}</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.08] text-[#65D9C0] text-[9px] font-bold">{plan.goalBadge}</span>
                      <span className="px-2 py-0.5 rounded-md bg-white/[0.08] text-white/80 text-[9px] font-bold">{plan.level}</span>
                    </div>
                    <h4 className="text-sm font-black text-white group-hover:text-[#C7FF3D] transition truncate">{plan.title}</h4>
                    <p className="text-[11px] text-[#929895] line-clamp-1">{plan.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button type="button" onClick={e => handleQuickClone(plan, e)} className="p-2 rounded-xl bg-white/[0.06] hover:bg-[#C7FF3D] text-white hover:text-[#101112] text-xs font-bold transition active:scale-95" title="Clone to My Workouts"><Copy className="w-3.5 h-3.5" /></button>
                  <span className="w-8 h-8 rounded-xl bg-white/[0.06] group-hover:bg-[#C7FF3D] group-hover:text-[#101112] text-white flex items-center justify-center transition"><ArrowRight className="w-4 h-4" /></span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#929895] pt-1.5 border-t border-white/5 flex-wrap gap-1.5">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#C7FF3D]" />{plan.duration}</span>
                <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3 text-[#65D9C0]" />{plan.equipment}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#FF9A58]" />{plan.days.length} Routine Days</span>
                <span className="text-[#C7FF3D] font-bold text-[10px]">Author: {plan.author}</span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};