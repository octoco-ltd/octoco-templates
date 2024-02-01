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

  return (
    <AuthProvider>
      <HelmetProvider>
        <SidebarProvider>
          <ThemeProviderWrapper>
            <Sentry.ErrorBoundary fallback={<Status500 resetErrorBoundary={() => window.location.reload()} />}>
              <CssBaseline />
              <DialogProvider>
                <ToastContainer theme={theme === themeNames.dark ? 'dark' : 'light'} />
                {children}
              </DialogProvider>
            </Sentry.ErrorBoundary>
          </ThemeProviderWrapper>
        </SidebarProvider>
      </HelmetProvider>
    </AuthProvider >
  );
};

export default AppProviders;
