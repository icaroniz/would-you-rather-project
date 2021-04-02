describe("Navigation", () => {
  describe("The app contains a navigation bar that is visible on all of the pages", () => {
    it("Home page", () => {
      cy.visit("/questions/8xf0y6ziyjabvozdd253nd")
      cy.login("johndoe")

      cy.get(`a[href="/"]`).should('exist')
      cy.get(`a[href="/add"]`).should('exist')
      cy.get(`a[href="/leaderboard"]`).should('exist')
    })
  })
  describe("The user can navigate between the page for creating new polls, and the leaderboard page, and the home page without typing the address into the address bar", () => {
    it('Home page', () => {
      cy.visit("/")
      cy.login("johndoe")

      cy.get(`a[href="/add"]`).should('exist')
      cy.get(`a[href="/leaderboard"]`).should('exist')
    })
    it('Add poll page', () => {
      cy.visit("/add")
      cy.login("johndoe")

      cy.get(`a[href="/"]`).should('exist')
      cy.get(`a[href="/leaderboard"]`).should('exist')
    })
    it('Leaderboard page', () => {
      cy.visit("/leaderboard")
      cy.login("johndoe")

      cy.get(`a[href="/"]`).should('exist')
      cy.get(`a[href="/add"]`).should('exist')
    })
  })
})