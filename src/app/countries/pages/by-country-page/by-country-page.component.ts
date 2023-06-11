import { Component } from '@angular/core';
import { Country } from '../../interfaces/countries-response';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent {
  term: string = '';
  error: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor(private countryService: CountryService) {}

  search(term: string) {
    this.error = false;
    this.term = term;
    this.showSuggestions = false;

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

    if (term.trim().length === 0) {
      this.suggestedCountries = [];
      this.countries = [];
      this.showSuggestions = false;
      return;
    }
    this.showSuggestions = true;

    this.countryService.searchByCountry(term).subscribe({
      next: (countries) => (this.suggestedCountries = countries.splice(0, 5)),
      error: (err) => (this.suggestedCountries = []),
    });
  }
}
