import { DeleteOrderRepository } from '@application/interfaces/repositories/order/DeleteOrderRepository';
import { DeleteOrderInterface } from '@application/interfaces/use-cases/order/DeleteOrderInterface';

export class DeleteOrder implements DeleteOrderInterface {
  constructor(private readonly deleteOrderRepository: DeleteOrderRepository) {}

  async execute(orderId: DeleteOrderInterface.Request): Promise<DeleteOrderInterface.Response> {
    await this.deleteOrderRepository.deleteOrder(orderId);
  }
}
