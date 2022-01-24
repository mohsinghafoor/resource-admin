Cypress.Commands.add("seedTestDb", () => {
  cy.exec("cd ../resource-api && yarn prisma migrate reset -f")
})
