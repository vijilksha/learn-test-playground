describe('Interactive Elements Testing', () => {
  beforeEach(() => {
    cy.visit('/interactions');
  });

  describe('Button Clicks', () => {
    it('should handle single click', () => {
      cy.get('[data-testid="single-click-button"]')
        .should('be.visible')
        .and('be.enabled')
        .and('have.attr', 'type', 'button')
        .and('contain.text', 'Click Me')
        .click();
      cy.contains('Button clicked!')
        .should('be.visible')
        .and('exist');
    });

    it('should handle double click', () => {
      cy.get('[data-testid="double-click-button"]')
        .should('be.visible')
        .and('be.enabled')
        .and('exist')
        .dblclick();
      cy.contains('Button double-clicked!')
        .should('be.visible')
        .and('exist');
    });

    it('should increment counter on each click', () => {
      cy.get('[data-testid="counter-button"]')
        .should('be.visible')
        .and('be.enabled')
        .and('exist')
        .and('contain', 'Clicked 0 times');
      
      cy.get('[data-testid="counter-button"]').click();
      cy.get('[data-testid="counter-button"]')
        .should('contain', 'Clicked 1 times')
        .and('not.contain', 'Clicked 0 times');
      
      cy.get('[data-testid="counter-button"]').click();
      cy.get('[data-testid="counter-button"]')
        .should('contain', 'Clicked 2 times')
        .and('not.contain', 'Clicked 1 times');
    });

    it('should verify disabled button cannot be clicked', () => {
      cy.get('[data-testid="disabled-button"]')
        .should('be.disabled')
        .and('have.attr', 'disabled')
        .and('be.visible')
        .and('have.prop', 'disabled', true)
        .should('have.css', 'pointer-events', 'none');
    });
  });

  describe('Modal Dialogs', () => {
    it('should open and close dialog', () => {
      // Dialog should not be visible initially
      cy.get('[data-testid="dialog-content"]').should('not.exist');

      // Verify open button
      cy.get('[data-testid="open-dialog"]')
        .should('be.visible')
        .and('be.enabled')
        .and('exist');

      // Open dialog
      cy.get('[data-testid="open-dialog"]').click();
      cy.get('[data-testid="dialog-content"]')
        .should('be.visible')
        .and('exist')
        .should('have.attr', 'role', 'dialog');

      // Verify dialog content
      cy.contains('Dialog Title')
        .should('be.visible')
        .and('exist');
      cy.contains('This is a dialog for testing purposes')
        .should('be.visible')
        .and('exist');
      
      // Verify dialog has proper ARIA attributes
      cy.get('[data-testid="dialog-content"]')
        .should('have.attr', 'role', 'dialog')
        .and('have.attr', 'aria-modal', 'true');
    });

    it('should handle alert dialog confirmation', () => {
      // Open alert dialog
      cy.get('[data-testid="open-alert"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      cy.get('[data-testid="alert-content"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'role');

      // Verify alert content
      cy.contains('Are you sure?')
        .should('be.visible')
        .and('exist');

      // Click confirm
      cy.get('[data-testid="alert-confirm"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      cy.contains('Action confirmed!')
        .should('be.visible')
        .and('exist');
    });

    it('should handle alert dialog cancellation', () => {
      cy.get('[data-testid="open-alert"]')
        .should('be.visible')
        .click();
      cy.get('[data-testid="alert-content"]')
        .should('be.visible')
        .and('exist');

      // Click cancel
      cy.get('[data-testid="alert-cancel"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      cy.get('[data-testid="alert-content"]').should('not.exist');
      
      // Verify dialog is closed
      cy.get('body').should('not.contain', 'Are you sure?');
    });
  });

  describe('Tooltips and Dropdowns', () => {
    it('should display tooltip on hover', () => {
      cy.get('[data-testid="tooltip-trigger"]')
        .should('be.visible')
        .and('exist')
        .trigger('mouseenter');
      cy.get('[data-testid="tooltip-content"]')
        .should('be.visible')
        .and('exist')
        .and('have.attr', 'role', 'tooltip');
      cy.contains('This is a tooltip message')
        .should('be.visible')
        .and('exist');
    });

    it('should open dropdown and select item', () => {
      // Open dropdown
      cy.get('[data-testid="dropdown-trigger"]')
        .should('be.visible')
        .and('be.enabled')
        .and('exist')
        .click();
      cy.get('[data-testid="dropdown-content"]')
        .should('be.visible')
        .and('exist');

      // Verify options are visible and count
      cy.get('[data-testid="dropdown-item-1"]')
        .should('be.visible')
        .and('exist');
      cy.get('[data-testid="dropdown-item-2"]')
        .should('be.visible')
        .and('exist');
      cy.get('[data-testid="dropdown-item-3"]')
        .should('be.visible')
        .and('exist');
      
      // Verify all items exist
      cy.get('[data-testid^="dropdown-item-"]').should('have.length', 3);

      // Select an option
      cy.get('[data-testid="dropdown-item-2"]')
        .should('be.visible')
        .click();
    });
  });

  describe('Hover Effects', () => {
    it('should detect hover state changes', () => {
      cy.get('[data-testid="hover-area"]')
        .should('be.visible')
        .and('exist')
        .and('contain', 'Hover over me')
        .and('not.contain', 'Hovering!');

      // Trigger hover
      cy.get('[data-testid="hover-area"]').trigger('mouseenter');
      cy.get('[data-testid="hover-area"]')
        .should('contain', 'Hovering!')
        .and('not.contain', 'Hover over me')
        .and('be.visible');

      // Trigger mouse leave
      cy.get('[data-testid="hover-area"]').trigger('mouseleave');
      cy.get('[data-testid="hover-area"]')
        .should('contain', 'Hover over me')
        .and('not.contain', 'Hovering!');
    });
  });

  describe('Visibility Toggle', () => {
    it('should toggle element visibility', () => {
      // Element should be visible initially
      cy.get('[data-testid="visible-element-1"]')
        .should('be.visible')
        .and('exist');

      // Verify toggle button
      cy.get('[data-testid="toggle-button-1"]')
        .should('be.visible')
        .and('be.enabled');

      // Toggle off
      cy.get('[data-testid="toggle-button-1"]').click();
      cy.get('[data-testid="visible-element-1"]')
        .should('not.exist')
        .should('not.be.visible');

      // Toggle on
      cy.get('[data-testid="toggle-button-1"]').click();
      cy.get('[data-testid="visible-element-1"]')
        .should('be.visible')
        .and('exist');
    });

    it('should handle multiple toggle elements independently', () => {
      // Verify all elements visible initially
      cy.get('[data-testid="visible-element-1"]').should('be.visible');
      cy.get('[data-testid="visible-element-2"]').should('be.visible');
      cy.get('[data-testid="visible-element-3"]').should('be.visible');
      
      // Toggle first element
      cy.get('[data-testid="toggle-button-1"]').click();
      
      // Verify correct elements visibility
      cy.get('[data-testid="visible-element-1"]').should('not.exist');
      cy.get('[data-testid="visible-element-2"]')
        .should('be.visible')
        .and('exist');
      cy.get('[data-testid="visible-element-3"]')
        .should('be.visible')
        .and('exist');
    });
  });

  describe('Toast Notifications', () => {
    it('should display success toast', () => {
      cy.get('[data-testid="toast-success"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      cy.contains('Success!')
        .should('be.visible')
        .and('exist');
      cy.contains('Operation completed successfully')
        .should('be.visible')
        .and('exist');
      
      // Verify toast has proper role
      cy.get('[role="status"]').should('exist');
    });

    it('should display error toast', () => {
      cy.get('[data-testid="toast-error"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      cy.contains('Error!')
        .should('be.visible')
        .and('exist');
      cy.contains('Something went wrong')
        .should('be.visible')
        .and('exist');
    });

    it('should display info toast', () => {
      cy.get('[data-testid="toast-info"]')
        .should('be.visible')
        .and('be.enabled')
        .click();
      cy.contains('Info')
        .should('be.visible')
        .and('exist');
      cy.contains("Here's some information")
        .should('be.visible')
        .and('exist');
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
