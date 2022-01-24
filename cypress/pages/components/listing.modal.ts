class ListingModal {

  fulfillmentMethods = {
    onLocation: () => { return cy.getBySel('fulfillment_on_location') },
    delivery: () => { return cy.getBySel('fulfillment_delivery') },
    virtual: () => { return cy.getBySel('fulfillment_virtual') }
  }

  title(name, edit = false) {
    return cy.contains('[data-testid="listing_wizard_title"]', edit ? `Edit ${name}`: `New ${name}`);
  }

  titleInput() {
    return cy.getBySel('title');
  }

  descriptionInput() {
    return cy.get('.DraftEditor-root');
  }

  categorySelect() {
    return cy.get('.chakra-input__group input.chakra-input');
  }

  tagsInput() {
    return cy.get('#tags');
  }

  fulfillmentInfoButton() {
    return cy.getBySel('btn_fulfillment_info');
  }

  deliveryNotesInput() {
    return cy.getBySel('deliveryNotes');
  }

  availabilityInput() {
    return cy.getBySel('availability');
  }

  setPricingButton() {
    return cy.getBySel('btn_set_pricing');
  }

  priceFormSelect() {
    return cy.getBySel('price_form');
  }

  addImageButton() {
    return cy.getBySel('btn_add_image');
  }
  
  imageInput() {
    return cy.get('[data-testid="imageUrl"] input');
  }

  applyListingButton() {
    return cy.getBySel('btn_listing_apply');
  }

  priceInput() {
    return cy.get('[data-testid="price_input"] input');
  }
}

const listingModal = new ListingModal();
export default listingModal;
