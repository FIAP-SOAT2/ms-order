import { order_payment_enum } from '@prisma/client';
import { PaymentGateway } from './handle-webhook';

describe('PaymentGateway', () => {
  let paymentGateway: PaymentGateway;

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
  });

  it('should process credit card payment successfully', async () => {
    const result = await paymentGateway.pay(order_payment_enum.CREDITCARD);

    expect(result.type).toBe('CREDIT_CARD');
    expect(result.status).toBe(true);
  });

  it('should process debit card payment successfully', async () => {
    const result = await paymentGateway.pay(order_payment_enum.DEBITCARD);

    expect(result.type).toBe('DEBIT_CARD');
    expect(result.status).toBe(true);
  });

  it('should process money payment successfully', async () => {
    const result = await paymentGateway.pay(order_payment_enum.MONEY);

    expect(result.type).toBe('MONEY');
    expect(result.status).toBe(true);
  });

  it('should process PIX payment successfully', async () => {
    const result = await paymentGateway.pay(order_payment_enum.PIX);

    expect(result.type).toBe('PIX');
    expect(result.status).toBe(true);
  });

  it('should handle unknown payment type', async () => {
    const result = await paymentGateway.pay('UNKNOWN_TYPE' as order_payment_enum);

    expect(result.type).toBe('NOT_FOUND');
    expect(result.status).toBe(false);
  });

});
