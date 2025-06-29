import { test, expect } from "@playwright/test";

test.describe("Button Clicks Log Console Outputs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Wait for username field to appear before interacting
    await page.waitForSelector('input[name="username"]', { timeout: 10000 });

    // Fill in login credentials
    await page.fill('input[name="username"]', "admin");
    await page.fill('input[name="password"]', "admin123");

    // Submit login
    await page.click('button[type="submit"]');

    // Wait for the dashboard to load (less flaky than `getByText`)
    await expect(page.locator("text=Borrower Pipeline")).toBeVisible({
      timeout: 10000,
    });
  });

  test("should log console output when Request Documents button is clicked", async ({
    page,
  }) => {
    // Listen for console messages
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleMessages.push(msg.text());
      }
    });

    // Click Request Documents button
    const requestDocsButton = page.getByText("Request Documents");
    await expect(requestDocsButton).toBeVisible();
    await requestDocsButton.click();

    // Wait for the action to complete (button should show loading state briefly)
    await expect(page.getByText("Requesting...")).toBeVisible({
      timeout: 2000,
    });
    await expect(page.getByText("Request Documents")).toBeVisible({
      timeout: 5000,
    });

    // Verify console log was created
    await page.waitForTimeout(1000); // Give time for console log
    expect(
      consoleMessages.some(
        (msg) =>
          msg.includes("documents completed") &&
          msg.includes("Documents requested")
      )
    ).toBeTruthy();
  });

  test("should log console output when Send to Valuer button is clicked (Admin only)", async ({
    page,
  }) => {
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleMessages.push(msg.text());
      }
    });

    // Click Send to Valuer button (admin only)
    const sendToValuerButton = page.getByText("Send to Valuer");
    await expect(sendToValuerButton).toBeVisible();
    await sendToValuerButton.click();

    // Wait for the action to complete
    await expect(page.getByText("Sending...")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("Send to Valuer")).toBeVisible({
      timeout: 5000,
    });

    // Verify console log was created
    await page.waitForTimeout(1000);
    expect(
      consoleMessages.some(
        (msg) =>
          msg.includes("valuer completed") && msg.includes("Valuer notified")
      )
    ).toBeTruthy();
  });

  test("should log console output when Approve button is clicked (Admin only)", async ({
    page,
  }) => {
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleMessages.push(msg.text());
      }
    });

    // Click Approve button (admin only)
    const approveButton = page.getByText("Approve");
    await expect(approveButton).toBeVisible();
    await approveButton.click();

    // Wait for the action to complete
    await expect(page.getByText("Approving...")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("Approve")).toBeVisible({ timeout: 5000 });

    // Verify console log was created
    await page.waitForTimeout(1000);
    expect(
      consoleMessages.some(
        (msg) =>
          msg.includes("approve completed") && msg.includes("Loan approved")
      )
    ).toBeTruthy();
  });

  test("should log console output when Escalate to Credit Committee button is clicked (Admin only)", async ({
    page,
  }) => {
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleMessages.push(msg.text());
      }
    });

    // Click Escalate to Credit Committee button (admin only)
    const escalateButton = page.getByText("Escalate to Credit Committee");
    await expect(escalateButton).toBeVisible();
    await escalateButton.click();

    // Wait for the action to complete
    await expect(page.getByText("Escalating...")).toBeVisible({
      timeout: 2000,
    });
    await expect(page.getByText("Escalate to Credit Committee")).toBeVisible({
      timeout: 5000,
    });

    // Verify console log was created
    await page.waitForTimeout(1000);
    expect(
      consoleMessages.some(
        (msg) =>
          msg.includes("escalate completed") &&
          msg.includes("Escalated to Credit Committee")
      )
    ).toBeTruthy();
  });

  test("should verify broker users cannot see admin-only buttons and their console logs", async ({
    page,
  }) => {
    // Logout and login as broker
    await page.click("text=System Administrator");
    await page.click("text=Sign out");
    await expect(
      page.getByText("Sign in to access the loan management dashboard")
    ).toBeVisible({ timeout: 5000 });

    // Login as broker
    await page.fill('input[name="username"]', "broker");
    await page.fill('input[name="password"]', "broker123");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Borrower Pipeline")).toBeVisible({
      timeout: 10000,
    });

    // Select a borrower
    await expect(page.getByText("Sarah Dunn")).toBeVisible({ timeout: 5000 });
    await page.click("text=Sarah Dunn");
    await expect(page.getByText("AI Explainability")).toBeVisible({
      timeout: 5000,
    });

    // Verify admin-only buttons are not visible
    await expect(page.getByText("Send to Valuer")).not.toBeVisible();
    await expect(page.getByText("Approve")).not.toBeVisible();
    await expect(
      page.getByText("Escalate to Credit Committee")
    ).not.toBeVisible();

    // But Request Documents should still be visible
    await expect(page.getByText("Request Documents")).toBeVisible();
  });

  test("should show loading states for all action buttons", async ({
    page,
  }) => {
    // Test Request Documents loading state
    await page.getByText("Request Documents").click();
    await expect(page.getByText("Requesting...")).toBeVisible({
      timeout: 2000,
    });
    await expect(page.getByText("Request Documents")).toBeVisible({
      timeout: 5000,
    });

    // Test Send to Valuer loading state
    await page.getByText("Send to Valuer").click();
    await expect(page.getByText("Sending...")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("Send to Valuer")).toBeVisible({
      timeout: 5000,
    });

    // Test Approve loading state
    await page.getByText("Approve").click();
    await expect(page.getByText("Approving...")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("Approve")).toBeVisible({ timeout: 5000 });

    // Test Escalate loading state
    await page.getByText("Escalate to Credit Committee").click();
    await expect(page.getByText("Escalating...")).toBeVisible({
      timeout: 2000,
    });
    await expect(page.getByText("Escalate to Credit Committee")).toBeVisible({
      timeout: 5000,
    });
  });

  test("should handle multiple rapid button clicks gracefully", async ({
    page,
  }) => {
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "log") {
        consoleMessages.push(msg.text());
      }
    });

    const requestDocsButton = page.getByText("Request Documents");

    // Click button multiple times rapidly
    await requestDocsButton.click();
    await requestDocsButton.click();
    await requestDocsButton.click();

    // Should show loading state
    await expect(page.getByText("Requesting...")).toBeVisible({
      timeout: 2000,
    });

    // Wait for completion
    await expect(page.getByText("Request Documents")).toBeVisible({
      timeout: 5000,
    });

    // Should only have one console log (not multiple)
    await page.waitForTimeout(1000);
    const documentLogs = consoleMessages.filter((msg) =>
      msg.includes("documents completed")
    );
    expect(documentLogs.length).toBe(1);
  });
});
