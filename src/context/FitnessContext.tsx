import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  Workout,
  ActiveWorkoutSession,
  WorkoutSummary,
  ScheduledDay,
  NutritionLog,
  RecoveryLog,
  UserProfile,
  Exercise,
  Unit,
  ScreenId,
  CommunityPost,
  LoggedExerciseSummary,
  CustomProgram,
  CreateCustomWorkoutInput,
  WorkoutCategory,
  DifficultyLevel,
  Equipment,
  WorkoutExercise,
  WorkoutProgramPlan,
  ActiveProgramProgress
} from '../types';
import { initialWorkouts } from '../data/workouts';
import { exerciseLibrary } from '../data/exercises';
import { builtInProgramPlans } from '../data/programs';
import { initialScheduleDays } from '../data/mockPlanner';
import {
  fetchExerciseGymGifs,
  enrichExerciseWithGif,
  enrichWorkoutWithGifs
} from '../data/exerciseGymGifs';
import { initialNutrition, initialRecovery, initialUserProfile } from '../data/mockNutrition';
import { initialCommunityPosts } from '../data/mockCommunity';
import { pbClient } from '../lib/pocketbase';

interface FitnessContextType {
  // Navigation & Screen
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  selectedWorkoutDetail: Workout | null;
  setSelectedWorkoutDetail: (workout: Workout | null) => void;

  // Program Guidebook & PDF Preview Modal
  isGuidebookOpen: boolean;
  guidebookTab: 'guidelines' | 'warmup' | 'blueprint';
  openGuidebook: (tab?: 'guidelines' | 'warmup' | 'blueprint') => void;
  closeGuidebook: () => void;

  // 12-Week Program Periodization & Active Program Progression
  programWeek: number;
  setProgramWeek: (week: number) => void;
  programPlans: WorkoutProgramPlan[];
  activeProgram: ActiveProgramProgress;
  startProgramPlan: (programId: string, startWeek?: number) => void;
  advanceProgramDayOrWeek: (daySlot: number) => void;
  resetProgramProgress: () => void;
  getNextProgramWorkout: () => Workout;
  swapWorkoutExerciseInPlan: (
    workoutId: string,
    exerciseIndex: number,
    newExercise: Exercise
  ) => void;

  // User Profile & Units
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  toggleUnit: () => void;
  convertFromKg: (kgVal: number) => number;

  // Workouts Catalog
  workouts: Workout[];
  toggleBookmark: (workoutId: string) => void;
  getWorkoutById: (id: string) => Workout | undefined;

  // Active Gym Session
  activeSession: ActiveWorkoutSession | null;
  setActiveSession: React.Dispatch<React.SetStateAction<ActiveWorkoutSession | null>>;
  startWorkout: (workout: Workout) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    field: 'weight' | 'reps',
    value: number | string
  ) => void;
  toggleSetComplete: (exerciseIndex: number, setIndex: number) => void;
  addSet: (exerciseIndex: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
  replaceExercise: (exerciseIndex: number, newExercise: Exercise) => void;
  finishWorkout: (perceivedRpe?: number, notes?: string) => void;
  updateSummary: (summaryId: string, updates: { perceivedRpe: number; notes: string }) => void;
  cancelWorkout: () => void;

  // Rest Timer
  restRemainingSec: number;
  restTotalSec: number;
  isTimerRunning: boolean;
  timerLabel: string;
  startRestTimer: (seconds: number, label?: string) => void;
  stopRestTimer: () => void;
  adjustRestTimer: (deltaSeconds: number) => void;

  // Workout Summaries
  workoutSummaries: WorkoutSummary[];
  latestSummary: WorkoutSummary | null;
  closeSummaryModal: () => void;

  // Weekly Planner
  scheduleDays: ScheduledDay[];
  toggleDayComplete: (id: string) => void;
  assignWorkoutToDay: (dayId: string, workoutId: string) => void;
  toggleRestDay: (dayId: string) => void;
  applySplitTemplate: (
    templateName: 'Foundation5' | 'Ramping5' | 'PPL' | 'UpperLower' | 'FullBody'
  ) => void;

  // Stateful Exercise Library (built-in PDF + ExerciseGymGifsDB + custom exercises)
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  addCustomExercise: (input: Omit<Exercise, 'id'>) => Exercise;
  updateCustomExercise: (id: string, updates: Partial<Exercise>) => void;
  deleteCustomExercise: (id: string) => void;
  getExerciseBestStats: (
    exerciseId: string
  ) => {
    bestWeight: number;
    bestReps: number;
    estimated1RM: number;
    volume: number;
    setsCompleted: number;
  } | null;

  // Custom Workouts / Routine Builder
  createCustomWorkout: (input: CreateCustomWorkoutInput) => void;
  updateCustomWorkout: (id: string, updates: Partial<Workout>) => void;
  deleteCustomWorkout: (id: string) => void;
  duplicateWorkout: (workout: Workout) => void;

  // Freestyle / Empty Workouts
  startEmptyWorkout: (customTitle?: string) => void;
  addExerciseToActiveSession: (exercise: Exercise) => void;

  // Custom Multi-Day Programs
  customPrograms: CustomProgram[];
  saveCustomProgram: (input: Omit<CustomProgram, 'id' | 'createdAt'>) => string;
  deleteCustomProgram: (id: string) => void;
  applyCustomProgram: (programId: string) => void;
  getCustomProgramById: (id: string) => CustomProgram | undefined;

  // Nutrition & Recovery
  nutrition: NutritionLog;
  logWater: (amountMl: number) => void;
  addMeal: (name: string, calories: number, protein: number) => void;
  recovery: RecoveryLog;
  updateRecovery: (updates: Partial<RecoveryLog>) => void;

  // Community & PocketBase Cloud Sync
  communityPosts: CommunityPost[];
  toggleKudos: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  cloneRoutineFromPost: (post: CommunityPost) => void;
  pbOnline: boolean;
  pbQueueCount: number;
  pbStatusMessage: string;
  triggerCloudSync: () => Promise<void>;
  importBackupData: (rawJson: string) => boolean;

  // Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

function playTimerAlertSound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    [0, 0.22, 0.44].forEach(offset => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime + offset);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.19);
    });
  } catch (e) {
    console.warn('Audio alert not available', e);
  }
}

const DEFAULT_WORKOUT_COVER =
  'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 450%22 width=%22800%22 height=%22450%22%3E%3Crect width=%22800%22 height=%22450%22 fill=%22%23151718%22/%3E%3Ctext x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23929895%22 font-family=%22Inter%2C sans-serif%22 font-weight=%22800%22 font-size=%2232%22%3EWORKOUT%3C/text%3E%3C/svg%3E';

export function getPrescriptionForWeek(ex: Exercise, week: number) {
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
    p.w7_8 ||
    p.w1 ||
    p.w6 || {
      sets: ex.defaultSets || 3,
      tech: 'Failure',
      earlyRpe: '~8-9',
      lastRpe: '10'
    }
  );
}

// Realistic starting baseline load (in kg) based on movement biomechanics when no prior log exists
function estimateDefaultLoadKg(ex: Exercise): number {
  const n = ex.name.toLowerCase();
  if (n.includes('leg press') || n.includes('hack squat')) return 120;
  if (n.includes('squat') || n.includes('deadlift') || n.includes('rdl') || n.includes('hip thrust')) {
    return ex.equipment === 'Dumbbells' ? 28 : 80;
  }
  if (n.includes('bench press') || n.includes('incline barbell') || n.includes('chest press')) {
    return ex.equipment === 'Dumbbells' ? 30 : 70;
  }
  if (n.includes('incline db')) return 28;
  if (n.includes('shoulder press')) return ex.equipment === 'Dumbbells' ? 22 : 50;
  if (n.includes('pulldown') || n.includes('cable row') || n.includes('t-bar') || n.includes('machine row') || n.includes('pendlay') || n.includes('smith machine row')) {
    return 60;
  }
  if (n.includes('pull-up') || n.includes('chin-up') || n.includes('dip')) return 0;
  if (n.includes('shrug') || n.includes('calf')) return 70;
  if (n.includes('leg extension') || n.includes('leg curl') || n.includes('adduction') || n.includes('abduction')) {
    return 50;
  }
  if (n.includes('lateral raise') || n.includes('rear delt') || n.includes('kickback') || n.includes('concentration')) {
    return 12;
  }
  if (n.includes('curl') || n.includes('triceps') || n.includes('skull crusher') || n.includes('pressdown') || n.includes('flye') || n.includes('crossover') || n.includes('pec deck')) {
    return 24;
  }
  return 40;
}

