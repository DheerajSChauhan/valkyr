export type Unit = 'kg' | 'lbs';

export type ScreenId =
  | 'home'
  | 'workouts'
  | 'planner'
  | 'progress'
  | 'community'
  | 'profile'
  | 'nutrition';

export type WorkoutCategory =
  | 'Strength'
  | 'Hypertrophy'
  | 'Fat Loss'
  | 'Full Body'
  | 'Cardio'
  | 'Mobility'
  | 'Bodyweight'
  | 'Recovery';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Equipment =
  | 'Barbell'
  | 'Dumbbells'
  | 'Cables'
  | 'Machines'
  | 'Bodyweight'
  | 'Kettlebell'
  | 'Bands';

export interface SetLog {
  id: string;
  setNumber: number;
  targetReps: string;
  targetRpe: string;
  weight: number | string;
  reps: number | string;
  completed: boolean;
  isLastSet?: boolean;
  intensityTech?: string;
  previousWeight?: number;
  previousReps?: number;
  progressionHint?: string;
}

export interface ExerciseSubstitution {
  id?: string;
  name: string;
  equipment: Equipment;
  videoId?: string;
  videoStart?: number;
  mediaUrl?: string;
  notes?: string;
  targetMuscle?: string;
}

export interface WeekPrescription {
  sets: number;
  tech: string;
  earlyRpe: string;
  lastRpe: string;
}

export interface Exercise {
  id: string;
  name: string;
  mediaUrl?: string;
  targetMuscle: string;
  secondaryMuscles?: string[];
  equipment: Equipment;
  category: string;
  defaultSets: number;
  defaultReps: string;
  defaultRestSec: number;
  warmupSets?: string;
  notes: string;
  videoId?: string;
  videoStart?: number;
  isCustom?: boolean;
  createdBy?: string;
  substitutions?: ExerciseSubstitution[];
  prescriptions?: {
    w1?: WeekPrescription;
    w2_5?: WeekPrescription;
    w6?: WeekPrescription;
    w7_8?: WeekPrescription;
    w9_10?: WeekPrescription;
    w11_12?: WeekPrescription;
  };
}

export interface WorkoutExercise extends Exercise {
  sets: SetLog[];
  swappedFromName?: string;
  originalExercise?: Exercise;
  progressionBanner?: string;
}

export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  category: WorkoutCategory;
  level: DifficultyLevel;
  durationMin: number;
  targetMuscles: string[];
  equipment: Equipment[];
  image: string;
  exercises: Exercise[];
  programPhase?: 'Foundation (W1-5)' | 'Ramping (W6-12)' | 'Standalone';
  dayCode?: string;
  isFeatured?: boolean;
  isBookmarked?: boolean;
  isCompleted?: boolean;
  authorName?: string;
  isCustom?: boolean;
  isPublic?: boolean;
  programId?: string;
  customGuidelines?: string[];
}

export interface ActiveWorkoutSession {
  workoutId: string;
  workoutTitle: string;
  programWeek?: number;
  programId?: string;
  dayCode?: string;
  startTime: number;
  elapsedTimeSec: number;
  isPaused: boolean;
  exercises: WorkoutExercise[];
  activeExerciseIndex: number;
}

export interface LoggedExerciseSummary {
  exerciseId: string;
  name: string;
  targetMuscle: string;
  bestWeight: number;
  bestReps: number;
  estimated1RM: number;
  volume: number;
  setsCompleted: number;
}

export interface WorkoutSummary {
  id: string;
  workoutId?: string;
  workoutTitle: string;
  programWeek?: number;
  dayCode?: string;
  date: string;
  isoDate?: string;
  durationSec: number;
  totalVolume: number;
  totalSets: number;
  exercisesCompleted: number;
  personalRecords: string[];
  perceivedRpe: number;
  notes?: string;
  targetMuscles?: string[];
  exerciseLogs?: LoggedExerciseSummary[];
  syncedToCloud?: boolean;
  advancedToNextWeek?: boolean;
}

export interface ScheduledDay {
  id: string;
  date: string;
  dayName: string;
  dayNumber: number;
  workout?: Workout;
  isRestDay: boolean;
  isCompleted: boolean;
  time?: string;
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  metric: string;
  value: string;
  numericValue?: number;
  date: string;
  previousValue?: string;
}

export interface VolumeHistoryPoint {
  date: string;
  volume: number;
  label: string;
}

export interface StrengthHistoryPoint {
  date: string;
  estimated1RM: number;
  weight: number;
  reps: number;
  liftKey?: string;
}

export interface BodyWeightPoint {
  date: string;
  weight: number;
}

export interface NutritionLog {
  dailyCalorieGoal: number;
  consumedCalories: number;
  proteinGoal: number;
  consumedProtein: number;
  carbsGoal: number;
  consumedCarbs: number;
  fatGoal: number;
  consumedFat: number;
  waterMl: number;
  waterGoalMl: number;
  meals: {
    id: string;
    name: string;
    calories: number;
    protein: number;
    time: string;
  }[];
}

