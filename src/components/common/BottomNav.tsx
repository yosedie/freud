import React from 'react';
import { Home, LineChart, Plus, BookOpen, Award } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';
import { motion } from 'framer-motion';

export const BottomNav: React.FC = () => {
  const { activeScreen, setActiveScreen, resetAssessment } = useFreud();

  const handleFabClick = () => {
    resetAssessment();
    setActiveScreen('assessment');
  };

  return (
    <div className="relative w-full px-5 pb-5 pt-2 select-none pointer-events-auto">
      <nav className="relative bg-white/95 dark:bg-freud-dark-card/95 backdrop-blur-md rounded-3xl border border-freud-border/80 dark:border-freud-dark-border px-3 py-2.5 shadow-freud-md flex items-center justify-between">
        {/* Left 2 items */}
        <button
          onClick={() => setActiveScreen('dashboard')}
          className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-2xl transition-all ${
            activeScreen === 'dashboard'
              ? 'text-freud-brown dark:text-white font-bold'
              : 'text-freud-muted dark:text-freud-dark-muted hover:text-freud-brown'
          }`}
        >
          <Home className={`w-5 h-5 ${activeScreen === 'dashboard' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Home</span>
          {activeScreen === 'dashboard' && (
            <motion.div
              layoutId="navDot"
              className="w-1 h-1 rounded-full bg-freud-green"
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveScreen('mood-stats')}
          className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-2xl transition-all ${
            activeScreen === 'mood-stats'
              ? 'text-freud-brown dark:text-white font-bold'
              : 'text-freud-muted dark:text-freud-dark-muted hover:text-freud-brown'
          }`}
        >
          <LineChart className={`w-5 h-5 ${activeScreen === 'mood-stats' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Mood</span>
          {activeScreen === 'mood-stats' && (
            <motion.div
              layoutId="navDot"
              className="w-1 h-1 rounded-full bg-freud-green"
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />
          )}
        </button>

        {/* Center Floating Elevated Action Button */}
        <div className="relative -mt-6 mx-1 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleFabClick}
            className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-freud-brown dark:bg-freud-green text-white flex items-center justify-center shadow-freud-lg border-4 border-freud-cream dark:border-freud-dark z-20"
            aria-label="Start Mood Assessment"
          >
            <Plus className="w-6 h-6 stroke-[2.8]" />
          </motion.button>
          <span className="text-[9px] font-bold text-freud-muted dark:text-freud-dark-muted mt-1 uppercase tracking-wider">
            Check-in
          </span>
        </div>

        {/* Right 2 items */}
        <button
          onClick={() => setActiveScreen('journal')}
          className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-2xl transition-all ${
            activeScreen === 'journal'
              ? 'text-freud-brown dark:text-white font-bold'
              : 'text-freud-muted dark:text-freud-dark-muted hover:text-freud-brown'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeScreen === 'journal' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Journal</span>
          {activeScreen === 'journal' && (
            <motion.div
              layoutId="navDot"
              className="w-1 h-1 rounded-full bg-freud-green"
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveScreen('score-history')}
          className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-2xl transition-all ${
            activeScreen === 'score-history'
              ? 'text-freud-brown dark:text-white font-bold'
              : 'text-freud-muted dark:text-freud-dark-muted hover:text-freud-brown'
          }`}
        >
          <Award className={`w-5 h-5 ${activeScreen === 'score-history' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Score</span>
          {activeScreen === 'score-history' && (
            <motion.div
              layoutId="navDot"
              className="w-1 h-1 rounded-full bg-freud-green"
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />
          )}
        </button>
      </nav>
    </div>
  );
};
