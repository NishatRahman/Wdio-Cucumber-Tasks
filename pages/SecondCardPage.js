import BasePage from './BasePage';
import { Label } from '../framework/elements/Label';
import { Input } from '../framework/elements/Input';
import { Checkbox } from '../framework/elements/Checkbox';
import { Button } from '../framework/elements/Button';
import { FileUploader } from '../framework/elements/FileUploader';

class SecondCardPage extends BasePage {
    #card = new Label("//div[@class='page-indicator']", 'Card 2');
    #uploadImage = new FileUploader('.avatar-and-interests__upload-button', 'Upload Image');
    #unselectAll = new Checkbox("//label[@for='interest_unselectall']", 'Unselect All');
    #checkBox1 = new Checkbox("//label[@for='interest_polo']", 'Polo');
    #checkBox2 = new Checkbox("//label[@for='interest_dough']", 'Dough');
    #checkBox3 = new Checkbox("//label[@for='interest_snails']", 'Snails');
    #nextButton = new Button("//button[text()='Next']", 'Next Button');

    constructor() {
        super('.avatar-and-interests', 'Second Card Page');
    }

    async isRightCardOpen() {
        return (await this.#card.getText()).charAt(0);
    }

    async uploadImage(filePath) {
        await this.#uploadImage.uploadFile(filePath);
    }

    async unselectAllInterests() {
        await this.#unselectAll.check();
    }

    async chooseInterest() {
        await this.#checkBox1.check();
        await this.#checkBox2.check();
        await this.#checkBox3.check();
    }

    async clickNextButton() {
        await this.#nextButton.state().waitForDisplayed();
        await this.#nextButton.click();
    }
}

export default new SecondCardPage();
