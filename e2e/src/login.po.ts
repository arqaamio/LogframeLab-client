import { browser, by, ElementFinder } from 'protractor';
import { AppPage } from './app.po';

export class LoginPage {
  baseElement: ElementFinder;
  navigateTo() {
    let promise = browser.get(browser.baseUrl+'login') as Promise<any>;
    this.baseElement = new AppPage().getContentElement().element(by.css('app-signin'));
    return promise;
  }

  getBaseElement(): ElementFinder {
    return this.baseElement;
  }
  getTitleText() {
    return this.baseElement.element(by.css('form')).getText() as Promise<string>;
  }
  getForm(): ElementFinder {
    return this.baseElement.element(by.css('form'));
  }
  getUsernameTextbox(): ElementFinder {
    return this.baseElement.element(by.name('username'));
  }
  getPasswordTextbox(): ElementFinder {
    return this.baseElement.element(by.name('password'));
  }
  getLoginButton(): ElementFinder {
    return this.baseElement.element(by.css('button'));
  }
}
