import { GetOrderByIdRepository } from '../../../application/interfaces/repositories/order/GetOrderByIdRepository';
import { UpdateOrderRepository } from '../../interfaces/repositories/order/UpdateOrderRepository';
import { OrderNotFoundError } from '../../../application/errors/order/OrderNotFoundError';
import { UpdateOrderInterface } from '@application/interfaces/use-cases/order/UpdateOrderInterface';
import eventDispatcher, { EventSubscriber, On } from 'event-dispatch';
import { events } from '../../constants/constants';
import { IAwsSns } from '@infra/aws/interface/publish.inteface';
import AwsSns from '@infra/aws/sns.publisher';

@EventSubscriber()
export class UpdateOrder implements UpdateOrderInterface {
  constructor(
    private readonly updateOrderRepository: UpdateOrderRepository,
    private readonly getOrderByIdRepository: GetOrderByIdRepository,
    private AwsSnsService?: IAwsSns,
  ) {
    this.AwsSnsService = new AwsSns();
  }

  @On(`${events.order.update}`)
  async execute(params: UpdateOrderInterface.Request): Promise<UpdateOrderInterface.Response> {
    const { orderId, orderData } = params;
    const order = await this.getOrderByIdRepository.getOrderById(orderId);

    if (!order) {
      return new OrderNotFoundError();
    }

    if (orderData.paidId){
      await this.puslishNotificarionStatus({
        userPhone: order.userPhone,
        status: orderData.paid,
      });
    }

    return this.updateOrderRepository.updateOrder({ orderId, orderData });
  }

  private async puslishNotificarionStatus(order){
    const paymentObject = {
      phoneNumber: order.userPhone,
      message: order.status === true ? "Seu pedido está sendo preparado" : "Tivemos um problema com o pagamento, por favor verifique!",
    }
    eventDispatcher.dispatch(events.order.insert, JSON.stringify(paymentObject));
  }
}
