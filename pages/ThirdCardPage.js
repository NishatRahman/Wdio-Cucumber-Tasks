import BasePage from './BasePage';
import { Label } from '../framework/elements/Label';

class ThirdCardPage extends BasePage {
    #card = new Label("//div[@class='page-indicator']", 'Card 3');

    constructor() {
        super('.personal-details', 'Third Card Page');
    }

    async isRightCardOpen() {
        return (await this.#card.getText()).charAt(0);
    }
}

export default new ThirdCardPage();
