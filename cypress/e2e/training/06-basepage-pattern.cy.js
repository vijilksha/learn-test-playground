/**
 * CONCEPT 6: BASEPAGE PATTERN
 * 
 * What is BasePage?
 * - Parent class with common actions for all pages
 * - Contains generic methods used across multiple pages
 * - Child page classes inherit from BasePage
 * - Promotes DRY (Don't Repeat Yourself) principle
 * 
 * Why use BasePage?
 * - Avoid duplicating common methods in every page class
 * - Centralized location for generic actions
 * - Easier maintenance of common functionality
 * - Consistent behavior across all page objects
 * 
 * Comparison with Selenium:
 * Selenium: Same concept, but need to handle WebDriver explicitly
 * Cypress: Cleaner, no driver management needed
 */

/**
 * BASEPAGE CLASS
 * Contains common methods used by all page objects
 */
class BasePage {
  
  // NAVIGATION METHODS
  visit(url) {
    cy.visit(url);
    return this;
  }

  goBack() {
    cy.go('back');
    return this;
  }

  goForward() {
    cy.go('forward');
    return this;
  }

  reload() {
    cy.reload();
    return this;
  }

  // INTERACTION METHODS
  click(selector) {
    cy.get(selector).click();
    return this;
  }

  type(selector, text) {
    cy.get(selector).clear().type(text);
    return this;
  }

  select(selector, value) {
    cy.get(selector).select(value);
    return this;
  }

  check(selector) {
    cy.get(selector).check();
    return this;
  }

  // ASSERTION METHODS
  verifyVisible(selector) {
    cy.get(selector).should('be.visible');
    return this;
  }

  verifyText(selector, text) {
    cy.get(selector).should('contain', text);
    return this;
  }

  verifyUrl(urlPart) {
    cy.url().should('include', urlPart);
    return this;
  }

  verifyEnabled(selector) {
    cy.get(selector).should('be.enabled');
    return this;
  }

  verifyDisabled(selector) {
    cy.get(selector).should('be.disabled');
    return this;
  }

  // WAIT METHODS
  waitForElement(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('exist');
    return this;
  }

  waitForVisible(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('be.visible');
    return this;
  }

  waitForNotVisible(selector, timeout = 10000) {
    cy.get(selector, { timeout }).should('not.be.visible');
    return this;
  }

  // UTILITY METHODS
  scrollToElement(selector) {
    cy.get(selector).scrollIntoView();
    return this;
  }

  getElementText(selector) {
    return cy.get(selector).invoke('text');
  }

  clearLocalStorage() {
    cy.clearLocalStorage();
    return this;
  }

  clearCookies() {
    cy.clearCookies();
    return this;
  }
}

/**
 * PAGE OBJECT EXTENDING BASEPAGE
 * LoginPage inherits all BasePage methods
 */
class LoginPage extends BasePage {
  
  // Page-specific selectors
  get selectors() {
    return {
      username: '[data-testid="username-input"]',
      password: '[data-testid="password-input"]',
      loginButton: '[data-testid="login-button"]',
      errorMessage: '[data-testid="error-message"]',
      welcomeMessage: '[data-testid="welcome-message"]'
    };
  }

  // Navigation
  visitLoginPage() {
    // Using BasePage method
    return this.visit('/login');
  }

  // Actions using BasePage methods
  enterUsername(username) {
    // Using BasePage type() method
    return this.type(this.selectors.username, username);
  }

  enterPassword(password) {
    return this.type(this.selectors.password, password);
  }

  clickLoginButton() {
    // Using BasePage click() method
    return this.click(this.selectors.loginButton);
  }

  // Combined action
  login(username, password) {
    return this.enterUsername(username)
               .enterPassword(password)
               .clickLoginButton();
  }

  // Assertions using BasePage methods
  verifyErrorDisplayed(message) {
    // Using BasePage verifyVisible() and verifyText()
    this.verifyVisible(this.selectors.errorMessage);
    this.verifyText(this.selectors.errorMessage, message);
    return this;
  }

  verifyWelcomeDisplayed() {
    return this.verifyVisible(this.selectors.welcomeMessage);
  }

  verifyOnLoginPage() {
    // Using BasePage verifyUrl()
    return this.verifyUrl('/login');
  }
}

/**
 * ANOTHER PAGE EXTENDING BASEPAGE
 * DashboardPage also inherits BasePage methods
 */
class DashboardPage extends BasePage {
  
  get selectors() {
    return {
      header: '[data-testid="dashboard-header"]',
      statsWidget: '[data-testid="stats-widget"]',
      userMenu: '[data-testid="user-menu"]',
      logoutButton: '[data-testid="logout-button"]'
    };
  }

  visitDashboard() {
    return this.visit('/dashboard');
  }

  // Using BasePage methods
  verifyDashboardLoaded() {
    this.verifyVisible(this.selectors.header);
    this.verifyUrl('/dashboard');
    return this;
  }

  openUserMenu() {
    return this.click(this.selectors.userMenu);
  }

  logout() {
    this.openUserMenu();
    return this.click(this.selectors.logoutButton);
  }
}

// Create instances
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

