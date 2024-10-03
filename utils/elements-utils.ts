export default class ElementUtil {
    page: any;

    constructor(page: any) {
        this.page = page;
    }

    async trigger(element: string): Promise<void> {
        return this.performAction(element, async (locator) => {
            await locator.click();
        });
    }

    async gotoURL(url: string): Promise<void> {
        try {
            await this.page.goto(url, { waitUntil: "domcontentloaded" });
        } catch (error) {
            console.error(`Error navigating to URL: ${url}`, error);
        }
    }

    async fill(element: string, value: string): Promise<void> {
        return this.performAction(element, async (locator) => {
            await locator.fill(value);
        });
    }

    async waitForElementToBeVisible(element: string): Promise<void> {
        return this.performAction(element, async (locator) => { }, { state: "visible", timeout: 60 * 10000 });
    }

    async waitForElementToHidden(element: string): Promise<void> {
        let result;

        try {
            result = await this.page.waitForSelector(element, { state: "detached", timeout: 45000 });
        } catch (error) {
            console.error(`Error waiting for element to be hidden: ${element}`, error);
            throw { name: "ElementNotFoundError", message: `The Element ${element} was not hidden in the given time` };
        } finally {
            console.log(`Completed waiting for element: ${element}`);
        }

        return result;
    }

    async elementIsHidden(element: string): Promise<boolean> {
        return this.checkElementState(element, 'isHidden');
    }

    async elementIsDisabled(element: string): Promise<boolean> {
        return this.checkElementState(element, 'isDisabled');
    }

    async elementIsVisible(element: string): Promise<boolean> {
        return this.performAction(element, async (locator) => locator.isVisible(), { state: "visible", timeout: 60 * 10000 });
    }

    async getTextContent(element: string): Promise<string | null> {
        return this.performAction(element, async (locator) => locator.textContent());
    }

    async getAttributeValue(element: string, attribute: string): Promise<string | null> {
        return this.performAction(element, async (locator) => locator.getAttribute(attribute));
    }

    async getElementInputValue(element: string): Promise<string> {
        return this.performAction(element, async (locator) => locator.inputValue());
    }

    async getCursorFocusedElement(element: string): Promise<boolean> {
        return this.performAction(element, async (locator) => {
            // return locator.evaluate((field: ) => field === document.activeElement);
        });
    }

    async navigateTo(link: string): Promise<void> {
        try {
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                this.page.click(link)
            ]);
        } catch (error) {
            console.error(`Error navigating to link: ${link}`, error);
        }
    }

    async onHover(element: string): Promise<void> {
        return this.performAction(element, async (locator) => locator.hover());
    }

    async uploadFiles(element: string, value: string | string[]): Promise<void> {
        return this.performAction(element, async () => {
            await this.page.setInputFiles(element, value);
        });
    }

    // Utility method to minimize repetition for actions on elements
    async performAction(element: string, action: (locator: any) => Promise<any>, options = { state: "visible", timeout: 60 * 10000 }): Promise<any> {
        console.log('---------------------- for calender button')
        console.log(element)
        try {
            if (!element) {
                throw new Error('Element selector is undefined or empty');
            }

            const locator = this.page.locator(element);
            if (!locator) {
                throw new Error(`Locator for element '${element}' not found`);
            }

            await locator.waitFor(options);
            return await action(locator);
        } catch (error) {
            console.error(`Error performing action on element: ${element}`, error);
            throw error; // Rethrow the error for upstream handling
        }
    }

    // General method to check element states like isHidden, isDisabled, etc.
    async checkElementState(element: string, state: string): Promise<boolean> {
        try {
            const locator = this.page.locator(element);
            return await locator[state]();
        } catch (error) {
            console.error(`Error checking element state '${state}' for: ${element}`, error);
            return false;
        }
    }
}

