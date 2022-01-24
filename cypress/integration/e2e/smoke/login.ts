import loginPage from "../../../pages/login.page"
import { aliasMutation } from "../../../utils/graphql-test-utils"

describe("Ensure that the user is logged in by entering a valid email and password", function () {
  const env = Cypress.env(Cypress.env("environment"))

  beforeEach(() => {
    cy.visit("/logout")
    cy.visit("/login")
    cy.url().should("include", "/login")
    cy.intercept("POST", `/graphql`, (req) => {
      aliasMutation(req, "loginUser")
    })
  })

  it('Click on the "Sign in" button', () => {
    loginPage.emailInput().should("exist").clear()
    loginPage.passwordInput().should("exist").clear()
    loginPage.submitButton().should("exist").and("have.attr", "disabled")
    loginPage.emailInput().should("exist").clear().type(env.user.name)
    loginPage.passwordInput().should("exist").clear().type(env.user.password)
    loginPage.submitButton().should("exist").and("not.have.attr", "disabled")
    loginPage.submitButton().click()
    cy.wait("@gql_loginUserMutation").its("response.body.data.loginUser").should("exist")
    cy.url().should("include", "/admin")
    loginPage.nav.login().should("not.exist")
  })

  it("should show error toast on invalid password", () => {
    loginPage.emailInput().should("exist").clear().type(env.user.name)
    loginPage.passwordInput().should("exist").clear().type("invalid pass")
    loginPage.submitButton().should("exist").and("not.have.attr", "disabled")
    loginPage.submitButton().click()
    cy.wait("@gql_loginUserMutation").its("response.body.data.loginUser").should("not.exist")
    cy.contains("Invalid username or password")
    cy.location("pathname").should("equal", "/")
  })

  it.skip("should persist logged in users' sessions on page refresh", () => {
    loginPage.emailInput().should("exist").clear().type(env.user.name)
    loginPage.passwordInput().should("exist").clear().type(env.user.password)
    loginPage.submitButton().should("exist").and("not.have.attr", "disabled")
    loginPage.submitButton().click()
    cy.wait("@gql_loginUserMutation").its("response.body.data.loginUser").should("exist")
    cy.getCookie("refresh-token").should("exist")
  })
})
