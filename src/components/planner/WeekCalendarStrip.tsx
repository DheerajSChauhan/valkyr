import React from 'react';
import { ScheduledDay } from '../../types';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface WeekCalendarStripProps {
  days: ScheduledDay[];
  selectedDayId: string;
  onSelectDay: (id: string) => void;
  currentWeekLabel?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
}

export const WeekCalendarStrip: React.FC<WeekCalendarStripProps> = ({
  days,
  selectedDayId,
  onSelectDay,
  currentWeekLabel = 'October 20 – 26',
  onPrevWeek,
  onNextWeek
}) => {
  return (
    <div className="space-y-3">
      {/* Week Title & Arrows */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={onPrevWeek}
          className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-[#929895] hover:text-white"
          title="Previous Week"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
          {currentWeekLabel}
        </h3>

        <button
          type="button"
          onClick={onNextWeek}
          className="btn-glass-subtle w-8 h-8 rounded-full flex items-center justify-center text-[#929895] hover:text-white"
          title="Next Week"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Day Track */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar py-1">
        {days.map(day => {
          const isSelected = day.id === selectedDayId;

          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onSelectDay(day.id)}
              className={`flex-1 min-w-[44px] py-2.5 rounded-[18px] flex flex-col items-center justify-center transition-all duration-200 border ${
                isSelected
                  ? 'bg-[#C7FF3D]/15 border-[#C7FF3D] text-[#C7FF3D] shadow-lg shadow-[#C7FF3D]/20 -translate-y-0.5'
                  : 'bg-[#1C1F20]/70 border-white/[0.08] text-[#929895] hover:border-white/20'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">{day.dayName}</span>
              <span className={`text-sm font-black tabular-nums mt-1 ${isSelected ? 'text-[#C7FF3D]' : 'text-white'}`}>
                {day.dayNumber}
              </span>

              {/* Status Ring / Indicator */}
              <div className="mt-1.5 w-4 h-4 rounded-full flex items-center justify-center">
                {day.isCompleted ? (
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C7FF3D] flex items-center justify-center text-[#101112]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                ) : day.isRestDay ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
                ) : (
                  <div className={`w-3 h-3 rounded-full border border-dashed ${isSelected ? 'border-[#C7FF3D]' : 'border-white/30'}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
