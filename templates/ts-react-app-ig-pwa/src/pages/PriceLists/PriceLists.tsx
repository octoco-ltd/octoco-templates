import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
import { HomeWrapper } from './PriceLists.styles';
import StatusComingSoon from '../Fallbacks/Status/ComingSoon/ComingSoon';

const PriceListsPage = () => {

  return (
    <HomeWrapper>
      <Helmet>
        <title>Price Lists Page</title>
      </Helmet>
      <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME} showFallback>
        <Box m={3}>
          <StatusComingSoon />
        </Box>
      </AbilityGuard>
    </HomeWrapper>
  );
};

export default PriceListsPage;