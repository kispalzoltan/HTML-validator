import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8080/api/users" // Az API útvonala

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // A GET kérés az API-hoz
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user); // A POST kérés az API-hoz
  }
}