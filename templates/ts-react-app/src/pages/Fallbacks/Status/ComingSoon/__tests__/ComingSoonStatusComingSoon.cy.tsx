import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import StatusComingSoon from '../ComingSoon';

describe('<StatusComingSoon />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusComingSoon />
        </BrowserRouter>
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusComingSoon />
        </BrowserRouter>
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