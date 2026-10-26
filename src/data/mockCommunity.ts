import { CommunityPost, ClubMemberRank } from '../types';
import { initialWorkouts } from './workouts';

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post-strava-1',
    authorId: 'user-marcus',
    authorName: 'Marcus Vance',
    authorHandle: '@marcus_lifts',
    authorAvatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%23C7FF3D%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%23C7FF3D%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23C7FF3D%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EMV%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
    authorBadge: 'DOTS 418 • Week 8 Ramping',
    workoutTitle: 'Ramping D1: Upper (Strength Focus)',
    workoutId: 'ramping-d1',
    routineClone: initialWorkouts[5] || initialWorkouts[0],
    createdAt: '24 mins ago',
    durationSec: 3420,
    totalVolumeKg: 14850,
    totalSets: 21,
    perceivedRpe: 9.0,
    prBadges: ['45° Incline DB Press: 47.5 kg × 9 (1RM PR)', 'Bayesian Cable Curl: 22.5 kg × 12'],
    targetMuscles: ['Upper Chest', 'Lats', 'Lateral Delts', 'Triceps', 'Biceps'],
    notes: 'Week 8 ramping volume felt intense. Last-set failure on Pec Deck and Smith Machine Rows gave an unreal upper-body pump.',
    kudosCount: 18,
    hasKudoed: false,
    comments: [
      {
        id: 'c-101',
        authorName: 'Elena Rostova',
        authorAvatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%2365D9C0%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%2365D9C0%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2365D9C0%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EER%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
        text: '47.5s on the 45° incline for 9 reps is serious work 🔥',
        createdAt: '12m ago'
      }
    ]
  },
  {
    id: 'post-strava-2',
    authorId: 'user-elena',
    authorName: 'Elena Rostova',
    authorHandle: '@elena_hypertrophy',
    authorAvatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%2365D9C0%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%2365D9C0%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2365D9C0%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EER%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
    authorBadge: '19d Streak • Club Lead',
    workoutTitle: 'Foundation D2: Lower (Strength Focus)',
    workoutId: 'foundation-d2',
    routineClone: initialWorkouts[1] || initialWorkouts[0],
    createdAt: '2 hours ago',
    durationSec: 3780,
    totalVolumeKg: 16420,
    totalSets: 18,
    perceivedRpe: 8.5,
    prBadges: ['Barbell RDL: 125 kg × 8', 'Lying Leg Curl: +5 kg Volume PR'],
    targetMuscles: ['Quadriceps', 'Hamstrings & Glutes', 'Hamstrings', 'Calves', 'Core & Abs'],
    notes: 'Doing Lying Leg Curls before squats (Foundation D2 order) makes knees feel bulletproof and hamstrings locked in.',
    kudosCount: 27,
    hasKudoed: true,
    comments: []
  },
  {
    id: 'post-strava-3',
    authorId: 'user-devon',
    authorName: 'Devon K.',
    authorHandle: '@devon_iron',
    authorAvatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%23FF9A58%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%23FF9A58%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23FF9A58%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EDK%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
    authorBadge: 'DOTS 442 • Powerbuilding',
    workoutTitle: 'Foundation D3: Pull (Hypertrophy Focus)',
    workoutId: 'foundation-d3',
    routineClone: initialWorkouts[2] || initialWorkouts[0],
    createdAt: 'Yesterday • 6:45 PM',
    durationSec: 3180,
    totalVolumeKg: 12960,
    totalSets: 20,
    perceivedRpe: 9.5,
    prBadges: ['Chest-Supported Machine Row: 110 kg × 10'],
    targetMuscles: ['Lats', 'Upper Back & Lats', 'Rear Delts', 'Upper Traps', 'Biceps'],
    notes: 'Used the 1-Arm 45° Cable Rear Delt Flye cue from the video demo—zero trap takeover.',
    kudosCount: 14,
    hasKudoed: false,
    comments: []
  }
];

export const initialClubLeaderboard: ClubMemberRank[] = [
  {
    id: 'rank-1',
    name: 'Devon K.',
    handle: '@devon_iron',
    avatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%23FF9A58%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%23FF9A58%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23FF9A58%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EDK%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
    bodyWeightKg: 84.0,
    monthlyVolumeKg: 184200,
    dotsScore: 442,
    streakDays: 21,
    topLift: 'Squat 205 kg'
  },
  {
    id: 'rank-2',
    name: 'Elena Rostova',
    handle: '@elena_hypertrophy',
    avatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%2365D9C0%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%2365D9C0%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%2365D9C0%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EER%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
    bodyWeightKg: 62.5,
    monthlyVolumeKg: 156800,
    dotsScore: 429,
    streakDays: 19,
    topLift: 'RDL 142.5 kg'
  },
  {
    id: 'rank-3',
    name: 'Marcus Vance',
    handle: '@marcus_lifts',
    avatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%23C7FF3D%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%23C7FF3D%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23C7FF3D%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EMV%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
    bodyWeightKg: 78.5,
    monthlyVolumeKg: 162400,
    dotsScore: 418,
    streakDays: 15,
    topLift: 'Incline Press 122.5 kg'
  },
  {
    id: 'rank-self',
    name: 'Alex Mercer',
    handle: '@alex_valkyr',
    avatar: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20120%20120%22%20width%3D%22120%22%20height%3D%22120%22%3E%0A%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%2260%22%20fill%3D%22%231C1F20%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2256%22%20fill%3D%22none%22%20stroke%3D%22%23C7FF3D%22%20stroke-width%3D%224%22%20opacity%3D%220.8%22%2F%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2260%22%20cy%3D%2260%22%20r%3D%2246%22%20fill%3D%22%23C7FF3D%22%20opacity%3D%220.18%22%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22%23C7FF3D%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2236%22%3EAM%3C%2Ftext%3E%0A%20%20%3C%2Fsvg%3E',
    bodyWeightKg: 79.2,
    monthlyVolumeKg: 148900,
    dotsScore: 406,
    streakDays: 12,
    topLift: 'Incline Press 117.5 kg',
    isCurrentUser: true
  }
];
