import listingModal from "../../../pages/components/listing.modal";
import myStorefrontPage from "../../../pages/my-storefront.page";
import { login } from "../../../utils/auth";

const listingTestData = {
  product: {
    title: 'Test_product_' + new Date().getTime(),
    description: 'Test data',
    category: 'Florist',
    tags: 'Test_tag',
    deliveryNotes: 'Test_note',
    availability: '8am-3pm',
    priceForm: 'Contact for pricing',
    image: 'images/add-product.png'
  },
  service: {
    title: 'Test_service_' + new Date().getTime(),
    description: 'Test Service description',
    category: 'Essential Oils',
    tags: 'test_service_tag',
    deliveryNotes: 'test Service delivery note',
    availability: '9am-5pm',
    priceForm: 'Fixed',
    priceValue: '2.00',
    image: 'images/add-service.png'
  },
  experience: {
    title: 'Test_experience_' + new Date().getTime(),
    description: 'Test Experience \n description',
    category: 'Automotive',
    tags: 'test_experience_tag',
    deliveryNotes: 'test Experience delivery note',
    availability: '9am-5pm',
    priceForm: 'Fixed',
    priceValue: '6.00',
    image: 'images/add-experience.png'
  }
};

describe('Ensure that the user is able to add a new listing', function () {

  const env = Cypress.env(Cypress.env('environment'));

  before(() => {
    login(env.user.name, env.user.password);
  });

  beforeEach(() => {
    // cy.visit('/');  // skip for now, because user logout
    myStorefrontPage.nav.myStorefront().should('exist').click().should('have.attr', 'data-active');
    myStorefrontPage.addListingButton().should('exist').click();
    myStorefrontPage.listingContainer().should('exist').within(() => {
      myStorefrontPage.listingOptions.product().should('be.visible');
      myStorefrontPage.listingOptions.service().should('be.visible');
      myStorefrontPage.listingOptions.experience().should('be.visible');
    });
  });

  it('Product', () => {
    myStorefrontPage.listingOptions.product().should('exist').click();
    listingModal.title('product').should('exist');
    listingModal.titleInput().should('exist').clear().type(listingTestData.product.title);
    listingModal.descriptionInput().should('exist').clear().type(listingTestData.product.description);
    listingModal.categorySelect()
      .should('exist')
      .click()
      .should('have.attr', 'aria-controls')
      .then(menu => {
        cy.get(`#${menu} li`).should('exist').contains(listingTestData.product.category).click();
      });
    listingModal.categorySelect().should('have.value', listingTestData.product.category);
    listingModal.tagsInput().should('exist').clear().type(listingTestData.product.tags);
    listingModal.fulfillmentInfoButton().should('exist').click();
    listingModal.fulfillmentMethods.onLocation().should('exist').click();
    listingModal.deliveryNotesInput().should('exist').clear().type(listingTestData.product.deliveryNotes);
    listingModal.availabilityInput().should('exist').clear().type(listingTestData.product.availability);
    listingModal.setPricingButton().should('exist').click();
    listingModal.priceFormSelect()
      .should('exist')
      .click()
      .should('have.attr', 'aria-controls')
      .then(menu => {
        cy.get(`#${menu} button`).should('exist').contains(listingTestData.product.priceForm).click();
      });
    listingModal.priceFormSelect().should('have.text', listingTestData.product.priceForm);
    listingModal.addImageButton().should('exist').click();
    listingModal.imageInput().attachFile(listingTestData.product.image);
    listingModal.applyListingButton().should('exist').click();
    myStorefrontPage.listingCardTitle().should('contain.text', listingTestData.product.title).should('exist');
  });

  it('Service', () => {
    myStorefrontPage.listingOptions.service().should('exist').click();
    listingModal.title('service').should('exist');
    listingModal.titleInput().should('exist').clear().type(listingTestData.service.title);
    listingModal.descriptionInput().should('exist').clear().type(listingTestData.service.description);
    listingModal.categorySelect()
      .should('exist')
      .click()
      .should('have.attr', 'aria-controls')
      .then(menu => {
        cy.get(`#${menu} li`).should('exist').contains(listingTestData.service.category).click();
      });
    listingModal.categorySelect().should('have.value', listingTestData.service.category);
    listingModal.tagsInput().should('exist').clear().type(listingTestData.service.tags);
    listingModal.fulfillmentInfoButton().should('exist').click();
    listingModal.fulfillmentMethods.delivery().should('exist').click();
    listingModal.deliveryNotesInput().should('exist').clear().type(listingTestData.service.deliveryNotes);
    listingModal.availabilityInput().should('exist').clear().type(listingTestData.service.availability);
    listingModal.setPricingButton().should('exist').click();
    listingModal.priceFormSelect()
      .should('exist')
      .click()
      .should('have.attr', 'aria-controls')
      .then(menu => {
        cy.get(`#${menu} button`).should('exist').contains(listingTestData.service.priceForm).click();
      });
    listingModal.priceFormSelect().should('have.text', listingTestData.service.priceForm);
    listingModal.priceInput().should('exist').clear().type(listingTestData.service.priceValue);
    listingModal.addImageButton().should('exist').click();
    listingModal.imageInput().attachFile(listingTestData.service.image);
    listingModal.applyListingButton().should('exist').click();
    myStorefrontPage.listingCardTitle().should('contain.text', listingTestData.service.title).should('exist');
  });

  it('Experience', () => {
    myStorefrontPage.listingOptions.experience().should('exist').click();
    listingModal.title('experience').should('exist');
    listingModal.titleInput().should('exist').clear().type(listingTestData.experience.title);
    listingModal.descriptionInput().should('exist').clear().type(listingTestData.experience.description);
    listingModal.categorySelect()
      .should('exist')
      .click()
      .should('have.attr', 'aria-controls')
      .then(menu => {
        cy.get(`#${menu} li`).should('exist').contains(listingTestData.experience.category).click();
      });
    listingModal.categorySelect().should('have.value', listingTestData.experience.category);
    listingModal.tagsInput().should('exist').clear().type(listingTestData.experience.tags);
    listingModal.fulfillmentInfoButton().should('exist').click();
    listingModal.fulfillmentMethods.virtual().should('exist').click();
    listingModal.deliveryNotesInput().should('exist').clear().type(listingTestData.experience.deliveryNotes);
    listingModal.availabilityInput().should('exist').clear().type(listingTestData.experience.availability);
    listingModal.setPricingButton().should('exist').click();
    listingModal.priceFormSelect()
      .should('exist')
      .click()
      .should('have.attr', 'aria-controls')
      .then(menu => {
        cy.get(`#${menu} button`).should('exist').contains(listingTestData.experience.priceForm).click();
      });
    listingModal.priceFormSelect().should('have.text', listingTestData.experience.priceForm);
    listingModal.priceInput().should('exist').clear().type(listingTestData.experience.priceValue);
    listingModal.addImageButton().should('exist').click();
    listingModal.imageInput().attachFile(listingTestData.experience.image);
    listingModal.applyListingButton().should('exist').click();
    myStorefrontPage.listingCardTitle().should('contain.text', listingTestData.experience.title).should('exist');
  });
});
