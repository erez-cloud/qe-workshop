import { Locator, FrameLocator } from '@playwright/test';
import * as path from 'path';

/**
 * POM to handle the use of the Upload Widget
 */
export class UploadWidget {
    public uploadButton: Locator;
    public uwIframe: FrameLocator;
    public browseButton: Locator;
    public fileUploadInput: Locator;
    public advancedButton: Locator;
    public publicIdInput: Locator;
    public uploadPresetInput: Locator;
    public assetMenu: Locator;
    public openButton: Locator;
    public newAsset: Locator;

    constructor(page) {
        this.uploadButton = page.locator('//*[@data-test="upload-btn"]');
        this.uwIframe = page.frameLocator('//iframe[@data-test="uw-iframe"]')
        this.browseButton = this.uwIframe.locator('//*[@class="upload_button_holder"]');
        this.advancedButton = this.uwIframe.locator('//button[@data-test="btn-advanced"]');
        this.publicIdInput = this.uwIframe.locator('//input[@data-test="public-id"]');
        this.uploadPresetInput = this.uwIframe.locator('//*[contains(@class, "upload-preset")]');
        this.fileUploadInput = this.uwIframe.locator('//input[@class="cloudinary_fileupload"]');
        this.assetMenu = page.locator('//button[@data-test="popover-toggle-action-menu"]');
        this.openButton = page.locator('//button[@data-test="action-manage-btn"]');
    }

    /* open the Upload Widget */
    async OpenUploadWidget(): Promise<void> {
        await this.uploadButton.click();
        await this.browseButton.waitFor();
    }

    /* set the public id of the uploaded asset */
    async SetPublicId(publicId: string): Promise<void> {
        await this.advancedButton.click();
        await this.uploadPresetInput.waitFor();
        await this.publicIdInput.fill(publicId);
    }

    /* select the file and upload it to the test account */
    async UploadImageAsset(): Promise<void> {
        // select a file located in local storage
        const filePath = path.join('/Users/erezbaris/dev/qe-workshop/e2e/files-for-upload/cld-sample-5.jpg');
        const fileInput = this.fileUploadInput;
        await fileInput.setInputFiles(filePath);
    }

    async ValidateFileUploaded(): Promise<void> {
        await this.uwIframe.locator('//div[@data-test="show-completed-button"]').waitFor();
    }
}