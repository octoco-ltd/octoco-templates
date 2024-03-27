import { HelmetProvider } from 'react-helmet-async';
import StatusCancel from '../Cancel';

describe('<StatusSuccess />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <StatusCancel />
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <StatusCancel />
      </HelmetProvider>
    )
    cy.contains('Continue')
    cy.contains('Canceled!')
    cy.get('[alt="Cancel"]')
      .should('be.visible')
    cy.get('[alt="Logo"]')
      .should('be.visible')
  })
})