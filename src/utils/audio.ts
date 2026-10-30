/**
 * Freud Speech Engine
 * STRICT POLICY: ALWAYS Female Voice only (Ava, Gadis, Jenny, Emma, or female browser speech fallback).
 * Male voices are strictly banned across all configurations.
 */

export interface TTSState {
  isSpeaking: boolean;
  activeVoiceName: string;
}

class SpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private preferredFemaleVoices = [
    'en-US-AvaMultilingualNeural',
    'Ava',
    'id-ID-GadisNeural',
    'Gadis',
    'en-US-JennyNeural',
    'Jenny',
    'en-US-EmmaMultilingualNeural',
    'Emma',
    'Samantha',
    'Victoria',
    'Karen',
    'Moira',
    'Tessa',
    'Zira',
    'Google US English',
    'Microsoft Zira',
    'Microsoft Jenny'
  ];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private getBestFemaleVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Try finding explicitly approved preferred female voices
    for (const pref of this.preferredFemaleVoices) {
      const match = voices.find(v => 
        v.name.toLowerCase().includes(pref.toLowerCase()) || 
        v.voiceURI.toLowerCase().includes(pref.toLowerCase())
      );
      if (match) return match;
    }

    // 2. Search for any voice with 'female' in name
    const anyFemale = voices.find(v => 
      v.name.toLowerCase().includes('female') || 
      v.name.toLowerCase().includes('woman')
    );
    if (anyFemale) return anyFemale;

    // 3. Fallback: filter out obvious male names (David, George, Mark, Guy, Daniel, Paul, Alex, Fred)
    const maleNames = ['david', 'george', 'mark', 'guy', 'daniel', 'paul', 'fred', 'richard', 'james', 'brian'];
    const safeVoice = voices.find(v => !maleNames.some(m => v.name.toLowerCase().includes(m)));
    return safeVoice || voices[0] || null;
  }

  public speak(
    text: string, 
    onStart?: () => void, 
    onEnd?: () => void, 
    onError?: (err: unknown) => void
  ) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const femaleVoice = this.getBestFemaleVoice();

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    // Soothing therapy cadence
    utterance.pitch = 1.05; // slightly elevated, clear, warm
    utterance.rate = 0.95;  // gentle and mindful pacing
    utterance.volume = 1.0;

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      onError?.(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      if (this.currentUtterance) {
        this.currentUtterance = null;
      }
    }
  }

  public isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}

export const speechEngine = new SpeechEngine();
