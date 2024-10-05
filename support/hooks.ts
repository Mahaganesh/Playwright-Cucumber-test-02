import { After, Before, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import ElementUtil from '../utils/elements-utils';
import SetmoreLogin from '../page/app.page';
import SauseDemoLogin from '../page/sauseedemo.page';
import * as dotenv from 'dotenv'; 

dotenv.config();
setDefaultTimeout(60 * 10000)

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();

});

Before(async function (scenario: ITestCaseHookParameter) {
  this.setmoreLogin = new SetmoreLogin(page);
  this.sauseDemo = new SauseDemoLogin(page);

  this.elementUtils = new ElementUtil(page);

  let loginUrl;
  let email;
  let password;

  const tags = scenario.pickle.tags.map(tag => tag.name);

  if (tags.includes('@setmoreLogin')) {
      loginUrl = process.env.SETMORE_LOGIN_URL;
      email = process.env.SETMORE_EMAIL;
      password = process.env.SETMORE_PASSWORD;
  } else if (tags.includes('@SauseDemo')) {
      loginUrl = process.env.SAUCEDEMO_LOGIN_URL;
      email = process.env.SAUCEDEMO_EMAIL;
      password = process.env.SAUCEDEMO_PASSWORD;
  }

  await this.elementUtils.gotoURL(loginUrl);

  if (tags.includes('@setmoreLogin')) {
      await this.setmoreLogin.setmoreLoginPageEmailField(email);
      await this.setmoreLogin.setmoreLoginPagePasswordField(password);
      await this.setmoreLogin.setmoreLoginPageButton();
  } else if (tags.includes('@SauseDemo')) {
      await this.sauseDemo.sauseDemoLoginPageEmailField(email);
      await this.sauseDemo.sauseDemoLoginPagePasswordField(password);
      await this.sauseDemo.sauseDemoLoginPageButton();
  }
});

After(async function () {
  await page.close();
});

AfterAll(async function () {
  await context.close();
  if (browser) {
    await browser.close();
  }
});

export {
  page,
  browser,
  context
};
