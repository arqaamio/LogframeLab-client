describe('Submit indicators Page', ()=> {
    const BASE_URL = Cypress.config().baseUrl;
    
    beforeEach(()=> {       
        cy.server();

        cy.visit('/indicators-upload');
    });

    it('should display', ()=> {
        cy.contains('Click to download template for indicators upload');
        cy.contains('Click or drag indicators file to this area');
        cy.contains('Upload');
    });

    it('should download template', () => {
    });

    it('should upload indicators', () => {

    });
});