import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { UserManagementService } from './user-management.service';
import { User } from './user';

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
    const users: User[] = [{username: 'username', password: 'password', groupIds: [1,2,3]}];
    userManagementService.getUsers()
      .subscribe((response: User[]) => {
        expect(response).toBe(users);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/auth/users');
    expect(req.request.method).toBe('GET');
    req.flush(users);
    httpMock.verify();
  }));
});