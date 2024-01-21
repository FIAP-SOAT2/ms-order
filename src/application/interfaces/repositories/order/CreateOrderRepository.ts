import { OrderEntity } from '../../../../domain/entities/Order';

export interface CreateOrderRepository {
  createOrder(orderData: CreateOrderRepository.Request);
}
export namespace CreateOrderRepository {
  export type Request = Omit<OrderEntity, 'id' | 'created_at' | 'updated_at'>;
}
