import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useAppZStore } from 'src/store/zStore';

// Drawer component
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