export interface RecoveryLog {
  sleepHours: number;
  sleepGoal: number;
  energyRating: number;
  sorenessRating: number;
  recoveryScore: number;
  restingHeartRate: number;
  notes?: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  handle?: string;
  avatar: string;
  greeting: string;
  currentGoal: string;
  streakDays: number;
  totalWorkoutsCompleted: number;
  experience: DifficultyLevel;
  unit: Unit;
  heightCm: number;
  bodyWeight: number;
  targetWeight: number;
  availableDaysPerWeek: number;
  preferredDurationMin: number;
  currentProgramWeek?: number;
  pocketbaseUrl?: string;
  isCloudConnected?: boolean;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorBadge: string;
  workoutTitle: string;
  workoutId?: string;
  routineClone?: Workout;
  createdAt: string;
  durationSec: number;
  totalVolumeKg: number;
  totalSets: number;
  perceivedRpe: number;
  prBadges: string[];
  targetMuscles: string[];
  notes: string;
  kudosCount: number;
  hasKudoed: boolean;
  comments: CommunityComment[];
}

export interface CreateCustomWorkoutInput {
  title: string;
  subtitle: string;
  category: WorkoutCategory;
  level: DifficultyLevel;
  durationMin: number;
  targetMuscles: string[];
  equipment: Equipment[];
  exercises: Exercise[];
  image?: string;
  programPhase?: Workout['programPhase'];
  shareWithClub?: boolean;
  customGuidelines?: string[];
}

export interface ClubMemberRank {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bodyWeightKg: number;
  monthlyVolumeKg: number;
  dotsScore: number;
  streakDays: number;
  topLift: string;
  isCurrentUser?: boolean;
}

export interface CustomProgram {
  id: string;
  title: string;
  subtitle: string;
  authorName: string;
  isPublic: boolean;
  daysPerWeek: number;
  totalWeeks?: number;
  level?: DifficultyLevel;
  guidelines?: string[];
  progressionRule?: string;
  scheduleMap: Record<
    | 'plan-mon'
    | 'plan-tue'
    | 'plan-wed'
    | 'plan-thu'
    | 'plan-fri'
    | 'plan-sat'
    | 'plan-sun',
    string | null
  >;
  createdAt: string;
}

export interface ProgramGuidelineNote {
  id: string;
  title: string;
  badge: string;
  description: string;
}

export interface ProgramIntensityRule {
  name: string;
  tag: string;
  summary: string;
  howToExecute: string;
}

export interface ProgramBlockSpec {
  id: string;
  name: string;
  weeksLabel: string;
  weekStart: number;
  weekEnd: number;
  focusSummary: string;
  rpeProtocol: string;
  workoutIds: string[];
  scheduleMap: CustomProgram['scheduleMap'];
}

export interface WorkoutProgramPlan {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  badge: string;
  level: DifficultyLevel;
  totalWeeks: number;
  daysPerWeek: number;
  sessionDurationMin: string;
  heroImage: string;
  aboutSummary: string;
  splitOverview: string;
  progressionPhilosophy: string;
  importantNotes: ProgramGuidelineNote[];
  intensityTechniques: ProgramIntensityRule[];
  blocks: ProgramBlockSpec[];
  isCustom?: boolean;
}

export interface ActiveProgramProgress {
  programId: string;
  isStarted: boolean;
  startedAt: string;
  currentWeek: number;
  currentDaySlot: number; // 1..5
  completedSessionKeys: string[]; // e.g. 'w1-d1', 'w1-d2'
  preferredSwaps: Record<string, Exercise>; // keyed by original exercise id
}

export interface ActiveProgram {
  id: string;
  title: string;
  author: string;
  currentWeek: number;
  currentDay: number;
  routines: Workout[];
}

export interface MomentumStats {
  targetSessions: number;
  completedSessions: number;
  weeklyVolumeKg: number;
  volumeTrendPercent: number;
  activeMinutes: number;
  streakDays: number;
}

export interface LiveClubMember {
  userId: string;
  name: string;
  avatarUrl: string;
  currentExercise: string;
  status: string;
}

export interface FeedActivityItem {
  id: string;
  athleteName: string;
  athleteAvatar: string;
  athleteHandle?: string;
  sessionTitle: string;
  volumeKg: number;
  durationMinutes: number;
  exerciseCount: number;
  kudosCount: number;
  hasKudosGiven: boolean;
  commentCount?: number;
  relativeTime?: string;
  workoutId?: string;
  routineClone?: Workout;
}

export interface RoutineExercise {
  exercise: string;
  sets: number;
  reps: string;
  rest: string;
  targetMuscle: string;
  notes?: string;
}

export interface RoutineDay {
  dayNumber: number;
  dayTitle: string;
  focus: string;
  targetMuscle: string;
  exercises: RoutineExercise[];
}

export interface VaultRoutine {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  days_per_week: number;
  daysPerWeek?: number;
  target_goal: string;
  equipment: string;
  is_featured: boolean;
  structure: RoutineDay[];
}

export interface CatalogRoutineExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  targetMuscle: string;
  notes?: string;
}

export interface CatalogRoutineDay {
  dayNumber: number;
  dayTitle: string;
  focus: string;
  exercises: CatalogRoutineExercise[];
}

export interface CatalogRoutinePlan extends VaultRoutine {
  shortTitle: string;
  author: string;
  daysBadge: string;
  goal: string;
  goalBadge: string;
  level: DifficultyLevel | string;
  duration: string;
  splitType: string;
  description: string;
  coverImage: string;
  tags: string[];
  daysPerWeek: number;
  days: CatalogRoutineDay[];
}
