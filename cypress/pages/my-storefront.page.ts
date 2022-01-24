import Base from "./base.page";

class MyStorefrontPage extends Base{

  listingOptions = {
    product: () => { return cy.contains('[data-testid="listing_title"]', 'Product') },
    service: () => { return cy.contains('[data-testid="listing_title"]', 'Service') },
    experience: () => { return cy.contains('[data-testid="listing_title"]', 'Experience') }
  }

  addListingButton() {
    return cy.getBySel('add_new_listing');
  }

  listingContainer() {
    return cy.getBySel('listing_container');
  }

  listingCardTitle() {
    return cy.getBySel('listing_card_title');
  }
}

const myStorefrontPage = new MyStorefrontPage();
export default myStorefrontPage;