
import { selectTheme } from './store/theme/themeSlice';
import { themeNames } from './store/theme/themeSlice.contracts';
// eslint-disable-next-line no-duplicate-imports
import themeSlice from './store/theme/themeSlice';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import { ThemeProviderWrapper } from './providers/ThemeProvider';



export { ThemeProviderWrapper, selectTheme, themeNames, themeSlice, ThemeSwitch };
