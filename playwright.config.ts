import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.ts/,
  timeout: 45000,
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    video: 'on',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'desktop-1440',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      }
    },
    {
      name: 'mobile-375',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 812 }
      }
    }
  ],
  webServer: {
    command: 'npm run preview -- --port 3000',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000
  }
});

