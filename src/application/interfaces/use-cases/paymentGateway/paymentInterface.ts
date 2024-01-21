import { order_payment_enum } from '@prisma/client';

export type PaymentType = {
  id: number;
  type: string;
  status: boolean;
};

export interface IPaymentGateway {
  pay(type: order_payment_enum): Promise<PaymentType>;
}
