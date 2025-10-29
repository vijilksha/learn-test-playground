import BasePage from './BasePage';

/**
 * LoginPage - Page Object Model for Login Page
 * Demonstrates advanced POM with getters, actions, and assertions
 * Inherits common methods from BasePage
 */

class LoginPage extends BasePage {
  // ========================================
  // ELEMENT LOCATORS (Getters)
  // ========================================

  /**
   * Get username input element
   */
  get usernameInput() {
    return cy.get('[data-testid="username-input"]');
  }

  /**
   * Get password input element
   */
  get passwordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  /**
   * Get login button element
   */
  get loginButton() {
    return cy.get('[data-testid="login-button"]');
  }

  /**
   * Get error message element
   */
  get errorMessage() {
    return cy.get('[data-testid="error-message"]');
  }

  /**
   * Get remember me checkbox element
   */
  get rememberMeCheckbox() {
    return cy.get('[data-testid="remember-me"]');
  }

  /**
   * Get forgot password link element
   */
  get forgotPasswordLink() {
    return cy.get('[data-testid="forgot-password-link"]');
  }

  /**
   * Get sign up link element
   */
  get signUpLink() {
    return cy.get('[data-testid="signup-link"]');
  }

  /**
   * Get page heading element
   */
  get pageHeading() {
    return cy.get('h1');
  }

  /**
   * Get success message element
   */
  get successMessage() {
    return cy.contains('Login successful');
  }

  // ========================================
  // NAVIGATION ACTIONS
  // ========================================

  /**
   * Visit login page
   * @param url - Login page URL (default: /login)
   */
  visitLoginPage(url: string = '/login') {
    this.visit(url);
    return this;
  }

  /**
   * Navigate to forgot password page
   */
  goToForgotPassword() {
    this.forgotPasswordLink.click();
    return this;
  }

  /**
   * Navigate to sign up page
   */
  goToSignUp() {
    this.signUpLink.click();
    return this;
  }

  // ========================================
  // USER ACTIONS (Input Methods)
  // ========================================

  /**
   * Enter username
   * @param username - Username to enter
   */
  enterUsername(username: string) {
    this.usernameInput.clear().type(username);
    return this; // Return 'this' for method chaining
  }

  /**
   * Enter password
   * @param password - Password to enter
   */
  enterPassword(password: string) {
    this.passwordInput.clear().type(password);
    return this;
  }

  /**
   * Clear username field
   */
  clearUsername() {
    this.usernameInput.clear();
    return this;
  }

  /**
   * Clear password field
   */
  clearPassword() {
    this.passwordInput.clear();
    return this;
  }

  /**
   * Check remember me checkbox
   */
  checkRememberMe() {
    this.rememberMeCheckbox.check();
    return this;
  }

  /**
   * Uncheck remember me checkbox
   */
  uncheckRememberMe() {
    this.rememberMeCheckbox.uncheck();
    return this;
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    this.loginButton.click();
    return this;
  }

  /**
   * Click login button with force
   * Use when button might be covered or not fully visible
   */
  clickLoginButtonForce() {
    this.loginButton
      .scrollIntoView()
      .wait(100)
      .click({ force: true });
    return this;
  }

  // ========================================
  // COMBINED ACTIONS (High-Level Methods)
  // ========================================

  /**
   * Perform complete login action
   * @param username - Username
   * @param password - Password
   */
  login(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
    return this;
  }

  /**
   * Login with remember me option
   * @param username - Username
   * @param password - Password
   */
  loginWithRememberMe(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.checkRememberMe();
    this.clickLoginButton();
    return this;
  }

  /**
   * Login as valid user using fixture data
   * This method loads user data from fixtures
   */
  loginAsValidUser() {
    cy.fixture('users').then((users) => {
      this.login(users.validUser.username, users.validUser.password);
    });
    return this;
  }

  /**
   * Login as admin user using fixture data
   */
  loginAsAdmin() {
    cy.fixture('users').then((users) => {
      this.login(users.adminUser.username, users.adminUser.password);
    });
    return this;
  }

  /**
   * Attempt login with invalid credentials
   */
  loginWithInvalidCredentials() {
    cy.fixture('users').then((users) => {
      this.login(users.invalidUser.username, users.invalidUser.password);
    });
    return this;
  }

  /**
   * Clear all form fields
   */
  clearAllFields() {
    this.clearUsername();
    this.clearPassword();
    return this;
  }

  // ========================================
  // ASSERTIONS (Verification Methods)
  // ========================================

  /**
   * Verify user is on login page
   */
  verifyOnLoginPage() {
    cy.url().should('include', '/login');
    this.pageHeading.should('be.visible').and('contain.text', 'Login');
    return this;
  }

