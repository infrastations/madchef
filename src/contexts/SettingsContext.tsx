import React, { createContext, useContext, useState, useEffect } from 'react';
import { MadchefEvent, events as initialEvents } from '@/data/eventsData';
import { MenuGroup, menuData as initialMenuData, categoryImageSets as initialImageSets } from '@/data/menuData';
import { Outlet, outlets as initialOutlets } from '@/data/outletsData';

// ─── Gallery ──────────────────────────────────────────────────────────────────
export interface GalleryItem {
  id: string;
  src: string; // URL or base64 data URL
  title: string;
}

// Build initial gallery from the static imports via a manifest approach.
// We store URLs as-is; static imports become data URLs on first load if base64,
// or absolute module paths handled by Vite. For settings we use string URLs only.
const buildInitialGallery = (): GalleryItem[] => [
  { id: 'g1',  src: '/madchef/assets/gallery-1.png',  title: 'Crispy Chicken Platter' },
  { id: 'g2',  src: '/madchef/assets/gallery-2.png',  title: 'Sweet Dessert' },
  { id: 'g3',  src: '/madchef/assets/gallery-3.png',  title: 'Full Feast' },
  { id: 'g4',  src: '/madchef/assets/gallery-4.png',  title: 'Grilled Chicken Rice' },
  { id: 'g5',  src: '/madchef/assets/gallery-5.png',  title: 'Signature Combo' },
  { id: 'g6',  src: '/madchef/assets/gallery-6.png',  title: 'Shah Poutine' },
  { id: 'g7',  src: '/madchef/assets/gallery-7.png',  title: 'Paneer Sticks' },
  { id: 'g8',  src: '/madchef/assets/gallery-8.png',  title: 'The Original' },
  { id: 'g9',  src: '/madchef/assets/gallery-9.png',  title: 'Shah Poutine Special' },
  { id: 'g10', src: '/madchef/assets/gallery-10.png', title: 'Gyro Fix' },
  { id: 'g11', src: '/madchef/assets/gallery-11.png', title: 'Naga Achari Rice' },
  { id: 'g12', src: '/madchef/assets/gallery-12.png', title: 'Chicken Steak Meal' },
  { id: 'g13', src: '/madchef/assets/gallery-13.png', title: 'Gyro Chicken Over Fries' },
  { id: 'g14', src: '/madchef/assets/gallery-14.png', title: 'Rice Platter' },
  { id: 'g15', src: '/madchef/assets/gallery-15.png', title: 'Sip Happens' },
  { id: 'g16', src: '/madchef/assets/gallery-16.png', title: 'Roast Chicken Poutine' },
  { id: 'g17', src: '/madchef/assets/gallery-17.png', title: 'Just Milo' },
  { id: 'g18', src: '/madchef/assets/gallery-18.png', title: 'Chicken Cheese Bombs' },
];

// Editable menu group (adds per-category image array)
export interface EditableMenuGroup extends MenuGroup {
  images: string[];
}

const buildInitialMenu = (): EditableMenuGroup[] =>
  initialMenuData.map((g) => ({
    ...g,
    images: initialImageSets[g.menu_group] ?? [],
  }));

// Editable outlet (image is a URL/base64 string)
export interface EditableOutlet extends Omit<Outlet, 'image'> {
  image: string; // can be a URL or base64 data URL
}

const buildInitialOutlets = (): EditableOutlet[] =>
  initialOutlets.map((o) => ({ ...o }));

// ─── Full Settings Shape ───────────────────────────────────────────────────────
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
  menu: EditableMenuGroup[];
  outlets: EditableOutlet[];
  gallery: GalleryItem[];
}

const defaultSettings: AppSettings = {
  navbar: {
    home: 'Home',
    story: 'Our Story',
    menu: 'Menu',
    gallery: 'Gallery',
    outlets: 'Outlets',
    reviews: 'Reviews',
    events: 'Events',
  },
  hero: {
    badge: 'Since 2014 • Dhaka, Bangladesh',
    titleLine1: 'Once You Go',
    titleLine2: 'MAD',
    titleLine3: 'You Never Go',
    titleLine4: 'BACK!',
    description:
      'Experience the MAD combination of secret sauces & recipes that makes our burgers unlike any others in Dhaka.',
  },
  eventsSection: {
    badge: 'Our Journey',
    title1: 'MAD',
    title2: 'Events',
    description: "From a small street cart to 9 branches across Dhaka - here's our journey",
  },
  madEvents: initialEvents,
  menu: buildInitialMenu(),
  outlets: buildInitialOutlets(),
  gallery: buildInitialGallery(),
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: AppSettings) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('madchef_settings');
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppSettings>;
        // Deep merge so newly added fields in defaults are present
        return {
          ...defaultSettings,
          ...parsed,
          navbar: { ...defaultSettings.navbar, ...(parsed.navbar ?? {}) },
          hero: { ...defaultSettings.hero, ...(parsed.hero ?? {}) },
          eventsSection: { ...defaultSettings.eventsSection, ...(parsed.eventsSection ?? {}) },
          madEvents: parsed.madEvents ?? defaultSettings.madEvents,
          menu: parsed.menu ?? defaultSettings.menu,
          outlets: parsed.outlets ?? defaultSettings.outlets,
          gallery: parsed.gallery ?? defaultSettings.gallery,
        };
      }
    } catch (_) {
      /* ignore parse errors */
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('madchef_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: AppSettings) => setSettings(newSettings);

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
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
};
