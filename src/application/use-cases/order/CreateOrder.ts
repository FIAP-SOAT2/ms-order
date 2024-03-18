import { CreateOrderInterface } from '@application/interfaces/use-cases/order/CreateOrderInterface';
import { CreateOrderRepository } from '@application/interfaces/repositories/order/CreateOrderRepository';
import { CreateOrderProductsRepository } from '@application/interfaces/repositories/orderProducts/CreateOrderProductsRepository';
import { IAwsSns } from '@infra/aws/interface/publish.inteface';
import AwsSns from '../../../infra/aws/sns.publisher';
import { EventDispatcher } from 'event-dispatch';
import { events } from '../../constants/constants';

const eventDispatcher = new EventDispatcher();

export class CreateOrder implements CreateOrderInterface {
  constructor(
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly createOrdersProductsRepository: CreateOrderProductsRepository,
    private AwsSnsService?: IAwsSns,
  ) {
    this.AwsSnsService = new AwsSns();
  }

  async execute(orderData: CreateOrderInterface.Request): Promise<CreateOrderInterface.Response> {
    const orderObject: typeof orderData = {
      userMail: orderData.userMail,
      userPhone: orderData.userPhone,
      status: orderData.status,
      payment: orderData.payment,
      paid: true,
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
    eventDispatcher.dispatch(events.order.stock, JSON.stringify(orderProducts));
    await this.createOrdersProductsRepository.createOrderProducts(orderProducts);
    await this.puslishPaymentOrder({ id, ...orderData });
    return {
      orderNumber: id,
      paymentStatus: true,
    };
  }

  private async puslishPaymentOrder(order) {
    const paymentObject = {
      orderId: order.id,
      userMail: order.userMail,
      payment: order.payment.toLowerCase(),
      paymentValue: order.orderProducts.reduceRight((acc: number, product: any) => {
        return acc + product.price * product.quantity;
      }, 0),
    };
    eventDispatcher.dispatch(events.order.insert, JSON.stringify(paymentObject));
  }
}
