import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Save, Check } from 'lucide-react';
import { useFreud } from '../../context/FreudContext';
import { TopBar } from '../common/TopBar';
import { BottomNav } from '../common/BottomNav';
import { EMOTIONS } from '../../data/mockData';
import { MoodCategory } from '../../types';

export const JournalView: React.FC = () => {
  const { journalEntries, addJournalEntry, setActiveScreen } = useFreud();

  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [title, setTitle] = useState<string>('Feeling Bad Again');
  const [content, setContent] = useState<string>(
    "I had a demanding day at work and school... Deadlines felt overwhelming and I felt stuck in self-criticism. Writing this down brings some perspective."
  );
  const [selectedEmotion, setSelectedEmotion] = useState<MoodCategory>('sad');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Academic Pressure', 'Work']);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const availableTags = ['Work', 'Academic Pressure', 'Relationship', 'Sleep', 'Gratitude', 'Health', 'Anxiety'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addJournalEntry({
      title: title.trim(),
      content: content.trim(),
      emotion: selectedEmotion,
      tags: selectedTags,
      aiInsight: "Freud AI identified emotional release through expressive writing. Grounding achieved.",
      reflectionPrompt: "What is one compassionate thing you can do for yourself tonight?",
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('history');
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col justify-between select-none">
      <div className="px-5 pt-2 pb-2 space-y-4">
        {/* Top Header */}
        <TopBar
          showBack
          onBack={() => setActiveScreen('dashboard')}
          title={activeTab === 'new' ? 'New Journal Entry' : 'Journal Archives'}
          subtitle="Reflect and decompress with Freud AI"
          rightAction="none"
        />

        {/* Tab Switcher: Write vs History */}
        <div className="flex bg-freud-sand dark:bg-freud-dark p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'new'
                ? 'bg-white dark:bg-freud-dark-card text-freud-brown dark:text-white shadow-xs'
                : 'text-freud-muted dark:text-freud-dark-muted'
            }`}
          >
            New Entry
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white dark:bg-freud-dark-card text-freud-brown dark:text-white shadow-xs'
                : 'text-freud-muted dark:text-freud-dark-muted'
            }`}
          >
            <span>Past Reflections</span>
            <span className="w-4 h-4 rounded-full bg-freud-green/20 text-freud-green text-[10px] flex items-center justify-center font-bold">
              {journalEntries.length}
            </span>
          </button>
        </div>

        {activeTab === 'new' ? (
          <form onSubmit={handleSave} className="space-y-4">
            {/* Title Input */}
            <div className="bg-white dark:bg-freud-dark-card rounded-2xl p-3.5 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm">
              <label className="text-[11px] font-bold text-freud-muted dark:text-freud-dark-muted uppercase tracking-wider block mb-1">
                Journal Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Give your thoughts a name..."
                className="w-full text-base font-bold text-freud-brown dark:text-white bg-transparent outline-none placeholder:text-freud-muted/50"
              />
            </div>

            {/* Select Your Emotion (Exact from Screen 5 in Figma) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-freud-muted dark:text-freud-dark-muted uppercase tracking-wider block px-1">
                Select Your Emotion
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {EMOTIONS.map(emo => {
                  const isSelected = selectedEmotion === emo.id;
                  return (
                    <button
                      key={emo.id}
                      type="button"
                      onClick={() => setSelectedEmotion(emo.id)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all shrink-0 ${
                        isSelected
                          ? 'ring-2 shadow-sm scale-105'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: emo.bgColor,
                        outlineColor: emo.color,
                      }}
                    >
                      <span className="text-2xl">{emo.emoji}</span>
                      <span
                        className="text-[10px] font-extrabold"
                        style={{ color: emo.color }}
                      >
                        {emo.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Write Your Entry Text Area */}
            <div className="bg-white dark:bg-freud-dark-card rounded-2xl p-3.5 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-freud-muted dark:text-freud-dark-muted uppercase tracking-wider">
                  Write Your Entry
                </label>
                <span className="text-[10px] text-freud-muted font-medium">
                  {content.length} characters
                </span>
              </div>
              <textarea
                rows={4}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="What is lingering in your mind right now? Unpack it freely..."
                className="w-full text-sm font-medium text-freud-brown dark:text-white bg-transparent outline-none resize-none placeholder:text-freud-muted/50 leading-relaxed"
              />
            </div>

            {/* Tags Selector */}
            <div className="space-y-1.5 px-1">
              <span className="text-[11px] font-bold text-freud-muted dark:text-freud-dark-muted uppercase tracking-wider block">
                Themes & Triggers
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map(tag => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-freud-brown dark:bg-white text-white dark:text-freud-brown'
                          : 'bg-white dark:bg-freud-dark-card border border-freud-border/80 dark:border-freud-dark-border text-freud-muted'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Freud AI Realtime Cognitive Reframing Preview */}
            <div className="bg-freud-green-light/70 dark:bg-freud-green/15 rounded-2xl p-3 border border-freud-green/30 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-freud-green text-white flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-freud-green-dark dark:text-freud-green-light block">
                  Freud Cognitive Insight
                </span>
                <p className="text-[11px] text-freud-brown dark:text-white/90 mt-0.5 leading-snug">
                  "Labeling our emotions diminishes their neurological intensity. You are safely acknowledging stress without being defined by it."
                </p>
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full py-3.5 rounded-3xl font-bold text-sm shadow-freud-md flex items-center justify-center gap-2 transition-all ${
                savedSuccess
                  ? 'bg-freud-green text-white'
                  : 'bg-freud-brown dark:bg-freud-green text-white hover:opacity-95'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <span>Entry Recorded & Calibrated!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Mindful Journal</span>
                </>
              )}
            </motion.button>
          </form>
        ) : (
          /* History Tab */
          <div className="space-y-3">
            {journalEntries.map(entry => {
              const emotionObj = EMOTIONS.find(e => e.id === entry.emotion) || EMOTIONS[2];
              return (
                <div
                  key={entry.id}
                  className="bg-white dark:bg-freud-dark-card rounded-2xl p-4 border border-freud-border/80 dark:border-freud-dark-border shadow-freud-sm space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{emotionObj.emoji}</span>
                      <h4 className="text-sm font-extrabold text-freud-brown dark:text-white">
                        {entry.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold text-freud-muted dark:text-freud-dark-muted">
                      {entry.date}
                    </span>
                  </div>

                  <p className="text-xs text-freud-brown/90 dark:text-white/80 leading-relaxed font-normal">
                    {entry.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {entry.tags.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full bg-freud-sand dark:bg-freud-dark text-[10px] font-semibold text-freud-muted"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* AI Insight Pill */}
                  {entry.aiInsight && (
                    <div className="mt-2 pt-2 border-t border-freud-border/50 dark:border-freud-dark-border text-[11px] text-freud-green dark:text-freud-green-light font-medium flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{entry.aiInsight}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
};
