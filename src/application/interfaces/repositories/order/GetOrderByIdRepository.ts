import { OrderEntity } from '@domain/entities/Order';

export interface GetOrderByIdRepository {
  getOrderById(OrderId: string): Promise<GetOrderByIdRepository.Response>;
}

export namespace GetOrderByIdRepository {
  export type Response = OrderEntity | null;
}
