import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map } from 'rxjs';
import { Country } from '../models/country.type';
import { ApiService } from 'src/api.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countriesSubject$: BehaviorSubject<Country[]> = new BehaviorSubject<
    Country[]
  >([]);
  countries$ = this.countriesSubject$.asObservable();
  fetchingCountries$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {
    this.fetchCountries();
  }

  private fetchCountries(): void {
    this.fetchingCountries$.next(true);
    this.apiService
      .fetchCountries()
      .pipe(finalize(() => this.fetchingCountries$.next(false)))
      .subscribe((countries) => {
        this.countriesSubject$.next(countries);
      });
  }

  public getById(id: string): Observable<Country | undefined> {
    return this.countries$.pipe(
      map((countries: Country[]) =>
        countries.find((country) => country.id === id)
      )
    );
  }
}
