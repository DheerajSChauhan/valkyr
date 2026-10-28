import React, { Suspense } from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext';
import { TopHeader } from './components/navigation/TopHeader';
import { BottomNav } from './components/navigation/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
const WorkoutsScreen = React.lazy(() =>
  import('./screens/WorkoutsScreen').then(module => ({ default: module.WorkoutsScreen }))
);
import { PlannerScreen } from './screens/PlannerScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { CommunityScreen } from './screens/CommunityScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NutritionRecoveryScreen } from './screens/NutritionRecoveryScreen';
import { ActiveWorkoutModal } from './components/workout/ActiveWorkoutModal';
import { WorkoutDetailModal } from './components/workout/WorkoutDetailModal';
import { ExerciseDetailModal } from './components/workout/ExerciseDetailModal';
import { WorkoutSummaryModal } from './components/workout/WorkoutSummaryModal';
import { ProgramGuidebookModal } from './components/workout/ProgramGuidebookModal';
import { RestTimerCapsule } from './components/common/RestTimerCapsule';
import { Toast } from './components/common/Toast';
import './styles/obsidian.css';

const MainLayout: React.FC = () => {
  const { currentScreen, isGuidebookOpen, guidebookTab, closeGuidebook } = useFitness();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'workouts':
        return <WorkoutsScreen />;
      case 'planner':
        return <PlannerScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'nutrition':
        return <NutritionRecoveryScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#101112] text-[#F5F5F2] relative selection:bg-[#C7FF3D] selection:text-[#101112]">
      <div className="obsidian-ambient-bg" aria-hidden="true">
        <div className="ambient-lime-orb" />
        <div className="ambient-graphite-orb" />
      </div>

      <TopHeader />

      <main className="max-w-2xl mx-auto px-4 pt-4 sm:pt-6 relative z-10">
        <Suspense
          fallback={
            <div className="py-16 text-center text-sm font-bold text-[#929895]" role="status">
              Loading workouts...
            </div>
          }
        >
          {renderScreen()}
        </Suspense>
      </main>

      <RestTimerCapsule />
      <BottomNav />

      <ActiveWorkoutModal />
      <WorkoutDetailModal />
      <ExerciseDetailModal />
      <WorkoutSummaryModal />
      <ProgramGuidebookModal
        isOpen={isGuidebookOpen}
        onClose={closeGuidebook}
        initialTab={guidebookTab}
      />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FitnessProvider>
      <MainLayout />
    </FitnessProvider>
  );
};

export default App;