/**
 * TEST SUITE: Using BasePage Pattern
 */
describe('BasePage Pattern - Inheritance Example', () => {
  
  beforeEach(() => {
    loginPage.visitLoginPage();
  });

  it('Should use BasePage methods in LoginPage', () => {
    // All these methods come from BasePage!
    loginPage
      .type('[data-testid="username-input"]', 'john@example.com')
      .type('[data-testid="password-input"]', 'password123')
      .click('[data-testid="login-button"]')
      .verifyUrl('/dashboard');
  });

  it('Should use custom LoginPage methods that use BasePage', () => {
    // Custom methods that internally use BasePage methods
    loginPage
      .enterUsername('john@example.com')
      .enterPassword('password123')
      .clickLoginButton()
      .verifyOnLoginPage(); // Initially on login, then redirects
  });

  it('Should verify elements using BasePage assertions', () => {
    loginPage
      .verifyVisible('[data-testid="username-input"]')
      .verifyVisible('[data-testid="password-input"]')
      .verifyEnabled('[data-testid="login-button"]');
  });

  it('Should navigate using BasePage methods', () => {
    loginPage.login('john@example.com', 'password123');
    
    // Navigate back
    loginPage.goBack();
    loginPage.verifyOnLoginPage();
    
    // Navigate forward
    loginPage.goForward();
    dashboardPage.verifyDashboardLoaded();
  });

  it('Should use BasePage utility methods', () => {
    // Scroll to element
    loginPage.scrollToElement('[data-testid="login-button"]');
    
    // Wait for element
    loginPage.waitForVisible('[data-testid="username-input"]');
    
    // Get text
    loginPage.getElementText('[data-testid="page-title"]')
      .should('contain', 'Login');
  });
});

describe('BasePage Pattern - Multiple Pages', () => {
  
  beforeEach(() => {
    loginPage.visitLoginPage();
    loginPage.login('john@example.com', 'password123');
  });

  it('Should work across different page objects', () => {
    // Both LoginPage and DashboardPage inherit from BasePage
    
    // Verify dashboard
    dashboardPage.verifyDashboardLoaded();
    
    // Use BasePage methods on DashboardPage
    dashboardPage
      .verifyVisible('[data-testid="dashboard-header"]')
      .verifyText('[data-testid="dashboard-header"]', 'Dashboard');
    
    // Logout
    dashboardPage.logout();
    
    // Back to login page
    loginPage.verifyOnLoginPage();
  });

  it('Should demonstrate consistent behavior', () => {
    // Same BasePage methods work on any page
    
    // On Dashboard
    dashboardPage
      .verifyUrl('/dashboard')
      .verifyVisible('[data-testid="stats-widget"]');
    
    // Navigate to another page
    cy.visit('/profile');
    
    // BasePage methods still work
    dashboardPage
      .verifyUrl('/profile')
      .goBack()
      .verifyUrl('/dashboard');
  });
});

/**
 * KEY LEARNING POINTS:
 * 
 * 1. INHERITANCE STRUCTURE:
 *    BasePage (parent)
 *      ├── LoginPage (child)
 *      ├── DashboardPage (child)
 *      └── Any other page (child)
 * 
 * 2. BASEPAGE CONTAINS:
 *    - Navigation methods (visit, goBack, etc.)
 *    - Interaction methods (click, type, etc.)
 *    - Assertion methods (verifyVisible, etc.)
 *    - Wait methods (waitForElement, etc.)
 *    - Utility methods (scroll, clear storage, etc.)
 * 
 * 3. CHILD PAGES CONTAIN:
 *    - Page-specific selectors
 *    - Page-specific actions
 *    - Combined workflows
 *    - Custom assertions
 * 
 * 4. BENEFITS:
 *    - No code duplication
 *    - Consistent behavior across pages
 *    - Easy to add new pages
 *    - Single place to update common methods
 * 
 * 5. WHEN TO USE:
 *    - Multiple page objects in project
 *    - Common actions across pages
 *    - Large test suites
 *    - Professional frameworks
 * 
 * SELENIUM COMPARISON:
 * 
 * Selenium (Java):
 *   public class BasePage {
 *     protected WebDriver driver;
 *     
 *     public BasePage(WebDriver driver) {
 *       this.driver = driver;
 *     }
 *     
 *     public void click(By locator) {
 *       driver.findElement(locator).click();
 *     }
 *   }
 *   
 *   public class LoginPage extends BasePage {
 *     public LoginPage(WebDriver driver) {
 *       super(driver);
 *     }
 *     
 *     public void clickLogin() {
 *       click(By.id("loginBtn")); // Uses BasePage method
 *     }
 *   }
 * 
 * Cypress:
 *   class BasePage {
 *     click(selector) {
 *       cy.get(selector).click();
 *       return this;
 *     }
 *   }
 *   
 *   class LoginPage extends BasePage {
 *     clickLogin() {
 *       return this.click('[data-testid="login-button"]');
 *     }
 *   }
 * 
 * ADVANTAGES OVER SELENIUM:
 * - No driver management
 * - Simpler syntax
 * - Automatic waiting built-in
 * - Method chaining with 'this'
 */
