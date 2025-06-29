import { test, expect } from "@playwright/test"

test.describe("AI Explainability Section Expand/Collapse", () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin and select a borrower
    await page.goto("/")
    await page.fill('input[name="username"]', "admin")
    await page.fill('input[name="password"]', "admin123")
    await page.click('button[type="submit"]')
    await expect(page.getByText("Borrower Pipeline")).toBeVisible({ timeout: 10000 })

    // Select Sarah Dunn to show borrower details
    await expect(page.getByText("Sarah Dunn")).toBeVisible({ timeout: 5000 })
    await page.click("text=Sarah Dunn")
    await expect(page.getByText("AI Explainability")).toBeVisible({ timeout: 5000 })
  })

  test("should expand AI explainability section when clicked", async ({ page }) => {
    // Find the accordion trigger
    const accordionTrigger = page.getByText("Risk Factors Detected")
    await expect(accordionTrigger).toBeVisible()

    // Initially, the risk factors should not be visible (collapsed)
    await expect(page.getByText("Income Inconsistent with Bank statements")).not.toBeVisible()
    await expect(page.getByText("High Debt-to-Income Ratio detected")).not.toBeVisible()

    // Click to expand the accordion
    await accordionTrigger.click()

    // Now the risk factors should be visible (expanded)
    await expect(page.getByText("Income Inconsistent with Bank statements")).toBeVisible({ timeout: 3000 })
    await expect(page.getByText("High Debt-to-Income Ratio detected")).toBeVisible()

    // Verify the accordion is in expanded state
    const accordionContent = page.locator('[data-state="open"]')
    await expect(accordionContent).toBeVisible()
  })

  test("should collapse AI explainability section when clicked again", async ({ page }) => {
    const accordionTrigger = page.getByText("Risk Factors Detected")

    // First expand the section
    await accordionTrigger.click()
    await expect(page.getByText("Income Inconsistent with Bank statements")).toBeVisible({ timeout: 3000 })

    // Then collapse it by clicking again
    await accordionTrigger.click()

    // Risk factors should no longer be visible (collapsed)
    await expect(page.getByText("Income Inconsistent with Bank statements")).not.toBeVisible()
    await expect(page.getByText("High Debt-to-Income Ratio detected")).not.toBeVisible()

    // Verify the accordion is in collapsed state
    const accordionContent = page.locator('[data-state="closed"]')
    await expect(accordionContent).toBeVisible()
  })

  test("should toggle explainability section multiple times", async ({ page }) => {
    const accordionTrigger = page.getByText("Risk Factors Detected")
    const riskFactor1 = page.getByText("Income Inconsistent with Bank statements")
    const riskFactor2 = page.getByText("High Debt-to-Income Ratio detected")

    // Test multiple expand/collapse cycles
    for (let i = 0; i < 3; i++) {
      // Expand
      await accordionTrigger.click()
      await expect(riskFactor1).toBeVisible({ timeout: 3000 })
      await expect(riskFactor2).toBeVisible()

      // Collapse
      await accordionTrigger.click()
      await expect(riskFactor1).not.toBeVisible()
      await expect(riskFactor2).not.toBeVisible()
    }
  })

  test("should show correct number of risk factors in accordion header", async ({ page }) => {
    // Verify the accordion header shows the correct count
    await expect(page.getByText("Risk Factors Detected (2)")).toBeVisible()

    // Expand to verify the count matches actual risk factors
    await page.getByText("Risk Factors Detected").click()

    // Count the visible risk factors
    const riskFactors = page.locator('[role="alert"]')
    await expect(riskFactors).toHaveCount(2)
  })

  test("should maintain accordion state when switching between borrowers", async ({ page }) => {
    // Expand Sarah's explainability section
    await page.getByText("Risk Factors Detected").click()
    await expect(page.getByText("Income Inconsistent with Bank statements")).toBeVisible({ timeout: 3000 })

    // Switch to Lisa Carter
    await page.click("text=Lisa Carter")
    await expect(page.getByText("AI Explainability")).toBeVisible({ timeout: 5000 })

    // Lisa's explainability section should be collapsed by default
    await expect(page.getByText("High Debt-to-Income Ratio detected")).not.toBeVisible()

    // Expand Lisa's section
    await page.getByText("Risk Factors Detected").click()
    await expect(page.getByText("High Debt-to-Income Ratio detected")).toBeVisible({ timeout: 3000 })

    // Switch back to Sarah
    await page.click("text=Sarah Dunn")
    await expect(page.getByText("AI Explainability")).toBeVisible({ timeout: 5000 })

    // Sarah's section should be collapsed again (state reset)
    await expect(page.getByText("Income Inconsistent with Bank statements")).not.toBeVisible()
  })

  test("should display warning icons in risk factors", async ({ page }) => {
    // Expand the explainability section
    await page.getByText("Risk Factors Detected").click()
    await expect(page.getByText("Income Inconsistent with Bank statements")).toBeVisible({ timeout: 3000 })

    // Check for warning icons (AlertTriangle icons)
    const warningIcons = page.locator('svg[data-lucide="alert-triangle"]')
    await expect(warningIcons).toHaveCount(3) // One in header, two in risk factors
  })
})
