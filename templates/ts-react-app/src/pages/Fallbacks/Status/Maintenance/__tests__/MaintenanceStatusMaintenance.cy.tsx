import StatusMaintenance from '../Maintenance'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

describe('<StatusMaintenance />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusMaintenance />
        </BrowserRouter>
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusMaintenance />
        </BrowserRouter>
      </HelmetProvider>
    )
    cy.contains('The site is currently down for maintenance')
    cy.contains('We apologize for any inconveniences caused')
    cy.get('[alt="Maintenance"]')
      .should('be.visible')
    cy.get('[alt="Logo"]')
      .should('be.visible')
  })
})