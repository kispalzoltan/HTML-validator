import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor(private http: HttpClient) { }

  validateHTML(htmlContent: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/html; charset=UTF-8'
    });

    return this.http.post<any>('https://validator.w3.org/nu/?out=json', htmlContent, { headers });
  }
}