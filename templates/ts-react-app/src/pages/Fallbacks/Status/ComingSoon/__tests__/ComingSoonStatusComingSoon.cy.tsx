import { HelmetProvider } from 'react-helmet-async';
import StatusComingSoon from '../ComingSoon';

describe('<StatusComingSoon />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <StatusComingSoon />
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <StatusComingSoon />
      </HelmetProvider>
    )
    cy.contains('We\'re working on implementing the last features before our launch!')
    cy.contains('Coming Soon')
    cy.get('[alt="Coming Soon"]')
      .should('be.visible')
    cy.get('[alt="Logo"]')
      .should('be.visible')
  })
})