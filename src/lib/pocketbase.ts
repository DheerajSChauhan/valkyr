import {
  WorkoutSummary,
  CommunityPost,
  UserProfile,
  Workout,
  CustomProgram
} from '../types';

/**
 * Offline-First PocketBase Client & Sync Queue for Valkyr
 * Works seamlessly with a local or remote PocketBase instance (default http://127.0.0.1:8090)
 * and falls back to an offline localStorage sync queue when in a gym without signal.
 */

export interface SyncQueueItem {
  id: string;
  collection:
    | 'workout_sessions'
    | 'kudos'
    | 'comments'
    | 'routines'
    | 'exercises'
    | 'custom_programs'
    | 'users';
  action: 'create' | 'update';
  payload: Record<string, unknown>;
  createdAt: string;
}

const QUEUE_STORAGE_KEY = 'obsidian_pb_sync_queue';
const PB_URL_STORAGE_KEY = 'obsidian_pb_url';
const PB_TOKEN_STORAGE_KEY = 'obsidian_pb_auth';
const pbFetch = (url: string, init?: RequestInit) => fetch(url, init);

export class ObsidianPocketBaseClient {
  private baseUrl: string;
  private token: string | null = null;
  private authRecord: Record<string, unknown> | null = null;

  constructor() {
    let savedUrl = 'http://127.0.0.1:8090';
    try {
      savedUrl =
        localStorage.getItem(PB_URL_STORAGE_KEY) ||
        (import.meta as unknown as { env?: { VITE_POCKETBASE_URL?: string } })?.env?.VITE_POCKETBASE_URL ||
        'http://127.0.0.1:8090';
      const savedAuth = localStorage.getItem(PB_TOKEN_STORAGE_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        this.token = parsed.token || null;
        this.authRecord = parsed.record || null;
      }
    } catch {
      // Ignore storage access errors in restricted frames
    }
    this.baseUrl = savedUrl.replace(/\/+$/, '');
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url.trim().replace(/\/+$/, '');
    try {
      localStorage.setItem(PB_URL_STORAGE_KEY, this.baseUrl);
    } catch {
      // Ignore
    }
  }

  isAuthenticated(): boolean {
    return Boolean(this.token && this.authRecord);
  }

  getAuthUser(): Record<string, unknown> | null {
    return this.authRecord;
  }

