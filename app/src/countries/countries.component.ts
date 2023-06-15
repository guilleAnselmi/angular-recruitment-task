import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from 'src/reusable/list/list.component';
import { Country } from 'src/countries/models/country.type';
import { Observable, map, of } from 'rxjs';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';
import { CountryItemComponent } from './country-item/country-item.component';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    ListItemComponent,
    CountryItemComponent,
  ],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countriesService = inject(CountriesService);
  countries$: Observable<Country[]> = of([]);
  title = 'Manage Countries';
  placeholder = 'Search Countries';

  ngOnInit(): void {
    this.countries$ = this.countriesService.getCountriesFiltered();
  }

  onSearch(searchTerm: string) {
    this.countriesService.search(searchTerm);
  }
}
