describe('Forms Testing', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  describe('Basic Form', () => {
    it('should fill out and submit the basic form', () => {
      // Type into input fields
      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="email-input"]').type('john@example.com');
      cy.get('[data-testid="password-input"]').type('SecurePassword123');

      // Verify input values
      cy.get('[data-testid="name-input"]').should('have.value', 'John Doe');
      cy.get('[data-testid="email-input"]').should('have.value', 'john@example.com');
      cy.get('[data-testid="password-input"]').should('have.value', 'SecurePassword123');

      // Submit form
      cy.get('[data-testid="submit-button"]').click();

      // Verify success toast appears
      cy.contains('Form submitted successfully!').should('be.visible');
    });

    it('should handle password field as masked input', () => {
      cy.get('[data-testid="password-input"]')
        .type('MyPassword')
        .should('have.attr', 'type', 'password');
    });

    it('should clear input fields', () => {
      cy.get('[data-testid="name-input"]')
        .type('Test User')
        .clear()
        .should('have.value', '');
    });
  });

  describe('Select and Textarea', () => {
    it('should select a country from dropdown', () => {
      // Open select dropdown
      cy.get('[data-testid="country-select"]').click();

      // Select an option
      cy.contains('United States').click();

      // Verify selection
      cy.get('[data-testid="country-select"]').should('contain', 'United States');
    });

    it('should type in textarea', () => {
      const bioText = 'I am a software tester with 5 years of experience in test automation.';
      
      cy.get('[data-testid="bio-textarea"]')
        .type(bioText)
        .should('have.value', bioText);
    });

    it('should handle multi-line text in textarea', () => {
      cy.get('[data-testid="bio-textarea"]')
        .type('Line 1{enter}Line 2{enter}Line 3')
        .should('contain.value', 'Line 1\nLine 2\nLine 3');
    });
  });

  describe('Checkboxes', () => {
    it('should check and uncheck the terms checkbox', () => {
      // Initially unchecked
      cy.get('[data-testid="terms-checkbox"]').should('not.be.checked');

      // Check it
      cy.get('[data-testid="terms-checkbox"]').check();
      cy.get('[data-testid="terms-checkbox"]').should('be.checked');

      // Uncheck it
      cy.get('[data-testid="terms-checkbox"]').uncheck();
      cy.get('[data-testid="terms-checkbox"]').should('not.be.checked');
    });

    it('should handle multiple checkbox selections', () => {
      // Check multiple interests
      cy.get('[data-testid="interest-tech"]').check();
      cy.get('[data-testid="interest-sports"]').check();
      cy.get('[data-testid="interest-music"]').check();

      // Verify all are checked
      cy.get('[data-testid="interest-tech"]').should('be.checked');
      cy.get('[data-testid="interest-sports"]').should('be.checked');
      cy.get('[data-testid="interest-music"]').should('be.checked');

      // Uncheck one
      cy.get('[data-testid="interest-sports"]').uncheck();
      cy.get('[data-testid="interest-sports"]').should('not.be.checked');
    });
  });

  describe('Radio Buttons', () => {
    it('should select a radio button option', () => {
      // Select email notification
      cy.get('[data-testid="radio-email"]').check();
      cy.get('[data-testid="radio-email"]').should('be.checked');
    });

    it('should change radio button selection', () => {
      // Select email first
      cy.get('[data-testid="radio-email"]').check();
      
      // Change to SMS
      cy.get('[data-testid="radio-sms"]').check();
      cy.get('[data-testid="radio-sms"]').should('be.checked');
      cy.get('[data-testid="radio-email"]').should('not.be.checked');
    });

    it('should verify only one radio button is selected at a time', () => {
      cy.get('[data-testid="radio-push"]').check();
      cy.get('[data-testid="radio-push"]').should('be.checked');

      cy.get('[data-testid="radio-none"]').check();
      cy.get('[data-testid="radio-none"]').should('be.checked');
      cy.get('[data-testid="radio-push"]').should('not.be.checked');
    });
  });

  describe('Form Integration Test', () => {
    it('should complete entire form workflow', () => {
      // Fill basic form
      cy.get('[data-testid="name-input"]').type('Alice Johnson');
      cy.get('[data-testid="email-input"]').type('alice@test.com');
      cy.get('[data-testid="password-input"]').type('TestPass123');

      // Select country
      cy.get('[data-testid="country-select"]').click();
      cy.contains('Canada').click();

      // Fill bio
      cy.get('[data-testid="bio-textarea"]').type('QA Engineer specializing in automation');

      // Check terms
      cy.get('[data-testid="terms-checkbox"]').check();

      // Select interests
      cy.get('[data-testid="interest-tech"]').check();

      // Select notification preference
      cy.get('[data-testid="radio-email"]').check();

      // Submit form
      cy.get('[data-testid="submit-button"]').click();

      // Verify success
      cy.contains('Welcome, Alice Johnson!').should('be.visible');
    });
  });
});
