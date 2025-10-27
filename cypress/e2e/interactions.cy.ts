describe('Interactive Elements Testing', () => {
  beforeEach(() => {
    cy.visit('/interactions');
  });

  describe('Button Clicks', () => {
    it('should handle single click', () => {
      cy.get('[data-testid="single-click-button"]').click();
      cy.contains('Button clicked!').should('be.visible');
    });

    it('should handle double click', () => {
      cy.get('[data-testid="double-click-button"]').dblclick();
      cy.contains('Button double-clicked!').should('be.visible');
    });

    it('should increment counter on each click', () => {
      cy.get('[data-testid="counter-button"]').should('contain', 'Clicked 0 times');
      
      cy.get('[data-testid="counter-button"]').click();
      cy.get('[data-testid="counter-button"]').should('contain', 'Clicked 1 times');
      
      cy.get('[data-testid="counter-button"]').click();
      cy.get('[data-testid="counter-button"]').should('contain', 'Clicked 2 times');
    });

    it('should verify disabled button cannot be clicked', () => {
      cy.get('[data-testid="disabled-button"]')
        .should('be.disabled')
        .should('have.attr', 'disabled');
    });
  });

  describe('Modal Dialogs', () => {
    it('should open and close dialog', () => {
      // Dialog should not be visible initially
      cy.get('[data-testid="dialog-content"]').should('not.exist');

      // Open dialog
      cy.get('[data-testid="open-dialog"]').click();
      cy.get('[data-testid="dialog-content"]').should('be.visible');

      // Verify dialog content
      cy.contains('Dialog Title').should('be.visible');
      cy.contains('This is a dialog for testing purposes').should('be.visible');
    });

    it('should handle alert dialog confirmation', () => {
      // Open alert dialog
      cy.get('[data-testid="open-alert"]').click();
      cy.get('[data-testid="alert-content"]').should('be.visible');

      // Verify alert content
      cy.contains('Are you sure?').should('be.visible');

      // Click confirm
      cy.get('[data-testid="alert-confirm"]').click();
      cy.contains('Action confirmed!').should('be.visible');
    });

    it('should handle alert dialog cancellation', () => {
      cy.get('[data-testid="open-alert"]').click();
      cy.get('[data-testid="alert-content"]').should('be.visible');

      // Click cancel
      cy.get('[data-testid="alert-cancel"]').click();
      cy.get('[data-testid="alert-content"]').should('not.exist');
    });
  });

  describe('Tooltips and Dropdowns', () => {
    it('should display tooltip on hover', () => {
      cy.get('[data-testid="tooltip-trigger"]').trigger('mouseenter');
      cy.get('[data-testid="tooltip-content"]').should('be.visible');
      cy.contains('This is a tooltip message').should('be.visible');
    });

    it('should open dropdown and select item', () => {
      // Open dropdown
      cy.get('[data-testid="dropdown-trigger"]').click();
      cy.get('[data-testid="dropdown-content"]').should('be.visible');

      // Verify options are visible
      cy.get('[data-testid="dropdown-item-1"]').should('be.visible');
      cy.get('[data-testid="dropdown-item-2"]').should('be.visible');
      cy.get('[data-testid="dropdown-item-3"]').should('be.visible');

      // Select an option
      cy.get('[data-testid="dropdown-item-2"]').click();
    });
  });

  describe('Hover Effects', () => {
    it('should detect hover state changes', () => {
      cy.get('[data-testid="hover-area"]').should('contain', 'Hover over me');

      // Trigger hover
      cy.get('[data-testid="hover-area"]').trigger('mouseenter');
      cy.get('[data-testid="hover-area"]').should('contain', 'Hovering!');

      // Trigger mouse leave
      cy.get('[data-testid="hover-area"]').trigger('mouseleave');
      cy.get('[data-testid="hover-area"]').should('contain', 'Hover over me');
    });
  });

  describe('Visibility Toggle', () => {
    it('should toggle element visibility', () => {
      // Element should be visible initially
      cy.get('[data-testid="visible-element-1"]').should('be.visible');

      // Toggle off
      cy.get('[data-testid="toggle-button-1"]').click();
      cy.get('[data-testid="visible-element-1"]').should('not.exist');

      // Toggle on
      cy.get('[data-testid="toggle-button-1"]').click();
      cy.get('[data-testid="visible-element-1"]').should('be.visible');
    });

    it('should handle multiple toggle elements independently', () => {
      cy.get('[data-testid="toggle-button-1"]').click();
      cy.get('[data-testid="visible-element-1"]').should('not.exist');
      cy.get('[data-testid="visible-element-2"]').should('be.visible');
      cy.get('[data-testid="visible-element-3"]').should('be.visible');
    });
  });

  describe('Toast Notifications', () => {
    it('should display success toast', () => {
      cy.get('[data-testid="toast-success"]').click();
      cy.contains('Success!').should('be.visible');
      cy.contains('Operation completed successfully').should('be.visible');
    });

    it('should display error toast', () => {
      cy.get('[data-testid="toast-error"]').click();
      cy.contains('Error!').should('be.visible');
      cy.contains('Something went wrong').should('be.visible');
    });

    it('should display info toast', () => {
      cy.get('[data-testid="toast-info"]').click();
      cy.contains('Info').should('be.visible');
      cy.contains("Here's some information").should('be.visible');
    });
  });

  describe('Complex Interaction Flow', () => {
    it('should handle multiple interactions in sequence', () => {
      // Click counter multiple times
      cy.get('[data-testid="counter-button"]').click().click().click();
      cy.get('[data-testid="counter-button"]').should('contain', '3 times');

      // Open and confirm alert
      cy.get('[data-testid="open-alert"]').click();
      cy.get('[data-testid="alert-confirm"]').click();

      // Toggle visibility
      cy.get('[data-testid="toggle-button-2"]').click();
      cy.get('[data-testid="visible-element-2"]').should('not.exist');

      // Show toast
      cy.get('[data-testid="toast-success"]').click();
      cy.contains('Success!').should('be.visible');
    });
  });
});
