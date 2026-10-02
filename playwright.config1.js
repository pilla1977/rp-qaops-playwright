// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [{
    name: "Safari Execution",
    use: {
      browserName: 'webkit',
      headless: true,
      screenshot: 'on',
      trace: 'retain-on-failure'
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    }
  },
  {
    name: "Chromium Execution",
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'on',
      trace: 'retain-on-failure'
      // viewport: {width:720,height:720},
      // ...devices['iPhone 11'],
      // ignoreHTTPSErrors:true,
      // permissions:['geolocation']
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    }
  }
  ]
});

