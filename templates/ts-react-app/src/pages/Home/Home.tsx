import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from './Home.styles';

const HomePage = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Container maxWidth='lg'>
        <Typography variant='h3'>
          Home Page
        </Typography>
      </Container>
    </PageWrapper>
  );
};

export default HomePage;