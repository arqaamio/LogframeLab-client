import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpRequest,
} from '@angular/common/http';

import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { FilterDto } from './dto/filter.dto';
import { IndicatorResponse } from '../models/indicatorresponse.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NumIndicatorSectorLevel } from '../models/numindicatorsectorlevel.model';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  private baseUrl = environment.apiBaseUrl;
  private fileList: NzUploadFile[] = null;
  private filters: FilterDto = null;
  public dataResponse: any = null;
  public statementData: any[] = [];
  public selectedData: { [key: string]: boolean } = null;
  private indicatorSubject = new BehaviorSubject<any>(null);
  public exportSvg = new BehaviorSubject<any>(null);
  public canvasJson: any= [];
  private nextButtonSubject = new BehaviorSubject<any>(null);
  private isNewInfo: boolean = true;
  private nextButton: boolean = false;
  public currentStep: number = 0;
  public loadingStart = new BehaviorSubject<any>(false);
  private visualizationCanvas: any = null;

  constructor(private http: HttpClient, private msg: NzMessageService) {}
  private nextSubject() {
    this.indicatorSubject.next({
      files: this.fileList,
      filters: this.filters,
      dataResponse: this.dataResponse,
      selectedData: this.selectedData,
      isNewInfo: this.isNewInfo,
    });
  }


  clearIndicatorData() {
    this.filters = null;
    this.dataResponse = null;
    this.fileList = this.selectedData = null;
    this.isNewInfo = true;
    this.indicatorSubject.next(null);
    this.exportSvg.next(null);
    this.currentStep = 0;
    this.canvasJson = [];
    this.statementData =  [];
  }

  setSelectedData(selectedData) {
    this.selectedData = selectedData;
    this.nextSubject();
  }
  setFileUploadList(files: NzUploadFile[]) {
    this.fileList = files;
    this.nextSubject();
  }
  setFilters(filters: FilterDto) {
    this.filters = filters;
    this.nextSubject();
  }
  setLoadedData(dataResponse: any) {
    this.dataResponse = dataResponse;
    this.nextSubject();
  }

  /**
   * Updates the value of next button and sends it to its subscribers
   * @param value New value of the next button
   */
  updateNextButton(value: boolean): boolean {
    this.nextButton = value;
    this.nextButtonSubject.next({'enabled': this.nextButton});
    this.nextSubject();
    return this.nextButton;
  }

  /**
   * Sends for the button to be pressed
   * @param force Force pressing of the button
   */
  pressNextButton(force?: boolean): void {
    this.nextButtonSubject.next({'press': true, 'force': force});
  }

  /**
   * Returns the next button subject
   */
  getNextButtonSubject(): BehaviorSubject<any> {
    return this.nextButtonSubject;
  }
  /**
   * Updates the isNewInfo which tells if there was changes in the search
   * @param value Value to which the isNewInfo will be updated to
   * @returns The new value in isNewInfo
   */
  setIsNewInfo(value: boolean): boolean{
    this.isNewInfo = value;
    return this.isNewInfo;
  }
  clearIndicatorSubject() {
    this.indicatorSubject.next(null);
  }
  getIndicatorSubject() {
    return this.indicatorSubject;
  }
  public getBaseUrl() {
    return this.baseUrl;
  }

  public downloadIndicators(indicatorsList, format): Observable<HttpResponse<Blob>> {
    return this.http.post(
      this.baseUrl + "/indicator/download?format=" + format,
      indicatorsList,
      { responseType: 'blob', observe: 'response' }
    );
  }

  /**
   * Requests the backend to scan the document and return the found indicators.
   * File must be a .doc or a .docx
   * @param file File to be sent with the request
   */
  uploadFile(file) {
   const formData = new FormData();
   formData.append(
      'filter',
      new Blob(
        [JSON.stringify(this.filters ? this.filters : new FilterDto())],
        { type: 'application/json' }
      )
    );
   formData.append('file', file);
   const req = new HttpRequest<any>(
      'POST',
      this.baseUrl + '/indicator/upload',
      formData,
      {
        reportProgress: true,
      }
    );
   return this.http.request(req);
  }

  getFilters(all: boolean): Observable<FilterDto> {
    return this.http.get<FilterDto>(this.baseUrl + '/indicator/filters'+ (all ? '?all=1' : ''));
  }

  /**
   * Requests to the backend to return indicators that match the filters.
   * If no filters are provided then all indicators are returned.
   * @param filtersDto Indicator's filters
   */
  public getIndicators(filtersDto?: FilterDto): Observable<IndicatorResponse[]> {
    let url:string = this.getBaseUrl() + '/indicator';
    let args:string = '';

    if(filtersDto!= null){
      if(filtersDto.crsCode != null && filtersDto.crsCode.length > 0)
        args+='crsCodes=' + filtersDto.crsCode.map((x)=>x.id).join(', ')+'&';


      filtersDto.level.forEach(element => {
        args+='levels='+element.id+'&';
      });

      if(filtersDto.sdgCode != null && filtersDto.sdgCode.length > 0)
        args+='sdgCodes=' + filtersDto.sdgCode.map((x)=>x.id).join(', ')+'&';

      if(filtersDto.source != null && filtersDto.source.length > 0)
        args+='sources=' + filtersDto.source.map((x)=>x.id).join(', ')+'&';

      filtersDto.sector.forEach(element => {
        args+='sectors='+element+'&';
      });
    }
    if(args!= '') {
      // Remove the last extra &
      url+='?' + args.slice(0, -1);
    }

    return this.http.get<IndicatorResponse[]>(url);
  }

  /**
   * Requests to the backend to return template of given format
   * @param format Template format
   */
  public downloadTemplate(format: string): Observable<HttpResponse<Blob>> {
    return this.http.get(
      this.baseUrl + "/indicator/template/" + format,
      { responseType: 'blob', observe: 'response' }
    );
  }
  getWorldBankCountries():Observable<Map<string, string>> {
    return this.http.get<Map<string, string>>(this.baseUrl + '/worldbank/country');
  }

  getWorldBankBaselineValue(indicatorId:number, countryCode:string, year:number):Observable<any> {
    return this.http.get(this.baseUrl + '/worldbank/values?countryId='+countryCode+'&indicatorId='+indicatorId+'&years=' + year);
  }

  /**
   * Retrieves the total number of indicators in the database
   */
  public getTotalNumIndicators(): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/indicator/total-number');
  }

  /**
   * Retrieves the count of indicators per sector and level
   */
  public getIndicatorsByLevelAndSector(): Observable<NumIndicatorSectorLevel[]> {
    return this.http.get<NumIndicatorSectorLevel[]>(this.baseUrl + '/indicator/sector-level-count');
  }

  /**
   * Init the visualization canvas
   */
  initVisualization() {
    this.visualizationCanvas = null;
   }

   /**
    * Save canvas visualization status
    * @param visualizationCanvas
    */
   saveVisulalizationStatus(visualizationCanvas){
    this.visualizationCanvas = visualizationCanvas;
   }

   /**
    * get Canvas visulization
    */
   getCanvasVisualization(){
    return this.visualizationCanvas;
   }
}
