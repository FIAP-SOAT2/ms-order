import { IPaymentGateway } from '@application/interfaces/use-cases/paymentGateway/paymentInterface';
import { order_payment_enum } from '@prisma/client';

export type PaymentType = {
  id: number;
  type: string;
  status: boolean;
};

export class PaymentGateway implements IPaymentGateway {
  async pay(type: order_payment_enum): Promise<PaymentType> {
    const id = this.gerarId();

    switch (type) {
      case order_payment_enum.CREDITCARD:
        return {
          id: Number(id),
          type: 'CREDIT_CARD',
          status: true,
        };
      case order_payment_enum.DEBITCARD:
        return {
          id: Number(id),
          type: 'DEBIT_CARD',
          status: true,
        };
      case order_payment_enum.MONEY:
        return {
          id: Number(id),
          type: 'MONEY',
          status: true,
        };
      case order_payment_enum.PIX:
        return {
          id: Number(id),
          type: 'PIX',
          status: true,
        };
      default:
        return {
          id: Number(id),
          type: 'NOT_FOUND',
          status: false,
        };
    }
  }

  gerarId(): string {
    const caracteres = '0123456789';
    let idAleatorio = '';
    for (let i = 0; i < 10; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      idAleatorio += caracteres.charAt(indice);
    }
    return idAleatorio;
  }
}
