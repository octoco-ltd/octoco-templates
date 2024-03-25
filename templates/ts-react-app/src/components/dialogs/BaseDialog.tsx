import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { useDialogStore } from 'src/store/dialog/dialogStore';

// Dialog component
export const BaseDialog: React.FC = () => {
  const isDialogOpen = useDialogStore((state) => state.isDialogOpen);
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const dialogContent = useDialogStore((state) => state.dialogContent);

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <Box p={2}>{dialogContent}</Box>
    </Dialog>
  );
};
