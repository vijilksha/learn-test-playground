import loginPage from '../../pages/LoginPage';
import dashboardPage from '../../pages/DashboardPage';

/**
 * Login Test Suite - Complete Integration Example
 * Demonstrates the use of:
 * - Page Object Model (POM)
 * - Fixtures for test data
 * - Custom commands
 * - Method chaining
 * - Proper assertions
 */

describe('Login Functionality - Training Example', () => {
  let users: any;
  let testData: any;

  // ========================================
  // SETUP - Load fixtures before all tests
  // ========================================
  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  // ========================================
  // BEFORE EACH TEST
  // ========================================
  beforeEach(() => {
    // Visit login page and clear any existing data
    cy.visit(testData.urls.loginUrl);
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  // ========================================
  // TEST SUITE 1: Successful Login Scenarios
  // ========================================
  describe('Successful Login Scenarios', () => {
    
    it('TC-001: Should login with valid credentials using POM', () => {
      // Arrange: Get test data
      const user = users.validUser;

      // Act: Perform login using Page Object Model
      loginPage
        .verifyOnLoginPage()
        .enterUsername(user.username)
        .enterPassword(user.password)
        .verifyLoginButtonEnabled()
        .clickLoginButton();

      // Assert: Verify successful login
      dashboardPage
        .verifyOnDashboard()
        .verifyWelcomeMessage(user.firstName);
    });

    it('TC-002: Should login using custom command', () => {
      // Using custom command defined in commands.ts
      cy.loginAsValidUser();

      // Verify dashboard is displayed
      dashboardPage.verifyOnDashboard();
    });

    it('TC-003: Should login with remember me option', () => {
      const user = users.validUser;

      // Login with remember me checked
      loginPage.loginWithRememberMe(user.username, user.password);

      // Verify cookie is set
      cy.getCookie('rememberMe').should('exist');
      
      // Verify on dashboard
      dashboardPage.verifyOnDashboard();
    });

    it('TC-004: Should login as admin user', () => {
      // Login as admin using custom command
      cy.loginAsAdmin();

      // Verify admin-specific content
      cy.contains('Admin Panel').should('be.visible');
      dashboardPage.verifyUserLoggedIn(users.adminUser.firstName);
    });

    it('TC-005: Should maintain session after page reload', () => {
      cy.loginAsValidUser();
      
      // Reload page
      cy.reload();
      
      // Should still be logged in
      dashboardPage.verifyOnDashboard();
    });
  });

  // ========================================
  // TEST SUITE 2: Failed Login Scenarios
  // ========================================
  describe('Failed Login Scenarios', () => {
    
    it('TC-006: Should show error for invalid credentials', () => {
      const user = users.invalidUser;

      // Attempt login with invalid credentials
      loginPage.login(user.username, user.password);

      // Verify error message using test data
      loginPage.verifyErrorMessage(testData.errorMessages.invalidCredentials);
      
      // Verify still on login page
      loginPage.verifyOnLoginPage();
    });

    it('TC-007: Should show error when username is empty', () => {
      // Enter only password
      loginPage
        .enterPassword('somepassword')
        .clickLoginButton();

      // Verify error message
      loginPage.verifyErrorMessage(testData.errorMessages.emptyUsername);
    });

    it('TC-008: Should show error when password is empty', () => {
      // Enter only username
      loginPage
        .enterUsername('user@example.com')
        .clickLoginButton();

      // Verify error message
      loginPage.verifyErrorMessage(testData.errorMessages.emptyPassword);
    });

    it('TC-009: Should disable login button when both fields are empty', () => {
      // Verify login button is disabled with empty form
      loginPage.verifyLoginButtonDisabled();
    });

    it('TC-010: Should show error for invalid email format', () => {
      const invalidEmailUser = users.invalidFormats.invalidEmail;

      loginPage.login(invalidEmailUser.username, invalidEmailUser.password);
      
      loginPage.verifyErrorMessage(testData.errorMessages.invalidEmail);
    });
  });

  // ========================================
  // TEST SUITE 3: Form Validation
  // ========================================
  describe('Form Validation', () => {
    
    it('TC-011: Should validate all form elements are present', () => {
      // Verify all form elements exist and are visible
      loginPage.verifyFormElementsVisible();
    });

    it('TC-012: Should verify input field attributes', () => {
      // Verify username field attributes
      loginPage.verifyUsernamePlaceholder('Enter your email');
      
      // Verify password field type is password
      loginPage.verifyFormAccessibility();
    });

    it('TC-013: Should handle form submission with Enter key', () => {
      const user = users.validUser;

      // Type credentials and press Enter
      loginPage
        .enterUsername(user.username)
        .enterPassword(user.password);
      
      cy.get('[data-testid="password-input"]').type('{enter}');
      
      // Should navigate to dashboard
      dashboardPage.verifyOnDashboard();
    });

    it('TC-014: Should clear form fields', () => {
      const user = users.validUser;

      // Enter data
      loginPage
        .enterUsername(user.username)
        .enterPassword(user.password);

      // Clear fields
      loginPage.clearAllFields();

      // Verify fields are empty
      loginPage
        .verifyUsernameValue('')
        .verifyPasswordValue('');
    });
  });

  // ========================================
  // TEST SUITE 4: Multiple Users
  // ========================================
  describe('Multiple Users Login', () => {
    
    it('TC-015: Should test login with multiple active users', () => {
      // Iterate through users array
      users.users.forEach((user: any) => {
        if (user.active) {
          cy.visit(testData.urls.loginUrl);
          
          // Login with each user
          loginPage.login(user.username, user.password);
          
          // Verify successful login
          dashboardPage.verifyOnDashboard();
          
          // Logout for next iteration
          cy.logout();
        }
      });
    });

    it('TC-016: Should not allow inactive user to login', () => {
      const inactiveUser = users.inactiveUser;

      loginPage.login(inactiveUser.username, inactiveUser.password);
      
      // Verify error message for inactive account
      cy.contains('Account is inactive').should('be.visible');
    });
  });

  // ========================================
  // TEST SUITE 5: Session Management
  // ========================================
  describe('Session Management', () => {
    
    it('TC-017: Should persist session across page navigation', () => {
      cy.loginAsValidUser();

      // Navigate to different pages
      dashboardPage
        .goToReports()
        .verifyUrl('/reports');
      
      dashboardPage
        .goToSettings()
        .verifyUrl('/settings');
      
      // Should still be logged in
      dashboardPage.verifyUserLoggedIn(users.validUser.firstName);
    });

    it('TC-018: Should handle logout correctly', () => {
      cy.loginAsValidUser();
      
      // Logout
      dashboardPage.logout();
      
      // Should redirect to login page
      loginPage.verifyOnLoginPage();
      
      // Should clear auth tokens
      cy.window().its('localStorage.auth_token').should('not.exist');
    });

    it('TC-019: Should handle concurrent sessions', () => {
      // This test would require opening multiple browser contexts
      // Demonstrating the concept
      cy.loginAsValidUser();
      
      // Verify session ID exists
      cy.getCookie('session_id').should('exist');
      
      // Clear cookies to simulate new session
      cy.clearCookies();
      
      // Should be redirected to login
      cy.visit(testData.urls.dashboardUrl);
      loginPage.verifyOnLoginPage();
    });
  });

  // ========================================
  // TEST SUITE 6: Edge Cases
  // ========================================
  describe('Edge Cases and Special Scenarios', () => {
    
    it('TC-020: Should handle special characters in password', () => {
      const specialUser = users.specialCharUsers.withSpecialChars;

      loginPage.login(specialUser.username, specialUser.password);
      
      dashboardPage.verifyOnDashboard();
    });

    it('TC-021: Should handle Unicode characters', () => {
      const unicodeUser = users.specialCharUsers.withUnicode;

      loginPage.login(unicodeUser.username, unicodeUser.password);
      
      dashboardPage.verifyOnDashboard();
    });

    it('TC-022: Should trim whitespace from inputs', () => {
      const user = users.validUser;

      // Add whitespace around credentials
      loginPage
        .enterUsername(`  ${user.username}  `)
        .enterPassword(`  ${user.password}  `)
        .clickLoginButton();

      // Should successfully login (whitespace trimmed)
      dashboardPage.verifyOnDashboard();
    });

    it('TC-023: Should handle slow network conditions', () => {
      // Simulate slow network
      cy.intercept('POST', testData.apiEndpoints.login, (req) => {
        req.reply({
          delay: 3000, // 3 second delay
          statusCode: 200,
          body: { success: true }
        });
      });

      cy.loginAsValidUser();
      
      // Should show loading indicator
      cy.get('[data-testid="loading"]', { timeout: testData.timeouts.long })
        .should('be.visible');
      
      // Eventually should login successfully
      dashboardPage.verifyOnDashboard();
    });

    it('TC-024: Should handle API errors gracefully', () => {
      // Simulate API error
      cy.intercept('POST', testData.apiEndpoints.login, {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      });

      cy.loginAsValidUser();
      
      // Should display error message
      loginPage.verifyErrorMessage(testData.errorMessages.serverError);
    });
  });

  // ========================================
  // AFTER EACH TEST
  // ========================================
  afterEach(() => {
    // Clean up after each test
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
