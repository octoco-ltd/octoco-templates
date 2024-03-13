import { ExpandLess, ExpandMore, HomeOutlined, Logout } from '@mui/icons-material';
import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import { Box, Button, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListSubheader, Theme, Typography } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import Logo from 'src/components/LogoSign';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
import appConfig from 'src/config/appConfig';
import { useAuth } from 'src/features/authentication';
import pages from 'src/router/routes';

const openedMixin = (theme: Theme): CSSObject => ({
    width: theme.sidebar.width,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up(appConfig.breakMobileView)]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: theme.sidebar.width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3, 3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function SidebarLayout({ open, setOpen }: Props) {
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const [openStatus, setOpenStatus] = useState(true);
    const { logout } = useAuth()
    const handleLogout = () => {
        try {
            logout()
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Drawer variant="permanent" open={open} sx={{
            display: {
                xs: 'none',
                [appConfig.breakMobileView]: 'inline-block',
            },
        }}>
            {open &&
                <DrawerHeader>
                    <Logo width={250} />
                </DrawerHeader>
            }
            <Divider textAlign='right' sx={{ mx: 1, mt: open ? 1 : `calc(${theme.header.height} + 20px)`, alignItems: 'center' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                >
                    <ViewSidebarRoundedIcon fontSize='small' />
                </IconButton>
            </Divider>

            <Box sx={{ mt: 1 }}>
                {!open && <Divider sx={{ my: 1, mx: 1 }} />}
                <ListItem component='div'>
                    <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                        {open ?
                            <Button
                                // disableRipple
                                fullWidth
                                component={RouterLink}
                                // onClick={closeSidebar}
                                to='/home'
                                startIcon={<HomeOutlined />}
                            >
                                <Typography>Home</Typography>
                            </Button>
                            :

                            <Box display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <IconButton sx={{ justifyContent: 'right' }}>
                                    <HomeOutlined />
                                </IconButton>
                            </Box>
                        }
                    </AbilityGuard>
                </ListItem>
                <ListItem component='div'>
                    <Box textAlign='center'>
                        {open ?
                            <Button
                                disableRipple
                                onClick={handleLogout}
                                startIcon={<Logout />}
                            >
                                Sign Out
                            </Button>
                            :
                            <IconButton sx={{ justifyContent: 'right' }}>
                                <Logout />
                            </IconButton>
                        }
                    </Box>
                </ListItem>
            </Box>
        </Drawer>
    )
}
