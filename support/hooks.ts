import { After, Before, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import SetmoreLogin from '../page/app.page';
import ElementUtil from '../utils/elements-utils';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  
  // Make the page accessible in step definitions through world context
  this.page = page; 
  this.setmoreLogin = new SetmoreLogin(page);
  this.elementUtils = new ElementUtil(page);

  await this.elementUtils.gotoURL('https://go.setmore.com');
  await this.setmoreLogin.setmoreLoginPageEmailField('mahaganesh.lt@mailinator.com');
  await this.setmoreLogin.setmoreLoginPagePasswordField('I2password@97');
  await this.setmoreLogin.setmoreLoginPageButton();
});

After(async function () {
  await page.close()
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

// Exporting the context, browser, and page if needed in step definitions
export {
  page,
  browser,
  context
};
