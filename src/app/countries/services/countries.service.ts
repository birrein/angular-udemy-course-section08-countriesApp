import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../enums/region';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  get httpParams(): HttpParams {
    return new HttpParams().set('fields', 'name,capital,flags,population,cca2');
  }

  constructor(private http: HttpClient) {}

  searchCountry(term: string): Observable<Country[]> {
    const url = `${environment.countriesApiUrl}/name/${term}`;
    return this.http
      .get<Country[]>(url, { params: this.httpParams })
      .pipe(catchError(() => of([])));
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${environment.countriesApiUrl}/capital/${term}`;
    return this.http
      .get<Country[]>(url, { params: this.httpParams })
      .pipe(catchError(() => of([])));
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${environment.countriesApiUrl}/region/${region}`;
    return this.http
      .get<Country[]>(url, { params: this.httpParams })
      .pipe(catchError(() => of([])));
  }

  getCountryByCode(code: string): Observable<Country> {
    const url = `${environment.countriesApiUrl}/alpha/${code}`;
    const res = this.http.get<Country>(url);
    return res;
  }
}
