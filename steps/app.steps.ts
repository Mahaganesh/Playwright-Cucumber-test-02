import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { page } from "../support/hooks";
import SetmoreLogin from "../page/app.page1";
// import SetmoreLogin  from '../page/app.page'




setDefaultTimeout(60 * 1000);

let setmoreLogin = new SetmoreLogin(page);

Given('Login to Setmore', async function () {
    console.log("Waiting")
    // await setmoreLogin.waitForSetmoreCalenderSideButton();

});


When('Select Contacts Component', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});


Then('Perform search', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});


