import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests',
  timeout: 10_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000,
  },
})
