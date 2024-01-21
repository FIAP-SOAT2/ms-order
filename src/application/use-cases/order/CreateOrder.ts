import { CreateOrderInterface } from '@application/interfaces/use-cases/order/CreateOrderInterface';
import { CreateOrderRepository } from '@application/interfaces/repositories/order/CreateOrderRepository';
import { CreateOrderProductsRepository } from '@application/interfaces/repositories/orderProducts/CreateOrderProductsRepository';
import { PaymentGateway } from '../web-hook/handle-webhook';
import { order_payment_enum } from '@prisma/client';

export class CreateOrder implements CreateOrderInterface {
  constructor(
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly createOrdersProductsRepository: CreateOrderProductsRepository,
    private readonly paymentProcess: PaymentGateway = new PaymentGateway(),
  ) {}

  async execute(orderData: CreateOrderInterface.Request): Promise<CreateOrderInterface.Response> {
    const paymentProcess = await this.paymentProcess.pay(orderData.payment as unknown as order_payment_enum);
    if (!paymentProcess.status) {
      throw new Error('Payment not processed');
    }
    const orderObject: typeof orderData = {
      userId: orderData.userId,
      status: orderData.status,
      payment: orderData.payment,
      paid: paymentProcess.status,
      paidId: paymentProcess.id,
      note: orderData.note,
      orderProducts: orderData.orderProducts,
    };
    const creating = await this.createOrderRepository.createOrder({
      ...orderObject,
    });
    const id = creating.orderNumber;
    const orderProducts = orderData.orderProducts;
    orderProducts.forEach((orderProduct: any) => {
      orderProduct.orderId = id;
    });
    await this.createOrdersProductsRepository.createOrderProducts(orderProducts);
    return {
      orderNumber: id,
      paymentId: paymentProcess.id,
      paymentStatus: paymentProcess.status,
    };
  }
}
