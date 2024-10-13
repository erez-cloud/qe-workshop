import { Locator, Page } from "@playwright/test";

export class Button {
    private locator: Locator;

    constructor( page: Page, selector: string) {
        this.locator = page.locator(selector);
    }

    public async click() {
        await this.locator.click();
    }
}