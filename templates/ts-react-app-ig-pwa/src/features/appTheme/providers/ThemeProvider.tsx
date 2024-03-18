import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { themeCreator } from '../base';
import { StylesProvider } from '@mui/styles';

export const ThemeContext = React.createContext((themeName: string): void => { });

interface IThemeProviderWrapper {
  children: ReactNode;
}

export const ThemeProviderWrapper: React.FC<IThemeProviderWrapper> = (props: any) => {
  const curThemeName = 'PureLightTheme';

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

