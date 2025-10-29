/**
 * CONCEPT 1: BASIC PAGE OBJECT MODEL (POM) IN CYPRESS
 * 
 * What is POM?
 * - Design pattern that creates an object repository for web elements
 * - Separates test logic from page-specific code
 * - Makes tests more maintainable and reusable
 * 
 * Why use POM in Cypress?
 * - Centralized element locators
 * - Reusable page actions
 * - Easier maintenance when UI changes
 * - Better code organization
 * 
 * Comparison with Selenium:
 * Selenium: Returns WebElement objects, needs explicit waits
 * Cypress: Returns Chainable objects, has automatic waiting and retry logic
 */

// BASIC PAGE OBJECT - Simple approach
// This class contains methods that return cy.get() for elements
class BasicLoginPage {
  
  // Page URL
  visit() {
    cy.visit('/login');
  }

  // Element locators - Each method returns cy.get()
  // In Selenium: These would return WebElement
  // In Cypress: These return Chainable<JQuery> with auto-retry
  getUsernameInput() {
    return cy.get('[data-testid="username-input"]');
  }

  getPasswordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  getLoginButton() {
    return cy.get('[data-testid="login-button"]');
  }

  getErrorMessage() {
    return cy.get('[data-testid="error-message"]');
  }

  getWelcomeMessage() {
    return cy.get('[data-testid="welcome-message"]');
  }
}

// Export instance for use in tests
const basicLoginPage = new BasicLoginPage();

/**
 * TEST SUITE: Basic POM Usage
 * Demonstrates how to use basic POM pattern in tests
 */
describe('Basic POM Pattern - Login Tests', () => {
  
  beforeEach(() => {
    // Navigate to login page before each test
    basicLoginPage.visit();
  });

  it('Should successfully login with valid credentials', () => {
    // Using POM methods to interact with elements
    // Notice: We chain Cypress commands directly on returned cy.get()
    
    // Enter username
    basicLoginPage.getUsernameInput()
      .type('john.doe@example.com');
    
    // Enter password
    basicLoginPage.getPasswordInput()
      .type('password123');
    
    // Click login button
    basicLoginPage.getLoginButton()
      .click();
    
    // Verify successful login
    basicLoginPage.getWelcomeMessage()
      .should('be.visible')
      .and('contain', 'Welcome');
  });

  it('Should show error with invalid credentials', () => {
    // Chain multiple commands using POM
    basicLoginPage.getUsernameInput()
      .type('invalid@example.com');
    
    basicLoginPage.getPasswordInput()
      .type('wrongpassword');
    
    basicLoginPage.getLoginButton()
      .click();
    
    // Verify error message appears
    basicLoginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('Should validate empty form submission', () => {
    // Click login without entering credentials
    basicLoginPage.getLoginButton()
      .click();
    
    // Verify error for empty fields
    basicLoginPage.getErrorMessage()
      .should('be.visible');
  });

  /**
   * KEY LEARNING POINTS:
   * 
   * 1. POM methods return cy.get() - allowing direct command chaining
   * 2. No need for explicit waits - Cypress waits automatically
   * 3. Each method is focused on one element
   * 4. Tests are readable and maintainable
   * 
   * SELENIUM vs CYPRESS:
   * 
   * Selenium (Java):
   *   WebElement username = driver.findElement(By.id("username"));
   *   username.sendKeys("john");
   *   WebDriverWait wait = new WebDriverWait(driver, 10);
   *   wait.until(ExpectedConditions.visibilityOf(loginButton));
   * 
   * Cypress (JavaScript):
   *   basicLoginPage.getUsernameInput().type('john');
   *   // No explicit wait needed!
   */
});
