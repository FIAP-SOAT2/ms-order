import { UseCase } from '@application/interfaces/use-cases/UseCase';
import { OrderEntity } from '@domain/entities/Order';

export interface CreateOrderInterface extends UseCase<CreateOrderInterface.Request, CreateOrderInterface.Response> {
  execute(orderData: CreateOrderInterface.Request): Promise<CreateOrderInterface.Response>;
}

export namespace CreateOrderInterface {
  export type Request = Omit<OrderEntity, 'id' | 'created_at' | 'updated_at'>;
  export type Response = {
    orderNumber: string;
    paymentStatus: boolean;
  };
}
