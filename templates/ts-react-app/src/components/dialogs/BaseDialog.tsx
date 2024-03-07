import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { useAppZStore } from 'src/store/zStore';

// Dialog component
export const BaseDialog: React.FC = () => {
  const isDialogOpen = useAppZStore((state) => state.isDialogOpen);
  const closeDialog = useAppZStore((state) => state.closeDialog);
  const dialogContent = useAppZStore((state) => state.dialogContent);

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <Box p={2}>{dialogContent}</Box>
    </Dialog>
  );
};
