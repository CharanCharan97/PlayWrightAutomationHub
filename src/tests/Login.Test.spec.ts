import test, { Page, BrowserContext, BrowserContextOptions, expect } from "@playwright/test";
import { LoginPage } from "../pages/Loginpages";
import * as appdata from "../data/appdata.json";
import * as selectors from "../utils/locators.json";
import { Helper } from "../utils/helper";
import { log } from "console";


test.describe("Login Feature", { tag: '@login' }, async () => {

    let loginPage: LoginPage;
    let context: BrowserContext;
    let page: Page;
    let url: any
    let helper: Helper;

    test.beforeAll(async ({ browser, baseURL }) => {
        context = await browser.newContext();
        page = await context.newPage();
        url = baseURL;
        loginPage = new LoginPage(page);
        helper = new Helper(page);
        await page.goto(url);
        await loginPage.gotoLoginPage();
    })

    test('Enter the valid username and Invalid password verify the error message', async () => {
        await loginPage.enterUserName(appdata.loginCredentials.userName);
        await loginPage.enterPassword(appdata.loginCredentials.invalidPassword);
        await loginPage.clickLogin();
        await expect.soft(page.locator(selectors.locators.loginErrorMessage)).toBeVisible();
    })

    test('Enter the Invalid username and Valid Password verify the error message', async () => {
        await loginPage.enterUserName(appdata.loginCredentials.userName);
        await loginPage.enterPassword(appdata.loginCredentials.invalidPassword);
        await loginPage.clickLogin();
        await expect.soft(page.locator(selectors.locators.loginErrorMessage)).toBeVisible();
    })

    test('Verify that user can able to login with both fields empty', async () => {
        await loginPage.enterUserName(" ");
        await loginPage.enterPassword(" ");
        await loginPage.clickLogin();

    })

    test('Verify that user can successfully login with valid credentials', async () => {
        await loginPage.enterUserName(appdata.loginCredentials.userName);
        await loginPage.enterPassword(appdata.loginCredentials.password);
        await loginPage.clickLogin();
        const verifyLogin = await helper.textContent(page.locator(selectors.locators.loggedIn));
        await expect.soft(verifyLogin).toBe(' Logged in as Charan');
        await loginPage.logout();
    })

    test.afterAll(async () => {
        await page.close();
        await context.close();
    })



})