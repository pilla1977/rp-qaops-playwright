# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: register.spec.js >> Register User
- Location: tests\register.spec.js:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Account Created Successfully', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Account Created Successfully', { exact: true })

```

```yaml
- banner:
  - text: Ecom
  - link " dummywebsite@rahulshettyacademy.com":
    - /url: emailto:dummywebsite@rahulshettyacademy.com
  - link "":
    - /url: "#"
  - link "":
    - /url: "#"
  - link "":
    - /url: "#"
  - link "":
    - /url: "#"
- heading "We Make Your Shopping Simple" [level=3]
- heading "Practice Website for Rahul Shetty Academy Students" [level=1]:
  - text: Practice Website for
  - emphasis: Rahul Shetty Academy
  - text: Students
- link "Register":
  - /url: "#/auth/register"
- heading "Register" [level=1]
- text: First Name
- textbox "First Name": cetctest
- text: Last Name
- textbox "Last Name": passlow
- text: Email
- textbox "email@example.com": cetc.midnight2@gmail.com
- text: Phone Number
- textbox "enter your number": "2344568899"
- text: Occupation
- combobox:
  - option "Choose your occupation" [disabled]
  - option "Doctor"
  - option "Student" [selected]
  - option "Engineer"
  - option "Scientist"
- text: Gender
- radio "Male" [checked]
- text: Male
- radio "Female"
- text: Female Password
- textbox "Passsword": VZcom2014$
- text: Confirm Password
- textbox "Confirm Password":
  - /placeholder: Confirm Passsword
  - text: VZcom2014$
- checkbox [checked]
- text: I am 18 year or Older
- button "Register"
- paragraph: Already have an account? Login here
- heading "Why People Choose Us?" [level=1]
- text: 
- heading "3546540" [level=1]
- paragraph: Successfull Orders
- text: 
- heading "37653" [level=1]
- paragraph: Customers
- text: 
- heading "3243" [level=1]
- paragraph: Sellers
- text: 
- heading "4500+" [level=1]
- paragraph: Daily Orders
- text: 
- heading "500+" [level=1]
- paragraph: Daily New Customer Joining
```

# Test source

```ts
  1  | const {test, expect} = require ('@playwright/test');
  2  | 
  3  | test('Register User', async({ browser }) => {
  4  |     const context = await browser.newContext();
  5  |     const page = await context.newPage();
  6  | 
  7  |     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  8  |     await page.locator('p.login-wrapper-footer-text').click();
  9  |     await page.locator('#firstName').fill("cetctest");
  10 |     await page.locator('#lastName').fill("passlow");
  11 |     // await page.locator("#userEmail").fill("cetc.midnight1@gmail.com");
  12 |     await page.locator("#userEmail").fill("cetc.midnight2@gmail.com");
  13 |     await page.locator("#userMobile").fill("2344568899");
  14 |     await page.locator("[formcontrolname='occupation']").selectOption("Student");
  15 |     await page.locator('input[value="Male"]').check();
  16 |     await page.locator("#userPassword").fill("VZcom2014$");
  17 |     await page.locator("#confirmPassword").fill("VZcom2014$");
  18 |     await page.getByRole('checkbox').check();
  19 |     await page.locator("#login").click();
> 20 |     await expect(page.getByText('Account Created Successfully', { exact: true })).toBeVisible();
     |                                                                                   ^ Error: expect(locator).toBeVisible() failed
  21 |     
  22 | 
  23 | });
```