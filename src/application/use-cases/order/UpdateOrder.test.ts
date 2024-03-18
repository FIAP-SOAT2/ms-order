import { UpdateOrder } from './UpdateOrder';
import { GetOrderByIdRepository } from '../../../application/interfaces/repositories/order/GetOrderByIdRepository';
import { UpdateOrderRepository } from '../../../application/interfaces/repositories/order/UpdateOrderRepository';
import { OrderNotFoundError } from '../../../application/errors/order/OrderNotFoundError';
import eventDispatcher from 'event-dispatch';
import { IAwsSns } from '../../../infra/aws/interface/publish.inteface';

jest.mock('event-dispatch');
const mockGetOrderByIdRepository: jest.Mocked<GetOrderByIdRepository> = {
  getOrderById: jest.fn(),
};
const mockUpdateOrderRepository: jest.Mocked<UpdateOrderRepository> = {
  updateOrder: jest.fn(),
};
const mockAwsSnsService: jest.Mocked<IAwsSns> = {
  PublishToTopic: jest.fn(),
};

describe('UpdateOrder', () => {
  let updateOrderService: UpdateOrder;

  beforeEach(() => {
    updateOrderService = new UpdateOrder(mockUpdateOrderRepository, mockGetOrderByIdRepository, mockAwsSnsService);
    jest.clearAllMocks();
  });

  it('deve atualizar a ordem quando encontrada e publicar notificação se paidId é fornecido', async () => {
    const fakeOrder = {
      id: 'sampleOrderId',
      userMail: 'johnDoe@mail.com',
      userPhone: '12301321',
      note: 'Sample Note',
      orderProducts: [],
      payment: 'CREDITCARD',
      status: 'INPROGRESS',
      paid: true,
      paidId: 101522,
    };
    const updatedOrderData = { ...fakeOrder, status: 'INPROGRESS' };

    mockGetOrderByIdRepository.getOrderById.mockResolvedValue(fakeOrder);
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
    expect(eventDispatcher.dispatch).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
  });

  it('deve retornar OrderNotFoundError quando a ordem não for encontrada', async () => {
    mockGetOrderByIdRepository.getOrderById.mockResolvedValue(null);

    const result = await updateOrderService.execute({
      orderId: 'sampleOrderId',
      orderData: {},
    });

    expect(result).toBeInstanceOf(OrderNotFoundError);
    expect(mockGetOrderByIdRepository.getOrderById).toHaveBeenCalledWith('sampleOrderId');
  });
});
