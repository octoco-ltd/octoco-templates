import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import NProgress from 'nprogress';
import { useEffect } from 'react';

interface Props {
  message?: string;
}

/**
 * A component that displays a loading spinner and a message while content is being loaded.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to be displayed.
 * @returns {JSX.Element} The rendered SuspenseLoader component.
 */
function SuspenseLoader({ message }: Props) {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress size={64} disableShrink thickness={3} />
        <Typography variant='h2'>{message}</Typography>
      </Stack>
    </Box >
  );
}

export default SuspenseLoader;
