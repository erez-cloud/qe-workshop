import { Locator } from "@playwright/test";

/**
 * POM to handle the use of the Media Library Assets tab
 */
export class MediaLibraryTab {
    public assetTab: Locator;

    constructor(page) {
        this.assetTab = page.locator('//*[@data-test="tab-mediaLibraryAssets"]');
    }
}