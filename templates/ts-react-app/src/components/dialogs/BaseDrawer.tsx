import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useDrawerStore } from 'src/store/drawer/drawerSlice';

// Drawer component
export const BaseDrawer: React.FC = () => {
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const closeDrawer = useDrawerStore((state) => state.closeDrawer)
  const drawerDirection = useDrawerStore((state) => state.drawerDirection)
  const drawerContent = useDrawerStore((state) => state.drawerContent)
  const drawerWidth = useDrawerStore((state) => state.drawerWidth)

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
