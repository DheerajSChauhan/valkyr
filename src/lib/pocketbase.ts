import PocketBase, { ClientResponseError } from 'pocketbase';

// PocketBase client instance
const configuredBaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';
const validateBaseUrl = (value: string): string => {
  const url = new URL(value);
  const isLocalDevelopment =
    url.hostname === '127.0.0.1' ||
    url.hostname === 'localhost' ||
    url.hostname === '[::1]';

  if (url.protocol !== 'https:' && !(import.meta.env.DEV && isLocalDevelopment)) {
    throw new Error('PocketBase must use HTTPS outside local development.');
  }

  return url.origin;
};

const baseUrl = validateBaseUrl(configuredBaseUrl);
const client = new PocketBase(baseUrl);

// --- Offline queue for offline-first operation ---
interface QueueItem {
  id: string;
  collection: QueueCollection;
  action: QueueAction;
  data: object;
  timestamp: number;
}

type QueueCollection = 'workout_sessions' | 'workouts' | 'workout_sets' | 'exercises';
type QueueAction = 'create' | 'update' | 'delete';

let queue: QueueItem[] = [];

const QUEUE_STORAGE_KEY = 'obsidian_pb_queue';
const QUEUE_COLLECTIONS = new Set<QueueCollection>([
  'workout_sessions',
  'workouts',
  'workout_sets',
  'exercises',
]);

// Load queue from localStorage on init
try {
  const stored = localStorage.getItem(QUEUE_STORAGE_KEY);
  if (stored) {
    const parsed: unknown = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      queue = parsed.filter((item): item is QueueItem => {
        const candidate = item as Partial<QueueItem>;
        return (
          typeof candidate === 'object' &&
          candidate !== null &&
          typeof candidate.collection === 'string' &&
          QUEUE_COLLECTIONS.has(candidate.collection as QueueCollection) &&
          (candidate.action === 'create' || candidate.action === 'update' || candidate.action === 'delete') &&
          typeof candidate.data === 'object' &&
          candidate.data !== null &&
          typeof candidate.timestamp === 'number'
        );
      }).map(item => ({
        ...item,
        id: item.id || `${item.collection}-${crypto.randomUUID()}`
      }));
    }
  }
} catch {
  queue = [];
}

const saveQueue = () => {
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch {
    // ignore
  }
};

// Sanitization helpers
export const normalizeRoutineTitle = (title: string): string => {
  return title
    .replace(/^(Muscle\s*&\s*Strength|muscleandstrength\.com)/i, '')
    .replace(/[^\w\s\/-]/gi, '')
    .trim()
    .replace(/\s+/g, ' ');
};

export const buildFunctionalTitle = (
  rawTitle: string,
  daysPerWeek: number,
  targetGoal: string,
  equipment: string,
  splitType?: string
): string => {
  const clean = normalizeRoutineTitle(rawTitle);
  if (daysPerWeek && targetGoal) {
    return `${daysPerWeek}-Day ${equipment.replace('Full Gym', 'Gym') || ''} ${targetGoal} ${splitType ? splitType : ''} Split`
      .replace(/\s+/g, ' ')
      .trim();
  }
  return clean;
};

