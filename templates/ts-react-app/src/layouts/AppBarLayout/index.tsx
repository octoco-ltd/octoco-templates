import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderLayout from './components/HeaderLayout';
import SidebarLayout from './components/SiderbarLayout';

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HeaderLayout open={open} />
            <SidebarLayout open={open} setOpen={setOpen} />
            <Box
                sx={{
                    mt: `calc(${theme.header.height} + 20px)`,
                    width: `calc(100% - ${theme.sidebar.width})`,
                    flexGrow: 1,
                }}>
                <Outlet />
            </Box>
        </Box>
    );
}