/**
 * BasePage - Contains common methods that all page objects inherit
 * This follows the DRY principle and provides reusable functionality
 */

class BasePage {
  // ========================================
  // NAVIGATION METHODS
  // ========================================

  /**
   * Visit a URL
   * @param url - The URL to visit
   */
  visit(url: string) {
    cy.visit(url);
    return this;
  }

  /**
   * Get current URL
   */
  getUrl() {
    return cy.url();
  }

  /**
   * Verify current URL contains expected text
   * @param expectedUrl - Expected URL or URL fragment
   */
  verifyUrl(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
    return this;
  }

  /**
   * Verify current URL equals expected URL
   * @param expectedUrl - Expected exact URL
   */
  verifyExactUrl(expectedUrl: string) {
    cy.url().should('eq', expectedUrl);
    return this;
  }

  /**
   * Go back in browser history
   */
  goBack() {
    cy.go('back');
    return this;
  }

  /**
   * Go forward in browser history
   */
  goForward() {
    cy.go('forward');
    return this;
  }

  /**
   * Reload the page
   */
  reload() {
    cy.reload();
    return this;
  }

  // ========================================
  // ELEMENT INTERACTION METHODS
  // ========================================

  /**
   * Click an element
   * @param selector - Element selector
   */
  clickElement(selector: string) {
    cy.get(selector).click();
    return this;
  }

  /**
   * Click element with force option
   * @param selector - Element selector
   */
  clickElementForce(selector: string) {
    cy.get(selector).click({ force: true });
    return this;
  }

  /**
   * Double click an element
   * @param selector - Element selector
   */
  doubleClickElement(selector: string) {
    cy.get(selector).dblclick();
    return this;
  }

  /**
   * Right click an element
   * @param selector - Element selector
   */
  rightClickElement(selector: string) {
    cy.get(selector).rightclick();
    return this;
  }

  /**
   * Type text into an element
   * @param selector - Element selector
   * @param text - Text to type
   */
  typeText(selector: string, text: string) {
    cy.get(selector).clear().type(text);
    return this;
  }

  /**
   * Type text without clearing first
   * @param selector - Element selector
   * @param text - Text to type
   */
  appendText(selector: string, text: string) {
    cy.get(selector).type(text);
    return this;
  }

  /**
   * Clear text from an element
   * @param selector - Element selector
   */
  clearText(selector: string) {
    cy.get(selector).clear();
    return this;
  }

  /**
   * Select option from dropdown by value
   * @param selector - Dropdown selector
   * @param value - Option value
   */
  selectDropdownByValue(selector: string, value: string) {
    cy.get(selector).select(value);
    return this;
  }

  /**
   * Select option from dropdown by text
   * @param selector - Dropdown selector
   * @param text - Option text
   */
  selectDropdownByText(selector: string, text: string) {
    cy.get(selector).select(text);
    return this;
  }

  /**
   * Check a checkbox
   * @param selector - Checkbox selector
   */
  checkCheckbox(selector: string) {
    cy.get(selector).check();
    return this;
  }

  /**
   * Uncheck a checkbox
   * @param selector - Checkbox selector
   */
  uncheckCheckbox(selector: string) {
    cy.get(selector).uncheck();
    return this;
  }

  /**
   * Toggle a checkbox
   * @param selector - Checkbox selector
   */
  toggleCheckbox(selector: string) {
    cy.get(selector).click();
    return this;
  }

  /**
   * Upload a file
   * @param selector - File input selector
   * @param fileName - Name of file in fixtures folder
   */
  uploadFile(selector: string, fileName: string) {
    cy.get(selector).selectFile(`cypress/fixtures/${fileName}`);
    return this;
  }

  // ========================================
  // ASSERTION METHODS
  // ========================================

  /**
   * Verify element is visible
   * @param selector - Element selector
   */
  verifyElementVisible(selector: string) {
    cy.get(selector).should('be.visible');
    return this;
  }

  /**
   * Verify element is not visible
   * @param selector - Element selector
   */
  verifyElementNotVisible(selector: string) {
    cy.get(selector).should('not.be.visible');
    return this;
  }

