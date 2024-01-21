import { DeleteOrder } from './DeleteOrder';
import { DeleteOrderRepository } from '@application/interfaces/repositories/order/DeleteOrderRepository';

describe('DeleteOrder', () => {
  let deleteOrder: DeleteOrder;
  let deleteOrderRepository: jest.Mocked<DeleteOrderRepository>;

  beforeEach(() => {
    deleteOrderRepository = {
      deleteOrder: jest.fn(),
    } as jest.Mocked<DeleteOrderRepository>;

    deleteOrder = new DeleteOrder(deleteOrderRepository);
  });

  it('should delete an order successfully', async () => {
    const orderId = 'sampleOrderId';

    await deleteOrder.execute(orderId);

    expect(deleteOrderRepository.deleteOrder).toHaveBeenCalledWith(orderId);
  });
});
