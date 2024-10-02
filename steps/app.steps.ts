import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';



setDefaultTimeout(60 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

Given('Login to Setmore', async function () {
    // browser = await chromium.launch({ headless: false });
    // context = await browser.newContext();
    // page = await context.newPage();
    // this.page = page; 

    // await page.goto("https://www.google.com")
    // await page.pause()
    // await page.close()
    // await context.close()
    // await browser.close()
    return 'failed';
});


When('Select Contacts Component', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});


Then('Perform search', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});


