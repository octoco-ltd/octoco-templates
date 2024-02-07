import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import { ABILITY_TYPES, ABILITY_PAGES } from 'src/config/ability';
import ListPosts from 'src/features/posts/components/listPosts/ListPosts';
import { HomeWrapper } from '../Home/Home.styles';
import { useParams } from 'react-router-dom';

const UserPage = () => {

  const { userId } = useParams<{ userId: string }>();
  

  return (
    <HomeWrapper>
      <Helmet>
        <title>User</title>
      </Helmet>
      <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME} showFallback>
        <Container maxWidth='lg'>
           <ListPosts userId={userId}/>
        </Container>
      </AbilityGuard>
    </HomeWrapper>
  );
};

export default UserPage;
