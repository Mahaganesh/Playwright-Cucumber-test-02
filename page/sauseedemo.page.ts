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
    private sauseDemoCartButton: string;
    private sauseDemoAddtoCartButton: string;
    private sauseDemoCheckoutButton: string; 

    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        this.sauseDemoLoginEmail = '//input[@id="user-name"]';  // wait on line:32 and action on line:54
        this.sauseDemoLoginPassword = '//input[@id="password"]';  // wait on line:36 and action on line:59
        this.sauseDemoLoginButton = '//input[@id="login-button"]';  // wait on line:40 and action on line:64
        this.sauseDemoHeader = '//div[@class="app_logo"]';  // wait on line:44 and action on line:70
        this.sauseDemoCartButton = '//a[@data-test="shopping-cart-link"]'
        // this.sauseDemo
        this.sauseDemoAddtoCartButton = '//button[@id="add-to-cart"]'  // wait on line:48 and action on line:75
        this.sauseDemoCheckoutButton = '//button[@id="checkout"]'
    }

    private getInventoryItemSelector(itemName: string): string {
        return `//div[@data-test='inventory-item-name' and text()='${itemName}']`;
    }

    // Waiting for element to be visible 

    async waitForSauseDemoLoginEmailField() {
        return this.elementUtil.elementIsVisible(this.sauseDemoLoginEmail);
    }

    async waitForSauseDemoLoginPasswordField() {
        return this.elementUtil.elementIsVisible(this.sauseDemoLoginPassword);
    }

    async waitForSauseDemoLoginButton() {
        return this.elementUtil.elementIsVisible(this.sauseDemoLoginButton);
    }

    async waitForSauseDemoHeader() {
        return this.elementUtil.waitForElementToBeVisible(this.sauseDemoHeader);
    }

    async waitForSauseDemoCartButton() {
        return this.elementUtil.waitForElementToBeVisible(this.sauseDemoCartButton)
    }

    async waitForSauseDemoAddToCardButton() {
        return this.elementUtil.elementIsVisible(this.sauseDemoAddtoCartButton);
    }

    async waitForSauseDemoItem(itemName: string) {
        return this.getInventoryItemSelector(itemName)
    }

    async waitForSauseDemoCheckoutButton() {
        return this.elementUtil.elementIsVisible(this.sauseDemoCheckoutButton);
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
        await this.elementUtil.trigger(selector); 
    }

    async selectCartButton() {
        await this.elementUtil.trigger(this.sauseDemoCartButton)
    }

    async  selectAddToCartButton(): Promise<void> {
        await this.elementUtil.trigger(this.sauseDemoAddtoCartButton);
    }

    async selectCheckoutButton(): Promise<void> {
        await this.elementUtil.trigger(this.sauseDemoCheckoutButton);
    }
}

