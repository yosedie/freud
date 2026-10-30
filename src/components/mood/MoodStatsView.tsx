import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';
import { TopBar } from '../common/TopBar';
import { BezierMoodChart } from '../common/BezierMoodChart';
import { BottomNav } from '../common/BottomNav';
import { AI_MOOD_PREDICTIONS } from '../../data/mockData';

export const MoodStatsView: React.FC = () => {
  const { weeklyMoods, setActiveScreen } = useFreud();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Days' | 'Weeks' | 'Months' | 'Years'>('Weeks');

  const filters: ('All' | 'Days' | 'Weeks' | 'Months' | 'Years')[] = [
    'All',
    'Days',
    'Weeks',
    'Months',
    'Years',
  ];

  return (
    <div className="flex-1 flex flex-col justify-between select-none">
      <div className="px-5 pt-2 pb-2 space-y-4">
        {/* Top Header */}
        <TopBar
          showBack
          onBack={() => setActiveScreen('dashboard')}
          title="Mood Stats"
          subtitle="See your mood throughout the day"
          rightAction="info"
        />

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                activeFilter === filter
                  ? 'bg-freud-brown dark:bg-white text-white dark:text-freud-brown shadow-freud-sm'
                  : 'bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border text-freud-muted dark:text-freud-dark-muted hover:text-freud-brown'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Main Fluid Bezier Curve Chart Container */}
        <div className="bg-white dark:bg-freud-dark-card rounded-3xl p-4 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-freud-green" />
              <h3 className="text-xs font-bold text-freud-brown dark:text-white uppercase tracking-wider">
                Weekly Emotional Flow
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-freud-muted dark:text-freud-dark-muted">
              Mon - Sun
            </span>
          </div>

          <BezierMoodChart data={weeklyMoods} />
        </div>

        {/* AI Mood Predictions Section (Exact from Figma design) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-freud-green" />
              <h3 className="text-sm font-extrabold text-freud-brown dark:text-white">
                AI Mood Predictions
              </h3>
            </div>
            <span className="text-[11px] font-bold text-freud-green bg-freud-green-light dark:bg-freud-green/20 px-2 py-0.5 rounded-full">
              Live Forecast
            </span>
          </div>

          {/* Prediction Cards Carousel / Stack */}
          <div className="space-y-2">
            {AI_MOOD_PREDICTIONS.map((pred, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-freud-dark-card rounded-2xl p-3.5 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm flex items-start gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-xs"
                  style={{ backgroundColor: `${pred.color}20`, color: pred.color }}
                >
                  {pred.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-freud-brown dark:text-white">
                      {pred.period}: {pred.predictedMood}
                    </span>
                    <span className="text-[10px] font-extrabold text-freud-green bg-freud-green-light dark:bg-freud-green/20 px-1.5 py-0.5 rounded">
                      {pred.confidence}% Conf.
                    </span>
                  </div>
                  <p className="text-[11px] text-freud-muted dark:text-freud-dark-muted mt-1 leading-snug">
                    {pred.advice}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};
