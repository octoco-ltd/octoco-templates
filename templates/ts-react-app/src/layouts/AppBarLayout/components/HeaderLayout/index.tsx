import { Box, Toolbar, styled, useTheme } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Logo from 'src/components/LogoSign';
import { AppBarProps } from '../..';
import appConfig from 'src/config/appConfig';
import { ThemeSwitch } from 'src/features/appTheme';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: theme.sidebar.width,
    width: `calc(100% - ${theme.sidebar.width})`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3, 3),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface Props {
  open: boolean;
}

export default function HeaderLayout({ open }: Props) {
  const theme = useTheme();

  return (
    <AppBar position="fixed" open={open} sx={{
      height: theme.header.height,
      [theme.breakpoints.down(appConfig.breakMobileView)]: {
        width: '100%'
      },
    }}>
      <Toolbar >
        <Box sx={!open ? {
          [theme.breakpoints.up(appConfig.breakMobileView)]: {
            display: 'flex'
          },
          [theme.breakpoints.down(appConfig.breakMobileView)]: {
            display: 'flex'
          },
        } :
          {
            [theme.breakpoints.up(appConfig.breakMobileView)]: {
              display: 'none'
            },
          }
        }>
          <DrawerHeader>
            <Logo width={250} />
          </DrawerHeader>
        </Box>

        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  )
}
