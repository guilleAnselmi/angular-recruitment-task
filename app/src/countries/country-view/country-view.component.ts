import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Country } from '../models/country.type';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../services/countries.service';
import { CountryItemComponent } from '../country-item/country-item.component';

@Component({
  selector: 'app-country-view',
  standalone: true,
  imports: [CommonModule, CountryItemComponent],
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryViewComponent implements OnInit {
  country$: Observable<Country | undefined> = of(undefined);

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.country$ = this.countriesService.getById(id);
  }
}
