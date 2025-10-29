/**
 * CONCEPT 7: CYPRESS VS SELENIUM - KEY DIFFERENCES
 * 
 * This file demonstrates the key differences between Cypress and Selenium
 * with practical examples to help Selenium engineers understand Cypress patterns.
 */

describe('Cypress vs Selenium - Understanding the Differences', () => {

  /**
   * DIFFERENCE 1: WHY const a = cy.get() DOESN'T WORK
   * 
   * In Selenium: Commands execute immediately and return elements
   * In Cypress: Commands are queued and executed asynchronously
   */
  it('Demonstrates why const element = cy.get() is not advisable', () => {
    cy.visit('/login');

    // ❌ WRONG WAY (Selenium thinking)
    // This does NOT work as expected in Cypress
    // const usernameInput = cy.get('[data-testid="username-input"]');
    // usernameInput will be a Chainable, not the actual element
    // console.log(usernameInput); // This shows Chainable object, not element

    // ✅ CORRECT WAY in Cypress - Chain commands directly
    cy.get('[data-testid="username-input"]')
      .should('be.visible')
      .type('john@example.com');

    /**
     * EXPLANATION:
     * Selenium (Java):
     *   WebElement element = driver.findElement(By.id("username"));
     *   element.sendKeys("john"); // Works immediately
     * 
     * Cypress (JavaScript):
     *   const element = cy.get('#username'); // Returns Chainable, not element
     *   element.type('john'); // Still works, but not the actual DOM element
     * 
     * WHY IT MATTERS:
     * - Cypress commands are queued, not executed immediately
     * - Variables hold Chainable objects, not DOM elements
     * - Better to chain commands directly
     */
  });

  /**
   * DIFFERENCE 2: PROPER .then() USAGE FOR DOM ELEMENTS
   * 
   * When you REALLY need the actual DOM element, use .then()
   */
  it('Demonstrates proper .then() usage to access real DOM elements', () => {
    cy.visit('/login');

    // ✅ CORRECT: Use .then() to access actual element
    cy.get('[data-testid="username-input"]').then(($element) => {
      // $element is the actual jQuery-wrapped DOM element
      // Now you can use jQuery methods or access properties
      
      // Get value using jQuery
      const value = $element.val();
      
      // Get attribute
      const placeholder = $element.attr('placeholder');
      
      // Check properties
      expect($element).to.be.visible;
      
      // You can also access native DOM element
      const domElement = $element[0]; // Raw DOM element
      console.log('Element tag:', domElement.tagName);
    });

    /**
     * WHEN TO USE .then():
     * - Need to access element properties/attributes
     * - Need to perform conditional logic based on element state
     * - Need to use jQuery methods
     * - Need to work with the actual DOM element
     * 
     * Selenium equivalent:
     *   WebElement element = driver.findElement(By.id("username"));
     *   String value = element.getAttribute("value");
     *   String tag = element.getTagName();
     */
  });

  /**
   * DIFFERENCE 3: NO EXPLICIT WAITS NEEDED
   * 
   * Selenium: Need WebDriverWait, ExpectedConditions
   * Cypress: Automatic waiting and retry logic
   */
  it('Demonstrates automatic waiting (no explicit waits needed)', () => {
    cy.visit('/login');

    // ✅ Cypress automatically waits for element to exist and be visible
    cy.get('[data-testid="username-input"]')
      .type('john@example.com');

    // Automatically waits for button to be enabled
    cy.get('[data-testid="login-button"]')
      .click();

    // Automatically waits for element to appear (up to 4 seconds default)
    cy.get('[data-testid="welcome-message"]')
      .should('be.visible');

    /**
     * COMPARISON:
     * 
     * Selenium (Java):
     *   WebDriverWait wait = new WebDriverWait(driver, 10);
     *   WebElement element = wait.until(
     *     ExpectedConditions.visibilityOfElementLocated(By.id("welcome"))
     *   );
     *   element.click();
     * 
     * Cypress:
     *   cy.get('#welcome').click(); // Waits automatically!
     * 
     * CYPRESS AUTOMATIC WAITING:
     * - Waits for element to exist in DOM
     * - Waits for element to be visible
     * - Waits for element to be enabled
     * - Retries assertions automatically
     * - Default timeout: 4 seconds (configurable)
     */
  });

  /**
   * DIFFERENCE 4: COMMAND CHAINING
   * 
   * Selenium: Each command is independent
   * Cypress: Commands are chained and queued
   */
  it('Demonstrates command chaining', () => {
    cy.visit('/login');

    // ✅ Cypress: Chain multiple commands
    cy.get('[data-testid="username-input"]')
      .should('be.visible')
      .should('be.enabled')
      .clear()
      .type('john@example.com')
      .should('have.value', 'john@example.com');

    /**
     * COMPARISON:
     * 
     * Selenium (Java):
     *   WebElement input = driver.findElement(By.id("username"));
     *   Assert.assertTrue(input.isDisplayed());
     *   Assert.assertTrue(input.isEnabled());
     *   input.clear();
     *   input.sendKeys("john@example.com");
     *   Assert.assertEquals("john@example.com", input.getAttribute("value"));
     * 
     * Cypress:
     *   cy.get('#username')
     *     .should('be.visible')
     *     .should('be.enabled')
     *     .clear()
     *     .type('john@example.com')
     *     .should('have.value', 'john@example.com');
     * 
     * ADVANTAGES:
     * - More readable
     * - Fewer lines of code
     * - Automatic retry for each step
     * - Better error messages
     */
  });

  /**
   * DIFFERENCE 5: ASSERTIONS BUILT INTO COMMANDS
   * 
   * Selenium: Separate assertion library needed
   * Cypress: Assertions built-in with .should()
   */
  it('Demonstrates built-in assertions', () => {
    cy.visit('/login');

    // ✅ Multiple types of assertions
    cy.get('[data-testid="username-input"]')
      .should('exist')                    // Element exists
      .should('be.visible')               // Element visible
      .should('be.enabled')               // Element enabled
      .should('have.attr', 'type', 'text') // Has attribute
      .should('have.class', 'input');     // Has class

    cy.get('[data-testid="login-button"]')
      .should('contain', 'Login')         // Contains text
      .should('not.be.disabled');         // Not disabled

    /**
     * ASSERTION TYPES:
     * - Visibility: be.visible, not.be.visible
     * - State: be.enabled, be.disabled, be.checked
     * - Attributes: have.attr, have.class, have.id
     * - Text: contain, have.text
     * - Value: have.value
     * - Existence: exist, not.exist
     * 
     * Selenium equivalent would need TestNG/JUnit:
     *   Assert.assertTrue(element.isDisplayed());
     *   Assert.assertEquals("Login", element.getText());
     */
  });

  /**
   * DIFFERENCE 6: HANDLING ASYNCHRONOUS OPERATIONS
   * 
   * Selenium: Need explicit waits for AJAX
   * Cypress: Handles async automatically
   */
  it('Demonstrates handling async operations', () => {
    cy.visit('/login');

    // Login triggers API call
    cy.get('[data-testid="username-input"]').type('john@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    // ✅ Cypress waits for API response and element to appear
    cy.get('[data-testid="welcome-message"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Welcome');

    /**
     * COMPARISON:
     * 
     * Selenium (Java):
     *   driver.findElement(By.id("login")).click();
     *   WebDriverWait wait = new WebDriverWait(driver, 10);
     *   wait.until(ExpectedConditions.visibilityOfElementLocated(
     *     By.id("welcome")
     *   ));
     * 
     * Cypress:
     *   cy.get('#login').click();
     *   cy.get('#welcome').should('be.visible'); // Waits automatically
     * 
     * CUSTOM TIMEOUT:
     *   cy.get('#welcome', { timeout: 10000 }).should('be.visible');
     */
  });

  /**
   * DIFFERENCE 7: WORKING WITH MULTIPLE ELEMENTS
   * 
   * Selenium: Returns List<WebElement>
   * Cypress: Returns jQuery collection with Cypress methods
   */
  it('Demonstrates working with multiple elements', () => {
    cy.visit('/dashboard');

    // ✅ Working with multiple elements
    cy.get('[data-testid="table-row"]')
      .should('have.length.greaterThan', 0) // Check count
      .first()                               // Get first
      .should('be.visible');

    cy.get('[data-testid="table-row"]')
      .last()                                // Get last
      .click();

    cy.get('[data-testid="table-row"]')
      .eq(2)                                 // Get by index (0-based)
      .should('contain', 'Test Data');

    // Iterate over elements
    cy.get('[data-testid="table-row"]').each(($row, index) => {
      // $row is jQuery wrapped element
      cy.wrap($row).should('be.visible');
    });

    /**
     * COMMON MULTIPLE ELEMENT OPERATIONS:
     * - .first() - Get first element
     * - .last() - Get last element
     * - .eq(index) - Get element by index
     * - .each() - Iterate over elements
     * - .should('have.length', n) - Assert count
     * 
     * Selenium equivalent:
     *   List<WebElement> rows = driver.findElements(By.className("row"));
     *   Assert.assertTrue(rows.size() > 0);
     *   rows.get(0).click(); // First element
     */
  });
});

/**
 * SUMMARY: KEY DIFFERENCES
 * 
 * 1. COMMAND EXECUTION:
 *    Selenium: Immediate execution
 *    Cypress: Queued execution (asynchronous)
 * 
 * 2. ELEMENT HANDLING:
 *    Selenium: Returns WebElement objects
 *    Cypress: Returns Chainable objects (use .then() for real element)
 * 
 * 3. WAITING:
 *    Selenium: Explicit waits required
 *    Cypress: Automatic waiting and retry
 * 
 * 4. ASSERTIONS:
 *    Selenium: External library (TestNG/JUnit)
 *    Cypress: Built-in (.should())
 * 
 * 5. SYNTAX:
 *    Selenium: Verbose, multiple lines
 *    Cypress: Clean, chainable
 * 
 * 6. SETUP:
 *    Selenium: Driver setup, browser management
 *    Cypress: Built-in browser management
 * 
 * 7. DEBUGGING:
 *    Selenium: Complex, need logging
 *    Cypress: Time-travel debugging, snapshots
 * 
 * BEST PRACTICES FOR SELENIUM ENGINEERS:
 * 
 * ❌ DON'T:
 * - Store cy.get() in variables
 * - Use explicit waits (sleep, pause)
 * - Think synchronously
 * - Manage browser drivers
 * 
 * ✅ DO:
 * - Chain commands directly
 * - Use .then() when you need real elements
 * - Embrace async nature
 * - Trust automatic waiting
 * - Use built-in assertions
 */
