/**
 * CONCEPT 3: FIXTURES FOR TEST DATA MANAGEMENT
 * 
 * What are Fixtures?
 * - JSON files that store test data
 * - Centralized location for test data
 * - Easy to maintain and update
 * - Can be shared across multiple tests
 * 
 * Why use Fixtures?
 * - Separation of test data from test logic
 * - Easy to update test data without changing code
 * - Can load different data sets for different scenarios
 * - Built-in Cypress feature (cy.fixture())
 * 
 * Comparison with Selenium:
 * Selenium: Need to create custom data readers, use Excel/CSV, or hardcode
 * Cypress: Built-in fixture support with cy.fixture()
 */

/**
 * FIXTURE FILE EXAMPLE (users.json):
 * {
 *   "validUser": {
 *     "username": "john.doe@example.com",
 *     "password": "password123",
 *     "fullName": "John Doe"
 *   },
 *   "invalidUser": {
 *     "username": "invalid@example.com",
 *     "password": "wrongpass"
 *   },
 *   "adminUser": {
 *     "username": "admin@example.com",
 *     "password": "admin123",
 *     "role": "admin"
 *   }
 * }
 */

describe('Fixtures Pattern - Test Data Management', () => {
  
  // APPROACH 1: Load fixture once before all tests
  let userData;
  
  before(() => {
    // Load fixture file once and store in variable
    cy.fixture('users').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should login with valid user from fixture', () => {
    // Access fixture data from variable
    cy.get('[data-testid="username-input"]')
      .type(userData.validUser.username);
    
    cy.get('[data-testid="password-input"]')
      .type(userData.validUser.password);
    
    cy.get('[data-testid="login-button"]').click();
    
    // Verify using data from fixture
    cy.get('[data-testid="welcome-message"]')
      .should('contain', userData.validUser.fullName);
  });

  it('Should fail with invalid user from fixture', () => {
    // Use different user data from same fixture
    cy.get('[data-testid="username-input"]')
      .type(userData.invalidUser.username);
    
    cy.get('[data-testid="password-input"]')
      .type(userData.invalidUser.password);
    
    cy.get('[data-testid="login-button"]').click();
    
    cy.get('[data-testid="error-message"]')
      .should('be.visible');
  });
});

describe('Fixtures Pattern - Using Aliases', () => {
  
  // APPROACH 2: Use Cypress aliases
  before(() => {
    // Load fixture and create alias
    cy.fixture('users').as('userData');
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should login using aliased fixture', function() {
    // Access via this.userData (note: use function, not arrow function)
    cy.get('[data-testid="username-input"]')
      .type(this.userData.validUser.username);
    
    cy.get('[data-testid="password-input"]')
      .type(this.userData.validUser.password);
    
    cy.get('[data-testid="login-button"]').click();
  });

  it('Should test admin user from fixture', function() {
    cy.get('[data-testid="username-input"]')
      .type(this.userData.adminUser.username);
    
    cy.get('[data-testid="password-input"]')
      .type(this.userData.adminUser.password);
    
    cy.get('[data-testid="login-button"]').click();
    
    // Verify admin role
    cy.get('[data-testid="user-role"]')
      .should('contain', this.userData.adminUser.role);
  });
});

describe('Fixtures Pattern - Inline Loading', () => {
  
  beforeEach(() => {
    cy.visit('/login');
  });

  // APPROACH 3: Load fixture directly in test
  it('Should login with inline fixture loading', () => {
    cy.fixture('users').then((users) => {
      // Use fixture data inside then block
      cy.get('[data-testid="username-input"]')
        .type(users.validUser.username);
      
      cy.get('[data-testid="password-input"]')
        .type(users.validUser.password);
      
      cy.get('[data-testid="login-button"]').click();
    });
  });

  it('Should test multiple users from fixture', () => {
    cy.fixture('users').then((users) => {
      // Test first user
      cy.get('[data-testid="username-input"]')
        .type(users.validUser.username);
      cy.get('[data-testid="password-input"]')
        .type(users.validUser.password);
      cy.get('[data-testid="login-button"]').click();
      
      // Logout
      cy.get('[data-testid="logout-button"]').click();
      
      // Test admin user
      cy.get('[data-testid="username-input"]')
        .type(users.adminUser.username);
      cy.get('[data-testid="password-input"]')
        .type(users.adminUser.password);
      cy.get('[data-testid="login-button"]').click();
    });
  });
});

describe('Fixtures Pattern - Multiple Fixture Files', () => {
  
  let users, testConfig;
  
  before(() => {
    // Load multiple fixtures
    cy.fixture('users').then((data) => {
      users = data;
    });
    
    cy.fixture('testData').then((data) => {
      testConfig = data;
    });
  });

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should use data from multiple fixtures', () => {
    // Use user data
    cy.get('[data-testid="username-input"]')
      .type(users.validUser.username);
    
    cy.get('[data-testid="password-input"]')
      .type(users.validUser.password);
    
    cy.get('[data-testid="login-button"]').click();
    
    // Use config data for URL verification
    cy.url().should('include', testConfig.urls.dashboard);
    
    // Use config data for timeouts
    cy.get('[data-testid="welcome-message"]', {
      timeout: testConfig.timeouts.pageLoad
    }).should('be.visible');
  });
});

/**
 * KEY LEARNING POINTS:
 * 
 * 1. THREE WAYS TO LOAD FIXTURES:
 *    a) before() hook with variable: Good for all tests
 *    b) Aliases with .as(): Cypress-native approach
 *    c) Inline cy.fixture(): Good for specific tests
 * 
 * 2. FIXTURE STRUCTURE:
 *    - Store in cypress/fixtures/ folder
 *    - Use .json extension
 *    - Organize by feature or data type
 * 
 * 3. BEST PRACTICES:
 *    - Keep fixture files small and focused
 *    - Use meaningful property names
 *    - Don't hardcode sensitive data
 *    - Update fixtures when requirements change
 * 
 * 4. ALIAS SYNTAX:
 *    - Must use function() not arrow =>
 *    - Access via this.aliasName
 *    - Automatically waits for fixture to load
 * 
 * SELENIUM COMPARISON:
 * 
 * Selenium (Java with Gson):
 *   String json = new String(Files.readAllBytes("users.json"));
 *   User user = new Gson().fromJson(json, User.class);
 *   driver.findElement(By.id("username")).sendKeys(user.getUsername());
 * 
 * Cypress:
 *   cy.fixture('users').then(users => {
 *     cy.get('#username').type(users.validUser.username);
 *   });
 * 
 * ADVANTAGES OVER SELENIUM:
 * - No external libraries needed
 * - Automatic JSON parsing
 * - Works with Cypress retry logic
 * - Can use aliases for cleaner code
 */
