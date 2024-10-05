import { Before, Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber"
import SetmoreLogin  from '../page/app.page'
import { page } from "../support/hooks";




setDefaultTimeout(60 * 1000);

let setmoreLogin: SetmoreLogin;


Before(async function () {
    if (!page) {
        throw new Error("Page is not initialized.");
    }
    // Initialize the SauseDemoLogin instance before each scenario
    setmoreLogin = new SetmoreLogin(page);
    this.setmoreLogin = setmoreLogin; // Attach to `this` for access in step definitions
});



Given('Login to Setmore', async function () {
    await this.setmoreLogin.waitForSetmoreCalenderSideButton();
});


When('Select Contacts Component', async function () {
    await this.setmoreLogin.setmoreContactsComponent()
});


Then('Perform search', async function () {
    return 'passed';
});


