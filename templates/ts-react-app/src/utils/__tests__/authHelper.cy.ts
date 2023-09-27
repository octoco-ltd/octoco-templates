import { NetworkStatusEnums } from '../enums/networkSTatusEnums';

describe('NetworkStatusEnums', () => {
  it('contains the correct values', () => {
    // Assertions using Cypress
    cy.wrap(NetworkStatusEnums.IDLE).should('eq', 'idle');
    cy.wrap(NetworkStatusEnums.LOADING).should('eq', 'loading');
    cy.wrap(NetworkStatusEnums.SUCCESS).should('eq', 'authenticated');
    cy.wrap(NetworkStatusEnums.FAILED).should('eq', 'error');
    cy.wrap(NetworkStatusEnums.REGISTERED).should('eq', 'registered');
  });

  it('does not contain unexpected values', () => {
    // Get all values of NetworkStatusEnums and compare them
    cy.wrap(Object.values(NetworkStatusEnums)).should('deep.equal', [
      'idle',
      'loading',
      'authenticated',
      'error',
      'registered',
    ]);
  });
});
