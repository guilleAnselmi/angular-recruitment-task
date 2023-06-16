import { Route } from '@angular/router';
import { CountriesComponent } from 'src/countries/countries.component';
import { CountryViewComponent } from 'src/countries/country-view/country-view.component';
import { PaymentsComponent } from 'src/payments/payments.component';
import { UserViewComponent } from 'src/users/user-view/user-view.component';
import { UsersComponent } from 'src/users/users.component';

export const appRoutes: Route[] = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:id',
    component: UserViewComponent,
  },
  {
    path: 'countries',
    component: CountriesComponent,
  },
  {
    path: 'countries/:id',
    component: CountryViewComponent,
  },
  {
    path: 'payments',
    component: PaymentsComponent,
  },
];
