describe('Dynamic Content Testing', () => {
  beforeEach(() => {
    cy.visit('/dynamic');
  });

  describe('Loading States', () => {
    it('should display loading skeleton while content is loading', () => {
      // Verify button exists and is enabled
      cy.get('[data-testid="load-content-button"]')
        .should('be.visible')
        .and('be.enabled')
        .and('exist')
        .click();
      
      // Verify loading skeleton appears
      cy.get('[data-testid="loading-skeleton"]')
        .should('be.visible')
        .and('exist');
      
      // Wait for content to load
      cy.get('[data-testid="loaded-content"]', { timeout: 3000 })
        .should('be.visible')
        .and('exist')
        .and('contain', 'Content loaded successfully!');
      
      // Loading skeleton should disappear
      cy.get('[data-testid="loading-skeleton"]').should('not.exist');
      
      // Verify loaded content has proper structure
      cy.get('[data-testid="loaded-content"]')
        .should('have.length', 1)
        .and('be.visible');
    });

    it('should show "no content" message initially', () => {
      cy.get('[data-testid="no-content"]')
        .should('be.visible')
        .and('contain', 'No content loaded yet');
    });

    it('should disable button while loading', () => {
      // Verify initial enabled state
      cy.get('[data-testid="load-content-button"]')
        .should('not.be.disabled')
        .and('be.enabled')
        .and('have.prop', 'disabled', false)
        .click();
      
      // Verify disabled during loading
      cy.get('[data-testid="load-content-button"]')
        .should('be.disabled')
        .and('have.prop', 'disabled', true)
        .and('have.attr', 'disabled');
      
      // Wait for loading to complete
      cy.get('[data-testid="loaded-content"]', { timeout: 3000 }).should('be.visible');
      
      // Verify re-enabled after loading
      cy.get('[data-testid="load-content-button"]')
        .should('not.be.disabled')
        .and('be.enabled')
        .and('have.prop', 'disabled', false);
    });
  });

  describe('Real-time Updates', () => {
    it('should display and update timer continuously', () => {
      // Get initial timer value
      cy.get('[data-testid="timer-display"]').invoke('text').then((initialTime) => {
        const initialSeconds = parseInt(initialTime);
        
        // Wait a bit and verify timer increased
        cy.wait(2000);
        cy.get('[data-testid="timer-display"]').invoke('text').then((newTime) => {
          const newSeconds = parseInt(newTime);
          expect(newSeconds).to.be.greaterThan(initialSeconds);
        });
      });
    });

    it('should update progress bar when started', () => {
      // Initial progress should be 0
      cy.get('[data-testid="progress-bar"]')
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'data-value', '0')
        .and('have.attr', 'role', 'progressbar');
      
      // Start progress
      cy.get('[data-testid="start-progress-button"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      
      // Wait and verify progress increased
      cy.wait(1000);
      cy.get('[data-testid="progress-bar"]')
        .should('not.have.attr', 'data-value', '0')
        .invoke('attr', 'data-value')
        .then((value) => {
          expect(parseInt(value as string)).to.be.greaterThan(0);
        });
      
      // Wait for completion
      cy.wait(5000);
      cy.get('[data-testid="progress-bar"]')
        .should('have.attr', 'data-value', '100')
        .and('have.attr', 'aria-valuenow', '100');
    });
  });

  describe('Delayed Appearance', () => {
    it('should show waiting message initially', () => {
      cy.get('[data-testid="waiting-message"]').should('be.visible');
      cy.get('[data-testid="delayed-content"]').should('not.exist');
    });

    it('should display content after delay', () => {
      // Wait for delayed content to appear
      cy.get('[data-testid="delayed-content"]', { timeout: 4000 })
        .should('be.visible')
        .and('contain', 'This content appeared after a delay!');
      
      // Waiting message should be gone
      cy.get('[data-testid="waiting-message"]').should('not.exist');
    });
  });

  describe('Conditional Rendering', () => {
    it('should toggle conditional content visibility', () => {
      // Initially hidden
      cy.get('[data-testid="conditional-content-1"]').should('not.exist');
      
      // Show it
      cy.get('[data-testid="toggle-conditional-1"]').click();
      cy.get('[data-testid="conditional-content-1"]')
        .should('be.visible')
        .and('contain', 'Conditional content 1 is now visible');
      
      // Hide it again
      cy.get('[data-testid="toggle-conditional-1"]').click();
      cy.get('[data-testid="conditional-content-1"]').should('not.exist');
    });

    it('should handle multiple conditional elements independently', () => {
      // Show items 1 and 3
      cy.get('[data-testid="toggle-conditional-1"]').click();
      cy.get('[data-testid="toggle-conditional-3"]').click();
      
      // Verify correct items are visible
      cy.get('[data-testid="conditional-content-1"]').should('be.visible');
      cy.get('[data-testid="conditional-content-2"]').should('not.exist');
      cy.get('[data-testid="conditional-content-3"]').should('be.visible');
    });
  });

  describe('Waiting Strategies', () => {
    it('should use explicit wait for element to appear', () => {
      cy.get('[data-testid="load-content-button"]').click();
      
      // Explicitly wait for element with timeout
      cy.get('[data-testid="loaded-content"]', { timeout: 3000 }).should('exist');
    });

    it('should retry assertions until condition is met', () => {
      cy.get('[data-testid="start-progress-button"]').click();
      
      // This will retry until progress reaches at least 50
      cy.get('[data-testid="progress-bar"]', { timeout: 6000 })
        .should('have.attr', 'data-value')
        .then((value) => {
          expect(parseInt(value as string)).to.be.at.least(50);
        });
    });
  });

  describe('Complex Dynamic Scenarios', () => {
    it('should handle multiple async operations', () => {
      // Start progress
      cy.get('[data-testid="start-progress-button"]').click();
      
      // Load content
      cy.get('[data-testid="load-content-button"]').click();
      
      // Toggle conditional items
      cy.get('[data-testid="toggle-conditional-2"]').click();
      
      // Verify all operations complete correctly
      cy.get('[data-testid="loaded-content"]', { timeout: 3000 }).should('be.visible');
      cy.get('[data-testid="conditional-content-2"]').should('be.visible');
      cy.get('[data-testid="progress-bar"]', { timeout: 6000 })
        .should('have.attr', 'data-value', '100');
    });
  });
});
