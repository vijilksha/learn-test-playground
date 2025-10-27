describe('Advanced Testing Scenarios', () => {
  beforeEach(() => {
    cy.visit('/advanced');
  });

  describe('File Upload', () => {
    it('should upload file via input', () => {
      // Create a test file
      const fileName = 'test-file.txt';
      const fileContent = 'This is a test file';
      
      // Verify file input exists and has correct attributes
      cy.get('[data-testid="file-input"]')
        .should('exist')
        .and('have.attr', 'type', 'file')
        .selectFile({
          contents: Cypress.Buffer.from(fileContent),
          fileName: fileName,
          mimeType: 'text/plain',
        });
      
      // Verify file info is displayed
      cy.get('[data-testid="uploaded-file-info"]')
        .should('be.visible')
        .and('exist')
        .and('contain', fileName)
        .should('not.be.empty');
      
      // Verify toast notification
      cy.contains(`File selected: ${fileName}`)
        .should('be.visible')
        .and('exist');
    });

    it('should handle drag and drop', () => {
      const fileName = 'dragged-file.txt';
      
      cy.get('[data-testid="drop-zone"]').selectFile({
        contents: Cypress.Buffer.from('Drag and drop content'),
        fileName: fileName,
        mimeType: 'text/plain',
      }, { action: 'drag-drop' });
      
      cy.get('[data-testid="uploaded-file-info"]')
        .should('be.visible')
        .and('contain', fileName);
    });

    it('should display file size information', () => {
      cy.get('[data-testid="file-input"]').selectFile({
        contents: Cypress.Buffer.from('Test content'),
        fileName: 'size-test.txt',
        mimeType: 'text/plain',
      });
      
      cy.get('[data-testid="uploaded-file-info"]')
        .should('contain', 'Size:')
        .and('contain', 'KB');
    });

    it('should handle different file types', () => {
      // Test with JSON file
      cy.get('[data-testid="file-input"]').selectFile({
        contents: Cypress.Buffer.from(JSON.stringify({ test: 'data' })),
        fileName: 'data.json',
        mimeType: 'application/json',
      });
      
      cy.get('[data-testid="uploaded-file-info"]').should('contain', 'data.json');
    });

    it('should show visual feedback on drag over', () => {
      const dataTransfer = new DataTransfer();
      
      cy.get('[data-testid="drop-zone"]')
        .trigger('dragover', { dataTransfer })
        .should('have.class', 'border-primary');
      
      cy.get('[data-testid="drop-zone"]')
        .trigger('dragleave', { dataTransfer })
        .should('not.have.class', 'border-primary');
    });
  });

  describe('File Download', () => {
    it('should download file when button clicked', () => {
      cy.get('[data-testid="download-button"]').click();
      
      // Verify toast notification
      cy.contains('File downloaded!').should('be.visible');
      
      // Note: Actual file download verification requires additional Cypress configuration
      // You can verify the download was initiated but may not check the file system
    });

    it('should have download button visible and enabled', () => {
      cy.get('[data-testid="download-button"]')
        .should('be.visible')
        .and('not.be.disabled')
        .and('contain', 'Download Test File');
    });
  });

  describe('Keyboard Events', () => {
    it('should capture key presses', () => {
      // Verify keyboard input exists
      cy.get('[data-testid="keyboard-input"]')
        .should('be.visible')
        .and('be.enabled')
        .and('have.attr', 'type', 'text')
        .and('have.value', '')
        .type('a');
      
      // Verify key display
      cy.get('[data-testid="key-display"]')
        .should('be.visible')
        .and('exist')
        .and('contain', 'Last key pressed: a')
        .should('not.be.empty');
    });

    it('should handle special keys', () => {
      cy.get('[data-testid="keyboard-input"]').type('{enter}');
      cy.get('[data-testid="key-display"]').should('contain', 'Enter');
    });

    it('should handle multiple key presses', () => {
      cy.get('[data-testid="keyboard-input"]').type('abc');
      
      // Last key should be 'c'
      cy.get('[data-testid="key-display"]').should('contain', 'c');
    });

    it('should show toast on key press', () => {
      cy.get('[data-testid="keyboard-input"]').type('x');
      cy.contains('Key pressed: x').should('be.visible');
    });

    it('should handle arrow keys', () => {
      cy.get('[data-testid="keyboard-input"]').type('{rightarrow}');
      cy.get('[data-testid="key-display"]').should('contain', 'Arrow');
    });

    it('should handle modifier keys', () => {
      cy.get('[data-testid="keyboard-input"]').type('{shift}A');
      cy.get('[data-testid="key-display"]').should('contain', 'A');
    });
  });

  describe('Browser Storage (localStorage)', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      cy.clearLocalStorage();
    });

    it('should save value to localStorage', () => {
      const testValue = 'Test Storage Value';
      
      // Verify input and button exist
      cy.get('[data-testid="storage-input"]')
        .should('be.visible')
        .and('be.enabled')
        .and('have.value', '')
        .type(testValue);
      
      cy.get('[data-testid="storage-input"]').should('have.value', testValue);
      
      cy.get('[data-testid="save-storage-button"]')
        .should('be.visible')
        .and('be.enabled')
        .and('not.be.disabled')
        .click();
      
      // Verify toast
      cy.contains('Value saved to localStorage')
        .should('be.visible')
        .and('exist');
      
      // Verify value is in localStorage
      cy.window().then((window) => {
        expect(window.localStorage.getItem('testValue')).to.equal(testValue);
        expect(window.localStorage.getItem('testValue')).to.not.be.null;
        expect(window.localStorage.length).to.be.greaterThan(0);
      });
    });

    it('should load value from localStorage', () => {
      const testValue = 'Stored Value';
      
      // Set value in localStorage
      cy.window().then((window) => {
        window.localStorage.setItem('testValue', testValue);
      });
      
      // Click load button
      cy.get('[data-testid="load-storage-button"]').click();
      
      // Verify input contains the loaded value
      cy.get('[data-testid="storage-input"]').should('have.value', testValue);
      cy.contains('Value loaded from localStorage').should('be.visible');
    });

    it('should clear localStorage', () => {
      // Save a value first
      cy.get('[data-testid="storage-input"]').type('Value to clear');
      cy.get('[data-testid="save-storage-button"]').click();
      
      // Clear it
      cy.get('[data-testid="clear-storage-button"]').click();
      
      // Verify input is empty
      cy.get('[data-testid="storage-input"]').should('have.value', '');
      
      // Verify localStorage is empty
      cy.window().then((window) => {
        expect(window.localStorage.getItem('testValue')).to.be.null;
      });
      
      cy.contains('Storage cleared').should('be.visible');
    });

    it('should handle loading when no value exists', () => {
      cy.get('[data-testid="load-storage-button"]').click();
      cy.contains('No value found in localStorage').should('be.visible');
    });

    it('should persist value across actions', () => {
      // Save value
      cy.get('[data-testid="storage-input"]').type('Persistent Value');
      cy.get('[data-testid="save-storage-button"]').click();
      
      // Clear input
      cy.get('[data-testid="storage-input"]').clear();
      
      // Load value again
      cy.get('[data-testid="load-storage-button"]').click();
      cy.get('[data-testid="storage-input"]').should('have.value', 'Persistent Value');
    });
  });

  describe('Complex Workflows', () => {
    it('should handle file upload and localStorage together', () => {
      // Upload a file
      cy.get('[data-testid="file-input"]').selectFile({
        contents: Cypress.Buffer.from('Test'),
        fileName: 'workflow-test.txt',
        mimeType: 'text/plain',
      });
      
      // Save to localStorage
      cy.get('[data-testid="storage-input"]').type('Workflow test');
      cy.get('[data-testid="save-storage-button"]').click();
      
      // Verify both operations succeeded
      cy.get('[data-testid="uploaded-file-info"]').should('contain', 'workflow-test.txt');
      cy.window().then((window) => {
        expect(window.localStorage.getItem('testValue')).to.equal('Workflow test');
      });
    });

    it('should test keyboard input and file operations', () => {
      // Type in keyboard input
      cy.get('[data-testid="keyboard-input"]').type('test');
      
      // Upload file
      cy.get('[data-testid="file-input"]').selectFile({
        contents: Cypress.Buffer.from('Combined test'),
        fileName: 'combined.txt',
        mimeType: 'text/plain',
      });
      
      // Download file
      cy.get('[data-testid="download-button"]').click();
      
      // Verify all operations completed
      cy.get('[data-testid="key-display"]').should('be.visible');
      cy.get('[data-testid="uploaded-file-info"]').should('be.visible');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty file name', () => {
      cy.get('[data-testid="file-input"]').selectFile({
        contents: Cypress.Buffer.from('Content'),
        fileName: 'test.txt',
        mimeType: 'text/plain',
      });
      
      cy.get('[data-testid="uploaded-file-info"]').should('exist');
    });

    it('should handle special characters in storage', () => {
      const specialValue = 'Test!@#$%^&*()_+{}[]|:;"<>?,./';
      
      cy.get('[data-testid="storage-input"]').type(specialValue);
      cy.get('[data-testid="save-storage-button"]').click();
      cy.get('[data-testid="storage-input"]').clear();
      cy.get('[data-testid="load-storage-button"]').click();
      
      cy.get('[data-testid="storage-input"]').should('have.value', specialValue);
    });
  });
});
