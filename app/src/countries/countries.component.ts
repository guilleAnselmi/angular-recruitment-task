import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from 'src/reusable/list/list.component';
import { Country } from 'src/countries/models/country.type';
import { Observable } from 'rxjs';
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
export class CountriesComponent {
  countriesService: CountriesService = inject(CountriesService);
  countries$: Observable<Country[]> = this.countriesService.countries$;
  isLoading$: Observable<boolean> = this.countriesService.fetchingCountries$;
  title = 'Manage Countries';
  placeholder = 'Search Countries';
  notFoundMessage = 'No Countries found...';
}
