import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Sort} from '../../manage-indicators/utils/sort';
import {environment} from '../../../environments/environment';
import {IndicatorDto} from '../../manage-indicators/utils/indicator.dto';
import {PageDto} from '../../manage-indicators/utils/page.dto';
import { Observable } from 'rxjs/internal/Observable';
import {FilterDto} from '../dto/filter.dto';
import {ApprovalDto} from '../../manage-indicators/utils/approval.dto';

@Injectable({
  providedIn: 'root'
})
export class ManageIndicatorsService {
  private INDICATORS_URL = `${environment.apiBaseUrl}/indicators`;
  private INDICATORS_APPROVAL_URL = `${this.INDICATORS_URL}/approvals`;

  constructor(private http: HttpClient) {
  }

  getIndicators(page: number, pageSize: number, filter: FilterDto, sortBy?: Sort): Observable<HttpResponse<PageDto<IndicatorDto>>> {
    const url = this.INDICATORS_URL;

    const params = this.prepParams(page, pageSize, filter, sortBy);

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

  getIndicatorsForApproval(page: number, pageSize: number, filter: FilterDto, sortBy?: Sort)
    : Observable<HttpResponse<PageDto<IndicatorDto>>> {
    const url = this.INDICATORS_APPROVAL_URL;

    const params = this.prepParams(page, pageSize, filter, sortBy);

    return this.http.get<PageDto<IndicatorDto>>(url, {observe: 'response', params});
  }

  processApprovals(approvals: ApprovalDto[]): Observable<HttpResponse<any>> {
    return this.http.post(this.INDICATORS_APPROVAL_URL,
      {approvals}, {observe: 'response', reportProgress: true});
  }

  private prepParams(page: number, pageSize: number, filter: FilterDto, sortBy: Sort) {
    let params = new HttpParams().append('page', String(page)).append('pageSize', String(pageSize));

    if (sortBy && sortBy.direction && sortBy.property) {
      params = params.append('sortBy.property', sortBy.property).append('sortBy.direction',
        sortBy.direction);
    }

    filter.sector.forEach(theme => params = params.append('filters.sector', theme));
    filter.crsCode.forEach(code => params = params.append('filters.crs_code', code));
    filter.sdgCode.forEach(code => params = params.append('filters.sdg_code', code));
    filter.levelIds.forEach(levelId => params = params.append('filters.levelIds', String(levelId)));
    filter.source.forEach(source => params = params.append('filters.source', source));
    return params;
  }
}
