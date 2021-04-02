describe('Question page', () => {
  it('When a poll is clicked on the home page, correct info is shown', () => {
    cy.visit('/')
    cy.login('johndoe')

    cy.get('a[href*="8xf0y6ziyjabvozdd253nd"]').click()

    cy.contains("Would You Rather") // * the text "Would You Rather"
    cy.get('img[data-cy=creator-image]') // * the picture of the user who posted the polling question; and
    cy.contains("have horrible short term memory")
    cy.contains("have horrible long term memory") // * the two options
  })
  it('For answered polls, each of the two options contain certain info', () => {
    cy.visit('/questions/6ni6ok3ym7mf1p33lnez')
    cy.login('johndoe')

    cy.get('[data-cy=question-option]').as('question-options')

    cy.get('@question-options').first().contains("become a superhero")// * the text of the option;
    cy.get('@question-options').first().contains("0 people voted") // *  the number of people who voted for that option;
    cy.get('@question-options').first().contains("0%") // * the percentage of people who voted for that option.

    cy.get('@question-options').last().contains("become a supervillain")// * the text of the option;
    cy.get('@question-options').last().contains("2 people voted") // *  the number of people who voted for that option;
    cy.get('@question-options').last().contains("100%") // * the percentage of people who voted for that option.
  })
  it('The option selected by the logged in user should be clearly marked.', () => {
    cy.visit('/questions/6ni6ok3ym7mf1p33lnez')
    cy.login('johndoe')

    cy.get('[data-cy=question-option]').as('question-options').should('have.class', 'voted')
    cy.get('@question-options').first().should('not.have.class', 'voted-option')
    cy.get('@question-options').last().should('have.class', 'voted-option')
  })
  it('When the user is logged in, the details of the poll are shown. If the user is logged out')
  it('shows buttons to select not voted question', () => {
    cy.visit('/questions/8xf0y6ziyjabvozdd253nd')
    cy.login('johndoe')

    cy.get('.select-option-button').should('have.length', 2)

    cy.get('.select-option-button').first().click()
    cy.get('.selected-option-button').should('not.exist')
  })
  it('when option is selected', () => {
    cy.visit('/questions/8xf0y6ziyjabvozdd253nd')
    cy.login('johndoe')

    cy.get('[data-cy=question-option]').as('question-options')

    cy.get('@question-options').first().find('button').click()

    cy.get('@question-options').find('button').should('be.disabled');
  })
})