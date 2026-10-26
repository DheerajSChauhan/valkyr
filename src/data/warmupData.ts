export interface WarmupDrill {
  name: string;
  prescription: string;
  yt: {
    id: string;
    start: number;
    url: string;
  } | null;
}

export interface WarmupPyramid {
  sets: string;
  guide: string;
}

export const warmupData: {
  general: WarmupDrill[];
  pyramids: WarmupPyramid[];
} = {
  "general": [
    {
      "name": "Light Cardio (Treadmill, Stairmaster, Bike, Elliptical)",
      "prescription": "5-10 minutes",
      "yt": null
    },
    {
      "name": "Arm Swings",
      "prescription": "10 reps per side",
      "yt": {
        "id": "tFpwBr_7KPg",
        "start": 0,
        "url": "https://youtu.be/tFpwBr_7KPg?si=mC4_uHgulB38cPTK"
      }
    },
    {
      "name": "Arm Circles",
      "prescription": "10 reps per side",
      "yt": {
        "id": "tFpwBr_7KPg",
        "start": 10,
        "url": "https://youtu.be/tFpwBr_7KPg?si=2XC3Xw4zdmYLN-av&t=10"
      }
    },
    {
      "name": "Front-to-Back Leg Swings",
      "prescription": "10 reps per side",
      "yt": {
        "id": "tFpwBr_7KPg",
        "start": 19,
        "url": "https://youtu.be/tFpwBr_7KPg?si=uNAUqjL5XMXxelBw&t=19"
      }
    },
    {
      "name": "Side-to-Side Leg Swings",
      "prescription": "10 reps per side",
      "yt": {
        "id": "tFpwBr_7KPg",
        "start": 28,
        "url": "https://youtu.be/tFpwBr_7KPg?si=0T63q37dQLKi118I&t=28"
      }
    },
    {
      "name": "Cable External Rotation (Optional)",
      "prescription": "15 reps per side",
      "yt": {
        "id": "tFpwBr_7KPg",
        "start": 39,
        "url": "https://youtu.be/tFpwBr_7KPg?si=Rw3RDb-N8V4Dm5yI&t=39"
      }
    }
  ],
  "pyramids": [
    {
      "sets": "1 Warm-Up Set",
      "guide": "~60% of planned working weight for ~6-10 reps (or until warm and loose)"
    },
    {
      "sets": "2 Warm-Up Sets",
      "guide": "Set #1: ~50% x 6-10 reps | Set #2: ~70% x 4-6 reps"
    },
    {
      "sets": "3 Warm-Up Sets",
      "guide": "Set #1: ~45% x 6-10 | Set #2: ~65% x 4-6 | Set #3: ~85% x 3-4 reps"
    },
    {
      "sets": "4 Warm-Up Sets",
      "guide": "Set #1: ~45% x 6-10 | Set #2: ~60% x 4-6 | Set #3: ~75% x 3-5 | Set #4: ~85% x 2-4 reps"
    }
  ]
};
