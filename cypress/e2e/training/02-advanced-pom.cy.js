/**
 * CONCEPT 2: ADVANCED PAGE OBJECT MODEL WITH GETTERS, ACTIONS, AND ASSERTIONS
 * 
 * What's Advanced POM?
 * - Uses JavaScript getters for cleaner syntax
 * - Separates concerns: Locators, Actions, Assertions
 * - Returns 'this' for method chaining
 * - More object-oriented approach
 * 
 * Benefits:
 * - Cleaner syntax (no parentheses for getters)
 * - Better organized code structure
 * - Fluent interface with method chaining
 * - Easier to read and maintain
 */

// ADVANCED PAGE OBJECT - Using getters and organized methods
class AdvancedLoginPage {
  
  // SECTION 1: GETTERS (Element Locators)
  // Using JavaScript getter syntax - no need for parentheses when calling
  // In Selenium: You'd still use methods like getElement()
  // In Cypress: Getters provide cleaner, property-like access
  
  get usernameInput() {
    return cy.get('[data-testid="username-input"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  get loginButton() {
    return cy.get('[data-testid="login-button"]');
  }

  get rememberMeCheckbox() {
    return cy.get('[data-testid="remember-me"]');
  }

  get forgotPasswordLink() {
    return cy.get('[data-testid="forgot-password"]');
  }

  get errorMessage() {
    return cy.get('[data-testid="error-message"]');
  }

  get successMessage() {
    return cy.get('[data-testid="success-message"]');
  }

  // SECTION 2: NAVIGATION ACTIONS
  // Methods that navigate to pages
  
  visit() {
    cy.visit('/login');
    return this; // Return 'this' for method chaining
  }

  goToForgotPassword() {
    this.forgotPasswordLink.click();
    return this;
  }

  // SECTION 3: USER ACTIONS
  // Methods that perform actions on the page
  // Each returns 'this' to allow chaining
  
  enterUsername(username) {
    this.usernameInput.clear().type(username);
    return this; // Enables: page.enterUsername('john').enterPassword('pass')
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  checkRememberMe() {
    this.rememberMeCheckbox.check();
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  // SECTION 4: COMBINED ACTIONS (High-level workflows)
  // These combine multiple actions into one method
  
  login(username, password) {
    this.enterUsername(username)
        .enterPassword(password)
        .clickLogin();
    return this;
  }

  loginWithRememberMe(username, password) {
    this.enterUsername(username)
        .enterPassword(password)
        .checkRememberMe()
        .clickLogin();
    return this;
  }

  // SECTION 5: ASSERTIONS (Verification methods)
  // Methods that verify page state
  // Note: These can still return 'this' if needed
  
  verifyErrorMessage(expectedMessage) {
    this.errorMessage
      .should('be.visible')
      .and('contain', expectedMessage);
    return this;
  }

  verifySuccessMessage(expectedMessage) {
    this.successMessage
      .should('be.visible')
      .and('contain', expectedMessage);
    return this;
  }

  verifyOnLoginPage() {
    cy.url().should('include', '/login');
    this.loginButton.should('be.visible');
    return this;
  }

  verifyLoginButtonDisabled() {
    this.loginButton.should('be.disabled');
    return this;
  }
}

// Create page instance
const advancedLoginPage = new AdvancedLoginPage();

/**
 * TEST SUITE: Advanced POM Usage
 * Shows the power of method chaining and organized POM structure
 */
describe('Advanced POM Pattern - Login Tests', () => {
  
  beforeEach(() => {
    advancedLoginPage.visit();
  });

  it('Should login using method chaining', () => {
    // Beautiful, readable chain of actions
    // Notice: No parentheses after 'advancedLoginPage.usernameInput'
    advancedLoginPage
      .enterUsername('john.doe@example.com')
      .enterPassword('password123')
      .clickLogin()
      .verifySuccessMessage('Login successful');
  });

  it('Should login with remember me option', () => {
    // Using combined action method
    advancedLoginPage
      .loginWithRememberMe('john.doe@example.com', 'password123')
      .verifySuccessMessage('Login successful');
  });

  it('Should show error for invalid credentials', () => {
    // Chain with error verification
    advancedLoginPage
      .login('invalid@example.com', 'wrongpass')
      .verifyErrorMessage('Invalid credentials');
  });

  it('Should navigate to forgot password', () => {
    advancedLoginPage
      .verifyOnLoginPage()
      .goToForgotPassword();
    
    cy.url().should('include', '/forgot-password');
  });

  it('Demonstrates getter vs method syntax', () => {
    // Using getter (no parentheses)
    advancedLoginPage.usernameInput.type('test@example.com');
    
    // Using action method (with parentheses)
    advancedLoginPage.enterPassword('password123');
    
    // Both work, but getters are cleaner for element access
  });

  /**
   * KEY LEARNING POINTS:
   * 
   * 1. GETTERS: No parentheses, cleaner syntax
   *    - Use: page.usernameInput (not page.usernameInput())
   * 
   * 2. METHOD CHAINING: Return 'this' from action methods
   *    - Enables: page.enterUsername().enterPassword().clickLogin()
   * 
   * 3. ORGANIZED STRUCTURE:
   *    - Getters (locators)
   *    - Navigation actions
   *    - User actions
   *    - Combined actions
   *    - Assertions
   * 
   * 4. READABILITY: Tests read like sentences
   *    - page.visit().login('user', 'pass').verifySuccess()
   * 
   * COMPARISON:
   * Basic POM:
   *   page.getUsernameInput().type('john');
   *   page.getPasswordInput().type('pass');
   *   page.getLoginButton().click();
   * 
   * Advanced POM:
   *   page.login('john', 'pass');
   *   // Or with chaining:
   *   page.enterUsername('john').enterPassword('pass').clickLogin();
   */
});
