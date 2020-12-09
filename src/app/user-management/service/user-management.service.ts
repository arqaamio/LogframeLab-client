import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { UserDTO } from "./userdto";
import {environment} from "../../../environments/environment";
import { Observable } from 'rxjs/internal/Observable';
import {catchError, shareReplay} from "rxjs/operators";
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${environment.apiBaseUrl}/auth/users`);
  }

  deleteUserByUsername(username: string): Observable<UserDTO> {
    return this.http.delete<UserDTO>(`${environment.apiBaseUrl}/auth/users/${username}`);
  }
}
