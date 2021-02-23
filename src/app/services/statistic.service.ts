import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private baseUrl = environment.apiBaseUrl + '/statistic';

  constructor(
    private http: HttpClient
  ) { }
  
  public getStatistics(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
