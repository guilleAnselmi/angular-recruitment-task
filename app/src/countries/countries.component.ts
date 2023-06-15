import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from 'src/reusable/list/list.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule,ListComponent],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {}
