import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Volume2, VolumeX, Sparkles, Wind } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';
import { TopBar } from '../common/TopBar';
import { BottomNav } from '../common/BottomNav';
import { ChatMessage } from '../../types';

export const FreudCompanionView: React.FC = () => {
  const { isSpeaking, speakText, stopSpeaking, setActiveScreen, logMindfulSession } = useFreud();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'freud',
      text: "Hello Alex. I am Freud, your mindful mental wellness companion. Take a gentle breath. How is your inner space feeling right now?",
      timestamp: 'Just now',
      actionChips: [
        'I feel overwhelmed by deadlines',
        'Guide me through Box Breathing',
        'Help me reframe negative thoughts',
        'I want to celebrate a win',
      ],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Box Breathing Cycle Timer
  useEffect(() => {
    if (!showBreathing) return;
    const interval = setInterval(() => {
      setBreathTimer(prev => {
        if (prev > 1) return prev - 1;
        setBreathingPhase(curr => {
          if (curr === 'Inhale') return 'Hold';
          if (curr === 'Hold') return 'Exhale';
          if (curr === 'Exhale') return 'Rest';
          return 'Inhale';
        });
        return 4;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showBreathing]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Now',
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Therapeutic Response Generator
    setTimeout(() => {
      let reply = '';
      let chips: string[] | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('breath') || lower.includes('box breathing') || lower.includes('calm')) {
        reply = "Let's bring your nervous system back to baseline. I have opened the Box Breathing guide above. Breathe in sync with the circle for 4 counts.";
        setShowBreathing(true);
        logMindfulSession(5);
        chips = ['I feel calmer now', 'What else helps anxiety?'];
      } else if (lower.includes('overwhelm') || lower.includes('stress') || lower.includes('deadline')) {
        reply = "Overwhelm happens when the mind tries to solve 20 problems at the same second. Notice where you are feeling this in your body—in your shoulders or your chest? Let us separate what is urgent from what can gently wait.";
        chips = ['Help me prioritize', 'Start a 3-minute breath'];
      } else if (lower.includes('reframe') || lower.includes('negative') || lower.includes('spiral')) {
        reply = "Remember: thoughts are cognitive events, not objective facts. Ask yourself: 'If my best friend was going through this exact situation, would I speak to them with the harshness I am using on myself?'";
        chips = ['That gives me perspective', 'Open my Journal'];
      } else {
        reply = "I hear you clearly. Thank you for expressing that. Every emotion carries information, but it does not have to command your next step. What is one supportive thing you need right now?";
        chips = ['Start Breathing exercise', 'Review my Freud Score'];
      }

      const botMsg: ChatMessage = {
        id: `f-${Date.now()}`,
        sender: 'freud',
        text: reply,
        timestamp: 'Just now',
        actionChips: chips,
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);

      // Speak response using strictly female voice policy
      speakText(reply);
    }, 1100);
  };

  const handleChipClick = (chip: string) => {
    if (chip === 'Open my Journal') {
      setActiveScreen('journal');
      return;
    }
    if (chip === 'Review my Freud Score') {
      setActiveScreen('score-history');
      return;
    }
    handleSendMessage(chip);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none">
      <div className="px-5 pt-2 pb-2 space-y-3 flex-1 flex flex-col">
        {/* Top Header */}
        <TopBar
          showBack
          onBack={() => setActiveScreen('dashboard')}
          title="Freud AI Companion"
          subtitle="Mindful Therapy & Grounding"
          rightAction="none"
        />

        {/* Box Breathing Micro-App Widget */}
        <AnimatePresence>
          {showBreathing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-freud-green/15 dark:bg-freud-green/20 border border-freud-green/40 rounded-3xl p-4 flex flex-col items-center relative overflow-hidden"
            >
              <button
                onClick={() => setShowBreathing(false)}
                className="absolute top-3 right-3 text-xs font-bold text-freud-muted hover:text-freud-brown"
              >
                ✕ Close
              </button>

              <div className="text-xs font-bold text-freud-green uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5" />
                <span>Box Breathing (4-4-4-4)</span>
              </div>

              {/* Pulsing Breathing Circle */}
              <div className="relative w-28 h-28 flex items-center justify-center my-2">
                <motion.div
                  className="absolute inset-0 rounded-full bg-freud-green/20"
                  animate={{
                    scale: breathingPhase === 'Inhale' ? 1.25 : breathingPhase === 'Exhale' ? 0.8 : 1.1,
                  }}
                  transition={{ duration: 4, ease: 'easeInOut' }}
                />
                <motion.div
                  className="w-20 h-20 rounded-full bg-freud-green text-white flex flex-col items-center justify-center shadow-freud-md z-10"
                  animate={{
                    scale: breathingPhase === 'Inhale' ? 1.15 : breathingPhase === 'Exhale' ? 0.85 : 1,
                  }}
                  transition={{ duration: 4, ease: 'easeInOut' }}
                >
                  <span className="text-xs font-extrabold uppercase">{breathingPhase}</span>
                  <span className="text-lg font-black">{breathTimer}s</span>
                </motion.div>
              </div>

              <p className="text-[11px] text-freud-brown dark:text-white font-medium text-center max-w-[240px]">
                {breathingPhase === 'Inhale' && 'Slowly fill your lungs with fresh air...'}
                {breathingPhase === 'Hold' && 'Hold gently with relaxed shoulders...'}
                {breathingPhase === 'Exhale' && 'Release slowly through parted lips...'}
                {breathingPhase === 'Rest' && 'Pause in quiet stillness...'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1 custom-scrollbar min-h-[300px]">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl px-4 py-3 text-xs leading-relaxed shadow-freud-sm ${
                  msg.sender === 'user'
                    ? 'bg-freud-brown text-white dark:bg-white dark:text-freud-brown rounded-br-none'
                    : 'bg-white dark:bg-freud-dark-card text-freud-brown dark:text-white border border-freud-border/80 dark:border-freud-dark-border rounded-bl-none'
                }`}
              >
                {msg.sender === 'freud' && (
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-freud-border/40 dark:border-freud-dark-border">
                    <span className="font-extrabold text-[10px] text-freud-green flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Freud AI
                    </span>
                    <button
                      onClick={() => (isSpeaking ? stopSpeaking() : speakText(msg.text))}
                      className="text-freud-muted hover:text-freud-green transition-colors"
                      title="Speak with Ava (Female Voice)"
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-3.5 h-3.5 text-freud-coral" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
                <p className="font-medium">{msg.text}</p>
              </div>

              {/* Action Chips */}
              {msg.actionChips && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                  {msg.actionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChipClick(chip)}
                      className="px-2.5 py-1 rounded-full bg-freud-sand/90 dark:bg-freud-dark text-[11px] font-bold text-freud-brown dark:text-white border border-freud-border/80 dark:border-freud-dark-border hover:bg-freud-green hover:text-white transition-all shadow-xs"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 bg-white dark:bg-freud-dark-card border border-freud-border/80 px-3 py-2 rounded-2xl w-fit shadow-xs">
              <span className="w-1.5 h-1.5 bg-freud-green rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-freud-green rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-freud-green rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-2">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-white dark:bg-freud-dark-card rounded-full p-1.5 pl-4 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm"
          >
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask Freud or share what you feel..."
              className="flex-1 bg-transparent text-xs font-semibold text-freud-brown dark:text-white outline-none placeholder:text-freud-muted/60"
            />
            <button
              type="button"
              onClick={() => setShowBreathing(prev => !prev)}
              className="w-8 h-8 rounded-full bg-freud-sand dark:bg-freud-dark flex items-center justify-center text-freud-green hover:scale-105 transition-transform"
              title="Toggle Box Breathing"
            >
              <Wind className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-full bg-freud-brown dark:bg-freud-green text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};
