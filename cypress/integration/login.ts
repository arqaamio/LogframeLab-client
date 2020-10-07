describe('Login Page', ()=> {
    const BASE_URL = Cypress.config().baseUrl;
    const API_BASE_URL = 'http://localhost:8080/';
    
    beforeEach(()=> {       
        cy.fixture('jwtToken.json').as('jwtToken');
        cy.server();

        cy.visit('/login');
        sessionStorage.clear();
    });

    it('should display', ()=> {
        cy.get('.login-button').contains('Login');
        cy.contains('Terms Of Use');
        cy.contains('Data Protection Declaration');
        cy.contains('Imprint');
        cy.contains('Logframe Lab ©'+new Date().getFullYear()+' developed by Arqaam GmbH');
    });

    it('should login', () => {
        cy.route('POST', API_BASE_URL + 'auth/login', '@jwtToken');

        // closing the Welcome to Logframelab popup
        cy.get('.dialog__close-btn').click();

        const user: string = 'fakeuser';
        const password: string = 'fakepassword';
        cy.get('#username').type(user).should('have.value', user);
        cy.get('#password').type(password).should('have.value', password);

        cy.contains('Login').click();
        cy.url().should('equal', BASE_URL +'');
    });

    it('should give error since invalid login', () => {

        // closing the Welcome to Logframelab popup
        cy.get('.dialog__close-btn').click();

        const user: string = 'fakeuser';
        const password: string = 'fakepassword';
        cy.get('#username').type(user).should('have.value', user);
        cy.get('#password').type(password).should('have.value', password);

        cy.contains('Login').click();

        cy.url().should('equal', BASE_URL+ 'login');
    });
});