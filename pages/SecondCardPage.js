import BasePage from './BasePage';
import { Label } from '../framework/elements/Label';
import { Button } from '../framework/elements/Button';
import { FileUploader } from '../framework/elements/FileUploader';

class SecondCardPage extends BasePage {
    #card = new Label("//div[@class='page-indicator']", 'Card 2');
    #uploadImage = new FileUploader('.avatar-and-interests__upload-button', 'Upload Image');
    #unselectAll = new Label("//label[@for='interest_unselectall']", 'Unselect All');
    #interestByIndex = (index) => new Label(`(//span[@class="checkbox small"]//label)[${index}]`, 'Interests');
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
        await this.#unselectAll.click();
    }

    async chooseRandomInterests(number) {
        const selectedIndexes = new Set();
        const totalInterests = 20;
        const indexOfSelectAll = 18;
        while (selectedIndexes.size < number) {
            const randomIndex = Math.floor(Math.random() * totalInterests);
            if (randomIndex === indexOfSelectAll) continue;  
            if (!selectedIndexes.has(randomIndex)) {
                selectedIndexes.add(randomIndex);  
                const interest = this.#interestByIndex(randomIndex);
                await interest.click();
            }
        }
    }

    async clickNextButton() {
        await this.#nextButton.state().waitForDisplayed();
        await this.#nextButton.click();
    }
}

export default new SecondCardPage();
