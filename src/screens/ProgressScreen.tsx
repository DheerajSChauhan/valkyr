import React, { useState, useMemo } from 'react';
import { useFitness } from '../context/FitnessContext';
import {
  mockVolumeData,
  mockStrengthData,
  mockBodyWeightData,
  mockPersonalRecords
} from '../data/mockProgress';
import { GlassCard } from '../components/common/GlassCard';
import { MetricCard } from '../components/common/MetricCard';
import { MuscleHeatmap, MuscleIntensityMap } from '../components/common/MuscleHeatmap';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { TrendingUp, Award, Scale, Dumbbell, Info } from 'lucide-react';

const LIFT_PROFILES = {
  incline: {
    label: '45° Incline Press',
    baseOffsetKg: 0
  },
  squat: {
    label: 'High-Bar Back Squat',
    baseOffsetKg: 35
  },
  rdl: {
    label: 'Barbell RDL',
    baseOffsetKg: 22.5
  },
  pulldown: {
    label: 'Neutral Lat Pulldown',
    baseOffsetKg: -14
  }
};

export const ProgressScreen: React.FC = () => {
  const { userProfile, workoutSummaries, convertFromKg } = useFitness();
  const [timeFilter, setTimeFilter] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');
  const [selectedLift, setSelectedLift] = useState<'incline' | 'squat' | 'rdl' | 'pulldown'>(
    'incline'
  );

  // Fixes Bug #2: Filter chart points by timeFilter AND append logged workoutSummaries + convert units
  const sliceCount =
    timeFilter === '1M' ? 4 : timeFilter === '3M' ? 6 : timeFilter === '6M' ? 7 : 8;

  const volumeChartData = useMemo(() => {
    const base = mockVolumeData.slice(-sliceCount).map(pt => ({
      ...pt,
      volume: convertFromKg(pt.volume)
    }));

    const loggedPoints = workoutSummaries
      .slice(0, 4)
      .reverse()
      .map((s, idx) => ({
        date: s.date.slice(0, 6),
        volume: convertFromKg(s.totalVolume),
        label: `Log ${idx + 1}`
      }));

    return [...base, ...loggedPoints];
  }, [sliceCount, workoutSummaries, userProfile.unit]);

  const strengthChartData = useMemo(() => {
    const offset = LIFT_PROFILES[selectedLift].baseOffsetKg;
    const base = mockStrengthData.slice(-Math.min(sliceCount, 5)).map(pt => ({
      date: pt.date,
      estimated1RM: convertFromKg(pt.estimated1RM + offset),
      weight: convertFromKg(pt.weight + offset),
      reps: pt.reps
    }));

    // Include any matching logged exercise 1RM from workoutSummaries
    const matchingLogs: { date: string; estimated1RM: number; weight: number; reps: number }[] = [];
    workoutSummaries.forEach(s => {
      s.exerciseLogs?.forEach(log => {
        if (
          (selectedLift === 'incline' && log.name.toLowerCase().includes('incline')) ||
          (selectedLift === 'squat' && log.name.toLowerCase().includes('squat')) ||
          (selectedLift === 'rdl' && log.name.toLowerCase().includes('rdl')) ||
          (selectedLift === 'pulldown' && log.name.toLowerCase().includes('pulldown'))
        ) {
          matchingLogs.push({
            date: 'Latest',
            estimated1RM: log.estimated1RM,
            weight: log.bestWeight,
            reps: log.bestReps
          });
        }
      });
    });

    return [...base, ...matchingLogs];
  }, [selectedLift, sliceCount, workoutSummaries, userProfile.unit]);

  const bodyWeightChartData = useMemo(() => {
    const base = mockBodyWeightData.slice(-sliceCount).map(pt => ({
      date: pt.date,
      weight: convertFromKg(pt.weight)
    }));
    return base;
  }, [sliceCount, userProfile.unit]);

  // Compute Muscle Heatmap intensities from logged workouts + baseline split
  const muscleIntensities: MuscleIntensityMap = useMemo(() => {
    const map: MuscleIntensityMap = {
      'Upper Chest': 2,
      'Mid & Lower Chest': 2,
      Lats: 2,
      'Upper Back & Lats': 2,
      'Lateral Delts': 3,
      'Rear Delts': 1,
      Quadriceps: 2,
      'Hamstrings & Glutes': 2,
      Biceps: 2,
      Triceps: 2,
      Calves: 1,
      'Core & Abs': 1
    };
    workoutSummaries.forEach(s => {
      s.targetMuscles?.forEach(m => {
        map[m] = Math.min(3, (map[m] || 1) + 1);
      });
    });
    return map;
  }, [workoutSummaries]);

  const totalVolumeSum = volumeChartData.reduce((acc, d) => acc + d.volume, 0);
  const peak1RM =
    strengthChartData.length > 0
      ? Math.max(...strengthChartData.map(d => d.estimated1RM))
      : convertFromKg(117.5);

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Progress & Analytics
          </h1>
          <p className="text-xs text-[#929895] font-medium">
            Live Epley 1RM curves, anatomical muscle heatmap & volume overload
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1 bg-[#1C1F20] p-1 rounded-xl border border-white/10">
          {(['1M', '3M', '6M', '1Y'] as const).map(tf => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeFilter(tf)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition ${
                timeFilter === tf
                  ? 'bg-[#C7FF3D] text-[#101112]'
                  : 'text-[#929895] hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 High-Level KPIs */}
      <div className="grid grid-cols-3 gap-2.5">
        <MetricCard
          icon={<TrendingUp className="w-4 h-4" />}
          label={`Volume (${timeFilter})`}
          value={`${(totalVolumeSum / 1000).toFixed(1)}k`}
          subtitle={`${userProfile.unit} lifted`}
          trend="+8.4%"
          accentColor="#C7FF3D"
        />
        <MetricCard
          icon={<Dumbbell className="w-4 h-4" />}
          label="Peak Est. 1RM"
          value={`${peak1RM}`}
          subtitle={`${userProfile.unit} (${LIFT_PROFILES[selectedLift].label.split(' ')[0]})`}
          trend={`+2.5 ${userProfile.unit}`}
          accentColor="#65D9C0"
        />
        <MetricCard
          icon={<Scale className="w-4 h-4" />}
          label="Body Weight"
          value={`${userProfile.bodyWeight}`}
          subtitle={`${userProfile.unit} (Target ${userProfile.targetWeight})`}
          trend="Lean Target"
          accentColor="#FF9A58"
        />
      </div>

      {/* Interactive Anatomical Muscle Heatmap (React Body Highlighter Integration) */}
      <MuscleHeatmap intensities={muscleIntensities} />

      {/* 1. Training Volume Progression Chart */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
              WEEKLY TRAINING VOLUME ({userProfile.unit.toUpperCase()})
            </h2>
          </div>
          <span className="text-[10px] font-bold text-[#C7FF3D]">
            Window: {timeFilter} ({volumeChartData.length} pts)
          </span>
        </div>

        <GlassCard variant="standard" className="p-4 sm:p-5">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={volumeChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="volumeLimeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C7FF3D" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#C7FF3D" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  stroke="#929895"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#929895"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={val => `${Math.round(val / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1F20',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#F5F5F2'
                  }}
                  formatter={(val: any) => [
                    `${Number(val).toLocaleString()} ${userProfile.unit}`,
                    'Volume'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#C7FF3D"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#volumeLimeGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-[#929895] mt-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#C7FF3D] shrink-0" />
            <span>
              Volume = Load × Repetitions across working sets. Completed workouts append automatically.
            </span>
          </p>
        </GlassCard>
      </section>

      {/* 2. Compound Strength Progression Chart with Lift Selector */}
      <section className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#65D9C0]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
              ESTIMATED 1RM STRENGTH CURVE ({userProfile.unit.toUpperCase()})
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-[#1C1F20] p-1 rounded-xl border border-white/10">
            {(Object.keys(LIFT_PROFILES) as Array<keyof typeof LIFT_PROFILES>).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedLift(key)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                  selectedLift === key
                    ? 'bg-[#65D9C0] text-[#101112] font-black'
                    : 'text-[#929895] hover:text-white'
                }`}
              >
                {LIFT_PROFILES[key].label.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        <GlassCard variant="standard" className="p-4 sm:p-5">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={strengthChartData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <XAxis
                  dataKey="date"
                  stroke="#929895"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#929895"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 5', 'dataMax + 5']}
                  tickFormatter={val => `${val}${userProfile.unit}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1F20',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#F5F5F2'
                  }}
                  formatter={(val: any) => [`${val} ${userProfile.unit}`, 'Estimated 1RM']}
                />
                <Line
                  type="monotone"
                  dataKey="estimated1RM"
                  stroke="#65D9C0"
                  strokeWidth={3}
                  dot={{ fill: '#65D9C0', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#C7FF3D' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>

      {/* 3. Body Weight Trend Chart */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9A58]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
              BODY COMPOSITION WEIGHT TREND ({userProfile.unit.toUpperCase()})
            </h2>
          </div>
          <span className="text-[10px] font-bold text-[#FF9A58]">Moving Average</span>
        </div>

        <GlassCard variant="standard" className="p-4 sm:p-5">
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={bodyWeightChartData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <XAxis
                  dataKey="date"
                  stroke="#929895"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#929895"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 1', 'dataMax + 1']}
                  tickFormatter={val => `${val}${userProfile.unit}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1F20',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#F5F5F2'
                  }}
                  formatter={(val: any) => [`${val} ${userProfile.unit}`, 'Body Weight']}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#FF9A58"
                  strokeWidth={2.5}
                  dot={{ fill: '#FF9A58', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>

      {/* 4. Personal Records & Logged Session History */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#FF9A58]" />
            <h2 className="text-xs font-black uppercase tracking-widest text-white">
              PERSONAL RECORDS & LOGGED MILESTONES
            </h2>
          </div>
          <span className="text-[11px] font-bold text-[#FF9A58]">
            {workoutSummaries.length + mockPersonalRecords.length} Total Records
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {workoutSummaries.map(s => (
            <GlassCard key={s.id} variant="elevated" className="p-3.5 space-y-1 border-[#C7FF3D]/30">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#C7FF3D]">
                  Logged Session • RPE {s.perceivedRpe}
                </span>
                <span className="text-[10px] text-[#929895]">{s.date}</span>
              </div>
              <h4 className="text-xs font-bold text-white truncate">{s.workoutTitle}</h4>
              <div className="text-xs font-black text-[#C7FF3D] tabular-nums">
                {convertFromKg(s.totalVolume).toLocaleString()} {userProfile.unit} ({s.totalSets}{' '}
                sets)
              </div>
              {s.notes && (
                <p className="text-[10px] text-[#929895] italic line-clamp-2">"{s.notes}"</p>
              )}
            </GlassCard>
          ))}

          {mockPersonalRecords.map(pr => (
            <GlassCard key={pr.id} variant="inset" className="p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF9A58]">
                  {pr.metric}
                </span>
                <span className="text-[10px] text-[#929895]">{pr.date}</span>
              </div>
              <h4 className="text-xs font-bold text-white truncate">{pr.exerciseName}</h4>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-black text-[#C7FF3D] tabular-nums">{pr.value}</span>
                {pr.previousValue && (
                  <span className="text-[10px] text-[#929895] line-through tabular-nums">
                    {pr.previousValue}
                  </span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};
