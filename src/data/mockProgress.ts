import {
  VolumeHistoryPoint,
  StrengthHistoryPoint,
  BodyWeightPoint,
  PersonalRecord
} from '../types';

export const mockVolumeData: VolumeHistoryPoint[] = [
  { date: 'Oct 02', volume: 14200, label: 'W1' },
  { date: 'Oct 09', volume: 15800, label: 'W2' },
  { date: 'Oct 16', volume: 16950, label: 'W3' },
  { date: 'Oct 23', volume: 18400, label: 'W4' },
  { date: 'Oct 30', volume: 19800, label: 'W5' },
  { date: 'Nov 06', volume: 12200, label: 'W6 (Deload)' },
  { date: 'Nov 13', volume: 20400, label: 'W7' },
  { date: 'Nov 20', volume: 21900, label: 'W8' }
];

export const mockStrengthData: StrengthHistoryPoint[] = [
  { date: 'Oct 02', estimated1RM: 102.5, weight: 85, reps: 7 },
  { date: 'Oct 16', estimated1RM: 106.0, weight: 87.5, reps: 7 },
  { date: 'Oct 30', estimated1RM: 110.0, weight: 90, reps: 7 },
  { date: 'Nov 13', estimated1RM: 114.5, weight: 92.5, reps: 8 },
  { date: 'Nov 20', estimated1RM: 117.5, weight: 95, reps: 8 }
];

export const mockBodyWeightData: BodyWeightPoint[] = [
  { date: 'Oct 01', weight: 81.2 },
  { date: 'Oct 08', weight: 81.0 },
  { date: 'Oct 15', weight: 80.6 },
  { date: 'Oct 22', weight: 80.4 },
  { date: 'Oct 29', weight: 80.1 },
  { date: 'Nov 05', weight: 79.8 },
  { date: 'Nov 12', weight: 79.5 },
  { date: 'Nov 19', weight: 79.2 }
];

export const mockPersonalRecords: PersonalRecord[] = [
  {
    id: 'pr-1',
    exerciseName: '45° Incline Barbell Press',
    metric: 'Estimated 1RM',
    value: '117.5 kg',
    previousValue: '112.5 kg',
    date: '3 days ago'
  },
  {
    id: 'pr-2',
    exerciseName: 'High-Bar Olympic Back Squat',
    metric: 'Max 8-Rep Volume',
    value: '140.0 kg × 8',
    previousValue: '135.0 kg × 8',
    date: 'Last week'
  },
  {
    id: 'pr-3',
    exerciseName: 'Dual-Handle Neutral Lat Pulldown',
    metric: 'Top Working Set',
    value: '86.0 kg × 10',
    previousValue: '82.0 kg × 9',
    date: '2 weeks ago'
  },
  {
    id: 'pr-4',
    exerciseName: 'Behind-the-Back Cable Lateral Raise',
    metric: 'Continuous Tension PR',
    value: '16.0 kg × 15',
    previousValue: '14.0 kg × 15',
    date: '3 weeks ago'
  }
];
