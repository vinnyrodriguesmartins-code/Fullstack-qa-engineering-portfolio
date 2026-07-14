import { defineConfig, devices } from "@playwright/test";

const webBaseUrl = process.env.WEB_BASE_URL ?? "http://localhost:5173";
const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:5000/api/v1.0";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: webBaseUrl,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    colorScheme: "dark",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  metadata: {
    apiBaseUrl,
  },
});
