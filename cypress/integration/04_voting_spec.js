describe('Voting', () => {
  it("The voting mechanism works correctly, and the data on the leaderboard changes appropriately", () => {
    cy.visit('/leaderboard')
    cy.login('johndoe')

    cy.get('[data-cy=user]').then((users) => {
      cy.wrap(users[1]).contains('John Doe').find('[data-cy=voted-questions]').contains('3')
    })

    // Go to Home
    cy.contains('Home').click()

    // Go to Unvoted Question
    cy.contains('be telekinetic or be telepathic').click()
    cy.get('[data-cy=question-option]').first().find('button').click() // Vote for one option

    // Go back to Leaderboard
    cy.contains('Leaderboard').click()
    cy.get('[data-cy=user]').then((users) => {
      cy.wrap(users[1]).find('[data-cy=voted-questions]').contains('4')
    })
  })
  it("Handles leaderboard changes correctly", () => {
    cy.visit('/leaderboard')
    cy.login('johndoe')

    cy.get('[data-cy=user]').then((users) => {
      cy.wrap(users[1]).as('secondPlace');
      cy.get('@secondPlace').contains('John Doe');
      cy.get('@secondPlace').find('[data-cy=voted-questions]').contains('3')
      cy.get('@secondPlace').find('[data-cy=questions-created]').contains('2')
    })

    // Go to Home
    cy.contains('Home').click()
    // Go to Unvoted Question
    cy.contains('be telekinetic or be telepathic').click()
    cy.get('[data-cy=question-option]').first().find('button').click() // Vote for one option

    // Add a new poll
    cy.contains('Add poll').click()
    cy.get('input[type=text]').as('selections')
    cy.get('@selections').first().type('see the future')
    cy.get('@selections').last().type('see the past')
    cy.get('form').submit()

    cy.wait(1000)

    // Go back to Leaderboard
    cy.contains('Leaderboard').click()
    cy.get('[data-cy=user]').then((users) => {
      cy.wrap(users[0]).as('firstPlace');
      cy.get('@firstPlace').contains('John Doe');
      cy.get('@firstPlace').find('[data-cy=voted-questions]').contains('4')
      cy.get('@firstPlace').find('[data-cy=questions-created]').contains('3')
    })
  })
  it("Uses sum of answers and created questions for leaderboard ranking calculation", () => {
    cy.visit('/leaderboard')
    cy.login('johndoe')

    cy.get('[data-cy=user]').then((users) => {
      cy.wrap(users[1]).as('secondPlace');
      cy.get('@secondPlace').contains('John Doe');
      cy.get('@secondPlace').find('[data-cy=voted-questions]').contains('3')
      cy.get('@secondPlace').find('[data-cy=questions-created]').contains('2')
    })

    // Add a new poll
    cy.contains('Add poll').click()
    cy.get('input[type=text]').as('selections')
    cy.get('@selections').first().type('be in jail for a year')
    cy.get('@selections').last().type('lose a year off your life')
    cy.get('form').submit()

    cy.wait(1000)

    // Add a new poll
    cy.contains('Add poll').click()
    cy.get('input[type=text]').as('selections')
    cy.get('@selections').first().type('lose the ability to read')
    cy.get('@selections').last().type('lose the ability to speak')
    cy.get('form').submit()

    cy.wait(1000)

    // Go back to Leaderboard
    cy.contains('Leaderboard').click()
    cy.get('[data-cy=user]').then((users) => {
      cy.wrap(users[0]).as('firstPlace');
      cy.get('@firstPlace').contains('John Doe');
      cy.get('@firstPlace').find('[data-cy=voted-questions]').contains('3')
      cy.get('@firstPlace').find('[data-cy=questions-created]').contains('4')
    })
  })
})