  /**
   * Verify login button is enabled
   */
  verifyLoginButtonEnabled() {
    this.loginButton.should('be.enabled');
    return this;
  }

  /**
   * Verify login button is disabled
   */
  verifyLoginButtonDisabled() {
    this.loginButton.should('be.disabled');
    return this;
  }

  /**
   * Verify error message is displayed
   * @param expectedMessage - Expected error message text
   */
  verifyErrorMessage(expectedMessage: string) {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', expectedMessage);
    return this;
  }

  /**
   * Verify error message exists
   */
  verifyErrorMessageExists() {
    this.errorMessage.should('exist').and('be.visible');
    return this;
  }

  /**
   * Verify no error message is displayed
   */
  verifyNoErrorMessage() {
    this.errorMessage.should('not.exist');
    return this;
  }

  /**
   * Verify success message is displayed
   */
  verifySuccessMessage() {
    this.successMessage.should('be.visible');
    return this;
  }

  /**
   * Verify login was successful (redirected to dashboard)
   * @param dashboardUrl - Expected dashboard URL (default: /dashboard)
   */
  verifyLoginSuccessful(dashboardUrl: string = '/dashboard') {
    cy.url().should('include', dashboardUrl);
    cy.contains('Welcome').should('be.visible');
    return this;
  }

  /**
   * Verify username field has specific value
   * @param expectedValue - Expected username value
   */
  verifyUsernameValue(expectedValue: string) {
    this.usernameInput.should('have.value', expectedValue);
    return this;
  }

  /**
   * Verify password field has specific value
   * @param expectedValue - Expected password value
   */
  verifyPasswordValue(expectedValue: string) {
    this.passwordInput.should('have.value', expectedValue);
    return this;
  }

  /**
   * Verify remember me is checked
   */
  verifyRememberMeChecked() {
    this.rememberMeCheckbox.should('be.checked');
    return this;
  }

  /**
   * Verify remember me is not checked
   */
  verifyRememberMeNotChecked() {
    this.rememberMeCheckbox.should('not.be.checked');
    return this;
  }

  /**
   * Verify all form elements are visible
   */
  verifyFormElementsVisible() {
    this.usernameInput.should('be.visible');
    this.passwordInput.should('be.visible');
    this.loginButton.should('be.visible');
    this.rememberMeCheckbox.should('be.visible');
    return this;
  }

  /**
   * Verify login button has specific text
   * @param expectedText - Expected button text
   */
  verifyLoginButtonText(expectedText: string) {
    this.loginButton.should('contain.text', expectedText);
    return this;
  }

  /**
   * Verify username field placeholder
   * @param expectedPlaceholder - Expected placeholder text
   */
  verifyUsernamePlaceholder(expectedPlaceholder: string) {
    this.usernameInput.should('have.attr', 'placeholder', expectedPlaceholder);
    return this;
  }

  /**
   * Verify password field placeholder
   * @param expectedPlaceholder - Expected placeholder text
   */
  verifyPasswordPlaceholder(expectedPlaceholder: string) {
    this.passwordInput.should('have.attr', 'placeholder', expectedPlaceholder);
    return this;
  }

  /**
   * Verify username field is focused
   */
  verifyUsernameFieldFocused() {
    this.usernameInput.should('have.focus');
    return this;
  }

  /**
   * Verify form has proper attributes (accessibility)
   */
  verifyFormAccessibility() {
    this.usernameInput.should('have.attr', 'type', 'text');
    this.passwordInput.should('have.attr', 'type', 'password');
    this.loginButton.should('have.attr', 'type', 'submit');
    return this;
  }

  // ========================================
  // SPECIAL SCENARIOS
  // ========================================

  /**
   * Submit empty form
   */
  submitEmptyForm() {
    this.clickLoginButton();
    return this;
  }

  /**
   * Login with only username
   * @param username - Username
   */
  loginWithOnlyUsername(username: string) {
    this.enterUsername(username);
    this.clickLoginButton();
    return this;
  }

  /**
   * Login with only password
   * @param password - Password
   */
  loginWithOnlyPassword(password: string) {
    this.enterPassword(password);
    this.clickLoginButton();
    return this;
  }

  /**
   * Type slowly into username field (simulate real user)
   * @param username - Username to type
   * @param delayMs - Delay between keystrokes in milliseconds
   */
  typeUsernameSlowly(username: string, delayMs: number = 100) {
    this.usernameInput.type(username, { delay: delayMs });
    return this;
  }

  /**
   * Verify login form validation
   * Tests that form validates required fields
   */
  verifyFormValidation() {
    this.submitEmptyForm();
    this.verifyErrorMessage('Username is required');
    return this;
  }
}

// Export singleton instance
export default new LoginPage();
