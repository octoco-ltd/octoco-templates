import { Theme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled } from '@mui/material/styles';
import appConfig from 'src/config/appConfig';
import SidebarContent from './SidebarContent';
import HiddenWrapper from 'src/components/componentWrappers/HiddenWrapper';

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

const DesktopDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

const MobileDrawer = styled(MuiDrawer,)({
    zIndex: 10000,
});

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function SidebarLayout({ open, setOpen }: Props) {

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <HiddenWrapper desktopOnly>
                <DesktopDrawer
                    id="desktop-drawer"
                    className='desktop-drawer'
                    variant="permanent"
                    open={open}
                >
                    <SidebarContent open={open} handleDrawerToggle={handleDrawerToggle} />
                </DesktopDrawer>
            </HiddenWrapper>
            <HiddenWrapper mobileOnly>
                <MobileDrawer
                    id="mobile-drawer"
                    className='mobile-drawer'
                    variant="temporary"
                    open={open}
                    onClose={() => handleDrawerToggle()}
                >
                    <SidebarContent shouldCloseOnClick open={open} handleDrawerToggle={handleDrawerToggle} />
                </MobileDrawer>
            </HiddenWrapper>
        </>
    )
}
