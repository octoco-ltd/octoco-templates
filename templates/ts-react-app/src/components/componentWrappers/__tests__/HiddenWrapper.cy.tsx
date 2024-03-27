import { ThemeProvider } from '@emotion/react';
import { themeCreator } from 'src/features/appTheme/base';
import HiddenWrapper from '../HiddenWrapper';

describe('HiddenWrapper', () => {
    it('should not render children when hidden', () => {
        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <HiddenWrapper>
                    <div>Test Content</div>
                </HiddenWrapper>
            </ThemeProvider>
        );

        cy.contains('Test Content').should('not.exist');
    });

    it('should hide component on desktop screens when mobileOnly flag is true', () => {
        cy.viewport('macbook-15');

        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <HiddenWrapper mobileOnly>
                    <div>Test Content</div>
                </HiddenWrapper>
            </ThemeProvider>
        );

        cy.contains('Test Content').should('not.exist');
    });

    it('should hide component on mobile screens when desktopOnly flag is true', () => {
        cy.viewport('iphone-6');

        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <HiddenWrapper desktopOnly>
                    <div>Test Content</div>
                </HiddenWrapper>
            </ThemeProvider>
        );

        cy.contains('Test Content').should('not.exist');
    });

    it('should show component on desktop screens when desktopOnly flag is true', () => {
        cy.viewport('macbook-16')

        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <HiddenWrapper desktopOnly>
                    <div>Test Content</div>
                </HiddenWrapper>
            </ThemeProvider>
        );

        cy.contains('Test Content').should('be.visible');
    });

    it('should not hide component on mobile screens when mobileOnly flag is true', () => {
        cy.viewport('iphone-6');

        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <HiddenWrapper mobileOnly>
                    <div>Test Content</div>
                </HiddenWrapper>
            </ThemeProvider>
        );

        cy.contains('Test Content').should('be.visible');
    });

    it('should not hide component when both mobileOnly and desktopOnly flags are true', () => {
        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <HiddenWrapper mobileOnly desktopOnly>
                    <div>Test Content</div>
                </HiddenWrapper>
            </ThemeProvider>
        );

        cy.contains('Test Content').should('be.visible');
    });

    it('should hide component when both mobileOnly and desktopOnly flags are false', () => {
        cy.mount(
            <ThemeProvider theme={themeCreator('NebulaFighterTheme')}>
                <HiddenWrapper>
                    <div>Test Content</div>
                </HiddenWrapper>
            </ThemeProvider>
        );

        cy.contains('Test Content').should('not.exist');
    });
});
