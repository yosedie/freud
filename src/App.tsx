import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFreud } from './context/FreudContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { DashboardView } from './components/dashboard/DashboardView';
import { AssessmentView } from './components/assessment/AssessmentView';
import { MoodStatsView } from './components/mood/MoodStatsView';
import { JournalView } from './components/journal/JournalView';
import { FreudCompanionView } from './components/companion/FreudCompanionView';
import { ScoreHistoryView } from './components/score/ScoreHistoryView';

export const AppContent: React.FC = () => {
  const { activeScreen } = useFreud();

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'assessment':
        return <AssessmentView />;
      case 'mood-stats':
        return <MoodStatsView />;
      case 'journal':
        return <JournalView />;
      case 'companion':
        return <FreudCompanionView />;
      case 'score-history':
        return <ScoreHistoryView />;
      case 'dashboard':
      default:
        return <DashboardView />;
    }
  };

  return (
    <DeviceFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className="flex-1 flex flex-col w-full"
        >
          {renderActiveScreen()}
        </motion.div>
      </AnimatePresence>
    </DeviceFrame>
  );
};
