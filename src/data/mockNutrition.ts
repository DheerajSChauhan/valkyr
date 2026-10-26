import { NutritionLog, RecoveryLog, UserProfile } from '../types';

export const initialNutrition: NutritionLog = {
  dailyCalorieGoal: 2650,
  consumedCalories: 1980,
  proteinGoal: 180,
  consumedProtein: 142,
  carbsGoal: 280,
  consumedCarbs: 210,
  fatGoal: 65,
  consumedFat: 48,
  waterMl: 2500,
  waterGoalMl: 3500,
  meals: [
    { id: 'm1', name: 'Post-Workout Oats & Whey Isolate', calories: 620, protein: 52, time: '08:30 AM' },
    { id: 'm2', name: 'Grilled Chicken, Jasmine Rice & Avocado', calories: 780, protein: 58, time: '01:00 PM' },
    { id: 'm3', name: 'Greek Yogurt Bowl with Berries & Almonds', calories: 420, protein: 32, time: '04:30 PM' },
    { id: 'm4', name: 'Flank Steak, Sweet Potato & Asparagus', calories: 160, protein: 0, time: 'Planned' }
  ]
};

export const initialRecovery: RecoveryLog = {
  sleepHours: 7.8,
  sleepGoal: 8.0,
  energyRating: 8,
  sorenessRating: 4, // 1-10 (4 is mild muscle soreness)
  recoveryScore: 88, // 88% readiness
  restingHeartRate: 54,
  notes: 'High sympathetic recovery. Central nervous system ready for heavy compound loads.'
};

export const initialUserProfile: UserProfile = {
  name: 'Marcus Vance',
  avatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%23C7FF3D%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%23C7FF3D%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23C7FF3D%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EMV%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
  greeting: 'Good evening',
  currentGoal: 'Hypertrophy & Strength',
  streakDays: 6,
  totalWorkoutsCompleted: 48,
  experience: 'Intermediate',
  unit: 'kg',
  heightCm: 181,
  bodyWeight: 79.2,
  targetWeight: 82.0,
  availableDaysPerWeek: 5,
  preferredDurationMin: 55
};
