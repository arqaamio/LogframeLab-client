describe('Main Workflow without document', ()=> {
  const BASE_URL = Cypress.config().baseUrl;
  beforeEach(()=> {
    sessionStorage.setItem('shownDialog', 'true');

    cy.fixture('filters.json').as('filters');
    cy.fixture('indicatorResponse/allLevels.json').as('allLevelsIndicators');
    cy.fixture('indicatorResponse/poverty.json').as('povertyIndicators');
    cy.server();
    cy.route('GET', '**/indicator/filters', '@filters');
    cy.route('GET', '**/indicator', '@allLevelsIndicators');
    cy.route('GET', '**/indicator?sector=Poverty', '@povertyIndicators');      
    
    cy.visit('/');
  });

  it("should test workflow without document", () => {
      // Hide extra layer of spin
      cy.get('.ant-spin').invoke('attr', 'style', 'display:none !important');
      cy.get('.ant-spin-blur').invoke('attr', 'class', 'ant-spin-container ng-star-inserted');

      cy.contains('Filter by Sector').click();
      cy.contains('Poverty').click();
      cy.get('#nextButton').click({ force: true }).then(()=> {
        cy.contains('Level');
        cy.contains('Result Statement');
        cy.contains('Status');
        cy.contains('Score');
        cy.contains('Action');
        cy.get('#nextButton').should('be.visible');
        cy.contains('Done').should('not.be.visible');
        cy.contains('Add Statement').click();
        cy.get('[data-cy=statement]').click();
        const statement: string = 'New statement';
        cy.get('[data-cy=statement-input]').type(statement, );
        cy.get('[nzType="check-circle"]').click();  
        cy.contains('To validate a statement it must have a level set.');
        // cy.get(':nth-child(1) > :nth-child(1) > [data-cy=level-input] > .ant-select-selector').click();

        // cy.get('[data-cy=level-input]').click();
        // cy.get('[data-cy=level]').click();
        
        // cy.get('[data-cy=level-input]').click();
        // cy.get('[data-cy=level-input]').click();
        // cy.get('[nzType="plus-circle"]').click();  
        // cy.contains('IMPACT').click();
        // cy.get('[nzType="check-circle"]').click();  


      //   cy.contains('IMPACT').click();
      });
  });

});