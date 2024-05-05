// performance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private http: HttpClient) { }

  // A betöltési idő mérésének függvénye
  measureLoadTime(url: string): Observable<any> {
    const startTime = performance.now(); // Elindítjuk az időmérést

    // Küldünk egy HTTP GET kérést a megadott URL-re
    return this.http.get(url, { observe: 'response' }).pipe(
      map(response => {
        const endTime = performance.now(); // Leállítjuk az időmérést a válasz megérkezésekor
        const loadTime = endTime - startTime; // Kiszámítjuk a betöltési időt milliszekundumban

        console.log(loadTime)
      }),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError('Hiba történt a HTTP kérés során.');
      })
    );
  }
}
