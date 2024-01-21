import { UpdateOrder } from './UpdateOrder';
import { GetOrderByIdRepository } from '../../../application/interfaces/repositories/order/GetOrderByIdRepository';
import { UpdateOrderRepository } from '../../interfaces/repositories/order/UpdateOrderRepository';
import { OrderNotFoundError } from '../../../application/errors/order/OrderNotFoundError';

const mockGetOrderByIdRepository: jest.Mocked<GetOrderByIdRepository> = {
  getOrderById: jest.fn(),
};

const mockUpdateOrderRepository: jest.Mocked<UpdateOrderRepository> = {
  updateOrder: jest.fn(),
};

describe('UpdateOrder', () => {
  let updateOrderService: UpdateOrder;

  beforeEach(() => {
    updateOrderService = new UpdateOrder(mockGetOrderByIdRepository, mockUpdateOrderRepository);
    jest.clearAllMocks();
  });

  it('deve atualizar a ordem quando encontrada', async () => {
    const fakeOrder = {
      id: 'sampleOrderId',
      userId: 1,
      note: 'Sample Note',
      orderProducts: [],
      payment: 'CREDITCARD',
      status: 'PENDING',
      paid: true,
      paidId: 101522,
    };

    mockGetOrderByIdRepository.getOrderById.mockResolvedValue(fakeOrder);

    const updatedOrderData = {
      id: 'sampleOrderId',
      userId: 1,
      note: 'Sample Note',
      orderProducts: [],
      payment: 'CREDITCARD',
      status: 'INPROGRESS',
      paid: true,
      paidId: 101522,
    };
    mockUpdateOrderRepository.updateOrder.mockResolvedValue(updatedOrderData);

    const result = await updateOrderService.execute({
      orderId: 'sampleOrderId',
      orderData: updatedOrderData,
    });

    expect(result).toEqual(updatedOrderData);

    expect(mockGetOrderByIdRepository.getOrderById).toHaveBeenCalledWith('sampleOrderId');
    expect(mockUpdateOrderRepository.updateOrder).toHaveBeenCalledWith({
      orderId: 'sampleOrderId',
      orderData: updatedOrderData,
    });
  });

  it('deve retornar OrderNotFoundError quando a ordem não for encontrada', async () => {
    mockGetOrderByIdRepository.getOrderById.mockResolvedValue(null);

    const result = await updateOrderService.execute({
      orderId: 'sampleOrderId',
      orderData: {
        userId: 1,
        note: 'Sample Note',
        orderProducts: [],
        payment: 'CREDITCARD',
        status: 'INPROGRESS',
        paid: true,
        paidId: 101522,
      },
    });

    expect(result).toBeInstanceOf(OrderNotFoundError);

    expect(mockGetOrderByIdRepository.getOrderById).toHaveBeenCalledWith('sampleOrderId');

  });
});
