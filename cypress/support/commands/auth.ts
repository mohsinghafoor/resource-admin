// import loginUserData from "../../fixtures/gql/loginUser.json"

export type LoginViaRefreshTokenProps = { destination?: string; delay?: number }
Cypress.Commands.add("loginViaRefreshToken", (props?: LoginViaRefreshTokenProps) => {
  cy.intercept("POST", "http://localhost/refresh-token", {
    fixture: "/gql/loginUser",
    delay: props?.delay ?? 0,
  })
  cy.visit(props?.destination ?? "/")
})

Cypress.Commands.add("loginViaUI", () => {
  cy.visit("/login")
  cy.getBySel("email").type("user1@resourcenetwork.co")
  cy.getBySel("password").type("password")
  cy.getBySel("sign-in").click()
  cy.wait("@loginUserMutation")
})
