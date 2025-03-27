import { Given, When, Then } from '@cucumber/cucumber';
import { assert } from 'chai';
import homePage from '../pages/HomePage';
import firstCardPage from '../pages/FirstCardPage';
import secondCardPage from '../pages/SecondCardPage';
import thirdCardPage from '../pages/ThirdCardPage';

Given(/^I navigate to home page$/, async () => {
    await homePage.isPageOpened();
});

When(/^I click the link to next page$/, async () => {
    await homePage.clickLink();
});

Then(/^Card (\d+) is open$/, async (card) => {
    if (card === 1) {
        await firstCardPage.isPageOpened();
        assert.strictEqual(await firstCardPage.isRightCardOpen(), card.toString(), 'Card 1 is not open');
    } else if (card === 2) {
        await secondCardPage.isPageOpened();
        assert.strictEqual(await secondCardPage.isRightCardOpen(), card.toString(), 'Card 2 is not open');
    } else if (card === 3) {
        await thirdCardPage.isPageOpened();
        assert.strictEqual(await thirdCardPage.isRightCardOpen(), card.toString(), 'Card 3 is not open');
    }
});

When(/^I input (.+), (.+), (.+) and accept the terms of use and click next button$/, 
    async (password, email, domainName) => {
    await firstCardPage.inputValidPassword(password);
    await firstCardPage.inputValidEmail(email);
    await firstCardPage.inputDomainName(domainName);
    await firstCardPage.chooseDomain();
    await firstCardPage.acceptTermsOfUse();
    await firstCardPage.clickNextButton();
});

When(/^I choose 2 interests, upload image and click next button$/, async () => {
    await secondCardPage.uploadImage('resources/demo.jpg');
    await secondCardPage.unselectAllInterests();
    await secondCardPage.chooseInterest();
    await secondCardPage.clickNextButton();
});

When(/^I hide help form$/, async () => {
    await homePage.clickLink();
    await firstCardPage.hideHelpForm();
});

Then(/^Form content is hidden$/, async () => {
    assert.isTrue(await firstCardPage.isHelpFormHidden(), 'Form content is not hidden');
});

When(/^I accept cookies$/, async () => {
    await homePage.clickLink();
    await firstCardPage.acceptCookies();
});

Then(/^Form is closed$/, async () => {
    assert.isTrue(await firstCardPage.checkCookiesAreAccepted(), 'Form is not closed');
});

Then(/^Timer starts from (\d{2}):(\d{2}):(\d{2})$/, async (hh, mm, ss) => {
    await homePage.clickLink();
    const timerValue = await firstCardPage.getTimerValue();
    assert.strictEqual(timerValue, `${hh}:${mm}:${ss}`, 'Timer does not start from 00:00:00');
});
