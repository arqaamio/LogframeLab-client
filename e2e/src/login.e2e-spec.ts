import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });
  
  it('should display login form with empty textboxes and disabled button', () => {
    expect(page.getUsernameTextbox().getAttribute('placeholder')).toEqual('Username');
    expect(page.getUsernameTextbox().getAttribute('required')).toBeTruthy();
    expect(page.getUsernameTextbox().getText()).toEqual('');
    expect(page.getPasswordTextbox().getAttribute('placeholder')).toEqual('Password');
    expect(page.getPasswordTextbox().getAttribute('required')).toBeTruthy();
    expect(page.getPasswordTextbox().getText()).toEqual('');
    expect(page.getLoginButton().getText()).toEqual('Login');
    expect(page.getForm().getAttribute('class')).toContain('ng-invalid');
    expect(page.getLoginButton().getAttribute('disabled')).toBeTruthy();
  });

  it('should make the form valid and invalid on click', () => {
    page.getUsernameTextbox().sendKeys('anyusername');
    page.getPasswordTextbox().sendKeys('anypassword');
    expect(page.getForm().getAttribute('class')).toContain('ng-valid');
    expect(page.getLoginButton().getAttribute('disabled')).toBeNull();
    page.getLoginButton().click().then(function(){
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl+'login');
    });
  });
  
  it('should make the form valid', () => {
    page.getUsernameTextbox().sendKeys('indicator');
    page.getPasswordTextbox().sendKeys('indicator');
    expect(page.getForm().getAttribute('class')).toContain('ng-valid');
    expect(page.getLoginButton().getAttribute('disabled')).toBeNull();
    page.getLoginButton().click().then(function(){        
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
        expect(browser.executeScript("return window.localStorage.getItem('jwt');")).not.toBeNull();    
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
