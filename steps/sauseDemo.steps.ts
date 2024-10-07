import { Before, Given, When, Then, setDefaultTimeout, After } from '@cucumber/cucumber';
import SauseDemoLogin from '../page/sauseedemo.page';
import { page } from "../support/hooks";

setDefaultTimeout(60 * 1000);

let sauseDemo: SauseDemoLogin;

Before(async function () {
    if (!page) {
        throw new Error("Page is not initialized.");
    }
    sauseDemo = new SauseDemoLogin(page);
    return this.sauseDemo = sauseDemo;
});

Given('Login to SauseDemo', async function () {
    await sauseDemo.waitForSauseDemoHeader();
});


When('Select Demo One', async function () {
    await sauseDemo.selectInventoryItem('Sauce Labs Backpack');
    await sauseDemo.selectAddToCartButton();
    await sauseDemo.selectCartButton();
    // await page.pause()
});

Then('Validate', async function () {
    await page.pause()

});

When('Check Item in cart', async function () {
    if (sauseDemo.waitForSauseDemoItem('Sauce Labs Backpack')) {
        await sauseDemo.selectCheckoutButton();
    }
})


Then('Fill the details', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});

Then('Checkout from cart', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});

