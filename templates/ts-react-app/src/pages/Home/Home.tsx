import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
// import AreaChartComponent from 'src/components/charts/AreaChartComponent';
// import BarChartComponent from 'src/components/charts/BarChartComponent';
// import PieChartComponent from 'src/components/charts/PieChartComponent';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
// import { Dashboard } from 'src/features/dashboard';
import ListUsers from 'src/features/users/components/listUsers/ListUsers';
import { HomeWrapper } from './Home.styles';
// import { DashboardComponentVM } from 'src/models/dashboard.model';

const HomePage = () => {

  // const componentList: DashboardComponentVM = {
  //   //Here you can add any component that need to render
  //   ListUsers: { component: <ListUsers /> },
  //   AreaChartComponent: { component: <AreaChartComponent /> },
  //   BarChartComponent: { component: <BarChartComponent /> },
  //   PieChartComponent: { component: <PieChartComponent />, showBorder: false },
  // };

  // const initialLayouts: ReactGridLayout.Layouts = {
  //   //Here you set the layout of these components
  //   lg: [

  //     {
  //       'w': 24,
  //       'h': 14,
  //       'x': 0,
  //       'y': 14,
  //       'i': 'ListUsers',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 6,
  //       'y': 0,
  //       'i': 'AreaChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 15,
  //       'y': 0,
  //       'i': 'BarChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 6,
  //       'h': 14,
  //       'x': 0,
  //       'y': 0,
  //       'i': 'PieChartComponent',
  //       'moved': false,
  //       'static': false
  //     }

  //   ], md: [

  //     {
  //       'w': 24,
  //       'h': 14,
  //       'x': 0,
  //       'y': 14,
  //       'i': 'ListUsers',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 6,
  //       'y': 0,
  //       'i': 'AreaChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 15,
  //       'y': 0,
  //       'i': 'BarChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 6,
  //       'h': 14,
  //       'x': 0,
  //       'y': 0,
  //       'i': 'PieChartComponent',
  //       'moved': false,
  //       'static': false
  //     }

  //   ], sm: [

  //     {
  //       'w': 24,
  //       'h': 14,
  //       'x': 0,
  //       'y': 14,
  //       'i': 'ListUsers',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 6,
  //       'y': 0,
  //       'i': 'AreaChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 15,
  //       'y': 0,
  //       'i': 'BarChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 6,
  //       'h': 14,
  //       'x': 0,
  //       'y': 0,
  //       'i': 'PieChartComponent',
  //       'moved': false,
  //       'static': false
  //     }
  //   ], xs: [
  //     {
  //       'w': 24,
  //       'h': 14,
  //       'x': 0,
  //       'y': 14,
  //       'i': 'ListUsers',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 6,
  //       'y': 0,
  //       'i': 'AreaChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 15,
  //       'y': 0,
  //       'i': 'BarChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 6,
  //       'h': 14,
  //       'x': 0,
  //       'y': 0,
  //       'i': 'PieChartComponent',
  //       'moved': false,
  //       'static': false
  //     }

  //   ], xxs: [
  //     {
  //       'w': 24,
  //       'h': 14,
  //       'x': 0,
  //       'y': 14,
  //       'i': 'ListUsers',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 6,
  //       'y': 0,
  //       'i': 'AreaChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 9,
  //       'h': 14,
  //       'x': 15,
  //       'y': 0,
  //       'i': 'BarChartComponent',
  //       'moved': false,
  //       'static': false
  //     },
  //     {
  //       'w': 6,
  //       'h': 14,
  //       'x': 0,
  //       'y': 0,
  //       'i': 'PieChartComponent',
  //       'moved': false,
  //       'static': false
  //     }

  //   ]
  // };

  return (
    <HomeWrapper>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME} showFallback>
        <Container maxWidth='lg'>
          <ListUsers />
          {/* <Dashboard canEdit={true} componentList={componentList} initialLayouts={initialLayouts} heading='Home' page={'BaseRepoDashboard'} /> */}
        </Container>
      </AbilityGuard>
    </HomeWrapper>
  );
};

export default HomePage;