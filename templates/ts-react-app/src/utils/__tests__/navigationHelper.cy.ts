import { openInNewTab } from '../navigationHelpers';

describe('openInNewTab', () => {
    it('opens a new tab with the provided URL', () => {
        // Use Cypress to test the openInNewTab function
        cy.window().then((win) => {
            const mockWindowOpen = cy.stub(win, 'open').as('windowOpen');

            openInNewTab('https://www.example.com');

            cy.get('@windowOpen').should('be.calledWith', 'https://www.example.com', '_blank', 'noopener,noreferrer');
        });
    });
});
