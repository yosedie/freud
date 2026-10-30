import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';
import { TopBar } from '../common/TopBar';
import { BottomNav } from '../common/BottomNav';
import { ScoreBarChart } from '../common/ScoreBarChart';

export const ScoreHistoryView: React.FC = () => {
  const {
    freudScore,
    scoreHistory,
    setActiveScreen,
    resetAssessment,
  } = useFreud();

  const handleRetake = () => {
    resetAssessment();
    setActiveScreen('assessment');
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none">
      <div className="px-5 pt-2 pb-2 space-y-4">
        {/* Top Header */}
        <TopBar
          showBack
          onBack={() => setActiveScreen('dashboard')}
          title="Mental Score History"
          subtitle="Track clinical wellness milestones"
          rightAction="help"
        />

        {/* Celebratory Milestone Card (Exact from Screen 3 in Figma design) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-freud-green rounded-3xl p-4 text-white shadow-freud-md relative overflow-hidden"
        >
          {/* Subtle curved topographical contour lines in background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg viewBox="0 0 300 120" className="w-full h-full">
              <path d="M 0 40 Q 75 10 150 40 T 300 40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M 0 70 Q 75 40 150 70 T 300 70" fill="none" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M 0 100 Q 75 70 150 100 T 300 100" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10 flex items-start justify-between">
            <div className="max-w-[220px]">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/80 block mb-1">
                Clinical Milestone
              </span>
              <h2 className="text-base font-black leading-snug">
                {freudScore >= 75
                  ? 'Congratulations! You are mentally healthy.'
                  : freudScore >= 50
                  ? 'Balanced with Moderate Stress.'
                  : 'Gentle Support Recommended.'}
              </h2>
              <p className="text-[11px] text-white/90 font-medium mt-1">
                Current Freud Score is at <strong className="underline">{freudScore}/100</strong>.
              </p>
            </div>

            {/* Quick Action Circle Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleRetake}
              className="w-10 h-10 rounded-full bg-freud-brown dark:bg-[#1C1714] text-white flex items-center justify-center shadow-lg border-2 border-white/20"
              title="Retake Assessment"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Freud Score Insights Chart Section (Exact from Screen 6 in Figma) */}
        <div className="bg-white dark:bg-freud-dark-card rounded-3xl p-4 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-sm font-extrabold text-freud-brown dark:text-white">
                Freud Score Insights
              </h3>
              <p className="text-[11px] text-freud-muted dark:text-freud-dark-muted font-medium">
                Positive vs negative emotional balance
              </p>
            </div>
            <span className="text-xs font-bold text-freud-green bg-freud-green-light dark:bg-freud-green/20 px-2.5 py-1 rounded-full">
              +14% Growth
            </span>
          </div>

          <ScoreBarChart />
        </div>

        {/* Mental Score History Ledger (Exact from Screen 3 in Figma) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-freud-brown dark:text-white">
              Assessment Ledger
            </h3>
            <button
              onClick={handleRetake}
              className="text-xs font-bold text-freud-green dark:text-freud-green-light flex items-center gap-1 hover:underline"
            >
              <span>New Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {scoreHistory.map(item => {
              const isHigh = item.score >= 75;
              const isMid = item.score >= 50 && item.score < 75;

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-freud-dark-card rounded-2xl p-3.5 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm flex items-center justify-between gap-3"
                >
                  {/* Left: Date Badge */}
                  <div className="w-12 h-12 rounded-xl bg-freud-sand dark:bg-freud-dark flex flex-col items-center justify-center shrink-0 border border-freud-border/60">
                    <span className="text-[10px] font-bold text-freud-muted uppercase">
                      {item.formattedDate.split(' ')[0]}
                    </span>
                    <span className="text-sm font-black text-freud-brown dark:text-white leading-none">
                      {item.formattedDate.split(' ')[1]}
                    </span>
                  </div>

                  {/* Center: Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-freud-brown dark:text-white truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-freud-muted dark:text-freud-dark-muted truncate mt-0.5">
                      {item.recommendation}
                    </p>
                  </div>

                  {/* Right: Score Ring Pill */}
                  <div className="shrink-0 flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                        isHigh
                          ? 'border-freud-green text-freud-green bg-freud-green-light'
                          : isMid
                          ? 'border-freud-yellow text-freud-yellow bg-freud-yellow-light'
                          : 'border-freud-coral text-freud-coral bg-freud-coral-light'
                      }`}
                    >
                      {item.score}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};
