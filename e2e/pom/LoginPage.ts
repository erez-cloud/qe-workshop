import { Locator } from "@playwright/test";

/**
 * POM to handle the login to a testable Cloudinary account
 */
export class LoginPage {
    public userNameInput: Locator;
    public userPasswordInput: Locator;
    public loginModal: Locator;
    public loginButton: Locator;

    constructor(page) {
        this.loginModal = page.locator('//*[@id="new_user_session"]');
        this.userNameInput = page.locator('//*[@id="user_session_email"]');
        this.userPasswordInput = page.locator('//*[@id="user_session_password"]');
        this.loginButton = page.locator('//button[@id="sign-in"]');
    }

    async enterUserDetails(username: string, password: string): Promise<void> {
        await this.userNameInput.fill(username);
        await this.userPasswordInput.fill(password);
        await this.loginButton.click();
    }
}