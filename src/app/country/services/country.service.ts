import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/countries-response';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  searchCountry(term: string): Observable<Country[]> {
    const url = `${environment.countriesApiUrl}/name/${term}`;
    return this.http.get<Country[]>(url);
  }
}
