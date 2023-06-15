import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from 'src/reusable/list/list.component';
import { Country } from 'src/countries/models/country.type';
import { Observable, map, of } from 'rxjs';
import { ApiService } from 'src/api.service';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';
import { CountryItemComponent } from './country-item/country-item.component';

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
  apiService = inject(ApiService);
  countries$: Observable<Country[]> = of([]);
  title = 'Manage Countries';
  placeholder = 'Search Countries';

  ngOnInit(): void {
    this.countries$ = this.apiService
      .fetchCountries()
      .pipe(map((val) => val.splice(0, 10)));
  }
}
