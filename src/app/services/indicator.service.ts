import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
} from "@angular/common/http";

import { UploadFile } from "ng-zorro-antd";
import { NzMessageService } from "ng-zorro-antd/message";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { FilterDto } from "./dto/filter.dto";

@Injectable({
  providedIn: "root",
})
export class IndicatorService {
  private baseUrl = environment.apiBaseUrl;

  private fileList: UploadFile[] = null;
  private filters: FilterDto = null;
  private uploading = false;
  private dataResponse: any = null;
  private selectedData: { [key: string]: boolean } = null;
  private indicatorSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private msg: NzMessageService) {}
  private nexSubject() {
    this.indicatorSubject.next({
      files: this.fileList,
      filters: this.filters,
      dataResponse: this.dataResponse,
      selectedData: this.selectedData,
    });
  }
  clearIndicatorData() {
    this.fileList = null;
    this.filters = null;
    this.dataResponse = null;
    this.indicatorSubject.next(null);
  }
  setSelectedData(selectedData) {
    this.selectedData = selectedData;
    this.nexSubject();
  }
  setFileUplpadList(files: UploadFile[]) {
    this.fileList = files;
    this.nexSubject();
  }
  setFilters(filters: FilterDto) {
    this.filters = filters;
    this.nexSubject();
  }
  setLoadedData(dataResponse: any) {
    this.dataResponse = dataResponse;
    this.nexSubject();
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
  public downloadInidicators(indicatorsList, format) {
    let param;
    if (format === "xlsx") param = "format=xlsx";
    else param = "format=docx";

    return this.http.post(
      this.baseUrl + "/indicator/download?" + param,
      indicatorsList,
      { responseType: "blob", observe: "response" }
    );
  }

  handleUpload() {
   const formData = new FormData();
   formData.append(
      "filter",
      new Blob(
        [JSON.stringify(this.filters ? this.filters : new FilterDto())],
        { type: "application/json" }
      )
    );
    const file: any = this.fileList[0];
    formData.append("file", file);
    const req = new HttpRequest<any>(
      "POST",
      this.baseUrl + "/indicator/upload",
      formData,
      {
        reportProgress: true,
      }
    );
    return this.http.request(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.getErrorMessage(error);
        console.log(errorMsg);
        this.msg.error("upload failed.");
        return throwError(errorMsg);
      })
    );
  }
  getErrorMessage(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return errorMessage;
  }

  getThemes() {
    return this.http.get<string[]>(this.baseUrl + "/indicator/themes").pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.getErrorMessage(error);
        console.log(errorMsg);
        this.msg.error("loading themes failed.");
        return throwError(errorMsg);
      })
    );
  }

  getFilters(): Observable<FilterDto> {
    return this.http.get<FilterDto>(this.baseUrl + "/indicator/filters").pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.getErrorMessage(error);
        console.log(errorMsg);
        this.msg.error("loading filters failed.");
        return throwError(errorMsg);
      })
    );
  }
}
