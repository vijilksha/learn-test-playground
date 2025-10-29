/**
 * CONCEPT 4: CUSTOM COMMANDS IN CYPRESS
 * 
 * What are Custom Commands?
 * - Reusable functions added to Cypress API
 * - Called like built-in commands: cy.customCommand()
 * - Defined in cypress/support/commands.js
 * - Available globally in all test files
 * 
 * Why use Custom Commands?
 * - Reduce code duplication
 * - Create domain-specific actions
 * - Simplify complex operations
 * - Make tests more readable
 * 
 * Comparison with Selenium:
 * Selenium: Create utility/helper classes with static methods
 * Cypress: Extend cy object directly with custom commands
 */

/**
 * CUSTOM COMMANDS DEFINITION
 * These are defined in cypress/support/commands.js
 * 
 * // Login command
 * Cypress.Commands.add('login', (username, password) => {
 *   cy.get('[data-testid="username-input"]').type(username);
 *   cy.get('[data-testid="password-input"]').type(password);
 *   cy.get('[data-testid="login-button"]').click();
 * });
 * 
 * // Login with preset valid user
 * Cypress.Commands.add('loginAsValidUser', () => {
 *   cy.fixture('users').then(users => {
 *     cy.login(users.validUser.username, users.validUser.password);
 *   });
 * });
 * 
 * // Login as admin
 * Cypress.Commands.add('loginAsAdmin', () => {
 *   cy.fixture('users').then(users => {
 *     cy.login(users.adminUser.username, users.adminUser.password);
 *   });
 * });
 */

describe('Custom Commands Pattern - Basic Usage', () => {
  
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should login using custom command', () => {
    // Use custom command instead of repeating login steps
    cy.login('john.doe@example.com', 'password123');
    
    // Verify login success
    cy.get('[data-testid="welcome-message"]')
      .should('be.visible');
  });

  it('Should login as valid user using preset command', () => {
    // Even simpler - no parameters needed
    cy.loginAsValidUser();
    
    cy.get('[data-testid="welcome-message"]')
      .should('contain', 'Welcome');
  });

  it('Should login as admin', () => {
    // Login with admin credentials
    cy.loginAsAdmin();
    
    // Verify admin dashboard
    cy.get('[data-testid="admin-panel"]')
      .should('be.visible');
  });

  /**
   * BEFORE CUSTOM COMMANDS:
   * Every test would repeat:
   *   cy.get('[data-testid="username-input"]').type('user@example.com');
   *   cy.get('[data-testid="password-input"]').type('password');
   *   cy.get('[data-testid="login-button"]').click();
   * 
   * AFTER CUSTOM COMMANDS:
   *   cy.login('user@example.com', 'password');
   * 
   * Result: Cleaner, more maintainable tests
   */
});

describe('Custom Commands Pattern - Advanced Examples', () => {
  
  beforeEach(() => {
    cy.visit('/login');
  });

  /**
   * CUSTOM COMMAND: cy.verifyToast()
   * Defined in commands.js:
   * 
   * Cypress.Commands.add('verifyToast', (message, timeout = 10000) => {
   *   cy.contains(message, { timeout })
   *     .should('be.visible')
   *     .and('exist');
   * });
   */
  it('Should verify toast messages using custom command', () => {
    cy.login('john.doe@example.com', 'password123');
    
    // Use custom command to verify toast
    cy.verifyToast('Login successful');
  });

  /**
   * CUSTOM COMMAND: cy.navigateTo()
   * Defined in commands.js:
   * 
   * Cypress.Commands.add('navigateTo', (linkText) => {
   *   cy.contains('nav a', linkText, { timeout: 10000 })
   *     .should('be.visible')
   *     .click();
   * });
   */
  it('Should navigate using custom command', () => {
    cy.loginAsValidUser();
    
    // Use custom navigation command
    cy.navigateTo('Dashboard');
    cy.url().should('include', '/dashboard');
    
    cy.navigateTo('Profile');
    cy.url().should('include', '/profile');
  });

  /**
   * CUSTOM COMMAND: cy.waitForLoading()
   * Defined in commands.js:
   * 
   * Cypress.Commands.add('waitForLoading', (selector = '[data-testid="loading"]') => {
   *   cy.get(selector, { timeout: 10000 }).should('not.exist');
   * });
   */
  it('Should wait for loading using custom command', () => {
    cy.login('john.doe@example.com', 'password123');
    
    // Wait for loading spinner to disappear
    cy.waitForLoading();
    
    // Verify page loaded
    cy.get('[data-testid="dashboard-content"]')
      .should('be.visible');
  });
});

