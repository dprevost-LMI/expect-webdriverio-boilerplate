import { browser, $, expect } from '@wdio/globals'
import { Key } from 'webdriverio';

describe("toBePresent", () => {
  it("should open and close modal", async () => {
    await browser.url("https://ng-bootstrap.github.io/#/components/modal/examples");
    await $("button=Launch demo modal").click();
    const modal = $("ngb-modal-window");
    await expect(modal).toBeDisplayed();
    await browser.keys(Key.Escape);
    console.log('isModel still present?', await modal.isExisting());
    await expect(modal).not.toBePresent();
    console.log('Modal is not present anymore');
  });
});
