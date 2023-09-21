
import { selectTheme } from './store/theme/themeSlice';
import { themeNames } from './store/theme/themeSlice.contracts';
import ThemeProviderWrapper from './providers/ThemeProvider';
// eslint-disable-next-line no-duplicate-imports
import themeSlice from './store/theme/themeSlice';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';



export { ThemeProviderWrapper, selectTheme, themeNames, themeSlice, ThemeSwitch };
