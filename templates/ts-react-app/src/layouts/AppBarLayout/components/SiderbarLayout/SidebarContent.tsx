import { AccessAlarm, HomeOutlined, Logout } from '@mui/icons-material';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { Box, Button, Divider, Hidden, IconButton, ListItem, Paper, Stack, Typography, lighten, styled, useTheme } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import Logo from 'src/components/LogoSign';
import UserInfo from 'src/components/UserInfo/UserInfo';
import UserAvatar from 'src/components/avatar/UserAvatar';
import HiddenWrapper from 'src/components/componentWrappers/HiddenWrapper';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
import { ThemeSwitch } from 'src/features/appTheme';
import { useAuth } from 'src/features/authentication';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const LogoAnimationBox = styled(Box)(() => ({
    animation: 'logoShowSideBar 1s ease 0s 1 normal forwards',
    '@keyframes logoShowSideBar': {
        '0%': {
            opacity: 0,
            transform: 'rotateY(100deg)',
            transformOrigin: 'left',
        },
        '100%': {
            opacity: 1,
            transform: 'rotateY(0)',
            transformOrigin: 'left',
        },
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    justifyContent: 'left',
    '&.active': {
        border: `1px solid ${theme.palette.primary.main}`,
        animation: 'borderAnimation 2s ease',
    },
    '&:hover': {
        transform: 'scale(1.02)',
    },
    '@keyframes borderAnimation': {
        '0%': {
            borderLeftColor: 'transparent',
            borderTopColor: 'transparent',
        },
        '20%': {
            borderTopColor: lighten(theme.palette.secondary.main, 0.5),
        },
        '50%': {
            borderLeftColor: lighten(theme.palette.secondary.main, 0.5),
        },
        '100%': {
            borderRightColor: theme.palette.secondary.main,
        },
    },
})) as typeof Button;

interface Props {
    open: boolean;
    handleDrawerToggle: () => void;
    shouldCloseOnClick?: boolean;
}

export default function SidebarContent({ open, handleDrawerToggle, shouldCloseOnClick = false }: Props) {
    const theme = useTheme();
    const { logout } = useAuth()

    const handleNavButtonClick = () => {
        if (shouldCloseOnClick) {
            handleDrawerToggle();
        }
    }

    const handleLogout = () => {
        console.log('logout')
        try {
            logout()
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            {open &&
                <DrawerHeader id='sidebar-logo'>
                    <LogoAnimationBox>
                        <Logo width={250} />
                    </LogoAnimationBox>
                </DrawerHeader>
            }

            <Divider
                textAlign='right'
                id='sidebar-layout-divider'
                sx={{
                    mx: 1,
                    mt: open ? 1 : `calc(${theme.header.height} + 20px)`,
                    alignItems: 'center'
                }}
            >
                <HiddenWrapper mobileOnly>
                    <ThemeSwitch />
                </HiddenWrapper>
                <IconButton
                    color='secondary'
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                >
                    {open ? <FirstPageRoundedIcon fontSize='medium' color='primary' id='sidebar-layout-close' /> : <LastPageRoundedIcon fontSize='medium' color='primary' id='sidebar-layout-open' />}

                </IconButton>
            </Divider>

            <Stack direction='column' justifyContent='space-between' sx={{ mt: 1.5, height: '100%' }}>
                <div>
                    {!open && <Divider sx={{ my: 1, mx: 1 }} />}
                    <ListItem component='div'>
                        <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                            <NavButton
                                fullWidth
                                component={RouterLink}
                                onClick={() => handleNavButtonClick()}
                                to='/home'
                                startIcon={<HomeOutlined color='secondary' />}
                            >
                                {open ?
                                    <Typography color='secondary' variant='h6'>Home</Typography>
                                    : null
                                }
                            </NavButton>
                        </AbilityGuard>
                    </ListItem>
                    <ListItem component='div'>
                        <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                            <NavButton
                                fullWidth
                                component={RouterLink}
                                to='/page1'
                                onClick={() => handleNavButtonClick()}
                                startIcon={<AccessAlarm color='secondary' />}
                            >
                                {open ?
                                    <Typography color='secondary' variant='h6'>Page 1</Typography>
                                    : null
                                }
                            </NavButton>
                        </AbilityGuard>
                    </ListItem>
                </div>
                <div>
                    <ListItem component='div' >
                        <Button
                            id='logout-button'
                            fullWidth
                            startIcon={<Logout color='secondary' />}
                            sx={{ justifyContent: 'left' }}
                            onClick={() => handleLogout()}
                        >
                            {open ?
                                <Typography color='secondary' variant='h6'>Logout</Typography>
                                : null
                            }
                        </Button>
                    </ListItem>
                </div>
            </Stack>
        </>
    );
}
