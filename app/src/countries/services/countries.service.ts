import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Country } from '../models/country.type';
import { ApiService } from 'src/api.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countriesSubject$: BehaviorSubject<Country[]> = new BehaviorSubject<
    Country[]
  >([]);
  countries$ = this.countriesSubject$.asObservable();
  private searchTerm = '';

  constructor(private apiService: ApiService) {
    this.fetchCountries();
  }

  private fetchCountries(): void {
    this.apiService
      .fetchCountries()
      .subscribe((countries) => this.countriesSubject$.next(countries));
  }

  public getCountriesFiltered(): Observable<Country[]> {
    return this.countries$.pipe(
      map((users) => this.filterUsers(users, this.searchTerm))
    );
  }

  private filterUsers(users: Country[], term = '') {
    const normalizedTerm = term.toString().replace(/\s/g, '').toLowerCase();

    return users.filter((Country) =>
      `${Country.code}${Country.name}${Country.someWeirdServerFieldNameWithCount}${Country.id}`
        .toLocaleLowerCase()
        .includes(normalizedTerm)
    );
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.countriesSubject$.next(this.countriesSubject$.getValue());
  }
}
