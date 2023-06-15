import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, reduce } from 'rxjs';
import { ApiService } from 'src/api.service';
import { Payment, PaymentByStatus } from 'src/payments/models/payment.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  paymentsSubject$: BehaviorSubject<PaymentByStatus[]> = new BehaviorSubject<
    PaymentByStatus[]
  >([]);
  payments$ = this.paymentsSubject$.asObservable();
  private searchTerm = '';

  constructor(private apiService: ApiService) {
    this.fetchPayments();
  }

  // TODO refactor this code is bad usage of reduce should use map and normal js reduce maybe
  groupPaymentsByStatus(
    payments$: Observable<Payment[]>
  ): Observable<PaymentByStatus[]> {
    return payments$.pipe(
      reduce((acc: PaymentByStatus[], payments: Payment[]) => {
        for (const payment of payments) {
          const existingStatus = acc.find(
            (item) => item.status === payment.status
          );

          if (existingStatus) {
            existingStatus.count++;
          } else {
            acc.push({
              status: payment.status,
              count: 1,
            });
          }
        }

        return acc;
      }, [])
    );
  }

  private fetchPayments(): void {
    this.apiService
      .fetchPayments()
      .pipe(this.groupPaymentsByStatus)
      .subscribe((payments) => this.paymentsSubject$.next(payments));
  }

  public getPaymentsFiltered(): Observable<PaymentByStatus[]> {
    return this.payments$.pipe(
      map((payments) => this.filterPayments(payments, this.searchTerm))
    );
  }

  private filterPayments(payments: PaymentByStatus[], term = '') {
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
