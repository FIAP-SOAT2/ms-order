import { IOrderDomain, OrderEntity } from '@domain/entities/Order';

export interface UpdateOrderRepository {
  updateOrder(params: UpdateOrderRepository.Request): Promise<UpdateOrderRepository.Response>;
}

export namespace UpdateOrderRepository {
  export type Request = {
    orderId: string;
    orderData: Partial<Omit<IOrderDomain, 'id' | 'createdAt' | 'updatedAt'>>;
  };
  export type Response = OrderEntity;
}
