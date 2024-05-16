import PWABadge from './PWABadge.tsx'
import './App.css'
import { AppBar, Box, Card, CardContent, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import {
  MicExternalOnRounded,
  AddToHomeScreenRounded,
  MyLocationRounded
} from '@mui/icons-material'
import { Offline, Online } from 'react-detect-offline';
import NavigateToLocation from './Components/NavigateToLocation.tsx';
import TakePhoto from './Components/TakePhoto.tsx';
import ReloadAppManually from './Components/ReloadAppManually.tsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
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
          App is currently online
        </Box>
      </Online>
      <Offline>
        <Box sx={{ width: '100%', textAlign: 'center', bgcolor: 'error.main', color: 'white', py: 1 }}>
          App is currently offline
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
        </Grid>
      </Container>
      <PWABadge />
    </>
  );
}

export default App
