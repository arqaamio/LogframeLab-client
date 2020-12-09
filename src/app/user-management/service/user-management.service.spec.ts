import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { UserManagementService } from './user-management.service';
import { UserDTO } from './userdto';

describe('AddNewIndicatorService', () => {
  let userManagementService: UserManagementService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserManagementService
      ],
    });
    userManagementService = TestBed.inject(UserManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should be created', () => {
    expect(userManagementService).toBeTruthy();
  });

  it('should retrieves users and return the Observable', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const users: UserDTO[] = [{username: 'username', groups: ['SEC_ADMIN']}];
    userManagementService.getUsers()
      .subscribe((response: UserDTO[]) => {
        expect(response).toBe(users);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/auth/users');
    expect(req.request.method).toBe('GET');
    req.flush(users);
    httpMock.verify();
  }));

  it('should delete user', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const username: string = 'username';
    const user: UserDTO = {username: 'username', groups: ['SEC_ADMIN']};
    userManagementService.deleteUserByUsername(username)
      .subscribe((response: UserDTO) => {
        expect(response).toBe(user);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/auth/users/'+username);
    expect(req.request.method).toBe('DELETE');
    req.flush(user);
    httpMock.verify();
  }));
});