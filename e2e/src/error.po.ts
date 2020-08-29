import { browser, by, ElementFinder } from 'protractor';
import { AppPage } from './app.po';

export class ErrorPage {
    baseElement: ElementFinder;

    navigateTo() {
        let promise = browser.get(browser.baseUrl + 'a') as Promise<any>;
        this.baseElement = new AppPage().getContentElement().element(by.css('error'));
        return promise;
    }

    getRootElement() {
        return this.baseElement;
    }
}
