import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../models/country.type';

@Component({
  selector: 'app-country-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-item.component.html',
  styleUrls: ['./country-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryItemComponent {
  @Input() country!: Country;
}
