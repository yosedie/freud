import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';
import { TopBar } from '../common/TopBar';
import { SemiCircleDial } from '../common/SemiCircleDial';
import { ASSESSMENT_STEPS } from '../../data/mockData';

export const AssessmentView: React.FC = () => {
  const {
    assessmentStep,
    setAssessmentStep,
    assessmentScores,
    setAssessmentScoreForStep,
    finishAssessment,
    setActiveScreen,
  } = useFreud();

  const currentStepData = ASSESSMENT_STEPS[assessmentStep - 1] || ASSESSMENT_STEPS[0];
  const currentScore = assessmentScores[assessmentStep - 1] ?? 50;

  // Derive emotion label & expressive color from score
  const getEmotionState = (score: number) => {
    if (score < 25) {
      return {
        label: 'I Feel Depressed',
        subtext: 'Experiencing heavy emotional exhaustion',
        color: '#E57351',
        bgColor: '#FCEEE9',
        mouth: 'M -14 12 Q 0 -2 14 12', // deep frown
        eyes: 'straight',
      };
    }
    if (score < 45) {
      return {
        label: 'I Feel Anxious & Uneasy',
        subtext: 'Heightened tension and worry',
        color: '#D96E4C',
        bgColor: '#FDF0EC',
        mouth: 'M -12 10 Q 0 2 12 10', // mild frown
        eyes: 'wide',
      };
    }
    if (score <= 65) {
      return {
        label: 'I Feel Neutral',
        subtext: 'Even-tempered, steady and receptive',
        color: '#E8B84B',
        bgColor: '#FDF5E2',
        mouth: 'M -12 6 L 12 6', // flat straight line
        eyes: 'normal',
      };
    }
    if (score <= 85) {
      return {
        label: 'I Feel Calm & Content',
        subtext: 'Clear-headed, grounded and peaceful',
        color: '#8FA876',
        bgColor: '#F1F6EE',
        mouth: 'M -12 2 Q 0 12 12 2', // gentle smile
        eyes: 'happy',
      };
    }
    return {
      label: 'I Feel Joyful & Vibrant',
      subtext: 'High vitality, optimism and enthusiasm',
      color: '#7A9A60',
      bgColor: '#EBF2E5',
      mouth: 'M -14 0 Q 0 16 14 0', // wide open smile
      eyes: 'sparkle',
    };
  };

  const emotion = getEmotionState(currentScore);

  const handleDialChange = (newVal: number) => {
    setAssessmentScoreForStep(assessmentStep, newVal);
  };

  const handleNext = () => {
    if (assessmentStep < ASSESSMENT_STEPS.length) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      finishAssessment();
    }
  };

  const handlePrev = () => {
    if (assessmentStep > 1) {
      setAssessmentStep(assessmentStep - 1);
    } else {
      setActiveScreen('dashboard');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-2 px-5 select-none">
      {/* Header with Step Indicator */}
      <div>
        <div className="flex items-center justify-between">
          <TopBar
            showBack
            onBack={handlePrev}
            title="Assessment"
            rightAction="none"
          />
          <div className="px-3 py-1 rounded-full bg-freud-sand dark:bg-freud-dark text-xs font-bold text-freud-brown dark:text-white border border-freud-border dark:border-freud-dark-border">
            {assessmentStep} of {ASSESSMENT_STEPS.length}
          </div>
        </div>

        {/* Step Progress Line */}
        <div className="w-full h-1.5 bg-freud-sand dark:bg-freud-dark rounded-full overflow-hidden mt-1 mb-4">
          <motion.div
            className="h-full bg-freud-brown dark:bg-freud-green rounded-full"
            initial={{ width: '14%' }}
            animate={{ width: `${(assessmentStep / ASSESSMENT_STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Main Assessment Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center"
          >
            {/* Question Heading */}
            <h2 className="text-2xl font-extrabold text-freud-brown dark:text-white max-w-[280px] leading-tight mb-2">
              {currentStepData.question}
            </h2>

            {/* Current Emotion Subtitle */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-freud-dark-card border border-freud-border/70 dark:border-freud-dark-border shadow-freud-sm mb-6">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotion.color }} />
              <span className="text-sm font-bold text-freud-brown dark:text-white">
                {emotion.label}
              </span>
            </div>

            {/* Expressive Reactive Emoji Face */}
            <motion.div
              className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-freud-md mb-3"
              style={{ backgroundColor: emotion.color }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                {/* Eyes */}
                {emotion.eyes === 'sparkle' ? (
                  <>
                    <path d="M 28 35 Q 35 28 42 35" fill="none" stroke="#2D231E" strokeWidth="4.5" strokeLinecap="round" />
                    <path d="M 58 35 Q 65 28 72 35" fill="none" stroke="#2D231E" strokeWidth="4.5" strokeLinecap="round" />
                  </>
                ) : emotion.eyes === 'wide' ? (
                  <>
                    <circle cx="35" cy="35" r="6" fill="#2D231E" />
                    <circle cx="65" cy="35" r="6" fill="#2D231E" />
                    <circle cx="37" cy="33" r="2" fill="#FFFFFF" />
                    <circle cx="67" cy="33" r="2" fill="#FFFFFF" />
                  </>
                ) : (
                  <>
                    <circle cx="35" cy="35" r="5" fill="#2D231E" />
                    <circle cx="65" cy="35" r="5" fill="#2D231E" />
                  </>
                )}

                {/* Mouth */}
                <motion.path
                  d={emotion.mouth}
                  fill="none"
                  stroke="#2D231E"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Chevron Indicator pointing to Dial */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-freud-muted dark:text-freud-dark-muted mb-2"
            >
              <ChevronDown className="w-5 h-5 opacity-60" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Semi-Circle Dial Control */}
        <div className="w-full flex justify-center mt-2">
          <SemiCircleDial value={currentScore} onChange={handleDialChange} />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="pt-2 pb-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="w-full py-4 rounded-3xl bg-freud-brown dark:bg-freud-green text-white font-bold text-base shadow-freud-md flex items-center justify-center gap-2 hover:opacity-95 transition-all"
        >
          <span>
            {assessmentStep === ASSESSMENT_STEPS.length ? 'Calculate Freud Score' : 'Next Question'}
          </span>
          {assessmentStep === ASSESSMENT_STEPS.length ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};
