import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  private baseUrl = environment.apiBaseUrl + '/source';

  constructor(
    private http: HttpClient
  ) { }
  
  /**
   * Retrieves all the sources
   */
  public getSources(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  /**
   * Creates a new source
   * @param name Name of the new source
   */
  public createSource(name:string): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl, {name: name});
  }

  /**
   * Updates with new name the source with id
   * @param id Id of the souce to be updated
   * @param name Updated name
   */
  public updateSource(id: number, name: string): Observable<any[]> {
    return this.http.put<any[]>(this.baseUrl, {id: id, name:name});
  }

  /**
   * Deletes source with id
   * @param id Id of the source to be deleted
   */
  public deleteSource(id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.baseUrl+'/'+id);
  }
}
