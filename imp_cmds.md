npx playwright test - Runs all the test in test folder or tests defined in playwright.config.js
npx playwright test tests/register.spec.js - Run specific tests from a file.
npx playwright test tests/register.spec.js --debug - Run script in debug mode
playwright.dev/docs - website for playwright documentations

To install Playwright with npm:

npm init playwright@latest

This scaffolds config, installs the @playwright/test package, and prompts to download browser binaries. 
If you just need the package added to an existing project (no scaffolding), use:

npm install -D @playwright/test
npx playwright install

npx playwright codegen <url> - perform record and play back using codegen

npx playwright test --reporter=line,allure-playwright - run the tests and generate execution report using allure.
npx allure generate ./allure-results --clean - this will generate a HTML report based on allure files in specified folder. --clean will clean existing reports (use npx since allure is only a local devDependency, not installed globally)
npx allure open ./allure-report - open allure report

If we want to run scripts from package.json, you will have to update the scripts section in package.json and then trigger the execution
using below command: npm run <name of the test from package.json> i.e. npm run regression

### Jenkin Commands
java -jar jenkins.war -httpPort=9090 --enable-future-java - run java war file
Jenkins User Details: admin/admin



npm run <tests you want to run> - command to run the scripts from package.json. This will be helpful in jenkin intigration.
npm run test -- --debug - command to run the scripts from package.json in debug mode.

npx playwright test tests/pom_e2e_flow.spec.js --config playwright.config.js - runs the test using specific playwright config file
npx playwright test tests/pom_e2e_flow.spec.js --config playwright.config.js --project "Safari Execution" - runs the test using a specific playwright config file and with in that it picks the project
which has been mentioned

npx playwright test --grep @web - this cmd will run only the tests which have @Web notation in there description.

trace.playwright.dev - url to view playright trace files

### Different way to debug playwright scripts:
    1) Using playwright's in-built command: npx playwright test tests/register.spec.js --debug
        This helps with UI debugging only, if you have any API calls or want to debug any functions it will not be useful.
    2) Using playwright's in-built option in "playwright.config.js" file:
        in Use block, update the option trace:'on' -  this will generate full trace of all the calls and you can traces from 
        /test-results folder and upload to trace.playwright.dev portal to view the traces.
    3) Using npm's in built option:
        update the package.json's script section as: "test": "npx playwright test tests/WebAPITest_Part1.spec.js"
        then run the command: npm run test -- --debug

### Cucumber Installation

npm install @cucumber/cucumber - Install cucumber libraries
install extension "Cucumber (Gherkin) Full Support"
npx cucumber-js - will execute all the feature files in you repo.
npx cucumber-js --exit - will execute all the feature files in you repo and exit out after completion.
npx cucumber-js features/e2e.feature - will execute specific feature file in you repo
npx cucumber-js --tags "@E2@_Validations" --exit - This will executed all the feature files with this tag.
npx cucumber-js features/e2e.feature --parallel 2 --exit --format html:cucumber-report.html - this will
execute scenarios in feature file in parallel and generate a html report.