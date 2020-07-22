import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IndicatorDto} from '../../utils/indicator.dto';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddNewIndicatorService {

  constructor(private http: HttpClient) {
  }

  createIndicator(indicator: IndicatorDto): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiBaseUrl}/indicators`,
      JSON.stringify(indicator),
      {observe: 'response'});
  }

  updateIndicator(indicator: IndicatorDto): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.apiBaseUrl}/indicators`, JSON.stringify(indicator), {observe: 'response'});
  }

  deleteIndicatorById(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.apiBaseUrl}/indicators/${id}`, {observe: 'response'});
  }
}
