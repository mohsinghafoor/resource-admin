import Base from "./base.page";

class LoginPage extends Base{

  emailInput() {
    return cy.getBySel('email');
  }

  passwordInput() {
    return cy.getBySel('password');
  }

  submitButton() {
    return cy.getBySel('sign-in');
  }
}

const loginPage = new LoginPage();
export default loginPage;