# Training Test Examples

This folder contains comprehensive training examples demonstrating Cypress best practices for Selenium engineers transitioning to Cypress.

## 📁 Files in this Directory

### `loginTest.cy.ts`
Complete integration test demonstrating:
- **Page Object Model (POM)**: Using LoginPage and DashboardPage objects
- **Fixtures**: Loading test data from users.json and testData.json
- **Custom Commands**: Using cy.loginAsValidUser(), cy.loginAsAdmin(), etc.
- **Method Chaining**: Fluent interface pattern for readable tests
- **Proper Assertions**: Multiple assertion types and validation strategies
- **Test Organization**: Well-structured test suites with clear descriptions
- **Edge Cases**: Handling special scenarios and error conditions

## 🎯 Learning Objectives

### For Selenium Engineers

This training suite will teach you:

1. **How Cypress differs from Selenium**
   - Automatic waiting vs explicit waits
   - Chainable commands vs WebElement objects
   - Promise-based architecture
   - Built-in retry logic

2. **Page Object Model in Cypress**
   - Using getters for element locators
   - Creating action methods
   - Building assertion methods
   - Method chaining for fluent APIs
   - Inheriting from BasePage

3. **Test Data Management**
   - Using fixtures for test data
   - Loading data in before() hooks
   - Accessing fixture data with aliases
   - Organizing test data in JSON files

4. **Custom Commands**
   - Creating reusable commands
   - Extending Cypress functionality
   - TypeScript declarations
   - Command best practices

5. **Test Organization**
   - Structuring test suites
   - Setup and teardown
   - Test isolation
   - Naming conventions

## 🏃‍♂️ Running the Training Tests

### Run all training tests:
```bash
npx cypress run --spec "cypress/e2e/training/**/*.cy.ts"
```

### Run specific test file:
```bash
npx cypress run --spec "cypress/e2e/training/loginTest.cy.ts"
```

### Open in Cypress UI:
```bash
npx cypress open
```
Then select the test file from the training folder.

## 📚 Key Concepts Demonstrated

### 1. Page Object Model Pattern

**Example from LoginPage.ts:**
```typescript
class LoginPage extends BasePage {
  // Getters for elements
  get usernameInput() {
    return cy.get('[data-testid="username-input"]');
  }
  
  // Actions
  enterUsername(username: string) {
    this.usernameInput.clear().type(username);
    return this; // Enable method chaining
  }
  
  // Assertions
  verifyLoginButtonEnabled() {
    this.loginButton.should('be.enabled');
    return this;
  }
}
```

**Usage in test:**
```typescript
loginPage
  .enterUsername(user.username)
  .enterPassword(user.password)
  .verifyLoginButtonEnabled()
  .clickLoginButton();
```

### 2. Fixtures for Test Data

**users.json:**
```json
{
  "validUser": {
    "username": "john.doe@example.com",
    "password": "SecurePass123!"
  }
}
```

**Loading in test:**
```typescript
let users;

before(() => {
  cy.fixture('users').then((data) => {
    users = data;
  });
});

it('should login', () => {
  loginPage.login(users.validUser.username, users.validUser.password);
});
```

### 3. Custom Commands

**Definition in commands.ts:**
```typescript
Cypress.Commands.add('loginAsValidUser', () => {
  cy.fixture('users').then((users) => {
    cy.login(users.validUser.username, users.validUser.password);
  });
});
```

**Usage in test:**
```typescript
cy.loginAsValidUser();
dashboardPage.verifyOnDashboard();
```

### 4. Method Chaining

```typescript
// Fluent interface pattern
loginPage
  .visitLoginPage()
  .verifyOnLoginPage()
  .enterUsername('user@example.com')
  .enterPassword('password123')
  .verifyLoginButtonEnabled()
  .clickLoginButton();

dashboardPage
  .verifyOnDashboard()
  .verifyWelcomeMessage('John');
```

## 🔍 Test Coverage

The training tests cover:

### ✅ Positive Scenarios
- Valid login with correct credentials
- Login using custom commands
- Login with remember me
- Admin user login
- Session persistence

### ❌ Negative Scenarios
- Invalid credentials
- Empty username/password
- Invalid email format
- Disabled login button
- Inactive user accounts

### 🔧 Form Validation
- Element presence verification
- Input field attributes
- Form submission via Enter key
- Field clearing functionality

### 👥 Multiple Users
- Iteration through user arrays
- Active vs inactive users
- Different user roles

### 🔐 Session Management
- Session persistence across pages
- Logout functionality
- Concurrent sessions
- Token management

### 🌟 Edge Cases
- Special characters in passwords
- Unicode characters
- Whitespace handling
- Slow network conditions
- API error handling

## 📖 Comparison with Selenium

### Selenium (Java) Example:
```java
WebDriver driver = new ChromeDriver();
WebDriverWait wait = new WebDriverWait(driver, 10);

WebElement username = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("username"))
);
username.sendKeys("user@example.com");

WebElement password = driver.findElement(By.id("password"));
password.sendKeys("password123");

WebElement loginBtn = driver.findElement(By.id("login"));
loginBtn.click();

wait.until(ExpectedConditions.urlContains("/dashboard"));
```

### Cypress (TypeScript) Equivalent:
```typescript
loginPage
  .enterUsername('user@example.com')
  .enterPassword('password123')
  .clickLoginButton();

dashboardPage.verifyOnDashboard();
```

**Key Differences:**
- ✅ No explicit waits needed
- ✅ Automatic retry logic
- ✅ Cleaner, more readable code
- ✅ Built-in assertions
- ✅ Method chaining support

## 🎓 Next Steps

After completing these training tests:

1. **Practice**: Create your own page objects
2. **Experiment**: Try different assertion methods
3. **Customize**: Add more custom commands
4. **Extend**: Build on the BasePage class
5. **Refactor**: Improve test organization

## 📚 Additional Resources

- [Main Training Guide](../../../CYPRESS_TRAINING_GUIDE.md)
- [Cypress Documentation](https://docs.cypress.io)
- [Page Object Model Best Practices](https://docs.cypress.io/guides/references/best-practices#Creating-tiny-tests-with-a-single-assertion)
- [Custom Commands Guide](https://docs.cypress.io/api/cypress-api/custom-commands)

## 💡 Tips for Success

1. **Start Small**: Begin with simple tests and gradually add complexity
2. **Use Data-Testid**: Always prefer data-testid selectors
3. **Avoid Hardcoded Waits**: Let Cypress handle waiting automatically
4. **Chain Commands**: Use method chaining for cleaner tests
5. **Organize Data**: Keep test data in fixtures
6. **Reuse Code**: Create custom commands for common operations
7. **Think Asynchronously**: Embrace Cypress's promise-based architecture

---

**Happy Learning! 🚀**
