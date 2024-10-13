import { expect, test } from '@playwright/test';
import { LoginPage } from "../pom/LoginPage";
import { MediaLibraryTab } from "../pom/MediaLibraryTab";
import { UploadWidget } from "../pom/UploadWidget";
import { Asset } from "../pom/Asset";

test('Automation QE task', async ({ page }) => {
    const username = process.env.USERNAME || '';
    const password = process.env.PASSWORD || '';
    const loginPage = new LoginPage(page);
    if (!(loginPage.isValidEmail(username))) {
        throw new Error('Username is incorrect!');
    }
    else if (!(loginPage.isValidPassword(password))) {
        console.log(loginPage.isValidPassword(password));
        throw new Error('Password is incorrect!');
    }

    await test.step('Login to a testable cloudinary staging account', async() => {
        await page.goto('https://staging.cloudinary.com/users/login');
        await loginPage.loginModal.waitFor();
        await loginPage.enterUserDetails(username,password);
    });

    await test.step('Go to the Media Library Assets Tab', async() => {
        await page.goto('https://console-staging.cloudinary.com/console/media_library/search?q=&view_mode=mosaic');
        const mediaLibraryTab = new MediaLibraryTab(page);
        await mediaLibraryTab.assetTab.waitFor();
    });
    const uploadWidget = new UploadWidget(page);
    await test.step('Upload image via the Upload Widget', async () => {
        await uploadWidget.openUploadWidget();
        const generateRandomString = (length: number) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                result += charset[randomIndex];
            }
            return result;
        };

        const randomString = generateRandomString(7);
        await uploadWidget.setPublicId(randomString);
        await uploadWidget.uploadImageAsset();

        /**
         * Validates the uploaded operation of the asset was successful
         */
        const asset = new Asset(page);
        const uploadedAsset = page.locator(`//img[@data-test-specifier="${randomString}"]`);
        await uploadedAsset.waitFor();
        await uploadedAsset.click({button: "right", force: true});
        await asset.openButton.click({button: "left", force: true});
        expect(await asset.titleName.innerText()).toMatch(randomString);
    });

    // Close browser after test
    await page.close();
});