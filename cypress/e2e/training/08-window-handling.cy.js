/**
 * CONCEPT 8: WINDOW HANDLING IN CYPRESS
 * 
 * What is Window Handling?
 * - Working with browser windows, tabs, alerts, and popups
 * - Handling window.open(), window.location, window properties
 * - Managing alerts, confirms, and prompts
 * 
 * Key Difference from Selenium:
 * Selenium: Can switch between multiple windows/tabs
 * Cypress: Runs in single tab, but provides alternatives
 * 
 * Important: Cypress does NOT support multiple tabs/windows switching
 * Instead, use these strategies to test the same functionality
 */

describe('Window Handling - Alerts and Confirms', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * CONCEPT 1: HANDLING ALERTS
   * 
   * Selenium: driver.switchTo().alert().accept()
   * Cypress: Automatically accepts alerts (no code needed!)
   */
  it('Should automatically accept alerts', () => {
    // Trigger alert
    cy.get('[data-testid="alert-button"]').click();

    // ✅ Cypress automatically accepts alerts
    // No code needed! Alert is auto-accepted

    // Verify action after alert
    cy.get('[data-testid="alert-result"]')
      .should('contain', 'Alert accepted');

    /**
     * SELENIUM EQUIVALENT:
     * driver.findElement(By.id("alertBtn")).click();
     * Alert alert = driver.switchTo().alert();
     * alert.accept();
     */
  });

  /**
   * CONCEPT 2: VERIFYING ALERT TEXT
   * 
   * Use cy.on() to verify alert message before auto-acceptance
   */
  it('Should verify alert text before accepting', () => {
    // Set up listener BEFORE triggering alert
    cy.on('window:alert', (alertText) => {
      // Verify alert message
      expect(alertText).to.equal('This is an alert message!');
    });

    // Trigger alert
    cy.get('[data-testid="alert-button"]').click();

    // Alert is automatically accepted after verification
  });

  /**
   * CONCEPT 3: HANDLING CONFIRM DIALOGS
   * 
   * Cypress automatically clicks OK on confirms
   * Use cy.on() to click Cancel instead
   */
  it('Should accept confirm dialog (default)', () => {
    // Cypress automatically clicks OK
    cy.get('[data-testid="confirm-button"]').click();

    cy.get('[data-testid="confirm-result"]')
      .should('contain', 'Confirmed');
  });

  it('Should cancel confirm dialog', () => {
    // Listen for confirm and return false to cancel
    cy.on('window:confirm', () => {
      // Return false to click Cancel
      return false;
    });

    cy.get('[data-testid="confirm-button"]').click();

    cy.get('[data-testid="confirm-result"]')
      .should('contain', 'Cancelled');

    /**
     * SELENIUM EQUIVALENT:
     * Alert confirm = driver.switchTo().alert();
     * confirm.dismiss(); // Click Cancel
     */
  });

  it('Should verify confirm text and accept', () => {
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Are you sure?');
      return true; // Click OK
    });

    cy.get('[data-testid="confirm-button"]').click();
  });

  /**
   * CONCEPT 4: HANDLING PROMPTS
   * 
   * Cypress returns null by default (like clicking Cancel)
   * Use cy.window().then() and stub to provide input
   */
  it('Should handle prompt dialog', () => {
    // Stub the prompt to return a value
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('John Doe');
    });

    cy.get('[data-testid="prompt-button"]').click();

    cy.get('[data-testid="prompt-result"]')
      .should('contain', 'Hello, John Doe');

    /**
     * SELENIUM EQUIVALENT:
     * Alert prompt = driver.switchTo().alert();
     * prompt.sendKeys("John Doe");
     * prompt.accept();
     */
  });
});

