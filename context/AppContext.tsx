
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ThemeColor, Language, Translation } from '../types';
import { translations, LANGUAGES } from '../data/locales';

interface AssessmentRecord {
  timestamp: number;
  score: number;
  summary: string;
}

interface AppContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  resetProfile: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  dir: 'ltr' | 'rtl';
  assessmentHistory: AssessmentRecord[];
  saveAssessmentToHistory: (score: number, summary: string) => void;
  clearAssessmentHistory: () => void;
}

const initialProfile: UserProfile = {
  platforms: [],
  updateHabit: 'manual-soon',
  browsers: [],
  searchEngines: [],
  emailProviders: [],
  socials: [],
  messaging: [],
  cloud: [],
  iot: [],
  risks: [],
  passwordHabit: 'reused', // Default worst case for safety
  twoFactor: 'none',
  phishing: 'open-everything',
  backup: 'none',
  defense: [],
  score: 0,
  completed: false,
};

// RGB values for tailwind colors (50-950)
const COLOR_PALETTES: Record<ThemeColor, Record<number, string>> = {
  teal: {
    50: '240 253 250', 100: '204 251 241', 200: '153 246 228', 300: '94 234 212', 400: '45 212 191', 
    500: '20 184 166', 600: '13 148 136', 700: '15 118 110', 800: '17 94 89', 900: '19 78 74', 950: '4 47 46'
  },
  blue: {
    50: '239 246 255', 100: '219 234 254', 200: '191 219 254', 300: '147 197 253', 400: '96 165 250', 
    500: '59 130 246', 600: '37 99 235', 700: '29 78 216', 800: '30 64 175', 900: '30 58 138', 950: '23 37 84'
  },
  violet: {
    50: '245 243 255', 100: '237 233 254', 200: '221 214 254', 300: '196 181 253', 400: '167 139 250', 
    500: '139 92 246', 600: '124 58 237', 700: '109 40 217', 800: '91 33 182', 900: '76 29 149', 950: '46 16 101'
  },
  rose: {
    50: '255 241 242', 100: '255 228 230', 200: '254 205 211', 300: '253 164 175', 400: '251 113 133', 
    500: '244 63 94', 600: '225 29 72', 700: '190 18 60', 800: '159 18 57', 900: '136 19 55', 950: '76 5 25'
  },
  amber: {
    50: '255 251 235', 100: '254 243 199', 200: '253 230 138', 300: '252 211 77', 400: '251 191 36', 
    500: '245 158 11', 600: '217 119 6', 700: '180 83 9', 800: '146 64 14', 900: '120 53 15', 950: '69 26 3'
  },
  cyan: {
    50: '240 249 255', 100: '224 242 254', 200: '186 230 253', 300: '129 212 250', 400: '34 197 234', 
    500: '6 182 212', 600: '8 145 178', 700: '14 116 144', 800: '21 94 117', 900: '30 58 138', 950: '8 51 68'
  },
  indigo: {
    50: '238 242 255', 100: '224 231 255', 200: '199 210 254', 300: '165 180 252', 400: '129 140 248', 
    500: '99 102 241', 600: '79 70 229', 700: '67 56 202', 800: '55 48 163', 900: '49 46 129', 950: '30 27 75'
  },
  emerald: {
    50: '240 253 250', 100: '209 250 229', 200: '167 243 208', 300: '110 231 183', 400: '52 211 153', 
    500: '16 185 129', 600: '5 150 105', 700: '4 120 87', 800: '6 95 70', 900: '6 78 59', 950: '2 44 34'
  },
  fuchsia: {
    50: '253 244 255', 100: '252 231 243', 200: '250 204 231', 300: '245 158 211', 400: '240 86 186', 
    500: '232 5 140', 600: '219 39 119', 700: '190 24 93', 800: '162 28 87', 900: '140 21 75', 950: '80 7 48'
  },
  orange: {
    50: '255 247 237', 100: '255 237 213', 200: '254 215 170', 300: '253 186 116', 400: '251 146 60', 
    500: '249 115 22', 600: '234 88 12', 700: '194 65 12', 800: '154 52 18', 900: '124 45 18', 950: '67 20 7'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    // Load profile from local storage if available
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : initialProfile;
  });
  
  // Save profile to local storage on change
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Theme (Light/Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Theme Color (Brand Color)
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem('themeColor') as ThemeColor) || 'teal';
  });

  // Language
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'es';
  });

  const t = translations[language];
  const dir = LANGUAGES.find(l => l.code === language)?.dir || 'ltr';

  // Apply Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply Theme Color CSS Variables
  useEffect(() => {
    const root = window.document.documentElement;
    const palette = COLOR_PALETTES[themeColor];
    
    Object.entries(palette).forEach(([shade, value]) => {
      root.style.setProperty(`--color-primary-${shade}`, value as string);
    });
    
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  // Apply Language Direction
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', dir);
    localStorage.setItem('language', language);
  }, [language, dir]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setUserProfile(initialProfile);
    localStorage.removeItem('userProfile');
  };

  // Assessment History
  const [assessmentHistory, setAssessmentHistory] = useState<AssessmentRecord[]>(() => {
    const saved = localStorage.getItem('assessmentHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('assessmentHistory', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  const saveAssessmentToHistory = (score: number, summary: string) => {
    const record: AssessmentRecord = {
      timestamp: Date.now(),
      score,
      summary
    };
    setAssessmentHistory(prev => [record, ...prev.slice(0, 49)]);
  };

  const clearAssessmentHistory = () => {
    setAssessmentHistory([]);
    localStorage.removeItem('assessmentHistory');
  };

  return (
    <AppContext.Provider value={{ 
      userProfile, 
      updateUserProfile, 
      resetProfile, 
      theme, 
      toggleTheme,
      themeColor,
      setThemeColor,
      language,
      setLanguage,
      t,
      dir,
      assessmentHistory,
      saveAssessmentToHistory,
      clearAssessmentHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
