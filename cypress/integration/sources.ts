describe('Sources Page', ()=> {

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

        cy.fixture('sources.json').as('sources');
        cy.route('**/source', '@sources');
        cy.route('POST','**/source', {id:100, name:'A new source'});
        cy.route('PUT','**/source', {id:42, name:'A new source'});

        cy.contains('Login').click().then(()=> {
            cy.visit('/source');
        });
    });

    it('should display', ()=> {
        cy.contains('ID');
        cy.contains('Name');
        cy.contains('Action');
        cy.contains('Edit');
        cy.contains('Delete');

        cy.contains('Add Source');
        
        cy.contains('Terms Of Use');
        cy.contains('Data Protection Declaration');
        cy.contains('Imprint');
        cy.contains('Logframe Lab ©'+new Date().getFullYear()+' developed by Arqaam GmbH');
    });

    it('should create source', ()=> {
        const newSource: string = 'A new source';
        cy.contains('Add Source').click();
        cy.contains('Create/Edit Source');
        cy.contains('Cancel');
        cy.get('.ant-input').type(newSource);
        cy.get('.ant-input').should('have.value', newSource);
        cy.contains('OK').click();
        cy.get('.ant-modal-header').should('not.exist');
    });

    it('should edit source', ()=> {
        const newSource: string = 'A new source';
        cy.contains('Edit').click();
        cy.contains('Create/Edit Source');
        cy.contains('Cancel');
        cy.get('.ant-input').clear();
        cy.get('.ant-input').type(newSource);
        cy.get('.ant-input').should('have.value', newSource);
        cy.contains('OK').click();
        cy.get('.ant-modal-header').should('not.exist');
    });

    it('should delete source', ()=> {
        cy.contains('Delete').click();
        cy.contains('Are you sure you want to delete this source?');
        cy.contains('Cancel');
        cy.contains('OK').click();
        cy.get('.ant-modal-body').should('not.exist');
    });
});