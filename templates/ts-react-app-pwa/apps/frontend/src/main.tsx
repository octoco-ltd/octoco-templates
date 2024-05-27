import { MutationCache, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FirebaseAppProvider } from 'reactfire';
import App from './App.tsx';

import './index.css';
import { createIDBPersister } from './indexDbPersistor.ts';
// import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
// import localforage from 'localforage';

// Create a persister
// const persister = createAsyncStoragePersister({
//   storage: localforage,
// });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      gcTime: Infinity, // 24 hours
      staleTime: Infinity, //ensures that once the data is fetched and cached, it remains available for the lifetime of the application, regardless of network connectivity.
      retry: 2,
      // networkMode: 'offlineFirst',
    },
    mutations: {
      gcTime: Infinity, // 24 hours
      // networkMode: 'offlineFirst',
      // gcTime: 1000 * 60 * 60 * 24, // 24 hours
      // cacheTime: Infinity, //ensures that once the data is fetched and cached, it remains available for the lifetime of the application, regardless of network connectivity.
      retry: 2,

    },

  },
  // configure global cache callbacks to show toast notifications
  mutationCache: new MutationCache({
    onSuccess: (data) => {
      console.log('mutation success', data)
    },
    onError: (error) => {
      console.log('mutation error', error)
    },
  }),

})

const persister = createIDBPersister('ts-react-app-pwa-persister')


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <FirebaseAppProvider firebaseConfig={{
      apiKey: "AIzaSyAlW24k2ycibSYo3b1ncgRgZUwVmabV4HA",
      authDomain: "react-pwa-template.firebaseapp.com",
      projectId: "react-pwa-template",
      storageBucket: "react-pwa-template.appspot.com",
      messagingSenderId: "699286679504",
      appId: "1:699286679504:web:fced7ec0c833050c2653d5",
      measurementId: "G-NNT2ELVW04"
    }}>

      {/* <QueryClientProvider client={queryClient}> */}
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister, maxAge: Infinity }}
        onSuccess={() => {
          // resume mutations after initial restore from localStorage was successful
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries()
          })
        }}
      >
        <App />

      </PersistQueryClientProvider>
      {/* </QueryClientProvider> */}
    </FirebaseAppProvider>
  </React.StrictMode>,
)
