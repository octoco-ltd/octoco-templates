import { ThemeProvider } from '@emotion/react';
import { themeCreator } from 'src/features/appTheme/base';
import AppBarLayout from '..';

describe('AppBarLayout component', () => {

    it('renders AppBarLayout container', () => {
        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <AppBarLayout />
            </ThemeProvider>
        );

        // Assert that the header layout is rendered
        cy.get('[id="app-bar-layout-container"]').should('be.visible');
    });
});
