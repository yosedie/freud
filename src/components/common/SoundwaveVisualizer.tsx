import React from 'react';
import { motion } from 'framer-motion';

interface SoundwaveVisualizerProps {
  color?: string;
  count?: number;
  isActive?: boolean;
}

export const SoundwaveVisualizer: React.FC<SoundwaveVisualizerProps> = ({
  color = '#FFFFFF',
  count = 14,
  isActive = true,
}) => {
  // Pre-calculated target heights to create an organic sound wave shape
  const heights = [12, 22, 38, 28, 48, 62, 34, 52, 60, 42, 26, 36, 20, 14];

  return (
    <div className="flex items-end justify-center gap-1.5 h-14 px-2 py-1 select-none">
      {heights.slice(0, count).map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ height: h * 0.4 }}
          animate={
            isActive
              ? {
                  height: [
                    h * 0.35,
                    Math.min(54, h * (1 + (i % 3) * 0.2)),
                    h * 0.5,
                    Math.max(10, h * 0.8),
                    h * 0.35,
                  ],
                }
              : { height: h * 0.3 }
          }
          transition={{
            duration: 1.4 + (i % 4) * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (i * 0.08) % 0.8,
          }}
        />
      ))}
    </div>
  );
};
