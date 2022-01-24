context("catalog", () => {
  describe("market-specific catalogs", () => {
    it.skip("should land on 'Public' catalog for visiting users", () => {
      cy.visit("/logout")
      cy.clearCookie("refresh-token")
      cy.visit("/marketplace")
      cy.get("h2").should("contain", "Public")
    })

    it("should land on each catalog as specified in URL", () => {
      cy.visit("/marketplace?market=Asheville")
      cy.get("h2").should("contain", "Asheville")

      cy.visit("/marketplace?market=Austin")
      cy.get("h2").should("contain", "Austin")

      cy.visit("/marketplace?market=Los Angeles")
      cy.get("h2").should("contain", "Los Angeles")
    })

    it("should land on Public catalog for invalid market name in URL", () => {
      cy.visit("/marketplace?market=some-random-text")
      cy.get("h2").should("contain", "Public")
    })

    it("should let user swap markets, resulting in different catalog shown in marketplace", () => {
      cy.loginViaRefreshToken()

      cy.visit("/settings/business")
      cy.getBySel("market-dropdown").select("Asheville")
      cy.get("form").submit()
      cy.visit("/marketplace")
      cy.get("h2").should("contain", "Asheville")

      cy.visit("/settings/business")
      cy.getBySel("market-dropdown").select("Austin")
      cy.get("form").submit()
      cy.visit("/marketplace")
      cy.get("h2").should("contain", "Austin")

      cy.visit("/settings/business")
      cy.getBySel("market-dropdown").select("Los Angeles")
      cy.get("form").submit()
      cy.visit("/marketplace")
      cy.get("h2").should("contain", "Los Angeles")

      cy.visit("/settings/business")
      cy.getBySel("market-dropdown").select("Select region") //
      cy.get("form").submit()
      cy.visit("/marketplace")
      cy.get("h2").should("contain", "Public")
    })
  })
})
