describe('Approve indicators Page', ()=> {

    beforeEach(()=> {
        sessionStorage.setItem('shownDialog', 'true');
        cy.server();
        //cy.visit('/login?returnUrl=%2Fuser-management');
        cy.visit('/login');
        const jwtToken = {
            'token': 'faketoken',
            'tokentype': 'Bearer ',
            'groups': ['SEC_ADMIN', 'APP_USER', 'INDICATOR_ADMIN'],
            'expiryDuration': 3600000
        };
        cy.route('POST', '**/auth/login', jwtToken);

        const user: string = 'fakeuser';
        const password: string = 'fakepassword';
        cy.get('#username').type(user).should('have.value', user);
        cy.get('#password').type(password).should('have.value', password);

        cy.fixture('filters.json').as('filters');
        cy.route('**/indicator/filters', '@filters').as('filtersRoute');

        cy.fixture('indicatorResponse/poverty.json').as('indicator');
        cy.route('**/ml/similarity**', '@indicator');

        cy.contains('Login').click();
        cy.visit('/manage-indicators/approve-uploaded');
        cy.wait('@filtersRoute');
    });

    it('should display', ()=> {
        cy.contains('Approve selected');
        cy.contains('Disapprove selected');
        cy.contains('CRS Code');
        cy.contains('Data Source');
        cy.contains('Description');
        cy.contains('Disaggregation');
        cy.contains('Keywords');
        cy.contains('Name');
        cy.contains('SDG Code');
        cy.contains('Source');
        cy.contains('Source Verification');
        cy.contains('Sector');
        cy.contains('Level');
        
        cy.contains('Terms Of Use');
        cy.contains('Data Protection Declaration');
        cy.contains('Imprint');
        cy.contains('Logframe Lab ©'+new Date().getFullYear()+' developed by Arqaam GmbH');
    });

    it('should approve indicators', () => {

    });

    it('should disapprove indicators', () => {
    });

});