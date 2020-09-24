import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/auth/users`);
  }
}
