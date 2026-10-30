import React from 'react';
import { ArrowLeft, HelpCircle, Info, Sparkles } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: 'avatar' | 'info' | 'help' | 'none';
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction = 'avatar',
}) => {
  const { setActiveScreen } = useFreud();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setActiveScreen('dashboard');
    }
  };

  return (
    <header className="flex items-center justify-between px-5 py-3 select-none">
      {/* Left Item */}
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border flex items-center justify-center text-freud-brown dark:text-white shadow-freud-sm active:scale-95 transition-transform"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-freud-green/15 dark:bg-freud-green/25 flex items-center justify-center text-freud-green font-bold text-sm">
              <span className="text-base">🌸</span>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-freud-muted dark:text-freud-dark-muted uppercase tracking-wider">
                Freud v1.2
              </div>
              <div className="text-sm font-bold text-freud-brown dark:text-white leading-tight">
                Mental Wellness
              </div>
            </div>
          </div>
        )}

        {title && (
          <div className="ml-1">
            <h1 className="text-lg font-bold text-freud-brown dark:text-white leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-freud-muted dark:text-freud-dark-muted font-medium">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right Item */}
      <div className="flex items-center gap-2">
        {rightAction === 'avatar' && (
          <button
            onClick={() => setActiveScreen('companion')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm active:scale-95 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5 text-freud-green" />
            <span className="text-xs font-bold text-freud-brown dark:text-white">AI Freud</span>
          </button>
        )}

        {rightAction === 'info' && (
          <button
            className="w-10 h-10 rounded-full bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border flex items-center justify-center text-freud-brown dark:text-white shadow-freud-sm active:scale-95 transition-transform"
            aria-label="Info"
          >
            <Info className="w-4 h-4 text-freud-brown dark:text-white" />
          </button>
        )}

        {rightAction === 'help' && (
          <button
            onClick={() => setActiveScreen('companion')}
            className="w-10 h-10 rounded-full bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border flex items-center justify-center text-freud-brown dark:text-white shadow-freud-sm active:scale-95 transition-transform"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4 text-freud-brown dark:text-white" />
          </button>
        )}
      </div>
    </header>
  );
};
