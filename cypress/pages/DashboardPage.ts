import BasePage from './BasePage';

/**
 * DashboardPage - Page Object Model for Dashboard Page
 * Demonstrates POM for a more complex page with multiple sections
 */

class DashboardPage extends BasePage {
  // ========================================
  // ELEMENT LOCATORS (Getters)
  // ========================================

  // Header Elements
  get pageTitle() {
    return cy.get('[data-testid="dashboard-title"]');
  }

  get welcomeMessage() {
    return cy.get('[data-testid="welcome-message"]');
  }

  get userProfileButton() {
    return cy.get('[data-testid="user-profile-button"]');
  }

  get logoutButton() {
    return cy.get('[data-testid="logout-button"]');
  }

  get notificationBell() {
    return cy.get('[data-testid="notification-bell"]');
  }

  // Navigation Menu Elements
  get homeMenuItem() {
    return cy.get('[data-testid="menu-home"]');
  }

  get reportsMenuItem() {
    return cy.get('[data-testid="menu-reports"]');
  }

  get settingsMenuItem() {
    return cy.get('[data-testid="menu-settings"]');
  }

  // Dashboard Widgets
  get statsWidget() {
    return cy.get('[data-testid="stats-widget"]');
  }

  get chartWidget() {
    return cy.get('[data-testid="chart-widget"]');
  }

  get recentActivityWidget() {
    return cy.get('[data-testid="recent-activity"]');
  }

  // Search and Filters
  get searchInput() {
    return cy.get('[data-testid="dashboard-search"]');
  }

  get filterDropdown() {
    return cy.get('[data-testid="filter-dropdown"]');
  }

  get dateRangePicker() {
    return cy.get('[data-testid="date-range-picker"]');
  }

  // Content Area
  get contentArea() {
    return cy.get('[data-testid="content-area"]');
  }

  get dataTable() {
    return cy.get('[data-testid="data-table"]');
  }

  get loadingSpinner() {
    return cy.get('[data-testid="loading-spinner"]');
  }

  // ========================================
  // NAVIGATION ACTIONS
  // ========================================

  /**
   * Visit dashboard page
   */
  visitDashboard() {
    this.visit('/dashboard');
    return this;
  }

  /**
   * Navigate to home section
   */
  goToHome() {
    this.homeMenuItem.click();
    return this;
  }

  /**
   * Navigate to reports section
   */
  goToReports() {
    this.reportsMenuItem.click();
    return this;
  }

  /**
   * Navigate to settings section
   */
  goToSettings() {
    this.settingsMenuItem.click();
    return this;
  }

  /**
   * Open user profile
   */
  openUserProfile() {
    this.userProfileButton.click();
    return this;
  }

  /**
   * Click notification bell
   */
  openNotifications() {
    this.notificationBell.click();
    return this;
  }

  /**
   * Logout from dashboard
   */
  logout() {
    this.logoutButton.click();
    return this;
  }

  // ========================================
  // SEARCH AND FILTER ACTIONS
  // ========================================

  /**
   * Search for content
   * @param searchTerm - Term to search for
   */
  searchFor(searchTerm: string) {
    this.searchInput.clear().type(searchTerm).type('{enter}');
    return this;
  }

  /**
   * Clear search
   */
  clearSearch() {
    this.searchInput.clear();
    return this;
  }

  /**
   * Select filter option
   * @param filterValue - Filter value to select
   */
  selectFilter(filterValue: string) {
    this.filterDropdown.select(filterValue);
    return this;
  }

  /**
   * Set date range
   * @param startDate - Start date
   * @param endDate - End date
   */
  setDateRange(startDate: string, endDate: string) {
    this.dateRangePicker.click();
    cy.get('[data-testid="start-date"]').type(startDate);
    cy.get('[data-testid="end-date"]').type(endDate);
    cy.get('[data-testid="apply-date-range"]').click();
    return this;
  }

  // ========================================
  // DATA INTERACTION ACTIONS
  // ========================================

  /**
   * Click on table row by index
   * @param rowIndex - Zero-based row index
   */
  clickTableRow(rowIndex: number) {
    this.dataTable.find('tbody tr').eq(rowIndex).click();
    return this;
  }

  /**
   * Sort table by column
   * @param columnName - Name of column to sort
   */
  sortTableByColumn(columnName: string) {
    cy.contains('th', columnName).click();
    return this;
  }

