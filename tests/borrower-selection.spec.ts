import { test, expect } from "@playwright/test"

test.describe("Borrower Selection Updates Center Pane", () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin to access all features
    await page.goto("/")
    await page.fill('input[name="username"]', "admin")
    await page.fill('input[name="password"]', "admin123")
    await page.click('button[type="submit"]')
    await expect(page.getByText("Borrower Pipeline")).toBeVisible({ timeout: 10000 })
  })

  test("should update center pane when selecting Sarah Dunn", async ({ page }) => {
    // Wait for borrowers to load
    await expect(page.getByText("Sarah Dunn")).toBeVisible({ timeout: 5000 })

    // Initially, center pane should show "Select a borrower to view details"
    await expect(page.getByText("Select a borrower to view details")).toBeVisible()

    // Click on Sarah Dunn
    await page.click("text=Sarah Dunn")

    // Verify center pane updates with Sarah's details
    await expect(page.getByText("sarah.dunn@example.com")).toBeVisible({ timeout: 5000 })
    await expect(page.getByText("(355)123-4557")).toBeVisible()
    await expect(page.getByText("$300,000")).toBeVisible()

    // Verify the "Select a borrower" message is gone
    await expect(page.getByText("Select a borrower to view details")).not.toBeVisible()

    // Verify borrower-specific sections appear
    await expect(page.getByText("AI Explainability")).toBeVisible()
    await expect(page.getByText("Loan Summary")).toBeVisible()
  })

  test("should update center pane when selecting Lisa Carter", async ({ page }) => {
    // Wait for borrowers to load
    await expect(page.getByText("Lisa Carter")).toBeVisible({ timeout: 5000 })

    // Click on Lisa Carter
    await page.click("text=Lisa Carter")

    // Verify center pane updates with Lisa's details
    await expect(page.getByText("lisa.carter@example.com")).toBeVisible({ timeout: 5000 })
    await expect(page.getByText("(355)987-6543")).toBeVisible()
    await expect(page.getByText("$450,000")).toBeVisible()

    // Verify borrower-specific sections appear
    await expect(page.getByText("AI Explainability")).toBeVisible()
    await expect(page.getByText("Loan Summary")).toBeVisible()
  })

  test("should switch between borrowers and update center pane accordingly", async ({ page }) => {
    // Wait for borrowers to load
    await expect(page.getByText("Sarah Dunn")).toBeVisible({ timeout: 5000 })
    await expect(page.getByText("Lisa Carter")).toBeVisible({ timeout: 5000 })

    // First select Sarah Dunn
    await page.click("text=Sarah Dunn")
    await expect(page.getByText("sarah.dunn@example.com")).toBeVisible({ timeout: 5000 })

    // Then select Lisa Carter
    await page.click("text=Lisa Carter")
    await expect(page.getByText("lisa.carter@example.com")).toBeVisible({ timeout: 5000 })

    // Verify Sarah's email is no longer visible (replaced by Lisa's)
    await expect(page.getByText("sarah.dunn@example.com")).not.toBeVisible()

    // Switch back to Sarah Dunn
    await page.click("text=Sarah Dunn")
    await expect(page.getByText("sarah.dunn@example.com")).toBeVisible({ timeout: 5000 })

    // Verify Lisa's email is no longer visible
    await expect(page.getByText("lisa.carter@example.com")).not.toBeVisible()
  })

  test("should update center pane when switching tabs and selecting borrowers", async ({ page }) => {
    // Start with New tab (default)
    await expect(page.getByText("Sarah Dunn")).toBeVisible({ timeout: 5000 })
    await page.click("text=Sarah Dunn")
    await expect(page.getByText("sarah.dunn@example.com")).toBeVisible({ timeout: 5000 })

    // Switch to In Review tab
    await page.click("text=In Review")
    await expect(page.getByRole("tab", { name: /In Review/ })).toHaveAttribute("data-state", "active")

    // Select Alan Matthews from In Review tab
    await expect(page.getByText("Alan Matthews")).toBeVisible({ timeout: 5000 })
    await page.click("text=Alan Matthews")

    // Verify center pane updates with Alan's details
    await expect(page.getByText("alan.matthews@example.com")).toBeVisible({ timeout: 5000 })
    await expect(page.getByText("(355)456-7890")).toBeVisible()
    await expect(page.getByText("$20,000")).toBeVisible()

    // Verify Sarah's details are no longer visible
    await expect(page.getByText("sarah.dunn@example.com")).not.toBeVisible()
  })

  test("should highlight selected borrower card", async ({ page }) => {
    // Wait for borrowers to load
    await expect(page.getByText("Sarah Dunn")).toBeVisible({ timeout: 5000 })

    // Get the borrower card elements
    const sarahCard = page.locator("text=Sarah Dunn").locator("..")
    const lisaCard = page.locator("text=Lisa Carter").locator("..")

    // Initially no card should be highlighted (active)
    await expect(sarahCard).not.toHaveClass(/border-blue-500/)

    // Click on Sarah Dunn
    await page.click("text=Sarah Dunn")

    // Sarah's card should be highlighted
    await expect(sarahCard).toHaveClass(/border-blue-500/)

    // Click on Lisa Carter
    await page.click("text=Lisa Carter")

    // Lisa's card should be highlighted, Sarah's should not
    await expect(lisaCard).toHaveClass(/border-blue-500/)
    await expect(sarahCard).not.toHaveClass(/border-blue-500/)
  })
})
