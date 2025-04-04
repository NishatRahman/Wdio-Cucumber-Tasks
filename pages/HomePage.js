import BasePage from './BasePage';
import { Label } from '../framework/elements/Label';

class HomePage extends BasePage {
    #startLink = new Label('.start__link', 'Start Link');

    constructor() {
        super('//p[@class="start__paragraph" and contains(text(), "welcome")]', 'Welcome Message');
    }

    async clickLink() {
        await this.#startLink.click();
    }
}

export default new HomePage();
