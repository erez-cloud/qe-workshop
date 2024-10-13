import { Locator } from "@playwright/test";

/**
 * POM to handle an asset
 */
export class Asset {
    public openButton: Locator;
    public titleName: Locator;

    constructor(page) {
        this.openButton = page.locator('//div[@data-test="action-manage-btn"]').last();
        this.titleName = page.locator('//div[@data-test="asset-title"]');
    }
}