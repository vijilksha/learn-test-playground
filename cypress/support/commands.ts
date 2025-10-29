/// <reference types="cypress" />

// Custom command to fill out the basic form
Cypress.Commands.add('fillBasicForm', (name: string, email: string, password: string) => {
  cy.get('[data-testid="name-input"]').clear().type(name);
  cy.get('[data-testid="email-input"]').clear().type(email);
  cy.get('[data-testid="password-input"]').clear().type(password);
});

// Custom command to submit form with proper handling
Cypress.Commands.add('submitForm', () => {
  cy.get('[data-testid="submit-button"]')
    .should('be.visible')
    .and('be.enabled')
    .scrollIntoView()
    .wait(100)
    .click({ force: true });
});

// Custom command to verify toast message
Cypress.Commands.add('verifyToast', (message: string, timeout = 10000) => {
  cy.contains(message, { timeout })
    .should('be.visible')
    .and('exist');
});

// Custom command to navigate safely with timeout handling
Cypress.Commands.add('navigateTo', (linkText: string) => {
  cy.contains('nav a', linkText, { timeout: 10000 })
    .should('be.visible')
    .click();
});

// Custom command to verify element attributes
Cypress.Commands.add('verifyAttributes', (selector: string, attributes: Record<string, string>) => {
  const element = cy.get(selector);
  Object.entries(attributes).forEach(([attr, value]) => {
    element.should('have.attr', attr, value);
  });
});

// Custom command to check multiple checkboxes at once
Cypress.Commands.add('checkMultiple', (selectors: string[]) => {
  selectors.forEach(selector => {
    cy.get(selector).check().should('be.checked');
  });
});

// Custom command to select from dropdown
Cypress.Commands.add('selectFromDropdown', (dropdownSelector: string, optionText: string) => {
  cy.get(dropdownSelector).click();
  cy.contains(optionText).click();
  cy.get(dropdownSelector).should('contain', optionText);
});

// Custom command to wait for loading state
Cypress.Commands.add('waitForLoading', (selector = '[data-testid="loading"]') => {
  cy.get(selector, { timeout: 10000 }).should('not.exist');
});

// Declare custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Fill out the basic form with name, email, and password
       * @example cy.fillBasicForm('John Doe', 'john@example.com', 'password123')
       */
      fillBasicForm(name: string, email: string, password: string): Chainable<void>;
      
      /**
       * Submit form with proper visibility and enabled checks
       * @example cy.submitForm()
       */
      submitForm(): Chainable<void>;
      
      /**
       * Verify toast message appears
       * @example cy.verifyToast('Success!')
       */
      verifyToast(message: string, timeout?: number): Chainable<void>;
      
      /**
       * Navigate to a page using nav link text
       * @example cy.navigateTo('Forms')
       */
      navigateTo(linkText: string): Chainable<void>;
      
      /**
       * Verify multiple attributes on an element
       * @example cy.verifyAttributes('[data-testid="input"]', { type: 'text', placeholder: 'Enter name' })
       */
      verifyAttributes(selector: string, attributes: Record<string, string>): Chainable<void>;
      
      /**
       * Check multiple checkboxes at once
       * @example cy.checkMultiple(['[data-testid="cb1"]', '[data-testid="cb2"]'])
       */
      checkMultiple(selectors: string[]): Chainable<void>;
      
      /**
       * Select option from dropdown
       * @example cy.selectFromDropdown('[data-testid="country-select"]', 'United States')
       */
      selectFromDropdown(dropdownSelector: string, optionText: string): Chainable<void>;
      
      /**
       * Wait for loading indicator to disappear
       * @example cy.waitForLoading()
       */
      waitForLoading(selector?: string): Chainable<void>;
    }
  }
}

export {};
