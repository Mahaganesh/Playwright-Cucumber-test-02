import { Before, Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import SetmoreLogin  from '../page/app.page'
import { page } from "../support/hooks";




setDefaultTimeout(60 * 1000);

let setmoreLogin: SetmoreLogin;

Before(async function () {
    if (!page) {
        throw new Error("Page is not initialized.");
    }
    setmoreLogin = new SetmoreLogin(page);
});

Given('Login to Setmore', async function () {
    console.log("Waiting")
    // await page.pause()
    await this.setmoreLogin.waitForSetmoreCalenderSideButton();
});


When('Select Contacts Component', async function () {
    await this.setmoreLogin.setmoreContactsComponent()
});


Then('Perform search', async function () {
    return 'passed';
});


