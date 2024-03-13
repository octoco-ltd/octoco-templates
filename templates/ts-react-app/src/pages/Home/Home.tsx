import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
import ListUsers from 'src/features/users/components/listUsers/ListUsers';
import { HomeWrapper } from './Home.styles';
import MobileWrapper from 'src/components/componentWrappers/MobileWrapper';

const HomePage = () => {

  return (
    <HomeWrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME} showFallback>
        <Container maxWidth='xl'>
          <ListUsers />
        </Container>
      </AbilityGuard>
    </HomeWrapper>
  );
};

export default HomePage;