  /**
   * Get cell value from table
   * @param row - Row index
   * @param column - Column index
   */
  getTableCellValue(row: number, column: number) {
    return this.dataTable
      .find('tbody tr')
      .eq(row)
      .find('td')
      .eq(column)
      .invoke('text');
  }

  // ========================================
  // WIDGET INTERACTION ACTIONS
  // ========================================

  /**
   * Click on stats widget
   */
  clickStatsWidget() {
    this.statsWidget.click();
    return this;
  }

  /**
   * Refresh chart widget
   */
  refreshChart() {
    this.chartWidget.find('[data-testid="refresh-button"]').click();
    return this;
  }

  /**
   * View all recent activities
   */
  viewAllActivities() {
    this.recentActivityWidget.find('[data-testid="view-all"]').click();
    return this;
  }

  // ========================================
  // ASSERTIONS (Verification Methods)
  // ========================================

  /**
   * Verify user is on dashboard page
   */
  verifyOnDashboard() {
    cy.url().should('include', '/dashboard');
    this.pageTitle.should('be.visible');
    return this;
  }

  /**
   * Verify welcome message for user
   * @param userName - Expected user name in welcome message
   */
  verifyWelcomeMessage(userName: string) {
    this.welcomeMessage
      .should('be.visible')
      .and('contain.text', `Welcome, ${userName}`);
    return this;
  }

  /**
   * Verify all widgets are loaded
   */
  verifyAllWidgetsLoaded() {
    this.statsWidget.should('be.visible');
    this.chartWidget.should('be.visible');
    this.recentActivityWidget.should('be.visible');
    return this;
  }

  /**
   * Verify navigation menu is visible
   */
  verifyNavigationMenuVisible() {
    this.homeMenuItem.should('be.visible');
    this.reportsMenuItem.should('be.visible');
    this.settingsMenuItem.should('be.visible');
    return this;
  }

  /**
   * Verify loading is complete
   */
  verifyLoadingComplete() {
    this.loadingSpinner.should('not.exist');
    return this;
  }

  /**
   * Verify data table is visible
   */
  verifyDataTableVisible() {
    this.dataTable.should('be.visible');
    return this;
  }

  /**
   * Verify table has data
   */
  verifyTableHasData() {
    this.dataTable.find('tbody tr').should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Verify table row count
   * @param expectedCount - Expected number of rows
   */
  verifyTableRowCount(expectedCount: number) {
    this.dataTable.find('tbody tr').should('have.length', expectedCount);
    return this;
  }

  /**
   * Verify search results
   * @param expectedText - Text that should appear in results
   */
  verifySearchResults(expectedText: string) {
    this.contentArea.should('contain.text', expectedText);
    return this;
  }

  /**
   * Verify stats widget value
   * @param statName - Name of statistic
   * @param expectedValue - Expected value
   */
  verifyStatValue(statName: string, expectedValue: string) {
    this.statsWidget
      .find(`[data-testid="stat-${statName}"]`)
      .should('contain.text', expectedValue);
    return this;
  }

  /**
   * Verify notification count
   * @param expectedCount - Expected notification count
   */
  verifyNotificationCount(expectedCount: number) {
    this.notificationBell
      .find('[data-testid="notification-count"]')
      .should('have.text', expectedCount.toString());
    return this;
  }

  /**
   * Verify user is logged in
   * @param userName - Expected user name
   */
  verifyUserLoggedIn(userName: string) {
    this.userProfileButton.should('be.visible').and('contain.text', userName);
    return this;
  }

  /**
   * Verify dashboard title
   * @param expectedTitle - Expected dashboard title
   */
  verifyDashboardTitle(expectedTitle: string) {
    this.pageTitle.should('have.text', expectedTitle);
    return this;
  }

  // ========================================
  // WAIT METHODS
  // ========================================

  /**
   * Wait for dashboard to fully load
   */
  waitForDashboardToLoad() {
    this.waitForLoading('[data-testid="loading-spinner"]');
    this.verifyAllWidgetsLoaded();
    return this;
  }

  /**
   * Wait for data table to load
   */
  waitForTableToLoad() {
    this.dataTable.should('be.visible');
    this.waitForLoading();
    return this;
  }

  /**
   * Wait for search results
   */
  waitForSearchResults() {
    this.waitForLoading();
    this.contentArea.should('be.visible');
    return this;
  }
}

export default new DashboardPage();
