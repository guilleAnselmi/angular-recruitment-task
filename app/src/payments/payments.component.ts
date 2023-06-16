import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsService } from './services/payments.service';
import { ListComponent } from 'src/reusable/list/list.component';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';
import { PaymentItemComponent } from './payment-item/payment-item.component';

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
  payments$ = this.paymentService.getPaymentsFiltered();
  isLoading$ = this.paymentService.fetchingPayments$;

  title = 'Manage Payments';
  placeholder = 'Search Payments';

  onSearch(searchTerm: string) {
    this.paymentService.search(searchTerm);
  }
}
