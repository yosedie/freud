import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SemiCircleDialProps {
  value: number; // 0 to 100
  onChange: (val: number) => void;
  disabled?: boolean;
}

export const SemiCircleDial: React.FC<SemiCircleDialProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Map 0-100 to angle: -75deg (left / sad) to +75deg (right / happy)
  const angle = -75 + (value / 100) * 150;

  const handlePointer = (clientX: number, clientY: number) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.bottom - 20; // pivot near bottom center

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    // Calculate angle in degrees relative to vertical (up = 0)
    let rad = Math.atan2(dx, -dy);
    let deg = (rad * 180) / Math.PI;

    // Clamp between -75 and +75
    deg = Math.max(-75, Math.min(75, deg));

    // Convert back to 0-100 value
    const newVal = Math.round(((deg + 75) / 150) * 100);
    onChange(newVal);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handlePointer(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handlePointer(e.clientX, e.clientY);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="relative w-full max-w-[320px] h-[160px] mx-auto select-none cursor-pointer flex items-end justify-center overflow-hidden pb-2"
    >
      {/* SVG Arc with 3 Segments */}
      <svg
        viewBox="0 0 320 160"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        <defs>
          <filter id="dialShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Outer Ring Background Track */}
        <path
          d="M 20 150 A 140 140 0 0 1 300 150"
          fill="none"
          stroke="#E8E0D5"
          strokeWidth="60"
          strokeLinecap="round"
          className="dark:stroke-freud-dark-border"
        />

        {/* Segment 1: Coral / Sad (Left) */}
        <path
          d="M 24 150 A 136 136 0 0 1 105 52"
          fill="none"
          stroke="#E57351"
          strokeWidth="56"
          strokeLinecap="round"
          className="transition-colors"
        />

        {/* Segment 2: Warm Ochre Yellow / Neutral (Center) */}
        <path
          d="M 105 52 A 136 136 0 0 1 215 52"
          fill="none"
          stroke="#E8B84B"
          strokeWidth="56"
          className="transition-colors"
        />

        {/* Segment 3: Sage Green / Happy (Right) */}
        <path
          d="M 215 52 A 136 136 0 0 1 296 150"
          fill="none"
          stroke="#7A9A60"
          strokeWidth="56"
          strokeLinecap="round"
          className="transition-colors"
        />

        {/* Face Emojis inside the Arc */}
        {/* Sad face on left */}
        <g transform="translate(62, 115) scale(0.9)">
          <circle cx="0" cy="0" r="14" fill="#C05333" opacity="0.3" />
          <circle cx="-5" cy="-2" r="2" fill="#FFFFFF" />
          <circle cx="5" cy="-2" r="2" fill="#FFFFFF" />
          <path d="M -6 6 Q 0 0 6 6" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Neutral face in center */}
        <g transform="translate(160, 48) scale(0.9)">
          <circle cx="0" cy="0" r="14" fill="#C99B35" opacity="0.3" />
          <circle cx="-5" cy="-2" r="2" fill="#FFFFFF" />
          <circle cx="5" cy="-2" r="2" fill="#FFFFFF" />
          <line x1="-5" y1="5" x2="5" y2="5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* Happy face on right */}
        <g transform="translate(258, 115) scale(0.9)">
          <circle cx="0" cy="0" r="14" fill="#5D7747" opacity="0.3" />
          <circle cx="-5" cy="-2" r="2" fill="#FFFFFF" />
          <circle cx="5" cy="-2" r="2" fill="#FFFFFF" />
          <path d="M -6 3 Q 0 9 6 3" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      {/* Rotating Dial Pointer / Needle */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 origin-bottom flex flex-col items-center pointer-events-none"
        animate={{ rotate: angle }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ height: '115px' }}
      >
        {/* Pointer Head */}
        <div className="w-5 h-5 bg-freud-brown dark:bg-[#1C1714] rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-freud-muted">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
        {/* Pointer Line */}
        <div className="w-1.5 flex-1 bg-gradient-to-b from-freud-brown to-freud-brown/60 dark:from-[#FFFFFF] dark:to-white/40 rounded-full" />
        {/* Pivot Hub */}
        <div className="w-7 h-7 bg-freud-brown dark:bg-white rounded-full -mb-3.5 shadow-md flex items-center justify-center border-4 border-freud-cream dark:border-freud-dark">
          <div className="w-2 h-2 bg-white dark:bg-freud-brown rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};
