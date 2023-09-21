import { CssBaseline } from '@mui/material';
import * as Sentry from '@sentry/react';
import { wrapUseRoutes } from '@sentry/react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'src/router/router';
import defineAbilityFor from './config/ability';
// import { sentryConfig } from './config/sentry';
import { AbilityContext } from './context/canContext';
import DialogProvider from './context/dialogContext';
import { useAppSelector } from './hooks/hooks';
import Status500 from './pages/Fallbacks/Status/Status500/Status500';
import { AuthProvider } from './features/authentication';
import { ThemeProviderWrapper, themeNames, selectTheme } from './features/appTheme';

// Sentry.init(sentryConfig);
const useSentryRoutes = wrapUseRoutes(useRoutes);

function App() {
    const content = useSentryRoutes(router);
    const theme = useAppSelector(selectTheme);
    const ability = defineAbilityFor('superAdmin'); //TODO: the user role should be added here

    return (
        <AuthProvider>
            <ThemeProviderWrapper>
                <Sentry.ErrorBoundary
                    fallback={<Status500 resetErrorBoundary={() => window.location.reload()} />}
                >
                    <AbilityContext.Provider value={ability}>
                        <CssBaseline />
                        <DialogProvider>
                            <ToastContainer theme={theme === themeNames.dark ? 'dark' : 'light'} />
                            {content}
                        </DialogProvider>
                    </AbilityContext.Provider>
                </Sentry.ErrorBoundary>
            </ThemeProviderWrapper>
        </AuthProvider>
    );
}

export default App;
