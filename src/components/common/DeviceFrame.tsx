import React from 'react';
import { Smartphone, Monitor, Moon, Sun, Volume2, Wifi, Battery, Signal } from 'lucide-react';
import { useFreud, ScreenId } from '../../context/FreudContext';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const {
    viewportMode,
    setViewportMode,
    isDarkMode,
    toggleDarkMode,
    activeScreen,
    setActiveScreen,
    isSpeaking,
    stopSpeaking,
  } = useFreud();

  const screens: { id: ScreenId; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'assessment', label: 'Assessment (1 of 7)' },
    { id: 'mood-stats', label: 'Mood Stats' },
    { id: 'companion', label: 'Freud AI' },
    { id: 'journal', label: 'New Journal' },
    { id: 'score-history', label: 'Score History' },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#ECE6DC] dark:bg-[#0E0C0A] transition-colors py-4 px-2 sm:px-6">
      {/* Top Universal Control Bar */}
      <header className="w-full max-w-5xl mb-4 bg-white/80 dark:bg-freud-dark-card/80 backdrop-blur-md rounded-2xl border border-freud-border/70 dark:border-freud-dark-border px-4 py-2.5 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Brand Label & Live Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-freud-green animate-pulse" />
            <span className="font-extrabold text-sm tracking-tight text-freud-brown dark:text-white">
              freud <span className="font-normal text-freud-muted text-xs">v1.2 Live</span>
            </span>
          </div>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-freud-green/20 text-freud-green text-xs font-semibold animate-pulse"
              title="Click to stop voice"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Voice Playing (Ava)</span>
            </button>
          )}
        </div>

        {/* Quick Screen Switcher Pills */}
        <div className="hidden lg:flex items-center gap-1 bg-freud-sand/70 dark:bg-freud-dark p-1 rounded-xl">
          {screens.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeScreen === s.id
                  ? 'bg-white dark:bg-freud-dark-card text-freud-brown dark:text-white shadow-xs'
                  : 'text-freud-muted dark:text-freud-dark-muted hover:text-freud-brown'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Device Mode & Theme Toggles */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Viewport Mode Toggle */}
          <div className="flex items-center bg-freud-sand dark:bg-freud-dark rounded-xl p-0.5">
            <button
              onClick={() => setViewportMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-white dark:bg-freud-dark-card text-freud-brown dark:text-white shadow-xs'
                  : 'text-freud-muted'
              }`}
              title="iPhone Frame View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone</span>
            </button>
            <button
              onClick={() => setViewportMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                viewportMode === 'desktop'
                  ? 'bg-white dark:bg-freud-dark-card text-freud-brown dark:text-white shadow-xs'
                  : 'text-freud-muted'
              }`}
              title="Expanded Fluid View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-xl bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border flex items-center justify-center text-freud-brown dark:text-white shadow-xs hover:scale-105 active:scale-95 transition-all"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-freud-yellow" /> : <Moon className="w-4 h-4 text-freud-brown" />}
          </button>
        </div>
      </header>

      {/* Main Content Render */}
      <main className="w-full flex-1 flex justify-center items-start">
        {viewportMode === 'mobile' ? (
          /* Realistic iPhone 15/16 Pro Device Frame */
          <div className="relative w-full max-w-[400px] h-[844px] max-h-[92vh] bg-freud-cream dark:bg-freud-dark rounded-[48px] shadow-[0_25px_70px_-15px_rgba(45,35,30,0.3)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] border-[10px] border-[#201A16] dark:border-[#302722] flex flex-col overflow-hidden ring-1 ring-black/10">
            {/* iPhone Top Status Bar & Dynamic Island */}
            <div className="relative w-full pt-3 px-7 flex items-center justify-between text-xs font-semibold text-freud-brown dark:text-white select-none z-30 shrink-0">
              <span className="tracking-tight text-[13px] font-bold">8:41</span>

              {/* Dynamic Island Pill */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-6 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111111] border border-white/10" />
                <div className="w-2 h-2 rounded-full bg-[#1E293B]" />
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-freud-brown dark:text-white">
                <Signal className="w-3.5 h-3.5 fill-current" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Scrollable View Area */}
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col relative custom-scrollbar">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="w-full py-2 flex justify-center shrink-0 z-30 bg-transparent select-none pointer-events-none">
              <div className="w-32 h-1 bg-freud-brown/30 dark:bg-white/30 rounded-full" />
            </div>
          </div>
        ) : (
          /* Expanded Desktop / Tablet Responsive View */
          <div className="w-full max-w-4xl min-h-[820px] bg-freud-cream dark:bg-freud-dark rounded-3xl shadow-freud-lg border border-freud-border dark:border-freud-dark-border flex flex-col overflow-hidden">
            <div className="flex-1 w-full overflow-y-auto flex flex-col">
              {children}
            </div>
          </div>
        )}
      </main>

      {/* Quick Mobile Navigation Bar for Viewport */}
      <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-white/90 dark:bg-freud-dark-card/90 backdrop-blur-md border border-freud-border/80 dark:border-freud-dark-border px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
        {screens.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScreen(s.id)}
            className={`px-2 py-1 rounded-full text-[11px] font-bold ${
              activeScreen === s.id
                ? 'bg-freud-brown text-white dark:bg-white dark:text-freud-brown'
                : 'text-freud-muted hover:text-freud-brown'
            }`}
          >
            {s.label.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};
