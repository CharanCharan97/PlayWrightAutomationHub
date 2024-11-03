import { Locator, Page } from "@playwright/test";


export class Helper {
    constructor(private page: Page) { }

    async textContent(Element: Locator): Promise<string| null> {
        return await Element.textContent();
    }
}