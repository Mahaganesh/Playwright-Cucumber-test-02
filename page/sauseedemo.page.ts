import { Page } from 'playwright';
import ElementUtil from '../utils/elements-utils';
import sauseDemoLoginStore from '../store/sausedemo-store'; 

export default class SauseDemoLogin {
    private page: Page;
    private elementUtil: ElementUtil;

    // Selectors
    private sauseDemoLoginEmail: string;
    private sauseDemoLoginPassword: string;
    private sauseDemoLoginButton: string;
    private sauseDemoHeader: string;
    private sauseDemoContactsPage: string;

    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        this.sauseDemoLoginEmail = '//input[@id="user-name"]';
        this.sauseDemoLoginPassword = '//input[@id="password"]';
        this.sauseDemoLoginButton = '//input[@id="login-button"]';
        this.sauseDemoHeader = '//div[@class="app_logo"]';
    }

    private getInventoryItemSelector(itemName: string): string {
        return `//div[@data-test='inventory-item-name' and text()='${itemName}']`;
    }

    async waitForsauseDemoLoginEmailField() {
        return this.elementUtil.elementIsVisible(this.sauseDemoLoginEmail);
    }

    async waitForsauseDemoLoginPasswordField() {
        return this.elementUtil.elementIsVisible(this.sauseDemoLoginPassword);
    }

    async waitForsauseDemoLoginButton() {
        return this.elementUtil.elementIsVisible(this.sauseDemoLoginButton);
    }

    async waitForsauseDemoHeader() {
        return this.elementUtil.waitForElementToBeVisible(this.sauseDemoHeader);
    }


    // Action functions
    async sauseDemoLoginPageEmailField(email: string): Promise<void> {
        sauseDemoLoginStore.setEmail(email);
        await this.elementUtil.fill(this.sauseDemoLoginEmail, email);
    }

    async sauseDemoLoginPagePasswordField(password: string): Promise<void> {
        sauseDemoLoginStore.setPassword(password);
        await this.elementUtil.fill(this.sauseDemoLoginPassword, password);
    }

    async sauseDemoLoginPageButton(): Promise<void> {
        await this.elementUtil.trigger(this.sauseDemoLoginButton);
        const loginSuccess = true; 
        sauseDemoLoginStore.setLoginStatus(loginSuccess);
    }

    async selectInventoryItem(itemName: string): Promise<void> {
        const selector = this.getInventoryItemSelector(itemName);
        await this.elementUtil.trigger(selector); // Assuming `trigger` clicks on the element
    }

}