function parseRepBounds(repRange: string): { minReps: number; maxReps: number } {
  const matches = repRange.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (matches) {
    return {
      minReps: parseInt(matches[1], 10) || 8,
      maxReps: parseInt(matches[2], 10) || 10
    };
  }
  const single = parseInt(repRange, 10);
  return { minReps: single || 8, maxReps: single || 10 };
}

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedWorkoutDetail, setSelectedWorkoutDetail] = useState<Workout | null>(null);
  const [isGuidebookOpen, setIsGuidebookOpen] = useState<boolean>(false);
  const [guidebookTab, setGuidebookTab] = useState<'guidelines' | 'warmup' | 'blueprint'>(
    'guidelines'
  );

  const openGuidebook = (tab: 'guidelines' | 'warmup' | 'blueprint' = 'guidelines') => {
    setGuidebookTab(tab);
    setIsGuidebookOpen(true);
  };

  const closeGuidebook = () => {
    setIsGuidebookOpen(false);
  };

  const [programWeek, setProgramWeekState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('obsidian_program_week');
      return saved ? parseInt(saved, 10) || 1 : 1;
    } catch {
      return 1;
    }
  });

  const [activeProgram, setActiveProgram] = useState<ActiveProgramProgress>(() => {
    try {
      const saved = localStorage.getItem('obsidian_active_program_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      programId: 'prog-jeff-nippard-bts',
      isStarted: true,
      startedAt: new Date().toISOString(),
      currentWeek: 1,
      currentDaySlot: 1,
      completedSessionKeys: [],
      preferredSwaps: {}
    };
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('obsidian_user_profile');
      return saved
        ? { ...initialUserProfile, ...JSON.parse(saved) }
        : { ...initialUserProfile, handle: '@alex_valkyr', currentProgramWeek: 1 };
    } catch {
      return { ...initialUserProfile, handle: '@alex_valkyr', currentProgramWeek: 1 };
    }
  });

  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      const saved = localStorage.getItem('obsidian_workouts_v3');
      return saved ? JSON.parse(saved) : initialWorkouts;
    } catch {
      return initialWorkouts;
    }
  });

  // Stateful exercise library: Always includes all 109 curated PDF & Hevy exercises + custom + ExerciseGymGifsDB
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    try {
      const saved = localStorage.getItem('obsidian_exercises_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= exerciseLibrary.length) {
          return parsed;
        }
      }
    } catch {}
    return exerciseLibrary;
  });

  // User-created multi-day training programs
  const [customPrograms, setCustomPrograms] = useState<CustomProgram[]>(() => {
    try {
      const saved = localStorage.getItem('obsidian_custom_programs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSession, setActiveSession] = useState<ActiveWorkoutSession | null>(() => {
    try {
      const saved = localStorage.getItem('obsidian_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [restRemainingSec, setRestRemainingSec] = useState<number>(0);
  const [restTotalSec, setRestTotalSec] = useState<number>(90);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerLabel, setTimerLabel] = useState<string>('Resting between sets...');
  const timerIntervalRef = useRef<number | null>(null);

  const [workoutSummaries, setWorkoutSummaries] = useState<WorkoutSummary[]>(() => {
    try {
      const saved = localStorage.getItem('obsidian_summaries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [latestSummary, setLatestSummary] = useState<WorkoutSummary | null>(null);

  const [scheduleDays, setScheduleDays] = useState<ScheduledDay[]>(() => {
    try {
      const saved = localStorage.getItem('obsidian_schedule_v2');
      return saved ? JSON.parse(saved) : initialScheduleDays;
    } catch {
      return initialScheduleDays;
    }
  });

  const [nutrition, setNutrition] = useState<NutritionLog>(() => {
    try {
      const saved = localStorage.getItem('obsidian_nutrition');
      return saved ? JSON.parse(saved) : initialNutrition;
    } catch {
      return initialNutrition;
    }
  });
  const [recovery, setRecovery] = useState<RecoveryLog>(() => {
    try {
      const saved = localStorage.getItem('obsidian_recovery');
      return saved ? JSON.parse(saved) : initialRecovery;
    } catch {
      return initialRecovery;
    }
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('obsidian_community_posts');
      return saved ? JSON.parse(saved) : initialCommunityPosts;
    } catch {
      return initialCommunityPosts;
    }
  });

  const [pbOnline, setPbOnline] = useState<boolean>(false);
  const [pbQueueCount, setPbQueueCount] = useState<number>(() => pbClient.getQueue().length);
  const [pbStatusMessage, setPbStatusMessage] = useState<string>('Offline-first queue active');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Load ExerciseGymGifsDB and enrich all built-in PDF exercises, substitutions, and workouts with integrated GIFs!
  useEffect(() => {
    let cancelled = false;

    fetchExerciseGymGifs()
      .then(({ exercises: remoteExercises, rawCatalog }) => {
        if (cancelled) return;

        // 1. Enrich all curated exerciseLibrary items with matched GIFs
        const enrichedCurated = exerciseLibrary.map(ex => enrichExerciseWithGif(ex, rawCatalog));
        const curatedNames = new Set(enrichedCurated.map(e => e.name.toLowerCase()));

        // 2. Keep custom user exercises + append non-duplicate remote GIF exercises
        setExercises(current => {
          const customOnes = current
            .filter(e => e.isCustom)
            .map(ex => enrichExerciseWithGif(ex, rawCatalog));
          const additionalRemote = remoteExercises.filter(
            r => !curatedNames.has(r.name.toLowerCase())
          );
          return [...enrichedCurated, ...customOnes, ...additionalRemote];
        });

        // 3. Enrich all workouts and their substitutions with matched GIFs
        setWorkouts(currentWorkouts =>
          currentWorkouts.map(w => enrichWorkoutWithGifs(w, rawCatalog))
        );

        // 4. Enrich selectedWorkoutDetail & activeSession if currently open
        setSelectedWorkoutDetail(prev => (prev ? enrichWorkoutWithGifs(prev, rawCatalog) : null));
        setActiveSession(prev => {
          if (!prev) return null;
          return {
            ...prev,
            exercises: prev.exercises.map(ex => ({
              ...ex,
              ...enrichExerciseWithGif(ex, rawCatalog),
              sets: ex.sets
            }))
          };
        });
      })
      .catch(error => {
        console.warn('ExerciseGymGifsDB catalog offline fallback active:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Combine built-in program plans + user custom programs converted to WorkoutProgramPlan
  const programPlans: WorkoutProgramPlan[] = [
    ...builtInProgramPlans,
    ...customPrograms.map(cp => ({
      id: cp.id,
      title: cp.title,
      subtitle: cp.subtitle || 'Custom Multi-Day Workout Program',
      author: cp.authorName || userProfile.name,
      badge: `CUSTOM PLAN • ${cp.daysPerWeek} DAYS/WEEK`,
      level: cp.level || ('Intermediate' as DifficultyLevel),
      totalWeeks: cp.totalWeeks || 8,
      daysPerWeek: cp.daysPerWeek,
      sessionDurationMin: '45–65 mins',
      heroImage: DEFAULT_WORKOUT_COVER,
      aboutSummary:
        cp.subtitle ||
        'Custom multi-day training program built in Valkyr with full progression tracking.',
      splitOverview: `${cp.daysPerWeek} Training Days / Week`,
      progressionPhilosophy:
        cp.progressionRule ||
        'Double Progression: Hit the top of the prescribed rep range across working sets, then add 2.5 kg / 5 lbs next session.',
      importantNotes: (cp.guidelines && cp.guidelines.length > 0
        ? cp.guidelines
        : [
            'Complete a 5–10 minute general and exercise-specific warm-up before each session.',
            'Track every working set weight and rep count to trigger automatic double-progression targets.'
          ]
      ).map((g, i) => ({
        id: `${cp.id}-note-${i}`,
        title: `Program Guideline #${i + 1}`,
        badge: `RULE 0${i + 1}`,
        description: g
      })),
      intensityTechniques: [
        {
          name: 'Last-Set Failure (RPE 10)',
          tag: 'Core Overload',
          summary: 'Push your final set to technical failure while leaving 1–2 reps in reserve on early sets.',
          howToExecute: 'Log your exact reps completed to unlock progressive overload targets next week.'
        }
      ],
      blocks: [
        {
          id: `${cp.id}-block-1`,
          name: 'Main Training Block',
          weeksLabel: `Weeks 1–${cp.totalWeeks || 8}`,
          weekStart: 1,
          weekEnd: cp.totalWeeks || 8,
          focusSummary: cp.subtitle || 'Custom scheduled microcycle.',
          rpeProtocol: 'Early sets ~8 RPE • Final set 9.5–10 RPE',
          workoutIds: Object.values(cp.scheduleMap).filter((v): v is string => Boolean(v)),
          scheduleMap: cp.scheduleMap
        }
      ],
      isCustom: true
    }))
  ];

  // Sync scheduleDays to a given week of the Jeff Nippard 12-week program (or custom plan)
  const syncScheduleToProgramWeek = (
    targetProgramId: string,
    week: number,
    completedKeys: string[]
  ) => {
    const plan =
      programPlans.find(p => p.id === targetProgramId) || builtInProgramPlans[0];
    const activeBlock =
      plan.blocks.find(b => week >= b.weekStart && week <= b.weekEnd) || plan.blocks[0];

    if (!activeBlock) return;

    const dayOrderMap: Record<string, number> = {
      'plan-mon': 1,
      'plan-tue': 2,
      'plan-thu': 3,
      'plan-fri': 4,
      'plan-sat': 5
    };

    setScheduleDays(prev =>
      prev.map(day => {
        const wId = activeBlock.scheduleMap[day.id as keyof CustomProgram['scheduleMap']];
        const workout = wId ? workouts.find(w => w.id === wId) : undefined;
        const slotNum = dayOrderMap[day.id];
        const isDone = slotNum
          ? completedKeys.includes(`w${week}-d${slotNum}`)
          : false;

        if (workout) {
          return {
            ...day,
            workout,
            isRestDay: false,
            isCompleted: isDone,
            time: day.time === 'Rest & Mobility' ? '06:00 PM' : day.time
          };
        }
        return {
          ...day,
          workout: undefined,
          isRestDay: true,
          isCompleted: false,
          time: 'Rest & Mobility'
        };
      })
    );
  };

  const setProgramWeek = (week: number) => {
    const clamped = Math.max(1, Math.min(12, week));
    setProgramWeekState(clamped);
    try {
      localStorage.setItem('obsidian_program_week', String(clamped));
    } catch {}

    // Find first uncompleted day in that week
    let nextSlot = 1;
    for (let s = 1; s <= 5; s++) {
      if (!activeProgram.completedSessionKeys.includes(`w${clamped}-d${s}`)) {
        nextSlot = s;
        break;
      }
    }

    setActiveProgram(prev => ({
      ...prev,
      currentWeek: clamped,
      currentDaySlot: nextSlot
    }));

    syncScheduleToProgramWeek(
      activeProgram.programId,
      clamped,
      activeProgram.completedSessionKeys
    );

    showToast(
      `Week ${clamped} Active (${
        clamped === 1
          ? 'Foundation Intro • RPE 6–9'
          : clamped <= 5
          ? 'Foundation Block • RPE 10 Failure'
          : clamped === 6
          ? 'Ramping Intro Reset • RPE 6–9'
          : 'Ramping Peak Block • RPE 10 Overload'
      })`
    );
  };

  const startProgramPlan = (programId: string, startWeek: number = 1) => {
    const clampedWeek = Math.max(1, Math.min(12, startWeek));
    setProgramWeekState(clampedWeek);
    try {
      localStorage.setItem('obsidian_program_week', String(clampedWeek));
    } catch {}

    const nextState: ActiveProgramProgress = {
      programId,
      isStarted: true,
      startedAt: new Date().toISOString(),
      currentWeek: clampedWeek,
      currentDaySlot: 1,
      completedSessionKeys: activeProgram.completedSessionKeys,
      preferredSwaps: activeProgram.preferredSwaps || {}
    };
    setActiveProgram(nextState);
    syncScheduleToProgramWeek(programId, clampedWeek, nextState.completedSessionKeys);

    const plan = programPlans.find(p => p.id === programId);
    showToast(
      `🚀 Activated "${plan?.title || 'Program'}" — Week ${clampedWeek}, Day 1 Ready!`
    );
  };

  const advanceProgramDayOrWeek = (daySlot: number) => {
    const clampedSlot = Math.max(1, Math.min(5, daySlot));
    setActiveProgram(prev => ({
      ...prev,
      currentDaySlot: clampedSlot
    }));
  };

  const resetProgramProgress = () => {
    const fresh: ActiveProgramProgress = {
      programId: activeProgram.programId || 'prog-jeff-nippard-bts',
      isStarted: true,
      startedAt: new Date().toISOString(),
      currentWeek: 1,
      currentDaySlot: 1,
      completedSessionKeys: [],
      preferredSwaps: {}
    };
    setActiveProgram(fresh);
    setProgramWeekState(1);
    syncScheduleToProgramWeek(fresh.programId, 1, []);
    showToast('Program progress reset to Week 1 • Day 1');
  };

  const getNextProgramWorkout = (): Workout => {
    const isRamping = programWeek >= 6;
    const prefix = isRamping ? 'ramping-d' : 'foundation-d';
    const slot = activeProgram.currentDaySlot || 1;
    const targetId = `${prefix}${slot}`;
    return (
      workouts.find(w => w.id === targetId) ||
      workouts.find(w => w.id.startsWith(prefix)) ||
      workouts[0]
    );
  };

  // Swap an exercise inside a workout plan before or during a session
  const swapWorkoutExerciseInPlan = (
    workoutId: string,
    exerciseIndex: number,
    newExercise: Exercise
  ) => {
    setWorkouts(prev =>
      prev.map(w => {
        if (w.id !== workoutId) return w;
        const nextExercises = [...w.exercises];
        const original = nextExercises[exerciseIndex];
        const merged: Exercise = {
          ...newExercise,
          defaultSets: original.defaultSets,
          defaultReps: original.defaultReps,
          defaultRestSec: original.defaultRestSec,
          warmupSets: original.warmupSets,
          prescriptions: original.prescriptions,
          substitutions: original.substitutions
        };
        nextExercises[exerciseIndex] = merged;
        return { ...w, exercises: nextExercises };
      })
    );

    setSelectedWorkoutDetail(prev => {
      if (!prev || prev.id !== workoutId) return prev;
      const nextExercises = [...prev.exercises];
      const original = nextExercises[exerciseIndex];
      nextExercises[exerciseIndex] = {
        ...newExercise,
        defaultSets: original.defaultSets,
        defaultReps: original.defaultReps,
        defaultRestSec: original.defaultRestSec,
        warmupSets: original.warmupSets,
        prescriptions: original.prescriptions,
        substitutions: original.substitutions
      };
      return { ...prev, exercises: nextExercises };
    });

    showToast(`Swapped to alternate movement: ${newExercise.name}`);
  };

  // Persist to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem('obsidian_active_program_v1', JSON.stringify(activeProgram));
    } catch {}
  }, [activeProgram]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_user_profile', JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_workouts_v3', JSON.stringify(workouts));
    } catch {}
  }, [workouts]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_exercises_v4', JSON.stringify(exercises));
    } catch {}
  }, [exercises]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_custom_programs', JSON.stringify(customPrograms));
    } catch {}
  }, [customPrograms]);

  useEffect(() => {
    try {
      if (activeSession) {
        localStorage.setItem('obsidian_active_session', JSON.stringify(activeSession));
      } else {
        localStorage.removeItem('obsidian_active_session');
      }
    } catch {}
  }, [activeSession]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_summaries', JSON.stringify(workoutSummaries));
    } catch {}
  }, [workoutSummaries]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_schedule_v2', JSON.stringify(scheduleDays));
    } catch {}
  }, [scheduleDays]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_nutrition', JSON.stringify(nutrition));
    } catch {}
  }, [nutrition]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_recovery', JSON.stringify(recovery));
    } catch {}
  }, [recovery]);

  useEffect(() => {
    try {
      localStorage.setItem('obsidian_community_posts', JSON.stringify(communityPosts));
    } catch {}
  }, [communityPosts]);

  // Check PocketBase connection on mount
  useEffect(() => {
    pbClient.checkHealth().then(res => {
      setPbOnline(res.online);
      setPbStatusMessage(res.message);
      setPbQueueCount(pbClient.getQueue().length);
    });
  }, []);

  // Active Workout Stopwatch Tick
  useEffect(() => {
    let interval: number | null = null;
    if (activeSession && !activeSession.isPaused) {
      interval = window.setInterval(() => {
        setActiveSession(prev =>
          prev ? { ...prev, elapsedTimeSec: prev.elapsedTimeSec + 1 } : null
        );
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSession?.isPaused, Boolean(activeSession)]);

  // Rest Timer Tick
  useEffect(() => {
    if (isTimerRunning && restRemainingSec > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setRestRemainingSec(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            playTimerAlertSound();
            showToast('⚡ Rest period complete! Get ready for next set.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (restRemainingSec === 0) {
      setIsTimerRunning(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, restRemainingSec]);

  const convertFromKg = (kgVal: number): number => {
    if (userProfile.unit === 'kg') return Math.round(kgVal * 10) / 10;
    return Math.round(kgVal * 2.20462 * 2) / 2;
  };

  const toggleUnit = () => {
    const nextUnit: Unit = userProfile.unit === 'kg' ? 'lbs' : 'kg';
    const factor = nextUnit === 'lbs' ? 2.20462 : 1 / 2.20462;
    const roundStep = (v: number) => Math.round(v * 2) / 2;

    setUserProfile(prev => ({
      ...prev,
      unit: nextUnit,
      bodyWeight: roundStep(prev.bodyWeight * factor),
      targetWeight: roundStep(prev.targetWeight * factor)
    }));

    setActiveSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        exercises: prev.exercises.map(ex => ({
          ...ex,
          sets: ex.sets.map(s => {
            const numW = typeof s.weight === 'number' ? s.weight : parseFloat(String(s.weight)) || 0;
            const prevW = s.previousWeight ? roundStep(s.previousWeight * factor) : undefined;
            return {
              ...s,
              weight: roundStep(numW * factor),
              previousWeight: prevW
            };
          })
        }))
      };
    });

    showToast(`Units converted to ${nextUnit.toUpperCase()}`);
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleBookmark = (workoutId: string) => {
    setWorkouts(prev =>
      prev.map(w => {
        if (w.id === workoutId) {
          const next = !w.isBookmarked;
          showToast(next ? 'Saved to bookmarks' : 'Removed from bookmarks');
          return { ...w, isBookmarked: next };
        }
        return w;
      })
    );
  };

  const getWorkoutById = (id: string) => workouts.find(w => w.id === id);

  // --- Custom Exercise Creator ---
  const addCustomExercise = (input: Omit<Exercise, 'id'>): Exercise => {
    const exercise: Exercise = enrichExerciseWithGif({
      ...input,
      id: `custom-ex-${Date.now()}`,
      isCustom: true,
      createdBy: userProfile.name
    });
    setExercises(prev => {
      const next = [exercise, ...prev];
      try {
        localStorage.setItem('obsidian_exercises_v4', JSON.stringify(next));
      } catch {}
      pbClient.enqueue('exercises', 'create', {
        ...exercise,
        source: 'custom'
      });
      setPbQueueCount(pbClient.getQueue().length);
      return next;
    });
    showToast(`Created custom exercise "${exercise.name}"`);
    return exercise;
  };

  const updateCustomExercise = (id: string, updates: Partial<Exercise>) => {
    setExercises(prev => {
      const next = prev.map(ex => (ex.id === id ? { ...ex, ...updates } : ex));
      try {
        localStorage.setItem('obsidian_exercises_v4', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast('Exercise updated');
  };

  const deleteCustomExercise = (id: string) => {
    setExercises(prev => {
      const next = prev.filter(ex => ex.id !== id);
      try {
        localStorage.setItem('obsidian_exercises_v4', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast('Exercise deleted');
  };

  // Historical Best Weight / Estimated 1RM for the Exercise Directory & Smart Progression
  const getExerciseBestStats = (exerciseId: string, exerciseName?: string) => {
    const logs = workoutSummaries.flatMap(s =>
      (s.exerciseLogs || []).filter(
        log =>
          log.exerciseId === exerciseId ||
          (exerciseName && log.name.toLowerCase() === exerciseName.toLowerCase())
      )
    );
    if (logs.length === 0) return null;
    const best = logs.reduce((prev, cur) =>
      cur.estimated1RM > prev.estimated1RM ? cur : prev
    );
    return {
      bestWeight: best.bestWeight,
      bestReps: best.bestReps,
      estimated1RM: best.estimated1RM,
      volume: logs.reduce((sum, log) => sum + log.volume, 0),
      setsCompleted: logs.reduce((sum, log) => sum + log.setsCompleted, 0)
    };
  };

  // Build sets with Smart Double-Progression from previous logs + exact PDF Week prescriptions
  const buildWorkoutExerciseSets = (ex: Exercise, week: number): WorkoutExercise => {
    const presc = getPrescriptionForWeek(ex, week);
    const setCount = presc.sets || ex.defaultSets || 3;
    const { minReps, maxReps } = parseRepBounds(ex.defaultReps);

    // Check most recent logged performance for this exercise
    const latestLog = workoutSummaries
      .flatMap(s => s.exerciseLogs || [])
      .find(
        l =>
          l.exerciseId === ex.id || l.name.toLowerCase() === ex.name.toLowerCase()
      );

    const increment = userProfile.unit === 'kg' ? 2.5 : 5;
    let suggestedWeight: number;
    let suggestedReps: number;
    let prevWeight: number | undefined;
    let prevReps: number | undefined;
    let progressionBanner: string;

    if (latestLog && latestLog.bestWeight > 0) {
      prevWeight = latestLog.bestWeight;
      prevReps = latestLog.bestReps;
      if (latestLog.bestReps >= maxReps) {
        // Double Progression: Reached top of rep range -> increase weight by +2.5kg / +5lbs and reset to minReps
        suggestedWeight = Math.round((latestLog.bestWeight + increment) * 2) / 2;
        suggestedReps = minReps;
        progressionBanner = `🔥 Hit ${latestLog.bestReps} reps last session! Auto-progressed load +${increment}${userProfile.unit} → ${suggestedWeight}${userProfile.unit} × ${minReps}-${maxReps}`;
      } else {
        // Double Progression: Keep weight and target +1 rep
        suggestedWeight = latestLog.bestWeight;
        suggestedReps = Math.min(maxReps, latestLog.bestReps + 1);
        progressionBanner = `📈 Double Progression: Match ${suggestedWeight}${userProfile.unit} and push for ${suggestedReps} reps (+1 rep vs last session)`;
      }
    } else {
      const baseKg = estimateDefaultLoadKg(ex);
      suggestedWeight =
        baseKg === 0
          ? 0
          : userProfile.unit === 'kg'
          ? baseKg
          : Math.round((baseKg * 2.20462) / 5) * 5;
      suggestedReps = minReps;
      progressionBanner =
        week === 1 || week === 6
          ? `🎯 Week ${week} Intro Acclimation: Leave 1–3 reps in the tank (RPE ${presc.lastRpe}) to establish baseline load`
          : `⚡ Week ${week} Overload Target: ${setCount} working sets × ${ex.defaultReps} reps (Final set RPE ${presc.lastRpe}${
              presc.tech && presc.tech !== 'N/A' ? ` • ${presc.tech}` : ''
            })`;
    }

    return {
      ...enrichExerciseWithGif(ex),
      originalExercise: ex,
      progressionBanner,
      sets: Array.from({ length: setCount }, (_, idx) => {
        const isLast = idx === setCount - 1;
        return {
          id: `${ex.id}-set-${idx + 1}`,
          setNumber: idx + 1,
          targetReps: ex.defaultReps,
          targetRpe: isLast ? presc.lastRpe : presc.earlyRpe,
          intensityTech:
            isLast && presc.tech && presc.tech !== 'N/A' ? presc.tech : undefined,
          weight: suggestedWeight,
          reps: suggestedReps,
          completed: false,
          isLastSet: isLast,
          previousWeight: prevWeight,
          previousReps: prevReps,
          progressionHint: progressionBanner
        };
      })
    };
  };

  // --- Custom Workout / Routine Builder ---
  const createCustomWorkout = (input: CreateCustomWorkoutInput) => {
    const { shareWithClub, ...rest } = input;
    const workout: Workout = enrichWorkoutWithGifs({
      ...rest,
      id: `custom-w-${Date.now()}`,
      isCustom: true,
      isPublic: Boolean(shareWithClub),
      isBookmarked: true,
      authorName: userProfile.name,
      image: rest.image || DEFAULT_WORKOUT_COVER
    });
    setWorkouts(prev => [workout, ...prev]);
    if (shareWithClub) {
      pbClient.publishRoutine(workout, userProfile).then(() => {
        setPbQueueCount(pbClient.getQueue().length);
      });
      const newPost: CommunityPost = {
        id: `post-${workout.id}`,
        authorId: userProfile.id || 'self',
        authorName: userProfile.name,
        authorHandle: userProfile.handle || '@alex_obsidian',
        authorAvatar: userProfile.avatar,
        authorBadge: `${userProfile.experience} • ${workout.category}`,
        workoutTitle: workout.title,
        workoutId: workout.id,
        routineClone: workout,
        createdAt: 'Just now',
        durationSec: workout.durationMin * 60,
        totalVolumeKg: 0,
        totalSets: workout.exercises.reduce((sum, ex) => sum + ex.defaultSets, 0),
        perceivedRpe: 0,
        prBadges: [],
        targetMuscles: workout.targetMuscles,
        notes: workout.subtitle
          ? `Created a new routine: ${workout.subtitle}`
          : 'Created a new routine',
        kudosCount: 0,
        hasKudoed: false,
        comments: []
      };
      setCommunityPosts(prev => [newPost, ...prev]);
      showToast('Routine saved to Custom Workout Library & shared with Club! 🤝');
    } else {
      showToast('Custom workout saved to your Custom Workout Library!');
    }
  };

  const updateCustomWorkout = (id: string, updates: Partial<Workout>) => {
    setWorkouts(prev => prev.map(w => (w.id === id ? { ...w, ...updates } : w)));
    showToast('Routine updated');
  };

  const deleteCustomWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id));
    setScheduleDays(prev =>
      prev.map(d =>
        d.workout?.id === id ? { ...d, workout: undefined, isRestDay: true } : d
      )
    );
    showToast('Routine deleted');
  };

  const duplicateWorkout = (workout: Workout) => {
    const copy: Workout = {
      ...workout,
      id: `copy-${workout.id}-${Date.now()}`,
      isCustom: true,
      isPublic: false,
      isBookmarked: true,
      title: `Custom: ${workout.title}`,
      subtitle: `Customized from ${workout.title}`,
      authorName: userProfile.name
    };
    setWorkouts(prev => [copy, ...prev]);
    showToast(`Added "${copy.title}" to your Custom Workout Library`);
  };

  // --- Freestyle / Empty Workout ---
  const startEmptyWorkout = (customTitle?: string) => {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const session: ActiveWorkoutSession = {
      workoutId: `freestyle-${Date.now()}`,
      workoutTitle: customTitle || `Freestyle Session • ${today}`,
      programWeek,
      startTime: Date.now(),
      elapsedTimeSec: 0,
      isPaused: false,
      exercises: [],
      activeExerciseIndex: 0
    };
    setActiveSession(session);
    showToast('Freestyle session started — add your first exercise!');
  };

  const addExerciseToActiveSession = (exercise: Exercise) => {
    setActiveSession(prev => {
      if (!prev) return null;
      const newEx = buildWorkoutExerciseSets(exercise, programWeek);
      return {
        ...prev,
        exercises: [...prev.exercises, newEx],
        activeExerciseIndex: prev.exercises.length
      };
    });
    showToast(`${exercise.name} added to session`);
  };

  const startWorkout = (workout: Workout) => {
    const workoutExercises = workout.exercises.map(ex =>
      buildWorkoutExerciseSets(ex, programWeek)
    );

    const session: ActiveWorkoutSession = {
      workoutId: workout.id,
      workoutTitle: workout.title,
      programWeek,
      programId: activeProgram.programId,
      dayCode: workout.dayCode,
      startTime: Date.now(),
      elapsedTimeSec: 0,
      isPaused: false,
      exercises: workoutExercises,
      activeExerciseIndex: 0
    };

    setActiveSession(session);
    showToast(`Started: ${workout.title} (Week ${programWeek})`);
  };

  const pauseWorkout = () => {
    setActiveSession(prev => (prev ? { ...prev, isPaused: true } : null));
    showToast('Workout paused');
  };

  const resumeWorkout = () => {
    setActiveSession(prev => (prev ? { ...prev, isPaused: false } : null));
    showToast('Workout resumed');
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: 'weight' | 'reps',
    value: number | string
  ) => {
    setActiveSession(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const ex = { ...updatedExercises[exerciseIndex] };
      const sets = [...ex.sets];
      sets[setIndex] = { ...sets[setIndex], [field]: value };
      ex.sets = sets;
      updatedExercises[exerciseIndex] = ex;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const toggleSetComplete = (exerciseIndex: number, setIndex: number) => {
    if (!activeSession) return;
    const ex = activeSession.exercises[exerciseIndex];
    const targetSet = ex.sets[setIndex];
    const willBeCompleted = !targetSet.completed;

    setActiveSession(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const currEx = { ...updatedExercises[exerciseIndex] };
      const currSets = [...currEx.sets];
      currSets[setIndex] = { ...currSets[setIndex], completed: willBeCompleted };
      currEx.sets = currSets;
      updatedExercises[exerciseIndex] = currEx;
      return { ...prev, exercises: updatedExercises };
    });

    if (willBeCompleted) {
      startRestTimer(ex.defaultRestSec, `${ex.name} • Set ${setIndex + 1} Rest`);
    }
  };

  const addSet = (exerciseIndex: number) => {
    setActiveSession(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const ex = { ...updatedExercises[exerciseIndex] };
      const newSetNumber = ex.sets.length + 1;
      const lastSet = ex.sets[ex.sets.length - 1];
      const updatedPrior = ex.sets.map(s => ({
        ...s,
        isLastSet: false,
        intensityTech: undefined,
        targetRpe: s.targetRpe === '10' ? '~8-9' : s.targetRpe
      }));
      const newSet = {
        id: `${ex.id}-set-${newSetNumber}`,
        setNumber: newSetNumber,
        targetReps: ex.defaultReps,
        targetRpe: lastSet?.targetRpe || '10',
        intensityTech: lastSet?.intensityTech || 'Failure',
        weight: lastSet ? lastSet.weight : 60,
        reps: lastSet ? lastSet.reps : 8,
        completed: false,
        isLastSet: true,
        previousWeight: lastSet?.previousWeight,
        previousReps: lastSet?.previousReps
      };
      ex.sets = [...updatedPrior, newSet];
      updatedExercises[exerciseIndex] = ex;
      return { ...prev, exercises: updatedExercises };
    });
    showToast('Added working set');
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    setActiveSession(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const ex = { ...updatedExercises[exerciseIndex] };
      if (ex.sets.length <= 1) return prev;
      const filtered = ex.sets.filter((_, idx) => idx !== setIndex);
      const presc = getPrescriptionForWeek(ex, activeSession?.programWeek || programWeek);
      const sets = filtered.map((s, idx) => {
        const isLast = idx === filtered.length - 1;
        return {
          ...s,
          setNumber: idx + 1,
          isLastSet: isLast,
          targetRpe: isLast ? presc.lastRpe : presc.earlyRpe,
          intensityTech:
            isLast && presc.tech && presc.tech !== 'N/A' ? presc.tech : undefined
        };
      });
      ex.sets = sets;
      updatedExercises[exerciseIndex] = ex;
      return { ...prev, exercises: updatedExercises };
    });
  };

  // Replace exercise with Alternate Exercise (PDF Option 1 / Option 2 or Library) preserving prescriptions & loading history
  const replaceExercise = (exerciseIndex: number, newExercise: Exercise) => {
    setActiveSession(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const oldEx = updatedExercises[exerciseIndex];
      const rootOriginal = oldEx.originalExercise || oldEx;

      // Preserve the PDF slot's prescriptions and substitutions so the user can always switch between Original, Option 1, and Option 2!
      const mergedCandidate: Exercise = enrichExerciseWithGif({
        ...newExercise,
        defaultSets: rootOriginal.defaultSets,
        defaultReps: rootOriginal.defaultReps,
        defaultRestSec: rootOriginal.defaultRestSec,
        warmupSets: rootOriginal.warmupSets,
        prescriptions: rootOriginal.prescriptions,
        substitutions: rootOriginal.substitutions
      });

      const rebuilt = buildWorkoutExerciseSets(
        mergedCandidate,
        prev.programWeek || programWeek
      );

      // Preserve completion status of already-completed sets if counts match
      const mergedSets = rebuilt.sets.map((s, idx) => {
        const oldSet = oldEx.sets[idx];
        return oldSet && oldSet.completed
          ? { ...s, weight: oldSet.weight, reps: oldSet.reps, completed: true }
          : s;
      });

      updatedExercises[exerciseIndex] = {
        ...rebuilt,
        sets: mergedSets,
        originalExercise: rootOriginal,
        swappedFromName:
          newExercise.name.toLowerCase() === rootOriginal.name.toLowerCase()
            ? undefined
            : rootOriginal.name
      };
      return { ...prev, exercises: updatedExercises };
    });
    showToast(`Swapped to: ${newExercise.name}`);
  };

  // Real Epley 1RM, PR calculation, and Automatic Program Progression Engine
  const finishWorkout = (perceivedRpe: number = 8.5, notes?: string) => {
    if (!activeSession) return;

    let totalVolume = 0;
    let completedSetsCount = 0;
    const exerciseLogs: LoggedExerciseSummary[] = [];
    const newPrs: string[] = [];
    const targetMusclesSet = new Set<string>();

    const historicalBest1RM = new Map<string, number>();
    workoutSummaries.forEach(s => {
      s.exerciseLogs?.forEach(log => {
        const prevMax = historicalBest1RM.get(log.name) || 0;
        if (log.estimated1RM > prevMax) historicalBest1RM.set(log.name, log.estimated1RM);
      });
    });

    activeSession.exercises.forEach(ex => {
      targetMusclesSet.add(ex.targetMuscle);
      let exBestW = 0;
      let exBestR = 0;
      let exBest1RM = 0;
      let exVol = 0;
      let exCompletedSets = 0;

      const anyCompleted = activeSession.exercises.some(e =>
        e.sets.some(s => s.completed)
      );

      ex.sets.forEach(s => {
        if (s.completed || !anyCompleted) {
          completedSetsCount++;
          exCompletedSets++;
          const w =
            typeof s.weight === 'number' ? s.weight : parseFloat(String(s.weight)) || 0;
          const r =
            typeof s.reps === 'number' ? s.reps : parseFloat(String(s.reps)) || 0;
          const vol = w * r;
          totalVolume += vol;
          exVol += vol;
          const epley1RM = Math.round(w * (1 + r / 30) * 10) / 10;
          if (epley1RM > exBest1RM) {
            exBest1RM = epley1RM;
            exBestW = w;
            exBestR = r;
          }
        }
      });

      if (exCompletedSets > 0) {
        exerciseLogs.push({
          exerciseId: ex.id,
          name: ex.name,
          targetMuscle: ex.targetMuscle,
          bestWeight: exBestW,
          bestReps: exBestR,
          estimated1RM: exBest1RM,
          volume: Math.round(exVol),
          setsCompleted: exCompletedSets
        });

        const prevBest = historicalBest1RM.get(ex.name) || 0;
        if (exBest1RM > prevBest && exBestW > 0) {
          newPrs.push(
            `${ex.name}: ${exBestW} ${userProfile.unit} × ${exBestR} (Est. 1RM ${exBest1RM} ${userProfile.unit})`
          );
        }
      }
    });

    if (newPrs.length === 0 && exerciseLogs.length > 0) {
      const top = exerciseLogs[0];
      newPrs.push(
        `${top.name}: ${top.bestWeight} ${userProfile.unit} × ${top.bestReps} (Est. 1RM ${top.estimated1RM} ${userProfile.unit})`
      );
    }

    const volumeInKg =
      userProfile.unit === 'kg'
        ? Math.round(totalVolume)
        : Math.round(totalVolume / 2.20462);

    // Determine Program Progression advancement
    const matchingWorkout = workouts.find(w => w.id === activeSession.workoutId);
    const dayCode = activeSession.dayCode || matchingWorkout?.dayCode;
    const sessionWeek = activeSession.programWeek || programWeek;
    let advancedToNextWeek = false;
    let nextWeekNumber = sessionWeek;

    if (dayCode && /^D[1-5]$/i.test(dayCode)) {
      const slotNum = parseInt(dayCode.replace(/\D/g, ''), 10) || 1;
      const key = `w${sessionWeek}-d${slotNum}`;
      const updatedKeys = Array.from(
        new Set([...activeProgram.completedSessionKeys, key])
      );

      // Check if all 5 days of sessionWeek are now completed
      const all5Done = [1, 2, 3, 4, 5].every(s =>
        updatedKeys.includes(`w${sessionWeek}-d${s}`)
      );

      if (all5Done && sessionWeek < 12) {
        advancedToNextWeek = true;
        nextWeekNumber = sessionWeek + 1;
        setProgramWeekState(nextWeekNumber);
        try {
          localStorage.setItem('obsidian_program_week', String(nextWeekNumber));
        } catch {}
        setActiveProgram(prev => ({
          ...prev,
          isStarted: true,
          currentWeek: nextWeekNumber,
          currentDaySlot: 1,
          completedSessionKeys: updatedKeys
        }));
        syncScheduleToProgramWeek(
          activeProgram.programId,
          nextWeekNumber,
          updatedKeys
        );
      } else {
        // Find next uncompleted slot in current week
        let nextSlot = Math.min(5, slotNum + 1);
        for (let s = 1; s <= 5; s++) {
          if (!updatedKeys.includes(`w${sessionWeek}-d${s}`)) {
            nextSlot = s;
            break;
          }
        }
        setActiveProgram(prev => ({
          ...prev,
          isStarted: true,
          currentWeek: sessionWeek,
          currentDaySlot: nextSlot,
          completedSessionKeys: updatedKeys
        }));
        syncScheduleToProgramWeek(activeProgram.programId, sessionWeek, updatedKeys);
      }
    } else {
      // Mark matching scheduled day complete
      setScheduleDays(prev =>
        prev.map(d =>
          d.workout?.id === activeSession.workoutId ? { ...d, isCompleted: true } : d
        )
      );
    }

    const summary: WorkoutSummary = {
      id: `summary-${Date.now()}`,
      workoutId: activeSession.workoutId,
      workoutTitle: activeSession.workoutTitle,
      programWeek: sessionWeek,
      dayCode,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      isoDate: new Date().toISOString(),
      durationSec: Math.max(activeSession.elapsedTimeSec, 1200),
      totalVolume: volumeInKg,
      totalSets: completedSetsCount,
      exercisesCompleted: exerciseLogs.length,
      personalRecords: newPrs.slice(0, 3),
      perceivedRpe,
      notes:
        notes ||
        (advancedToNextWeek
          ? `Completed all 5 sessions of Week ${sessionWeek}! Unlocked Week ${nextWeekNumber}.`
          : `Completed Week ${sessionWeek} ${dayCode || ''} hypertrophy session with controlled eccentrics.`),
      targetMuscles: Array.from(targetMusclesSet),
      exerciseLogs,
      advancedToNextWeek
    };

    setWorkoutSummaries(prev => [summary, ...prev]);
    setLatestSummary(summary);
    setActiveSession(null);
    stopRestTimer();

    setUserProfile(prev => ({
      ...prev,
      totalWorkoutsCompleted: prev.totalWorkoutsCompleted + 1,
      streakDays: prev.streakDays + 1,
      currentProgramWeek: nextWeekNumber
    }));

    const newPost: CommunityPost = {
      id: `post-${summary.id}`,
      authorId: userProfile.id || 'self',
      authorName: userProfile.name,
      authorHandle: userProfile.handle || '@alex_obsidian',
      authorAvatar: userProfile.avatar,
      authorBadge: `${userProfile.streakDays + 1}d Streak • Week ${sessionWeek}`,
      workoutTitle: summary.workoutTitle,
      workoutId: summary.workoutId,
      routineClone: matchingWorkout,
      createdAt: 'Just now',
      durationSec: summary.durationSec,
      totalVolumeKg: summary.totalVolume,
      totalSets: summary.totalSets,
      perceivedRpe: summary.perceivedRpe,
      prBadges: summary.personalRecords,
      targetMuscles: summary.targetMuscles || ['Full Body'],
      notes: summary.notes || '',
      kudosCount: 1,
      hasKudoed: true,
      comments: []
    };
    setCommunityPosts(prev => [newPost, ...prev]);

    pbClient.syncWorkoutSession(summary, userProfile).then(synced => {
      setPbOnline(synced);
      setPbQueueCount(pbClient.getQueue().length);
    });

    showToast(
      advancedToNextWeek
        ? `🏆 Week ${sessionWeek} Complete! Auto-advanced to Week ${nextWeekNumber}!`
        : '🏆 Workout Finished! Next program day queued & overload targets updated.'
    );
  };

  const updateSummary = (
    summaryId: string,
    updates: { perceivedRpe: number; notes: string }
  ) => {
    setWorkoutSummaries(prev =>
      prev.map(s => (s.id === summaryId ? { ...s, ...updates } : s))
    );
    setCommunityPosts(prev =>
      prev.map(p =>
        p.id === `post-${summaryId}`
          ? { ...p, perceivedRpe: updates.perceivedRpe, notes: updates.notes }
          : p
      )
    );
    setLatestSummary(null);
    showToast('Workout saved to logbook & synced!');
  };

  const cancelWorkout = () => {
    setActiveSession(null);
    stopRestTimer();
    showToast('Workout cancelled');
  };

  const closeSummaryModal = () => {
    setLatestSummary(null);
  };

  const startRestTimer = (seconds: number, label?: string) => {
    setRestTotalSec(seconds);
    setRestRemainingSec(seconds);
    setIsTimerRunning(true);
    if (label) setTimerLabel(label);
  };

  const stopRestTimer = () => {
    setIsTimerRunning(false);
    setRestRemainingSec(0);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const adjustRestTimer = (deltaSeconds: number) => {
    setRestRemainingSec(prev => {
      const next = Math.max(0, prev + deltaSeconds);
      if (next > 0) setIsTimerRunning(true);
      return next;
    });
  };

  const toggleDayComplete = (id: string) => {
    setScheduleDays(prev =>
      prev.map(d => (d.id === id ? { ...d, isCompleted: !d.isCompleted } : d))
    );
  };

  const assignWorkoutToDay = (dayId: string, workoutId: string) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout) return;
    setScheduleDays(prev =>
      prev.map(d => (d.id === dayId ? { ...d, workout, isRestDay: false } : d))
    );
    showToast(`Assigned ${workout.title}`);
  };

  const toggleRestDay = (dayId: string) => {
    setScheduleDays(prev =>
      prev.map(d =>
        d.id === dayId ? { ...d, isRestDay: !d.isRestDay, workout: undefined } : d
      )
    );
  };

  const applySplitTemplate = (
    templateName: 'Foundation5' | 'Ramping5' | 'PPL' | 'UpperLower' | 'FullBody'
  ) => {
    const findW = (id: string, fallbackIdx: number) =>
      workouts.find(w => w.id === id) || workouts[fallbackIdx] || workouts[0];

    const assignments: Record<string, Workout | undefined> = {};

    if (templateName === 'Foundation5') {
      assignments['plan-mon'] = findW('foundation-d1', 0);
      assignments['plan-tue'] = findW('foundation-d2', 1);
      assignments['plan-thu'] = findW('foundation-d3', 2);
      assignments['plan-fri'] = findW('foundation-d4', 3);
      assignments['plan-sat'] = findW('foundation-d5', 4);
      if (programWeek > 5) setProgramWeekState(1);
      showToast('Applied 5-Day Foundation Block (Weeks 1–5)');
    } else if (templateName === 'Ramping5') {
      assignments['plan-mon'] = findW('ramping-d1', 5);
      assignments['plan-tue'] = findW('ramping-d2', 6);
      assignments['plan-thu'] = findW('ramping-d3', 7);
      assignments['plan-fri'] = findW('ramping-d4', 8);
      assignments['plan-sat'] = findW('ramping-d5', 9);
      if (programWeek < 6) setProgramWeekState(6);
      showToast('Applied 5-Day Ramping Block (Weeks 6–12)');
    } else if (templateName === 'PPL') {
      assignments['plan-mon'] = findW('workout-push-hypertrophy', 10);
      assignments['plan-tue'] = findW('workout-pull-density', 11);
      assignments['plan-thu'] = findW('workout-legs-quad-focus', 12);
      assignments['plan-fri'] = findW('workout-push-hypertrophy', 10);
      showToast('Applied Push / Pull / Legs Split Template');
    } else if (templateName === 'UpperLower') {
      assignments['plan-mon'] = findW('foundation-d1', 0);
      assignments['plan-tue'] = findW('foundation-d2', 1);
      assignments['plan-thu'] = findW('ramping-d1', 5);
      assignments['plan-fri'] = findW('ramping-d2', 6);
      showToast('Applied 4-Day Upper / Lower Split Template');
    } else if (templateName === 'FullBody') {
      const fb = findW('workout-full-body-athletic', 13);
      assignments['plan-mon'] = fb;
      assignments['plan-wed'] = fb;
      assignments['plan-fri'] = fb;
      showToast('Applied 3-Day Full Body Matrix (non-template days set to Rest)');
    }

    setScheduleDays(prev =>
      prev.map(day => {
        const assigned = assignments[day.id];
        if (assigned) {
          return {
            ...day,
            workout: assigned,
            isRestDay: false,
            time: day.time === 'Rest & Mobility' ? '06:00 PM' : day.time
          };
        }
        return {
          ...day,
          workout: undefined,
          isRestDay: true,
          time: 'Rest & Mobility'
        };
      })
    );
  };

  // --- Custom Program Builder ---
  const saveCustomProgram = (input: Omit<CustomProgram, 'id' | 'createdAt'>) => {
    const program: CustomProgram = {
      ...input,
      id: `custom-prog-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setCustomPrograms(prev => {
      const next = [...prev, program];
      try {
        localStorage.setItem('obsidian_custom_programs', JSON.stringify(next));
      } catch {}
      return next;
    });
    setScheduleDays(prev =>
      prev.map(day => {
        const workoutId =
          program.scheduleMap[day.id as keyof CustomProgram['scheduleMap']];
        const workout = workoutId ? workouts.find(w => w.id === workoutId) : undefined;
        return workout
          ? {
              ...day,
              workout,
              isRestDay: false,
              time: day.time === 'Rest & Mobility' ? '06:00 PM' : day.time
            }
          : {
              ...day,
              workout: undefined,
              isRestDay: true,
              time: 'Rest & Mobility'
            };
      })
    );
    setActiveProgram(prev => ({
      ...prev,
      programId: program.id,
      isStarted: true,
      currentWeek: 1,
      currentDaySlot: 1
    }));
    showToast(`Saved & activated custom program "${program.title}"`);
    return program.id;
  };

  const deleteCustomProgram = (id: string) => {
    setCustomPrograms(prev => {
      const next = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem('obsidian_custom_programs', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast('Custom program deleted');
  };

  const applyCustomProgram = (programId: string) => {
    const program = customPrograms.find(p => p.id === programId);
    if (!program) return;
    setScheduleDays(prev =>
      prev.map(day => {
        const workoutId =
          program.scheduleMap[day.id as keyof CustomProgram['scheduleMap']];
        const workout = workoutId ? workouts.find(w => w.id === workoutId) : undefined;
        return workout
          ? {
              ...day,
              workout,
              isRestDay: false,
              time: day.time === 'Rest & Mobility' ? '06:00 PM' : day.time
            }
          : {
              ...day,
              workout: undefined,
              isRestDay: true,
              time: 'Rest & Mobility'
            };
      })
    );
    setActiveProgram(prev => ({
      ...prev,
      programId: program.id,
      isStarted: true
    }));
    showToast(`Applied custom program "${program.title}"`);
  };

  const getCustomProgramById = (id: string) => customPrograms.find(p => p.id === id);

  // --- Nutrition & Recovery ---
  const logWater = (amountMl: number) => {
    setNutrition(prev => {
      const nextWater = Math.max(0, Math.min(6000, prev.waterMl + amountMl));
      return { ...prev, waterMl: nextWater };
    });
    showToast(amountMl > 0 ? `+${amountMl}ml hydration logged 💧` : `${amountMl}ml adjusted`);
  };

  const addMeal = (name: string, calories: number, protein: number) => {
    const newMeal = {
      id: `meal-${Date.now()}`,
      name,
      calories,
      protein,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNutrition(prev => ({
      ...prev,
      consumedCalories: prev.consumedCalories + calories,
      consumedProtein: prev.consumedProtein + protein,
      meals: [newMeal, ...prev.meals]
    }));
    showToast(`Logged ${name} (+${protein}g protein)`);
  };

  const updateRecovery = (updates: Partial<RecoveryLog>) => {
    setRecovery(prev => {
      const next = { ...prev, ...updates };
      const sleepFactor = Math.min(1, next.sleepHours / (next.sleepGoal || 8)) * 45;
      const energyFactor = (next.energyRating / 10) * 35;
      const sorenessPenalty = ((10 - next.sorenessRating) / 10) * 20;
      const computedScore = Math.round(sleepFactor + energyFactor + sorenessPenalty);
      return {
        ...next,
        recoveryScore: Math.max(15, Math.min(100, computedScore))
      };
    });
    showToast('Recovery metrics updated');
  };

  // --- Community & PocketBase ---
  const toggleKudos = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const nextKudo = !post.hasKudoed;
          return {
            ...post,
            hasKudoed: nextKudo,
            kudosCount: nextKudo ? post.kudosCount + 1 : Math.max(0, post.kudosCount - 1)
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const comment = {
      id: `c-${Date.now()}`,
      authorName: userProfile.name,
      authorAvatar: userProfile.avatar,
      text: text.trim(),
      createdAt: 'Just now'
    };
    setCommunityPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p))
    );
    showToast('Comment posted to club feed');
  };

  const cloneRoutineFromPost = (post: CommunityPost) => {
    const baseWorkout =
      post.routineClone ||
      workouts.find(w => w.id === post.workoutId) ||
      workouts[0];
    const clonedId = `cloned-${Date.now()}`;
    const clonedWorkout: Workout = {
      ...baseWorkout,
      id: clonedId,
      title: `${post.workoutTitle} (${post.authorName.split(' ')[0]}'s Split)`,
      subtitle: `Cloned from ${post.authorHandle} • ${baseWorkout.exercises.length} Exercises`,
      isFeatured: false,
      isBookmarked: true,
      isCustom: true,
      authorName: post.authorName
    };
    setWorkouts(prev => [clonedWorkout, ...prev]);
    setSelectedWorkoutDetail(clonedWorkout);
    showToast(`Cloned "${clonedWorkout.title}" to your Custom Workout Library!`);
  };

  const triggerCloudSync = async () => {
    setPbStatusMessage('Syncing with PocketBase...');
    const health = await pbClient.checkHealth();
    setPbOnline(health.online);
    if (health.online) {
      const res = await pbClient.flushQueue();
      setPbQueueCount(res.remaining);
      setPbStatusMessage(`Synced (${res.synced} records uploaded)`);
      showToast(`☁️ PocketBase synced! ${res.synced} queued items flushed.`);
    } else {
      setPbQueueCount(pbClient.getQueue().length);
      setPbStatusMessage(health.message);
      showToast('PocketBase server unreachable — saved in local offline queue.');
    }
  };

  const importBackupData = (rawJson: string): boolean => {
    try {
      const parsed = JSON.parse(rawJson);
      if (parsed.userProfile) setUserProfile(parsed.userProfile);
      if (Array.isArray(parsed.workouts)) setWorkouts(parsed.workouts);
      if (Array.isArray(parsed.workoutSummaries)) setWorkoutSummaries(parsed.workoutSummaries);
      if (Array.isArray(parsed.scheduleDays)) setScheduleDays(parsed.scheduleDays);
      if (parsed.activeProgram) setActiveProgram(parsed.activeProgram);
      showToast('Backup restored successfully!');
      return true;
    } catch {
      showToast('Invalid JSON backup file');
      return false;
    }
  };

  return (
    <FitnessContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedWorkoutDetail,
        setSelectedWorkoutDetail,
        isGuidebookOpen,
        guidebookTab,
        openGuidebook,
        closeGuidebook,
        programWeek,
        setProgramWeek,
        programPlans,
        activeProgram,
        startProgramPlan,
        advanceProgramDayOrWeek,
        resetProgramProgress,
        getNextProgramWorkout,
        swapWorkoutExerciseInPlan,
        userProfile,
        updateUserProfile,
        toggleUnit,
        convertFromKg,
        workouts,
        toggleBookmark,
        getWorkoutById,
        activeSession,
        setActiveSession,
        startWorkout,
        pauseWorkout,
        resumeWorkout,
        updateSet,
        toggleSetComplete,
        addSet,
        removeSet,
        replaceExercise,
        finishWorkout,
        updateSummary,
        cancelWorkout,
        restRemainingSec,
        restTotalSec,
        isTimerRunning,
        timerLabel,
        startRestTimer,
        stopRestTimer,
        adjustRestTimer,
        workoutSummaries,
        latestSummary,
        closeSummaryModal,
        scheduleDays,
        toggleDayComplete,
        assignWorkoutToDay,
        toggleRestDay,
        applySplitTemplate,
        exercises,
        setExercises,
        addCustomExercise,
        updateCustomExercise,
        deleteCustomExercise,
        getExerciseBestStats,
        createCustomWorkout,
        updateCustomWorkout,
        deleteCustomWorkout,
        duplicateWorkout,
        startEmptyWorkout,
        addExerciseToActiveSession,
        customPrograms,
        saveCustomProgram,
        deleteCustomProgram,
        applyCustomProgram,
        getCustomProgramById,
        nutrition,
        logWater,
        addMeal,
        recovery,
        updateRecovery,
        communityPosts,
        toggleKudos,
        addComment,
        cloneRoutineFromPost,
        pbOnline,
        pbQueueCount,
        pbStatusMessage,
        triggerCloudSync,
        importBackupData,
        toastMessage,
        showToast
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = (): FitnessContextType => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
