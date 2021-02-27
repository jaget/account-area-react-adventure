/// <reference types="cypress" />

describe('Visual regression test', () => {
  it('Order History', () => {
    cy.visit('/history');
    cy.matchImageSnapshot(); //Compare the current visual state of the page to our stored snapshot (located in cypress/snapshots/<test_name>.png)
  });
});
