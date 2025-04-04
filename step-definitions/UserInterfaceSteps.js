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

Then(/^Card "?(\d+)"? is open$/, async (card) => {
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

When(/^I input random valid password, email, domain and accept the terms of use and click next button$/, 
    async () => {
    await firstCardPage.inputRandomPassword();
    await firstCardPage.inputRandomEmail();
    await firstCardPage.inputRandomDomainName();
    await firstCardPage.chooseRandomDomain();
    await firstCardPage.acceptTermsOfUse();
    await firstCardPage.clickNextButton();
});

When(/^I choose "?(\d+)"? random interests, upload image and click next button$/, async (num) => {
    await secondCardPage.uploadImage('resources/demo.jpg');
    await secondCardPage.unselectAllInterests();
    await secondCardPage.chooseRandomInterests(num);
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

Then(/^Timer starts from "(\d{2}):(\d{2}):(\d{2})"$/, async (hh, mm, ss) => {
    await homePage.clickLink();
    const timerValue = await firstCardPage.getTimerValue();
    const expectedTime = `${hh}:${mm}:${ss}`;
    assert.strictEqual(timerValue, expectedTime, `Expected timer to start from ${expectedTime}, but got ${timerValue}`);
});