export const resolveSlug = (title: string): string => {
  return normalizeRoutineTitle(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');
};


// Health check
const checkHealth = async (): Promise<{ online: boolean; message: string }> => {
  try {
    await client.health.check();
    return { online: true, message: 'PocketBase is online' };
  } catch {
    return { online: false, message: 'PocketBase is offline' };
  }
};

// Enqueue an operation for offline-first operation
const enqueue = (
  collection: QueueCollection,
  action: QueueAction,
  data: Record<string, unknown>
): void => {
  const queueItem: QueueItem = {
    id: typeof data.id === 'string' ? data.id : `${collection}-${crypto.randomUUID()}`,
    collection,
    action,
    data,
    timestamp: Date.now()
  };
  queue.push(queueItem);
  saveQueue();
  if (typeof navigator !== 'undefined' && navigator.onLine && client.authStore.isValid) {
    void flushQueue();
  }
};

// Get the current queue
const getQueue = (): QueueItem[] => queue;

// Flush the queue to PocketBase
const flushQueue = async (): Promise<{ synced: number; remaining: number; failed: number }> => {
  if (!client.authStore.isValid || !client.authStore.record?.id) {
    return { synced: 0, remaining: queue.length, failed: queue.length };
  }

  let synced = 0;
  let failed = 0;
  const remaining: QueueItem[] = [];

  for (const item of queue) {
    try {
      if (!QUEUE_COLLECTIONS.has(item.collection)) {
        failed++;
        continue;
      }

      if (item.action === 'create') {
        await client.collection(item.collection).create(item.data);
      } else {
        const itemData = item.data as Record<string, unknown>;
        const recordId = typeof itemData.id === 'string' ? itemData.id : '';
        if (!recordId) throw new Error('Queued update/delete is missing a record id.');
        if (item.action === 'update') {
          await client.collection(item.collection).update(recordId, item.data);
        } else {
          await client.collection(item.collection).delete(recordId);
        }
      }
      synced++;
    } catch {
      failed++;
      remaining.push(item);
    }
  }

  queue = remaining;
  saveQueue();
  return { synced, remaining: queue.length, failed };
};

// Publish a routine to the community
const publishRoutine = async (
  workout: object,
  userProfile: { name?: string }
): Promise<void> => {
  const userId = client.authStore.record?.id;
  if (!userId) {
    throw new Error('Sign in before publishing a routine.');
  }

  enqueue('workouts', 'create', {
    ...workout,
    authorId: userId,
    authorName: userProfile.name,
    isPublic: true,
    source: 'app',
  });
};

// Sync a workout session
const syncWorkoutSession = async (
  summary: object,
  userProfile: { name?: string },
  session?: {
    workoutId: string;
    workoutTitle: string;
    startTime: number;
    exercises: Array<{
      id: string;
      sets: Array<{
        setNumber: number;
        weight: number | string;
        reps: number | string;
        completed: boolean;
        intensityTech?: string;
      }>;
    }>;
  }
): Promise<boolean> => {
  const userId = client.authStore.record?.id;
  if (!userId) {
    return false;
  }

  const summaryData = summary as Record<string, unknown>;
  const cloudWorkoutId = `w${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
    .replace(/[^a-z0-9]/gi, '')
    .slice(0, 15)
    .padEnd(15, '0');
  enqueue('workouts', 'create', {
    id: cloudWorkoutId,
    title: typeof summaryData.workoutTitle === 'string' ? summaryData.workoutTitle : 'Workout',
    started_at: session ? new Date(session.startTime).toISOString() : undefined,
    completed_at: new Date().toISOString(),
    notes: typeof summaryData.notes === 'string' ? summaryData.notes : '',
    user: userId,
    client_summary_id: typeof summaryData.id === 'string' ? summaryData.id : undefined,
  });

  if (session) {
    for (const exercise of session.exercises) {
      for (const set of exercise.sets) {
        enqueue('workout_sets', 'create', {
          workout: cloudWorkoutId,
          exercise: exercise.id,
          user: userId,
          set_index: set.setNumber,
          set_type: set.intensityTech?.toLowerCase() || 'normal',
          weight_kg: Number(set.weight) || 0,
          reps: Number(set.reps) || 0,
          is_completed: set.completed
        });
      }
    }
  }

  enqueue('workout_sessions', 'create', {
    ...summaryData,
    user: userId,
    name: userProfile.name
  });
  return true;
};

// Login with password
const loginWithPassword = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
  try {
    await client.collection('users').authWithPassword(email, password);
    return { ok: true };
  } catch (err) {
    const message = err instanceof ClientResponseError ? err.message : 'Authentication failed';
    return { ok: false, error: message };
  }
};

const loginWithGoogle = async (): Promise<{ ok: boolean; error?: string }> => {
  try {
    await client.collection('users').authWithOAuth2({ provider: 'google' });
    reassignQueuedOwnership(client.authStore.record?.id);
    await flushQueue();
    return { ok: true };
  } catch (err) {
    const message = err instanceof ClientResponseError ? err.message : 'Google authentication failed';
    return { ok: false, error: message };
  }
};

const registerWithPassword = async (
  email: string,
  password: string,
  passwordConfirm: string,
  name?: string
): Promise<{ ok: boolean; error?: string }> => {
  try {
    await client.collection('users').create({
      email,
      password,
      passwordConfirm,
      name: name?.trim() || undefined,
    });
    await client.collection('users').authWithPassword(email, password);
    return { ok: true };
  } catch (err) {
    const message = err instanceof ClientResponseError ? err.message : 'Account creation failed';
    return { ok: false, error: message };
  }
};

const logout = (): void => {
  client.authStore.clear();
};

const reassignQueuedOwnership = (userId?: string): void => {
  if (!userId) return;
  const ownedCollections = new Set<QueueCollection>([
    'workout_sessions',
    'workouts',
    'workout_sets',
    'exercises'
  ]);
  queue = queue.map(item => {
    if (!ownedCollections.has(item.collection)) return item;
    const data = item.data as Record<string, unknown>;
    return { ...item, data: { ...data, user: data.user || userId } };
  });
  saveQueue();
};

const isAuthenticated = (): boolean => {
  return client.authStore.isValid && Boolean(client.authStore.record?.id);
};

const getAuthenticatedUser = (): { id: string; email?: string; name?: string } | null => {
  const record = client.authStore.record;
  if (!isAuthenticated() || !record) return null;
  return {
    id: record.id,
    email: typeof record.email === 'string' ? record.email : undefined,
    name: typeof record.name === 'string' ? record.name : undefined,
  };
};

// Get base URL
const getBaseUrl = (): string => {
  return client.baseUrl;
};

// Set base URL
const setBaseUrl = (url: string): void => {
  const validatedUrl = validateBaseUrl(url.trim());
  client.baseUrl = validatedUrl;
  localStorage.setItem('pb_base_url', validatedUrl);
};


// Extended pbClient with offline-first capabilities
export const pbClient = {
  ...client,
  getBaseUrl,
  setBaseUrl,
  loginWithPassword,
  loginWithGoogle,
  registerWithPassword,
  logout,
  isAuthenticated,
  getAuthenticatedUser,
  reassignQueuedOwnership,
  checkHealth,
  enqueue,
  getQueue,
  flushQueue,
  publishRoutine,
  syncWorkoutSession,
};

// Vault-specific fetch functions (used by WorkoutsScreen)
export const fetchVaultRoutines = async (params?: {
  search?: string;
  perPage?: number;
  sort?: string;
}): Promise<any[]> => {
  try {
    const { search = '', perPage = 50, sort = 'created' } = params || {};
    const safePageSize = Math.min(Math.max(Math.floor(perPage), 1), 100);
    const escapedSearch = search.trim().slice(0, 100).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const records = await client
      .collection('vault_routines')
      .getList(1, safePageSize, {
        filter: escapedSearch ? `title ~ "${escapedSearch}"` : undefined,
        sort,
        $autoCancel: false,
      });
    return records.items || [];
  } catch (err) {
    console.warn('[pbClient] fetchVaultRoutines failed:', err);
    throw err;
  }
};

export const fetchRoutineById = async (id: string): Promise<any | null> => {
  try {
    return await client.collection('vault_routines').getOne(id);
  } catch (err) {
    console.warn('[pbClient] fetchRoutineById failed:', err);
    return null;
  }
};

export const enrollUserProgram = async (routineId: string): Promise<boolean> => {
  try {
    const userId = client.authStore.record?.id;
    if (!userId) return false;

    await client.collection('user_programs').create({
      user: userId,
      routine: routineId,
      status: 'active',
    });
    return true;
  } catch (err) {
    console.warn('[pbClient] enrollUserProgram failed:', err);
    return false;
  }
};

export const fetchUserEnrolledProgram = async (): Promise<any | null> => {
  try {
    const userId = client.authStore.record?.id;
    if (!userId) return null;

    const records = await client.collection('user_programs').getList(1, 1, {
      filter: `user = "${userId}" && status = "active"`,
      sort: '-created',
    });
    return records.items[0] || null;
  } catch (err) {
    console.warn('[pbClient] fetchUserEnrolledProgram failed:', err);
    return null;
  }
};

export type { VaultRoutine } from '../types';
export default pbClient;