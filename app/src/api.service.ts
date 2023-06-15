import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment.development';
import { User } from './users/models/user.type';
import { Observable } from 'rxjs';
import { Country } from './countries/models/country.type';
import { Payment } from './payments/models/payment.type';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.API_URL;
  constructor(private httpClient: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }
  fetchCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/countries`);
  }
  fetchPayments(): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`${this.apiUrl}/payments`);
  }
}
