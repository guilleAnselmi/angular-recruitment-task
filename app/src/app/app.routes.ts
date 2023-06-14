import { Route } from '@angular/router';
import { CountriesComponent } from 'src/countries/countries.component';
import { PaymentsComponent } from 'src/payments/payments.component';
import { UsersComponent } from 'src/users/users.component';

export const appRoutes: Route[] = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'countries',
    component: CountriesComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
];
