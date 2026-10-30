import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Sparkles, ArrowUpRight, Flame, Smile } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';
import { SoundwaveVisualizer } from '../common/SoundwaveVisualizer';
import { BottomNav } from '../common/BottomNav';

export const DashboardView: React.FC = () => {
  const {
    freudScore,
    mindfulHours,
    currentMood,
    logMindfulSession,
    setActiveScreen,
    resetAssessment,
  } = useFreud();

  const getMoodTitle = () => {
    switch (currentMood) {
      case 'joyful': return 'Joyful';
      case 'happy': return 'Happy';
      case 'calm': return 'Calm';
      case 'neutral': return 'Neutral';
      case 'anxious': return 'Anxious';
      case 'sad':
      default: return 'Sad';
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none">
      <div className="px-5 pt-3 pb-2 space-y-4">
        {/* Top Search & Profile Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-freud-green/20 dark:bg-freud-green/30 flex items-center justify-center border border-freud-green/30">
              <span className="text-lg">🌿</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-freud-muted dark:text-freud-dark-muted uppercase tracking-wider">
                Good Morning
              </p>
              <h2 className="text-base font-extrabold text-freud-brown dark:text-white leading-tight">
                Alex Morgan
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveScreen('companion')}
              className="w-9 h-9 rounded-full bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border flex items-center justify-center text-freud-brown dark:text-white shadow-freud-sm active:scale-95 transition-transform"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveScreen('score-history')}
              className="w-9 h-9 rounded-full bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border flex items-center justify-center text-freud-brown dark:text-white shadow-freud-sm active:scale-95 transition-transform"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between pt-1">
          <h1 className="text-xl font-extrabold text-freud-brown dark:text-white tracking-tight">
            Mental Health Metrics
          </h1>
          <span className="text-xs font-semibold text-freud-green dark:text-freud-green-light flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-current" />
            5-Day Streak
          </span>
        </div>

        {/* Dual Hero Cards: Freud Score & Mood (Exact recreation from Figma) */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1: Freud Score (Sage Green) */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveScreen('score-history')}
            className="bg-freud-green rounded-3xl p-4 text-white shadow-freud-md relative overflow-hidden flex flex-col justify-between min-h-[165px] cursor-pointer group"
          >
            {/* Soft decorative background circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs font-bold text-white/90">Freud Score</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            {/* Circular Gauge Ring with Score */}
            <div className="relative my-auto flex items-center justify-center z-10 py-1">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="3.2"
                  />
                  {/* Progress Arc */}
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3.4"
                    strokeDasharray={`${freudScore}, 100`}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0, 100' }}
                    animate={{ strokeDasharray: `${freudScore}, 100` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </svg>
                {/* Score Number in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black leading-none">{freudScore}</span>
                  <span className="text-[9px] font-bold text-white/80 uppercase">Score</span>
                </div>
              </div>
            </div>

            <div className="z-10 text-[11px] font-semibold text-white/90 bg-white/20 px-2.5 py-1 rounded-full text-center backdrop-blur-xs">
              {freudScore >= 75 ? 'Healthy Balance' : freudScore >= 50 ? 'Moderate' : 'Needs Care'}
            </div>
          </motion.div>

          {/* Card 2: Mood (Warm Coral / Sunset) */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveScreen('mood-stats')}
            className="bg-freud-coral rounded-3xl p-4 text-white shadow-freud-md relative overflow-hidden flex flex-col justify-between min-h-[165px] cursor-pointer group"
          >
            {/* Background ambient shape */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs font-bold text-white/90">Mood</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            {/* Current State Title */}
            <div className="z-10 my-auto text-center py-1">
              <div className="text-2xl font-black tracking-tight">{getMoodTitle()}</div>
              {/* Soundwave Audio Waves */}
              <div className="mt-1">
                <SoundwaveVisualizer color="#FFFFFF" count={12} isActive={true} />
              </div>
            </div>

            <div className="z-10 text-[11px] font-semibold text-white/90 bg-white/20 px-2.5 py-1 rounded-full text-center backdrop-blur-xs">
              Tap for Stats
            </div>
          </motion.div>
        </div>

        {/* Mindful Tracker Card (from Screen 2 in Figma) */}
        <div className="bg-white dark:bg-freud-dark-card rounded-3xl p-4 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-freud-green/15 flex items-center justify-center text-freud-green">
                <Smile className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-freud-brown dark:text-white">
                Mindful Tracker
              </h3>
            </div>
            <button
              onClick={() => logMindfulSession(15)}
              className="text-[11px] font-bold text-freud-green dark:text-freud-green-light bg-freud-green-light dark:bg-freud-green/20 px-2.5 py-1 rounded-full active:scale-95 transition-transform"
            >
              +15m Log
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-freud-muted dark:text-freud-dark-muted">
                Mindful Hours
              </p>
              <div className="text-2xl font-black text-freud-brown dark:text-white">
                {mindfulHours} <span className="text-xs font-medium text-freud-muted">hrs today</span>
              </div>
            </div>

            {/* Organic Sparkline SVG */}
            <div className="w-28 h-10">
              <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible">
                <path
                  d="M 5 28 Q 20 8 38 22 T 70 12 T 95 18"
                  fill="none"
                  stroke="#7A9A60"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="95" cy="18" r="3.5" fill="#7A9A60" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Therapy & Mindful Prompts */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-freud-muted dark:text-freud-dark-muted uppercase tracking-wider">
              Recommended for You
            </span>
            <button
              onClick={() => setActiveScreen('companion')}
              className="text-xs font-bold text-freud-brown dark:text-white hover:underline"
            >
              Ask AI
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                resetAssessment();
                setActiveScreen('assessment');
              }}
              className="p-3 bg-freud-sand/70 dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border rounded-2xl text-left hover:border-freud-brown/30 transition-all flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-freud-dark flex items-center justify-center text-freud-coral">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-freud-brown dark:text-white">Daily Check-in</div>
                <div className="text-[10px] text-freud-muted font-medium">Step 1 of 7</div>
              </div>
            </button>

            <button
              onClick={() => setActiveScreen('companion')}
              className="p-3 bg-freud-sand/70 dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border rounded-2xl text-left hover:border-freud-brown/30 transition-all flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-white dark:bg-freud-dark flex items-center justify-center text-freud-green">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-freud-brown dark:text-white">Freud AI Chat</div>
                <div className="text-[10px] text-freud-muted font-medium">Voice Enabled</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Dock */}
      <BottomNav />
    </div>
  );
};
