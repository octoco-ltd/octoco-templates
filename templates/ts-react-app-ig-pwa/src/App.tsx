// import * as Sentry from '@sentry/react';
import { wrapUseRoutes } from '@sentry/react';
import { useRoutes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import router from 'src/router/router';
// import { sentryConfig } from './config/sentry';
import { getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import AddToHomeScreen from './components/AddToHomeScreen/AddToHomeScreen';
import AppProviders from './context/AppProviders';

// Commented because the template is not connected to Sentry
// Add when configuring sentry to you project
// Sentry.init(sentryConfig); 
const useSentryRoutes = wrapUseRoutes(useRoutes);

function App() {
    const content = useSentryRoutes(router);
    const firestoreInstance = getFirestore(useFirebaseApp());

    // Providers are separated to make management easier
    // NOTE: if a provider A is dependant on the context of provider B, then provider B should be added within the index.tsx
    return (
        <FirestoreProvider sdk={firestoreInstance}>
            <AppProviders>
                <AddToHomeScreen />
                {content}
            </AppProviders>
        </FirestoreProvider>
    );
}

export default App;
