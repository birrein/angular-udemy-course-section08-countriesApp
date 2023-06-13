import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent {
  countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  searchByCapital(term: string): void {
    this.countriesService
      .searchCapital(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
