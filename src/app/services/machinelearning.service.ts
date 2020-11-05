import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { SimilarityResponse } from '../models/similarityresponse.model';

@Injectable({
  providedIn: 'root',
})
export class MachineLearningService {
  private baseUrl = environment.apiBaseUrl + '/ml';

  constructor(private http: HttpClient, private msg: NzMessageService) {}
  
  public getSimilarIndicators(threshold: number): Observable<SimilarityResponse[]> {
    return this.http.get<SimilarityResponse[]>(this.baseUrl + '/similarity?threshold=' + threshold);
  }

  public validateStatement(statement: string, level: string): Observable<any>{
    return this.http.post<any>(this.baseUrl + '/statement-quality', {level: level, statement: statement});
  }
  
  public getStatements(file):  Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest<any>(
        'POST',
        this.baseUrl + '/statements',
        formData, {
          reportProgress: true,
        }
      );
    return this.http.request(req);
  }
}
