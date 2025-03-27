import BasePage from './BasePage';
import { Label } from '../framework/elements/Label';
import { Input } from '../framework/elements/Input';
import { Button } from '../framework/elements/Button';
import { ElementsList } from '../framework/elements/ElementsList';

class FirstCardPage extends BasePage {
    #card = new Label('//div[@class="page-indicator"]', 'Card 1');
    #passwordInput = new Input('//input[@placeholder="Choose Password"]', 'Password');
    #emailInput = new Input('//input[@placeholder="Your email"]', 'Email');
    #domainInput = new Input('//input[@placeholder="Domain"]', 'Domain');
    #dropdown = new Button('.dropdown__field', 'Dropdown');
    #dropdownList = new ElementsList(Button, "//div[@class='dropdown__list-item']", "Dropdown Items");
    #checkbox = new Label('.checkbox__label', 'Checkbox');
    #nextButton = new Button('.button--secondary', 'Next Button');
    #helpButton = new Button('//span[contains(text(), "Send")]', 'Help Button');
    #acceptCookiesButton = new Button('//button[contains(text(), "Not really")]', 'Accept Cookies');
    #timer = new Label('//div[@class="timer timer--white timer--center"]', 'Timer');

    constructor() {
        super('//div[@class="login-form"]', 'First Card Page');
    }

    async isRightCardOpen() {
        const text = await this.#card.getText();
        return text.charAt(0);
    }

    async inputValidPassword(password) {
        await this.#passwordInput.typeTextWithClear(password);
    }

    async inputValidEmail(email) {
        await this.#emailInput.typeTextWithClear(email);
    }

    async inputDomainName(domain) {
        await this.#domainInput.typeTextWithClear(domain);
    }

    async chooseDomain() {
        await this.#dropdown.click();
        const items = await this.#dropdownList.getListOfElements();
        if (items.length === 0) {
            throw new Error("No dropdown items found!");
        }
        const randomIndex = Math.floor(Math.random() * items.length);
        await items[randomIndex].click();
    }

    async acceptTermsOfUse() {
        await this.#checkbox.click();
    }

    async clickNextButton() {
        await this.#nextButton.state().waitForClickable();
        await this.#nextButton.click();
    }

    async hideHelpForm() {
        await this.#helpButton.click();
    }

    async isHelpFormHidden() {
        await browser.waitUntil(
            async () => (await this.#helpButton.state().isDisplayed()),
            {
                timeout: 15000,
                timeoutMsg: 'Help form is still visible after waiting for 15 seconds'
            }
        );
        return true;
    }

    async acceptCookies() {
        await this.#acceptCookiesButton.state().waitForDisplayed();
        await this.#acceptCookiesButton.click();
    }

    async checkCookiesAreAccepted() {
        return (!await this.#acceptCookiesButton.state().isDisplayed());
    }

    async getTimerValue() {
        await this.#timer.state().waitForDisplayed();
        return await this.#timer.getText();
    }
}

export default new FirstCardPage();
