describe('Submit indicators Page', ()=> {
    const BASE_URL = Cypress.config().baseUrl;
    const DOWNLOAD_ELEMTNT_STRING = 'Click to download template for indicators upload';
    beforeEach(()=> {       
        cy.server();

        cy.visit('/indicators-upload');
    });

    it('should display', ()=> {
        cy.contains(DOWNLOAD_ELEMTNT_STRING);
        cy.contains('Click or drag indicators file to this area');
        cy.contains('Upload');
    });

    it('should display help', ()=> {
        cy.get('.closeHelpIcon').should('not.exist');
        cy.get('#stepButton').should('be.visible');
        cy.get('#stepButton').click();
        cy.get('.closeHelpIcon').should('be.visible');
        cy.get('.closeHelpIcon').click();
        cy.get('.closeHelpIcon').should('not.exist');
    });
    
    /*it('should go to the feedback page', ()=> {
        cy.get('#feedbackButton').should('be.visible');
        cy.get('#feedbackButton').should('have.prop', 'href', 'https://feedback.logframelab.ai');
    });*/

    // it('should download template', () => {
    //     cy.route('**/indicator/template/xlsx', Cypress.Blob());
    //     cy.contains(DOWNLOAD_ELEMTNT_STRING).click().then(()=> {

    //     });

    // });

    // it('should upload indicators', () => {
    //     //cy.contains('Click or drag indicators file to this area')
    //     //  .attach_file('./food.jpg', 'image/jpg')
    //     //  .trigger('change', { force: true });
    //     const fileName = 'your_file_name.xlsx';
    //     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    //     const fileInput = 'input[type=file]';
    
    //     //cy.visit(testUrl);
    //     cy.upload_file(fileName, fileType, fileInput);
    // });
});