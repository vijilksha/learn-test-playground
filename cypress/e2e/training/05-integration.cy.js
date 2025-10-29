/**
 * CONCEPT 5: INTEGRATION - COMBINING POM, FIXTURES, AND CUSTOM COMMANDS
 * 
 * What is Integration?
 * - Using all patterns together in real-world tests
 * - POM for page structure
 * - Fixtures for test data
 * - Custom commands for common actions
 * 
 * Benefits of Integration:
 * - Clean, maintainable test code
 * - Highly reusable components
 * - Easy to update when UI changes
 * - Professional test framework structure
 */

// Import or create page object
class LoginPage {
  // Getters
  get usernameInput() {
    return cy.get('[data-testid="username-input"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="password-input"]');
  }

  get loginButton() {
    return cy.get('[data-testid="login-button"]');
  }

  get errorMessage() {
    return cy.get('[data-testid="error-message"]');
  }

  get welcomeMessage() {
    return cy.get('[data-testid="welcome-message"]');
  }

  // Actions
  visit() {
    cy.visit('/login');
    return this;
  }

  enterUsername(username) {
    this.usernameInput.clear().type(username);
    return this;
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  // Combined actions
  login(username, password) {
    return this.enterUsername(username)
               .enterPassword(password)
               .clickLogin();
  }

  // Assertions
  verifyErrorMessage(message) {
    this.errorMessage.should('be.visible').and('contain', message);
    return this;
  }

  verifyWelcomeMessage(name) {
    this.welcomeMessage.should('be.visible').and('contain', name);
    return this;
  }
}

const loginPage = new LoginPage();

/**
 * INTEGRATION TEST SUITE
 * Demonstrates professional test framework using all patterns
 */
describe('Integration Example - Complete Login Flow', () => {
  
  // Load fixture data
  let users;
  
  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    // Navigate to login page
    loginPage.visit();
  });

  /**
   * TEST 1: POM + Fixtures
   * Using page object with fixture data
   */
  it('Should login using POM with fixture data', () => {
    // POM method + Fixture data = Clean test
    loginPage.login(users.validUser.username, users.validUser.password);
    
    // POM assertion
    loginPage.verifyWelcomeMessage(users.validUser.fullName);
  });

  /**
   * TEST 2: Custom Command + Fixtures
   * Using custom command that loads fixture internally
   */
  it('Should login using custom command', () => {
    // Custom command handles everything
    cy.loginAsValidUser();
    
    // Verify using POM
    loginPage.welcomeMessage.should('be.visible');
  });

  /**
   * TEST 3: All Three Patterns Together
   * POM + Fixtures + Custom Commands
   */
  it('Should perform complete workflow with all patterns', () => {
    // Step 1: Login using custom command
    cy.loginAsValidUser();
    
    // Step 2: Wait for loading (custom command)
    cy.waitForLoading();
    
    // Step 3: Verify success toast (custom command)
    cy.verifyToast('Welcome back!');
    
    // Step 4: Navigate (custom command)
    cy.navigateTo('Dashboard');
    
    // Step 5: Verify URL
    cy.url().should('include', '/dashboard');
  });

  /**
   * TEST 4: Method Chaining Integration
   * POM chaining + Custom commands
   */
  it('Should demonstrate method chaining', () => {
    // POM method chaining
    loginPage
      .enterUsername(users.validUser.username)
      .enterPassword(users.validUser.password)
      .clickLogin()
      .verifyWelcomeMessage(users.validUser.fullName);
    
    // Custom command chaining
    cy.waitForLoading();
    cy.navigateTo('Profile');
  });

  /**
   * TEST 5: Negative Scenario with Integration
   * Testing error cases with all patterns
   */
  it('Should handle invalid credentials', () => {
    // Use fixture for invalid user
    loginPage.login(users.invalidUser.username, users.invalidUser.password);
    
    // Use POM for assertion
    loginPage.verifyErrorMessage('Invalid credentials');
    
    // Verify button is still enabled
    loginPage.loginButton.should('be.enabled');
  });

