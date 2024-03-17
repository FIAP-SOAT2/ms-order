import { CreateOrderInterface } from '@application/interfaces/use-cases/order/CreateOrderInterface';
import { CreateOrderRepository } from '@application/interfaces/repositories/order/CreateOrderRepository';
import { CreateOrderProductsRepository } from '@application/interfaces/repositories/orderProducts/CreateOrderProductsRepository';
import { IAwsSns } from '@infra/aws/interface/publish.inteface';
import AwsSns from '../../../infra/aws/sns.publisher';
import { EventDispatcher } from "event-dispatch";
import { events } from '../../constants/constants';

const eventDispatcher = new EventDispatcher();

export class CreateOrder implements CreateOrderInterface {
  constructor(
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly createOrdersProductsRepository: CreateOrderProductsRepository,
    private AwsSnsService: IAwsSns,
  ) {
    this.AwsSnsService = new AwsSns();
  }

  async execute(orderData: CreateOrderInterface.Request): Promise<CreateOrderInterface.Response> {
    const paymentObject = {
      userId: orderData.userId,
      payment: orderData.payment,
      paymentDescription: 'Payment for order',
      paymentValue: orderData.orderProducts.reduceRight((acc: number, product: any) => {
        return acc + product.price;
      }, 0),
    }
    eventDispatcher.dispatch(events.order.insert, JSON.stringify(paymentObject));
    const orderObject: typeof orderData = {
      userId: orderData.userId,
      status: orderData.status,
      payment: orderData.payment,
      paid: true,
      paidId: 123123,
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
      paymentId: 123123,
      paymentStatus: true,
    };
  }
}
