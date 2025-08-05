import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 10,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'sanity',
      testMatch: /.*sanity\.spec\.ts/,
    },
    {
      name: 'regression',
      testMatch: /.*regression\.spec\.ts/,
    },
  ],
  outputDir: 'test-results/',
}); 