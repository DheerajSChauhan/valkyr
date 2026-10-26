import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { GlassCard } from '../components/common/GlassCard';
import { ProgressRing } from '../components/common/ProgressRing';
import { Droplet, Moon, Utensils, Zap, Plus, HeartPulse, Flame } from 'lucide-react';

export const NutritionRecoveryScreen: React.FC = () => {
  const { nutrition, logWater, addMeal, recovery, updateRecovery } = useFitness();
  const [mealName, setMealName] = useState('');
  const [mealCalories, setMealCalories] = useState('');
  const [mealProtein, setMealProtein] = useState('');
  const [isAddingMeal, setIsAddingMeal] = useState(false);

  // Calorie & Macro calculations
  const caloriePct = Math.min(100, Math.round((nutrition.consumedCalories / nutrition.dailyCalorieGoal) * 100));
  const proteinPct = Math.min(100, Math.round((nutrition.consumedProtein / nutrition.proteinGoal) * 100));
  const carbsPct = Math.min(100, Math.round((nutrition.consumedCarbs / nutrition.carbsGoal) * 100));
  const fatPct = Math.min(100, Math.round((nutrition.consumedFat / nutrition.fatGoal) * 100));
  const waterPct = Math.min(100, Math.round((nutrition.waterMl / nutrition.waterGoalMl) * 100));

  const handleCreateMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealName || !mealCalories) return;
    addMeal(mealName, parseInt(mealCalories, 10) || 0, parseInt(mealProtein, 10) || 0);
    setMealName('');
    setMealCalories('');
    setMealProtein('');
    setIsAddingMeal(false);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Nutrition & Recovery
          </h1>
          <p className="text-xs text-[#929895] font-medium">
            Fuel muscular protein synthesis, cellular hydration & nervous system readiness
          </p>
        </div>
      </div>

      {/* SECTION 1: NUTRITION & MACROS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-[#C7FF3D]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-white">
              DAILY ENERGY & MACROS
            </h2>
          </div>
          <span className="text-[10px] font-bold text-[#C7FF3D]">
            {nutrition.dailyCalorieGoal - nutrition.consumedCalories} kcal remaining
          </span>
        </div>

        {/* Calorie Progress Card */}
        <GlassCard variant="elevated" className="p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#929895]">
              CALORIC INTAKE
            </span>
            <div className="text-2xl font-black text-white tabular-nums tracking-tight">
              {nutrition.consumedCalories.toLocaleString()}{' '}
              <span className="text-xs font-normal text-[#929895]">
                / {nutrition.dailyCalorieGoal.toLocaleString()} kcal
              </span>
            </div>
            <p className="text-[11px] text-[#929895]">
              Balanced for lean hypertrophy with adequate carbohydrate glycogen replenishment.
            </p>
          </div>

          <ProgressRing
            progress={caloriePct}
            size={70}
            strokeWidth={6}
            strokeColor="#C7FF3D"
            trackColor="rgba(255, 255, 255, 0.08)"
          >
            <span className="text-xs font-black text-white tabular-nums">{caloriePct}%</span>
          </ProgressRing>
        </GlassCard>

        {/* 3 Macro Breakdown Bars */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* Protein */}
          <GlassCard variant="inset" className="p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#C7FF3D]">PROTEIN</span>
              <span className="text-white tabular-nums">{proteinPct}%</span>
            </div>
            <div className="text-sm font-black text-white tabular-nums">
              {nutrition.consumedProtein}g{' '}
              <span className="text-[10px] text-[#929895]">/ {nutrition.proteinGoal}g</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div className="h-full bg-[#C7FF3D] rounded-full" style={{ width: `${proteinPct}%` }} />
            </div>
          </GlassCard>

          {/* Carbs */}
          <GlassCard variant="inset" className="p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#65D9C0]">CARBS</span>
              <span className="text-white tabular-nums">{carbsPct}%</span>
            </div>
            <div className="text-sm font-black text-white tabular-nums">
              {nutrition.consumedCarbs}g{' '}
              <span className="text-[10px] text-[#929895]">/ {nutrition.carbsGoal}g</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div className="h-full bg-[#65D9C0] rounded-full" style={{ width: `${carbsPct}%` }} />
            </div>
          </GlassCard>

          {/* Fats */}
          <GlassCard variant="inset" className="p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#FF9A58]">FAT</span>
              <span className="text-white tabular-nums">{fatPct}%</span>
            </div>
            <div className="text-sm font-black text-white tabular-nums">
              {nutrition.consumedFat}g{' '}
              <span className="text-[10px] text-[#929895]">/ {nutrition.fatGoal}g</span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF9A58] rounded-full" style={{ width: `${fatPct}%` }} />
            </div>
          </GlassCard>
        </div>

        {/* Water Intake Tracker */}
        <GlassCard variant="standard" className="p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 fill-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-[#929895] block">
                Hydration Level
              </span>
              <div className="text-base font-black text-white tabular-nums">
                {(nutrition.waterMl / 1000).toFixed(1)}L{' '}
                <span className="text-xs text-[#929895]">/ {(nutrition.waterGoalMl / 1000).toFixed(1)}L Target</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => logWater(250)}
              className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 border-cyan-500/30"
            >
              +250 ml
            </button>
            <button
              type="button"
              onClick={() => logWater(500)}
              className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 border-cyan-500/30"
            >
              +500 ml
            </button>
          </div>
        </GlassCard>

        {/* Logged Meals List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#929895]">Logged Meals</span>
            <button
              type="button"
              onClick={() => setIsAddingMeal(!isAddingMeal)}
              className="text-xs font-bold text-[#C7FF3D] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingMeal ? 'Cancel' : 'Add Meal'}</span>
            </button>
          </div>

          {isAddingMeal && (
            <form onSubmit={handleCreateMeal} className="p-3 rounded-2xl bg-[#151718] border border-white/10 space-y-2.5">
              <input
                type="text"
                placeholder="Meal name (e.g. Salmon & Brown Rice)"
                value={mealName}
                onChange={e => setMealName(e.target.value)}
                className="w-full bg-[#1C1F20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Calories (kcal)"
                  value={mealCalories}
                  onChange={e => setMealCalories(e.target.value)}
                  className="bg-[#1C1F20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={mealProtein}
                  onChange={e => setMealProtein(e.target.value)}
                  className="bg-[#1C1F20] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
                />
              </div>
              <button type="submit" className="btn-electric-lime w-full py-2 text-xs font-black">
                Log Meal
              </button>
            </form>
          )}

          <div className="space-y-1.5">
            {nutrition.meals.map(m => (
              <div
                key={m.id}
                className="p-2.5 px-3 rounded-xl bg-[#151718] border border-white/[0.06] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">{m.name}</div>
                  <div className="text-[10px] text-[#929895]">{m.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-white tabular-nums">{m.calories} kcal</div>
                  <div className="text-[10px] text-[#C7FF3D] font-bold tabular-nums">{m.protein}g protein</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: RECOVERY & SLEEP */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-[#65D9C0]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-white">
              RECOVERY & SLEEP HYGIENE
            </h2>
          </div>
          <span className="text-[10px] font-bold text-[#65D9C0]">
            CNS Readiness: {recovery.recoveryScore}%
          </span>
        </div>

        <GlassCard variant="standard" className="p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#65D9C0]/15 border border-[#65D9C0]/30 text-[#65D9C0] flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#929895] block">
                  Last Night's Sleep
                </span>
                <div className="text-base font-black text-white tabular-nums">
                  {recovery.sleepHours} hrs{' '}
                  <span className="text-xs text-[#929895]">/ {recovery.sleepGoal} hrs target</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-[#929895] block">
                Resting Heart Rate
              </span>
              <span className="text-sm font-black text-white tabular-nums">
                {recovery.restingHeartRate} bpm
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#151718] border border-white/[0.06] text-xs text-[#929895] leading-relaxed">
            <strong className="text-white font-bold">Coach Evaluation:</strong> {recovery.notes}
          </div>

          {/* Subjective Readiness Sliders */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#929895]">Energy Level</span>
                <span className="font-bold text-[#65D9C0]">{recovery.energyRating}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={recovery.energyRating}
                onChange={e => updateRecovery({ energyRating: parseInt(e.target.value, 10) })}
                className="w-full accent-[#65D9C0] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#929895]">Muscle Soreness</span>
                <span className="font-bold text-[#FF9A58]">{recovery.sorenessRating}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={recovery.sorenessRating}
                onChange={e => updateRecovery({ sorenessRating: parseInt(e.target.value, 10) })}
                className="w-full accent-[#FF9A58] cursor-pointer"
              />
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};
