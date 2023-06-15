export type Payment = {
  id: string;
  status: Status;
  receiver: string;
  internalFieldA: string;
  xYZRandomField: string;
};

export enum Status {
  DECLINED = 'declined',
  DELIVERY_ERROR = 'delivery_error',
  SUCCESSFUL = 'successful',
  WRONG_ADDRESS = 'wrong_address',
  WRONG_PAYSLIP = 'wrong_payslip',
}

export type PaymentByStatus = {
  status: Status;
  // payments: Payment[];
  count: number;
};
