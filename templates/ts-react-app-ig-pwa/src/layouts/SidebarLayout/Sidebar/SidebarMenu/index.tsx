import { useContext } from 'react';

import {
  HomeOutlined
} from '@mui/icons-material';
import { Box, Button, List, ListItem, styled } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { AbilityGuard } from 'src/Guards/abilityGuard/AbilityGuard';
import { ABILITY_PAGES, ABILITY_TYPES } from 'src/config/ability';
import { SidebarContext } from 'src/context/SidebarContext';
import { useAuth } from 'src/features/authentication';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};
    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.sidebar.menuItemHeadingColor};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
    .MuiTypography-root {
      color: ${theme.sidebar.textColor};
    }
`,
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: white;
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: white;
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: red;
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${theme.sidebar.menuItemBgActive};
            color: ${theme.sidebar.menuItemColorActive};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.sidebar.menuItemIconColorActive};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create(['transform', 'opacity'])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`,
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <MenuWrapper>
        <List component='div'>
          <SubMenuWrapper>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/clients'
                    startIcon={<HomeOutlined />}
                  >
                    Clients
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/recommendations'
                    startIcon={<HomeOutlined />}
                  >
                    Recommendations
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/recipes'
                    startIcon={<HomeOutlined />}
                  >
                    Recipes
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/fieldAssessment'
                    startIcon={<HomeOutlined />}
                  >
                    Field Assessment
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/quotes'
                    startIcon={<HomeOutlined />}
                  >
                    Quotes
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/priceLists'
                    startIcon={<HomeOutlined />}
                  >
                    Price Lists
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/library'
                    startIcon={<HomeOutlined />}
                  >
                    Library
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to='/myAccount'
                    startIcon={<HomeOutlined />}
                  >
                    My Account
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
            <List component='div'>
              <AbilityGuard i={ABILITY_TYPES.VISIT} a={ABILITY_PAGES.HOME}>
                <ListItem component='div'>
                  <Button
                    startIcon={<HomeOutlined />}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                </ListItem>
              </AbilityGuard>
            </List>
          </SubMenuWrapper>
        </List >
      </MenuWrapper >
    </>
  );
}

export default SidebarMenu;
