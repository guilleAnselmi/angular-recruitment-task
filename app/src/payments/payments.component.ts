import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsService } from './services/payments.service';
import { ListComponent } from 'src/reusable/list/list.component';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';
import { PaymentItemComponent } from './payment-item/payment-item.component';
import { Observable } from 'rxjs';
import { PaymentByStatus } from './models/payment.type';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    ListComponent,
    ListItemComponent,
    PaymentItemComponent,
  ],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
  paymentService = inject(PaymentsService);
  payments$: Observable<PaymentByStatus[]> =
  this.paymentService.getPaymentsByStatus();
  isLoading$: Observable<boolean> = this.paymentService.fetchingPayments$;
  title = 'Manage Payments';
  placeholder = 'Search Payments';
  notFoundMessage = 'Not Payments found...';


  
}
