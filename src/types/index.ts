export type MoodCategory = 'depressed' | 'sad' | 'anxious' | 'neutral' | 'calm' | 'happy' | 'joyful';

export interface EmotionOption {
  id: MoodCategory;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  score: number;
}

export interface AssessmentStep {
  id: number;
  question: string;
  subtitle: string;
  dimension: 'mood' | 'anxiety' | 'energy' | 'sleep' | 'focus' | 'social' | 'mindfulness';
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emotion: MoodCategory;
  date: string;
  timestamp: number;
  tags: string[];
  aiInsight?: string;
  reflectionPrompt?: string;
}

export interface ScoreHistoryItem {
  id: string;
  date: string;
  formattedDate: string;
  title: string;
  recommendation: string;
  score: number;
  status: 'critical' | 'moderate' | 'optimal';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'freud';
  text: string;
  timestamp: string;
  actionChips?: string[];
  emotionBadge?: MoodCategory;
}

export interface DailyMoodPoint {
  day: string;
  shortDay: string;
  score: number; // 0 to 100
  label: string;
  time: string;
  positiveScore: number;
  negativeScore: number;
}

export interface MoodPrediction {
  period: string;
  predictedMood: string;
  confidence: number;
  icon: string;
  advice: string;
  color: string;
}
