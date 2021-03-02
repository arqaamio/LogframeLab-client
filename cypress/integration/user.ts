describe('User Page', ()=> {
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
        cy.route('**/auth/groups', [{'id':2,'name':'APP_USER'},{'id':3,'name':'INDICATOR_ADMIN'},{'id':1,'name':'SEC_ADMIN'}]);

        cy.contains('Login').click().then(()=> {
            cy.visit('/user-management');
        });
    });

    it('should display', ()=> {
        cy.contains('Add user');
        cy.contains('Edit user');
        cy.contains('Delete user');
        cy.contains('Terms Of Use');
        cy.contains('Data Protection Declaration');
        cy.contains('Imprint');
        cy.contains('Logframe Lab ©'+new Date().getFullYear()+' developed by Arqaam GmbH');
    });

    it('should create user', () => {
        cy.contains('Add user').click();
        const user: string = 'new user';
        const password: string = 'new password';
        cy.get('#username').wait(500).type(user).should('have.value', user);
        cy.get('#password').type(password).should('have.value', password);
        cy.get('#passwordConfirm').type(password).should('have.value', password);
        cy.get('#groups').click();
        cy.get('nz-option-item').contains('APP_USER').click();
        cy.get('nz-option-item').contains('INDICATOR_ADMIN').click();

        cy.route('POST', '**/auth/users', {'username':user,'groups':['APP_USER', 'INDICATOR_ADMIN']})
        cy.contains('Submit').click({force: true});

        cy.contains('APP_USER, INDICATOR_ADMIN');
    });

    it('should give error since empty creation of user', () => {
        cy.fixture('users.json').as('users');
        cy.route('**/auth/groups', [{'id':2,'name':'APP_USER'},{'id':3,'name':'INDICATOR_ADMIN'},{'id':1,'name':'SEC_ADMIN'}]);

        cy.contains('Add user').click();
        cy.contains('Submit').click({force: true});

        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#passwordConfirm').should('be.visible');
        cy.get('#groups').should('be.visible');
        cy.contains('Submit').should('be.visible');
    });

    it('should give test form and close it', () => {
        cy.fixture('users.json').as('users');
        cy.route('**/auth/groups', [{'id':2,'name':'APP_USER'},{'id':3,'name':'INDICATOR_ADMIN'},{'id':1,'name':'SEC_ADMIN'}]);

        cy.contains('Add user').click();
        // with username
        const user: string = 'new user';
        const password: string = 'new password';
        cy.get('#username').wait(500).type(user).should('have.value', user);

        cy.contains('Submit').click({force: true});

        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#passwordConfirm').should('be.visible');
        cy.get('#groups').should('be.visible');
        cy.contains('Submit').should('be.visible');

        // with username and password
        cy.get('#password').type(password).should('have.value', password);

        cy.contains('Submit').click({force: true});

        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#passwordConfirm').should('be.visible');
        cy.get('#groups').should('be.visible');
        cy.contains('Submit').should('be.visible');

        // with username, password and password confirm
        cy.get('#passwordConfirm').type(password).should('have.value', password);

        cy.contains('Submit').click({force: true});

        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#passwordConfirm').should('be.visible');
        cy.get('#groups').should('be.visible');
        cy.contains('Submit').should('be.visible');

        // close form
        cy.contains('Cancel').click();

        cy.get('.ant-modal-body').should('not.exist');
    });


    // it('should edit a user', () => {
    //     cy.fixture('users.json').as('users');
    //     cy.route('**/auth/groups', [{'id':2,'name':'APP_USER'},{'id':3,'name':'INDICATOR_ADMIN'},{'id':1,'name':'SEC_ADMIN'}]);

    //     cy.contains('Edit user').click();

    //     // with username
    //     const user: string = 'fakeuser';
    //     const password: string = 'new password';
    //     cy.get('#username').should('be.visible');
    //     cy.get('#password').should('be.visible');
    //     cy.get('#passwordConfirm').should('be.visible');
    //     cy.get('#groups').should('be.visible');
    //     cy.contains('Submit').should('be.visible');

    //     cy.get('#username').wait(500).should('have.value', user);
    //     cy.get('#groups').should('not.be.empty');
    //     cy.get('#username').should('be.disabled');

    //     // with username and password
    //     cy.get('#password').type(password).should('have.value', password);

    //     cy.contains('Submit').click({force: true});

    //     cy.get('#username').should('be.visible');
    //     cy.get('#password').should('be.visible');
    //     cy.get('#passwordConfirm').should('be.visible');
    //     cy.get('#groups').should('be.visible');
    //     cy.contains('Submit').should('be.visible');

    //     // with username, password and password confirm
    //     cy.get('#passwordConfirm').type(password).should('have.value', password);

    //     cy.contains('Submit').click({force: true});

    //     cy.get('#username').should('be.visible');
    //     cy.get('#password').should('be.visible');
    //     cy.get('#passwordConfirm').should('be.visible');
    //     cy.get('#groups').should('be.visible');
    //     cy.contains('Submit').should('be.visible');

    //     // close form
    //     cy.contains('Cancel').click();

    //     cy.get('.ant-modal-body').should('not.exist');
    // });

    it('should delete user', () => {
        // Cancel
        cy.contains('Delete user').click();
        cy.get('.ant-popover-inner-content').should('be.visible');
        cy.contains('Cancel').click();
        cy.get('.ant-popover-inner-content').should('not.exist');

        // Ok
        cy.contains('Delete user').click();
        cy.get('.ant-popover-inner-content').should('be.visible');
        cy.contains('OK').click();
        cy.get('.ant-popover-inner-content').should('not.exist');
    });
});