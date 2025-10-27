# Cypress Tests for Testing Playground

This directory contains comprehensive Cypress E2E tests for all testing scenarios in the Testing Playground application.

## Test Files

### 1. `forms.cy.ts`
Tests form interactions including:
- Text inputs (name, email, password)
- Select dropdowns
- Textareas
- Checkboxes (single and multiple)
- Radio buttons
- Form submission
- Form validation

**Key Concepts Covered:**
- `.type()` - Typing into inputs
- `.check()` / `.uncheck()` - Checkbox interactions
- `.select()` - Dropdown selections
- `.click()` - Form submission
- `.should()` - Assertions on form values

### 2. `interactions.cy.ts`
Tests UI interactions including:
- Single and double clicks
- Button states (disabled, enabled)
- Modal dialogs
- Alert dialogs
- Tooltips
- Dropdown menus
- Hover effects
- Visibility toggles
- Toast notifications

**Key Concepts Covered:**
- `.click()` / `.dblclick()` - Click interactions
- `.trigger()` - Custom events (hover)
- `.should('be.visible')` - Visibility assertions
- `.should('be.disabled')` - State assertions
- Working with modals and overlays

### 3. `dynamic.cy.ts`
Tests dynamic content and async behavior:
- Loading states and skeletons
- Real-time updates (timers, progress bars)
- Delayed content appearance
- Conditional rendering
- Waiting strategies

**Key Concepts Covered:**
- `cy.wait()` - Explicit waits
- `{ timeout: X }` - Custom timeouts
- `.should()` with retries
- Testing loading indicators
- Handling async operations

### 4. `tables.cy.ts`
Tests table operations:
- Table data display
- Search/filtering
- Sorting (ascending/descending)
- Pagination
- Row actions
- Status indicators
- Combined search and sort

**Key Concepts Covered:**
- `.find()` - Finding elements within tables
- `.each()` - Iterating over table rows
- `.invoke('text')` - Extracting text content
- Complex assertions on arrays
- Testing data transformations

### 5. `api.cy.ts`
Tests API-related scenarios:
- Successful API calls
- Error handling
- Slow/delayed responses
- Loading states
- Network status
- Multiple concurrent requests
- Error recovery

**Key Concepts Covered:**
- Testing loading indicators
- Timeout handling
- Error state verification
- JSON parsing and validation
- Button state changes during requests

### 6. `advanced.cy.ts`
Tests advanced scenarios:
- File upload (input and drag-drop)
- File download
- Keyboard events
- LocalStorage operations
- Complex workflows
- Edge cases

**Key Concepts Covered:**
- `.selectFile()` - File uploads
- Drag and drop testing
- `.type()` with special keys
- `cy.window()` - Accessing browser APIs
- `cy.clearLocalStorage()` - Storage management
- Testing browser storage

### 7. `navigation.cy.ts`
Tests navigation and routing:
- Menu navigation
- Active states
- Mobile responsive navigation
- Browser back/forward
- Direct URL access
- 404 handling

**Key Concepts Covered:**
- `.visit()` - Navigation
- `cy.url()` - URL assertions
- `cy.go()` - Browser history
- Viewport testing
- Mobile responsive testing

## Running Tests

### Prerequisites
Install Cypress:
```bash
npm install cypress --save-dev
```

### Run All Tests (Headless)
```bash
npx cypress run
```

### Open Cypress Test Runner (Interactive)
```bash
npx cypress open
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/forms.cy.ts"
```

### Run on Different Viewport
```bash
npx cypress run --config viewportWidth=375,viewportHeight=667
```

## Test Structure

Each test file follows this structure:
```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    cy.visit('/page-url');
  });

  describe('Sub-feature', () => {
    it('should do something specific', () => {
      // Test implementation
    });
  });
});
```

## Best Practices Demonstrated

1. **Use data-testid attributes** - All tests use `data-testid` for reliable element selection
2. **Descriptive test names** - Clear "should do X" naming convention
3. **Arrange-Act-Assert** - Tests follow AAA pattern
4. **Appropriate waits** - Use timeouts and retries appropriately
5. **Independent tests** - Each test can run standalone
6. **beforeEach hooks** - Reset state before each test
7. **Grouped tests** - Related tests are grouped in describe blocks

## Common Cypress Commands Used

- `cy.visit()` - Navigate to URL
- `cy.get()` - Select elements
- `cy.contains()` - Find by text content
- `cy.click()` - Click elements
- `cy.type()` - Type into inputs
- `cy.check()` / `cy.uncheck()` - Checkbox interactions
- `cy.select()` - Select from dropdown
- `cy.should()` - Assertions
- `cy.wait()` - Explicit waits
- `cy.trigger()` - Trigger events
- `cy.invoke()` - Call functions on elements
- `cy.window()` - Access window object
- `cy.viewport()` - Set viewport size

## Debugging Tips

1. **Use `.debug()`** - Pause test execution
2. **Use `.pause()`** - Interactive debugging
3. **Screenshots** - Automatically taken on failure
4. **Cypress Test Runner** - Use interactive mode to see tests run
5. **Console logs** - Check browser console in Cypress UI

## Advanced Concepts

### Custom Timeouts
```typescript
cy.get('[data-testid="element"]', { timeout: 10000 })
  .should('be.visible');
```

### Retry-ability
Cypress automatically retries assertions until they pass or timeout:
```typescript
cy.get('[data-testid="loading"]').should('not.exist');
// Will retry until element disappears or times out
```

### Aliases
Save references for later use:
```typescript
cy.get('[data-testid="input"]').as('myInput');
cy.get('@myInput').type('text');
```

## Integration with CI/CD

Add to your CI pipeline:
```yaml
- name: Run Cypress Tests
  run: |
    npm install
    npm run dev &
    npx cypress run
```

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Examples](https://example.cypress.io/)
