import { Box, Container, Divider, Typography } from '@mui/material';
import Logo from 'src/components/LogoSign';

import { styled } from '@mui/material/styles';

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

interface Props {
    message?: (string | undefined)[]
}

function InvalidEnv({ message }: Props) {

    return (
        <>
            <MainContent>
                <Container maxWidth='md'>
                    <Box textAlign='center'>
                        <Container maxWidth='sm'>
                            <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
                                Invalid Environment Variables
                            </Typography>
                            <Divider sx={{ my: 4 }} />
                            <Typography
                                variant='body1'
                                color='text.secondary'
                                fontWeight='normal'
                                sx={{ mb: 4 }}
                            >
                                {message}
                            </Typography>
                            <Divider sx={{ my: 4 }} />
                        </Container>
                        <img alt='failure' height={250} src='/static/images/status/fail.svg' />
                    </Box>

                </Container>
            </MainContent>
        </>
    );
}

export default InvalidEnv;
