import React from 'react'
import StatusCancel from '../Cancel'
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

describe('<StatusSuccess />', () => {
  it('renders', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusCancel />
        </BrowserRouter>
      </HelmetProvider>
    )
  })

  it('Shows the relevant elements', () => {
    cy.mount(
      <HelmetProvider>
        <BrowserRouter >
          <StatusCancel />
        </BrowserRouter>
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