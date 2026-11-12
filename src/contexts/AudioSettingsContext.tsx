import React, { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type AudioCategory = 'effects' | 'music' | 'voices';

export interface AudioSettings {
  effects: number;
  music: number;
  voices: number;
}

interface AudioSettingsContextValue {
  settings: AudioSettings;
  setVolume: (category: AudioCategory, value: number) => void;
  isAudioFocused: boolean;
  setAudioFocus: (active: boolean) => void;
}

const STORAGE_KEY = 'identidade-oculta-audio-settings';
const DEFAULT_SETTINGS: AudioSettings = {
  effects: 80,
  music: 24,
  voices: 100,
};

const clampVolume = (value: unknown, fallback: number): number =>
  typeof value === 'number' && Number.isFinite(value)
    ? Math.min(100, Math.max(0, Math.round(value)))
    : fallback;

function loadSavedSettings(): AudioSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null') as Partial<AudioSettings> | null;
    if (!saved) return DEFAULT_SETTINGS;
    return {
      effects: clampVolume(saved.effects, DEFAULT_SETTINGS.effects),
      music: clampVolume(saved.music, DEFAULT_SETTINGS.music),
      voices: clampVolume(saved.voices, DEFAULT_SETTINGS.voices),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const AudioSettingsContext = createContext<AudioSettingsContextValue | null>(null);

export const AudioSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AudioSettings>(loadSavedSettings);
  const [isAudioFocused, setIsAudioFocused] = useState(false);

  const setVolume = useCallback((category: AudioCategory, value: number) => {
    setSettings((current) => ({
      ...current,
      [category]: clampVolume(value, current[category]),
    }));
  }, []);

  const setAudioFocus = useCallback((active: boolean) => {
    setIsAudioFocused(active);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // As configurações continuam funcionando durante a sessão se o storage estiver bloqueado.
    }
  }, [settings]);

  return (
    <AudioSettingsContext.Provider value={{ settings, setVolume, isAudioFocused, setAudioFocus }}>
      {children}
    </AudioSettingsContext.Provider>
  );
};

export const useAudioSettings = (): AudioSettingsContextValue => {
  const context = useContext(AudioSettingsContext);
  if (!context) {
    throw new Error('useAudioSettings precisa estar dentro de AudioSettingsProvider.');
  }
  return context;
};
