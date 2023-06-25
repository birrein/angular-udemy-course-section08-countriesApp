import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent implements OnInit {
  countries: Country[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  ngOnInit(): void {}

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
