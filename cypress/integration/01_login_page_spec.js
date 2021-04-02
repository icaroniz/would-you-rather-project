describe('Login Flow', () => {
  it('There shoud be a way for the user to impersonate/log in as an existing user', () => {
    cy.visit('/')
    cy.get('[data-cy=user-select').should('be.visible').and('contain', 'John Doe')
  })
  it('The application works correctly regardless of which user is selected', () => {
    cy.visit('/')
    cy.login('johndoe')
    cy.get('[data-cy=not-voted-tab]').should('exist')

    cy.visit('/')
    cy.login('tylermcginnis')
    cy.get('[data-cy=not-voted-tab]').should('exist')

    cy.visit('/')
    cy.login('sarahedo')
    cy.get('[data-cy=not-voted-tab]').should('exist')
  })
  it('The application allows the user to log out and log back in', () => {
    cy.visit('/')

    cy.get('[data-cy=log-in-button]').should('exist')
    cy.get('[data-cy=log-out-button]').should('not.exist')

    cy.login('johndoe')

    cy.get('[data-cy=log-in-button]').should('not.exist')
    cy.get('[data-cy=log-out-button]').should('exist')

    cy.logout()

    cy.get('[data-cy=log-in-button]').should('exist')
    cy.get('[data-cy=log-out-button]').should('not.exist')
  })
  it('Once the user logs in, the home page is shown', () => {
    cy.visit('/')
    cy.login('johndoe')
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
  it('The user is asked to log in before the requested page is shown', () => {
    cy.visit('/')
    cy.login('johndoe')

    cy.visit('/something')
    cy.get('[data-cy=log-in-button]').should('exist')
  })
})