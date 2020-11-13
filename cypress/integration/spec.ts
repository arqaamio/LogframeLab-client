describe('Home Page', ()=> {
  const BASE_URL = Cypress.config().baseUrl;
  beforeEach(()=> {

    cy.fixture('filters.json').as('filters');
    cy.fixture('indicatorResponse/allLevels.json').as('allLevelsIndicators');
    cy.fixture('indicatorResponse/poverty.json').as('povertyIndicators');
    cy.server();
    cy.route('GET', '**/indicator/filters', '@filters');
    cy.route('GET', '**/indicator', '@allLevelsIndicators');
    cy.route('GET', '**/indicator?sector=Poverty', '@povertyIndicators');
    
    cy.visit('/');
    sessionStorage.clear();
  });
  
  it("should display the selection tab", () => {
    // side buttons
    cy.get('#stepButton').should('be.visible');
    cy.get('#feedbackButton').should('be.visible');
    cy.get('#feedbackButton').should('be.visible');
    cy.get('#uploadButton').should('be.visible');
    
    cy.get('.dialog__close-btn').click();
    // top header
    cy.contains('SELECTION');
    cy.contains('RESULT');
    cy.contains('VISUALISATION');
    cy.contains('DOWNLOAD');
    
    cy.contains('Filter by Sector');
    cy.contains('Filter by sources');
    cy.contains('Filter by SDGs');
    cy.contains('Filter by levels');

    cy.contains('Sector:');
    cy.contains('Sources:');
    cy.contains('SDGs:');
    cy.contains('Levels:');

    cy.get('.disclaimerText').contains('Disclaimer: Uploading data here is safe. You can trust us with your info, because we never save it anywhere. The algorithm uses your text to scan for keywords and retains access to it only so you can complete the procedure. Your data is discarded as soon as you click ‘done’ in the last step, or if you refresh the window before you’re done. We cannot access your information at any point.');
    // cy.get('.ant-upload-text').contains('CLICK TO THIS AREA TO UPLOAD');
    cy.get('.ant-upload-hint').contains('Support for a single word file upload.')
    
    // buttons that shouldn't be visible
    cy.contains('Previous').should('not.be.visible');
    cy.contains('Done').should('not.be.visible');

    // legal information
    cy.contains('Data Protection Declaration');
    cy.contains('Imprint');
    cy.contains('Logframe Lab ©'+new Date().getFullYear()+' developed by Arqaam GmbH');
  });

  it("should go to the results tab without document", () => {
    cy.get('.dialog__close-btn').click();
    cy.contains('Filter by Sector').click();
    cy.contains('Poverty').click();
    cy.get('#nextButton').click({ force: true }).then(()=> {
      cy.contains('Level');
      cy.contains('Statement');
      cy.contains('Status');
      cy.contains('Score');
      cy.contains('Action');
      cy.get('#nextButton').should('be.visible');
      cy.contains('Done').should('not.be.visible');
    });
  });

  it('should display help', ()=> {
      cy.contains('Close').should('not.be.visible');
      cy.get('#stepButton').should('be.visible');
      cy.get('#stepButton').click();
      cy.contains('Close').should('be.visible');
      cy.contains('Close').click();
      cy.contains('Close').should('not.be.visible');
  });

  /*it('should go to the feedback page', ()=> {
      cy.get('#feedbackButton').should('be.visible');
      cy.get('#feedbackButton').should('have.prop', 'href', 'https://feedback.logframelab.ai');
  });*/
  it('should go to the upload indicators page', ()=> {
    cy.get('#uploadButton').should('be.visible');
    cy.get('#uploadButton').click();
    cy.url().should('equal', BASE_URL+ 'indicators-upload');
  });
});
