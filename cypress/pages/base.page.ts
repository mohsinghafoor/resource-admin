class Base {

  nav = {
    login: () => { return cy.getBySel('nav_login') },
    join: () => { return cy.getBySel('nav_join') },
    myStorefront: () => { return cy.getBySel('nav_my_storefront') },
    marketplace: () => { return cy.getBySel('nav_marketplace') },
  }
}

export default Base;