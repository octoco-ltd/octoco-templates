import Status404 from '../Status404'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

describe('<Status404 />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <Status404 />
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <Status404 />
      </HelmetProvider>
    )
    cy.contains('The page you were looking for doesn\'t exist.')
    cy.contains('Please use the side menu to navigate')
    cy.contains('Go to homepage')
    cy.get('[alt="404"]')
      .should('be.visible')
  })
})