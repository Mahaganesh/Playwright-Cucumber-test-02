import { Page } from 'playwright';
import ElementUtil from '../utils/elements-utils';

class SetmoreLogin {
    private page: Page;
    private elementUtil: ElementUtil;
    private setmoreLoginEmail: string;
    private setmoreLoginPassword: string;
    private setmoreLoginButton: string;
    private setmoreCalendarSideButton: string;

    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtil(page);
        this.setmoreLoginEmail = '//input[@class="email-field"]';
        this.setmoreLoginPassword = '//input[@class="password-field"]';
        this.setmoreLoginButton = '//a[@id="login-now"]';
        this.setmoreCalendarSideButton = '//button[@data-testid="sidebar-trigger"]';
    }

    async waitForSetmoreLoginEmailField() {
        return this.elementUtil.elementIsVisible(this.setmoreLoginEmail);
    }

    async waitForSetmoreLoginPasswordField() {
        return this.elementUtil.elementIsVisible(this.setmoreLoginPassword);
    }

    async waitForSetmoreLoginButton() {
        return this.elementUtil.elementIsVisible(this.setmoreLoginButton);
    }

    async waitForSetmoreCalenderSideButton() {
        return this.elementUtil.waitForElementToBeVisible(this.setmoreCalendarSideButton);
    }

    async setmoreLoginPageEmailField(email: string): Promise<void> {
        return this.elementUtil.fill(this.setmoreLoginEmail, email);
    }

    async setmoreLoginPagePasswordField(password: any): Promise<void> {
        return this.elementUtil.fill(this.setmoreLoginPassword, password);
    }

    async setmoreLoginPageButton(): Promise<void> {
        return this.elementUtil.trigger(this.setmoreLoginButton);
    }
}

module.exports = SetmoreLogin;