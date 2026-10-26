import { ScheduledDay } from '../types';
import { initialWorkouts } from './workouts';

export const initialScheduleDays: ScheduledDay[] = [
  {
    id: 'plan-mon',
    date: '2026-10-20',
    dayName: 'Mon',
    dayNumber: 20,
    workout: initialWorkouts[0], // Push Power
    isRestDay: false,
    isCompleted: true,
    time: '07:30 AM'
  },
  {
    id: 'plan-tue',
    date: '2026-10-21',
    dayName: 'Tue',
    dayNumber: 21,
    workout: initialWorkouts[1], // Pull Density
    isRestDay: false,
    isCompleted: true,
    time: '06:00 PM'
  },
  {
    id: 'plan-wed',
    date: '2026-10-22',
    dayName: 'Wed',
    dayNumber: 22,
    isRestDay: true,
    isCompleted: true,
    time: 'Rest & Mobility'
  },
  {
    id: 'plan-thu',
    date: '2026-10-23',
    dayName: 'Thu',
    dayNumber: 23,
    workout: initialWorkouts[2], // Legs Quad
    isRestDay: false,
    isCompleted: true,
    time: '07:00 AM'
  },
  {
    id: 'plan-fri',
    date: '2026-10-24',
    dayName: 'Fri',
    dayNumber: 24,
    workout: initialWorkouts[0], // Today: Push Power
    isRestDay: false,
    isCompleted: false,
    time: '05:30 PM'
  },
  {
    id: 'plan-sat',
    date: '2026-10-25',
    dayName: 'Sat',
    dayNumber: 25,
    workout: initialWorkouts[4], // Shoulders & Arms
    isRestDay: false,
    isCompleted: false,
    time: '10:00 AM'
  },
  {
    id: 'plan-sun',
    date: '2026-10-26',
    dayName: 'Sun',
    dayNumber: 26,
    isRestDay: true,
    isCompleted: false,
    time: 'Active Recovery Walk'
  }
];
