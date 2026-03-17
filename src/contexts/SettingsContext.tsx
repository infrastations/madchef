import React, { createContext, useContext, useState, useEffect } from 'react';
import { MadchefEvent, events as initialEvents } from '@/data/eventsData';

export interface AppSettings {
  navbar: {
    home: string;
    story: string;
    menu: string;
    gallery: string;
    outlets: string;
    reviews: string;
    events: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    titleLine4: string;
    description: string;
  };
  eventsSection: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
  };
  madEvents: MadchefEvent[];
}

const defaultSettings: AppSettings = {
  navbar: {
    home: "Home",
    story: "Our Story",
    menu: "Menu",
    gallery: "Gallery",
    outlets: "Outlets",
    reviews: "Reviews",
    events: "Events",
  },
  hero: {
    badge: "Since 2014 • Dhaka, Bangladesh",
    titleLine1: "Once You Go",
    titleLine2: "MAD",
    titleLine3: "You Never Go",
    titleLine4: "BACK!",
    description: "Experience the MAD combination of secret sauces & recipes that makes our burgers unlike any others in Dhaka.",
  },
  eventsSection: {
    badge: "Our Journey",
    title1: "MAD",
    title2: "Events",
    description: "From a small street cart to 9 branches across Dhaka - here's our journey",
  },
  madEvents: initialEvents,
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: AppSettings) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('madchef_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Shallow merge to ensure new keys in defaultSettings are present
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('madchef_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const resetSettings = () => {
    localStorage.removeItem('madchef_settings');
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
