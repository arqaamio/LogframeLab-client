import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = "http://localhost:8082";

  constructor(private http:HttpClient) {
  }

  public getBaseUrl(){
    return this.baseUrl;
  }

  public downloadInidicators(indicatorsList){
    return this.http.post(this.baseUrl + '/indicator/download',indicatorsList,
    {responseType: "blob",observe: 'response'} );
  }

}
