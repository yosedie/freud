import { AssessmentStep, DailyMoodPoint, EmotionOption, JournalEntry, MoodPrediction, ScoreHistoryItem } from '../types';

export const EMOTIONS: EmotionOption[] = [
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#9C8EB9', bgColor: '#F2EFF7', score: 35 },
  { id: 'sad', label: 'Sad', emoji: '😞', color: '#E57351', bgColor: '#FCEEE9', score: 25 },
  { id: 'neutral', label: 'Neutral', emoji: '😐', color: '#E8B84B', bgColor: '#FDF5E2', score: 55 },
  { id: 'calm', label: 'Calm', emoji: '😌', color: '#8FA876', bgColor: '#F1F6EE', score: 75 },
  { id: 'happy', label: 'Happy', emoji: '😊', color: '#7A9A60', bgColor: '#EBF2E5', score: 90 },
  { id: 'joyful', label: 'Joyful', emoji: '✨', color: '#5D7747', bgColor: '#E4EDDD', score: 98 },
];

export const ASSESSMENT_STEPS: AssessmentStep[] = [
  {
    id: 1,
    question: "How would you describe your mood?",
    subtitle: "Rotate the dial to reflect your prevailing emotional state right now.",
    dimension: 'mood',
  },
  {
    id: 2,
    question: "How calm and physically relaxed do you feel?",
    subtitle: "Check in with muscle tension, chest tightness, or calm stability.",
    dimension: 'anxiety',
  },
  {
    id: 3,
    question: "How is your energy level throughout today?",
    subtitle: "From heavy fatigue to buoyant, clear motivation.",
    dimension: 'energy',
  },
  {
    id: 4,
    question: "How restorative was your recent sleep?",
    subtitle: "Reflect on how rested and refreshed your mind feels.",
    dimension: 'sleep',
  },
  {
    id: 5,
    question: "How present and focused can you stay?",
    subtitle: "Notice mind-wandering, overwhelm, or clear attention.",
    dimension: 'focus',
  },
  {
    id: 6,
    question: "How connected do you feel to people around you?",
    subtitle: "Sense of belonging, warmth, or feeling isolated.",
    dimension: 'social',
  },
  {
    id: 7,
    question: "How mindful and self-compassionate are you today?",
    subtitle: "Are you treating yourself with kindness and patience?",
    dimension: 'mindfulness',
  },
];

export const INITIAL_SCORE_HISTORY: ScoreHistoryItem[] = [
  {
    id: 'h-1',
    date: '2026-09-17',
    formattedDate: 'Sep 17',
    title: 'Very Happy',
    recommendation: 'No Recommendation Needed',
    score: 98,
    status: 'optimal',
  },
  {
    id: 'h-2',
    date: '2026-09-15',
    formattedDate: 'Sep 15',
    title: 'Balanced & Mindful',
    recommendation: 'Maintain Evening 10m Journaling',
    score: 84,
    status: 'optimal',
  },
  {
    id: 'h-3',
    date: '2026-09-12',
    formattedDate: 'Sep 12',
    title: 'Anxious, Depressed',
    recommendation: 'Focus on 20m Guided Mindfulness',
    score: 45,
    status: 'critical',
  },
  {
    id: 'h-4',
    date: '2026-09-08',
    formattedDate: 'Sep 08',
    title: 'Mild Cognitive Overload',
    recommendation: 'Scheduled 15m Box Breathing Walk',
    score: 62,
    status: 'moderate',
  },
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j-1',
    title: 'Feeling Bad Again',
    content: "I had a demanding day at work and school... It feels like multiple deadlines collided at once. I caught myself spiraling into self-criticism, but writing this down helps anchor me.",
    emotion: 'sad',
    date: 'Today, 8:41 PM',
    timestamp: Date.now() - 3600000 * 2,
    tags: ['Work', 'Academic Pressure', 'Reflection'],
    aiInsight: "Freud identified mild cognitive fatigue. You recognized the spiral, which is a major cognitive milestone.",
    reflectionPrompt: "What is one small burden you can give yourself permission to postpone until tomorrow morning?",
  },
  {
    id: 'j-2',
    title: 'Quiet Morning Peace',
    content: "Woke up earlier than usual. Drank warm chamomile tea in silence on the balcony. For 20 minutes, my mind was entirely uncluttered.",
    emotion: 'calm',
    date: 'Yesterday, 7:15 AM',
    timestamp: Date.now() - 86400000,
    tags: ['Morning Ritual', 'Solitude', 'Gratitude'],
    aiInsight: "Low sensory mornings directly correlate with your higher Freud scores later in the afternoon.",
    reflectionPrompt: "How can you protect this 15-minute quiet pocket in tomorrow's schedule?",
  },
];

export const WEEKLY_MOOD_DATA: DailyMoodPoint[] = [
  { day: 'Monday', shortDay: 'Mon', score: 42, label: 'Depressed', time: '10:00 AM', positiveScore: 35, negativeScore: 65 },
  { day: 'Tuesday', shortDay: 'Tue', score: 55, label: 'Neutral', time: '02:30 PM', positiveScore: 50, negativeScore: 50 },
  { day: 'Wednesday', shortDay: 'Wed', score: 38, label: 'Depressed', time: '11:15 AM', positiveScore: 30, negativeScore: 70 },
  { day: 'Thursday', shortDay: 'Thu', score: 72, label: 'Neutral', time: '04:00 PM', positiveScore: 70, negativeScore: 30 },
  { day: 'Friday', shortDay: 'Fri', score: 88, label: 'Happy', time: '06:00 PM', positiveScore: 85, negativeScore: 15 },
  { day: 'Saturday', shortDay: 'Sat', score: 94, label: 'Happy', time: '01:00 PM', positiveScore: 92, negativeScore: 8 },
  { day: 'Sunday', shortDay: 'Sun', score: 80, label: 'Calm', time: '08:00 PM', positiveScore: 80, negativeScore: 20 },
];

export const AI_MOOD_PREDICTIONS: MoodPrediction[] = [
  {
    period: 'Next 7 hrs',
    predictedMood: 'Calm & Steady',
    confidence: 88,
    icon: '🌤️',
    advice: 'Your circadian rhythm shows peak focus between 9 AM and 12 PM.',
    color: '#7A9A60',
  },
  {
    period: 'Evening Dip',
    predictedMood: 'Mild Fatigue',
    confidence: 76,
    icon: '🌙',
    advice: 'Plan 15 minutes of non-screen decompression around 8:30 PM.',
    color: '#E8B84B',
  },
  {
    period: 'Weekend Trend',
    predictedMood: 'Restorative Growth',
    confidence: 93,
    icon: '✨',
    advice: 'Outdoor nature exposure on Saturday morning predicted to extend positive streak.',
    color: '#8FA876',
  },
];
