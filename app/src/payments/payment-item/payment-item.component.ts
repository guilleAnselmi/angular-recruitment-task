import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentByStatus } from '../models/payment.type';

@Component({
  selector: 'app-payment-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentItemComponent {
  @Input() payment!: PaymentByStatus;
}
