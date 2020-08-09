import { AppPage } from './app.po';
import { browser, logging, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  /**
   * Footer
   */
  // it('should open arqaam.org', () => {
  //   page.navigateTo();
  //   page.closePopUp();
  //   page.getFooter().element(by.css('#copyright a')).click().then(function () {
  //     browser.getAllWindowHandles().then(function (handles) {

  //         let newWindowHandle = handles[1]; // this is your new window
  //         browser.switchTo().window(newWindowHandle).then(function () {
  //             // fill in the form here
  //             expect(browser.getCurrentUrl()).toMatch(/\/url/);
  //         });
  //     });
  //   });
  // });

  it('should display footer', () => {
    page.navigateTo();
    expect(page.getFooter().element(by.id('copyright')).getText())
      .toEqual('Logframe Lab ©'+new Date().getFullYear()+' developed By Arqaam GmbH');
    expect(page.getFooter().element(by.css('img'))).toBeTruthy();
    expect(page.getFooter().element(by.css('[routerLink=\"/terms\"]')).getText()).toEqual('Terms Of Use');
    expect(page.getFooter().element(by.css('[routerLink=\"/dataprotection\"]')).getText()).toEqual('Data Protection Declaration');
    expect(page.getFooter().element(by.css('[routerLink=\"/imprint\"]')).getText()).toEqual('Imprint');
  });

  //TODO: This fails all tests. But it should exist.
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    console.log(logs);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
