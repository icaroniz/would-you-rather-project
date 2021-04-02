describe("New polls", () => {
  beforeEach(() => {
    cy.visit('/add')
    cy.login('johndoe')
  })
  it('The form is available at `/add`', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/add')
  })
  it("The application shows the text 'Would You Rather' and has a form for creating two options", () => {
    cy.contains("Would You Rather")
    cy.get('input[type=text]').should('have.length', 2);
  })
  it("Upon submitting the form, a new poll is created and the user is taken to the home page", () => {
    cy.get('input[type=text]').as('selections')

    cy.get('@selections').first().type('see the future')
    cy.get('@selections').last().type('see the past')
    cy.get('form').submit()

    cy.url().should('eq', Cypress.config().baseUrl + '/') // The user is taken to the home page

    // The new polling question appears in the correct category on the home page
    cy.get('[data-cy=not-voted-tab]').click()
    cy.contains('see the future')
    cy.contains('see the past')
  })
  it("Created polls have the correct information", () => {
    cy.get('input[type=text]').as('selections')

    cy.get('@selections').first().type('see the future')
    cy.get('@selections').last().type('see the past')
    cy.get('form').submit()

    cy.contains('see the future or see the past').click()

    cy.get('[data-cy=question-option]').as('question-options')

    cy.get('@question-options').first().contains("see the future")// * the text of the option;
    cy.get('@question-options').first().contains("0 people voted") // *  the number of people who voted for that option;
    cy.get('@question-options').first().contains("0%") // * the percentage of people who voted for that option.

    cy.get('@question-options').last().contains("see the past")// * the text of the option;
    cy.get('@question-options').last().contains("0 people voted") // *  the number of people who voted for that option;
    cy.get('@question-options').last().contains("0%") // * the percentage of people who voted for that option.
    // 0 people voted
    // 0%
  })
})