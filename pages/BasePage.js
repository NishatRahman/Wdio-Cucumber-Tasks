import BaseElement from '../framework/elements/BaseElement';

export default class BasePage {
    constructor(selector, pageName) {
        this.uniqueElement = new BaseElement(selector, pageName);
        this.pageName = pageName;
    }

    async isPageOpened() {
        await this.uniqueElement.state().waitForDisplayed();
    }
}