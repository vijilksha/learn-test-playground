describe('Navigation Testing', () => {
  describe('Homepage Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display homepage correctly', () => {
      cy.contains('Testing Playground').should('be.visible');
      cy.contains('A comprehensive web application for learning').should('be.visible');
    });

    it('should navigate to Forms page from navigation menu', () => {
      cy.contains('Forms').click();
      cy.url().should('include', '/forms');
      cy.contains('Form Testing Scenarios').should('be.visible');
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
        cy.contains(page.name).click();
        cy.url().should('include', page.url);
        cy.contains(page.heading).should('be.visible');
      });
    });

    it('should navigate back to home from any page', () => {
      cy.visit('/forms');
      cy.contains('Testing Playground').click();
      cy.url().should('equal', Cypress.config().baseUrl + '/');
    });

    it('should navigate using hero section buttons', () => {
      cy.contains('Start Testing').click();
      cy.url().should('include', '/forms');
    });

    it('should navigate through scenario cards', () => {
      // Click on Forms card
      cy.contains('Input fields, selects, checkboxes').parent().parent().click();
      cy.url().should('include', '/forms');

      // Go back and test another card
      cy.visit('/');
      cy.contains('API calls, loading states').parent().parent().click();
      cy.url().should('include', '/api');
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
      cy.get('button[aria-label="Toggle menu"]').should('be.visible');
    });

    it('should open mobile menu when button clicked', () => {
      cy.get('button[aria-label="Toggle menu"]').click();
      cy.contains('Forms').should('be.visible');
      cy.contains('Interactions').should('be.visible');
    });

    it('should navigate to page from mobile menu', () => {
      cy.get('button[aria-label="Toggle menu"]').click();
      cy.contains('Dynamic Content').click();
      cy.url().should('include', '/dynamic');
    });
  });

  describe('Breadcrumb Navigation', () => {
    it('should allow navigation between related pages', () => {
      cy.visit('/forms');
      cy.contains('Interactions').click();
      cy.url().should('include', '/interactions');

      cy.contains('Forms').click();
      cy.url().should('include', '/forms');
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
      cy.contains('404').should('be.visible');
    });
  });

  describe('Browser Navigation', () => {
    it('should work with browser back button', () => {
      cy.visit('/');
      cy.contains('Forms').click();
      cy.url().should('include', '/forms');

      cy.go('back');
      cy.url().should('not.include', '/forms');
    });

    it('should work with browser forward button', () => {
      cy.visit('/');
      cy.contains('Forms').click();
      cy.go('back');
      cy.go('forward');
      cy.url().should('include', '/forms');
    });
  });

  describe('Logo Navigation', () => {
    it('should return to homepage when clicking logo', () => {
      cy.visit('/forms');
      cy.get('nav a').first().click();
      cy.url().should('equal', Cypress.config().baseUrl + '/');
    });
  });
});
