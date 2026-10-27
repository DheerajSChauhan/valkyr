import {
  ActiveProgram,
  MomentumStats,
  LiveClubMember,
  FeedActivityItem
} from '../types';
import { initialWorkouts } from './workouts';

const svgAvatar = (initials: string, color: string, bg = '#1C1F20') =>
  `data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22${encodeURIComponent(
    bg
  )}%22%2F%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22${encodeURIComponent(
    color
  )}%22%20stroke-width%3D%224%22%20opacity%3D%220.85%22%2F%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22${encodeURIComponent(
    color
  )}%22%20opacity%3D%220.18%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22${encodeURIComponent(
    color
  )}%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3E${initials}%3C%2Ftext%3E%3C%2Fsvg%3E`;

export const defaultActiveProgram: ActiveProgram = {
  id: 'prog-jeff-nippard-bts',
  title: 'Transformation System',
  author: 'JEFF NIPPARD',
  currentWeek: 1,
  currentDay: 2,
  routines: initialWorkouts
};

export const defaultMomentumStats: MomentumStats = {
  targetSessions: 5,
  completedSessions: 2,
  weeklyVolumeKg: 48200,
  volumeTrendPercent: 12,
  activeMinutes: 175,
  streakDays: 6
};

export const defaultLiveClubMembers: LiveClubMember[] = [
  {
    userId: 'user-alex',
    name: 'Alex Mercer',
    avatarUrl: svgAvatar('AM', '#C7FF3D'),
    currentExercise: 'Bench Press',
    status: 'Alex · Bench Press'
  },
  {
    userId: 'user-sarah',
    name: 'Sarah Lin',
    avatarUrl: svgAvatar('SL', '#65D9C0'),
    currentExercise: 'Rest Interval',
    status: 'Sarah · Rest Interval'
  },
  {
    userId: 'user-marcus',
    name: 'Marcus Vance',
    avatarUrl: svgAvatar('MV', '#FF9A58'),
    currentExercise: 'Barbell Squat',
    status: 'Marcus · Squats'
  }
];

export const defaultFeedActivityItems: FeedActivityItem[] = [
  {
    id: 'feed-marcus-1',
    athleteName: 'Marcus Vance',
    athleteHandle: '@marcus_lifts',
    athleteAvatar: svgAvatar('MV', '#C7FF3D'),
    sessionTitle: 'Ramping D1: Upper (Strength Focus)',
    volumeKg: 14850,
    durationMinutes: 63,
    exerciseCount: 7,
    kudosCount: 18,
    hasKudosGiven: false,
    commentCount: 4,
    relativeTime: '2h ago',
    workoutId: 'ramping-d1',
    routineClone: initialWorkouts[5] || initialWorkouts[0]
  },
  {
    id: 'feed-elena-2',
    athleteName: 'Elena Rostova',
    athleteHandle: '@elena_hypertrophy',
    athleteAvatar: svgAvatar('ER', '#65D9C0'),
    sessionTitle: 'Foundation D2: Lower (Strength Focus)',
    volumeKg: 16420,
    durationMinutes: 54,
    exerciseCount: 6,
    kudosCount: 27,
    hasKudosGiven: true,
    commentCount: 6,
    relativeTime: '3h ago',
    workoutId: 'foundation-d2',
    routineClone: initialWorkouts[1] || initialWorkouts[0]
  },
  {
    id: 'feed-devon-3',
    athleteName: 'Devon K.',
    athleteHandle: '@devon_iron',
    athleteAvatar: svgAvatar('DK', '#FF9A58'),
    sessionTitle: 'Foundation D3: Pull (Hypertrophy Focus)',
    volumeKg: 12960,
    durationMinutes: 53,
    exerciseCount: 7,
    kudosCount: 14,
    hasKudosGiven: false,
    commentCount: 2,
    relativeTime: 'Yesterday • 6:45 PM',
    workoutId: 'foundation-d3',
    routineClone: initialWorkouts[2] || initialWorkouts[0]
  }
];