describe('Window Handling - Window Properties', () => {

  /**
   * CONCEPT 5: ACCESSING WINDOW OBJECT
   * 
   * Use cy.window() to access browser window object
   */
  it('Should access window properties', () => {
    cy.visit('/dashboard');

    cy.window().then((win) => {
      // Access window properties
      expect(win.location.href).to.include('/dashboard');
      expect(win.document.title).to.equal('Dashboard');
      
      // Access global variables
      const appVersion = win.APP_VERSION;
      expect(appVersion).to.exist;

      // Check localStorage
      const token = win.localStorage.getItem('authToken');
      expect(token).to.exist;
    });

    /**
     * SELENIUM EQUIVALENT:
     * JavascriptExecutor js = (JavascriptExecutor) driver;
     * String url = js.executeScript("return window.location.href");
     */
  });

  /**
   * CONCEPT 6: MODIFYING WINDOW PROPERTIES
   * 
   * Set values on window object for testing
   */
  it('Should modify window properties', () => {
    cy.visit('/');

    cy.window().then((win) => {
      // Set global variable
      win.testMode = true;
      win.apiUrl = 'http://test-api.com';
      
      // Modify localStorage
      win.localStorage.setItem('theme', 'dark');
    });

    // Verify app uses modified values
    cy.get('[data-testid="theme"]')
      .should('have.class', 'dark-theme');
  });

  /**
   * CONCEPT 7: CHECKING WINDOW SIZE
   */
  it('Should verify window dimensions', () => {
    cy.window().then((win) => {
      expect(win.innerWidth).to.be.greaterThan(0);
      expect(win.innerHeight).to.be.greaterThan(0);
    });

    // Set viewport size
    cy.viewport(1280, 720);

    cy.window().its('innerWidth').should('equal', 1280);
  });
});

describe('Window Handling - Navigation', () => {

  /**
   * CONCEPT 8: HANDLING LINKS THAT OPEN IN NEW TAB
   * 
   * Problem: Cypress doesn't switch to new tabs
   * Solution: Remove target="_blank" and visit URL directly
   */
  it('Should handle links with target="_blank"', () => {
    cy.visit('/');

    // Get href and visit directly (instead of clicking)
    cy.get('[data-testid="external-link"]')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target') // Remove target="_blank"
      .click(); // Now opens in same tab

    // Verify navigation
    cy.url().should('include', '/external-page');

    /**
     * ALTERNATIVE: Get URL and visit
     * cy.get('a').invoke('attr', 'href').then((href) => {
     *   cy.visit(href);
     * });
     */
  });

  /**
   * CONCEPT 9: WINDOW.LOCATION CHANGES
   */
  it('Should handle window.location changes', () => {
    cy.visit('/');

    // Execute JavaScript to change location
    cy.window().then((win) => {
      win.location.href = '/dashboard';
    });

    cy.url().should('include', '/dashboard');
  });

  /**
   * CONCEPT 10: WINDOW.OPEN() ALTERNATIVES
   * 
   * Since Cypress can't switch tabs, test the URL directly
   */
  it('Should test content that would open in new window', () => {
    cy.visit('/');

    // Instead of clicking button that calls window.open()
    // Get the URL and visit it
    cy.get('[data-testid="open-report"]')
      .invoke('attr', 'data-url')
      .then((url) => {
        cy.visit(url);
      });

    // Verify the content
    cy.get('[data-testid="report-title"]')
      .should('be.visible');

    /**
     * SELENIUM EQUIVALENT:
     * driver.findElement(By.id("openReport")).click();
     * String mainWindow = driver.getWindowHandle();
     * Set<String> windows = driver.getWindowHandles();
     * for(String window : windows) {
     *   if(!window.equals(mainWindow)) {
     *     driver.switchTo().window(window);
     *   }
     * }
     */
  });
});

