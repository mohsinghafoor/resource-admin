import loginPage from "../pages/login.page"

export const login = (username = "", password = "") => {
  cy.visit("/logout")
  loginPage.nav.login().should("exist").click()
  loginPage.emailInput().should("exist").clear().type(username)
  loginPage.passwordInput().should("exist").clear().type(password)
  loginPage.submitButton().should("exist").click()
}
