import { GetOrderById } from './GetOrderById';
import { OrderNotFoundError } from '../../errors/order/OrderNotFoundError';
import { GetOrderByIdRepository } from '../../interfaces/repositories/order/GetOrderByIdRepository';

const mockGetOrderByIdRepository: jest.Mocked<GetOrderByIdRepository> = {
  getOrderById: jest.fn(),
};

describe('GetOrderById', () => {
  let getOrderByIdService: GetOrderById;

  beforeEach(() => {
    getOrderByIdService = new GetOrderById(mockGetOrderByIdRepository);
  });

  it('deve retornar a ordem quando encontrada', async () => {
    const fakeOrder = {
      id: 'sampleOrderId',
      userMail: 'johnDoe@mail.com',
      userPhone: '12301321',
      note: 'Sample Note',
      orderProducts: [],
      payment: 'CREDITCARD',
      status: 'PENDING',
      paid: true,
      paidId: 101522,
    };
    mockGetOrderByIdRepository.getOrderById.mockResolvedValue(fakeOrder);

    const result = await getOrderByIdService.execute('sampleOrderId');
    expect(result).toEqual(fakeOrder);

    expect(mockGetOrderByIdRepository.getOrderById).toHaveBeenCalledWith('sampleOrderId');
  });

  it('deve retornar OrderNotFoundError quando a ordem não for encontrada', async () => {
    mockGetOrderByIdRepository.getOrderById.mockResolvedValue(null);

    const result = await getOrderByIdService.execute('sampleOrderId');
    expect(result).toBeInstanceOf(OrderNotFoundError);

    expect(mockGetOrderByIdRepository.getOrderById).toHaveBeenCalledWith('sampleOrderId');
  });

  it('deve lidar com erros lançados pela getOrderByIdRepository', async () => {
    const mockError = new Error('Erro simulado');
    mockGetOrderByIdRepository.getOrderById.mockRejectedValue(mockError);

    await expect(getOrderByIdService.execute('sampleOrderId')).rejects.toThrow(mockError);

    expect(mockGetOrderByIdRepository.getOrderById).toHaveBeenCalledWith('sampleOrderId');
  });
});
