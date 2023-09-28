import Status500 from '../Status500'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

describe('<Status500 />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <Status500 />
        </BrowserRouter>
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <Status500 />
        </BrowserRouter>
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