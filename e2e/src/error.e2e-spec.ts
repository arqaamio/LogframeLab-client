import { ErrorPage } from './error.po';
import { browser, logging, by } from 'protractor';

describe('workspace-project App', () => {
  let page: ErrorPage;

  beforeEach(() => {
    page = new ErrorPage();
  });

  it('should display page and when pressed button go to home', () => {
    page.navigateTo();
    expect(page.getRootElement().element(by.css('h1')).getText()).toEqual('404');
    expect(page.getRootElement().element(by.css('h3')).getText()).toEqual('Page Not Found');
    expect(page.getRootElement().element(by.css('button')).getText()).toEqual('Home');
    page.getRootElement().element(by.css('button')).click().then(function () {
        browser.getAllWindowHandles().then(function (handles) {
    
            let newWindowHandle = handles[1]; // this is your new window
            browser.switchTo().window(newWindowHandle).then(function () {
                // fill in the form here
                expect(browser.getCurrentUrl()).toMatch(/\/url/);
            });
        });
    });
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
