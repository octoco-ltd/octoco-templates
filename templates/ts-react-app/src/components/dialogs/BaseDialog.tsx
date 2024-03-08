import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { useAppZStore } from 'src/store/zStore';

// Dialog component
/**
 * BaseDialog component.
 * 
 * This component represents a base dialog that can be used as a template for creating custom dialogs.
 * It renders a dialog with the provided content and handles the open and close state.
 */
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
