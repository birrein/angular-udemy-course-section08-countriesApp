import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries-response';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styleUrls: ['./by-country.component.css'],
})
export class ByCountryComponent {
  term: string = '';
  error: boolean = false;
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  search(term: string) {
    this.error = false;
    this.term = term;

    const result = this.countryService.searchByCountry(this.term);
    result.subscribe({
      next: (countries) => (this.countries = countries),
      error: (err) => {
        this.error = true;
        this.countries = [];
      },
    });
  }

  suggestions(term: string) {
    this.error = false;
    this.term = term;
  }
}
