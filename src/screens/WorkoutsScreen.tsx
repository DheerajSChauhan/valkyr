import React, { useState, useMemo, useEffect } from 'react';
import {
  SlidersHorizontal,
  ChevronLeft,
  Bookmark,
  Play,
  Check,
  CheckCircle2,
  X,
  Clock,
  Dumbbell,
  Search,
  ArrowRight,
  Layers,
  Repeat,
  Plus,
  BookOpen,
  Sparkles,
  ChevronRight,
  Zap,
  Flame,
  Grid3X3,
  LayoutGrid,
  ListFilter
} from 'lucide-react';
import { useFitness } from '../context/FitnessContext';
import { GlassCard } from '../components/common/GlassCard';
import { HevyRoutineBuilderModal } from '../components/workout/HevyRoutineBuilderModal';
import { CustomProgramModal } from '../components/planner/CustomProgramModal';
import { CustomExerciseModal } from '../components/workout/CustomExerciseModal';
import { ExerciseDirectoryView } from '../components/workout/ExerciseDirectoryView';
import { Equipment, CatalogRoutinePlan } from '../types';
import rawRoutines from '../data/routinesCatalog.json';
import { FamousSplitsCarousel } from '../components/workout/FamousSplitsCarousel';
import { RoutinePreviewModal } from '../components/workout/RoutinePreviewModal';
import { RoutineVaultModal } from '../components/workout/RoutineVaultModal';
import { enrollUserProgram } from '../lib/pocketbase';

const catalogRoutines: CatalogRoutinePlan[] = rawRoutines as unknown as CatalogRoutinePlan[];

// --- CURATED ATHLETIC IMAGERY (High-Performance Athletics) ---
const IMAGES = {
  hiit: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
  strength: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
  yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  pilates: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1200&q=80",
  mobility: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  ppl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  upper_lower: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
  hypertrophy: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  home_dumbbell: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80",
  thumbnails: [
    "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80"
  ]
};

// --- DATA STRUCTURES ---
export interface AthleticExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  substitution?: string;
  youtubeId?: string;
}

export interface AthleticWorkout {
  id: string;
  title: string;
  category: 'ppl' | 'upper_lower' | 'strength' | 'hypertrophy' | 'home_dumbbell' | 'gym' | 'hiit' | 'yoga' | 'pilates' | 'mobility';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: 'None' | 'Basic Equipment' | 'Full Equipment';
  focus: 'Strength' | 'Endurance' | 'Mobility' | 'Power' | 'Hypertrophy';
  durationMin: number;
  thumbnail: string;
  description: string;
  exercises: AthleticExercise[];
  isCustom?: boolean;
}

// Updated Categories prioritizing Strength & Hypertrophy splits
const CATEGORIES = [
  { id: 'ppl', name: 'Push Pull Legs (PPL)', image: IMAGES.ppl, count: 142, subtitle: 'Chest/Shoulders/Triceps, Back/Biceps & Quad/Hamstring split' },
  { id: 'upper_lower', name: 'Upper / Lower', image: IMAGES.upper_lower, count: 118, subtitle: '4-day power and hypertrophy balanced overload system' },
  { id: 'strength', name: 'Strength', image: IMAGES.strength, count: 96, subtitle: 'Progressive overload compound barbell & heavy dumbbell anchors' },
  { id: 'hypertrophy', name: 'Hypertrophy', image: IMAGES.hypertrophy, count: 154, subtitle: 'Lengthened-position biomechanical muscle growth protocols' },
  { id: 'home_dumbbell', name: 'Home & Dumbbell', image: IMAGES.home_dumbbell, count: 68, subtitle: 'Minimalist dumbbell, bodyweight & resistance band hypertrophy' },
  { id: 'gym', name: 'For The Gym', image: IMAGES.gym, count: 189, heroDesc: "Strength starts here: explore gym-ready barbell, cable and dumbbell workouts.", subtitle: 'Barbell, dumbbell & machine overload routines' }
];


