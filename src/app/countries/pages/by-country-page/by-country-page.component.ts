import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent {
  error: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor(private countryService: CountriesService) {}

  search(term: string) {
    this.showSuggestions = false;

    this.countryService
      .searchCountry(term)
      .subscribe((countries) => (this.countries = countries));
  }

  suggestions(term: string) {
    this.error = false;

    if (term.trim().length === 0) {
      this.suggestedCountries = [];
      this.countries = [];
      this.showSuggestions = false;
      return;
    }
    this.showSuggestions = true;

    this.countryService.searchCountry(term).subscribe({
      next: (countries) => (this.suggestedCountries = countries.splice(0, 5)),
      error: (err) => (this.suggestedCountries = []),
    });
  }
}
