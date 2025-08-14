import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
  animations: boolean;
  wallpaper: string;
  timeZone: string;
  timeFormat: '12h' | '24h';
  weatherEnabled: boolean;
  githubIntegration: boolean;
  leetcodeIntegration: boolean;
  soundEffects: boolean;
  githubUsername: string;
  leetcodeUsername: string;
  refreshInterval: number;
}

const defaultSettings: Settings = {
  animations: true,
  wallpaper: 'default',
  timeZone: 'auto',
  timeFormat: '24h',
  weatherEnabled: true,
  githubIntegration: true,
  leetcodeIntegration: true,
  soundEffects: true,
  githubUsername: '',
  leetcodeUsername: '',
  refreshInterval: 300,
};

interface SettingsContextType {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('sanjayos-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    localStorage.setItem('sanjayos-settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};