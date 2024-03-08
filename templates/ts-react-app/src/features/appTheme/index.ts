
import { selectTheme } from './store/theme/themeSlice';
import { themeNames } from './store/theme/themeSlice.contracts';
import ThemeProviderWrapper from './providers/ThemeProvider';
// eslint-disable-next-line no-duplicate-imports
import themeSlice from './store/theme/themeSlice';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';



/**
 * @module appTheme
 * @description This module exports the following items related to app theming:
 * - `ThemeProviderWrapper`: A component that wraps the app and provides theme context.
 * - `selectTheme`: A selector function to retrieve the current theme from the Redux store.
 * - `themeNames`: An array of available theme names.
 * - `themeSlice`: A Redux slice that handles theme-related state and actions.
 * - `ThemeSwitch`: A component that allows switching between different themes.
 */
export { ThemeProviderWrapper, selectTheme, themeNames, themeSlice, ThemeSwitch };
