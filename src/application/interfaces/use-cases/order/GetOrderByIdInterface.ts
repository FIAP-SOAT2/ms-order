import { OrderNotFoundError } from '../../../errors/order/OrderNotFoundError';
import { UseCase } from '../UseCase';
import { OrderEntity } from '@domain/entities/Order';

export interface GetOrderByIdInterface extends UseCase<GetOrderByIdInterface.Request, GetOrderByIdInterface.Response> {
  execute(orderId: GetOrderByIdInterface.Request): Promise<GetOrderByIdInterface.Response>;
}

export namespace GetOrderByIdInterface {
  export type Request = string;
  export type Response = OrderEntity | OrderNotFoundError;
}
