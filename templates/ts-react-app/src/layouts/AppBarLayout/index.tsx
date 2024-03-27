import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import HeaderLayout from './components/HeaderLayout';
import SidebarLayout from './components/SiderbarLayout';
import { useState } from 'react';

const ContentBox = styled(Box)(({ theme }) => ({
    marginTop: `calc(${theme.header.height} + 20px)`,
    width: `calc(100% - ${theme.sidebar.width})`,
    flexGrow: 1,
}));

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

/**
 * Renders the AppBarLayout component.
 * This component represents the layout of the application's app bar, sidebar, and content.
 */
export default function AppBarLayout() {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex' }} id='app-bar-layout-container'>
            <CssBaseline />
            <HeaderLayout open={open} setOpen={setOpen} />
            <SidebarLayout open={open} setOpen={setOpen} />
            <ContentBox>
                <Outlet />
            </ContentBox>
        </Box >
    );
}