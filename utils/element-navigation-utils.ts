import { page } from "../support/hooks";
import ElementUtil from "./elements-utils";


export default class ElementUtilNavigation {
    private elementUtil1: ElementUtil;
    

    constructor() {
        this.elementUtil1 = new ElementUtil(page);

    }

    async name(element: any, value: string) {
        return this.elementUtil1.performAction(element, async (locator) => {await locator.goto(value)})
    }


}