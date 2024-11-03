import { Page } from "@playwright/test";
import * as selectors from '../utils/locators.json';

export class LoginPage {

    constructor(private page: Page) { }

    async enterUserName(userName: string) {
        await this.page.locator(selectors.locators.userName).fill(userName);
    }

    async enterPassword(password:string){
        await this.page.locator(selectors.locators.password).fill(password);
    }

    async clickLogin(){
        await this.page.locator(selectors.locators.login).click();
    }

    async gotoLoginPage(){
        await this.page.locator(selectors.locators.loginPage).click();
    }
    
    async loginErrorMessage(){
        await this.page.locator(selectors.locators.loginErrorMessage)
    }

    async logout(){
        await this.page.locator(selectors.locators.logout).waitFor();
        await this.page.locator(selectors.locators.logout).click();
        
    }
    

    
}