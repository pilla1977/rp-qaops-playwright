const { Before } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager.js');
const playwright = require('@playwright/test');
const path = require('node:path');
// const data = JSON.parse(JSON.stringify(require('../../utils/e2eOrder_Data.json')));

Before({ name: "Set up some test state" }, async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poMgr = new POManager(this.page);
});

/*
BeforeStep({tags: "@foo"}, function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.driver.takeScreenshot({path: 'screenshot.jpg'});
  }
});
*/