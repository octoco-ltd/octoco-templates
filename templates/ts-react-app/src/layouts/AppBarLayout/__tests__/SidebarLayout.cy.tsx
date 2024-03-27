/* eslint-disable cypress/no-unnecessary-waiting */
import { ThemeProvider } from '@emotion/react';
import { themeCreator } from 'src/features/appTheme/base';
import AppBarLayout from '..';
import { AbilityContext } from 'src/context/canContext';
import defineAbilityFor from 'src/config/ability';

describe('Header Layout component', () => {

    const ability = defineAbilityFor('admin');

    it('renders HeaderLayout component', () => {
        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <AppBarLayout />
            </ThemeProvider>
        );

        // Assert that the header layout is rendered
        cy.get('[id="header-layout-app-bar"]').should('be.visible');
        // Assert that the header drawer is rendered
        cy.get('[id="header-layout-drawer-header"]').should('be.visible');
        // Assert that the header logo is rendered
        cy.get('[alt="Logo"]').should('be.visible');
    });

    it('MOBILE - renders Sidebar Layout component and that one can open and close the sidebar', () => {
        cy.viewport('iphone-6');

        cy.mount(
            <AbilityContext.Provider value={ability}>
                <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                    <AppBarLayout />
                </ThemeProvider>
            </AbilityContext.Provider>
        );

        // Assert that the sidebar layout is not rendered as it is not open
        cy.get('[id="mobile-drawer"]').should('not.exist');
        //assert that the logout button is not visible as it is not open
        cy.get('[id="logout-button"]').should('not.exist');

        // Click on the hamburger icon
        cy.get('[id="header-layout-hamburger-icon"]').click();
        // Assert that the sidebar layout is now rendered
        cy.get('[id="mobile-drawer"]').should('be.visible');

        //assert that the logout button is visible
        cy.get('[id="logout-button"]').should('be.visible');

        // Assert that the logo now exists two times because of overlay drawer that has been added      
        cy.get('[alt="Logo"]').then(($list) => {
            expect($list).to.have.length(2);
        });
        //Assert that the theme button is now visible because it is in the overlay drawer
        cy.get('[id="theme-switch-icon"]').should('be.visible');
        //Assert that the close icon is visible
        cy.get('[id="sidebar-layout-close"]').should('be.visible');

        //waiting so that we are sure that the sidebar is open
        cy.wait(1000);

        //assert that the logout button is visible as it is open
        cy.get('[id="logout-button"]').should('be.visible');

        //assert that the theme switch button is there as it is open
        cy.get('[id="theme-switch-icon"]').should('be.visible');

        //Close the sidebar
        cy.get('[id="sidebar-layout-close"]').click();

        //Assert that the close icon is not visible anymore
        cy.get('[id="sidebar-layout-close"]').should('not.exist');

    });

    it('DESKTOP - renders HeaderLayout with all necessary components and that the sidebar can be open and closed', () => {
        cy.viewport('macbook-15');

        cy.mount(
            <AbilityContext.Provider value={ability}>
                <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                    <AppBarLayout />
                </ThemeProvider>
            </AbilityContext.Provider>
        );

        // Assert that the header layout is rendered
        cy.get('[id="desktop-drawer"]').should('be.visible');

        // Assert that the sidebar logo is not rendered as it is not open
        cy.get('[id="sidebar-logo"]').should('not.exist');

        // Assert that the sidebar layout divider is rendered
        cy.get('[id="sidebar-layout-divider"]').should('be.visible');

        // Open the sidebar
        cy.get('[id="sidebar-layout-open"]').click();
        //waiting so that we are sure that the sidebar is open
        cy.wait(1000);
        //Assert that the close icon is now visible
        cy.get('[id="sidebar-layout-close"]').should('be.visible');
        //Assert that the open icon is not visible anymore
        cy.get('[id="sidebar-layout-open"]').should('not.exist');

        //Close the sidebar
        cy.get('[id="sidebar-layout-close"]').click();
        //Assert that the close icon is not visible anymore
        cy.get('[id="sidebar-layout-close"]').should('not.exist');
        //Assert that the open icon is visible again
        cy.get('[id="sidebar-layout-open"]').should('be.visible');

    });
});