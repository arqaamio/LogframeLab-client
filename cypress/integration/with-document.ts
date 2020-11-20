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
        cy.get('.ant-spin').invoke('attr', 'display', 'none !important');
        cy.get('.ant-spin-blur').invoke('attr', 'display', 'none !important');
        cy.get('.ant-spin').invoke('attr', 'display', 'none !important');
        

        cy.get('.ant-spin').then(function($input){
            $input[0].setAttribute('display', 'none !important')
          })

          cy.get('.ant-spin-blur').then(function($input){
            $input[0].setAttribute('display', 'none !important')
          })

        cy.contains('Filter by Sector').click({force: true});
        cy.contains('Poverty').click();
        cy.get('#nextButton').click({ force: true }).then(()=> {
          cy.contains('Level');
          cy.contains('Result Statement');
          cy.contains('Status');
          cy.contains('Score');
          cy.contains('Action');
          cy.get('#nextButton').should('be.visible');
          cy.contains('Done').should('not.be.visible');
          cy.contains('Add Statement').click({force: true});
          cy.get('[data-cy=statement]').click({force: true});
          const statement: string = 'New statement';
          cy.get('[data-cy=statement-input]').type(statement, {force: true});
          cy.get('[nzType="check-circle"]').click({force: true});  
          cy.contains('To validate a statement it must have a level set.');
          cy.get('[data-cy=level-input]').click({force: true});
          cy.get('[data-cy=level]').click({force: true});
          
          cy.get('[data-cy=level-input]').click({force: true});
          cy.get('[data-cy=level-input]').click({force: true});
          cy.get('[nzType="plus-circle"]').click({force: true});  

        //   cy.contains('IMPACT').click();
        });
    });
  
});