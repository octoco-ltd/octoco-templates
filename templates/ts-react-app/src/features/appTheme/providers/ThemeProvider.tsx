import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from '../base';
import { StylesProvider } from '@mui/styles';
import { useAppSelector } from 'src/hooks/hooks';
import { selectTheme } from '../store/theme/themeSlice';
// import { selectTheme } from 'src/store/theme/themeSlice';

export const ThemeContext = React.createContext((themeName: string): void => { });

interface IThemeProviderWrapper {
  children: ReactNode;
}

/**
 * Wrapper component for the theme provider.
 *
 * @param props - The component props.
 * @returns The rendered component.
 */
const ThemeProviderWrapper: React.FC<IThemeProviderWrapper> = (props: any) => {
  const curThemeName = useAppSelector(selectTheme);

  /**
   * Sets the theme name in local storage.
   *
   * @param themeName - The name of the theme.
   */
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
  };

  useEffect(() => {
    setThemeName(curThemeName);
  }, [curThemeName]);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={themeCreator(curThemeName)}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
