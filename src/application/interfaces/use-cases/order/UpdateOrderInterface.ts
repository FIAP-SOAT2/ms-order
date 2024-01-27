import { UseCase } from '../UseCase';
import { OrderNotFoundError } from '../../../errors/order/OrderNotFoundError';
import { IOrderDomain, OrderEntity } from '../../../../domain/entities/Order';

export interface UpdateOrderInterface extends UseCase<UpdateOrderInterface.Request, UpdateOrderInterface.Response> {
  execute(params: UpdateOrderInterface.Request): Promise<UpdateOrderInterface.Response>;
}

export namespace UpdateOrderInterface {
  export type OrderIdType = string;
  export type OrderDataType = Partial<Omit<IOrderDomain, 'id' | 'createdAt' | 'updatedAt'>>;
  export type Request = { orderId: OrderIdType; orderData: OrderDataType };
  export type Response = OrderEntity | OrderNotFoundError;
}
