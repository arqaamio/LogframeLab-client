describe('Login Page', ()=> {
    const BASE_URL = Cypress.config().baseUrl;
    
    beforeEach(()=> {       
        cy.server();

        cy.visit('/login');
        sessionStorage.clear();
    });

    it('should display', ()=> {
        cy.get('.login-button').contains('Login');
        cy.contains('You probably have clicked here by accident. You won\'t need to login to use Logframe Lab');
        cy.contains('Home');
        cy.contains('Terms Of Use');
        cy.contains('Data Protection Declaration');
        cy.contains('Imprint');
        cy.contains('Logframe Lab ©'+new Date().getFullYear()+' developed by Arqaam GmbH');
    });

    it('should login', () => {
        const jwtToken = {
            "token": "faketoken",
            "tokentype": "Bearer ",
            "groups": ["SEC_ADMIN", "APP_USER", "INDICATOR_ADMIN"],
            "expiryDuration": 3600000
        };
        cy.route('POST', '**/auth/login', jwtToken);

        // closing the Welcome to Logframelab popup
        cy.get('.ant-modal-close-x').click();

        const user: string = 'fakeuser';
        const password: string = 'fakepassword';
        cy.get('#username').type(user).should('have.value', user);
        cy.get('#password').type(password).should('have.value', password);

        cy.contains('Login').click();
        cy.url().should('equal', BASE_URL +'');
    });

    it('should give error since invalid login', () => {

        // closing the Welcome to Logframelab popup
        cy.get('.ant-modal-close-x').click();

        const user: string = 'fakeuser';
        const password: string = 'fakepassword';
        cy.get('#username').type(user).should('have.value', user);
        cy.get('#password').type(password).should('have.value', password);

        cy.contains('Login').click();

        cy.url().should('equal', BASE_URL+ 'login');
    });

    it('should give go to the main page', () => {
        // closing the Welcome to Logframelab popup
        cy.get('.ant-modal-close-x').click();

        cy.contains('Home').click();
        cy.url().should('equal', BASE_URL +'');
    });
});