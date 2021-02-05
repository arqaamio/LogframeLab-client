import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorldBankService {
  private baseUrl = environment.apiBaseUrl + '/worldbank';

  constructor(
    private http: HttpClient
  ) { }
  
  /**
   * Retrieves all the countries world bank indicators values are available in
   */
  getWorldBankCountries():Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(this.baseUrl + '/country');
  }

  /**
   * Retrieves world bank's baseline value for the indicator, country or also year
   * @param indicatorId Indicator ID
   * @param countryCode Country Code
   * @param year Year
   */
  getWorldBankBaselineValue(indicatorId:number, countryCode:string, year?:number):Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/values?countryId='+countryCode+'&indicatorId='+indicatorId+(year?'&years=' + year : ''));
  }
}