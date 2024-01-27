import { CreateOrderProductsRepository } from '@application/interfaces/repositories/orderProducts/CreateOrderProductsRepository';
import { CreateOrderProductsInterface } from '@application/interfaces/use-cases/orderProducts/CreateOrderProductsInterface';

export class CreateOrder implements CreateOrderProductsInterface {
  constructor(private readonly createOrderProductsRepository: CreateOrderProductsRepository) {}

  async execute(orderProductsData: CreateOrderProductsInterface.Request): Promise<CreateOrderProductsInterface.Response> {
    await this.createOrderProductsRepository.createOrderProducts({
      ...orderProductsData,
    });
  }
}
