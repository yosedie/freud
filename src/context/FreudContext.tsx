import React, { createContext, useContext, useState, useEffect } from 'react';
import { JournalEntry, MoodCategory, ScoreHistoryItem, DailyMoodPoint } from '../types';
import { INITIAL_JOURNAL_ENTRIES, INITIAL_SCORE_HISTORY, WEEKLY_MOOD_DATA } from '../data/mockData';
import { speechEngine } from '../utils/audio';

export type ScreenId = 'dashboard' | 'assessment' | 'mood-stats' | 'companion' | 'journal' | 'score-history';
export type ViewportMode = 'mobile' | 'desktop';

interface FreudContextType {
  // Navigation
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Core Metrics
  freudScore: number;
  mindfulHours: number;
  currentMood: MoodCategory;
  setCurrentMood: (mood: MoodCategory) => void;
  logMindfulSession: (minutes: number) => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp' | 'date'>) => void;

  // Score History
  scoreHistory: ScoreHistoryItem[];
  addAssessmentResult: (score: number, title: string, recommendation: string) => void;

  // Mood Points
  weeklyMoods: DailyMoodPoint[];

  // Assessment In-Progress State
  assessmentStep: number;
  setAssessmentStep: (step: number) => void;
  assessmentScores: number[];
  setAssessmentScoreForStep: (step: number, score: number) => void;
  resetAssessment: () => void;
  finishAssessment: () => void;

  // Speech TTS
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

const FreudContext = createContext<FreudContextType | undefined>(undefined);

export const FreudProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('dashboard');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('freud_dark_mode') === 'true';
  });

  const [freudScore, setFreudScore] = useState<number>(80);
  const [mindfulHours, setMindfulHours] = useState<number>(2.5);
  const [currentMood, setCurrentMood] = useState<MoodCategory>('sad');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('freud_journal_entries');
    return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ENTRIES;
  });
  const [scoreHistory, setScoreHistory] = useState<ScoreHistoryItem[]>(() => {
    const saved = localStorage.getItem('freud_score_history');
    return saved ? JSON.parse(saved) : INITIAL_SCORE_HISTORY;
  });
  const [weeklyMoods] = useState<DailyMoodPoint[]>(WEEKLY_MOOD_DATA);

  // Assessment flow state
  const [assessmentStep, setAssessmentStep] = useState<number>(1);
  const [assessmentScores, setAssessmentScores] = useState<number[]>([55, 50, 60, 70, 65, 80, 75]);

  // Speech TTS state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('freud_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('freud_journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('freud_score_history', JSON.stringify(scoreHistory));
  }, [scoreHistory]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const logMindfulSession = (minutes: number) => {
    const additionalHours = parseFloat((minutes / 60).toFixed(1));
    setMindfulHours(prev => parseFloat((prev + additionalHours).toFixed(1)));
    setFreudScore(prev => Math.min(100, prev + Math.floor(minutes / 10)));
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp' | 'date'>) => {
    const now = new Date();
    const formattedDate = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newEntry: JournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
      timestamp: Date.now(),
      date: formattedDate,
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    // Boost mood slightly upon mindful journaling
    if (entry.emotion === 'happy' || entry.emotion === 'joyful' || entry.emotion === 'calm') {
      setFreudScore(prev => Math.min(100, prev + 3));
      setCurrentMood(entry.emotion);
    }
  };

  const addAssessmentResult = (score: number, title: string, recommendation: string) => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${months[now.getMonth()]} ${now.getDate()}`;
    const newItem: ScoreHistoryItem = {
      id: `h-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      formattedDate,
      title,
      recommendation,
      score,
      status: score >= 75 ? 'optimal' : score >= 50 ? 'moderate' : 'critical',
    };
    setScoreHistory(prev => [newItem, ...prev]);
    setFreudScore(score);
  };

  const setAssessmentScoreForStep = (step: number, score: number) => {
    setAssessmentScores(prev => {
      const updated = [...prev];
      updated[step - 1] = score;
      return updated;
    });
  };

  const resetAssessment = () => {
    setAssessmentStep(1);
  };

  const finishAssessment = () => {
    const avgScore = Math.round(assessmentScores.reduce((a, b) => a + b, 0) / assessmentScores.length);
    let title = 'Mentally Balanced';
    let recommendation = 'Continue daily mindful check-ins';
    if (avgScore >= 85) {
      title = 'Very Happy & Resilient';
      recommendation = 'Optimal balance achieved. Keep thriving!';
      setCurrentMood('joyful');
    } else if (avgScore >= 70) {
      title = 'Healthy & Calm';
      recommendation = 'Maintain regular mindfulness practice';
      setCurrentMood('calm');
    } else if (avgScore >= 50) {
      title = 'Moderate Stress / Neutral';
      recommendation = 'Focus on 15m relaxation & good sleep hygiene';
      setCurrentMood('neutral');
    } else {
      title = 'Anxious, Overloaded';
      recommendation = 'Focus on 20m Guided Mindfulness & breathing';
      setCurrentMood('sad');
    }

    addAssessmentResult(avgScore, title, recommendation);
    setActiveScreen('score-history');
  };

  const speakText = (text: string) => {
    setIsSpeaking(true);
    speechEngine.speak(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const stopSpeaking = () => {
    speechEngine.stop();
    setIsSpeaking(false);
  };

  return (
    <FreudContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        viewportMode,
        setViewportMode,
        isDarkMode,
        toggleDarkMode,
        freudScore,
        mindfulHours,
        currentMood,
        setCurrentMood,
        logMindfulSession,
        journalEntries,
        addJournalEntry,
        scoreHistory,
        addAssessmentResult,
        weeklyMoods,
        assessmentStep,
        setAssessmentStep,
        assessmentScores,
        setAssessmentScoreForStep,
        resetAssessment,
        finishAssessment,
        isSpeaking,
        speakText,
        stopSpeaking,
      }}
    >
      {children}
    </FreudContext.Provider>
  );
};

export const useFreud = () => {
  const context = useContext(FreudContext);
  if (!context) {
    throw new Error('useFreud must be used within a FreudProvider');
  }
  return context;
};
