import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
import { CreateNewClient, ViewClients } from 'src/features/clients';
import { HomeWrapper } from './Clients.styles';

const ClientsPage = () => {

  return (
    <HomeWrapper>
      <Helmet>
        <title>Clients Page</title>
      </Helmet>
      <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME} showFallback>
        <Container maxWidth='xl'>
          <CreateNewClient />
          <ViewClients />
        </Container>
      </AbilityGuard>
    </HomeWrapper>
  );
};

export default ClientsPage;