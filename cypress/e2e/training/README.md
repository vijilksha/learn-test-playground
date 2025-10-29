# Cypress Training Examples - Simple JavaScript Programs

## Overview
This folder contains simple, focused JavaScript examples demonstrating each Cypress concept separately. Perfect for Selenium engineers transitioning to Cypress.

## Training Files (In Order)

### 1. Basic POM - `01-basic-pom.cy.js`
Simple Page Object Model returning cy.get() methods
- Basic page object structure
- Element locators
- Simple test examples

### 2. Advanced POM - `02-advanced-pom.cy.js`
Advanced POM with getters, actions, and assertions
- JavaScript getters (no parentheses)
- Method chaining with 'return this'
- Organized structure (locators, actions, assertions)

### 3. Fixtures - `03-fixtures.cy.js`
Managing test data with JSON fixtures
- Three ways to load fixtures
- Working with multiple fixtures
- Accessing fixture data in tests

### 4. Custom Commands - `04-custom-commands.cy.js`
Creating reusable custom commands
- Defining commands in commands.js
- Using custom commands in tests
- Types of custom commands

### 5. Integration - `05-integration.cy.js`
Combining POM + Fixtures + Custom Commands
- Real-world test examples
- Complete workflows
- All patterns working together

### 6. BasePage Pattern - `06-basepage-pattern.cy.js`
Inheritance pattern for reusable methods
- BasePage class with common methods
- Child pages extending BasePage
- DRY principle in action

### 7. Cypress vs Selenium - `07-cypress-vs-selenium.cy.js`
Key differences between Cypress and Selenium
- Why const a = cy.get() doesn't work
- Proper .then() usage
- Automatic waiting
- Command chaining

## Quick Start

```bash
# Run all training tests
npx cypress run --spec "cypress/e2e/training/**/*"

# Run specific test
npx cypress run --spec "cypress/e2e/training/01-basic-pom.cy.js"

# Open Cypress UI
npx cypress open
```

## Learning Path
Start with file 01, then proceed through 02-07 in order. Each file builds on previous concepts.

## Additional Resources
- Original TypeScript examples: `cypress/e2e/training/loginTest.cy.ts`
- Comprehensive guide: `CYPRESS_TRAINING_GUIDE.md`
- Cypress docs: https://docs.cypress.io

Happy Learning! 🚀
