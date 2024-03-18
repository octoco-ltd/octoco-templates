import { FC, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  OutlinedInput,
  IconButton,
  Tooltip,
  FormControl,
  InputAdornment,
  Button,
  FormHelperText,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Logo from 'src/components/LogoSign';

import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { LoadingButton } from '@mui/lab';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
);


export function StatusComingSoon() {
  return (
    <>
      <Helmet>
        <title>Status - Coming Soon</title>
      </Helmet>
      <MainContent>
        <Container maxWidth='md'>
          <Logo />
          <Box textAlign='center' mb={3}>
            <Container maxWidth='xs'>
              <Typography variant='h1' sx={{ mt: 4, mb: 2 }}>
                Coming Soon
              </Typography>
              <Typography variant='h6' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
                We're working on implementing the last features before our launch!
              </Typography>
            </Container>
            <img alt='Coming Soon' height={200} src='/static/images/status/coming-soon.svg' />
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusComingSoon;
