import {buildUser} from '../support/generate'

describe('registration', () => {
  it('it should register a new user', () => {
    const user = buildUser()

    cy.visit('/')
    cy.findByText(/register/i).click()
    cy.findByLabelText(/username/i).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)
    cy.findByText(/submit/i).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.window().its('localStorage.token').should('be.a', 'string')
    cy.findByTestId('username-display').should('have.text', user.username)
  })

  it('it should show error message if there is an error', () => {
    cy.server().route({
      method: 'POST',
      url: 'http://localhost:3000/register',
      status: 500,
      response: {},
    })
    cy.visit('/register')
    cy.findByText(/submit/i).click()
    cy.findByText(/error.*try again/i)
  })
})