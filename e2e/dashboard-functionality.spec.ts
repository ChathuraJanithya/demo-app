import { test, expect } from "@playwright/test"

test.describe("Dashboard Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin before each test
    await page.goto("/")
    await page.fill('input[type="text"]', "admin")
    await page.fill('input[type="password"]', "admin123")
    await page.click('button[type="submit"]')
    await expect(page.getByText("Borrower Pipeline")).toBeVisible()
  })

  test("should switch between pipeline tabs", async ({ page }) => {
    // Check New tab is active by default
    await expect(page.getByRole("tab", { name: /New/ })).toHaveAttribute("data-state", "active")

    // Click In Review tab
    await page.click("text=In Review")
    await expect(page.getByRole("tab", { name: /In Review/ })).toHaveAttribute("data-state", "active")

    // Click Approved tab
    await page.click("text=Approved")
    await expect(page.getByRole("tab", { name: /Approved/ })).toHaveAttribute("data-state", "active")
  })

  test("should select borrower and show details", async ({ page }) => {
    // Click on Sarah Dunn
    await page.click("text=Sarah Dunn")

    // Should show borrower details
    await expect(page.getByText("sarah.dunn@example.com")).toBeVisible()
    await expect(page.getByText("AI Explainability")).toBeVisible()
    await expect(page.getByText("Loan Summary")).toBeVisible()
  })

  test("should expand AI explainability section", async ({ page }) => {
    // Click on a borrower first
    await page.click("text=Sarah Dunn")

    // Click on AI explainability accordion
    await page.click("text=Risk Factors Detected")

    // Should show risk factors
    await expect(page.getByText("Income Inconsistent with Bank statements")).toBeVisible()
  })

  test("should handle action buttons", async ({ page }) => {
    // Click on a borrower first
    await page.click("text=Sarah Dunn")

    // Test Request Documents button
    await page.click("text=Request Documents")

    // Should show loading state (briefly)
    await expect(page.getByText("Requesting...")).toBeVisible({ timeout: 1000 })
  })

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Should still show main elements
    await expect(page.getByText("DemoApp")).toBeVisible()
    await expect(page.getByText("Borrower Pipeline")).toBeVisible()
  })
})
