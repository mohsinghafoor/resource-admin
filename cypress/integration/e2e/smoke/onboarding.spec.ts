import { login } from "../../../utils/auth"

context("onboarding", () => {
  const env = Cypress.env(Cypress.env("environment"))

  context("business", () => {
    beforeEach(() => {
      login(env.user.name, env.user.password)
      cy.visit("/onboarding")
      cy.getBySel("begin-onboarding").click()
      cy.getBySel("name").clear().type("Test Business")
      cy.getBySel("taxId").clear().type("123456789")
      cy.getBySel("handle").clear().type("test-business")
      cy.getBySel("phoneNumber").clear().type("5099999999")
      cy.getBySel("address").clear().type("Antarctica")
    })

    it("should let user select 'Austin' market during onboarding", () => {
      cy.getBySel("market-dropdown").select("Austin")
      cy.get("form").submit()
      cy.wait(2000) // <--- not the best practice... should be based off of gql mutation once cypress system is built out more
      cy.visit("/admin")
      cy.get("h2").should("contain", "Austin")
    })
  })
})
