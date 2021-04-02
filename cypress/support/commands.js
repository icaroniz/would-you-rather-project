// Log in as a user
Cypress.Commands.add('login', (username) => {
  cy.get('[data-cy=user-select]').select(username)
  cy.get('[data-cy=log-in-button]').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy=log-out-button]').click()
})