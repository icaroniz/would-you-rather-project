describe("Leaderboard", () => {
  beforeEach(() => {
    cy.visit('/leaderboard')
    cy.login('johndoe')
  })
  it("The leaderboard is available at `/leaderboard`", () => {
    cy.contains('Leaderboard')
  })
  it("The correct information is shown", () => {
    cy.get('[data-cy=user]').first().as('user')

    cy.get('@user').contains('Sarah Edo') // The user's name
    cy.get('@user').find('img[data-cy=user-img]') // The user's picture
    cy.get('@user').find('[data-cy=questions-created]').contains(2) // The number of questions the user asked; and
    cy.get('@user').find('[data-cy=voted-questions]').contains(4) // The number of questions the user answered
  })
  it("Users are ordered in descending order based on the sum of the number of questions they've answered and the number of questions they've asked", () => {
    cy.get('[data-cy=user]').as('users')

    cy.get('@users').should('have.length', 3)
    cy.get('@users').then((users) => {
      cy.wrap(users[0]).contains('Sarah Edo')
      cy.wrap(users[1]).contains('John Doe')
      cy.wrap(users[2]).contains('Tyler McGinnis')
    })
  })
})