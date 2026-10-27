import {
  CatalogRoutinePlan,
  CatalogRoutineDay,
  Workout,
  Exercise,
  DifficultyLevel,
  Equipment,
  WorkoutCategory
} from '../../types';

export const convertRoutineDayToWorkout = (
  plan: CatalogRoutinePlan,
  day: CatalogRoutineDay,
  libraryExercises: Exercise[] = []
): Workout => {
  const workoutId = `catalog-${plan.id}-d${day.dayNumber}-${Date.now()}`;

  const convertedExercises: Exercise[] = day.exercises.map((ex, idx) => {
    // Try to find a matching exercise in library
    const matched = libraryExercises.find(
      libEx => libEx.name.toLowerCase() === ex.name.toLowerCase()
    );

    if (matched) {
      return {
        ...matched,
        defaultSets: ex.sets || 3,
        defaultReps: ex.reps || '8-10 reps',
        defaultRestSec: parseInt(ex.rest, 10) || 90,
        notes: ex.notes || matched.notes
      };
    }

    // Fallback custom exercise
    const fallbackEquipment: Equipment =
      plan.equipment.toLowerCase().includes('dumbbell')
        ? 'Dumbbells'
        : plan.equipment.toLowerCase().includes('barbell')
        ? 'Barbell'
        : 'Machines';

    return {
      id: `ex-${workoutId}-${idx}`,
      name: ex.name,
      targetMuscle: ex.targetMuscle || 'Full Body',
      equipment: fallbackEquipment,
      category: ex.targetMuscle || 'Compound',
      defaultSets: ex.sets || 3,
      defaultReps: ex.reps || '8-10 reps',
      defaultRestSec: parseInt(ex.rest, 10) || 90,
      notes: ex.notes || 'Control eccentric tempo and execute with full range of motion.'
    };
  });

  const category: WorkoutCategory =
    plan.goal.toLowerCase().includes('strength')
      ? 'Strength'
      : plan.goal.toLowerCase().includes('hypertrophy')
      ? 'Hypertrophy'
      : 'Full Body';

  const level: DifficultyLevel =
    plan.level === 'Beginner'
      ? 'Beginner'
      : plan.level === 'Advanced'
      ? 'Advanced'
      : 'Intermediate';

  return {
    id: workoutId,
    title: `${plan.shortTitle}: ${day.dayTitle}`,
    subtitle: `${day.focus} • ${plan.author}`,
    category,
    level,
    durationMin: parseInt(plan.duration, 10) || 55,
    targetMuscles: Array.from(new Set(day.exercises.map(e => e.targetMuscle || 'Full Body'))),
    equipment: ['Barbell', 'Dumbbells', 'Machines'],
    image: plan.coverImage,
    programPhase: 'Standalone',
    dayCode: `D${day.dayNumber}`,
    isFeatured: false,
    isBookmarked: false,
    authorName: plan.author,
    isCustom: true,
    exercises: convertedExercises
  };
};
