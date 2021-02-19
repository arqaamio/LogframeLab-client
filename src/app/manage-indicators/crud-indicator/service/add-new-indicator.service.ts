import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IndicatorDto } from '../../utils/indicator.dto';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Level } from 'src/app/services/dto/filter.dto';

export class IndicatorRequestDto {
  id: number;
  crsCode: Array<number>;
  dataSource: string;
  description: string;
  disaggregation: boolean;
  keywords: string;
  name: string;
  sdgCode: Array<number>;
  source: Array<number>;
  sourceVerification: string;
  sector: string;
  level: Level;
  levelId: number;
  keywordsList: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AddNewIndicatorService {

  constructor(
    private http: HttpClient
  ) { }

  createIndicator(indicator: IndicatorDto): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.apiBaseUrl}/indicators`,
      JSON.stringify(this.mapIndicatorToRequest(indicator)),
      {observe: 'response'});
  }

  updateIndicator(indicator: IndicatorDto): Observable<HttpResponse<any>> {
    return this.http.put(`${environment.apiBaseUrl}/indicators`, JSON.stringify(this.mapIndicatorToRequest(indicator)), {observe: 'response'});
  }

  deleteIndicatorById(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${environment.apiBaseUrl}/indicators/${id}`, {observe: 'response'});
  }
  
  /**
   * Map IndicatorDto to IndicatorRequestDto for API requests
   * @param indicator Indicator
   */
  private mapIndicatorToRequest(indicator: IndicatorDto): IndicatorRequestDto{
    return {
      id: indicator.id,
      crsCode: indicator.crsCode.map(x=>x.id),
      dataSource: indicator.dataSource,
      description: indicator.description,
      disaggregation: indicator.disaggregation,
      keywords: indicator.keywords,
      name: indicator.name,
      sdgCode: indicator.sdgCode.map(x=>x.id),
      source: indicator.source.map(x=>x.id),
      sourceVerification: indicator.sourceVerification,
      sector: indicator.sector,
      level: indicator.level,
      levelId: indicator.levelId,
      keywordsList: indicator.keywordsList
    };
  }
}
