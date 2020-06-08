import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Sort} from "../utils/sort";
import {environment} from "../../../environments/environment";
import {IndicatorDto} from "../utils/indicator.dto";
import {PageDto} from "../utils/page.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageIndicatorsService {

  constructor(private http: HttpClient) {
  }

  getIndicators(page: number, pageSize: number, sortBy: Sort): Observable<HttpResponse<PageDto<IndicatorDto>>> {
    let url = `${environment.apiBaseUrl}/indicators?page=${page}&pageSize=${pageSize}`;

    if (sortBy && sortBy.direction && sortBy.property) {
      url = `${url}&sortBy.property=${sortBy.property}&sortBy.direction=${sortBy.direction}`;
    }

    return this.http.get<PageDto<IndicatorDto>>(url, {observe: 'response'});
  }
}
