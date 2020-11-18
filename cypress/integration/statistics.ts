describe('Statistics Page', ()=> {
    const NUM_INDICATOR: number = 1000;

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

        cy.fixture('users.json').as('users');
        cy.route('**/auth/users', '@users');
        cy.route('**/indicator/total-number', NUM_INDICATOR.toString());
        cy.fixture('statistic.json').as('statistic');

        cy.route('**/statistic', '@statistic');
        cy.route('**/indicator/sector-level-count', []);

        cy.contains('Login').click().then(()=> {
            cy.visit('/statistics');
        });
    });

    it('should display', ()=> {
        cy.contains('Total number of indicators: '+ NUM_INDICATOR);
        cy.contains('Sector');
        cy.contains('IMPACT');
        cy.contains('OUTCOME');
        cy.contains('OUTPUT');
        cy.contains('TOTAL');
        
        cy.contains('Statistics');
        cy.contains('Date');
        cy.contains('DFID');
        cy.contains('PRM');
        cy.contains('WORD');
        cy.contains('XLSX');

        cy.contains('Terms Of Use');
        cy.contains('Data Protection Declaration');
        cy.contains('Imprint');
        cy.contains('Logframe Lab ©'+new Date().getFullYear()+' developed by Arqaam GmbH');
    });
});