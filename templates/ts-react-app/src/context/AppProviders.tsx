import { CssBaseline } from '@mui/material';
import * as Sentry from '@sentry/react';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import defineAbilityFor from 'src/config/ability';
import { ThemeProviderWrapper } from 'src/features/appTheme';
import { AuthProvider } from 'src/features/authentication';
import Status500 from 'src/pages/Fallbacks/Status/Status500/Status500';
import { themeNames, useThemeStore } from 'src/store/theme/themeStore';
import { SidebarProvider } from './SidebarContext';
import { AbilityContext } from './canContext';

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
  const theme = useThemeStore((state) => state.theme);

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
          <SidebarProvider>
            <ThemeProviderWrapper>
              <Sentry.ErrorBoundary fallback={<Status500 resetErrorBoundary={() => window.location.reload()} />}>
                <CssBaseline />
                <ToastContainer theme={theme === themeNames.dark ? 'dark' : 'light'} />
                {children}
              </Sentry.ErrorBoundary>
            </ThemeProviderWrapper>
          </SidebarProvider>
        </HelmetProvider>
      </AuthProvider>
    </AbilityContext.Provider>
  );
};

export default AppProviders;
