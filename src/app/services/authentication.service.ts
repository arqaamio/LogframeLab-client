import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import {environment} from '../../environments/environment';
import {JwtDto} from './dto/jwt.dto';
import {catchError, map} from 'rxjs/operators';
import {GroupDto} from './dto/group.dto';
import {User} from '../user-management/service/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentJwt: Observable<JwtDto>;
  private JWT_KEY = 'jwt';
  private readonly currentJwtSubject: BehaviorSubject<JwtDto>;

  constructor(private http: HttpClient) {
    this.currentJwtSubject = new BehaviorSubject<JwtDto>(JSON.parse(localStorage.getItem(this.JWT_KEY)));
    this.currentJwt = this.currentJwtSubject.asObservable();
  }

  public get jwt$(): BehaviorSubject<JwtDto> {
    return this.currentJwtSubject;
  }

  login(username: string, password: string) {
    return this.http.post<JwtDto>(`${environment.apiBaseUrl}/auth/login`, JSON.stringify({
      username,
      password
    }),{
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }).pipe(
      map(jwt => {
        this.processJwt(jwt);
      }),
      catchError(catchError((error: HttpErrorResponse) => {
        const errorMsg = this.getErrorMessage(error);
        return throwError(errorMsg);
      })));
  }

  getErrorMessage(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return errorMessage;
  }

  // TODO send logout request to api
  logout(username?: string): void {
    localStorage.removeItem(this.JWT_KEY);
    this.currentJwtSubject.next(undefined);

  }

  renewJwt(jwt: string): void {
    const jwtDto = this.currentJwtSubject.value;
    jwtDto.token = jwt;
    this.processJwt(jwtDto);
  }

  get userGroups() {
    return this.http.get<GroupDto[]>(`${environment.apiBaseUrl}/auth/groups`, {
      headers: new HttpHeaders({
     'Content-Type':  'application/json'
    })});
  }

  provisionUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/users`, JSON.stringify(user),
     {
       observe: 'response',
       headers: new HttpHeaders({
      'Content-Type':  'application/json'
     })});
  }

  private processJwt(jwt: JwtDto) {
    localStorage.setItem(this.JWT_KEY, JSON.stringify(jwt));
    this.currentJwtSubject.next(jwt);
    this.currentJwt = this.currentJwtSubject.asObservable();
  }
}
