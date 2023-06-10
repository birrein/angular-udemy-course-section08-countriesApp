import { Component, OnInit } from '@angular/core';
import { Region } from '../../enums/region';
import { Country } from '../../interfaces/countries-response';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styleUrls: ['./by-region.component.css'],
})
export class ByRegionComponent implements OnInit {
  regions = Region;
  activeRegion!: Region;
  countries: Country[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}

  activateRegion(region: Region) {
    if (region === this.activeRegion) {
      return;
    }
    this.activeRegion = region;
    this.countries = [];

    this.countryService
      .searchByRegion(region)
      .subscribe((countries) => (this.countries = countries));
  }
}
