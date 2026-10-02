// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // testMatch: ''
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  },

});

