import {
  AddToHomeScreenRounded,
  MicExternalOnRounded,
  MyLocationRounded
} from '@mui/icons-material';
import { AppBar, Box, Card, CardContent, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { getFirestore } from 'firebase/firestore';
import { Offline, Online } from 'react-detect-offline';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import './App.css';
import NavigateToLocation from './Components/NavigateToLocation.tsx';
import ReloadAppManually from './Components/ReloadAppManually.tsx';
import TakePhoto from './Components/TakePhoto.tsx';
import Todos from './Components/Todos.tsx';
import PWABadge from './PWABadge.tsx';
import { useEffect, useState } from 'react';
import React from 'react';

function App() {
  // const [count, setCount] = useState(0)

  const app = useFirebaseApp();
  // const storage = getStorage(app);
  const firestoreInstance = getFirestore(app);

  const [state, setState] = useState<any>({})

  const getThings = async () => {
    // check if Storage API is supported
    const supported = 'storage' in navigator;

    // check if persistent storage is supported
    const persistentStorageSupported = navigator.storage && navigator.storage.persist;

    // request persistent storage
    const persist = await navigator.storage.persist();

    // check if app already has persistent storage
    const hasPersistentStorage = await navigator.storage.persisted();

    // get usage statistics
    const test = await navigator.storage.estimate();

    setState({
      supported,
      persistentStorageSupported,
      persist,
      hasPersistentStorage,
      test
    })
  }

  useEffect(() => {
    getThings()
  }, [])


  // if (process.env.NODE_ENV !== 'production') {
  //   try {

  //     console.log('connecting to local firestore emulator')
  //     connectStorageEmulator(storage, 'localhost', 9199)
  //     connectFirestoreEmulator(firestoreInstance, 'localhost', 8080)
  //   } catch (error) {
  //     console.log('error here', error)
  //   }
  // }


  const [showDevtools, setShowDevtools] = React.useState(false)

  const ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/production').then((d) => ({
      default: d.ReactQueryDevtools,
    })),
  )




  return (
    <>
      <FirestoreProvider sdk={firestoreInstance}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              ts-react-app-pwa
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* This is added to push the content below the fixed AppBar */}
        <Online>
          <Box sx={{ width: '100%', textAlign: 'center', bgcolor: 'success.main', color: 'white', py: 1 }}>
            App is currently online1
          </Box>
        </Online>
        <Offline>
          <Box sx={{ width: '100%', textAlign: 'center', bgcolor: 'error.main', color: 'white', py: 1 }}>
            App is currently offline1
          </Box>
        </Offline>
        <Container>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TakePhoto />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <ReloadAppManually />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <NavigateToLocation />
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <Card>
                <CardContent>
                  <IconButton color="inherit" aria-label="install to home screen">
                    <AddToHomeScreenRounded fontSize="large" />
                  </IconButton>
                  <Typography variant="body1">Install to Home Screen</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <Card>
                <CardContent>
                  <IconButton color="inherit" aria-label="get current location">
                    <MyLocationRounded fontSize="large" />
                  </IconButton>
                  <Typography variant="body1">Get Current Location</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <Card>
                <CardContent>
                  <IconButton color="inherit" aria-label="record audio">
                    <MicExternalOnRounded fontSize="large" />
                  </IconButton>
                  <Typography variant="body1">Record Audio</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Todos />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <button onClick={() => setShowDevtools((prev) => !prev)}>
            Toggle Devtools
          </button>
          {/* <ReactQueryDevtools initialIsOpen={false} position='left' /> */}
          {showDevtools && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
          {JSON.stringify(state)}
        </Container>
        <PWABadge />
      </FirestoreProvider>
    </>
  );
}

export default App
