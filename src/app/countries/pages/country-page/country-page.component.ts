import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/countries-response';

@Component({
  selector: 'app-view-country',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent implements OnInit {
  country!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.countryService.getCountryByCode(id).subscribe((country) => {
    //     console.log(country);
    //   });
    // });

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countryService.getCountryByCode(id)),
        tap(console.log)
      )
      .subscribe((country) => (this.country = country[0]));
  }
}
