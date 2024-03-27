import { HelmetProvider } from 'react-helmet-async';
import StatusMaintenance from '../Maintenance';

describe('<StatusMaintenance />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <StatusMaintenance />
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <StatusMaintenance />
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