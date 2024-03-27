import { HelmetProvider } from 'react-helmet-async';
import Status500 from '../Status500';

describe('<Status500 />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <Status500 />
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <Status500 />
      </HelmetProvider>
    )
    cy.contains('There was an error, please try again later')
    cy.contains('The server encountered an internal error and was not able to complete your request')
    cy.contains('Refresh view')
    cy.contains('Go back')
    cy.get('[alt="500"]')
      .should('be.visible')
  })
})