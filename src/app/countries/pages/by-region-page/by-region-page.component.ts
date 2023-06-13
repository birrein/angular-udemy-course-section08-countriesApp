import { Component, OnInit } from '@angular/core';
import { Region } from '../../enums/region';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent implements OnInit {
  regions = Region;
  activeRegion!: Region;
  countries: Country[] = [];

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {}

  activateRegion(region: Region) {
    if (region === this.activeRegion) {
      return;
    }
    this.activeRegion = region;
    this.countries = [];

    this.countryService
      .searchRegion(region)
      .subscribe((countries) => (this.countries = countries));
  }
}
