import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsService } from './services/payments.service';
import { Observable, of } from 'rxjs';
import { PaymentByStatus } from './models/payment.type';
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
export class PaymentsComponent implements OnInit {
  paymentService = inject(PaymentsService);
  payments$: Observable<PaymentByStatus[]> = of([]);
  title = 'Manage Payments';
  placeholder = 'Search Payments';

  ngOnInit(): void {
    this.payments$ = this.paymentService.getPaymentsFiltered();
  }

  onSearch(searchTerm: string) {
    this.paymentService.search(searchTerm);
  }
}
