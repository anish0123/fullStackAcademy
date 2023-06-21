describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name : 'Anish Maharjan',
      username : 'anish0123',
      password : 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('log in page is open at the beginning', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('anish0123')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'Login successful')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains ('Anish Maharjan logged in')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('anish0123')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()


      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.contains('log in to application')
    })
  })
})