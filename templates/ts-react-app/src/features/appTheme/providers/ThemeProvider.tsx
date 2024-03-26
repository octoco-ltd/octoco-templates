import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React, { ReactNode, useEffect } from 'react';
import { useThemeStore } from 'src/store/theme/themeStore';
import { themeCreator } from '../base';

export const ThemeContext = React.createContext((themeName: string): void => { });

interface IThemeProviderWrapper {
  children: ReactNode;
}

const ThemeProviderWrapper: React.FC<IThemeProviderWrapper> = (props: any) => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const setThemeName = (themeName: string): void => {
    setTheme(themeName)
  };

  useEffect(() => {
    setThemeName(theme);
  }, [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={themeCreator(theme)}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