  getQueue(): SyncQueueItem[] {
    try {
      const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveQueue(queue: SyncQueueItem[]): void {
    try {
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
    } catch {
      // Ignore
    }
  }

  enqueue(
    collection: SyncQueueItem['collection'],
    action: SyncQueueItem['action'],
    payload: Record<string, unknown>
  ): SyncQueueItem {
    const item: SyncQueueItem = {
      id: `sync-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      collection,
      action,
      payload,
      createdAt: new Date().toISOString()
    };
    const queue = this.getQueue();
    queue.push(item);
    this.saveQueue(queue);
    return item;
  }

  async checkHealth(): Promise<{ online: boolean; message: string }> {
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 2800);
      const res = await pbFetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (res.ok) {
        return { online: true, message: 'PocketBase server healthy & connected' };
      }
      return { online: false, message: `Server responded with status ${res.status}` };
    } catch {
      return {
        online: false,
        message: 'Offline mode active (queued logs will sync when PocketBase is reachable)'
      };
    }
  }

  async loginWithPassword(
    emailOrUsername: string,
    password: string
  ): Promise<{ ok: boolean; user?: Record<string, unknown>; error?: string }> {
    try {
      const res = await pbFetch(`${this.baseUrl}/api/collections/users/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: emailOrUsername, password })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        return { ok: false, error: err?.message || 'Invalid credentials' };
      }
      const data = await res.json();
      this.token = data.token;
      this.authRecord = data.record;
      localStorage.setItem(
        PB_TOKEN_STORAGE_KEY,
        JSON.stringify({ token: data.token, record: data.record })
      );
      return { ok: true, user: data.record };
    } catch {
      return {
        ok: false,
        error: 'Could not reach PocketBase server. Start it with `./pocketbase serve`.'
      };
    }
  }

  logout(): void {
    this.token = null;
    this.authRecord = null;
    try {
      localStorage.removeItem(PB_TOKEN_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  async syncWorkoutSession(summary: WorkoutSummary, profile: UserProfile): Promise<boolean> {
    const payload: Record<string, unknown> = {
      user: profile.id || this.authRecord?.id || 'local_user',
      workoutTitle: summary.workoutTitle,
      workoutId: summary.workoutId || '',
      durationSec: summary.durationSec,
      totalVolume: summary.totalVolume,
      totalSets: summary.totalSets,
      exercisesCompleted: summary.exercisesCompleted,
      perceivedRpe: summary.perceivedRpe,
      notes: summary.notes || '',
      personalRecords: summary.personalRecords,
      targetMuscles: summary.targetMuscles || [],
      exerciseLogs: summary.exerciseLogs || [],
      kudosCount: 1
    };

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (this.token) headers['Authorization'] = this.token;
      const res = await pbFetch(`${this.baseUrl}/api/collections/workout_sessions/records`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      if (res.ok) return true;
    } catch {
      // Network offline -> fall back to queue
    }

    this.enqueue('workout_sessions', 'create', payload);
    return false;
  }

  async flushQueue(): Promise<{ synced: number; remaining: number }> {
    const queue = this.getQueue();
    if (queue.length === 0) return { synced: 0, remaining: 0 };

    const health = await this.checkHealth();
    if (!health.online) {
      return { synced: 0, remaining: queue.length };
    }

    const remaining: SyncQueueItem[] = [];
    let synced = 0;

    for (const item of queue) {
      try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (this.token) headers['Authorization'] = this.token;
        const res = await pbFetch(`${this.baseUrl}/api/collections/${item.collection}/records`, {
          method: 'POST',
          headers,
          body: JSON.stringify(item.payload)
        });
        if (res.ok) {
          synced++;
        } else {
          remaining.push(item);
        }
      } catch {
        remaining.push(item);
      }
    }

    this.saveQueue(remaining);
    return { synced, remaining: remaining.length };
  }

  async publishRoutine(workout: Workout, profile: UserProfile): Promise<boolean> {
    const payload = {
      author: profile.id || this.authRecord?.id || 'local_user',
      title: workout.title,
      subtitle: workout.subtitle,
      category: workout.category,
      level: workout.level,
      durationMin: workout.durationMin,
      programPhase: workout.programPhase || 'Standalone',
      targetMuscles: workout.targetMuscles,
      equipment: workout.equipment,
      exercises: workout.exercises,
      isPublic: true
    };
    this.enqueue('routines', 'create', payload);
    const { synced } = await this.flushQueue();
    return synced > 0;
  }

  async publishCustomProgram(
    program: CustomProgram,
    profile: UserProfile
  ): Promise<boolean> {
    const payload = {
      author: profile.id || this.authRecord?.id || 'local_user',
      title: program.title,
      subtitle: program.subtitle,
      authorName: program.authorName,
      isPublic: program.isPublic,
      daysPerWeek: program.daysPerWeek,
      scheduleMap: program.scheduleMap,
      createdAt: program.createdAt
    };
    this.enqueue('custom_programs', 'create', payload);
    const { synced } = await this.flushQueue();
    return synced > 0;
  }

  async fetchCommunityFeedFallback(localPosts: CommunityPost[]): Promise<CommunityPost[]> {
    try {
      const res = await pbFetch(
        `${this.baseUrl}/api/collections/workout_sessions/records?sort=-created&perPage=20&expand=user`
      );
      if (!res.ok) return localPosts;
      const data = await res.json();
      if (!Array.isArray(data?.items) || data.items.length === 0) return localPosts;
      return data.items.map((item: Record<string, any>) => ({
        id: item.id,
        authorId: item.user || 'pb-user',
        authorName: item.expand?.user?.name || 'Valkyr Athlete',
        authorHandle: item.expand?.user?.handle || '@athlete',
        authorAvatar:
          item.expand?.user?.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        authorBadge: item.expand?.user?.experience || 'Advanced',
        workoutTitle: item.workoutTitle,
        workoutId: item.workoutId,
        createdAt: item.created || 'Just now',
        durationSec: item.durationSec || 3000,
        totalVolumeKg: item.totalVolume || 10000,
        totalSets: item.totalSets || 16,
        perceivedRpe: item.perceivedRpe || 8.5,
        prBadges: Array.isArray(item.personalRecords) ? item.personalRecords : [],
        targetMuscles: Array.isArray(item.targetMuscles) ? item.targetMuscles : ['Chest', 'Back'],
        notes: item.notes || '',
        kudosCount: item.kudosCount || 1,
        hasKudoed: false,
        comments: []
      }));
    } catch {
      return localPosts;
    }
  }
}

export const pbClient = new ObsidianPocketBaseClient();
