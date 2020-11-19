import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  private baseUrl = environment.apiBaseUrl + '/source';

  constructor(private http: HttpClient) {}
  
  public getSources(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  public createSource(name:string): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl, {name: name});
  }

  public updateSource(id: number, name: string): Observable<any[]> {
    return this.http.put<any[]>(this.baseUrl, {id: id, name:name});
  }

  public deleteSource(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.baseUrl+'/'+id);
  }
}
