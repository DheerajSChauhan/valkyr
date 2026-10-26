import { Exercise } from '../types';

export const exerciseLibrary: Exercise[] = [
  {
    "id": "ex-incline-bb-press",
    "name": "45° Incline Barbell Press",
    "targetMuscle": "Upper Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Barbell",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "6-8",
    "defaultRestSec": 240,
    "warmupSets": "2-3",
    "notes": "1 second pause at the bottom of each rep while maintaining tension on the pecs.",
    "videoId": "vqQ9ok0dEgk",
    "substitutions": [
      {
        "name": "45° Incline DB Press",
        "equipment": "Dumbbells",
        "videoId": "p2t9daxLpB8",
        "notes": "Converge dumbbells slightly at the top."
      },
      {
        "name": "45° Incline Machine Press",
        "equipment": "Machines",
        "videoId": "b8fYnZ-usP0",
        "notes": "Constant tension throughout full range."
      }
    ]
  },
  {
    "id": "ex-cable-crossover",
    "name": "Cable Crossover Ladder",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts"
    ],
    "equipment": "Cables",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Do one set low, one set medium, and one set high cable position. Squeeze pecs for 1 second.",
    "videoId": "0TP9kVcWGic",
    "substitutions": [
      {
        "name": "Pec Deck",
        "equipment": "Machines",
        "videoId": "CI88L1VNvEs",
        "notes": "Focus on bringing your elbows together - not your hands."
      },
      {
        "name": "Bottom-Half DB Flye",
        "equipment": "Dumbbells",
        "videoId": "qJzc-iHKGdg",
        "notes": "Deep stretch at bottom, stop short of resting at top."
      }
    ]
  },
  {
    "id": "ex-lat-pulldown",
    "name": "Dual-Handle Neutral Lat Pulldown",
    "targetMuscle": "Lats",
    "secondaryMuscles": [
      "Biceps",
      "Rear Delts"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "1-2",
    "notes": "Depress shoulder blades first. Pull through the elbows down into your hips.",
    "videoId": "NwQ5Ch5t5Vk",
    "substitutions": [
      {
        "name": "Wide-Grip Lat Pulldown",
        "equipment": "Cables",
        "videoId": "IYXRrYXfVLc",
        "notes": "Lean back slightly and pull to upper chest."
      },
      {
        "name": "Wide-Grip Pull-Up",
        "equipment": "Bodyweight",
        "videoId": "yGnp0HU8BnA",
        "notes": "1.5x shoulder width overhand grip."
      }
    ]
  },
  {
    "id": "ex-barbell-squat",
    "name": "High-Bar Olympic Back Squat",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Core",
      "Adductors"
    ],
    "equipment": "Barbell",
    "category": "Legs",
    "defaultSets": 4,
    "defaultReps": "6-8",
    "defaultRestSec": 240,
    "warmupSets": "3-4",
    "notes": "Brace core with diaphragmatic breath. Descend below parallel maintaining upright torso.",
    "videoId": "bEv6CCg2BC8",
    "substitutions": [
      {
        "name": "Hack Squat",
        "equipment": "Machines",
        "videoId": "TWUnnDK8rck",
        "notes": "Position feet low on plate for maximum quad knee flexion."
      },
      {
        "name": "Leg Press",
        "equipment": "Machines",
        "videoId": "1yKAQLVV_XI",
        "notes": "Deep knee bend without lower back peeling off seat."
      }
    ]
  },
  {
    "id": "ex-romanian-deadlift",
    "name": "Barbell Romanian Deadlift (RDL)",
    "targetMuscle": "Hamstrings & Glutes",
    "secondaryMuscles": [
      "Erectors",
      "Lats"
    ],
    "equipment": "Barbell",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "6-8",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Soft knees, hinge at hips pushing pelvis backward until deep hamstring stretch.",
    "videoId": "3fJwfg51cv0",
    "substitutions": [
      {
        "name": "DB RDL",
        "equipment": "Dumbbells",
        "notes": "Keep dumbbells grazing outer shins."
      },
      {
        "name": "Seated Leg Curl",
        "equipment": "Machines",
        "videoId": "yv0aAY7M1mk",
        "notes": "Dorsiflex toes and pause at peak contraction."
      }
    ]
  },
  {
    "id": "ex-cable-lateral-raise",
    "name": "High-Cable Lateral Raise",
    "targetMuscle": "Lateral Delts",
    "secondaryMuscles": [
      "Traps"
    ],
    "equipment": "Cables",
    "category": "Shoulders",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Align cable height with wrist at bottom. Lead with elbows in scapular plane.",
    "videoId": "MnMux3Wc0Ac",
    "substitutions": [
      {
        "name": "Lean-In DB Lateral Raise",
        "equipment": "Dumbbells",
        "notes": "Slight lean forward, pour water at the top."
      },
      {
        "name": "High-Cable Cuffed Lateral Raise",
        "equipment": "Cables",
        "notes": "Keep constant tension without swinging."
      }
    ]
  },
  {
    "id": "ex-overhead-tricep-extension",
    "name": "Overhead Cable Triceps Extension (Bar)",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Extend elbows fully without letting upper arms sway backward.",
    "videoId": "9_I1PqZAjdA",
    "substitutions": [
      {
        "name": "Overhead Cable Triceps Extension (Rope)",
        "equipment": "Cables",
        "notes": "Spread rope apart at lockout."
      },
      {
        "name": "EZ-Bar Skull Crusher",
        "equipment": "Barbell",
        "videoId": "oDKGCsTjAk8",
        "notes": "Lower bar behind forehead for long-head stretch."
      }
    ]
  },
  {
    "id": "ex-incline-bicep-curl",
    "name": "Bayesian Cable Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Step forward facing away from low pulley for peak shoulder extension stretch.",
    "videoId": "CWH5J_7kzjM",
    "substitutions": [
      {
        "name": "Incline DB Stretch Curl",
        "equipment": "Dumbbells",
        "videoId": "soxrZlIl35U",
        "notes": "Full stretch at bottom with arms hanging straight down."
      },
      {
        "name": "Machine Preacher Curl",
        "equipment": "Machines",
        "videoId": "R2iUnBxFtis",
        "notes": "Lock armpits over pad and avoid hyperextension."
      }
    ]
  },
  {
    "id": "f_d1_e1",
    "name": "45° Incline Barbell Press",
    "targetMuscle": "Upper Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Barbell",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "6-8",
    "defaultRestSec": 240,
    "warmupSets": "2-3",
    "notes": "1 second pause at the bottom of each rep while maintaining tension on the pecs.",
    "videoId": "vqQ9ok0dEgk",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "45° Incline DB Press",
        "equipment": "Dumbbells",
        "videoId": "p2t9daxLpB8",
        "videoStart": 0,
        "notes": "PDF Option 1: 1 second pause at the bottom of each rep while maintaining tension on the pecs."
      },
      {
        "name": "45° Incline Machine Press",
        "equipment": "Machines",
        "videoId": "b8fYnZ-usP0",
        "videoStart": 0,
        "notes": "PDF Option 2: 1 second pause at the bottom of each rep while maintaining constant machine tension on the upper pecs."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d1_e2",
    "name": "Cable Crossover Ladder",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Cables",
    "category": "Chest",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Do one set with low cable position, one set with medium-height cable position, and one height with a high cable position. If you only have one or two sets, choose the one or two cable positions you prefer.",
    "videoId": "0TP9kVcWGic",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Pec Deck",
        "equipment": "Machines",
        "videoId": "CI88L1VNvEs",
        "videoStart": 0,
        "notes": "PDF Option 1: Focus on bringing your elbows together - not your hands."
      },
      {
        "name": "Bottom-Half DB Flye",
        "equipment": "Dumbbells",
        "videoId": "qJzc-iHKGdg",
        "videoStart": 0,
        "notes": "PDF Option 2: All reps and sets are to be performed in the bottom half of the ROM. Focus on feeling a deep stretch in your pecs at the bottom of each rep."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d1_e3",
    "name": "Wide-Grip Pull-Up",
    "targetMuscle": "Lats",
    "secondaryMuscles": [
      "Biceps",
      "Rear Delts"
    ],
    "equipment": "Bodyweight",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "1-2",
    "notes": "1.5x shoulder width overhand grip. Slow 2-3 second negative. Feel your lats pulling apart on the way down.",
    "videoId": "yGnp0HU8BnA",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Wide-Grip Lat Pulldown",
        "equipment": "Cables",
        "videoId": "IYXRrYXfVLc",
        "videoStart": 0,
        "notes": "PDF Option 1: 1.5x shoulder-width overhand grip. Slow 2-3 second negative and feel your lats pulling apart on the way down."
      },
      {
        "name": "Dual-Handle Lat Pulldown",
        "equipment": "Cables",
        "videoId": "NwQ5Ch5t5Vk",
        "videoStart": 0,
        "notes": "PDF Option 2: Lean back by ~15° and drive your elbows down as you squeeze your shoulder blades together."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d1_e4",
    "name": "High-Cable Lateral Raise",
    "targetMuscle": "Lateral Delts",
    "secondaryMuscles": [
      "Traps"
    ],
    "equipment": "Cables",
    "category": "Shoulders",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Focus on squeezing your lateral delt to move the weight.",
    "videoId": "MnMux3Wc0Ac",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "High-Cable Cuffed Lateral Raise",
        "equipment": "Cables",
        "videoId": "8m2jNHBP580",
        "videoStart": 0,
        "notes": "PDF Option 1: Attach cuff at wrist height to remove grip fatigue. Focus on squeezing your lateral delt to move the weight."
      },
      {
        "name": "Lean-In DB Lateral Raise",
        "equipment": "Dumbbells",
        "videoId": "BmYuAG2j2co",
        "videoStart": 0,
        "notes": "PDF Option 2: Lean slightly toward the working arm to maximize tension in the stretched bottom range."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d1_e5",
    "name": "Pendlay Deficit Row",
    "targetMuscle": "Upper Back & Lats",
    "secondaryMuscles": [
      "Rear Delts",
      "Biceps",
      "Erectors"
    ],
    "equipment": "Barbell",
    "category": "Back",
    "defaultSets": 2,
    "defaultReps": "6-8",
    "defaultRestSec": 150,
    "warmupSets": "1-2",
    "notes": "Stand on a bumper plate. Focus on getting a big stretch and touch your stomach/chest on each rep!",
    "videoId": "MmuyHKYCLps",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Smith Machine Row",
        "equipment": "Machines",
        "videoId": "Wmivm40AV3Q",
        "videoStart": 0,
        "notes": "PDF Option 1: Focus on squeezing your shoulder blades together, keeping your elbows at a ~45° angle."
      },
      {
        "name": "Single-Arm DB Row",
        "equipment": "Dumbbells",
        "videoId": "roKtfQZbxzg",
        "videoStart": 0,
        "notes": "PDF Option 2: Brace non-working hand on bench. Pull dumbbell in an arc toward your hip while stretching the lat at the bottom."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d1_e6",
    "name": "Overhead Cable Triceps Extension (Bar)",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Optionally pause for 0.5-1 second in the stretched aspect of each rep.",
    "videoId": "9_I1PqZAjdA",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Overhead Cable Triceps Extension (Rope)",
        "equipment": "Cables",
        "videoId": "GYoUoVNlbGc",
        "videoStart": 0,
        "notes": "PDF Option 1: Step out for a deep overhead long-head stretch; pause 0.5-1s at the bottom of each rep."
      },
      {
        "name": "DB Skull Crusher",
        "equipment": "Dumbbells",
        "videoId": "fbLTzgTKOR8",
        "videoStart": 0,
        "notes": "PDF Option 2: Lower dumbbells behind head to bias the stretched aspect of the triceps long head; pause 0.5-1s at the bottom."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d1_e7",
    "name": "Bayesian Cable Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "If you have a left-right bicep size imbalance, do these 1 arm at a time, starting with the weaker arm. Take the weaker arm to the listed RPE. Then match the reps with the other arm.",
    "videoId": "CWH5J_7kzjM",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Super-Bayesian High Cable Curl",
        "equipment": "Cables",
        "videoId": "jQ9rkfvAbIc",
        "videoStart": 0,
        "notes": "PDF Option 1: Sit facing away from high pulleys so shoulders are extended behind torso for maximum biceps stretch."
      },
      {
        "name": "Incline DB Stretch Curl",
        "equipment": "Dumbbells",
        "videoId": "Z0NIYS9nyoQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Set bench to 45-60°; keep elbows pinned back and let arms hang perpendicular to the floor for a deep stretch."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d2_e1",
    "name": "Lying Leg Curl",
    "targetMuscle": "Hamstrings",
    "secondaryMuscles": [
      "Calves",
      "Glutes"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "2",
    "notes": "Set the machine so that you get the biggest stretch possible at the bottom. Prevent your butt from popping up as you curl.",
    "videoId": "sX4tGtcc62k",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Leg Curl",
        "equipment": "Machines",
        "videoId": "yv0aAY7M1mk",
        "videoStart": 0,
        "notes": "PDF Option 1: Lean forward over the machine to get a maximum stretch in your hamstrings."
      },
      {
        "name": "Nordic Ham Curl",
        "equipment": "Bodyweight",
        "videoId": "fzpYiRtzmFA",
        "videoStart": 0,
        "notes": "PDF Option 2: Control the eccentric descent as far as possible using your hamstrings while keeping hips extended."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d2_e2",
    "name": "Smith Machine Squat",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "6-8",
    "defaultRestSec": 240,
    "warmupSets": "2-4",
    "notes": "Bring your feet forward ~3-6 inches to lean back into the bar slightly, allowing for a more upright squat and placing more tension on the quads.",
    "videoId": "J2D2J7RO_tA",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "DB Bulgarian Split Squat",
        "equipment": "Dumbbells",
        "videoId": "htDXu61MPio",
        "videoStart": 0,
        "notes": "PDF Option 1: Lower all the way down until your front thigh is parallel to the ground. Drive through your front heel on the way up."
      },
      {
        "name": "High-Bar Back Squat",
        "equipment": "Machines",
        "videoId": "V-B_Y-OvOTQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Keep torso upright with knees tracking forward over toes to maximize quad knee flexion."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d2_e3",
    "name": "Barbell RDL",
    "targetMuscle": "Hamstrings & Glutes",
    "secondaryMuscles": [
      "Erectors",
      "Lats"
    ],
    "equipment": "Barbell",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "6-8",
    "defaultRestSec": 150,
    "warmupSets": "2-4",
    "notes": "To keep tension on the hamstrings, stop about 75% of the way to full lockout on each rep (i.e. stay in the bottom 3/4 of the range of motion).",
    "videoId": "3fJwfg51cv0",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "DB RDL",
        "equipment": "Dumbbells",
        "videoId": "VRwSgUoj7uI",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep dumbbells grazing the front/sides of your thighs; hinge hips back and stop at 75% lockout to keep hamstring tension."
      },
      {
        "name": "Snatch-Grip RDL",
        "equipment": "Barbell",
        "videoId": "b8fmEaXHapU",
        "videoStart": 0,
        "notes": "PDF Option 2: Use a wide snatch grip to increase range of motion and upper-back/hamstring stretch; stop at 75% lockout."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d2_e4",
    "name": "Leg Extension",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Set the seat back as far as it will go while still feeling comfortable. Grab the handles as hard as you can to pull your butt down into the seat. Use a 2-3 second negative.",
    "videoId": "uFbNtqP966A",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Reverse Nordic",
        "equipment": "Bodyweight",
        "videoId": "D-kqUKEQZZ0",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep hips locked in line with knees and torso; lean back under strict control to stretch the rectus femoris."
      },
      {
        "name": "Sissy Squat",
        "equipment": "Bodyweight",
        "videoId": "eWAjlO4FWPQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Drive knees forward while leaning torso back in a straight line; use a 2-3 second negative for deep quad stretch."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d2_e5",
    "name": "Standing Calf Raise",
    "targetMuscle": "Calves",
    "secondaryMuscles": [
      "Soleus"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "6-8",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "1-2 second pause at the bottom of each rep. Think about rolling your ankle back and forth on the balls of your feet.",
    "videoId": "6lR2JdxUh7w",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Calf Raise",
        "equipment": "Machines",
        "videoId": "6pfj0G7VKdM",
        "videoStart": 0,
        "notes": "PDF Option 1: Deep stretch at the bottom, explosive contraction at the top. Pause 1 second in the stretched position."
      },
      {
        "name": "Leg Press Calf Press",
        "equipment": "Machines",
        "videoId": "S6DTPNZ_-F4",
        "videoStart": 0,
        "notes": "PDF Option 2: 1-2 second pause at the bottom of each rep. Roll your ankle back and forth on the balls of your feet."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d2_e6",
    "name": "Cable Crunch",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [
      "Hip Flexors",
      "Obliques"
    ],
    "equipment": "Cables",
    "category": "Core",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Round your lower back as you crunch. Maintain a mind-muscle connection with your 6-pack.",
    "videoId": "epBrpaGHMcg",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Decline Weighted Crunch",
        "equipment": "Machines",
        "videoId": "ZheUsKqU81M",
        "videoStart": 0,
        "notes": "PDF Option 1: Round your upper and lower back as you curl up rather than hinging with straight hips."
      },
      {
        "name": "Machine Crunch",
        "equipment": "Machines",
        "videoId": "K2yKEoazT3g",
        "videoStart": 0,
        "notes": "PDF Option 2: Round your lower back as you crunch. Maintain a mind-muscle connection with your 6-pack."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d3_e1",
    "name": "Neutral-Grip Lat Pulldown",
    "targetMuscle": "Lats",
    "secondaryMuscles": [
      "Biceps",
      "Rear Delts"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Do these pulldowns with the handle more out in front of you, more like a cross between pullover and a pulldown. Focus on feeling your lats working.",
    "videoId": "lA4_1F9EAFU",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Neutral-Grip Pull-Up",
        "equipment": "Bodyweight",
        "videoId": "b0ypSz63UGo",
        "videoStart": 0,
        "notes": "PDF Option 1: Use parallel neutral handles; initiate by depressing scapulae and driving elbows down toward hips."
      },
      {
        "name": "Dual-Handle Lat Pulldown",
        "equipment": "Cables",
        "videoId": "NwQ5Ch5t5Vk",
        "videoStart": 0,
        "notes": "PDF Option 2: Lean back by ~15° and drive your elbows down as you squeeze your shoulder blades together."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d3_e2",
    "name": "Chest-Supported Machine Row",
    "targetMuscle": "Upper Back & Lats",
    "secondaryMuscles": [
      "Rear Delts",
      "Biceps",
      "Erectors"
    ],
    "equipment": "Machines",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Flare elbows out at roughly 45° and squeeze your shoulder blades together hard at the top of each rep.",
    "videoId": "ijsSiWSzYw0",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Chest-Supported T-Bar Row",
        "equipment": "Machines",
        "videoId": "q8qlHwcuOtc",
        "videoStart": 0,
        "notes": "PDF Option 1: Flare elbows out at roughly 45° and squeeze your shoulder blades together hard at the top of each rep."
      },
      {
        "name": "Incline Chest-Supported DB Row",
        "equipment": "Dumbbells",
        "videoId": "okCWuhxJEvw",
        "videoStart": 0,
        "notes": "PDF Option 2: Lie chest-down on a 30-45° incline bench; flare elbows ~45° and squeeze shoulder blades hard at the top."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d3_e3",
    "name": "Neutral-Grip Seated Cable Row",
    "targetMuscle": "Upper Back & Lats",
    "secondaryMuscles": [
      "Rear Delts",
      "Biceps",
      "Erectors"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 150,
    "warmupSets": "1-2",
    "notes": "Focus on squeezing your shoulder blades together, driving your elbows down and back.",
    "videoId": "hM7XHxQgvLk",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Helms Row",
        "equipment": "Machines",
        "videoId": "DjO2G9DIerQ",
        "videoStart": 0,
        "notes": "PDF Option 1: Rest chest on incline bench Pad; row with strict scapular retraction and zero lower-back momentum."
      },
      {
        "name": "Meadows Row",
        "equipment": "Machines",
        "videoId": "TwOkRqvcX_c",
        "videoStart": 0,
        "notes": "PDF Option 2: Staggered stance perpendicular to landmine bar; drive elbow out at ~45° for upper back and rear delt thickness."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d3_e4",
    "name": "1-Arm 45° Cable Rear Delt Flye",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Cables",
    "category": "Chest",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Pause for 1-2 seconds in the squeeze of each rep. Contract the rear delts hard!",
    "videoId": "6G5DmVaocGM",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Rope Face Pull",
        "equipment": "Cables",
        "videoId": "GhrVM-jPIEA",
        "videoStart": 0,
        "notes": "PDF Option 1: Pull rope toward forehead while externally rotating shoulders into a double-biceps pose; pause 1-2s in the squeeze."
      },
      {
        "name": "Reverse Pec Deck",
        "equipment": "Machines",
        "videoId": "Y8fb_rtEU_4",
        "videoStart": 0,
        "notes": "PDF Option 2: Sweep arms out in a wide arc using the rear delts; pause 1-2s in the contracted position."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d3_e5",
    "name": "Machine Shrug",
    "targetMuscle": "Upper Traps",
    "secondaryMuscles": [
      "Forearms",
      "Neck"
    ],
    "equipment": "Machines",
    "category": "Back",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "2-3",
    "notes": "Brief pause at the top of the bottom of ROM. Think about pulling your shoulders up to your ears!",
    "videoId": "ua0XuKwKQ9M",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Paused Shrug-In",
        "equipment": "Cables",
        "videoId": "Hy6f1Lz_PiA",
        "videoStart": 0,
        "notes": "PDF Option 1: Shrug up and in. Think about shrugging 'up to your ears.' 1-2 second pause in the squeeze at the top and in the stretch at the bottom."
      },
      {
        "name": "DB Shrug",
        "equipment": "Dumbbells",
        "videoId": "moFqLlptX7Q",
        "videoStart": 0,
        "notes": "PDF Option 2: Shrug up and slightly in toward your ears; pause 1s at the top and 1s in the bottom stretch."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d3_e6",
    "name": "EZ-Bar Cable Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Barbell",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Set up the cable at the lowest position. Maintain constant tension on the biceps. Slow, controlled reps!",
    "videoId": "ck1zjNTnFew",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "EZ-Bar Curl",
        "equipment": "Barbell",
        "videoId": "WMrgn4GG7mI",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep elbows tucked at sides without swinging torso; use a controlled 2-3s eccentric."
      },
      {
        "name": "DB Curl",
        "equipment": "Dumbbells",
        "videoId": "XxGCRSJmgwY",
        "videoStart": 0,
        "notes": "PDF Option 2: Supinate wrists as you curl up and control the lowering phase all the way to full elbow extension."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d3_e7",
    "name": "Machine Preacher Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Machines",
    "category": "Arms",
    "defaultSets": 1,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Smooth, controlled reps. Mind-muscle connection with the biceps.",
    "videoId": "R2iUnBxFtis",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "EZ-Bar Preacher Curl",
        "equipment": "Barbell",
        "videoId": "Dn7qgf9iSH8",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep triceps firmly planted on the preacher pad; smooth, controlled reps with full mind-muscle connection."
      },
      {
        "name": "DB Preacher Curl",
        "equipment": "Dumbbells",
        "videoId": "WTkQLAethtg",
        "videoStart": 0,
        "notes": "PDF Option 2: Perform unilaterally on the preacher pad to eliminate left-right strength imbalances."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 1,
        "tech": "N/A",
        "earlyRpe": "N/A",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 1,
        "tech": "Myo-reps",
        "earlyRpe": "N/A",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d4_e1",
    "name": "Barbell Bench Press",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Barbell",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 240,
    "warmupSets": "2-4",
    "notes": "Set up a comfortable arch, quick pause on the chest and explode up on each rep.",
    "videoId": "nQL5ieH39sw",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Machine Chest Press",
        "equipment": "Machines",
        "videoId": "zDecGJLyVm8",
        "videoStart": 0,
        "notes": "PDF Option 1: Constant tension throughout; stop just short of lockout to keep load on the pecs."
      },
      {
        "name": "DB Bench Press",
        "equipment": "Dumbbells",
        "videoId": "zGXvPjlgVkk",
        "videoStart": 0,
        "notes": "PDF Option 2: Set a comfortable arch, lower dumbbells to a deep pec stretch with a brief pause, and press up explosively."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d4_e2",
    "name": "Machine Shoulder Press",
    "targetMuscle": "Front & Lateral Delts",
    "secondaryMuscles": [
      "Triceps",
      "Upper Chest"
    ],
    "equipment": "Machines",
    "category": "Shoulders",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Ensure that your elbows break at least 90°. Mind-muscle connection with your delts. Smooth, controlled reps.",
    "videoId": "SCQVmN1gYsk",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Shoulder Press",
        "equipment": "Cables",
        "videoId": "OfjncdW_Vyc",
        "videoStart": 0,
        "notes": "PDF Option 1: Set dual cables at shoulder height; ensure elbows break at least 90° at the bottom for full deltoid stretch."
      },
      {
        "name": "Seated DB Shoulder Press",
        "equipment": "Dumbbells",
        "videoId": "B8PB5RPhTWQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Ensure that your elbows break at least 90°. Mind-muscle connection with your delts. Smooth, controlled reps."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d4_e3",
    "name": "Bottom-Half DB Flye",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Dumbbells",
    "category": "Chest",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "All reps and sets are to be performed in the bottom half of the ROM. Focus on feeling a deep stretch in your pecs at the bottom of each rep.",
    "videoId": "qJzc-iHKGdg",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Bottom-Half Seated Cable Flye",
        "equipment": "Cables",
        "videoId": "tsJMV9Gxw-o",
        "videoStart": 0,
        "notes": "PDF Option 1: All reps and sets are to be performed in the bottom half of the ROM. Focus on feeling a deep stretch in your pecs at the bottom of each rep."
      },
      {
        "name": "Low-to-High Cable Crossover",
        "equipment": "Cables",
        "videoId": "1LhGmhVFe2Y",
        "videoStart": 0,
        "notes": "PDF Option 2: Perform reps in the bottom/stretched half of the range of motion, focusing on a deep pec stretch."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d4_e4",
    "name": "High-Cable Lateral Raise",
    "targetMuscle": "Lateral Delts",
    "secondaryMuscles": [
      "Traps"
    ],
    "equipment": "Cables",
    "category": "Shoulders",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Focus on squeezing your lateral delt to move the weight.",
    "videoId": "MnMux3Wc0Ac",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "High-Cable Cuffed Lateral Raise",
        "equipment": "Cables",
        "videoId": "8m2jNHBP580",
        "videoStart": 0,
        "notes": "PDF Option 1: Attach cuff at wrist height to remove grip fatigue. Focus on squeezing your lateral delt to move the weight."
      },
      {
        "name": "Lean-In DB Lateral Raise",
        "equipment": "Dumbbells",
        "videoId": "BmYuAG2j2co",
        "videoStart": 0,
        "notes": "PDF Option 2: Lean slightly toward the working arm to maximize tension in the stretched bottom range."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d4_e5",
    "name": "Overhead Cable Triceps Extension (Bar)",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Optionally pause for 0.5-1 second in the stretched aspect of each rep.",
    "videoId": "9_I1PqZAjdA",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Overhead Cable Triceps Extension (Rope)",
        "equipment": "Cables",
        "videoId": "GYoUoVNlbGc",
        "videoStart": 0,
        "notes": "PDF Option 1: Step out for a deep overhead long-head stretch; pause 0.5-1s at the bottom of each rep."
      },
      {
        "name": "DB Skull Crusher",
        "equipment": "Dumbbells",
        "videoId": "fbLTzgTKOR8",
        "videoStart": 0,
        "notes": "PDF Option 2: Lower dumbbells behind head to bias the stretched aspect of the triceps long head; pause 0.5-1s at the bottom."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d4_e6",
    "name": "Cable Triceps Kickback",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 1,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Can be done upright or bent over. In the full squeeze, your shoulder should be positioned back behind your torso.",
    "videoId": "oRxTKRtP8RE",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "DB Triceps Kickback",
        "equipment": "Dumbbells",
        "videoId": "YdUUYFgpA7g",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep upper arm locked parallel to the floor and behind torso at peak contraction for maximal triceps shortening."
      },
      {
        "name": "Bench Dip",
        "equipment": "Bodyweight",
        "videoId": "3CaIq8jZe18",
        "videoStart": 0,
        "notes": "PDF Option 2: Keep hands close to hips and shoulders extended behind torso at lockout for full triceps squeeze."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 1,
        "tech": "N/A",
        "earlyRpe": "N/A",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 1,
        "tech": "Myo-reps",
        "earlyRpe": "N/A",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d4_e7",
    "name": "Roman Chair Leg Raise",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [
      "Hip Flexors",
      "Obliques"
    ],
    "equipment": "Bodyweight",
    "category": "Core",
    "defaultSets": 2,
    "defaultReps": "10-20",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Allow your lower back to round as you curl your legs up. Go until you hit the listed RPE with controlled form.",
    "videoId": "irOzFVqJ0IE",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Hanging Leg Raise",
        "equipment": "Bodyweight",
        "videoId": "rGqwkinWqYI",
        "videoStart": 0,
        "notes": "PDF Option 1: Hang from bar, lift legs to at least 90°, lower under control without swinging."
      },
      {
        "name": "Modified Candlestick",
        "equipment": "Bodyweight",
        "videoId": "-XVRl8KU7x0",
        "videoStart": 0,
        "notes": "PDF Option 2: Control the eccentric pelvic roll down the bench while maintaining constant abdominal tension."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d5_e1",
    "name": "Leg Press",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "2-4",
    "notes": "Feet lower on the platform for more quad focus. Get as deep as you can without excessive back rounding.",
    "videoId": "1yKAQLVV_XI",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Smith Machine Static Lunge",
        "equipment": "Machines",
        "videoId": "SEjKxJGg_C8",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep stance fixed and drive front knee forward over toes; minimize contribution from the back leg."
      },
      {
        "name": "DB Walking Lunge",
        "equipment": "Dumbbells",
        "videoId": "BC_eDtrB-M4",
        "videoStart": 0,
        "notes": "PDF Option 2: Take controlled strides, sink deep until front thigh is parallel to the ground, and drive through the front heel."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d5_e2",
    "name": "Seated Leg Curl",
    "targetMuscle": "Hamstrings",
    "secondaryMuscles": [
      "Calves",
      "Glutes"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Lean forward over the machine to get a maximum stretch in your hamstrings.",
    "videoId": "yv0aAY7M1mk",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Lying Leg Curl",
        "equipment": "Machines",
        "videoId": "sX4tGtcc62k",
        "videoStart": 0,
        "notes": "PDF Option 1: Curl heels toward glutes with control, squeeze hamstrings at the peak, keep hips down."
      },
      {
        "name": "Nordic Ham Curl",
        "equipment": "Bodyweight",
        "videoId": "fzpYiRtzmFA",
        "videoStart": 0,
        "notes": "PDF Option 2: Control the eccentric descent as far as possible using your hamstrings while keeping hips extended."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d5_e3",
    "name": "DB Bulgarian Split Squat",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Dumbbells",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Lower all the way down until your front thigh is parallel to the ground. Drive through your front heel on the way up.",
    "videoId": "htDXu61MPio",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "DB Step-Up",
        "equipment": "Dumbbells",
        "videoId": "3FNfi_PrP9Y",
        "videoStart": 0,
        "notes": "PDF Option 1: Lean torso slightly forward and drive exclusively through the elevated front heel without pushing off the back foot."
      },
      {
        "name": "Goblet Squat",
        "equipment": "Dumbbells",
        "videoId": "S2agsLlUSII",
        "videoStart": 0,
        "notes": "PDF Option 2: Hold dumbbell tight to chest, elevate heels if needed, and descend into a deep upright quad squat."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d5_e4",
    "name": "Leg Extension",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Set the seat back as far as it will go while still feeling comfortable. Use a 2-3 second negative.",
    "videoId": "uFbNtqP966A",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Reverse Nordic",
        "equipment": "Bodyweight",
        "videoId": "D-kqUKEQZZ0",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep hips locked in line with knees and torso; lean back under strict control to stretch the rectus femoris."
      },
      {
        "name": "Sissy Squat",
        "equipment": "Bodyweight",
        "videoId": "eWAjlO4FWPQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Drive knees forward while leaning torso back in a straight line; use a 2-3 second negative for deep quad stretch."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d5_e5",
    "name": "Machine Hip Adduction",
    "targetMuscle": "Adductors",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Mind-muscle connection with your inner thighs. Push them hard!",
    "videoId": "FMSCZYu1JhE",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Hip Adduction",
        "equipment": "Cables",
        "videoId": "6GYTbv-LtV0",
        "videoStart": 0,
        "notes": "PDF Option 1: Attach ankle cuff and pull leg across midline under strict adductor control with a 2s negative."
      },
      {
        "name": "Copenhagen Hip Adduction",
        "equipment": "Bodyweight",
        "videoId": "QRLGyl5-i4k",
        "videoStart": 0,
        "notes": "PDF Option 2: Support top leg on bench and control hip adduction through full range of motion."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d5_e6",
    "name": "Machine Hip Abduction",
    "targetMuscle": "Glute Medius",
    "secondaryMuscles": [
      "Hips"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "If possible, use pads to increase the range of motion on the machine. Lean forward and grab onto the machine rails to stretch the glutes further.",
    "videoId": "pozooPg6PBE",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Hip Abduction",
        "equipment": "Cables",
        "videoId": "552L1K3Rb_Q",
        "videoStart": 0,
        "notes": "PDF Option 1: Stand side-on to low pulley and sweep working leg out and slightly back to target the glute medius."
      },
      {
        "name": "Lateral Band Walk",
        "equipment": "Bands",
        "videoId": "sOYvvFPYdsU",
        "videoStart": 0,
        "notes": "PDF Option 2: Place resistance band around ankles/knees, stay in an athletic quarter-squat, and take controlled lateral steps."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "N/A",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "f_d5_e7",
    "name": "Standing Calf Raise",
    "targetMuscle": "Calves",
    "secondaryMuscles": [
      "Soleus"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "1-2 second pause at the bottom of each rep. Roll your ankle back and forth on the balls of your feet.",
    "videoId": "6lR2JdxUh7w",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Calf Raise",
        "equipment": "Machines",
        "videoId": "6pfj0G7VKdM",
        "videoStart": 0,
        "notes": "PDF Option 1: Deep stretch at the bottom, explosive contraction at the top. Pause 1 second in the stretched position."
      },
      {
        "name": "Leg Press Calf Press",
        "equipment": "Machines",
        "videoId": "S6DTPNZ_-F4",
        "videoStart": 0,
        "notes": "PDF Option 2: 1-2 second pause at the bottom of each rep. Roll your ankle back and forth on the balls of your feet."
      }
    ],
    "prescriptions": {
      "w1": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w2_5": {
        "sets": 2,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d1_e1",
    "name": "45° Incline DB Press",
    "targetMuscle": "Upper Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Dumbbells",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 240,
    "warmupSets": "2-3",
    "notes": "1 second pause at the bottom of each rep while maintaining tension on the pecs.",
    "videoId": "p2t9daxLpB8",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "45° Incline Barbell Press",
        "equipment": "Barbell",
        "videoId": "vqQ9ok0dEgk",
        "videoStart": 0,
        "notes": "PDF Option 1: 1 second pause at the bottom of each rep while maintaining tension on the pecs."
      },
      {
        "name": "45° Incline Machine Press",
        "equipment": "Machines",
        "videoId": "b8fYnZ-usP0",
        "videoStart": 0,
        "notes": "PDF Option 2: 1 second pause at the bottom of each rep while maintaining constant machine tension on the upper pecs."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 4,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d1_e2",
    "name": "Pec Deck",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Machines",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Focus on bringing your elbows together - not your hands.",
    "videoId": "CI88L1VNvEs",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Crossover Ladder",
        "equipment": "Cables",
        "videoId": "0TP9kVcWGic",
        "videoStart": 0,
        "notes": "PDF Option 1: Do one set with low cable position, one set with medium-height cable position, and one height with a high cable position. If you only have one or two sets, choose the one or two cable positions you prefer."
      },
      {
        "name": "Bottom-Half DB Flye",
        "equipment": "Dumbbells",
        "videoId": "qJzc-iHKGdg",
        "videoStart": 0,
        "notes": "PDF Option 2: All reps and sets are to be performed in the bottom half of the ROM. Focus on feeling a deep stretch in your pecs at the bottom of each rep."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d1_e3",
    "name": "Dual-Handle Lat Pulldown",
    "targetMuscle": "Lats",
    "secondaryMuscles": [
      "Biceps",
      "Rear Delts"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 150,
    "warmupSets": "1-2",
    "notes": "Lean back by ~15° and drive your elbows down as you squeeze your shoulder blades together.",
    "videoId": "NwQ5Ch5t5Vk",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Wide-Grip Lat Pulldown",
        "equipment": "Cables",
        "videoId": "IYXRrYXfVLc",
        "videoStart": 0,
        "notes": "PDF Option 1: 1.5x shoulder-width overhand grip. Slow 2-3 second negative and feel your lats pulling apart on the way down."
      },
      {
        "name": "Wide-Grip Pull-Up",
        "equipment": "Bodyweight",
        "videoId": "yGnp0HU8BnA",
        "videoStart": 0,
        "notes": "PDF Option 2: 1.5x shoulder width overhand grip. Slow 2-3 second negative. Feel your lats pulling apart on the way down."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d1_e4",
    "name": "High-Cable Lateral Raise",
    "targetMuscle": "Lateral Delts",
    "secondaryMuscles": [
      "Traps"
    ],
    "equipment": "Cables",
    "category": "Shoulders",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Focus on squeezing your lateral delt to move the weight.",
    "videoId": "MnMux3Wc0Ac",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "High-Cable Cuffed Lateral Raise",
        "equipment": "Cables",
        "videoId": "8m2jNHBP580",
        "videoStart": 0,
        "notes": "PDF Option 1: Attach cuff at wrist height to remove grip fatigue. Focus on squeezing your lateral delt to move the weight."
      },
      {
        "name": "Lean-In DB Lateral Raise",
        "equipment": "Dumbbells",
        "videoId": "BmYuAG2j2co",
        "videoStart": 0,
        "notes": "PDF Option 2: Lean slightly toward the working arm to maximize tension in the stretched bottom range."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d1_e5",
    "name": "Smith Machine Row",
    "targetMuscle": "Upper Back & Lats",
    "secondaryMuscles": [
      "Rear Delts",
      "Biceps",
      "Erectors"
    ],
    "equipment": "Machines",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "1-2",
    "notes": "Focus on squeezing your shoulder blades together, keeping your elbows at a ~45° angle.",
    "videoId": "Wmivm40AV3Q",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Pendlay Deficit Row",
        "equipment": "Barbell",
        "videoId": "MmuyHKYCLps",
        "videoStart": 0,
        "notes": "PDF Option 1: Stand on a bumper plate. Focus on getting a big stretch and touch your stomach/chest on each rep!"
      },
      {
        "name": "Single-Arm DB Row",
        "equipment": "Dumbbells",
        "videoId": "roKtfQZbxzg",
        "videoStart": 0,
        "notes": "PDF Option 2: Brace non-working hand on bench. Pull dumbbell in an arc toward your hip while stretching the lat at the bottom."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d1_e6",
    "name": "Overhead Cable Triceps Extension (Bar)",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Optionally pause for 0.5-1 second in the stretched aspect of each rep.",
    "videoId": "9_I1PqZAjdA",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Overhead Cable Triceps Extension (Rope)",
        "equipment": "Cables",
        "videoId": "GYoUoVNlbGc",
        "videoStart": 0,
        "notes": "PDF Option 1: Step out for a deep overhead long-head stretch; pause 0.5-1s at the bottom of each rep."
      },
      {
        "name": "DB Skull Crusher",
        "equipment": "Dumbbells",
        "videoId": "fbLTzgTKOR8",
        "videoStart": 0,
        "notes": "PDF Option 2: Lower dumbbells behind head to bias the stretched aspect of the triceps long head; pause 0.5-1s at the bottom."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d1_e7",
    "name": "Bayesian Cable Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "If you have a left-right bicep size imbalance, do these 1 arm at a time, starting with the weaker arm.",
    "videoId": "CWH5J_7kzjM",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Super-Bayesian High Cable Curl",
        "equipment": "Cables",
        "videoId": "jQ9rkfvAbIc",
        "videoStart": 0,
        "notes": "PDF Option 1: Sit facing away from high pulleys so shoulders are extended behind torso for maximum biceps stretch."
      },
      {
        "name": "Incline DB Stretch Curl",
        "equipment": "Dumbbells",
        "videoId": "Z0NIYS9nyoQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Set bench to 45-60°; keep elbows pinned back and let arms hang perpendicular to the floor for a deep stretch."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d2_e1",
    "name": "Lying Leg Curl",
    "targetMuscle": "Hamstrings",
    "secondaryMuscles": [
      "Calves",
      "Glutes"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "2",
    "notes": "Set the machine so that you get the biggest stretch possible at the bottom. Prevent your butt from popping up as you curl.",
    "videoId": "sX4tGtcc62k",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Leg Curl",
        "equipment": "Machines",
        "videoId": "yv0aAY7M1mk",
        "videoStart": 0,
        "notes": "PDF Option 1: Lean forward over the machine to get a maximum stretch in your hamstrings."
      },
      {
        "name": "Nordic Ham Curl",
        "equipment": "Bodyweight",
        "videoId": "fzpYiRtzmFA",
        "videoStart": 0,
        "notes": "PDF Option 2: Control the eccentric descent as far as possible using your hamstrings while keeping hips extended."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d2_e2",
    "name": "Smith Machine Static Lunge w/ Elevated Front Foot",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 240,
    "warmupSets": "2-4",
    "notes": "Elevate your front foot on a small box. Minimize contribution from your back leg.",
    "videoId": "GOqHdmshRKY",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "DB Bulgarian Split Squat",
        "equipment": "Dumbbells",
        "videoId": "htDXu61MPio",
        "videoStart": 0,
        "notes": "PDF Option 1: Lower all the way down until your front thigh is parallel to the ground. Drive through your front heel on the way up."
      },
      {
        "name": "High-Bar Back Squat",
        "equipment": "Machines",
        "videoId": "V-B_Y-OvOTQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Keep torso upright with knees tracking forward over toes to maximize quad knee flexion."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d2_e3",
    "name": "45° Hyperextension",
    "targetMuscle": "Hamstrings & Glutes",
    "secondaryMuscles": [
      "Erectors",
      "Lats"
    ],
    "equipment": "Bodyweight",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "2-4",
    "notes": "Squeeze your glutes hard at the top of each rep. Slow controlled reps on the way down, followed by an explosive positive.",
    "videoId": "lEeCPhlFZig",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Glute-Ham Raise",
        "equipment": "Bodyweight",
        "videoId": "9ksG-O0ZUto",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep hips extended and drive heels into the pad to curl torso up, squeezing glutes and hamstrings hard."
      },
      {
        "name": "Cable Pull-Through",
        "equipment": "Cables",
        "videoId": "eFsNZc69m10",
        "videoStart": 0,
        "notes": "PDF Option 2: Hinge deeply at the hips facing away from the low pulley, then squeeze glutes explosively to lockout."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 4,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d2_e4",
    "name": "Leg Extension",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Set the seat back as far as it will go while still feeling comfortable. Use a 2-3 second negative.",
    "videoId": "uFbNtqP966A",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Reverse Nordic",
        "equipment": "Bodyweight",
        "videoId": "D-kqUKEQZZ0",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep hips locked in line with knees and torso; lean back under strict control to stretch the rectus femoris."
      },
      {
        "name": "Sissy Squat",
        "equipment": "Bodyweight",
        "videoId": "eWAjlO4FWPQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Drive knees forward while leaning torso back in a straight line; use a 2-3 second negative for deep quad stretch."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d2_e5",
    "name": "Leg Press Calf Press",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "1-2 second pause at the bottom of each rep. Roll your ankle back and forth on the balls of your feet.",
    "videoId": "S6DTPNZ_-F4",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Calf Raise",
        "equipment": "Machines",
        "videoId": "6pfj0G7VKdM",
        "videoStart": 0,
        "notes": "PDF Option 1: Deep stretch at the bottom, explosive contraction at the top. Pause 1 second in the stretched position."
      },
      {
        "name": "Standing Calf Raise",
        "equipment": "Machines",
        "videoId": "6lR2JdxUh7w",
        "videoStart": 0,
        "notes": "PDF Option 2: 1-2 second pause at the bottom of each rep. Roll your ankle back and forth on the balls of your feet."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 4,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d2_e6",
    "name": "Machine Crunch",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [
      "Hip Flexors",
      "Obliques"
    ],
    "equipment": "Machines",
    "category": "Core",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Round your lower back as you crunch. Maintain a mind-muscle connection with your 6-pack.",
    "videoId": "K2yKEoazT3g",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Decline Weighted Crunch",
        "equipment": "Machines",
        "videoId": "ZheUsKqU81M",
        "videoStart": 0,
        "notes": "PDF Option 1: Round your upper and lower back as you curl up rather than hinging with straight hips."
      },
      {
        "name": "Cable Crunch",
        "equipment": "Cables",
        "videoId": "epBrpaGHMcg",
        "videoStart": 0,
        "notes": "PDF Option 2: Kneel facing cable, rope behind head. Crunch elbows toward thighs, flex abs, not hips."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d3_e1",
    "name": "Lean-Back Lat Pulldown",
    "targetMuscle": "Lats",
    "secondaryMuscles": [
      "Biceps",
      "Rear Delts"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Initiate the pulldown with a straight up posture. As you pull the bar down, lean back by about 15-30° to get the mid-back more involved.",
    "videoId": "Zjzt4MRbAlc",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Lean-Back Machine Pulldown",
        "equipment": "Cables",
        "videoId": "CrfvmSGfT2c",
        "videoStart": 0,
        "notes": "PDF Option 1: Lean back ~15-30° as you pull handles to upper chest to engage lats and mid-back."
      },
      {
        "name": "Pull-Up",
        "equipment": "Bodyweight",
        "videoId": "5h_NehuTqe4",
        "videoStart": 0,
        "notes": "PDF Option 2 for Lean-Back Lat Pulldown: Match prescribed sets (3), reps (10-12), and RPE."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d3_e2",
    "name": "Chest-Supported T-Bar Row",
    "targetMuscle": "Upper Back & Lats",
    "secondaryMuscles": [
      "Rear Delts",
      "Biceps",
      "Erectors"
    ],
    "equipment": "Machines",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Flare elbows out at roughly 45° and squeeze your shoulder blades together hard at the top of each rep.",
    "videoId": "q8qlHwcuOtc",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Chest-Supported Machine Row",
        "equipment": "Machines",
        "videoId": "ijsSiWSzYw0",
        "videoStart": 0,
        "notes": "PDF Option 1: Flare elbows out at roughly 45° and squeeze your shoulder blades together hard at the top of each rep."
      },
      {
        "name": "Incline Chest-Supported DB Row",
        "equipment": "Dumbbells",
        "videoId": "okCWuhxJEvw",
        "videoStart": 0,
        "notes": "PDF Option 2: Lie chest-down on a 30-45° incline bench; flare elbows ~45° and squeeze shoulder blades hard at the top."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 4,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d3_e3",
    "name": "Dual-Handle Elbows-Out Cable Row",
    "targetMuscle": "Upper Back & Lats",
    "secondaryMuscles": [
      "Rear Delts",
      "Biceps",
      "Erectors"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 150,
    "warmupSets": "1-2",
    "notes": "Flare your elbows out ~45°. Smooth, controlled reps.",
    "videoId": "qryIQcx4cTg",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Arm-Out Single-Arm DB Row",
        "equipment": "Dumbbells",
        "videoId": "1ydRu2K6oHg",
        "videoStart": 0,
        "notes": "PDF Option 1: Flare elbow out at ~45° while rowing to target mid-traps, rhomboids, and rear delts."
      },
      {
        "name": "Meadows Row",
        "equipment": "Machines",
        "videoId": "TwOkRqvcX_c",
        "videoStart": 0,
        "notes": "PDF Option 2: Staggered stance perpendicular to landmine bar; drive elbow out at ~45° for upper back and rear delt thickness."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d3_e4",
    "name": "1-Arm 45° Cable Rear Delt Flye",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Cables",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Pause for 1-2 seconds in the squeeze of each rep. Contract the rear delts hard!",
    "videoId": "6G5DmVaocGM",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Rope Face Pull",
        "equipment": "Cables",
        "videoId": "GhrVM-jPIEA",
        "videoStart": 0,
        "notes": "PDF Option 1: Pull rope toward forehead while externally rotating shoulders into a double-biceps pose; pause 1-2s in the squeeze."
      },
      {
        "name": "Reverse Pec Deck",
        "equipment": "Machines",
        "videoId": "Y8fb_rtEU_4",
        "videoStart": 0,
        "notes": "PDF Option 2: Sweep arms out in a wide arc using the rear delts; pause 1-2s in the contracted position."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d3_e5",
    "name": "Cable Paused Shrug-In",
    "targetMuscle": "Upper Traps",
    "secondaryMuscles": [
      "Forearms",
      "Neck"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "2-3",
    "notes": "Shrug up and in. Think about shrugging 'up to your ears.' 1-2 second pause in the squeeze at the top and in the stretch at the bottom.",
    "videoId": "Hy6f1Lz_PiA",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Machine Shrug",
        "equipment": "Machines",
        "videoId": "ua0XuKwKQ9M",
        "videoStart": 0,
        "notes": "PDF Option 1: Brief pause at the top of the bottom of ROM. Think about pulling your shoulders up to your ears!"
      },
      {
        "name": "DB Shrug",
        "equipment": "Dumbbells",
        "videoId": "moFqLlptX7Q",
        "videoStart": 0,
        "notes": "PDF Option 2: Shrug up and slightly in toward your ears; pause 1s at the top and 1s in the bottom stretch."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d3_e6",
    "name": "Cable Rope Hammer Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Squeeze the rope hard as you curl the weight up. Smooth, controlled reps.",
    "videoId": "TTgICSfj1hY",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "DB Hammer Curl",
        "equipment": "Dumbbells",
        "videoId": "xY3sQXYhk7A",
        "videoStart": 0,
        "notes": "PDF Option 1: Use a neutral palms-facing grip throughout; squeeze the brachialis and brachioradialis at the top."
      },
      {
        "name": "Hammer Preacher Curl",
        "equipment": "Machines",
        "videoId": "dEdnC3ca-Yg",
        "videoStart": 0,
        "notes": "PDF Option 2: Perform with a neutral grip over the preacher pad for strict brachialis isolation."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d3_e7",
    "name": "DB Concentration Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Dumbbells",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "15-20",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Smooth, controlled reps. Mind-muscle connection with the biceps.",
    "videoId": "Oq7gJuAuJh0",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Concentration Cable Curl",
        "equipment": "Cables",
        "videoId": "BFZyW_7ld0c",
        "videoStart": 0,
        "notes": "PDF Option 1: Brace back of upper arm against inner thigh facing low cable for peak biceps contraction."
      },
      {
        "name": "DB Preacher Curl",
        "equipment": "Dumbbells",
        "videoId": "WTkQLAethtg",
        "videoStart": 0,
        "notes": "PDF Option 2: Perform unilaterally on the preacher pad to eliminate left-right strength imbalances."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 1,
        "tech": "N/A",
        "earlyRpe": "N/A",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d4_e1",
    "name": "Machine Chest Press",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Machines",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 240,
    "warmupSets": "2-4",
    "notes": "1 second pause at the bottom of each rep while maintaining tension on the pecs.",
    "videoId": "zDecGJLyVm8",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Barbell Bench Press",
        "equipment": "Barbell",
        "videoId": "nQL5ieH39sw",
        "videoStart": 0,
        "notes": "PDF Option 1: Set up a comfortable arch, quick pause on the chest and explode up on each rep."
      },
      {
        "name": "DB Bench Press",
        "equipment": "Dumbbells",
        "videoId": "zGXvPjlgVkk",
        "videoStart": 0,
        "notes": "PDF Option 2: Set a comfortable arch, lower dumbbells to a deep pec stretch with a brief pause, and press up explosively."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 4,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d4_e2",
    "name": "Seated DB Shoulder Press",
    "targetMuscle": "Front & Lateral Delts",
    "secondaryMuscles": [
      "Triceps",
      "Upper Chest"
    ],
    "equipment": "Dumbbells",
    "category": "Shoulders",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Ensure that your elbows break at least 90°. Mind-muscle connection with your delts. Smooth, controlled reps.",
    "videoId": "B8PB5RPhTWQ",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Shoulder Press",
        "equipment": "Cables",
        "videoId": "OfjncdW_Vyc",
        "videoStart": 0,
        "notes": "PDF Option 1: Set dual cables at shoulder height; ensure elbows break at least 90° at the bottom for full deltoid stretch."
      },
      {
        "name": "Machine Shoulder Press",
        "equipment": "Machines",
        "videoId": "SCQVmN1gYsk",
        "videoStart": 0,
        "notes": "PDF Option 2: Ensure that your elbows break at least 90°. Mind-muscle connection with your delts. Smooth, controlled reps."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d4_e3",
    "name": "Bottom-Half Seated Cable Flye",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Cables",
    "category": "Chest",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "All reps and sets are to be performed in the bottom half of the ROM. Focus on feeling a deep stretch in your pecs at the bottom of each rep.",
    "videoId": "tsJMV9Gxw-o",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Bottom-Half DB Flye",
        "equipment": "Dumbbells",
        "videoId": "qJzc-iHKGdg",
        "videoStart": 0,
        "notes": "PDF Option 1: All reps and sets are to be performed in the bottom half of the ROM. Focus on feeling a deep stretch in your pecs at the bottom of each rep."
      },
      {
        "name": "Low-to-High Cable Crossover",
        "equipment": "Cables",
        "videoId": "1LhGmhVFe2Y",
        "videoStart": 0,
        "notes": "PDF Option 2: Perform reps in the bottom/stretched half of the range of motion, focusing on a deep pec stretch."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d4_e4",
    "name": "High-Cable Lateral Raise",
    "targetMuscle": "Lateral Delts",
    "secondaryMuscles": [
      "Traps"
    ],
    "equipment": "Cables",
    "category": "Shoulders",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Focus on squeezing your lateral delt to move the weight.",
    "videoId": "MnMux3Wc0Ac",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "High-Cable Cuffed Lateral Raise",
        "equipment": "Cables",
        "videoId": "8m2jNHBP580",
        "videoStart": 0,
        "notes": "PDF Option 1: Attach cuff at wrist height to remove grip fatigue. Focus on squeezing your lateral delt to move the weight."
      },
      {
        "name": "Lean-In DB Lateral Raise",
        "equipment": "Dumbbells",
        "videoId": "BmYuAG2j2co",
        "videoStart": 0,
        "notes": "PDF Option 2: Lean slightly toward the working arm to maximize tension in the stretched bottom range."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d4_e5",
    "name": "EZ-Bar Skull Crusher",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Barbell",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Optionally pause for 0.5-1 second in the stretched aspect of each rep.",
    "videoId": "oDKGCsTjAk8",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "DB Skull Crusher",
        "equipment": "Dumbbells",
        "videoId": "fbLTzgTKOR8",
        "videoStart": 0,
        "notes": "PDF Option 1: Lower dumbbells behind head to bias the stretched aspect of the triceps long head; pause 0.5-1s at the bottom."
      },
      {
        "name": "Katana Triceps Extension",
        "equipment": "Cables",
        "videoId": "R7f45Mv7yyg",
        "videoStart": 0,
        "notes": "PDF Option 2: Cross dual high cables behind head and extend overhead for an elite long-head stretch."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d4_e6",
    "name": "Triceps Pressdown (Bar)",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 2,
    "defaultReps": "15-20",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Focus on squeezing your triceps to move the weight.",
    "videoId": "o4eazahiXQw",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Triceps Pressdown (Rope)",
        "equipment": "Cables",
        "videoId": "bCa036rGtVU",
        "videoStart": 0,
        "notes": "PDF Option 1: Spread the rope ends apart at the bottom of each rep and squeeze triceps hard."
      },
      {
        "name": "DB Triceps Kickback",
        "equipment": "Dumbbells",
        "videoId": "YdUUYFgpA7g",
        "videoStart": 0,
        "notes": "PDF Option 2: Keep upper arm locked parallel to the floor and behind torso at peak contraction for maximal triceps shortening."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 1,
        "tech": "N/A",
        "earlyRpe": "N/A",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d4_e7",
    "name": "Ab Wheel Rollout",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [
      "Hip Flexors",
      "Obliques"
    ],
    "equipment": "Bodyweight",
    "category": "Core",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Don't just bend at your hips, use your abs to lower yourself down under control and pull yourself back up.",
    "videoId": "gGTgyCU9gcg",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Swiss Ball Rollout",
        "equipment": "Bodyweight",
        "videoId": "FvekMyIs-yk",
        "videoStart": 0,
        "notes": "PDF Option 1: Roll forearms forward on stability ball while keeping ribs tucked and glutes braced; pull back using abs."
      },
      {
        "name": "Long-Lever Plank",
        "equipment": "Bodyweight",
        "videoId": "9rFS1gg0vJM",
        "videoStart": 0,
        "notes": "PDF Option 2: Place elbows further forward than shoulders and tuck pelvis posteriorly for high rectus abdominis tension."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d5_e1",
    "name": "Hack Squat",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 150,
    "warmupSets": "2-4",
    "notes": "Use a controlled negative (don't free fall) and then explode on the positive.",
    "videoId": "TWUnnDK8rck",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Leg Press",
        "equipment": "Machines",
        "videoId": "1yKAQLVV_XI",
        "videoStart": 0,
        "notes": "PDF Option 1: Feet lower on the platform for more quad focus. Get as deep as you can without excessive back rounding."
      },
      {
        "name": "DB Walking Lunge",
        "equipment": "Dumbbells",
        "videoId": "BC_eDtrB-M4",
        "videoStart": 0,
        "notes": "PDF Option 2: Take controlled strides, sink deep until front thigh is parallel to the ground, and drive through the front heel."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 4,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d5_e2",
    "name": "Seated Leg Curl",
    "targetMuscle": "Hamstrings",
    "secondaryMuscles": [
      "Calves",
      "Glutes"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Lean forward over the machine to get a maximum stretch in your hamstrings.",
    "videoId": "yv0aAY7M1mk",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Lying Leg Curl",
        "equipment": "Machines",
        "videoId": "sX4tGtcc62k",
        "videoStart": 0,
        "notes": "PDF Option 1: Curl heels toward glutes with control, squeeze hamstrings at the peak, keep hips down."
      },
      {
        "name": "Nordic Ham Curl",
        "equipment": "Bodyweight",
        "videoId": "fzpYiRtzmFA",
        "videoStart": 0,
        "notes": "PDF Option 2: Control the eccentric descent as far as possible using your hamstrings while keeping hips extended."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 4,
        "tech": "Failure + LLPs (Extend set)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d5_e3",
    "name": "Walking Lunge",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "10-12",
    "defaultRestSec": 150,
    "warmupSets": "2-3",
    "notes": "Take medium strides. Minimize contribution from the back leg.",
    "videoId": "BC_eDtrB-M4",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Smith Machine Static Lunge",
        "equipment": "Machines",
        "videoId": "SEjKxJGg_C8",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep stance fixed and drive front knee forward over toes; minimize contribution from the back leg."
      },
      {
        "name": "DB Static Lunge",
        "equipment": "Dumbbells",
        "videoId": "hci6iKFtTkg",
        "videoStart": 0,
        "notes": "PDF Option 2: Maintain stationary split stance and lower straight down with minimal back-leg assistance."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~6-7",
        "lastRpe": "~7-8"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d5_e4",
    "name": "Leg Extension",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Glutes",
      "Adductors",
      "Core"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Set the seat back as far as it will go while still feeling comfortable. Use a 2-3 second negative.",
    "videoId": "uFbNtqP966A",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Reverse Nordic",
        "equipment": "Bodyweight",
        "videoId": "D-kqUKEQZZ0",
        "videoStart": 0,
        "notes": "PDF Option 1: Keep hips locked in line with knees and torso; lean back under strict control to stretch the rectus femoris."
      },
      {
        "name": "Sissy Squat",
        "equipment": "Bodyweight",
        "videoId": "eWAjlO4FWPQ",
        "videoStart": 0,
        "notes": "PDF Option 2: Drive knees forward while leaning torso back in a straight line; use a 2-3 second negative for deep quad stretch."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Myo-reps",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d5_e5",
    "name": "Machine Hip Adduction",
    "targetMuscle": "Adductors",
    "secondaryMuscles": [
      "Glutes"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "Mind-muscle connection with your inner thighs. Push them hard!",
    "videoId": "FMSCZYu1JhE",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Hip Adduction",
        "equipment": "Cables",
        "videoId": "6GYTbv-LtV0",
        "videoStart": 0,
        "notes": "PDF Option 1: Attach ankle cuff and pull leg across midline under strict adductor control with a 2s negative."
      },
      {
        "name": "Copenhagen Hip Adduction",
        "equipment": "Bodyweight",
        "videoId": "QRLGyl5-i4k",
        "videoStart": 0,
        "notes": "PDF Option 2: Support top leg on bench and control hip adduction through full range of motion."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d5_e6",
    "name": "Machine Hip Abduction",
    "targetMuscle": "Glute Medius",
    "secondaryMuscles": [
      "Hips"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "If possible, use pads to increase the range of motion on the machine. Lean forward and grab onto the machine rails to stretch the glutes further.",
    "videoId": "pozooPg6PBE",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Cable Hip Abduction",
        "equipment": "Cables",
        "videoId": "552L1K3Rb_Q",
        "videoStart": 0,
        "notes": "PDF Option 1: Stand side-on to low pulley and sweep working leg out and slightly back to target the glute medius."
      },
      {
        "name": "Lateral Band Walk",
        "equipment": "Bands",
        "videoId": "sOYvvFPYdsU",
        "videoStart": 0,
        "notes": "PDF Option 2: Place resistance band around ankles/knees, stay in an athletic quarter-squat, and take controlled lateral steps."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Failure",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "r_d5_e7",
    "name": "Standing Calf Raise",
    "targetMuscle": "Calves",
    "secondaryMuscles": [
      "Soleus"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 2,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1-2",
    "notes": "1-2 second pause at the bottom of each rep. Roll your ankle back and forth on the balls of your feet.",
    "videoId": "6lR2JdxUh7w",
    "videoStart": 0,
    "substitutions": [
      {
        "name": "Seated Calf Raise",
        "equipment": "Machines",
        "videoId": "6pfj0G7VKdM",
        "videoStart": 0,
        "notes": "PDF Option 1: Deep stretch at the bottom, explosive contraction at the top. Pause 1 second in the stretched position."
      },
      {
        "name": "Leg Press Calf Press",
        "equipment": "Machines",
        "videoId": "S6DTPNZ_-F4",
        "videoStart": 0,
        "notes": "PDF Option 2: 1-2 second pause at the bottom of each rep. Roll your ankle back and forth on the balls of your feet."
      }
    ],
    "prescriptions": {
      "w6": {
        "sets": 2,
        "tech": "N/A",
        "earlyRpe": "~7-8",
        "lastRpe": "~8-9"
      },
      "w7_8": {
        "sets": 2,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w9_10": {
        "sets": 3,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      },
      "w11_12": {
        "sets": 3,
        "tech": "Static Stretch (30s)",
        "earlyRpe": "~8-9",
        "lastRpe": "10"
      }
    }
  },
  {
    "id": "ex-hevy-flat-bb-bench",
    "name": "Flat Barbell Bench Press",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Barbell",
    "category": "Chest",
    "defaultSets": 4,
    "defaultReps": "6-8",
    "defaultRestSec": 240,
    "warmupSets": "2-3",
    "notes": "Arch slightly, retract shoulder blades, and lower to mid-chest with elbows tucked at ~45°.",
    "videoId": "qRynN-iQzBc",
    "substitutions": [
      {
        "name": "Flat Dumbbell Bench Press",
        "equipment": "Dumbbells",
        "videoId": "lRCvigjzACS",
        "notes": "Converge dumbbells slightly at the top for a deeper pec squeeze."
      }
    ]
  },
  {
    "id": "ex-hevy-incline-db-press",
    "name": "Incline Dumbbell Press",
    "targetMuscle": "Upper Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Dumbbells",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 120,
    "warmupSets": "2",
    "notes": "Set bench to 30-45°. Touch dumbbells to upper chest, press straight up over shoulders.",
    "videoId": "R2rjPUJXX1Y"
  },
  {
    "id": "ex-hevy-machine-chest-press",
    "name": "Machine Chest Press",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Machines",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Constant tension throughout; stop just short of lockout to keep load on the pecs.",
    "videoId": "ybjYVH56FT0"
  },
  {
    "id": "ex-hevy-cable-flye",
    "name": "Cable Flye (Crossover)",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Front Delts"
    ],
    "equipment": "Cables",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Hug a tree — bring elbows together, not hands. Squeeze pecs hard for 1 second at peak contraction.",
    "videoId": "0TP9kVcWGic"
  },
  {
    "id": "ex-hevy-weighted-dip",
    "name": "Dip (Weighted / Bodyweight)",
    "targetMuscle": "Mid & Lower Chest",
    "secondaryMuscles": [
      "Triceps",
      "Front Delts"
    ],
    "equipment": "Bodyweight",
    "category": "Chest",
    "defaultSets": 3,
    "defaultReps": "8-12",
    "defaultRestSec": 150,
    "warmupSets": "1",
    "notes": "Lean forward to emphasize chest; lower until shoulders are below elbows, press up explosively.",
    "videoId": "D1RjP9P4Z7g"
  },
  {
    "id": "ex-hevy-conventional-deadlift",
    "name": "Conventional Deadlift",
    "targetMuscle": "Hamstrings & Glutes",
    "secondaryMuscles": [
      "Lats",
      "Traps",
      "Quadriceps"
    ],
    "equipment": "Barbell",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "5-8",
    "defaultRestSec": 300,
    "warmupSets": "3-4",
    "notes": "Hip height slightly lower than shoulders. Pull the slack out of the bar, drive through the floor, lock out hips at the top.",
    "videoId": "d2zh8jJvZ1U"
  },
  {
    "id": "ex-hevy-sumo-deadlift",
    "name": "Sumo Deadlift",
    "targetMuscle": "Hamstrings & Glutes",
    "secondaryMuscles": [
      "Quadriceps",
      "Lats",
      "Traps"
    ],
    "equipment": "Barbell",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "5-8",
    "defaultRestSec": 300,
    "warmupSets": "3-4",
    "notes": "Wide stance with toes out, grip inside knees. Keep chest up and drive hips forward at lockout.",
    "videoId": "JbSgWhOrSuA"
  },
  {
    "id": "ex-hevy-t-bar-row",
    "name": "T-Bar Row",
    "targetMuscle": "Lats",
    "secondaryMuscles": [
      "Upper Back & Lats",
      "Rear Delts",
      "Biceps"
    ],
    "equipment": "Barbell",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 180,
    "warmupSets": "2",
    "notes": "Brace core, pull through elbows toward the belly button, squeeze shoulder blades at the top.",
    "videoId": "yCmNuqtsW2w"
  },
  {
    "id": "ex-hevy-chin-up",
    "name": "Chin-Up",
    "targetMuscle": "Lats",
    "secondaryMuscles": [
      "Biceps",
      "Rear Delts"
    ],
    "equipment": "Bodyweight",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "6-12",
    "defaultRestSec": 180,
    "warmupSets": "1",
    "notes": "Underhand grip shoulder-width. Pull chin over bar, lower under full control to a dead hang.",
    "videoId": "yGnp0HU8BnA"
  },
  {
    "id": "ex-hevy-face-pull",
    "name": "Face Pull",
    "targetMuscle": "Rear Delts",
    "secondaryMuscles": [
      "Upper Back & Lats"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "15-20",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Rope attachment at forehead height. Pull to the forehead with thumbs back, externally rotate at the peak.",
    "videoId": "hzq2LtfNHso"
  },
  {
    "id": "ex-hevy-seated-cable-row",
    "name": "Seated Cable Row",
    "targetMuscle": "Upper Back & Lats",
    "secondaryMuscles": [
      "Rear Delts",
      "Biceps"
    ],
    "equipment": "Cables",
    "category": "Back",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 120,
    "warmupSets": "1",
    "notes": "Keep torso stable, pull handle to lower sternum, squeeze shoulder blades together.",
    "videoId": "Fdv0tNtyNhc"
  },
  {
    "id": "ex-hevy-barbell-hip-thrust",
    "name": "Barbell Hip Thrust",
    "targetMuscle": "Hamstrings & Glutes",
    "secondaryMuscles": [
      "Quadriceps"
    ],
    "equipment": "Barbell",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 240,
    "warmupSets": "2",
    "notes": "Upper back on bench, bar across hips. Drive through heels, squeeze glutes hard at full hip extension.",
    "videoId": "82cW6fOZVdY"
  },
  {
    "id": "ex-hevy-bulgarian-split-squat",
    "name": "Bulgarian Split Squat",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Hamstrings & Glutes"
    ],
    "equipment": "Dumbbells",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 120,
    "warmupSets": "1",
    "notes": "Rear foot elevated on bench. Drop back knee straight down, keep front shin vertical.",
    "videoId": "DN5c_-PSOT0"
  },
  {
    "id": "ex-hevy-seated-calf-raise",
    "name": "Seated Calf Raise",
    "targetMuscle": "Calves",
    "secondaryMuscles": [],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 4,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Deep stretch at the bottom, explosive contraction at the top. Pause 1 second in the stretched position.",
    "videoId": "S6DTPNZ_-F4"
  },
  {
    "id": "ex-hevy-leg-extension",
    "name": "Leg Extension",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Squeeze quads hard at full extension, lower slowly. Keep hips pinned to the seat.",
    "videoId": "c4fRXG5g_sY"
  },
  {
    "id": "ex-hevy-leg-curl",
    "name": "Lying Leg Curl",
    "targetMuscle": "Hamstrings",
    "secondaryMuscles": [
      "Calves"
    ],
    "equipment": "Machines",
    "category": "Legs",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Curl heels toward glutes with control, squeeze hamstrings at the peak, keep hips down.",
    "videoId": "i0jhN20X92M"
  },
  {
    "id": "ex-hevy-db-lateral-raise",
    "name": "Dumbbell Lateral Raise",
    "targetMuscle": "Lateral Delts",
    "secondaryMuscles": [
      "Front Delts"
    ],
    "equipment": "Dumbbells",
    "category": "Shoulders",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Lead with elbows, not hands. Lift to shoulder height, slight forward lean to keep tension on lateral delts.",
    "videoId": "BmYuAG2j2co"
  },
  {
    "id": "ex-hevy-rear-delt-flye",
    "name": "Dumbbell Rear Delt Flye",
    "targetMuscle": "Rear Delts",
    "secondaryMuscles": [
      "Upper Back & Lats"
    ],
    "equipment": "Dumbbells",
    "category": "Shoulders",
    "defaultSets": 3,
    "defaultReps": "15-20",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Hinge at hips, chest toward floor. Arc dumbbells out to the sides like spreading wings.",
    "videoId": "TcPsz4q1Y2I"
  },
  {
    "id": "ex-hevy-overhead-db-press",
    "name": "Seated Dumbbell Shoulder Press",
    "targetMuscle": "Front & Lateral Delts",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": "Dumbbells",
    "category": "Shoulders",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 150,
    "warmupSets": "2",
    "notes": "Back pressed to pad, press dumbbells overhead without clashing at the top, lower to ear level.",
    "videoId": "UNyAlnKaX4s"
  },
  {
    "id": "ex-hevy-band-pull-apart",
    "name": "Band Pull-Apart",
    "targetMuscle": "Rear Delts",
    "secondaryMuscles": [
      "Upper Back & Lats"
    ],
    "equipment": "Bands",
    "category": "Shoulders",
    "defaultSets": 3,
    "defaultReps": "20-25",
    "defaultRestSec": 45,
    "warmupSets": "1",
    "notes": "Arms straight at shoulder height, pull band apart until it touches your chest, squeeze shoulder blades.",
    "videoId": "nDWYD-vfs4U"
  },
  {
    "id": "ex-hevy-preacher-curl",
    "name": "Preacher Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Barbell",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Arms locked against pad, curl without swinging. Lower fully to stretch the biceps at the bottom.",
    "videoId": "fx0rfn2aoIs"
  },
  {
    "id": "ex-hevy-incline-db-curl",
    "name": "Incline Dumbbell Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [],
    "equipment": "Dumbbells",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Bench at 45°, let arms hang back for a deep biceps stretch. Supinate wrists as you curl.",
    "videoId": "qyyjqk-FjvE"
  },
  {
    "id": "ex-hevy-cable-triceps-pushdown",
    "name": "Cable Triceps Pushdown",
    "targetMuscle": "Triceps",
    "secondaryMuscles": [],
    "equipment": "Cables",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "12-15",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Tuck elbows at sides, push down until arms are straight, squeeze triceps at the bottom.",
    "videoId": "P8hSZm12tjQ"
  },
  {
    "id": "ex-hevy-hammer-curl",
    "name": "Dumbbell Hammer Curl",
    "targetMuscle": "Biceps",
    "secondaryMuscles": [
      "Forearms"
    ],
    "equipment": "Dumbbells",
    "category": "Arms",
    "defaultSets": 3,
    "defaultReps": "10-12",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Neutral grip throughout, curl across body slightly, keep elbows pinned at sides.",
    "videoId": "1cMN7RYxKpg"
  },
  {
    "id": "ex-hevy-hanging-leg-raise",
    "name": "Hanging Leg Raise",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [],
    "equipment": "Bodyweight",
    "category": "Core",
    "defaultSets": 3,
    "defaultReps": "10-15",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Hang from bar, lift legs to at least 90°, lower under control without swinging.",
    "videoId": "XuLB7BkXpW8"
  },
  {
    "id": "ex-hevy-cable-crunch",
    "name": "Cable Crunch",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [],
    "equipment": "Cables",
    "category": "Core",
    "defaultSets": 3,
    "defaultReps": "15-20",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Kneel facing cable, rope behind head. Crunch elbows toward thighs, flex abs, not hips.",
    "videoId": "n8Nypx6nrLs"
  },
  {
    "id": "ex-hevy-plank",
    "name": "Plank",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [],
    "equipment": "Bodyweight",
    "category": "Core",
    "defaultSets": 3,
    "defaultReps": "45-60s",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Forearms on floor, body in straight line from head to heels. Brace abs and glutes, don't let hips sag.",
    "videoId": "ijGdi_LeAXU"
  },
  {
    "id": "ex-hevy-assault-bike",
    "name": "Assault Bike Intervals",
    "targetMuscle": "Full Body",
    "secondaryMuscles": [],
    "equipment": "Machines",
    "category": "Cardio",
    "defaultSets": 8,
    "defaultReps": "20s",
    "defaultRestSec": 40,
    "warmupSets": "1",
    "notes": "20 seconds all-out sprint, 40 seconds easy recovery. Move both arms and legs aggressively.",
    "videoId": "kjq9R1O4Ssk"
  },
  {
    "id": "ex-hevy-rowing-intervals",
    "name": "Rowing Intervals",
    "targetMuscle": "Full Body",
    "secondaryMuscles": [],
    "equipment": "Machines",
    "category": "Cardio",
    "defaultSets": 6,
    "defaultReps": "500m",
    "defaultRestSec": 120,
    "warmupSets": "1",
    "notes": "Legs-core-arms on the drive, reverse on recovery. Hold a strong split time per 500m.",
    "videoId": "LfHg-G8EYTk"
  },
  {
    "id": "ex-hevy-farmers-walk",
    "name": "Farmer's Walk",
    "targetMuscle": "Traps",
    "secondaryMuscles": [
      "Core & Abs",
      "Forearms"
    ],
    "equipment": "Dumbbells",
    "category": "Full Body",
    "defaultSets": 4,
    "defaultReps": "40m",
    "defaultRestSec": 120,
    "warmupSets": "1",
    "notes": "Heavy dumbbells in each hand, shoulders tall, core braced. Walk in a straight line with short, quick steps.",
    "videoId": "38bLyyS5z4w"
  },
  {
    "id": "ex-hevy-thruster",
    "name": "Barbell Thruster",
    "targetMuscle": "Quadriceps",
    "secondaryMuscles": [
      "Front & Lateral Delts",
      "Triceps"
    ],
    "equipment": "Barbell",
    "category": "Full Body",
    "defaultSets": 3,
    "defaultReps": "8-10",
    "defaultRestSec": 180,
    "warmupSets": "2",
    "notes": "Front squat into an overhead press in one fluid motion. Breathe out at lockout.",
    "videoId": "yQ0HT2xeW6k"
  },
  {
    "id": "ex-hevy-kb-swing",
    "name": "Kettlebell Swing",
    "targetMuscle": "Hamstrings & Glutes",
    "secondaryMuscles": [
      "Core & Abs"
    ],
    "equipment": "Kettlebell",
    "category": "Full Body",
    "defaultSets": 3,
    "defaultReps": "15-20",
    "defaultRestSec": 60,
    "warmupSets": "1",
    "notes": "Hinge at hips, snap hips forward to swing kettlebell to chest height. Arms stay relaxed.",
    "videoId": "6uH9JXV6dvw"
  },
  {
    "id": "ex-hevy-burpee",
    "name": "Burpee",
    "targetMuscle": "Core & Abs",
    "secondaryMuscles": [
      "Quadriceps",
      "Front & Lateral Delts"
    ],
    "equipment": "Bodyweight",
    "category": "Cardio",
    "defaultSets": 4,
    "defaultReps": "10-15",
    "defaultRestSec": 90,
    "warmupSets": "1",
    "notes": "Drop to floor, chest to deck, jump feet back in, explode up with hands overhead.",
    "videoId": "T-9DD0NRKpw"
  }
];
