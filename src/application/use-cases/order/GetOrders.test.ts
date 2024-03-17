import { GetOrders } from './GetOrders';
import { GetOrdersRepository } from '../../interfaces/repositories/order/GetOrdersRepository';

const mockGetOrdersRepository: jest.Mocked<GetOrdersRepository> = {
  getOrders: jest.fn(),
};

describe('GetOrders', () => {
  let getOrdersService: GetOrders;

  beforeEach(() => {
    getOrdersService = new GetOrders(mockGetOrdersRepository);
  });

  it('deve retornar a lista de pedidos paginada', async () => {
    const fakeOrder1 = {
      id: 'sampleOrderId',
      userMail: 'johnDoe@mail.com',
      note: 'Sample Note',
      orderProducts: [],
      payment: 'CREDITCARD',
      status: 'PENDING',
      paid: true,
      paidId: 101522,
    };

    const fakeOrder2 = {
      id: 'sampleOrderId',
      userMail: 'johnDoe@mail.com',
      note: 'Sample Note',
      orderProducts: [],
      payment: 'CREDITCARD',
      status: 'PENDING',
      paid: true,
      paidId: 101522,
    };

    const fakeOrders = { data: [fakeOrder1, fakeOrder2], page: 1, total: 2, totalPages: 1 };

    mockGetOrdersRepository.getOrders.mockResolvedValue(fakeOrders);

    const result = await getOrdersService.execute({ page: 1 });
    expect(result).toEqual(fakeOrders);

    expect(mockGetOrdersRepository.getOrders).toHaveBeenCalledWith({
      page: 1,
      paginationLimit: 10,
    });
  });

  it('deve lidar com erros lançados pela getOrdersRepository', async () => {
    const mockError = new Error('Erro simulado');
    mockGetOrdersRepository.getOrders.mockRejectedValue(mockError);

    await expect(getOrdersService.execute({ page: 1 })).rejects.toThrow(mockError);

    expect(mockGetOrdersRepository.getOrders).toHaveBeenCalledWith({
      page: 1,
      paginationLimit: 10,
    });
  });
});
