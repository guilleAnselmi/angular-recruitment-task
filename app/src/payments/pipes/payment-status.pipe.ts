import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/status.enum';

@Pipe({
  name: 'paymentStatus',
  standalone: true,
})
export class PaymentStatusPipe implements PipeTransform {
  // TODO maybe do this programatically like replace split capitalize then join
  transform(status: Status): string {
    switch (status) {
      case Status.DECLINED:
        return 'Declined';
      case Status.DELIVERY_ERROR:
        return 'Delivery Error';
      case Status.SUCCESSFUL:
        return 'Successful';
      case Status.WRONG_ADDRESS:
        return 'Wrong Address';
      case Status.WRONG_PAYSLIP:
        return 'Wrong Payslip';
      default:
        return '';
    }
  }
}
