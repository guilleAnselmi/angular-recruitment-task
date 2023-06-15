import { Status } from './status.enum';

export type Payment = {
  id: string;
  status: Status;
  receiver: string;
  internalFieldA: string;
  xYZRandomField: string;
};

export type PaymentByStatus = {
  status: Status;
  // payments: Payment[];
  count: number;
};
