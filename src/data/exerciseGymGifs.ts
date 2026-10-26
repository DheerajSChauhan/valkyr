import { Equipment, Exercise, Workout } from '../types';

const EXERCISE_API_URL =
  'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en/exercises.json';

export interface ExerciseGymGifRecord {
  id: string;
  name: string;
  muscle: string;
  bodyPart: string;
  equipment: string;
  secondaryMuscles: string[];
  instructions: string[];
  gifUrl: string;
}

interface ExerciseGymGifResponse {
  exercises: ExerciseGymGifRecord[];
}

const EQUIPMENT_ALIASES: Record<string, Equipment> = {
  'assisted': 'Bodyweight',
  'band': 'Bands',
  'barbell': 'Barbell',
  'body weight': 'Bodyweight',
  'bodyweight': 'Bodyweight',
  'cable': 'Cables',
  'dumbbell': 'Dumbbells',
  'ez barbell': 'Barbell',
  'kettlebell': 'Kettlebell',
  'lever': 'Machines',
  'machine': 'Machines',
  'medicine ball': 'Bodyweight',
  'resistance band': 'Bands',
  'rope': 'Cables',
  'smith machine': 'Machines',
  'stability ball': 'Bodyweight',
  'trap bar': 'Barbell',
  'weighted': 'Bodyweight'
};

const MUSCLE_LABELS: Record<string, string> = {
  abs: 'Core',
  abductors: 'Abductors',
  adductors: 'Adductors',
  biceps: 'Biceps',
  calves: 'Calves',
  cardio: 'Cardio',
  delts: 'Shoulders',
  forearms: 'Forearms',
  glutes: 'Glutes',
  hamstrings: 'Hamstrings',
  lats: 'Lats',
  pectorals: 'Chest',
  quads: 'Quadriceps',
  'upper-back': 'Upper Back',
  traps: 'Traps',
  triceps: 'Triceps'
};

