import { After, Before, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import ElementUtil from '../utils/elements-utils';
import SetmoreLogin from '../page/app.page1';
import * as dotenv from 'dotenv'; // Import dotenv

// Load environment variables from the .env file
dotenv.config();
setDefaultTimeout(60 * 10000)

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function (scenario: ITestCaseHookParameter) {
  context = await browser.newContext();
  page = await context.newPage();
  
  // Make the page accessible in step definitions through world context
  this.page = page;
  this.setmoreLogin = new SetmoreLogin(page);
  this.elementUtils = new ElementUtil(page);

  // Default login data in the .env file
  let loginUrl = process.env.SETMORE_LOGIN_URL;
  let email = process.env.SETMORE_EMAIL;
  let password = process.env.SETMORE_PASSWORD;

  // Check for scenario tags to determine which credentials to use
  const tags = scenario.pickle.tags.map(tag => tag.name);

  // Load credentials based on the tags
  if (tags.includes('@setmoreLogin')) {
    // Load Setmore credentials
    loginUrl = process.env.SETMORE_LOGIN_URL;
    email = process.env.SETMORE_EMAIL;
    password = process.env.SETMORE_PASSWORD;
  } else if (tags.includes('@SauseDemo')) {
    // Load SauceDemo credentials
    loginUrl = process.env.SAUCEDEMO_LOGIN_URL;
    email = process.env.SAUCEDEMO_EMAIL;
    password = process.env.SAUCEDEMO_PASSWORD;
  }

  // console.log(await this.setmoreLogin.setmoreLoginPageEmailField(email))
  // console.log(await this.setmoreLogin.setmoreLoginPageEmailField(email))

  // console.log(await this.setmoreLogin.setmoreLoginPagePasswordField(password))

  // Use the dynamically loaded credentials and URL
  await this.elementUtils.gotoURL(loginUrl);
  await this.setmoreLogin.setmoreLoginPageEmailField(email);
  await this.setmoreLogin.setmoreLoginPagePasswordField(password);
  await this.setmoreLogin.setmoreLoginPageButton();
});

After(async function () {
  await page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

export {
  page,
  browser,
  context
};
