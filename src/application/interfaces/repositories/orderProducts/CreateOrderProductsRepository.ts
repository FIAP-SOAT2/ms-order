import { OrderProductsEntity } from '@domain/entities/OrderProducts';

export interface CreateOrderProductsRepository {
  createOrderProducts(orderProductsData: any);
}

export namespace CreateOrderProductsRepository {
  export type Request = Omit<OrderProductsEntity, 'id'>;
}