// Curated search aliases mapping Jeff Nippard PDF exercise & substitution names to ExerciseGymGifsDB query terms
const PDF_EXERCISE_GIF_QUERY_MAP: Record<string, string[]> = {
  '45° incline barbell press': ['barbell incline bench press', 'incline barbell bench press'],
  '45° incline db press': ['dumbbell incline bench press', 'incline dumbbell press'],
  '45° incline machine press': ['lever incline chest press', 'machine incline chest press'],
  'cable crossover ladder': ['cable cross-over', 'cable middle fly', 'cable standing fly'],
  'pec deck': ['lever seated fly', 'pec deck fly', 'machine fly'],
  'bottom-half db flye': ['dumbbell fly', 'dumbbell flat bench fly'],
  'bottom-half seated cable flye': ['cable seated chest fly', 'cable middle fly'],
  'low-to-high cable crossover': ['cable low fly', 'cable incline fly'],
  'wide-grip pull-up': ['wide grip pull-up', 'pull-up'],
  'wide-grip lat pulldown': ['cable wide grip lat pulldown', 'cable lat pulldown'],
  'dual-handle lat pulldown': ['cable parallel grip lat pulldown', 'cable lat pulldown'],
  'neutral-grip lat pulldown': ['cable close grip front lat pulldown', 'cable underhand pulldown', 'cable lat pulldown'],
  'neutral-grip pull-up': ['neutral grip pull-up', 'chin-up', 'pull-up'],
  'lean-back lat pulldown': ['cable lat pulldown', 'cable wide grip lat pulldown'],
  'lean-back machine pulldown': ['lever front pulldown', 'machine lat pulldown'],
  'pull-up': ['pull-up', 'wide grip pull-up'],
  'high-cable lateral raise': ['cable one arm lateral raise', 'cable lateral raise'],
  'high-cable cuffed lateral raise': ['cable one arm lateral raise', 'cable lateral raise'],
  'lean-in db lateral raise': ['dumbbell one arm lateral raise', 'dumbbell lateral raise'],
  'pendlay deficit row': ['barbell pendlay row', 'barbell bent over row'],
  'smith machine row': ['smith bent over row', 'barbell bent over row'],
  'single-arm db row': ['dumbbell bent over row', 'dumbbell one arm row'],
  'chest-supported machine row': ['lever seated row', 'lever t-bar row'],
  'chest-supported t-bar row': ['lever t-bar row', 'lever seated row'],
  'incline chest-supported db row': ['dumbbell incline row', 'dumbbell rear delt row'],
  'neutral-grip seated cable row': ['cable seated row', 'cable low seated row'],
  'helms row': ['dumbbell incline row', 'dumbbell bent over row'],
  'meadows row': ['barbell one arm bent over row', 'landmine row', 'dumbbell bent over row'],
  'dual-handle elbows-out cable row': ['cable seated wide grip row', 'cable seated high row'],
  'arm-out single-arm db row': ['dumbbell rear delt row', 'dumbbell one arm row'],
  '1-arm 45° cable rear delt flye': ['cable rear delt row', 'cable reverse fly'],
  'rope face pull': ['cable rear delt row', 'face pull'],
  'reverse pec deck': ['lever seated reverse fly', 'reverse machine fly'],
  'machine shrug': ['lever shrug', 'smith shrug', 'dumbbell shrug'],
  'cable paused shrug-in': ['cable shrug', 'dumbbell shrug'],
  'db shrug': ['dumbbell shrug'],
  'overhead cable triceps extension (bar)': ['cable overhead triceps extension', 'cable standing one arm triceps extension'],
  'overhead cable triceps extension (rope)': ['cable rope overhead triceps extension', 'cable overhead triceps extension'],
  'db skull crusher': ['dumbbell lying triceps extension', 'dumbbell declinethree triceps extension'],
  'ez-bar skull crusher': ['ez barbell lying triceps extension', 'barbell lying triceps extension'],
  'katana triceps extension': ['cable overhead triceps extension', 'cable rope overhead triceps extension'],
  'cable triceps kickback': ['cable kickback', 'dumbbell kickback'],
  'db triceps kickback': ['dumbbell kickback', 'dumbbell standing kickback'],
  'bench dip': ['bench dip', 'triceps dip'],
  'triceps pressdown (bar)': ['cable pushdown', 'cable triceps pushdown'],
  'triceps pressdown (rope)': ['cable pushdown (with rope attachment)', 'cable rope pushdown'],
  'bayesian cable curl': ['cable one arm curl', 'cable standing curl', 'cable curl'],
  'seated super-bayesian high cable curl': ['cable overhead curl', 'cable curl'],
  'incline db stretch curl': ['dumbbell incline curl', 'dumbbell incline biceps curl'],
  'ez-bar cable curl': ['cable curl', 'cable close grip curl'],
  'ez-bar curl': ['ez barbell curl', 'barbell curl'],
  'db curl': ['dumbbell standing biceps curl', 'dumbbell alternate biceps curl'],
  'machine preacher curl': ['lever preacher curl', 'ez barbell preacher curl'],
  'ez-bar preacher curl': ['ez barbell preacher curl', 'barbell preacher curl'],
  'db preacher curl': ['dumbbell preacher curl', 'dumbbell one arm preacher curl'],
  'cable rope hammer curl': ['cable hammer curl (with rope)', 'dumbbell hammer curl'],
  'db hammer curl': ['dumbbell hammer curl', 'dumbbell cross body hammer curl'],
  'hammer preacher curl': ['dumbbell hammer preacher curl', 'dumbbell preacher curl'],
  'db concentration curl': ['dumbbell concentration curl', 'dumbbell seated curl'],
  'concentration cable curl': ['cable concentration curl', 'cable one arm curl'],
  'barbell bench press': ['barbell bench press', 'barbell flat bench press'],
  'machine chest press': ['lever chest press', 'machine chest press'],
  'db bench press': ['dumbbell bench press', 'dumbbell flat bench press'],
  'machine shoulder press': ['lever shoulder press', 'machine shoulder press'],
  'cable shoulder press': ['cable shoulder press', 'cable standing shoulder press'],
  'seated db shoulder press': ['dumbbell seated shoulder press', 'dumbbell shoulder press'],
  'lying leg curl': ['lever lying leg curl', 'lying leg curl'],
  'seated leg curl': ['lever seated leg curl', 'seated leg curl'],
  'nordic ham curl': ['assisted Inverse leg curl', 'glute ham raise', 'lever lying leg curl'],
  'smith machine squat': ['smith squat', 'smith chair squat'],
  'db bulgarian split squat': ['dumbbell single leg split squat', 'dumbbell bulgarian split squat', 'dumbbell lunge'],
  'high-bar back squat': ['barbell full squat', 'barbell high bar squat', 'barbell squat'],
  'smith machine static lunge w/ elevated front foot': ['smith lunge', 'smith split squat'],
  'smith machine static lunge': ['smith lunge', 'smith split squat'],
  'db walking lunge': ['dumbbell walking lunge', 'dumbbell lunge'],
  'walking lunge': ['dumbbell walking lunge', 'barbell lunge'],
  'db static lunge': ['dumbbell lunge', 'dumbbell rear lunge'],
  'db step-up': ['dumbbell step-up', 'barbell step-up'],
  'goblet squat': ['dumbbell goblet squat', 'kettlebell goblet squat'],
  'hack squat': ['sled hack squat', 'barbell hack squat'],
  'leg press': ['sled 45° leg press', 'sled leg press'],
  'barbell rdl': ['barbell romanian deadlift', 'barbell straight leg deadlift'],
  'db rdl': ['dumbbell romanian deadlift', 'dumbbell straight leg deadlift'],
  'snatch-grip rdl': ['barbell romanian deadlift', 'barbell wide grip deadlift'],
  '45° hyperextension': ['hyperextension', 'weighted hyperextension', '45 degree back extension'],
  'glute-ham raise': ['glute-ham raise', 'assisted inverse leg curl', 'lever lying leg curl'],
  'cable pull-through': ['cable pull through', 'cable kneeling pull through'],
  'leg extension': ['lever leg extension', 'leg extension'],
  'reverse nordic': ['reverse nordic', 'bodyweight knee extension', 'lever leg extension'],
  'sissy squat': ['sissy squat', 'weighted sissy squat', 'lever leg extension'],
  'machine hip adduction': ['lever seated hip adduction', 'cable hip adduction'],
  'cable hip adduction': ['cable hip adduction', 'lever seated hip adduction'],
  'copenhagen hip adduction': ['side bridge hip abduction', 'lever seated hip adduction'],
  'machine hip abduction': ['lever seated hip abduction', 'cable hip abduction'],
  'cable hip abduction': ['cable hip abduction', 'lever seated hip abduction'],
  'lateral band walk': ['band lateral walk', 'monster walk', 'lever seated hip abduction'],
  'standing calf raise': ['lever standing calf raise', 'smith standing leg calf raise', 'barbell standing calf raise'],
  'seated calf raise': ['lever seated calf raise', 'barbell seated calf raise'],
  'leg press calf press': ['sled 45° calf press', 'sled calf press on leg press'],
  'cable crunch': ['cable kneeling crunch', 'cable seated crunch'],
  'decline weighted crunch': ['decline crunch', 'weighted decline sit-up'],
  'machine crunch': ['lever seated crunch', 'cable kneeling crunch'],
  'roman chair leg raise': ['captain chair leg raise', 'vertical leg raise', 'hanging leg raise'],
  'hanging leg raise': ['assisted hanging knee raise', 'hanging leg raise', 'hanging pike'],
  'modified candlestick': ['lying leg hip raise', 'reverse crunch', 'dragon flag'],
  'ab wheel rollout': ['wheel rollout', 'barbell rollerout'],
  'swiss ball rollout': ['stability ball rollout', 'wheel rollout'],
  'long-lever plank': ['front plank', 'weighted front plank']
};