  /**
   * TEST 6: Multiple Users Testing
   * Iterating through fixture data
   */
  it('Should test multiple users from fixture', () => {
    // Test each active user
    const activeUsers = [users.validUser, users.adminUser];
    
    activeUsers.forEach((user) => {
      // Login
      loginPage.login(user.username, user.password);
      
      // Verify
      cy.get('[data-testid="user-email"]')
        .should('contain', user.username);
      
      // Logout
      cy.get('[data-testid="logout-button"]').click();
      
      // Back to login page
      loginPage.visit();
    });
  });

  /**
   * TEST 7: Session Management
   * Using custom commands + POM
   */
  it('Should maintain session after navigation', () => {
    // Login
    cy.loginAsValidUser();
    
    // Navigate away
    cy.navigateTo('Settings');
    cy.url().should('include', '/settings');
    
    // Navigate back
    cy.navigateTo('Dashboard');
    
    // Verify still logged in (session maintained)
    loginPage.welcomeMessage.should('be.visible');
  });

  /**
   * TEST 8: Form Validation with Integration
   * Testing edge cases with all patterns
   */
  it('Should validate form fields', () => {
    // Use POM to submit empty form
    loginPage.clickLogin();
    
    // Verify validation message
    loginPage.errorMessage.should('be.visible');
    
    // Fill only username (from fixture)
    loginPage.enterUsername(users.validUser.username);
    loginPage.clickLogin();
    
    // Should still show error (password missing)
    loginPage.errorMessage.should('be.visible');
  });

  /**
   * TEST 9: Complete User Journey
   * Full integration example
   */
  it('Should complete full user journey', () => {
    // 1. Login (Custom Command)
    cy.loginAsValidUser();
    
    // 2. Wait for dashboard (Custom Command)
    cy.waitForLoading('[data-testid="dashboard-loading"]');
    
    // 3. Verify welcome (Custom Command)
    cy.verifyToast('Login successful');
    
    // 4. Navigate to profile (Custom Command)
    cy.navigateTo('Profile');
    
    // 5. Update profile (POM)
    cy.get('[data-testid="profile-name"]')
      .clear()
      .type('Updated Name');
    
    // 6. Save changes
    cy.get('[data-testid="save-button"]').click();
    
    // 7. Verify success (Custom Command)
    cy.verifyToast('Profile updated');
    
    // 8. Logout
    cy.get('[data-testid="logout-button"]').click();
    
    // 9. Verify back at login (POM)
    loginPage.loginButton.should('be.visible');
  });
});

/**
 * KEY LEARNING POINTS:
 * 
 * 1. INTEGRATION BENEFITS:
 *    - Tests are short and readable
 *    - Easy to maintain
 *    - Reusable components
 *    - Consistent structure
 * 
 * 2. WHEN TO USE WHAT:
 *    - POM: Page-specific elements and actions
 *    - Fixtures: Test data that changes or varies
 *    - Custom Commands: Common actions across pages
 * 
 * 3. BEST PRACTICES:
 *    - Keep tests focused on one scenario
 *    - Use meaningful test descriptions
 *    - Clean up after tests (logout, clear data)
 *    - Handle both positive and negative cases
 * 
 * 4. REAL-WORLD STRUCTURE:
 *    cypress/
 *      ├── e2e/
 *      │   └── login.cy.js (this file)
 *      ├── fixtures/
 *      │   └── users.json (test data)
 *      ├── pages/
 *      │   └── LoginPage.js (page objects)
 *      └── support/
 *          └── commands.js (custom commands)
 * 
 * 5. MAINTENANCE:
 *    - UI changes: Update POM only
 *    - Test data changes: Update fixtures only
 *    - Common actions: Update custom commands only
 *    - Tests remain unchanged!
 * 
 * COMPLETE EXAMPLE COMPARISON:
 * 
 * WITHOUT PATTERNS (BAD):
 * it('test', () => {
 *   cy.visit('/login');
 *   cy.get('[data-testid="username-input"]').type('john@example.com');
 *   cy.get('[data-testid="password-input"]').type('password123');
 *   cy.get('[data-testid="login-button"]').click();
 *   cy.get('[data-testid="welcome-message"]').should('contain', 'John');
 * });
 * 
 * WITH PATTERNS (GOOD):
 * it('test', () => {
 *   cy.loginAsValidUser();
 *   cy.verifyToast('Welcome back!');
 * });
 * 
 * RESULT:
 * - 7 lines reduced to 2 lines
 * - Much more readable
 * - Easy to maintain
 * - Reusable across all tests
 */
