import { CssBaseline } from '@mui/material';
import * as Sentry from '@sentry/react';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { selectTheme, themeNames, ThemeProviderWrapper } from 'src/features/appTheme';
import { AuthProvider } from 'src/features/authentication';
import { useAppSelector } from 'src/hooks/hooks';
import Status500 from 'src/pages/Fallbacks/Status/Status500/Status500';
import DialogProvider from './dialogContext';
import { SidebarProvider } from './SidebarContext';
import { AbilityContext } from './canContext';
import defineAbilityFor from 'src/config/ability';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * AppProviders component serves as the top-level provider for the application.
 * It wraps the entire application with various context providers and essential
 * components for consistent theming, authentication, routing, and error handling.
 *
 * @component
 * @param {AppProvidersProps} children - The child components to be wrapped by the providers.
 * @return {JSX.Element} The wrapped child components with required providers and error boundaries.
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  const theme = useAppSelector(selectTheme);

  /**
  * The Role should be defined here based on the user logged in
  */
  const ability = defineAbilityFor('admin');

  // NOTE: It is important to have the right order here. Because you can only access the context of a provider from its children.
  // i.e you can't access context from DialogProvider within the SidebarProvider
  return (
    <AbilityContext.Provider value={ability}>
      <AuthProvider>
        <HelmetProvider>
          <ThemeProviderWrapper>
            <SidebarProvider>
              <Sentry.ErrorBoundary fallback={<Status500 resetErrorBoundary={() => window.location.reload()} />}>
                <CssBaseline />
                <DialogProvider>
                  <ToastContainer theme={theme === themeNames.dark ? 'dark' : 'light'} />
                  {children}
                </DialogProvider>
              </Sentry.ErrorBoundary>
            </SidebarProvider>
          </ThemeProviderWrapper>
        </HelmetProvider>
      </AuthProvider>
    </AbilityContext.Provider>
  );
};

export default AppProviders;
