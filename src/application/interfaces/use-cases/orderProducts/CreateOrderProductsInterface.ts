import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { OrderProductsEntity } from '../../../../domain/entities/OrderProducts';

export interface CreateOrderProductsInterface extends UseCase<CreateOrderProductsInterface.Request, CreateOrderProductsInterface.Response> {
  execute(orderData: CreateOrderProductsInterface.Request): Promise<CreateOrderProductsInterface.Response>;
}

export namespace CreateOrderProductsInterface {
  export type Request = Omit<OrderProductsEntity, 'id'>;
  export type Response = void;
}
