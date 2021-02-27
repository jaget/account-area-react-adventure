/// <reference types="cypress" />

describe('Visual regression test', () => {
  it('Order History', () => {
    cy.visit('/history');
    cy.matchImageSnapshot();
  });
});
