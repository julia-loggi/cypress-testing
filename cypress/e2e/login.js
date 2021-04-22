import {buildUser} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
    // create user
    cy.createUser().then(user => {
      cy.visit('/')
      cy.findByText(/login/i).click()
      cy.findByLabelText(/username/i).type(user.username)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByText(/submit/i).click()

      // now we can verify things that are set after login
      cy.assertHome()
      cy.assertLoggedInAs(user)
    })

  })
})