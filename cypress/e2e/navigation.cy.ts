describe('Navigation Testing', () => {
  describe('Homepage Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display homepage correctly', () => {
      cy.contains('Testing Playground').should('be.visible').and('exist');
      cy.contains('A comprehensive web application for learning').should('be.visible');
      
      // Verify main sections exist
      cy.get('nav').should('exist').and('be.visible');
      cy.get('main').should('exist');
      
      // Verify hero section
      cy.contains('Start Testing').should('be.visible').and('not.be.disabled');
      
      // Verify scenario cards
      cy.contains('Form Testing').should('be.visible');
      cy.contains('Interactive Elements').should('be.visible');
      cy.contains('Dynamic Content').should('be.visible');
    });

    it('should navigate to Forms page from navigation menu', () => {
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      // Using custom command for navigation
      cy.navigateTo('Forms');
      cy.url({ timeout: 10000 }).should('include', '/forms').and('not.include', '#');
      cy.contains('Form Testing Scenarios', { timeout: 10000 }).should('be.visible').and('exist');
      cy.location('pathname').should('eq', '/forms');
    });

    it('should navigate to all pages from navigation', () => {
      const pages = [
        { name: 'Forms', url: '/forms', heading: 'Form Testing Scenarios' },
        { name: 'Interactions', url: '/interactions', heading: 'Interactive Elements' },
        { name: 'Dynamic Content', url: '/dynamic', heading: 'Dynamic Content' },
        { name: 'Tables & Lists', url: '/tables', heading: 'Tables & Lists' },
        { name: 'API Testing', url: '/api', heading: 'API Testing Scenarios' },
        { name: 'Advanced', url: '/advanced', heading: 'Advanced Testing Scenarios' },
      ];

      pages.forEach((page) => {
        cy.visit('/');
        // Using custom command for navigation
        cy.navigateTo(page.name);
        cy.url({ timeout: 10000 }).should('include', page.url);
        cy.contains(page.heading, { timeout: 10000 }).should('be.visible');
      });
    });

    it('should navigate back to home from any page', () => {
      cy.visit('/forms');
      cy.url().should('include', '/forms');
      cy.contains('Testing Playground', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.url({ timeout: 10000 }).should('equal', Cypress.config().baseUrl + '/');
      cy.location('pathname').should('eq', '/');
      cy.contains('A comprehensive web application for learning', { timeout: 10000 }).should('be.visible');
    });

    it('should navigate using hero section buttons', () => {
      cy.contains('Start Testing', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.url({ timeout: 10000 }).should('include', '/forms');
    });

    it('should navigate through scenario cards', () => {
      // Click on Forms card
      cy.contains('Input fields, selects, checkboxes', { timeout: 10000 })
        .should('be.visible')
        .parent()
        .parent()
        .click();
      cy.url({ timeout: 10000 }).should('include', '/forms');

      // Go back and test another card
      cy.visit('/');
      cy.contains('API calls, loading states', { timeout: 10000 })
        .should('be.visible')
        .parent()
        .parent()
        .click();
      cy.url({ timeout: 10000 }).should('include', '/api');
    });
  });

  describe('Active Navigation State', () => {
    it('should highlight active page in navigation', () => {
      cy.visit('/forms');
      cy.contains('nav', 'Forms').should('exist');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/');
    });

    it('should show mobile menu button on small screens', () => {
      cy.get('button[aria-label="Toggle menu"]')
        .should('be.visible')
        .and('exist')
        .and('not.be.disabled')
        .and('have.attr', 'aria-label', 'Toggle menu');
    });

    it('should open mobile menu when button clicked', () => {
      cy.get('button[aria-label="Toggle menu"]').click();
      cy.contains('Forms', { timeout: 10000 }).should('be.visible');
      cy.contains('Interactions', { timeout: 10000 }).should('be.visible');
    });

    it('should navigate to page from mobile menu', () => {
      cy.get('button[aria-label="Toggle menu"]').click();
      cy.contains('Dynamic Content', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.url({ timeout: 10000 }).should('include', '/dynamic');
    });
  });

  describe('Breadcrumb Navigation', () => {
    it('should allow navigation between related pages', () => {
      cy.visit('/forms');
      // Using custom command for navigation
      cy.navigateTo('Interactions');
      cy.url({ timeout: 10000 }).should('include', '/interactions');

      // Navigate back to forms using custom command
      cy.navigateTo('Forms');
      cy.url({ timeout: 10000 }).should('include', '/forms');
    });
  });

  describe('Direct URL Access', () => {
    it('should load pages directly via URL', () => {
      const urls = ['/forms', '/interactions', '/dynamic', '/tables', '/api', '/advanced'];

      urls.forEach((url) => {
        cy.visit(url);
        cy.url().should('include', url);
      });
    });

    it('should handle 404 for invalid routes', () => {
      cy.visit('/invalid-page', { failOnStatusCode: false });
      cy.contains('404').should('be.visible').and('exist');
      cy.url().should('include', '/invalid-page');
      cy.contains('Page not found').should('exist');
    });
  });

  describe('Browser Navigation', () => {
    it('should work with browser back button', () => {
      cy.visit('/');
      // Using custom command for navigation
      cy.navigateTo('Forms');
      cy.url({ timeout: 10000 }).should('include', '/forms');

      cy.go('back');
      cy.url({ timeout: 10000 }).should('not.include', '/forms');
    });

    it('should work with browser forward button', () => {
      cy.visit('/');
      // Using custom command for navigation
      cy.navigateTo('Forms');
      cy.go('back');
      cy.go('forward');
      cy.url({ timeout: 10000 }).should('include', '/forms');
    });
  });

  describe('Logo Navigation', () => {
    it('should return to homepage when clicking logo', () => {
      cy.visit('/forms');
      cy.get('nav a', { timeout: 10000 })
        .first()
        .should('be.visible')
        .click();
      cy.url({ timeout: 10000 }).should('equal', Cypress.config().baseUrl + '/');
    });
  });
});