const INITIAL_WORKOUTS: AthleticWorkout[] = [
  {
    id: 'w-1',
    title: '50-Min Lower Body Strength & Power',
    category: 'gym',
    level: 'Advanced',
    equipment: 'Full Equipment',
    focus: 'Strength',
    durationMin: 50,
    thumbnail: IMAGES.thumbnails[0],
    description: 'Heavy barbell squatting focused on posterior chain development, knee stability, and rate of force development.',
    exercises: [
      { name: 'Barbell Back Squat', sets: 4, reps: '6-8 reps', rest: '180s', substitution: 'Safety Bar Squat or Leg Press', youtubeId: 'bEv6CCg2BC8' },
      { name: 'Romanian Deadlift (RDL)', sets: 3, reps: '8-10 reps', rest: '120s', substitution: 'Dumbbell RDL or 45° Hyperextension', youtubeId: '2SHsk9AzdjA' },
      { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12 reps/leg', rest: '90s', substitution: 'Walking Lunges' },
      { name: 'Seated Leg Curl', sets: 3, reps: '12-15 reps (Last set failure)', rest: '60s', substitution: 'Lying Hamstring Curl' },
      { name: 'Standing Calf Raise', sets: 4, reps: '10-12 reps (2s stretch)', rest: '60s' }
    ]
  },
  {
    id: 'w-2',
    title: 'Total Body Conditioning 1',
    category: 'gym',
    level: 'Intermediate',
    equipment: 'Basic Equipment',
    focus: 'Endurance',
    durationMin: 45,
    thumbnail: IMAGES.thumbnails[1],
    description: 'High cadence circuit targeting full body aerobic capacity and systemic metabolic endurance.',
    exercises: [
      { name: 'Kettlebell Swings', sets: 4, reps: '20 reps', rest: '45s' },
      { name: 'Push-Up to Renegade Row', sets: 4, reps: '12 reps', rest: '60s' },
      { name: 'Box Jump-Overs', sets: 3, reps: '15 reps', rest: '45s' },
      { name: 'Assault Bike Sprint', sets: 5, reps: '30s max effort', rest: '60s' }
    ]
  },
  {
    id: 'w-3',
    title: 'Dynamic Leg Strength & Stability',
    category: 'gym',
    level: 'Intermediate',
    equipment: 'Full Equipment',
    focus: 'Strength',
    durationMin: 60,
    thumbnail: IMAGES.thumbnails[2],
    description: 'Unilateral control, adductor loading, and explosive hip hinge mechanics for athletic longevity.',
    exercises: [
      { name: 'Front Squat (Clean Grip)', sets: 4, reps: '5 reps', rest: '150s' },
      { name: 'Barbell Hip Thrust', sets: 3, reps: '10-12 reps (1s pause)', rest: '90s' },
      { name: 'Goblet Lateral Squat', sets: 3, reps: '10 reps/side', rest: '60s' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '15 reps', rest: '45s' }
    ]
  },
  {
    id: 'w-4',
    title: '60-Min Friday Night Lift Club Week 10',
    category: 'gym',
    level: 'Advanced',
    equipment: 'Full Equipment',
    focus: 'Strength',
    durationMin: 60,
    thumbnail: IMAGES.thumbnails[3],
    description: 'High intensity upper body hypertrophy session highlighting mechanical tension and long-muscle length overload.',
    exercises: [
      { name: 'Incline Dumbbell Press (30°)', sets: 4, reps: '6-8 reps', rest: '120s', substitution: 'Smith Machine Incline Press' },
      { name: 'Chest-Supported T-Bar Row', sets: 4, reps: '8-10 reps', rest: '90s', substitution: 'Seated Cable Row' },
      { name: 'Cable Lateral Raise', sets: 3, reps: '12-15 reps + Myo-reps', rest: '60s' },
      { name: 'Overhead Cable Triceps Extension', sets: 3, reps: '10-12 reps', rest: '60s' },
      { name: 'Incline Dumbbell Curl', sets: 3, reps: '10-12 reps', rest: '60s' }
    ]
  },
  {
    id: 'w-5',
    title: 'Full Body Circuit',
    category: 'gym',
    level: 'Intermediate',
    equipment: 'Basic Equipment',
    focus: 'Strength',
    durationMin: 25,
    thumbnail: IMAGES.thumbnails[4],
    description: 'Time-efficient full body blast designed to maximize caloric expenditure and muscular activation.',
    exercises: [
      { name: 'Dumbbell Thruster', sets: 4, reps: '12 reps', rest: '60s' },
      { name: 'Pull-Ups / Band Assisted', sets: 4, reps: 'To RPE 9', rest: '60s' },
      { name: 'Dumbbell Walking Lunges', sets: 3, reps: '20 steps', rest: '60s' }
    ]
  },
  {
    id: 'w-6',
    title: '30-Min Heavy Strength & Conditioning',
    category: 'gym',
    level: 'Advanced',
    equipment: 'Full Equipment',
    focus: 'Strength',
    durationMin: 30,
    thumbnail: IMAGES.thumbnails[5],
    description: 'Fast-paced progressive load session utilizing cluster sets for heavy compound movements.',
    exercises: [
      { name: 'Conventional Deadlift', sets: 3, reps: '5 reps', rest: '180s' },
      { name: 'Standing Overhead Press', sets: 3, reps: '6-8 reps', rest: '120s' },
      { name: 'Farmer Carry Walk', sets: 4, reps: '50 meters', rest: '60s' }
    ]
  },
  {
    id: 'w-7',
    title: '30-Min Full-Body Conditioning',
    category: 'gym',
    level: 'Advanced',
    equipment: 'Full Equipment',
    focus: 'Endurance',
    durationMin: 30,
    thumbnail: IMAGES.thumbnails[6],
    description: 'Row-ergometer pacing mixed with bodyweight plyometrics for cardiovascular conditioning.',
    exercises: [
      { name: 'Concept2 Row Intervals', sets: 5, reps: '500m @ 1:45 split', rest: '90s' },
      { name: 'Burpee Broad Jumps', sets: 4, reps: '10 reps', rest: '60s' },
      { name: 'Plank Shoulder Taps', sets: 3, reps: '30 reps', rest: '30s' }
    ]
  },
  {
    id: 'w-8',
    title: 'Strength & Core Burnout',
    category: 'gym',
    level: 'Intermediate',
    equipment: 'Basic Equipment',
    focus: 'Endurance',
    durationMin: 60,
    thumbnail: IMAGES.thumbnails[7],
    description: 'Isometric anti-extension core stability paired with deep abdominal rotational power.',
    exercises: [
      { name: 'Ab Wheel Rollouts', sets: 3, reps: '12 reps', rest: '60s' },
      { name: 'Pallof Press', sets: 3, reps: '15 reps/side', rest: '45s' },
      { name: 'Russian Kettlebell Twists', sets: 3, reps: '20 reps', rest: '30s' }
    ]
  }
];

const DIRECTORY_MUSCLE_GROUPS = [
  'All',
  'Chest',
  'Back',
  'Legs',
  'Shoulders',
  'Arms',
  'Core'
];
const DIRECTORY_EQUIPMENT: ('All' | Equipment)[] = [
  'All',
  'Barbell',
  'Dumbbells',
  'Cables',
  'Machines',
  'Bodyweight',
  'Kettlebell',
  'Bands'
];

export const WorkoutsScreen: React.FC = () => {
  const {
    workouts: contextWorkouts,
    exercises: contextExercises,
    toggleBookmark: contextToggleBookmark,
    openGuidebook,
    startWorkout: contextStartWorkout,
    showToast,
    getExerciseBestStats,
    startEmptyWorkout
  } = useFitness();

  // Routine vault state is component-local so it follows the Rules of Hooks.
  const [isRoutineVaultSheetOpen, setIsRoutineVaultSheetOpen] = useState(false);
  const [isRoutinePreviewOpen, setIsRoutinePreviewOpen] = useState(false);
  const [selectedVaultRoutine, setSelectedVaultRoutine] = useState<CatalogRoutinePlan | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollToast, setEnrollToast] = useState<string | null>(null);
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<'home' | 'category' | 'detail' | 'directory'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('gym');
  const [selectedWorkout, setSelectedWorkout] = useState<AthleticWorkout | null>(null);

  // User State: Bookmarked & Completed
  const [savedWorkoutIds, setSavedWorkoutIds] = useState<string[]>(['w-1']);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<string[]>([]);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'saved' | 'completed'>('all');

  // Search & Filter State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [filterEquipment, setFilterEquipment] = useState<string>('All');
  const [filterDuration, setFilterDuration] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick-Filter Chips: [All], [3-Day], [4-Day], [PPL], [Hypertrophy], [Strength]
  const [quickFilter, setQuickFilter] = useState<'All' | '3-Day' | '4-Day' | 'PPL' | 'Hypertrophy' | 'Strength'>('All');
  const [isRoutineVaultOpen, setIsRoutineVaultOpen] = useState(false);
  const [selectedCatalogRoutine, setSelectedCatalogRoutine] = useState<CatalogRoutinePlan | null>(null);

  // Active In-Workout Tracking State
  const [isLiveWorkoutOpen, setIsLiveWorkoutOpen] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean }>({});
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const isModalOpen =
      isRoutineVaultSheetOpen ||
      isRoutinePreviewOpen ||
      isRoutineVaultOpen ||
      isFilterModalOpen ||
      isLiveWorkoutOpen;
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [
    isRoutineVaultSheetOpen,
    isRoutinePreviewOpen,
    isRoutineVaultOpen,
    isFilterModalOpen,
    isLiveWorkoutOpen
  ]);

  // Power feature modals
  const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);
  const [showCustomProgramModal, setShowCustomProgramModal] = useState(false);
  const [showCustomExerciseModal, setShowCustomExerciseModal] = useState(false);

  // Directory filter state
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryMuscle, setDirectoryMuscle] = useState('All');
  const [directoryEquipment, setDirectoryEquipment] = useState<'All' | Equipment>('All');

  // Convert context workouts to athletic workout format to enrich catalog
  const enrichedWorkouts = useMemo(() => {
    const list: AthleticWorkout[] = [...INITIAL_WORKOUTS];

    // Include workouts from context
    contextWorkouts.forEach((cw, idx) => {
      let cat: AthleticWorkout['category'] = 'gym';
      const titleLower = cw.title.toLowerCase();
      const subtitleLower = (cw.subtitle || '').toLowerCase();

      if (titleLower.includes('ppl') || titleLower.includes('push') || titleLower.includes('pull') || titleLower.includes('legs')) {
        cat = 'ppl';
      } else if (titleLower.includes('upper') || titleLower.includes('lower')) {
        cat = 'upper_lower';
      } else if (cw.category === 'Strength') {
        cat = 'strength';
      } else if (cw.category === 'Hypertrophy') {
        cat = 'hypertrophy';
      } else if (cw.equipment?.includes('Bodyweight') || (cw.equipment?.includes('Dumbbells') && cw.equipment.length <= 2)) {
        cat = 'home_dumbbell';
      } else {
        cat = 'gym';
      }

      let eq: AthleticWorkout['equipment'] = 'Full Equipment';
      if (cw.equipment?.includes('Bodyweight') && cw.equipment.length === 1) eq = 'None';
      else if (cw.equipment?.includes('Dumbbells') && cw.equipment.length <= 2) eq = 'Basic Equipment';

      list.push({
        id: cw.id,
        title: cw.title,
        category: cat,
        level: cw.level,
        equipment: eq,
        focus: cw.category === 'Strength' ? 'Strength' : 'Hypertrophy',
        durationMin: cw.durationMin || 45,
        thumbnail: cw.image || IMAGES.thumbnails[idx % IMAGES.thumbnails.length],
        description: cw.subtitle || 'Progressive overload session calibrated for hypertrophy and athletic longevity.',
        isCustom: cw.isCustom,
        exercises: cw.exercises.map(ex => ({
          name: ex.name,
          sets: ex.defaultSets || 3,
          reps: ex.defaultReps || '8-10 reps',
          rest: `${ex.defaultRestSec || 90}s`,
          notes: ex.notes,
          substitution: ex.substitutions?.[0]?.name,
          youtubeId: ex.videoId
        }))
      });
    });

    return list;
  }, [contextWorkouts]);

  // Sync saved state with initial bookmarked workouts from context
  useEffect(() => {
    const bookmarked = contextWorkouts.filter(w => w.isBookmarked).map(w => w.id);
    if (bookmarked.length > 0) {
      setSavedWorkoutIds(prev => Array.from(new Set([...prev, ...bookmarked])));
    }
  }, [contextWorkouts]);

  // Timer Effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const toggleSaveWorkout = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedWorkoutIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(x => x !== id) : [...prev, id];
      if (contextWorkouts.some(w => w.id === id)) {
        contextToggleBookmark(id);
      }
      showToast(exists ? 'Workout removed from saved' : 'Workout saved to bookmarks');
      return updated;
    });
  };

  const handleStartWorkout = (workout: AthleticWorkout) => {
    setSelectedWorkout(workout);
    setCurrentExerciseIndex(0);
    setCompletedSets({});
    setWorkoutTimer(0);
    setIsTimerRunning(true);
    setIsLiveWorkoutOpen(true);

    const match = contextWorkouts.find(w => w.id === workout.id);
    if (match) {
      contextStartWorkout(match);
    }
  };

  const handleFinishLiveWorkout = () => {
    if (selectedWorkout && !completedWorkoutIds.includes(selectedWorkout.id)) {
      setCompletedWorkoutIds(prev => [...prev, selectedWorkout.id]);
    }
    setIsTimerRunning(false);
    setIsLiveWorkoutOpen(false);
    showToast(`🏆 Great session! "${selectedWorkout?.title}" completed!`);
  };

  // Filtered workouts with quick-filter and search support
  const filteredWorkouts = useMemo(() => {
    return enrichedWorkouts.filter(w => {
      if (selectedCategory && currentScreen === 'category' && w.category !== selectedCategory) {
        return false;
      }
      if (activeTabFilter === 'saved' && !savedWorkoutIds.includes(w.id)) {
        return false;
      }
      if (activeTabFilter === 'completed' && !completedWorkoutIds.includes(w.id)) {
        return false;
      }
      if (filterLevel !== 'All' && w.level !== filterLevel) {
        return false;
      }
      if (filterEquipment !== 'All' && w.equipment !== filterEquipment) {
        return false;
      }
      if (filterDuration === '< 30 min' && w.durationMin >= 30) return false;
      if (filterDuration === '30 - 45 min' && (w.durationMin < 30 || w.durationMin > 45)) return false;
      if (filterDuration === '45+ min' && w.durationMin < 45) return false;

      // Quick-filter chip filtering
      if (quickFilter !== 'All') {
        const titleLower = w.title.toLowerCase();
        const descLower = (w.description || '').toLowerCase();
        if (quickFilter === '3-Day') {
          if (!titleLower.includes('3-day') && !descLower.includes('3 day') && w.durationMin > 50) return false;
        } else if (quickFilter === '4-Day') {
          if (w.category !== 'upper_lower' && !titleLower.includes('upper') && !titleLower.includes('lower') && !titleLower.includes('4-day')) return false;
        } else if (quickFilter === 'PPL') {
          if (w.category !== 'ppl' && !titleLower.includes('ppl') && !titleLower.includes('push') && !titleLower.includes('pull') && !titleLower.includes('legs')) return false;
        } else if (quickFilter === 'Hypertrophy') {
          if (w.category !== 'hypertrophy' && w.focus !== 'Hypertrophy' && !titleLower.includes('hypertrophy')) return false;
        } else if (quickFilter === 'Strength') {
          if (w.category !== 'strength' && w.focus !== 'Strength' && !titleLower.includes('strength')) return false;
        }
      }

      // Search query filtering
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(q);
        const matchesDesc = (w.description || '').toLowerCase().includes(q);
        const matchesEx = w.exercises.some(e => e.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesEx) {
          return false;
        }
      }

      return true;
    });
  }, [enrichedWorkouts, selectedCategory, currentScreen, activeTabFilter, savedWorkoutIds, completedWorkoutIds, filterLevel, filterEquipment, filterDuration, searchQuery, quickFilter]);

  const currentCategoryData = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  const hasActiveFilters =
    filterLevel !== 'All' ||
    filterEquipment !== 'All' ||
    filterDuration !== 'All' ||
    quickFilter !== 'All' ||
    Boolean(searchQuery);

  // Filtered exercises for Exercise Directory view
  const filteredExercises = useMemo(() => {
    const query = directorySearch.trim().toLowerCase();
    return contextExercises.filter(exercise => {
      const matchesSearch =
        !query ||
        exercise.name.toLowerCase().includes(query) ||
        exercise.targetMuscle.toLowerCase().includes(query) ||
        (exercise.secondaryMuscles || []).some(m => m.toLowerCase().includes(query));
      const matchesMuscle =
        directoryMuscle === 'All' || exercise.category === directoryMuscle;
      const matchesEquipment =
        directoryEquipment === 'All' || exercise.equipment === directoryEquipment;
      return matchesSearch && matchesMuscle && matchesEquipment;
    });
  }, [contextExercises, directorySearch, directoryMuscle, directoryEquipment]);

  return (
    <div className="space-y-6 pb-28 text-[#F5F5F2]">

      {/* ================= SCREEN 1: BROWSE BY CATEGORY ================= */}
      {currentScreen === 'home' && (
        <div className="space-y-6 animate-in fade-in duration-200">

          {/* Header Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#C7FF3D]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                HYPERTROPHY & ATHLETIC LIBRARY
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Workout Hub
            </h1>
            <p className="text-xs text-[#929895] font-medium mt-0.5">
              Explore high-performance gym workouts, saved splits, or build custom routines
            </p>
          </div>

          {/* 1. Global Search & Filter Bar right below Workout Hub title */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#929895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search 1,000+ workouts, famous splits, movements..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#151718] border border-white/10 text-xs text-white placeholder-[#929895] focus:outline-none focus:border-[#C7FF3D] transition shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick-Filter Chips: [All], [3-Day], [4-Day], [PPL], [Hypertrophy], [Strength] */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {(['All', '3-Day', '4-Day', 'PPL', 'Hypertrophy', 'Strength'] as const).map(chip => {
                const isActive = quickFilter === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setQuickFilter(chip)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 border ${isActive
                        ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D] shadow-md shadow-[#C7FF3D]/25 ring-1 ring-[#C7FF3D]/40'
                        : 'bg-[#151718] text-[#929895] hover:text-white border-white/10 hover:border-white/20'
                      }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: PDF Guide, Empty Session, + Custom Routine */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => openGuidebook('guidelines')}
              className="btn-glass-subtle px-3 py-1.5 rounded-xl text-xs font-black text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D] flex items-center gap-1.5 active:scale-95 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>PDF Guide</span>
            </button>
            <button
              type="button"
              onClick={() => startEmptyWorkout()}
              className="btn-glass-subtle px-3 py-1.5 rounded-xl text-xs font-black text-white hover:text-[#C7FF3D] flex items-center gap-1.5 active:scale-95 transition"
            >
              <Zap className="w-3.5 h-3.5 text-[#C7FF3D]" />
              <span>Empty Session</span>
            </button>
            <button
              type="button"
              onClick={() => setShowRoutineBuilder(true)}
              className="btn-electric-lime px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Custom Routine</span>
            </button>
          </div>

          {/* 2. "Featured / Famous Splits" Carousel (Horizontal Scroll) */}
          {/* Placed between Action Buttons and "Your Workouts" */}
          <FamousSplitsCarousel
            routines={catalogRoutines}
            onSelectRoutine={routine => setSelectedCatalogRoutine(routine)}
            onSelectFeaturedProgram={() => openGuidebook('guidelines')}
            activeFilter={quickFilter}
          />

          {/* 3. Routine Database Vault Link (Replacing generic Transformation Plans tile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setCurrentScreen('directory')}
              className="p-3.5 rounded-2xl bg-[#161819] border border-white/[0.08] hover:border-[#C7FF3D]/40 transition text-left flex items-center justify-between group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center text-[#C7FF3D]">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#C7FF3D] transition">
                    Exercise Directory
                  </h4>
                  <p className="text-[10px] text-[#929895]">
                    {contextExercises.length} movements with GIF & YouTube
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#929895] group-hover:translate-x-1 group-hover:text-white transition" />
            </button>

            {/* Routine Database Vault - open as mobile bottom sheet drawer modal */}
            <button
              type="button"
              onClick={() => setIsRoutineVaultSheetOpen(true)}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#172018] via-[#161819] to-[#161819] border border-[#C7FF3D]/30 hover:border-[#C7FF3D] transition text-left flex items-center justify-between group shadow-lg active:scale-[0.99]"
            >
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#C7FF3D] transition">
                  Routine Vault
                </h4>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF3D] animate-ping" />
              </div>
              <span className="text-[#C7FF3D] text-xs font-black">
                <Layers className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Active Search & Filter Results Preview (if search or quick filter active) */}
          {(searchQuery || quickFilter !== 'All') && (
            <div className="p-4 rounded-2xl bg-[#161819] border border-[#C7FF3D]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">
                    Matching Workouts ({filteredWorkouts.length} found)
                  </h3>
                  {quickFilter !== 'All' && (
                    <span className="px-2 py-0.5 rounded-md bg-[#C7FF3D]/20 text-[#C7FF3D] text-[10px] font-bold">
                      {quickFilter}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setQuickFilter('All');
                  }}
                  className="text-[10px] font-bold text-[#929895] hover:text-white"
                >
                  Clear Filters
                </button>
              </div>

              {filteredWorkouts.length === 0 ? (
                <p className="text-xs text-[#929895] py-2">
                  No direct workouts matched your query. Check the Famous Splits carousel above or the Routine Vault!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredWorkouts.slice(0, 4).map(w => (
                    <div
                      key={w.id}
                      onClick={() => handleStartWorkout(w)}
                      className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-[#C7FF3D]/40 transition flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-white group-hover:text-[#C7FF3D] truncate">
                          {w.title}
                        </h4>
                        <p className="text-[10px] text-[#929895] truncate">
                          {w.durationMin}m • {w.level} • {w.exercises.length} moves
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded-lg bg-[#C7FF3D] text-[#101112] text-[10px] font-black shrink-0"
                      >
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Section: Your Workouts (Horizontal Glass Cards) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-2">
                <span>Your Workouts</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-[#929895]">
                  Quick Launch
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {/* Saved Card */}
              <GlassCard
                variant="standard"
                onClick={() => {
                  setActiveTabFilter('saved');
                  setCurrentScreen('category');
                }}
                className="p-3.5 sm:p-4 flex flex-col justify-between h-[132px] sm:h-[140px] hover:border-[#C7FF3D]/50 transition group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
                    <path d="M7 6H27V28L17 21L7 28V6Z" fill="url(#savedGradValkyr)" />
                    <defs>
                      <linearGradient id="savedGradValkyr" x1="7" y1="6" x2="27" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF4680" />
                        <stop offset="0.5" stopColor="#A855F7" />
                        <stop offset="1" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#C7FF3D] transition leading-tight">
                    Saved
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#929895] font-medium mt-0.5">
                    {savedWorkoutIds.length} {savedWorkoutIds.length === 1 ? 'workout' : 'workouts'}
                  </p>
                </div>
              </GlassCard>

              {/* All Workouts Card */}
              <GlassCard
                variant="standard"
                onClick={() => {
                  setActiveTabFilter('all');
                  setCurrentScreen('category');
                }}
                className="p-3.5 sm:p-4 flex flex-col justify-between h-[132px] sm:h-[140px] hover:border-[#65D9C0]/50 transition group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                    <circle cx="14" cy="18" r="10" fill="#3B82F6" fillOpacity="0.85" />
                    <circle cx="22" cy="18" r="10" fill="#EC4899" fillOpacity="0.85" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#65D9C0] transition leading-tight">
                    All Workouts
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#929895] font-medium mt-0.5">
                    {enrichedWorkouts.length} catalog
                  </p>
                </div>
              </GlassCard>

              {/* Completed Card */}
              <GlassCard
                variant="standard"
                onClick={() => {
                  setActiveTabFilter('completed');
                  setCurrentScreen('category');
                }}
                className="p-3.5 sm:p-4 flex flex-col justify-between h-[132px] sm:h-[140px] hover:border-[#C7FF3D]/50 transition group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
                    <rect x="6" y="6" width="22" height="22" rx="6" fill="url(#compGradValkyr)" />
                    <path d="M12 17L15.5 20.5L22 13" stroke="#101112" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="compGradValkyr" x1="6" y1="6" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#C7FF3D" />
                        <stop offset="1" stopColor="#65D9C0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-[#C7FF3D] transition leading-tight">
                    Completed
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-[#929895] font-medium mt-0.5">
                    {completedWorkoutIds.length} sessions
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Section: Browse by Category (High-Impact Athletic Imagery) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Browse by Category
                </h2>
                <p className="text-xs text-[#929895]">
                  Calibrated programs with clean progressive overload and focused mechanics
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CATEGORIES.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveTabFilter('all');
                    setCurrentScreen('category');
                  }}
                  className="group relative h-[155px] sm:h-[165px] rounded-[22px] overflow-hidden cursor-pointer border border-white/10 hover:border-[#C7FF3D]/60 shadow-xl transition-all duration-300 active:scale-[0.99]"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.88]"
                    loading="lazy"
                  />
                  {/* Cinematic Dark Valkyr Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-[#101112]/50 to-black/20" />

                  {/* Top Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-[#C7FF3D] border border-[#C7FF3D]/30 backdrop-blur-md">
                      {cat.count} Workouts
                    </span>
                  </div>

                  {/* Bottom Athletic Headline */}
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
                    <div className="pr-2">
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-[#C7FF3D] transition leading-tight">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-[#929895] line-clamp-1 mt-0.5 font-medium">
                        {cat.subtitle}
                      </p>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C7FF3D] group-hover:text-[#101112] text-white transition-all shrink-0">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SCREEN 2: CATEGORY DRILLDOWN ("For The Gym") ================= */}
      {currentScreen === 'category' && (
        <div className="space-y-4 animate-in fade-in duration-200">

          {/* Subheader / Navigation Bar */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setCurrentScreen('home');
                setActiveTabFilter('all');
              }}
              className="btn-glass-subtle px-3 py-1.5 rounded-xl text-xs font-bold text-[#F5F5F2] hover:text-[#C7FF3D] flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border transition ${hasActiveFilters
                  ? 'bg-[#C7FF3D] text-[#101112] border-[#C7FF3D]'
                  : 'btn-glass-subtle text-white'
                }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#101112]" />
              )}
            </button>
          </div>

          {/* Hero Banner */}
          <div className="relative w-full h-[200px] sm:h-[220px] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={currentCategoryData.image}
              alt={currentCategoryData.name}
              className="w-full h-full object-cover object-center brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-[#101112]/60 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                {activeTabFilter === 'saved'
                  ? 'YOUR BOOKMARKS'
                  : activeTabFilter === 'completed'
                    ? 'COMPLETED WORKOUTS'
                    : 'ATHLETIC COLLECTION'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5 leading-tight">
                {activeTabFilter === 'saved'
                  ? 'Saved Workouts'
                  : activeTabFilter === 'completed'
                    ? 'Completed Workouts'
                    : currentCategoryData.name}
              </h2>
              <p className="text-xs text-[#929895] font-medium mt-1 leading-relaxed max-w-xl line-clamp-2">
                {activeTabFilter === 'saved'
                  ? 'Your bookmarked hypertrophy and conditioning sessions ready for immediate execution.'
                  : activeTabFilter === 'completed'
                    ? 'Log of all finished workouts with total sets and progression volume.'
                    : currentCategoryData.heroDesc || `High-intensity programs built with clean progressive overload and focused mechanics.`}
              </p>
            </div>
          </div>

          {/* Search bar inside category */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#929895]" />
              <input
                type="search"
                placeholder={`Search in ${currentCategoryData.name}...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#151718] border border-white/[0.08] rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-[#929895] focus:outline-none focus:border-[#C7FF3D]"
              />
            </div>

            <div className="px-3 py-2 rounded-xl bg-[#151718] border border-white/[0.08] text-xs font-bold text-[#929895] shrink-0">
              <strong className="text-white">{filteredWorkouts.length}</strong> Workouts
            </div>
          </div>

          {/* List of Workouts (Valkyr Style) */}
          <div className="space-y-3">
            {filteredWorkouts.length === 0 ? (
              <GlassCard variant="inset" className="py-14 text-center px-6 space-y-3">
                <Dumbbell className="w-8 h-8 text-[#929895] mx-auto opacity-60" />
                <h3 className="text-sm font-bold text-white">No workouts found</h3>
                <p className="text-xs text-[#929895] max-w-xs mx-auto">
                  Try clearing your search query or reset your filter settings.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilterLevel('All');
                    setFilterEquipment('All');
                    setFilterDuration('All');
                    setActiveTabFilter('all');
                    setSearchQuery('');
                  }}
                  className="btn-electric-lime px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Reset Filters
                </button>
              </GlassCard>
            ) : (
              filteredWorkouts.map(workout => (
                <GlassCard
                  key={workout.id}
                  variant="standard"
                  onClick={() => {
                    setSelectedWorkout(workout);
                    setCurrentScreen('detail');
                  }}
                  className="p-3.5 sm:p-4 hover:border-white/20 transition group"
                >
                  <div className="flex gap-3.5 items-start">
                    {/* Square Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={workout.thumbnail}
                        alt={workout.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-1.5 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-black/70 text-[#C7FF3D] border border-[#C7FF3D]/30 backdrop-blur-sm">
                        {workout.durationMin}m
                      </span>
                    </div>

                    {/* Metadata Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C7FF3D]">
                          {workout.level} · {workout.focus}
                        </span>
                        <button
                          type="button"
                          onClick={e => toggleSaveWorkout(workout.id, e)}
                          className="text-[#929895] hover:text-[#C7FF3D] transition p-1"
                          title="Bookmark workout"
                        >
                          <Bookmark
                            className={`w-4 h-4 ${savedWorkoutIds.includes(workout.id)
                                ? 'fill-[#C7FF3D] text-[#C7FF3D]'
                                : ''
                              }`}
                          />
                        </button>
                      </div>

                      <h3 className="text-sm sm:text-base font-extrabold text-[#F5F5F2] group-hover:text-[#C7FF3D] transition truncate mt-0.5">
                        {workout.title}
                      </h3>
                      <p className="text-[11px] text-[#929895] truncate mt-0.5">
                        {workout.equipment} · {workout.exercises.length} Exercises
                      </p>

                      <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-white/[0.06]">
                        <span className="text-[11px] font-bold text-[#C7FF3D] flex items-center gap-0.5 group-hover:underline">
                          <span>View Routine</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>

                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleStartWorkout(workout);
                          }}
                          className="btn-electric-lime px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 shadow-md shadow-[#C7FF3D]/20"
                        >
                          <Play className="w-3 h-3 fill-[#101112]" />
                          <span>Start</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================= SCREEN 3: WORKOUT DETAIL ================= */}
      {currentScreen === 'detail' && selectedWorkout && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Subheader */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('category')}
              className="btn-glass-subtle px-3 py-1.5 rounded-xl text-xs font-bold text-[#F5F5F2] hover:text-[#C7FF3D] flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => toggleSaveWorkout(selectedWorkout.id)}
              className="btn-glass-subtle p-2 rounded-xl text-[#929895] hover:text-[#C7FF3D] transition"
              title="Bookmark workout"
            >
              <Bookmark
                className={`w-4 h-4 ${savedWorkoutIds.includes(selectedWorkout.id)
                    ? 'fill-[#C7FF3D] text-[#C7FF3D]'
                    : ''
                  }`}
              />
            </button>
          </div>

          {/* Hero Glass Card */}
          <GlassCard variant="elevated" className="overflow-hidden p-0 border border-white/15">
            <div className="relative h-48 sm:h-56 w-full">
              <img
                src={selectedWorkout.thumbnail}
                alt={selectedWorkout.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161819] via-[#161819]/60 to-transparent" />
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-black/70 text-[#C7FF3D] border border-[#C7FF3D]/30 backdrop-blur-md">
                  {selectedWorkout.level} • {selectedWorkout.equipment}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-white/90">
                  {selectedWorkout.focus}
                </span>
              </div>
              <div className="absolute bottom-3.5 left-4 right-4">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {selectedWorkout.title}
                </h1>
                <p className="text-xs text-[#929895] font-medium mt-1 line-clamp-2">
                  {selectedWorkout.description}
                </p>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="p-4 sm:p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-[#121415] border border-white/[0.07] text-center">
                  <span className="text-[10px] font-black uppercase text-[#C7FF3D]">Duration</span>
                  <p className="text-sm font-black text-white mt-0.5">{selectedWorkout.durationMin} Min</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121415] border border-white/[0.07] text-center">
                  <span className="text-[10px] font-black uppercase text-[#FF9A58]">Intensity</span>
                  <p className="text-sm font-black text-white mt-0.5">High (RPE 8-9)</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121415] border border-white/[0.07] text-center">
                  <span className="text-[10px] font-black uppercase text-[#65D9C0]">Movements</span>
                  <p className="text-sm font-black text-white mt-0.5">{selectedWorkout.exercises.length} Exercises</p>
                </div>
              </div>

              {/* Exercise Routine Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-white tracking-tight">
                    Exercise Routine & Sets Breakdown
                  </h3>
                  <span className="text-[10px] font-bold text-[#929895]">
                    {selectedWorkout.exercises.length} Movements
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedWorkout.exercises.map((ex, i) => (
                    <div
                      key={`${ex.name}-${i}`}
                      className="p-3.5 rounded-xl bg-[#121415] border border-white/[0.07] hover:border-white/20 transition space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#C7FF3D]">
                            Exercise {i + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {ex.name}
                          </h4>
                        </div>
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30 shrink-0">
                          {ex.sets} Sets × {ex.reps}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-[#929895] flex-wrap pt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#C7FF3D]" /> Rest: {ex.rest}
                        </span>
                        {ex.substitution && (
                          <span className="flex items-center gap-1 text-[#65D9C0] font-medium">
                            <Repeat className="w-3 h-3" /> Alt: {ex.substitution}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Workout Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleStartWorkout(selectedWorkout)}
                  className="btn-electric-lime w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black tracking-tight flex items-center justify-center gap-2 shadow-xl shadow-[#C7FF3D]/25"
                >
                  <Play className="w-4 h-4 fill-[#101112]" />
                  <span>Start Workout Session</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ================= SCREEN 4: EXERCISE DIRECTORY EMBEDDED ================= */}
      {currentScreen === 'directory' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <button
              type="button"
              onClick={() => setCurrentScreen('home')}
              className="btn-glass-subtle px-3 py-1.5 rounded-xl text-xs font-bold text-white hover:text-[#C7FF3D] flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Workouts</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCustomExerciseModal(true)}
              className="btn-electric-lime px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Exercise</span>
            </button>
          </div>

          <ExerciseDirectoryView
            filteredExercises={filteredExercises}
            hasActiveDirectoryFilters={Boolean(directorySearch || directoryMuscle !== 'All' || directoryEquipment !== 'All')}
            directorySearch={directorySearch}
            directoryMuscle={directoryMuscle}
            directoryEquipment={directoryEquipment}
            getExerciseBestStats={getExerciseBestStats}
            onDirectorySearchChange={e => setDirectorySearch(e.target.value)}
            onDirectoryMuscleChange={setDirectoryMuscle}
            onDirectoryEquipmentChange={val => setDirectoryEquipment(val as 'All' | Equipment)}
            onResetDirectoryFilters={() => {
              setDirectorySearch('');
              setDirectoryMuscle('All');
              setDirectoryEquipment('All');
            }}
            DIRECTORY_MUSCLE_GROUPS={DIRECTORY_MUSCLE_GROUPS}
            DIRECTORY_EQUIPMENT={DIRECTORY_EQUIPMENT}
          />
        </div>
      )}

      {/* ================= LIVE WORKOUT ACTIVE TRACKING OVERLAY ================= */}
      {isLiveWorkoutOpen && selectedWorkout && (
        <div className="fixed inset-0 z-50 bg-[#101112]/95 backdrop-blur-2xl text-white flex justify-center animate-in slide-in-from-bottom duration-300 p-4 sm:p-6">
          <div className="w-full max-w-lg h-full flex flex-col justify-between">
            {/* Top Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-[#C7FF3D] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C7FF3D] animate-ping" />
                  LIVE WORKOUT SESSION
                </span>
                <h3 className="text-base font-black text-white truncate max-w-[280px] mt-0.5">
                  {selectedWorkout.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLiveWorkoutOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition active:scale-90"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Big Stopwatch Display */}
            <div className="text-center my-6">
              <div className="text-5xl sm:text-6xl font-black tracking-tighter tabular-nums leading-none text-[#C7FF3D] drop-shadow-[0_0_24px_rgba(199,255,61,0.3)]">
                {Math.floor(workoutTimer / 60).toString().padStart(2, '0')}:
                {(workoutTimer % 60).toString().padStart(2, '0')}
              </div>
              <p className="text-[11px] font-bold text-[#929895] uppercase tracking-widest mt-2">
                Elapsed Active Time
              </p>
            </div>

            {/* Active Exercise Card */}
            <GlassCard variant="elevated" className="p-5 border border-[#C7FF3D]/30 space-y-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#929895]">
                <span className="text-[#C7FF3D]">
                  Exercise {currentExerciseIndex + 1} of {selectedWorkout.exercises.length}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C7FF3D]" />
                  Rest: {selectedWorkout.exercises[currentExerciseIndex]?.rest}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedWorkout.exercises[currentExerciseIndex]?.name}
                </h2>
                <p className="text-xs text-[#929895] mt-1 font-medium">
                  Target: {selectedWorkout.exercises[currentExerciseIndex]?.sets} Sets × {selectedWorkout.exercises[currentExerciseIndex]?.reps}
                </p>
              </div>

              {/* Set completion checkmarks */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {Array.from({ length: selectedWorkout.exercises[currentExerciseIndex]?.sets || 3 }).map((_, idx) => {
                  const key = `${currentExerciseIndex}-${idx}`;
                  const isDone = !!completedSets[key];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCompletedSets(prev => ({ ...prev, [key]: !prev[key] }));
                      }}
                      className={`py-3 rounded-xl font-black text-xs flex flex-col items-center justify-center gap-1 transition-all ${isDone
                          ? 'bg-[#C7FF3D] text-[#101112] shadow-lg shadow-[#C7FF3D]/30 scale-[1.02]'
                          : 'bg-white/[0.06] text-white hover:bg-white/10 border border-white/10'
                        }`}
                    >
                      <span>Set {idx + 1}</span>
                      {isDone ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      )}
                    </button>
                  );
                })}
              </div>
            </GlassCard>

            {/* Live Navigation & Complete Button */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-2.5">
                <button
                  type="button"
                  disabled={currentExerciseIndex === 0}
                  onClick={() => setCurrentExerciseIndex(prev => Math.max(0, prev - 1))}
                  className="btn-glass-subtle flex-1 py-3.5 rounded-xl text-white font-bold text-xs disabled:opacity-30"
                >
                  Previous Movement
                </button>
                <button
                  type="button"
                  disabled={currentExerciseIndex >= selectedWorkout.exercises.length - 1}
                  onClick={() => setCurrentExerciseIndex(prev => Math.min(selectedWorkout.exercises.length - 1, prev + 1))}
                  className="btn-glass-subtle flex-1 py-3.5 rounded-xl text-white font-bold text-xs disabled:opacity-30"
                >
                  Next Movement
                </button>
              </div>

              <button
                type="button"
                onClick={handleFinishLiveWorkout}
                className="btn-electric-lime w-full py-3.5 rounded-xl text-sm font-black tracking-tight flex items-center justify-center gap-2 active:scale-98 shadow-xl shadow-[#C7FF3D]/30"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                <span>Finish & Record Workout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SLIDE-UP FILTER MODAL (VALKYR DARK GLASS) ================= */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#181A1B] border border-white/15 rounded-t-[28px] sm:rounded-[28px] p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C7FF3D]" />
                <h3 className="text-base font-black text-white">Filter Workouts</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1 text-[#929895] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Level Segment */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-[#929895] block mb-2">
                Fitness Level
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#121415] rounded-xl border border-white/[0.06]">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFilterLevel(lvl)}
                    className={`py-2 text-[11px] font-bold rounded-lg transition ${filterLevel === lvl
                        ? 'bg-[#C7FF3D] text-[#101112] shadow-md font-black'
                        : 'text-[#929895] hover:text-white'
                      }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment Segment */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-[#929895] block mb-2">
                Equipment
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#121415] rounded-xl border border-white/[0.06]">
                {['All', 'Basic Equipment', 'Full Equipment'].map(eq => (
                  <button
                    key={eq}
                    type="button"
                    onClick={() => setFilterEquipment(eq)}
                    className={`py-2 text-[11px] font-bold rounded-lg transition ${filterEquipment === eq
                        ? 'bg-[#C7FF3D] text-[#101112] shadow-md font-black'
                        : 'text-[#929895] hover:text-white'
                      }`}
                  >
                    {eq}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Segment */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-[#929895] block mb-2">
                Duration
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#121415] rounded-xl border border-white/[0.06]">
                {['All', '< 30 min', '30 - 45 min', '45+ min'].map(dur => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setFilterDuration(dur)}
                    className={`py-2 text-[11px] font-bold rounded-lg transition ${filterDuration === dur
                        ? 'bg-[#C7FF3D] text-[#101112] shadow-md font-black'
                        : 'text-[#929895] hover:text-white'
                      }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setFilterLevel('All');
                  setFilterEquipment('All');
                  setFilterDuration('All');
                  setSearchQuery('');
                }}
                className="btn-glass-subtle flex-1 py-3 rounded-xl text-xs font-bold text-[#929895] hover:text-white"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="btn-electric-lime flex-1 py-3 rounded-xl text-xs font-black shadow-lg shadow-[#C7FF3D]/25"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Modals */}
      <HevyRoutineBuilderModal
        isOpen={showRoutineBuilder}
        onClose={() => setShowRoutineBuilder(false)}
      />
      <CustomProgramModal
        isOpen={showCustomProgramModal}
        onClose={() => setShowCustomProgramModal(false)}
      />
      <CustomExerciseModal
        isOpen={showCustomExerciseModal}
        onClose={() => setShowCustomExerciseModal(false)}
        onExerciseCreated={() => setShowCustomExerciseModal(false)}
      />

      {/* Routine Preview Modal (for Famous Splits & Vault Plans) */}
      <RoutinePreviewModal
        plan={selectedCatalogRoutine}
        isOpen={Boolean(selectedCatalogRoutine)}
        onClose={() => setSelectedCatalogRoutine(null)}
      />

      {/* Mobile bottom sheet drawer modal - preserves background screens (Home + Workout Hub) */}
      {isRoutineVaultSheetOpen && (
        <div className="mobile-sheet-overlay" onClick={() => setIsRoutineVaultSheetOpen(false)}>
          <div
            className="mobile-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Routine vault drawer"
          >
            <div className="mobile-sheet__handle"></div>
            <div className="mobile-sheet__body mobile-top-safe">
              <RoutineVaultModal
                isOpen
                onClose={() => setIsRoutineVaultSheetOpen(false)}
                routines={catalogRoutines}
                onSelectRoutine={(r) => {
                  setSelectedVaultRoutine(r as CatalogRoutinePlan);
                  setIsRoutineVaultSheetOpen(false);
                  setIsRoutinePreviewOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Routine Details Drawer View - full screen when opened from sheet */}
      {isRoutinePreviewOpen && selectedVaultRoutine && (
        <div className="mobile-sheet-overlay" onClick={() => { setIsRoutinePreviewOpen(false); setSelectedVaultRoutine(null); }}>
          <div
            className="mobile-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Routine details"
          >
            <div className="mobile-sheet__handle"></div>
            <div className="mobile-sheet__body mobile-top-safe">
              <RoutinePreviewModal
                plan={selectedVaultRoutine}
                isOpen
                onClose={() => {
                  setIsRoutinePreviewOpen(false);
                  setSelectedVaultRoutine(null);
                }}
              />
              <div className="p-3.5 border-t border-white/10 bg-[#101112] flex gap-3 mt-3">
                <button
                  type="button"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#C7FF3D] hover:bg-[#d5ff5e] text-[#101112] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C7FF3D]/25 active:scale-[0.98] transition-all"
                  onClick={() => {
                    setIsEnrolling(true);
                    enrollUserProgram(selectedVaultRoutine.id!).then((ok: boolean) => {
                      setIsEnrolling(false);
                      setEnrollToast(ok ? '✓ Set as Active Program' : 'Failed to enroll');
                      setTimeout(() => setEnrollToast(null), 2500);
                    });
                  }}
                >
                  {isEnrolling ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Enrolling...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Set as Active Program</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="px-4 py-3.5 rounded-xl btn-glass-subtle text-xs font-black"
                  onClick={() => {
                    setIsRoutinePreviewOpen(false);
                    setSelectedVaultRoutine(null);
                  }}
                >
                  Cancel
                </button>
              </div>
              {enrollToast && (
                <div className="px-3.5 pb-3 text-xs font-black text-[#65D9C0]">{enrollToast}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsScreen;
