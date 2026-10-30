import React from 'react';
import { motion } from 'framer-motion';

interface BarData {
  label: string;
  positive: number; // 0-100
  negative: number; // 0-100
}

interface ScoreBarChartProps {
  data?: BarData[];
}

export const ScoreBarChart: React.FC<ScoreBarChartProps> = ({ data }) => {
  const defaultData: BarData[] = [
    { label: 'W1', positive: 65, negative: 35 },
    { label: 'W2', positive: 50, negative: 50 },
    { label: 'W3', positive: 80, negative: 20 },
    { label: 'W4', positive: 90, negative: 10 },
    { label: 'W5', positive: 70, negative: 30 },
    { label: 'W6', positive: 85, negative: 15 },
    { label: 'W7', positive: 60, negative: 40 },
    { label: 'W8', positive: 95, negative: 5 },
  ];

  const items = data || defaultData;
  const maxHeight = 110;

  return (
    <div className="w-full select-none pt-2">
      {/* Legend & Filter Row */}
      <div className="flex items-center justify-between text-xs mb-4 text-freud-muted dark:text-freud-dark-muted">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-freud-green" />
            <span className="font-medium text-freud-brown dark:text-white">Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-freud-coral" />
            <span className="font-medium text-freud-brown dark:text-white">Negative</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-freud-brown dark:text-white bg-freud-sand dark:bg-freud-dark px-2.5 py-1 rounded-full">
          <span>Monthly</span>
          <svg className="w-3 h-3 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Bar Columns Container */}
      <div className="flex items-end justify-between gap-2 h-[120px] px-1 border-b border-freud-border/80 dark:border-freud-dark-border pb-2">
        {items.map((item, index) => {
          const posHeight = Math.round((item.positive / 100) * maxHeight);
          const negHeight = Math.round((item.negative / 100) * maxHeight * 0.7);

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1 group">
              {/* Dual Bars Container */}
              <div className="flex items-end gap-1 w-full justify-center h-[110px]">
                {/* Positive Green Bar */}
                <motion.div
                  className="w-2 sm:w-2.5 bg-freud-green rounded-t-full relative"
                  initial={{ height: 0 }}
                  animate={{ height: posHeight }}
                  transition={{ duration: 0.8, delay: index * 0.06 }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 bg-freud-brown text-white text-[9px] px-1 rounded whitespace-nowrap pointer-events-none z-10">
                    +{item.positive}%
                  </div>
                </motion.div>

                {/* Negative Coral Bar */}
                <motion.div
                  className="w-2 sm:w-2.5 bg-freud-coral rounded-t-full relative"
                  initial={{ height: 0 }}
                  animate={{ height: negHeight }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.06 }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 -translate-x-1/2 bg-freud-coral text-white text-[9px] px-1 rounded whitespace-nowrap pointer-events-none z-10">
                    -{item.negative}%
                  </div>
                </motion.div>
              </div>

              {/* Label */}
              <span className="text-[10px] font-semibold text-freud-muted dark:text-freud-dark-muted mt-1">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