let cachedGifRecords: ExerciseGymGifRecord[] = [];

export function getCachedGifRecords(): ExerciseGymGifRecord[] {
  return cachedGifRecords;
}

function labelForMuscle(muscle: string): string {
  return (
    MUSCLE_LABELS[muscle] ||
    muscle.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  );
}

function categoryForRecord(record: ExerciseGymGifRecord): string {
  if (record.bodyPart === 'chest') return 'Chest';
  if (record.bodyPart === 'back') return 'Back';
  if (record.bodyPart === 'shoulders') return 'Shoulders';
  if (record.bodyPart === 'arms') return 'Arms';
  if (record.bodyPart === 'legs') return 'Legs';
  if (record.bodyPart === 'waist' || record.muscle === 'abs') return 'Core';
  if (record.bodyPart === 'cardio') return 'Cardio';
  return 'Full Body';
}

function normalizeRecord(record: ExerciseGymGifRecord): Exercise {
  return {
    id: `gymgif-${record.id.replace(/\//g, '-')}`,
    name: record.name,
    targetMuscle: labelForMuscle(record.muscle),
    secondaryMuscles: record.secondaryMuscles.map(labelForMuscle),
    equipment: EQUIPMENT_ALIASES[record.equipment.toLowerCase()] || 'Bodyweight',
    category: categoryForRecord(record),
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSec: 90,
    notes: record.instructions.join(' '),
    mediaUrl: record.gifUrl
  };
}

function cleanTokens(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/45°|1-arm|db|bb|w\/|[^\w\s]/g, match => {
      if (match === 'db') return 'dumbbell';
      if (match === 'bb') return 'barbell';
      return ' ';
    })
    .split(/\s+/)
    .filter(w => w.length > 2 && !['the', 'and', 'with', 'for', 'focus', 'set'].includes(w));
}

