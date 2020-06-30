import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Sort} from '../../manage-indicators/utils/sort';
import {environment} from '../../../environments/environment';
import {IndicatorDto} from '../../manage-indicators/utils/indicator.dto';
import {PageDto} from '../../manage-indicators/utils/page.dto';
import {Observable} from 'rxjs';
import {FilterDto} from '../dto/filter.dto';

@Injectable({
  providedIn: 'root'
})
export class ManageIndicatorsService {
  private INDICATORS_URL = `${environment.apiBaseUrl}/indicators`;
  private INDICATORS_APPROVAL_URL = `${this.INDICATORS_URL}/approval`;

  constructor(private http: HttpClient) {
  }

  getIndicators(page: number, pageSize: number, filter: FilterDto, sortBy: Sort): Observable<HttpResponse<PageDto<IndicatorDto>>> {
    const url = this.INDICATORS_URL;

    let params = new HttpParams().append('page', String(page)).append('pageSize', String(pageSize));

    if (sortBy && sortBy.direction && sortBy.property) {
      params = params.append('sortBy.property', sortBy.property).append('sortBy.direction', sortBy.direction);
    }

    filter.themes.forEach(theme => params = params.append('filters.themes', theme));
    filter.crsCode.forEach(code => params = params.append('filters.crs_code', code));
    filter.sdgCode.forEach(code => params = params.append('filters.sdg_code', code));
    filter.levelIds.forEach(levelId => params = params.append('filters.levelIds', String(levelId)));
    filter.source.forEach(source => params = params.append('filters.source', source));

    return this.http.get<PageDto<IndicatorDto>>(url, {observe: 'response', params});
  }

  uploadIndicatorsFileForApproval(file: any): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.INDICATORS_URL}/upload`,
      formData,
      {
        observe: 'response',
        reportProgress: true
      });
  }

  getIndicatorsForApproval(page: number, pageSize: number, sortBy: Sort): Observable<HttpResponse<PageDto<IndicatorDto>>> {
    let url = `${this.INDICATORS_APPROVAL_URL}?page=${page}&pageSize=${pageSize}`;

    if (sortBy && sortBy.direction && sortBy.property) {
      url = `${url}&sortBy.property=${sortBy.property}&sortBy.direction=${sortBy.direction}`;
    }

    return this.http.get<PageDto<IndicatorDto>>(url, {observe: 'response'});
  }
}
