describe('login', () => {
  it('Login User', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('auth/login');
    cy.get('#login-email-field').type('christiaan+baserepo1@octoco.ltd');
    cy.get('#login-password-field').type('OctocoTestPass@1234');
    cy.get('#login-button').click();
    /* ==== End Cypress Studio ==== */
  });
})