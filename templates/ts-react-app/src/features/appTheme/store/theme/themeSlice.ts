import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';
import { IThemeState, themeNames } from './themeSlice.contracts';

const initialState: IThemeState = {
  theme: localStorage.getItem('appTheme') || themeNames.dark,
};

/**
 * Represents the Redux slice for managing the theme state.
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Sets the theme to the specified value.
     * @param state - The current state.
     * @param action - The Redux action containing the new theme value.
     */
    setTheme(state, action: PayloadAction<{ theme: themeNames }>) {
      const { theme } = action.payload;
      state.theme = theme;
    },
    /**
     * Toggles the theme between dark and light.
     * @param state - The current state.
     * @param action - The Redux action.
     */
    toggleTheme(state, action) {
      if (state.theme === themeNames.dark) state.theme = themeNames.light;
      else state.theme = themeNames.dark;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme, toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