export function resolveGifUrlForExercise(
  name: string,
  equipment?: string,
  targetMuscle?: string,
  catalog: ExerciseGymGifRecord[] = cachedGifRecords
): string | undefined {
  if (!catalog || catalog.length === 0) return undefined;
  const lowerName = name.trim().toLowerCase();

  // 1. Exact name match
  const exact = catalog.find(r => r.name.toLowerCase() === lowerName);
  if (exact) return exact.gifUrl;

  // 2. Curated PDF dictionary match
  const aliasQueries = PDF_EXERCISE_GIF_QUERY_MAP[lowerName];
  if (aliasQueries) {
    for (const q of aliasQueries) {
      const qLower = q.toLowerCase();
      const foundExact = catalog.find(r => r.name.toLowerCase() === qLower);
      if (foundExact) return foundExact.gifUrl;
      const foundSub = catalog.find(r => r.name.toLowerCase().includes(qLower));
      if (foundSub) return foundSub.gifUrl;
    }
  }

  // 3. Multi-token similarity score
  const queryTokens = cleanTokens(name);
  let bestRecord: ExerciseGymGifRecord | undefined;
  let bestScore = 0;

  for (const rec of catalog) {
    const recNameLower = rec.name.toLowerCase();
    let score = 0;
    for (const tok of queryTokens) {
      if (recNameLower.includes(tok)) score += 3;
    }
    if (equipment) {
      const eqLower = equipment.toLowerCase();
      if (
        (eqLower.includes('dumbbell') && rec.equipment.toLowerCase().includes('dumbbell')) ||
        (eqLower.includes('barbell') && rec.equipment.toLowerCase().includes('barbell')) ||
        (eqLower.includes('cable') && rec.equipment.toLowerCase().includes('cable')) ||
        (eqLower.includes('machine') &&
          (rec.equipment.toLowerCase().includes('leverage') ||
            rec.equipment.toLowerCase().includes('machine') ||
            rec.equipment.toLowerCase().includes('smith') ||
            rec.equipment.toLowerCase().includes('sled')))
      ) {
        score += 2;
      }
    }
    if (targetMuscle) {
      const mLower = targetMuscle.toLowerCase();
      if (
        (mLower.includes('chest') && rec.bodyPart === 'chest') ||
        (mLower.includes('lat') && rec.muscle === 'lats') ||
        (mLower.includes('back') && rec.bodyPart === 'back') ||
        (mLower.includes('delt') && rec.muscle === 'delts') ||
        (mLower.includes('bicep') && rec.muscle === 'biceps') ||
        (mLower.includes('tricep') && rec.muscle === 'triceps') ||
        (mLower.includes('quad') && rec.muscle === 'quads') ||
        (mLower.includes('hamstring') && rec.muscle === 'hamstrings') ||
        (mLower.includes('calf') && rec.muscle === 'calves') ||
        (mLower.includes('calves') && rec.muscle === 'calves') ||
        ((mLower.includes('core') || mLower.includes('abs')) && rec.muscle === 'abs')
      ) {
        score += 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestRecord = rec;
    }
  }

  return bestScore >= 3 && bestRecord ? bestRecord.gifUrl : undefined;
}

export function enrichExerciseWithGif(
  ex: Exercise,
  catalog: ExerciseGymGifRecord[] = cachedGifRecords
): Exercise {
  if (!catalog || catalog.length === 0) return ex;
  const resolvedMedia =
    ex.mediaUrl && (ex.mediaUrl.startsWith('http') || ex.mediaUrl.startsWith('data:'))
      ? ex.mediaUrl
      : resolveGifUrlForExercise(ex.name, ex.equipment, ex.targetMuscle, catalog) || ex.mediaUrl;

  const enrichedSubs = ex.substitutions?.map(sub => ({
    ...sub,
    mediaUrl:
      sub.mediaUrl ||
      resolveGifUrlForExercise(sub.name, sub.equipment, ex.targetMuscle, catalog)
  }));

  return {
    ...ex,
    mediaUrl: resolvedMedia,
    substitutions: enrichedSubs
  };
}

export function enrichWorkoutWithGifs(
  workout: Workout,
  catalog: ExerciseGymGifRecord[] = cachedGifRecords
): Workout {
  if (!catalog || catalog.length === 0) return workout;
  return {
    ...workout,
    exercises: workout.exercises.map(ex => enrichExerciseWithGif(ex, catalog))
  };
}

export async function fetchExerciseGymGifs(): Promise<{
  exercises: Exercise[];
  rawCatalog: ExerciseGymGifRecord[];
}> {
  const response = await fetch(EXERCISE_API_URL);
  if (!response.ok) {
    throw new Error(`Exercise GIF catalog request failed with HTTP ${response.status}`);
  }

  const data = (await response.json()) as ExerciseGymGifResponse;
  if (!Array.isArray(data.exercises)) {
    throw new Error('Exercise GIF catalog response did not contain an exercises array');
  }

  cachedGifRecords = data.exercises;
  return {
    exercises: data.exercises.map(normalizeRecord),
    rawCatalog: data.exercises
  };
}
