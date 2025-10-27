describe('API Testing Scenarios', () => {
  beforeEach(() => {
    cy.visit('/api');
  });

  describe('Successful API Call', () => {
    it('should fetch data successfully', () => {
      cy.get('[data-testid="api-success-button"]').click();
      
      // Verify loading state appears
      cy.get('[data-testid="loading-state"]').should('be.visible');
      
      // Wait for success response
      cy.get('[data-testid="success-response"]', { timeout: 2000 })
        .should('be.visible')
        .and('contain', 'Success!');
      
      // Verify loading state is gone
      cy.get('[data-testid="loading-state"]').should('not.exist');
    });

    it('should display response data', () => {
      cy.get('[data-testid="api-success-button"]').click();
      
      cy.get('[data-testid="success-response"]', { timeout: 2000 })
        .should('be.visible')
        .and('contain', 'API call successful!')
        .and('contain', 'id')
        .and('contain', 'message')
        .and('contain', 'timestamp');
    });

    it('should parse JSON response correctly', () => {
      cy.get('[data-testid="api-success-button"]').click();
      
      cy.get('[data-testid="success-response"]', { timeout: 2000 })
        .find('pre')
        .invoke('text')
        .then((jsonText) => {
          const data = JSON.parse(jsonText);
          expect(data).to.have.property('id');
          expect(data).to.have.property('message');
          expect(data).to.have.property('timestamp');
          expect(data.id).to.be.a('number');
        });
    });
  });

  describe('Failed API Call', () => {
    it('should handle API errors', () => {
      cy.get('[data-testid="api-error-button"]').click();
      
      // Verify loading state
      cy.get('[data-testid="loading-state-error"]').should('be.visible');
      
      // Wait for error response
      cy.get('[data-testid="error-response"]', { timeout: 2000 })
        .should('be.visible')
        .and('contain', 'Error!');
    });

    it('should display error message', () => {
      cy.get('[data-testid="api-error-button"]').click();
      
      cy.get('[data-testid="error-response"]', { timeout: 2000 })
        .should('contain', 'API call failed. Please try again.');
    });

    it('should show error alert with proper styling', () => {
      cy.get('[data-testid="api-error-button"]').click();
      
      cy.get('[data-testid="error-response"]', { timeout: 2000 })
        .should('have.class', 'border-destructive');
    });
  });

  describe('Slow API Call', () => {
    it('should handle slow responses', () => {
      cy.get('[data-testid="api-slow-button"]').click();
      
      // Verify loading indicator
      cy.get('[data-testid="loading-indicator"]')
        .should('be.visible')
        .and('contain', 'Loading... This might take a while.');
      
      // Wait for completion (3 seconds)
      cy.get('[data-testid="slow-response"]', { timeout: 4000 })
        .should('be.visible')
        .and('contain', 'Request completed after delay!');
    });

    it('should show loading state for extended period', () => {
      cy.get('[data-testid="api-slow-button"]').click();
      
      // Verify loading persists
      cy.wait(1000);
      cy.get('[data-testid="loading-indicator"]').should('be.visible');
      
      cy.wait(1000);
      cy.get('[data-testid="loading-indicator"]').should('be.visible');
    });

    it('should disable button during slow request', () => {
      cy.get('[data-testid="api-slow-button"]').click();
      cy.get('[data-testid="api-slow-button"]').should('be.disabled');
      
      // Wait for completion
      cy.get('[data-testid="slow-response"]', { timeout: 4000 }).should('be.visible');
      cy.get('[data-testid="api-slow-button"]').should('not.be.disabled');
    });
  });

  describe('Network Status', () => {
    it('should display network status', () => {
      cy.get('[data-testid="network-status"]')
        .should('be.visible')
        .and('contain', 'Network: Online');
    });

    it('should show API endpoints status', () => {
      cy.get('[data-testid="endpoint-1"]')
        .should('be.visible')
        .and('contain', '/api/users - Active');
      
      cy.get('[data-testid="endpoint-2"]')
        .should('contain', '/api/posts - Active');
      
      cy.get('[data-testid="endpoint-3"]')
        .should('contain', '/api/comments - Active');
    });
  });

  describe('Button States', () => {
    it('should show spinner icon while loading', () => {
      cy.get('[data-testid="api-success-button"]').click();
      
      // Check for loading spinner (Loader2 icon)
      cy.get('[data-testid="api-success-button"]')
        .find('svg')
        .should('have.class', 'animate-spin');
    });
  });

  describe('Multiple Concurrent Requests', () => {
    it('should handle multiple API calls independently', () => {
      // Start success call
      cy.get('[data-testid="api-success-button"]').click();
      
      // Start error call
      cy.get('[data-testid="api-error-button"]').click();
      
      // Both should complete
      cy.get('[data-testid="success-response"]', { timeout: 3000 }).should('be.visible');
      cy.get('[data-testid="error-response"]', { timeout: 3000 }).should('be.visible');
    });
  });

  describe('API Testing Best Practices', () => {
    it('should use appropriate timeouts for slow requests', () => {
      cy.get('[data-testid="api-slow-button"]').click();
      
      // Use longer timeout for slow requests
      cy.get('[data-testid="slow-response"]', { timeout: 5000 }).should('be.visible');
    });

    it('should verify loading states before and after requests', () => {
      // No loading state initially
      cy.get('[data-testid="loading-state"]').should('not.exist');
      
      cy.get('[data-testid="api-success-button"]').click();
      
      // Loading state appears
      cy.get('[data-testid="loading-state"]').should('be.visible');
      
      // Loading state disappears after completion
      cy.get('[data-testid="success-response"]', { timeout: 3000 }).should('be.visible');
      cy.get('[data-testid="loading-state"]').should('not.exist');
    });

    it('should test error recovery', () => {
      // Trigger error
      cy.get('[data-testid="api-error-button"]').click();
      cy.get('[data-testid="error-response"]', { timeout: 2000 }).should('be.visible');
      
      // Try successful call after error
      cy.get('[data-testid="api-success-button"]').click();
      cy.get('[data-testid="success-response"]', { timeout: 2000 }).should('be.visible');
    });
  });
});
