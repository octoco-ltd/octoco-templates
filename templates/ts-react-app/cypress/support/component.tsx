/* eslint-disable @typescript-eslint/no-namespace */
import { MemoryRouter } from 'react-router-dom';
import './commands'
import { mount } from 'cypress/react18'
import * as React from 'react';
import { Provider } from 'react-redux'
import store from '../../src/store/store'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component, options: Partial<any> = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options
  const { reduxStore = store } = options

  const wrapped = (
    <Provider store={reduxStore}>
      <MemoryRouter {...routerProps}>
        {component}
      </MemoryRouter>
    </Provider>
  );

  return mount(wrapped, mountOptions)
})