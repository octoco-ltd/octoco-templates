import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
import { HomeWrapper } from './Library.styles';
import StatusComingSoon from '../Fallbacks/Status/ComingSoon/ComingSoon';

const LibraryPage = () => {

  return (
    <HomeWrapper>
      <Helmet>
        <title>Library Page</title>
      </Helmet>
      <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME} showFallback>
        <Container maxWidth='lg'>
          <Box m={3}>
            <StatusComingSoon />
          </Box>
        </Container>
      </AbilityGuard>
    </HomeWrapper>
  );
};

export default LibraryPage;