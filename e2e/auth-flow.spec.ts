import { test, expect } from "@playwright/test"

test.describe("Authentication Flow", () => {
  test("should login as admin and access admin features", async ({ page }) => {
    await page.goto("/")

    // Should show login form
    await expect(page.getByText("Sign in to access the loan management dashboard")).toBeVisible()

    // Fill in admin credentials
    await page.fill('input[type="text"]', "admin")
    await page.fill('input[type="password"]', "admin123")

    // Click sign in
    await page.click('button[type="submit"]')

    // Should redirect to dashboard
    await expect(page.getByText("Borrower Pipeline")).toBeVisible()
    await expect(page.getByText("Admin")).toBeVisible()

    // Click on a borrower
    await page.click("text=Sarah Dunn")

    // Should see admin-only buttons
    await expect(page.getByText("Send to Valuer")).toBeVisible()
    await expect(page.getByText("Approve")).toBeVisible()
    await expect(page.getByText("Escalate to Credit Committee")).toBeVisible()
  })

  test("should login as broker and hide admin features", async ({ page }) => {
    await page.goto("/")

    // Fill in broker credentials
    await page.fill('input[type="text"]', "broker")
    await page.fill('input[type="password"]', "broker123")

    // Click sign in
    await page.click('button[type="submit"]')

    // Should redirect to dashboard
    await expect(page.getByText("Borrower Pipeline")).toBeVisible()
    await expect(page.getByText("Broker")).toBeVisible()

    // Click on a borrower
    await page.click("text=Sarah Dunn")

    // Should NOT see admin-only buttons
    await expect(page.getByText("Send to Valuer")).not.toBeVisible()
    await expect(page.getByText("Approve")).not.toBeVisible()
    await expect(page.getByText("Escalate to Credit Committee")).not.toBeVisible()

    // Should see broker-accessible features
    await expect(page.getByText("Request Documents")).toBeVisible()
  })

  test("should logout successfully", async ({ page }) => {
    await page.goto("/")

    // Login first
    await page.fill('input[type="text"]', "admin")
    await page.fill('input[type="password"]', "admin123")
    await page.click('button[type="submit"]')

    // Wait for dashboard
    await expect(page.getByText("Borrower Pipeline")).toBeVisible()

    // Click user dropdown
    await page.click("text=System Administrator")

    // Click logout
    await page.click("text=Sign out")

    // Should return to login
    await expect(page.getByText("Sign in to access the loan management dashboard")).toBeVisible()
  })

  test("should handle invalid credentials", async ({ page }) => {
    await page.goto("/")

    // Fill in invalid credentials
    await page.fill('input[type="text"]', "invalid")
    await page.fill('input[type="password"]', "wrong")

    // Click sign in
    await page.click('button[type="submit"]')

    // Should show error message
    await expect(page.getByText("Invalid username or password")).toBeVisible()
  })
})
