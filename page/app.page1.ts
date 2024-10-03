import { Page } from 'playwright'; import ElementUtil from '../utils/elements-utils';
export default class SetmoreLogin {
    private _page: Page; private _elementUtil: ElementUtil; private _setmoreLoginEmail: string; private _setmoreLoginPassword: string; private _setmoreLoginButton: string; private _setmoreCalendarSideButton: string;
    constructor(page: Page) { this._page = page; this._elementUtil = new ElementUtil(page); this._setmoreLoginEmail = '//input[@class="email-field"]'; this._setmoreLoginPassword = '//input[@class="password-field"]'; this._setmoreLoginButton = '//a[@id="login-now"]'; this._setmoreCalendarSideButton = '//button[@data-testid="sidebar-trigger"]'; }
    // Getter and Setter for page    get page(): Page {        return this._page;    }
    set page(newPage: Page) {
        if (newPage) {
            this._page = newPage; this._elementUtil = new ElementUtil(newPage);
            // Update elementUtil with new page context        
        } else {
            throw new Error("Invalid page object provided.");

        }
    }
    // Getter and Setter for setmoreLoginEmail    
    get setmoreLoginEmail(): string {
        return this._setmoreLoginEmail; // Access the private variable _setmoreLoginEmail    
    }
    set setmoreLoginEmail(emailSelector: string) {
        this._setmoreLoginEmail = emailSelector; // Assign to the private variable _setmoreLoginEmail  
    }
    // Getter and Setter for setmoreLoginPassword    get setmoreLoginPassword(): string {        return this._setmoreLoginPassword;    }
    set setmoreLoginPassword(passwordSelector: string) {
        this._setmoreLoginPassword = passwordSelector;
    }
    // Getter and Setter for setmoreLoginButton    get setmoreLoginButton(): string {        return this._setmoreLoginButton;    }
    set setmoreLoginButton(buttonSelector: string) {
        this._setmoreLoginButton = buttonSelector;
    }
    // Getter and Setter for setmoreCalendarSideButton    get setmoreCalendarSideButton(): string {        return this._setmoreCalendarSideButton;    }
    set setmoreCalendarSideButton(buttonSelector: string) {
        this._setmoreCalendarSideButton = buttonSelector;
    }
    // Methods using ElementUtil    
    async waitForSetmoreLoginEmailField() {
        return this._elementUtil.elementIsVisible(this.setmoreLoginEmail);
    }
    async waitForSetmoreLoginPasswordField() {
        return this._elementUtil.elementIsVisible(this.setmoreLoginPassword);
    }
    async waitForSetmoreLoginButton() {
        return this._elementUtil.elementIsVisible(this.setmoreLoginButton);
    }
    async waitForSetmoreCalenderSideButton() {
        return this._elementUtil.waitForElementToBeVisible(this.setmoreCalendarSideButton);
    }
    async setmoreLoginPageEmailField(email: string): Promise<void> {
        return this._elementUtil.fill(this.setmoreLoginEmail, email);
    }

    async setmoreLoginPagePasswordField(password: string): Promise<void> {
        return this._elementUtil.fill(this.setmoreLoginPassword, password);
    }
    async setmoreLoginPageButton(): Promise<void> {
        return this._elementUtil.trigger(this.setmoreLoginButton);
    }
}