describe('Custom Commands Pattern - Chaining Multiple Commands', () => {
  
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should chain multiple custom commands', () => {
    // Chain custom commands for complete workflow
    cy.loginAsValidUser();
    cy.waitForLoading();
    cy.navigateTo('Settings');
    cy.verifyToast('Settings loaded');
    
    // All in one readable flow!
  });

  it('Should use custom commands in different scenarios', () => {
    // Scenario 1: Regular user
    cy.loginAsValidUser();
    cy.navigateTo('Profile');
    
    // Logout (assuming logout command exists)
    cy.get('[data-testid="logout-button"]').click();
    
    // Scenario 2: Admin user
    cy.loginAsAdmin();
    cy.navigateTo('Admin Panel');
  });
});

describe('Custom Commands Pattern - Form Helper Commands', () => {
  
  /**
   * CUSTOM COMMAND: cy.fillBasicForm()
   * Defined in commands.js:
   * 
   * Cypress.Commands.add('fillBasicForm', (name, email, password) => {
   *   cy.get('[data-testid="name-input"]').clear().type(name);
   *   cy.get('[data-testid="email-input"]').clear().type(email);
   *   cy.get('[data-testid="password-input"]').clear().type(password);
   * });
   */

  beforeEach(() => {
    cy.visit('/register');
  });

  it('Should fill registration form using custom command', () => {
    // Fill entire form with one command
    cy.fillBasicForm('John Doe', 'john@example.com', 'password123');
    
    cy.get('[data-testid="submit-button"]').click();
    
    cy.verifyToast('Registration successful');
  });

  /**
   * CUSTOM COMMAND: cy.submitForm()
   * Defined in commands.js:
   * 
   * Cypress.Commands.add('submitForm', () => {
   *   cy.get('[data-testid="submit-button"]')
   *     .should('be.visible')
   *     .and('be.enabled')
   *     .click();
   * });
   */
  it('Should submit form using custom command', () => {
    cy.fillBasicForm('Jane Doe', 'jane@example.com', 'securepass');
    
    // Use custom submit command with built-in validations
    cy.submitForm();
    
    cy.url().should('include', '/success');
  });
});

/**
 * KEY LEARNING POINTS:
 * 
 * 1. DEFINING CUSTOM COMMANDS:
 *    Location: cypress/support/commands.js
 *    Syntax: Cypress.Commands.add('commandName', (args) => { ... })
 * 
 * 2. USING CUSTOM COMMANDS:
 *    Just like built-in: cy.customCommand(args)
 *    Available globally in all tests
 * 
 * 3. TYPES OF CUSTOM COMMANDS:
 *    - Authentication: cy.login(), cy.logout()
 *    - Navigation: cy.navigateTo(), cy.goBack()
 *    - Form helpers: cy.fillForm(), cy.submitForm()
 *    - Assertions: cy.verifyToast(), cy.verifyUrl()
 *    - Waits: cy.waitForLoading(), cy.waitForApi()
 * 
 * 4. BEST PRACTICES:
 *    - Keep commands simple and focused
 *    - Use descriptive names
 *    - Add TypeScript declarations for autocomplete
 *    - Document parameters and usage
 * 
 * 5. WHEN TO CREATE CUSTOM COMMANDS:
 *    - Repeated actions across multiple tests
 *    - Complex workflows you want to simplify
 *    - Domain-specific operations
 *    - Common assertions
 * 
 * SELENIUM COMPARISON:
 * 
 * Selenium (Java):
 *   public class LoginHelper {
 *     public static void login(WebDriver driver, String user, String pass) {
 *       driver.findElement(By.id("username")).sendKeys(user);
 *       driver.findElement(By.id("password")).sendKeys(pass);
 *       driver.findElement(By.id("loginBtn")).click();
 *     }
 *   }
 *   // Usage in test:
 *   LoginHelper.login(driver, "john", "pass");
 * 
 * Cypress:
 *   // Define once in commands.js:
 *   Cypress.Commands.add('login', (user, pass) => {
 *     cy.get('#username').type(user);
 *     cy.get('#password').type(pass);
 *     cy.get('#loginBtn').click();
 *   });
 *   // Usage in test:
 *   cy.login('john', 'pass');
 * 
 * ADVANTAGES:
 * - No need to pass driver object
 * - Automatic waiting and retry
 * - Cleaner syntax
 * - Type-safe with TypeScript
 */
