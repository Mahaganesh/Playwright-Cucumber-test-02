import { Before, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import SauseDemoLogin from '../page/sauseedemo.page';
import { page } from "../support/hooks";

setDefaultTimeout(60 * 1000);

let sauseDemo: SauseDemoLogin;

Before(async function () {
    if (!page) {
        throw new Error("Page is not initialized.");
    }
    // Assign the initialized SauseDemoLogin instance to the outer sauseDemo variable
    sauseDemo = new SauseDemoLogin(page);
    return this.sauseDemo = sauseDemo; 
});

Given('Login to SauseDemo', async function () {
    await sauseDemo.waitForsauseDemoHeader();
});


When('Select Demo One', async function () {
    await sauseDemo.selectInventoryItem('Sauce Labs Backpack');
    await page.pause()
});

Then('Validate', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});