import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useAppZStore } from 'src/store/zStore';

// Drawer component
/**
 * BaseDrawer component represents a drawer that can be opened and closed.
 * It renders the drawer content and handles the state of the drawer.
 */
export const BaseDrawer: React.FC = () => {
  const isDrawerOpen = useAppZStore((state) => state.isDrawerOpen);
  const closeDrawer = useAppZStore((state) => state.closeDrawer)
  const drawerDirection = useAppZStore((state) => state.drawerDirection)
  const drawerContent = useAppZStore((state) => state.drawerContent)
  const drawerWidth = useAppZStore((state) => state.drawerWidth)

  return (
    <Drawer
      anchor={drawerDirection}
      open={isDrawerOpen}
      onClose={closeDrawer}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
      PaperProps={{
        sx: { width: `${drawerWidth}vw` },
      }}

    >
      {drawerContent}
    </Drawer>
  );
};
