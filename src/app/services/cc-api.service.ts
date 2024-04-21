import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CcApiService {
  public energyConsumption: string = '';
  public suggestion: string = '';
  public pledge: string = '';
  public userId: string = '';
  public fullName: string = '';
  public userRole: string = '';

  constructor(private http: HttpClient) {}

  postData(payload: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/calculate';
    return this.http.post(apiUrl, payload);
  }
}
