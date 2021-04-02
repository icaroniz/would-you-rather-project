describe('Application Functionality', () => {
  describe('Does the home page have the desired functionality?', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.login('johndoe')
    })

    it('The answered and unanswered polls are both available at the root', () => {
      cy.get('[data-cy=voted-tab]').should('exist')
      cy.get('[data-cy=not-voted-tab]').should('exist')
    })
    it('The user can alternate between viewing answered and unaswered polls', () => {
      // --- Not Voted polls
      cy.contains('become a superhero').should('not.exist')
      cy.contains('become a supervillain').should('not.exist')

      cy.contains('be telekinetic')
      cy.contains('be telepathic')

      // --- Voted polls
      cy.get('[data-cy=voted-tab]').click()
      cy.contains('become a superhero')
      cy.contains('become a supervillain')

      cy.contains('be telekinetic').should('not.exist')
      cy.contains('be telepathic').should('not.exist')
    })
    it('The unanswered questions are shown by default', () => {
      cy.contains('have horrible short term memory')
      cy.contains('have horrible long term memory')

      cy.contains('be telekinetic')
      cy.contains('be telepathic')
    })
    it('The name of the logged in user is visible on the page', () => {
      cy.contains('John Doe')
    })
    it('The user can navigate to the leaderboard', () => {
      cy.contains('Leaderboard').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/leaderboard')
    })
    it('The user can navigate to the form that allows the user to create a new poll', () => {
      cy.contains('Add poll').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/add')
    })
    it('Each polling question resides in the correct category', () => {
      cy.get('[data-cy="question-row"]').should('have.length', 3)
    })
    it('A polling question links to details of that poll', () => {
      cy.get('[data-cy=question-row]').contains('be telekinetic').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/questions/am8ehyc8byjqgar0jgpub9')
    })
    it('The polls in both categories are arranged from the most recently created (top) to the least recently created (botom)', () => {
      // --- Not Voted polls
      cy.get('[data-cy=question-row]').as('not-voted-questions')

      cy.get('@not-voted-questions').first().contains('be telekinetic')
      cy.get('@not-voted-questions').first().contains('be telepathic')

      cy.get('@not-voted-questions').last().contains('have horrible short term memory')
      cy.get('@not-voted-questions').last().contains('have horrible long term memory')

      // --- Voted polls
      cy.get('[data-cy=voted-tab]').click()
      cy.get('[data-cy=question-row]').as('voted-questions')

      cy.get('@voted-questions').first().contains('write JavaScript')
      cy.get('@voted-questions').first().contains('write Swift')

      cy.get('@voted-questions').last().contains('become a superhero')
      cy.get('@voted-questions').last().contains('become a supervillain')
    })
  })
})
