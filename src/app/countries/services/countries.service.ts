import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  get httpParams(): HttpParams {
    return new HttpParams().set(
      'fields',
      'name,capital,flags,population,cca2,cca3'
    );
  }

  cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([]))
      // delay(1000),
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${environment.countriesApiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries }))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${environment.countriesApiUrl}/capital/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries }))
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${environment.countriesApiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries }))
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${environment.countriesApiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