  /**
   * Verify element exists in DOM
   * @param selector - Element selector
   */
  verifyElementExists(selector: string) {
    cy.get(selector).should('exist');
    return this;
  }

  /**
   * Verify element does not exist in DOM
   * @param selector - Element selector
   */
  verifyElementNotExist(selector: string) {
    cy.get(selector).should('not.exist');
    return this;
  }

  /**
   * Verify element contains specific text
   * @param selector - Element selector
   * @param text - Expected text
   */
  verifyElementContainsText(selector: string, text: string) {
    cy.get(selector).should('contain.text', text);
    return this;
  }

  /**
   * Verify element has exact text
   * @param selector - Element selector
   * @param text - Expected exact text
   */
  verifyElementHasText(selector: string, text: string) {
    cy.get(selector).should('have.text', text);
    return this;
  }

  /**
   * Verify element has specific value
   * @param selector - Element selector
   * @param value - Expected value
   */
  verifyElementValue(selector: string, value: string) {
    cy.get(selector).should('have.value', value);
    return this;
  }

  /**
   * Verify element is enabled
   * @param selector - Element selector
   */
  verifyElementEnabled(selector: string) {
    cy.get(selector).should('be.enabled');
    return this;
  }

  /**
   * Verify element is disabled
   * @param selector - Element selector
   */
  verifyElementDisabled(selector: string) {
    cy.get(selector).should('be.disabled');
    return this;
  }

  /**
   * Verify element is checked
   * @param selector - Element selector
   */
  verifyElementChecked(selector: string) {
    cy.get(selector).should('be.checked');
    return this;
  }

  /**
   * Verify element is not checked
   * @param selector - Element selector
   */
  verifyElementNotChecked(selector: string) {
    cy.get(selector).should('not.be.checked');
    return this;
  }

  /**
   * Verify element has specific attribute with value
   * @param selector - Element selector
   * @param attribute - Attribute name
   * @param value - Expected attribute value
   */
  verifyElementAttribute(selector: string, attribute: string, value: string) {
    cy.get(selector).should('have.attr', attribute, value);
    return this;
  }

  /**
   * Verify element has specific class
   * @param selector - Element selector
   * @param className - Expected class name
   */
  verifyElementHasClass(selector: string, className: string) {
    cy.get(selector).should('have.class', className);
    return this;
  }

  /**
   * Verify page title
   * @param expectedTitle - Expected page title
   */
  verifyTitle(expectedTitle: string) {
    cy.title().should('eq', expectedTitle);
    return this;
  }

  /**
   * Verify title contains text
   * @param text - Text that should be in title
   */
  verifyTitleContains(text: string) {
    cy.title().should('include', text);
    return this;
  }

  // ========================================
  // WAIT METHODS
  // ========================================

  /**
   * Wait for element to be visible
   * @param selector - Element selector
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  waitForElement(selector: string, timeout: number = 10000) {
    cy.get(selector, { timeout }).should('be.visible');
    return this;
  }

  /**
   * Wait for element to exist in DOM
   * @param selector - Element selector
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  waitForElementToExist(selector: string, timeout: number = 10000) {
    cy.get(selector, { timeout }).should('exist');
    return this;
  }

  /**
   * Wait for element to disappear
   * @param selector - Element selector
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  waitForElementToDisappear(selector: string, timeout: number = 10000) {
    cy.get(selector, { timeout }).should('not.exist');
    return this;
  }

  /**
   * Wait for loading indicator to disappear
   * @param selector - Loading indicator selector (default: [data-testid="loading"])
   * @param timeout - Timeout in milliseconds (default: 10000)
   */
  waitForLoading(selector: string = '[data-testid="loading"]', timeout: number = 10000) {
    cy.get(selector, { timeout }).should('not.exist');
    return this;
  }

  /**
   * Wait for fixed time (use sparingly)
   * @param milliseconds - Time to wait in milliseconds
   */
  wait(milliseconds: number) {
    cy.wait(milliseconds);
    return this;
  }