describe('Window Handling - Advanced Scenarios', () => {

  /**
   * CONCEPT 11: STUBBING WINDOW METHODS
   */
  it('Should stub window.open to prevent new tab', () => {
    cy.visit('/');

    // Stub window.open before clicking
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.get('[data-testid="popup-button"]').click();

    // Verify window.open was called with correct URL
    cy.get('@windowOpen').should('be.calledWith', '/popup-content');
  });

  /**
   * CONCEPT 12: HANDLING BEFORE UNLOAD
   */
  it('Should handle beforeunload event', () => {
    cy.visit('/form');

    // Fill form
    cy.get('[data-testid="name-input"]').type('John');

    // Stub beforeunload to prevent confirmation
    cy.window().then((win) => {
      cy.stub(win, 'onbeforeunload').returns(null);
    });

    // Navigate away
    cy.visit('/dashboard');

    cy.url().should('include', '/dashboard');
  });

  /**
   * CONCEPT 13: LISTENING TO WINDOW EVENTS
   */
  it('Should listen to custom window events', () => {
    cy.visit('/');

    let eventFired = false;

    cy.window().then((win) => {
      win.addEventListener('custom-event', () => {
        eventFired = true;
      });
    });

    // Trigger action that fires event
    cy.get('[data-testid="trigger-event"]').click();

    cy.window().then(() => {
      expect(eventFired).to.be.true;
    });
  });

  /**
   * CONCEPT 14: CHECKING CONSOLE LOGS/ERRORS
   */
  it('Should verify console messages', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // Spy on console methods before page loads
        cy.spy(win.console, 'log').as('consoleLog');
        cy.spy(win.console, 'error').as('consoleError');
      }
    });

    // Perform action
    cy.get('[data-testid="log-button"]').click();

    // Verify console.log was called
    cy.get('@consoleLog').should('be.calledWith', 'Button clicked');

    // Verify no console errors
    cy.get('@consoleError').should('not.be.called');
  });
});

/**
 * KEY LEARNING POINTS:
 * 
 * 1. ALERTS & CONFIRMS:
 *    - Cypress auto-accepts alerts
 *    - Use cy.on('window:alert') to verify text
 *    - Return false from cy.on('window:confirm') to cancel
 * 
 * 2. PROMPTS:
 *    - Use cy.stub(win, 'prompt') to provide input
 * 
 * 3. WINDOW OBJECT:
 *    - Use cy.window() to access browser window
 *    - Access properties, localStorage, global variables
 *    - Modify window for testing purposes
 * 
 * 4. MULTIPLE TABS/WINDOWS:
 *    - Cypress does NOT support tab switching
 *    - Remove target="_blank" and click
 *    - Or get URL and visit directly
 *    - Stub window.open to prevent popups
 * 
 * 5. ADVANCED:
 *    - Stub window methods
 *    - Listen to custom events
 *    - Spy on console methods
 *    - Handle beforeunload
 * 
 * SELENIUM VS CYPRESS COMPARISON:
 * 
 * Feature              | Selenium                  | Cypress
 * ---------------------|---------------------------|---------------------------
 * Alerts               | switchTo().alert()        | Auto-accepted, use cy.on()
 * Confirms             | alert.accept/dismiss()    | Auto-OK, cy.on() to cancel
 * Prompts              | alert.sendKeys()          | cy.stub(win, 'prompt')
 * Multiple tabs        | getWindowHandles()        | NOT SUPPORTED
 * New tab links        | Switch windows            | Remove target or visit URL
 * Window object        | JavascriptExecutor        | cy.window()
 * Window.open()        | Switch to new window      | Stub or visit URL directly
 * 
 * BEST PRACTICES:
 * 
 * ✅ DO:
 * - Use cy.on() for alert/confirm verification
 * - Remove target="_blank" for testing
 * - Visit URLs directly instead of clicking new tab links
 * - Stub window.open to test without opening tabs
 * - Use cy.window() to access browser APIs
 * 
 * ❌ DON'T:
 * - Expect to switch between multiple tabs
 * - Try to use Selenium's window handle approach
 * - Assume multiple window support exists
 * 
 * WORKAROUNDS FOR MULTIPLE WINDOWS:
 * 
 * 1. Remove target attribute:
 *    cy.get('a').invoke('removeAttr', 'target').click();
 * 
 * 2. Get href and visit:
 *    cy.get('a').invoke('attr', 'href').then(cy.visit);
 * 
 * 3. Stub window.open:
 *    cy.window().then(win => cy.stub(win, 'open'));
 * 
 * 4. Request URL directly:
 *    cy.request(url).its('body').should('contain', 'expected');
 */
