import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { ScreenId } from '../../types';
import { Home, Dumbbell, Calendar, TrendingUp, Users, User } from 'lucide-react';

interface NavItem {
  id: ScreenId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'workouts', label: 'Workouts', icon: Dumbbell },
  { id: 'planner', label: 'Planner', icon: Calendar },
  { id: 'progress', label: 'Analytics', icon: TrendingUp },
  { id: 'community', label: 'Social', icon: Users },
  { id: 'profile', label: 'Profile', icon: User }
];

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useFitness();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-24px)] max-w-lg obsidian-bottom-nav px-2.5 py-2 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentScreen(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'text-[#C7FF3D]'
                  : 'text-[#929895] hover:text-white active:scale-95'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-[#C7FF3D]/12 border border-[#C7FF3D]/30 rounded-full shadow-sm -z-10" />
              )}
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span
                className={`text-[9px] sm:text-[10px] mt-0.5 tracking-tight font-bold ${
                  isActive ? 'text-[#C7FF3D]' : 'text-[#929895]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
