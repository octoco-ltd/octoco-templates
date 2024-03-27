import StatusFailure from '../Failure'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

describe('<StatusFailure />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <StatusFailure />
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <StatusFailure />
      </HelmetProvider>
    )
    cy.contains('Continue')
    cy.contains('Oops, something went wrong!')
    cy.get('[alt="failure"]')
      .should('be.visible')
    cy.get('[alt="Logo"]')
      .should('be.visible')
  })
})