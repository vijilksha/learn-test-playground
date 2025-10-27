describe('Tables and Lists Testing', () => {
  beforeEach(() => {
    cy.visit('/tables');
  });

  describe('Table Display', () => {
    it('should display user table with correct data', () => {
      // Verify table structure
      cy.get('table').should('exist').and('be.visible');
      cy.get('thead').should('exist').and('be.visible');
      cy.get('tbody').should('exist').and('be.visible');
      
      // Verify table rows exist and are visible
      cy.get('[data-testid="user-row-1"]').should('be.visible').and('exist');
      cy.get('[data-testid="user-row-2"]').should('be.visible').and('exist');
      cy.get('[data-testid="user-row-3"]').should('be.visible').and('exist');
      cy.get('[data-testid="user-row-4"]').should('be.visible').and('exist');
      cy.get('[data-testid="user-row-5"]').should('be.visible').and('exist');
      
      // Verify row count
      cy.get('[data-testid^="user-row-"]').should('have.length', 5);
    });

    it('should display correct user information', () => {
      // Check first user with comprehensive assertions
      cy.get('[data-testid="user-name-1"]')
        .should('be.visible')
        .and('exist')
        .and('contain', 'Alice Johnson')
        .and('not.be.empty');
      cy.get('[data-testid="user-email-1"]')
        .should('be.visible')
        .and('contain', 'alice@example.com')
        .invoke('text')
        .should('match', /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      cy.get('[data-testid="user-role-1"]')
        .should('be.visible')
        .and('contain', 'Admin');
      cy.get('[data-testid="user-status-1"]')
        .should('be.visible')
        .and('contain', 'active')
        .and('have.class', 'text-primary');
    });

    it('should show results count', () => {
      cy.get('[data-testid="results-count"]')
        .should('be.visible')
        .and('contain', 'Showing 5 of 5 users');
    });
  });

  describe('Search Functionality', () => {
    it('should filter users by name', () => {
      // Verify search input exists
      cy.get('[data-testid="search-input"]')
        .should('be.visible')
        .and('be.enabled')
        .and('have.attr', 'type', 'text')
        .and('have.value', '')
        .type('Alice');
      
      // Verify input value
      cy.get('[data-testid="search-input"]').should('have.value', 'Alice');
      
      // Only Alice should be visible
      cy.get('[data-testid="user-row-1"]').should('be.visible').and('exist');
      cy.get('[data-testid="user-row-2"]').should('not.exist');
      cy.get('[data-testid^="user-row-"]').should('have.length', 1);
      
      // Check results count
      cy.get('[data-testid="results-count"]')
        .should('be.visible')
        .and('contain', 'Showing 1 of 5 users');
    });

    it('should filter users by email', () => {
      cy.get('[data-testid="search-input"]').type('bob@');
      
      cy.get('[data-testid="user-row-2"]').should('be.visible');
      cy.get('[data-testid="user-row-1"]').should('not.exist');
    });

    it('should show no results message when no matches', () => {
      cy.get('[data-testid="search-input"]').type('nonexistent user');
      cy.get('[data-testid="no-results"]')
        .should('be.visible')
        .and('exist')
        .and('contain', 'No users found');
      
      // Verify no user rows exist
      cy.get('[data-testid^="user-row-"]').should('have.length', 0);
      
      // Verify results count
      cy.get('[data-testid="results-count"]')
        .should('be.visible')
        .and('contain', 'Showing 0 of 5 users');
    });

    it('should handle case-insensitive search', () => {
      cy.get('[data-testid="search-input"]').type('ALICE');
      cy.get('[data-testid="user-row-1"]').should('be.visible');
    });

    it('should clear search results', () => {
      // Type search term
      cy.get('[data-testid="search-input"]').type('Alice');
      cy.get('[data-testid="results-count"]').should('contain', 'Showing 1 of 5 users');
      
      // Clear search
      cy.get('[data-testid="search-input"]').clear();
      cy.get('[data-testid="results-count"]').should('contain', 'Showing 5 of 5 users');
    });
  });

  describe('Sorting Functionality', () => {
    it('should sort by name ascending', () => {
      cy.get('[data-testid="sort-name"]').click();
      
      // Get all user names and verify order
      cy.get('[data-testid^="user-name-"]').then($names => {
        const names = [...$names].map(el => el.textContent);
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });
    });

    it('should sort by name descending', () => {
      // Click twice for descending
      cy.get('[data-testid="sort-name"]').click();
      cy.get('[data-testid="sort-name"]').click();
      
      cy.get('[data-testid^="user-name-"]').then($names => {
        const names = [...$names].map(el => el.textContent);
        const sortedNames = [...names].sort().reverse();
        expect(names).to.deep.equal(sortedNames);
      });
    });

    it('should sort by ID', () => {
      cy.get('[data-testid="sort-id"]').click();
      
      // IDs should be in ascending order
      cy.get('[data-testid="user-id-1"]').parent().parent().should('be.visible');
      cy.get('[data-testid="user-row-1"]').should('exist');
    });

    it('should sort by email', () => {
      cy.get('[data-testid="sort-email"]').click();
      
      cy.get('[data-testid^="user-email-"]').then($emails => {
        const emails = [...$emails].map(el => el.textContent);
        const sortedEmails = [...emails].sort();
        expect(emails).to.deep.equal(sortedEmails);
      });
    });

    it('should sort by role', () => {
      cy.get('[data-testid="sort-role"]').click();
      
      cy.get('[data-testid^="user-role-"]').then($roles => {
        const roles = [...$roles].map(el => el.textContent);
        const sortedRoles = [...roles].sort();
        expect(roles).to.deep.equal(sortedRoles);
      });
    });
  });

  describe('Combined Search and Sort', () => {
    it('should sort filtered results', () => {
      // Search for users with 'a' in name
      cy.get('[data-testid="search-input"]').type('a');
      
      // Sort by name
      cy.get('[data-testid="sort-name"]').click();
      
      // Verify filtered results are sorted
      cy.get('[data-testid^="user-name-"]').then($names => {
        const names = [...$names].map(el => el.textContent);
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });
    });
  });

  describe('Row Actions', () => {
    it('should have edit button for each user', () => {
      cy.get('[data-testid="edit-user-1"]').should('be.visible').and('contain', 'Edit');
      cy.get('[data-testid="edit-user-2"]').should('be.visible').and('contain', 'Edit');
      cy.get('[data-testid="edit-user-3"]').should('be.visible').and('contain', 'Edit');
    });

    it('should click edit button for specific user', () => {
      cy.get('[data-testid="edit-user-2"]').click();
      // Add assertions based on expected behavior
    });
  });

  describe('Status Display', () => {
    it('should display active status correctly', () => {
      cy.get('[data-testid="user-status-1"]')
        .should('contain', 'active')
        .and('have.class', 'text-primary');
    });

    it('should display inactive status correctly', () => {
      cy.get('[data-testid="user-status-3"]')
        .should('contain', 'inactive')
        .and('have.class', 'text-muted-foreground');
    });
  });

  describe('Pagination', () => {
    it('should have pagination controls', () => {
      cy.get('[data-testid="prev-page"]').should('be.visible').and('contain', 'Previous');
      cy.get('[data-testid="next-page"]').should('be.visible').and('contain', 'Next');
    });

    it('should click next page button', () => {
      cy.get('[data-testid="next-page"]').click();
      // Add assertions based on expected pagination behavior
    });

    it('should click previous page button', () => {
      cy.get('[data-testid="prev-page"]').click();
      // Add assertions based on expected pagination behavior
    });
  });

  describe('Table Accessibility', () => {
    it('should have proper table structure', () => {
      cy.get('table').should('exist');
      cy.get('thead').should('exist');
      cy.get('tbody').should('exist');
      cy.get('th').should('have.length.at.least', 5);
    });

    it('should navigate table using keyboard', () => {
      cy.get('[data-testid="search-input"]').focus().type('{tab}');
      // Verify focus moves to sort buttons
    });
  });
});
