import { Component, OnInit } from '@angular/core';
// import { Region } from '../../enums/region';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent implements OnInit {
  countries: Country[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    console.log('🚀 ~ file: by-region-page.component.ts:13 ~ ByRegionPageComponent ~ regions:', this.regions);
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.countryService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