  // ========================================
  // SCROLL METHODS
  // ========================================

  /**
   * Scroll element into view
   * @param selector - Element selector
   */
  scrollToElement(selector: string) {
    cy.get(selector).scrollIntoView();
    return this;
  }

  /**
   * Scroll to top of page
   */
  scrollToTop() {
    cy.scrollTo('top');
    return this;
  }

  /**
   * Scroll to bottom of page
   */
  scrollToBottom() {
    cy.scrollTo('bottom');
    return this;
  }

  /**
   * Scroll to specific position
   * @param x - X coordinate
   * @param y - Y coordinate
   */
  scrollTo(x: number | string, y: number | string) {
    cy.scrollTo(x, y);
    return this;
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  /**
   * Get element text content
   * @param selector - Element selector
   * @returns Chainable with text content
   */
  getElementText(selector: string) {
    return cy.get(selector).invoke('text');
  }

  /**
   * Get element attribute value
   * @param selector - Element selector
   * @param attribute - Attribute name
   * @returns Chainable with attribute value
   */
  getElementAttribute(selector: string, attribute: string) {
    return cy.get(selector).invoke('attr', attribute);
  }

  /**
   * Get element count
   * @param selector - Element selector
   * @returns Chainable with element count
   */
  getElementCount(selector: string) {
    return cy.get(selector).its('length');
  }

  /**
   * Trigger custom event
   * @param selector - Element selector
   * @param event - Event name
   */
  triggerEvent(selector: string, event: string) {
    cy.get(selector).trigger(event);
    return this;
  }

  /**
   * Hover over element
   * @param selector - Element selector
   */
  hoverElement(selector: string) {
    cy.get(selector).trigger('mouseover');
    return this;
  }

  /**
   * Focus on element
   * @param selector - Element selector
   */
  focusElement(selector: string) {
    cy.get(selector).focus();
    return this;
  }

  /**
   * Blur element (remove focus)
   * @param selector - Element selector
   */
  blurElement(selector: string) {
    cy.get(selector).blur();
    return this;
  }

  // ========================================
  // BROWSER STORAGE METHODS
  // ========================================

  /**
   * Clear local storage
   */
  clearLocalStorage() {
    cy.clearLocalStorage();
    return this;
  }

  /**
   * Clear cookies
   */
  clearCookies() {
    cy.clearCookies();
    return this;
  }

  /**
   * Clear all browser storage
   */
  clearAllStorage() {
    cy.clearLocalStorage();
    cy.clearCookies();
    return this;
  }

  /**
   * Get local storage item
   * @param key - Storage key
   */
  getLocalStorage(key: string) {
    return cy.window().its(`localStorage.${key}`);
  }

  /**
   * Set local storage item
   * @param key - Storage key
   * @param value - Storage value
   */
  setLocalStorage(key: string, value: string) {
    cy.window().then((window) => {
      window.localStorage.setItem(key, value);
    });
    return this;
  }

  /**
   * Get cookie by name
   * @param name - Cookie name
   */
  getCookie(name: string) {
    return cy.getCookie(name);
  }

  /**
   * Set cookie
   * @param name - Cookie name
   * @param value - Cookie value
   */
  setCookie(name: string, value: string) {
    cy.setCookie(name, value);
    return this;
  }

  // ========================================
  // VIEWPORT METHODS
  // ========================================

  /**
   * Set viewport size
   * @param width - Viewport width
   * @param height - Viewport height
   */
  setViewport(width: number, height: number) {
    cy.viewport(width, height);
    return this;
  }

  /**
   * Set viewport to mobile
   */
  setMobileViewport() {
    cy.viewport('iphone-x');
    return this;
  }

  /**
   * Set viewport to tablet
   */
  setTabletViewport() {
    cy.viewport('ipad-2');
    return this;
  }

  /**
   * Set viewport to desktop
   */
  setDesktopViewport() {
    cy.viewport(1920, 1080);
    return this;
  }
}

export default BasePage;
