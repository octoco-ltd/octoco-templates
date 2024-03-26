import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum themeNames {
  dark = 'NebulaFighterTheme',
  light = 'PureLightTheme',
}

export interface ThemeState {
  theme: themeNames | string;

  setTheme: (theme: themeNames | string) => void;
  toggleTheme: () => void;
}

/**
 * Represents the theme store.
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      /**
       * The current theme.
       */
      theme: themeNames.dark,

      /**
       * Sets the theme to the specified value.
       * @param {themeNames | string} theme - The theme to set.
       */
      setTheme: (theme: themeNames | string) => set({ theme: theme }),

      /**
       * Toggles between the dark and light themes.
       */
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === themeNames.dark ? themeNames.light : themeNames.dark,
        })),
    }),
    // The key used to save the values of the store in localStorage.
    { name: 'themeStore' },
  ),
)
