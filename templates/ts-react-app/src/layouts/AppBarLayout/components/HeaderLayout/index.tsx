import { CloseTwoTone, MenuTwoTone } from '@mui/icons-material';
import { Box, Hidden, styled, useTheme } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Logo from 'src/components/LogoSign';
import appConfig from 'src/config/appConfig';
import { ThemeSwitch } from 'src/features/appTheme';
import { AppBarProps } from '../..';
import HiddenWrapper from 'src/components/componentWrappers/HiddenWrapper';

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

const DrawerHeader = styled('div')<AppBarProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3, 3),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  height: theme.header.height,
  [theme.breakpoints.down(appConfig.breakMobileView)]: {
    width: '100%'
  },
  backgroundColor: theme.header.background,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
}));

const LogoAnimationBox = styled(Box)(() => ({
  animation: 'logoShowHeader 1s ease 0s 1 normal forwards',
  '@keyframes logoShowHeader': {
    '0%': {
      opacity: 0,
      transform: 'rotateY(-100deg)',
      transformOrigin: 'right',
    },
    '100%': {
      opacity: 1,
      transform: 'rotateY(0)',
      transformOrigin: 'right',
    },
  },
}));

const HamburgerIconButton = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up(appConfig.breakMobileView)]: {
    display: 'none'
  },
  marginRight: 10,
  color: theme.palette.primary.main,
}));

const shouldForwardProp = <CustomProps extends Record<string, unknown>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey,
): boolean => !props.includes(prop as string)

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => shouldForwardProp<{ open: boolean }>(['open'], prop),
})<{ open: boolean }>(
  ({ theme, open }) => (
    !open ? {
      [theme.breakpoints.up(appConfig.breakMobileView)]: {
        display: 'flex'
      },
      [theme.breakpoints.down(appConfig.breakMobileView)]: {
        display: 'flex',
      },
    } :
      {
        [theme.breakpoints.up(appConfig.breakMobileView)]: {
          display: 'none'
        },
      }
  ),
);

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function HeaderLayout({ open, setOpen }: Props) {
  const theme = useTheme();

  return (
    <StyledAppBar position="fixed" open={open} id='header-layout-app-bar'>
      <StyledBox open={open}>
        <DrawerHeader id='header-layout-drawer-header'>
          <LogoAnimationBox>
            <HiddenWrapper mobileOnly>
              <Logo width={150} />
            </HiddenWrapper>
            <HiddenWrapper desktopOnly>
              <Logo width={250} />
            </HiddenWrapper>
          </LogoAnimationBox>
        </DrawerHeader>

      </StyledBox>
      <HamburgerIconButton onClick={() => setOpen(!open)}>
        {!open ? (
          <MenuTwoTone fontSize='medium' id='header-layout-hamburger-icon' />
        ) : (
          <CloseTwoTone fontSize='medium' id='header-layout-hamburger-close-icon' />
        )}
      </HamburgerIconButton>
      <HiddenWrapper desktopOnly>
        {/* This empty Box is a placeholder for the space-between */}
        <Box></Box>
        <ThemeSwitch />
      </HiddenWrapper>
    </StyledAppBar>
  )
}
