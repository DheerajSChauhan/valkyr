import { WorkoutProgramPlan } from '../types';

export const builtInProgramPlans: WorkoutProgramPlan[] = [
  {
    id: 'prog-jeff-nippard-bts',
    title: 'The Bodybuilding Transformation System',
    subtitle: 'How I Trained For 365 Days • 12-Week Intermediate-to-Advanced Hypertrophy Plan',
    author: 'Jeff Nippard',
    badge: 'OFFICIAL PDF SYSTEM • 12 WEEKS',
    level: 'Intermediate',
    totalWeeks: 12,
    daysPerWeek: 5,
    sessionDurationMin: '55–70 mins',
    heroImage:
      'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20480%22%20width%3D%22900%22%20height%3D%22480%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230D0E0F%22%2F%3E%3Cstop%20offset%3D%2255%25%22%20stop-color%3D%22%23181C1E%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23101213%22%2F%3E%3C%2FlinearGradient%3E%3CradialGradient%20id%3D%22lime%22%20cx%3D%2280%25%22%20cy%3D%2225%25%22%20r%3D%2255%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23C7FF3D%22%20stop-opacity%3D%220.32%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23C7FF3D%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22480%22%20fill%3D%22url(%23bg)%22%2F%3E%3Crect%20width%3D%22900%22%20height%3D%22480%22%20fill%3D%22url(%23lime)%22%2F%3E%3Ctext%20x%3D%2254%22%20y%3D%2274%22%20fill%3D%22%23C7FF3D%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2215%22%20letter-spacing%3D%224%22%3EHOW%20I%20TRAINED%20FOR%20365%20DAYS%20%E2%80%A2%20JEFF%20NIPPARD%3C%2Ftext%3E%3Ctext%20x%3D%2254%22%20y%3D%22138%22%20fill%3D%22%23F5F5F2%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2242%22%3ETHE%20BODYBUILDING%3C%2Ftext%3E%3Ctext%20x%3D%2254%22%20y%3D%22188%22%20fill%3D%22%23C7FF3D%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2242%22%3ETRANSFORMATION%20SYSTEM%3C%2Ftext%3E%3C%2Fsvg%3E',
    aboutSummary:
      'A complete 12-week, science-based bodybuilding periodization system structured into two progressive blocks: the Foundation Block (Weeks 1–5) and the Ramping Block (Weeks 6–12). Combines heavy mechanical tension on Upper/Lower days with high-density lengthened-biased hypertrophy on Pull/Push/Legs days.',
    splitOverview:
      '5-Day Hybrid Upper / Lower + Push / Pull / Legs Split (Day 1: Upper Strength • Day 2: Lower Strength • Day 3: Rest • Day 4: Pull Hypertrophy • Day 5: Push Hypertrophy • Day 6: Legs Hypertrophy • Day 7: Rest)',
    progressionPhilosophy:
      'Double Progression + Early/Last Set RPE Architecture: Leave 1–2 reps in reserve (~8–9 RPE) on Early Sets to accumulate high-quality volume with minimal CNS fatigue, and push the Last Set of every exercise to true muscular failure (RPE 10) using targeted beyond-failure intensity techniques (Long-Length Partials, Myo-reps, and 30s Loaded Static Stretches). When you hit the top of the prescribed rep range across working sets, increase the load by 2.5 kg / 5 lbs next session.',
    importantNotes: [
      {
        id: 'note-warmup',
        title: 'Mandatory 5–10 Min General & Exercise-Specific Warm-Up',
        badge: 'NOTE 01 • WARM-UP',
        description:
          'Perform a full general warm-up (5–10 mins light cardio + 5 dynamic mobility drills) and the exact exercise-specific warm-up pyramid listed for every movement before starting working sets.'
      },
      {
        id: 'note-intro-week',
        title: 'Week 1 & Week 6 Intro / Acclimation Deload Protocol',
        badge: 'NOTE 02 • INTRO RPE ~7-9',
        description:
          'For the first week of each block (Week 1 and Week 6), most sets are taken to an RPE of ~6–9 (leaving 1–3 reps in the tank) with no post-failure intensity techniques. Starting Week 2 (and Week 7), intensity ramps up and the Last Set of every exercise is taken to failure (RPE 10).'
      },
      {
        id: 'note-early-vs-last',
        title: 'Early Sets vs. Last Set RPE Architecture',
        badge: 'NOTE 03 • SET INTENSITY',
        description:
          'All working sets are divided into Early Sets and Last Sets. Early Sets come before your final set and are performed at a slightly lower RPE (~8–9) to preserve bar speed and technique, whereas the Last Set is pushed to 100% failure (RPE 10) on all exercises after the intro week.'
      },
      {
        id: 'note-demos',
        title: 'Integrated Animated GIFs & Autoplay YouTube Demos',
        badge: 'NOTE 04 • FORM DEMOS',
        description:
          'Every exercise and substitution includes a default integrated GIF plus an embedded YouTube form demonstration that auto-plays on demand. Watch the movement demo and review the Coach Cue before your first working set.'
      },
      {
        id: 'note-subs',
        title: 'Biomechanical Exercise Substitutions & Rep Range Progression',
        badge: 'NOTE 05 • SWAPS & OVERLOAD',
        description:
          'Each exercise includes 2 curated biomechanical substitutions (Option 1 & Option 2) from the PDF. Swap freely if equipment is busy or a movement causes joint discomfort, and progress through the rep ranges using double progression.'
      }
    ],
    intensityTechniques: [
      {
        name: 'Failure (RPE 10)',
        tag: 'Last Set Standard (W2–5 & W7–12)',
        summary: 'Take the final working set to momentary muscular failure with strict form.',
        howToExecute:
          'Continue performing full-range reps until you cannot complete another concentric rep despite maximum effort, without compromising joint alignment.'
      },
      {
        name: 'Failure + LLPs (Extend set)',
        tag: 'Long-Length Partials',
        summary: 'Extend the final set past full-ROM failure in the stretched half of the movement.',
        howToExecute:
          'Once you reach full-range muscular failure on the Last Set, immediately perform 3–6 partial reps in the bottom (most stretched/lengthened) 30–50% of the range of motion until complete exhaustion.'
      },
      {
        name: 'Myo-reps',
        tag: 'Metabolic & Fiber Recruitment Cluster',
        summary: 'High-density rest-pause mini-sets performed after reaching failure on the Last Set.',
        howToExecute:
          'Take your Last Set to failure (activation set). Rest for 3–5 deep breaths (~10–15 seconds), then perform 3–5 reps to failure. Repeat for 2–4 mini-sets until you can no longer complete 3 reps.'
      },
      {
        name: 'Static Stretch (30s)',
        tag: 'Loaded Fascial & Sarcomerogenesis Stretch',
        summary: 'Prescribed on Standing and Leg Press Calf Raises on the Last Set.',
        howToExecute:
          'Immediately after hitting muscular failure on your final working set of calf raises, lower your heels into the deepest possible dorsiflexed stretch under the working load and hold for 30 continuous seconds.'
      }
    ],
    blocks: [
      {
        id: 'block-foundation',
        name: 'Block 1: Foundation Block',
        weeksLabel: 'Weeks 1–5',
        weekStart: 1,
        weekEnd: 5,
        focusSummary:
          'Builds base neuromuscular efficiency and stretched-position hypertrophy across Barbell Incline Press, Smith Squat, Barbell RDL, Wide-Grip Pull-Ups, and Flat Bench Press.',
        rpeProtocol:
          'Week 1 Intro (2 sets, RPE 6–9, No Failure) → Weeks 2–5 Overload (2–3 sets, Early RPE 8–9, Last Set RPE 10 + Failure / LLPs / Myo-reps / 30s Stretch)',
        workoutIds: [
          'foundation-d1',
          'foundation-d2',
          'foundation-d3',
          'foundation-d4',
          'foundation-d5'
        ],
        scheduleMap: {
          'plan-mon': 'foundation-d1',
          'plan-tue': 'foundation-d2',
          'plan-wed': null,
          'plan-thu': 'foundation-d3',
          'plan-fri': 'foundation-d4',
          'plan-sat': 'foundation-d5',
          'plan-sun': null
        }
      },
      {
        id: 'block-ramping',
        name: 'Block 2: Ramping Peak Block',
        weeksLabel: 'Weeks 6–12',
        weekStart: 6,
        weekEnd: 12,
        focusSummary:
          'Transitions to high-stability hypertrophy movements (45° Incline DB Press, Hack Squat, Lean-Back Pulldown, T-Bar Row, Machine Chest Press) while systematically ramping working sets from 2 sets in Week 6 up to 4 sets in Weeks 11–12.',
        rpeProtocol:
          'Week 6 Intro Reset (2 sets, RPE 6–9) → Weeks 7–8 (2–3 sets, RPE 10) → Weeks 9–10 (3 sets, RPE 10) → Weeks 11–12 Peak Overload (3–4 sets, RPE 10 + Intensity Techniques)',
        workoutIds: ['ramping-d1', 'ramping-d2', 'ramping-d3', 'ramping-d4', 'ramping-d5'],
        scheduleMap: {
          'plan-mon': 'ramping-d1',
          'plan-tue': 'ramping-d2',
          'plan-wed': null,
          'plan-thu': 'ramping-d3',
          'plan-fri': 'ramping-d4',
          'plan-sat': 'ramping-d5',
          'plan-sun': null
        }
      }
    ]
  },
  {
    id: 'prog-upper-lower-4d',
    title: '4-Day Upper / Lower Hypertrophy Pro',
    subtitle: 'High-Frequency Compound & Lengthened Hypertrophy Split',
    author: 'Valkyr Pro Library',
    badge: '4 DAYS / WEEK • 8 WEEKS',
    level: 'Intermediate',
    totalWeeks: 8,
    daysPerWeek: 4,
    sessionDurationMin: '55–65 mins',
    heroImage:
      'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20480%22%20width%3D%22900%22%20height%3D%22480%22%3E%3Crect%20width%3D%22900%22%20height%3D%22480%22%20fill%3D%22%23121517%22%2F%3E%3Ctext%20x%3D%2254%22%20y%3D%2290%22%20fill%3D%22%2365D9C0%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2216%22%20letter-spacing%3D%223%22%3E4-DAY%20PRO%20TEMPLATE%3C%2Ftext%3E%3Ctext%20x%3D%2254%22%20y%3D%22150%22%20fill%3D%22%23F5F5F2%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2238%22%3EUPPER%20%2F%20LOWER%20OVERLOAD%3C%2Ftext%3E%3C%2Fsvg%3E',
    aboutSummary:
      'Designed for lifters who want 3 full recovery days per week while hitting every muscle group twice weekly with heavy strength anchors early in the week and machine/cable hypertrophy later in the week.',
    splitOverview: 'Mon: Upper A • Tue: Lower A • Wed: Rest • Thu: Upper B • Fri: Lower B • Sat/Sun: Rest',
    progressionPhilosophy:
      'Double progression across all compound and isolation lifts. Add 1 rep per set until hitting the top of the rep range, then add 2.5 kg / 5 lbs.',
    importantNotes: [
      {
        id: 'ul-1',
        title: 'Twice-Weekly Muscle Protein Synthesis',
        badge: 'FREQUENCY',
        description: 'Every major muscle group is trained every 72–96 hours for optimal recovery and volume.'
      }
    ],
    intensityTechniques: [
      {
        name: 'Failure on Final Set',
        tag: 'RPE 10',
        summary: 'Take the last set of machine and cable movements to technical failure.',
        howToExecute: 'Keep 1–2 reps in reserve on barbell compounds and push machine/cable isolations to RPE 10.'
      }
    ],
    blocks: [
      {
        id: 'ul-block-1',
        name: 'Upper / Lower Main Block',
        weeksLabel: 'Weeks 1–8',
        weekStart: 1,
        weekEnd: 8,
        focusSummary: 'Alternates Foundation Upper/Lower and Ramping Upper/Lower sessions.',
        rpeProtocol: 'Early sets RPE 8 • Last set RPE 9.5–10',
        workoutIds: ['foundation-d1', 'foundation-d2', 'ramping-d1', 'ramping-d2'],
        scheduleMap: {
          'plan-mon': 'foundation-d1',
          'plan-tue': 'foundation-d2',
          'plan-wed': null,
          'plan-thu': 'ramping-d1',
          'plan-fri': 'ramping-d2',
          'plan-sat': null,
          'plan-sun': null
        }
      }
    ]
  },
  {
    id: 'prog-full-body-3d',
    title: '3-Day Full Body Compound Matrix',
    subtitle: 'Maximum Efficiency Strength & Aesthetics (Mon / Wed / Fri)',
    author: 'Valkyr Pro Library',
    badge: '3 DAYS / WEEK • 8 WEEKS',
    level: 'Beginner',
    totalWeeks: 8,
    daysPerWeek: 3,
    sessionDurationMin: '45–55 mins',
    heroImage:
      'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20480%22%20width%3D%22900%22%20height%3D%22480%22%3E%3Crect%20width%3D%22900%22%20height%3D%22480%22%20fill%3D%22%23141312%22%2F%3E%3Ctext%20x%3D%2254%22%20y%3D%2290%22%20fill%3D%22%23FF9A58%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2216%22%20letter-spacing%3D%223%22%3E3-DAY%20ATHLETIC%20MATRIX%3C%2Ftext%3E%3Ctext%20x%3D%2254%22%20y%3D%22150%22%20fill%3D%22%23F5F5F2%22%20font-family%3D%22Inter%2C%20sans-serif%22%20font-weight%3D%22900%22%20font-size%3D%2238%22%3EFULL%20BODY%20COMPOUND%20PLAN%3C%2Ftext%3E%3C%2Fsvg%3E',
    aboutSummary:
      'High-yield 3-day full-body program hitting Squat, Incline Press, Pulldown, Lateral Delts, and Posterior Chain 3x per week with 48 hours of recovery between sessions.',
    splitOverview: 'Mon: Full Body A • Wed: Push/Pull/Legs Hybrid • Fri: Full Body B',
    progressionPhilosophy: 'Linear + Double Progression across core compound lifts.',
    importantNotes: [
      {
        id: 'fb-1',
        title: '48-Hour Recovery Windows',
        badge: 'RECOVERY',
        description: 'Every training day is followed by a dedicated rest and mobility day.'
      }
    ],
    intensityTechniques: [
      {
        name: 'Controlled Eccentrics',
        tag: '2–3s Negative',
        summary: 'Maintain a 2–3 second lowering phase on every rep.',
        howToExecute: 'Pause briefly in the stretched position before driving up explosively.'
      }
    ],
    blocks: [
      {
        id: 'fb-block-1',
        name: 'Full Body Core Block',
        weeksLabel: 'Weeks 1–8',
        weekStart: 1,
        weekEnd: 8,
        focusSummary: '3 weekly full-body & compound hypertrophy sessions.',
        rpeProtocol: 'RPE 7.5–9 across all sets',
        workoutIds: ['workout-full-body-athletic', 'workout-push-hypertrophy', 'workout-legs-quad-focus'],
        scheduleMap: {
          'plan-mon': 'workout-full-body-athletic',
          'plan-tue': null,
          'plan-wed': 'workout-push-hypertrophy',
          'plan-thu': null,
          'plan-fri': 'workout-legs-quad-focus',
          'plan-sat': null,
          'plan-sun': null
        }
      }
    ]
  }
];
