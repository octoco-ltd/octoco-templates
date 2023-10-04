import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import StatusSuccess from '../Success';

describe('<StatusSuccess />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusSuccess />
        </BrowserRouter>
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusSuccess />
        </BrowserRouter>
      </HelmetProvider>
    )
    cy.contains('Continue')
    cy.contains('Success!')
    cy.get('[alt="Maintenance"]')
      .should('be.visible')
    cy.get('[alt="Logo"]')
      .should('be.visible')
  })
})