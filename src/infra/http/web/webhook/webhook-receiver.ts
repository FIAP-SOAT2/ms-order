import { PaymentGateway } from '@application/use-cases/web-hook/handle-webhook';

export default class PaymentWebHookReceiver {
  constructor(private readonly paymentProcess: PaymentGateway) {}

  async execute(paymentData: any): Promise<any> {
    const paymentProcess = await this.paymentProcess.pay(paymentData);
    return paymentProcess;
  }
}
