import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DailyMoodPoint } from '../../types';

interface BezierMoodChartProps {
  data: DailyMoodPoint[];
}

export const BezierMoodChart: React.FC<BezierMoodChartProps> = ({ data }) => {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(4); // default Friday

  const width = 340;
  const height = 180;
  const paddingX = 25;
  const paddingY = 30;

  // Compute points
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
    // Score 0-100 mapped to Y (inverted: 100 at top, 0 at bottom)
    const y = height - paddingY - (d.score / 100) * (height - paddingY * 2);
    return { ...d, x, y };
  });

  // Build smooth cubic Bezier path
  const buildSmoothPath = (pts: typeof points) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const smoothCurve = buildSmoothPath(points);
  const areaPath = `${smoothCurve} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  // Designated milestone badges matching Figma design (Happy on Wed/Fri, Depressed on Mon/Wed, Neutral on Thu)
  const milestoneMap: Record<number, { label: string; color: string; bgColor: string }> = {
    0: { label: 'Depressed', color: '#E57351', bgColor: '#FCEEE9' },
    3: { label: 'Neutral', color: '#E8B84B', bgColor: '#FDF5E2' },
    5: { label: 'Happy', color: '#7A9A60', bgColor: '#EBF2E5' },
  };

  return (
    <div className="w-full relative select-none">
      <svg
        viewBox={`0 0 ${width} ${height + 25}`}
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A9A60" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#E8B84B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0.0" />
          </linearGradient>

          <filter id="pointGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Horizontal subtle guide lines */}
        {[0.25, 0.5, 0.75].map((ratio, i) => (
          <line
            key={i}
            x1={paddingX}
            y1={paddingY + ratio * (height - paddingY * 2)}
            x2={width - paddingX}
            y2={paddingY + ratio * (height - paddingY * 2)}
            stroke="#EFE8DE"
            strokeDasharray="4 4"
            className="dark:stroke-freud-dark-border"
          />
        ))}

        {/* Gradient Area Fill */}
        <path d={areaPath} fill="url(#moodGradient)" />

        {/* Main Fluid Bezier Line */}
        <motion.path
          d={smoothCurve}
          fill="none"
          stroke="#2D231E"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="dark:stroke-[#FFFFFF]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Data Points and Milestones */}
        {points.map((p, index) => {
          const isSelected = activePointIndex === index;
          const milestone = milestoneMap[index];

          return (
            <g
              key={index}
              onClick={() => setActivePointIndex(index)}
              className="cursor-pointer"
            >
              {/* Invisible touch target */}
              <circle cx={p.x} cy={p.y} r="18" fill="transparent" />

              {/* Data Node Point */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isSelected ? 6 : 4}
                fill={p.score > 70 ? '#7A9A60' : p.score > 45 ? '#E8B84B' : '#E57351'}
                stroke="#FFFFFF"
                strokeWidth={isSelected ? 3 : 2}
                filter="url(#pointGlow)"
                className="transition-all duration-200"
              />

              {/* Milestone Badge Pill (as in Figma design) */}
              {milestone && (
                <g
                  transform={`translate(${p.x}, ${p.y + (milestone.label === 'Depressed' ? 22 : -24)})`}
                >
                  <rect
                    x="-32"
                    y="-11"
                    width="64"
                    height="22"
                    rx="11"
                    fill={milestone.bgColor}
                    stroke={milestone.color}
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={milestone.color}
                    fontSize="9.5"
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {milestone.label}
                  </text>
                </g>
              )}

              {/* Day Label at bottom */}
              <text
                x={p.x}
                y={height + 16}
                textAnchor="middle"
                fontSize="11"
                fontWeight={isSelected ? '700' : '500'}
                fill={isSelected ? '#2D231E' : '#85776E'}
                className="dark:fill-freud-muted dark:hover:fill-white transition-colors"
              >
                {p.shortDay}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Active Point Detail Pill Tooltip */}
      <AnimatePresence>
        {activePointIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mt-3 flex items-center justify-between px-4 py-2.5 bg-white dark:bg-freud-dark-card rounded-2xl border border-freud-border/80 dark:border-freud-dark-border shadow-sm text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor:
                    data[activePointIndex].score > 70
                      ? '#7A9A60'
                      : data[activePointIndex].score > 45
                      ? '#E8B84B'
                      : '#E57351',
                }}
              />
              <span className="font-semibold text-freud-brown dark:text-white">
                {data[activePointIndex].day} ({data[activePointIndex].time})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-freud-muted dark:text-freud-dark-muted font-medium">
                State: <strong className="text-freud-brown dark:text-white">{data[activePointIndex].label}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-freud-sand dark:bg-freud-dark font-bold text-freud-brown dark:text-white">
                {data[activePointIndex].score}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
