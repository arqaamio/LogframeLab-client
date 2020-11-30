import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserManagementService } from './service/user-management.service';
import { of } from 'rxjs/internal/observable/of';
import { FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { GroupDto } from '../services/dto/group.dto';
import { AuthenticationService } from '../services/authentication.service';
import { UserDTO } from './service/userdto';
import { HttpResponse } from '@angular/common/http';


describe('UserManagementComponent', () => {
    let component: UserManagementComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<UserManagementComponent>;
    let userManagementService: UserManagementService;
    let authenticationService: AuthenticationService;
    let messageService: NzMessageService;

    const GROUP_OPTIONS: GroupDto[] = [{id:1, name: 'SEC_ADMIN'}, {id:2, name: 'INDICATOR_ADMIN'}, {id:3, name: 'APP_USER'}];
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, CommonModule, NzGridModule,
                NzTableModule,
                NzButtonModule,
                NzFormModule,
                ReactiveFormsModule,
                NzInputModule,
                NzModalModule,
                NzPopconfirmModule,
                NzSelectModule,
                FormsModule,
                NoopAnimationsModule,
                NzMessageModule
            ],
            providers: [],
            declarations: [UserManagementComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(UserManagementComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        userManagementService = TestBed.inject(UserManagementService);
        authenticationService = TestBed.inject(AuthenticationService);
        messageService = TestBed.inject(NzMessageService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create user management service', () => {
        expect(userManagementService).toBeTruthy();
    });

    it('should create authentication service', () => {
        expect(authenticationService).toBeTruthy();
    });

    it('should retrieve the groups and users', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const spyUserGroups = spyOnProperty(authenticationService, 'userGroups', 'get').and.returnValue(of(GROUP_OPTIONS));
        const spyUsers = spyOn(userManagementService, 'getUsers').and.returnValue(of(sampleUsers()));
        component.ngOnInit();
        expect(spyUserGroups).toHaveBeenCalled();
        expect(spyUsers).toHaveBeenCalled(); 
        expect(component.groupOptions).toEqual(GROUP_OPTIONS);
        expect(component.dataset).toEqual(sampleUsers());
    }));

    it('should retrieve users and refresh user table', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const spyUsers = spyOn(userManagementService, 'getUsers').and.returnValue(of(sampleUsers()));
        component.refreshUserTable();
        expect(spyUsers).toHaveBeenCalled(); 
        expect(component.dataset).toEqual(sampleUsers());
    }));

    it('should concat groups', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const groups: string[] = ['SEC_ADMIN', 'INDICATOR_ADMIN', 'APP_USER'];
        const result = component.userGroups(groups);
        expect(result).toEqual('SEC_ADMIN, INDICATOR_ADMIN, APP_USER');

        const result1 = component.userGroups([groups[0]]);
        expect(result1).toEqual('SEC_ADMIN');
        
        const result2 = component.userGroups([]);
        expect(result2).toEqual('');
    }));

    it('should add user', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        component.addUser();
        expect(component.visible).toBe(true);
        expect(component.newUserForm.get('username').enabled).toBe(true);
        expect(component.selectedGroups).toEqual([]);
    }));

    it('should edit user', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const user: UserDTO = sampleUsers()[0];
        component.groupOptions = GROUP_OPTIONS;
        component.editUser(user);
        expect(component.visible).toBe(true);
        expect(component.newUserForm.get('username').value).toBe('username');
        expect(component.newUserForm.get('username').enabled).toBe(false);
        expect(component.selectedGroups).toEqual([1]);
    }));

    it('should delete user', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const user: UserDTO = sampleUsers()[0];
        const spyDelete = spyOn(userManagementService, 'deleteUserByUsername').and.returnValue(of());
        component.dataset = sampleUsers();
        component.deleteUser(user);
        expect(spyDelete).toHaveBeenCalledWith(user.username);
    }));

    it('should not delete user and show error message', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const user: UserDTO = sampleUsers()[0];
        const spyDelete = spyOn(userManagementService, 'deleteUserByUsername');
        const spyError = spyOn(messageService, 'error');
        component.dataset = [sampleUsers()[0]];
        component.deleteUser(user);
        expect(spyDelete).not.toHaveBeenCalledWith(user.username);
        expect(spyError).toHaveBeenCalled();
    }));

    it('should validate form', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        component.ngOnInit();
        expect(component.newUserForm).toBeDefined();
        const result: ValidationErrors = component.passwordsMatch(component.newUserForm);
        // expect(result).toEqual({ passwordMismatch: false });
        expect(result).toBeUndefined();

        component.newUserForm.get('password').setValue('password')
        const result2: ValidationErrors = component.passwordsMatch(component.newUserForm);
        expect(result2).toEqual({ passwordMismatch: true });

        component.newUserForm.get('passwordConfirm').setValue('fakepassword')
        const result3: ValidationErrors = component.passwordsMatch(component.newUserForm);
        expect(result3).toEqual({ passwordMismatch: true });

        component.newUserForm.get('passwordConfirm').setValue('password')
        const result4: ValidationErrors = component.passwordsMatch(component.newUserForm);
        // expect(result4).toEqual({passwordMismatch: false});
        expect(result4).toBeUndefined();
    }));

    it('should submit form and save user', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        // start form        
        component.ngOnInit();
        const spyError = spyOn(messageService, 'error').and.callThrough();
        const spyCreateUser = spyOn(authenticationService, 'provisionUser').and.returnValue(of(new HttpResponse()));
        const spyUser = spyOn(userManagementService, 'getUsers').and.returnValue(of(sampleUsers()));
        component.newUserForm.get('username').setValue('username');
        component.newUserForm.get('password').setValue('password');
        component.newUserForm.get('passwordConfirm').setValue('password');
        component.selectedGroups = [1,2];
        component.submit();
        expect(spyError).not.toHaveBeenCalled();
        expect(spyCreateUser).toHaveBeenCalled();
        expect(spyUser).toHaveBeenCalled();
        validateCancel();
    }));

    it('should try to submit error but show error message', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        // start form        
        component.ngOnInit();
        const spyError = spyOn(messageService, 'error').and.callThrough();
        // const spyUser = spyOn(authenticationService, 'provisionUser').and.returnValue(of({}));
        const spyUser = spyOn(authenticationService, 'provisionUser').and.callThrough();
        component.selectedGroups = [];

        component.submit();
        expect(spyError).toHaveBeenCalled();
        expect(spyUser).not.toHaveBeenCalled();
        component.newUserForm.get('username').setValue('username');
        component.newUserForm.get('password').setValue('password');
        component.submit();
        expect(spyError).toHaveBeenCalled();
        expect(spyUser).not.toHaveBeenCalled();

        component.newUserForm.get('passwordConfirm').setValue('fakepassword');
        component.submit();
        expect(spyError).toHaveBeenCalled();
        expect(spyUser).not.toHaveBeenCalled();

        component.newUserForm.get('passwordConfirm').setValue('password');
        component.submit();
        expect(spyError).toHaveBeenCalled();
        expect(spyUser).not.toHaveBeenCalled();
    }));

    it('should hide popup of edit and clear fields', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        // start form
        component.ngOnInit();
        component.selectedGroups = [1];
        component.visible = true;
        component.newUserForm.get('username').setValue('username');
        component.newUserForm.get('password').setValue('password');
        component.newUserForm.get('passwordConfirm').setValue('password');
        component.cancel();
        validateCancel();
    }));

    function validateCancel(): void {
        expect(component.visible).toBe(false);
        expect(component.newUserForm.get('username').value).toBeNull();
        expect(component.newUserForm.get('password').value).toBeNull();
        expect(component.newUserForm.get('passwordConfirm').value).toBeNull();
        expect(component.selectedGroups).toEqual([]);
    }

    function sampleUsers(): UserDTO[] {
        return [{username:'username', groups: ['SEC_ADMIN']}, {username:'username_2', groups: ['SEC_ADMIN', 'APP_USER']}];
    }
});