import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map, reduce, tap } from 'rxjs';
import { ApiService } from 'src/api.service';
import { Payment, PaymentByStatus } from 'src/payments/models/payment.type';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private paymentsSubject$: BehaviorSubject<Payment[]> = new BehaviorSubject<
    Payment[]
  >([]);
  payments$ = this.paymentsSubject$.asObservable();
  fetchingPayments$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {
    this.fetchPayments();
  }

  private fetchPayments(): void {
    this.fetchingPayments$.next(true);
    this.apiService
      .fetchPayments()
      .pipe(finalize(() => this.fetchingPayments$.next(false)))
      .subscribe((payments) => {
        this.paymentsSubject$.next(payments);
      });
  }

  public getPaymentsByStatus(): Observable<PaymentByStatus[]> {
    return this.payments$.pipe(
      map((payments) => {
        return payments.reduce((acc: PaymentByStatus[], payment: Payment) => {
          const existingStatus = acc.find(
            (item: PaymentByStatus) => item.status === payment.status
          );

          if (existingStatus) {
            existingStatus.count++;
          } else {
            acc.push({
              status: payment.status,
              count: 1,
            });
          }

          return acc;
        }, []);
      })
    );
  }
}
