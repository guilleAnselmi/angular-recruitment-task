import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiService } from 'src/api.service';
import { Payment } from 'src/payments/models/payment.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  paymentsSubject$: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>(
    []
  );
  payments$ = this.paymentsSubject$.asObservable();
  private searchTerm = '';

  constructor(private apiService: ApiService) {
    this.fetchPayments();
  }

  private fetchPayments(): void {
    this.apiService
      .fetchPayments()
      .subscribe((payments) => this.paymentsSubject$.next(payments));
  }

  public getPaymentsFiltered(): Observable<Payment[]> {
    return this.payments$.pipe(
      map((payments) => this.filterPayments(payments, this.searchTerm))
    );
  }

  private filterPayments(payments: Payment[], term = '') {
    const normalizedTerm = term.toString().replace(/\s/g, '').toLowerCase();

    return payments.filter((payment) =>
      `${payment.status}`.toLocaleLowerCase().includes(normalizedTerm)
    );
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.paymentsSubject$.next(this.paymentsSubject$.getValue());
  }
}
