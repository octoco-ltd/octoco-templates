import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useAppZStore } from 'src/store/zStore';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

// Dialog component
export const BaseDialog: React.FC = () => {
  const isDialogOpen = useAppZStore((state) => state.isDialogOpen);
  const closeDialog = useAppZStore((state) => state.closeDialog);
  const dialogContent = useAppZStore((state) => state.dialogContent);
  const requireInteraction = useAppZStore((state) => state.requireInteraction);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={requireInteraction ? undefined : closeDialog}
      TransitionComponent={Transition}
    >
      <Box p={2}>{dialogContent}</Box>
    </Dialog>
  );
};
