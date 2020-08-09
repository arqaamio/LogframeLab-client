import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getRootElement(){
    return element(by.css('app-root'))
  }
  getTitleText() {
    return element(by.css('app-root')).getText() as Promise<string>;
  }
  getLayout(){
    return element(by.css('app-root nz-layout')).getText() as Promise<string>;
  }
  getFooter() {
    return element(by.css('app-root nz-layout nz-footer'));
  }
  closePopUp(){
    element(by.css('app-root app-pop nz-layout button')).click();
  }

  getContentElement(){
    return element(by.css('app-root nz-layout nz-content'));
  }
}
