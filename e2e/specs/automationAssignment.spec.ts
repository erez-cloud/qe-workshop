import {chromium, expect, test} from '@playwright/test';
import { LoginPage } from "../pom/LoginPage";
import { MediaLibraryTab } from "../pom/MediaLibraryTab";
import { UploadWidget } from "../pom/UploadWidget";

test('Automation QE task', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = process.env.USERNAME || '';
    const password = process.env.PASSWORD || '';

    await test.step('Login to a testable cloudinary staging account', async() => {
        await page.goto('https://staging.cloudinary.com/users/login');
        const loginPage = new LoginPage(page);
        await loginPage.loginModal.waitFor();
        await loginPage.enterUserDetails(username,password);

        // validate successful login
        const primaryMenu = page.locator('//*[@data-test="primary-menu"]')
        await primaryMenu.waitFor();
    });

    await test.step('Go to the Media Library Assets Tab', async() => {
        await page.goto('https://console-staging.cloudinary.com/console/media_library/search?q=&view_mode=mosaic');
        const mediaLibraryTab = new MediaLibraryTab(page);
        await mediaLibraryTab.assetTab.waitFor();
    });
    const uploadWidget = new UploadWidget(page);
    await test.step('Upload image via the Upload Widget', async () => {
        //const uploadWidget = new UploadWidget(page);
        await uploadWidget.OpenUploadWidget();
        // Generate a random string to be the name for the asset
        const generateRandomString = length => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                result += charset[randomIndex];
            }
            return result;
        };

        const randomString = generateRandomString(7);
        await uploadWidget.SetPublicId(randomString);
        await uploadWidget.UploadImageAsset();

        /**
         * Validates the uploaded operation was successful
         */
        const uploadedAsset = page.locator(`//img[@data-test-specifier="${randomString}"]`);
        await uploadedAsset.waitFor();

        // clicks the asset action menu to open asset
        await uploadedAsset.click({button: "right", force: true});
        const openSelectedAsset = page.locator('//div[@data-test="action-manage-btn"]').last();
        await openSelectedAsset.waitFor();
        await openSelectedAsset.click({button: "left", force: true});

        // validates the name of the new asset
        const assetTitle = await page.locator('//div[@data-test="asset-title"]').innerText();
        expect(assetTitle).toMatch(randomString);
    });

    // Close browser after test
    await browser.close();
});