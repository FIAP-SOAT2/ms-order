import { CreateOrderController } from './CreateOrderController';
import { CreateOrderInterface } from '@application/interfaces/use-cases/order/CreateOrderInterface';
import { Validation } from '@infra/http/interfaces/Validation';

describe('CreateOrderController', () => {
  let createOrderController: CreateOrderController;
  let mockCreateOrderValidation: jest.Mocked<Validation>;
  let mockCreateOrder: jest.Mocked<CreateOrderInterface>;

  beforeEach(() => {
    mockCreateOrderValidation = {
      validate: jest.fn(),
    };
    mockCreateOrder = {
      execute: jest.fn(),
    };
    createOrderController = new CreateOrderController(mockCreateOrderValidation, mockCreateOrder);
  });

  it('deve retornar status 201 e o corpo da ordem ao criar com dados válidos', async () => {
    const mockHttpRequest = {
      body: {
        userId: 1,
        note: 'Remover cebola',
        status: 'PENDING',
      },
    };
    const fakeOrderResponse = {
      orderNumber: 'ABC123',
      paymentId: 123,
      paymentStatus: true,
    };

    mockCreateOrderValidation.validate.mockReturnValue(null);
    mockCreateOrder.execute.mockResolvedValue(fakeOrderResponse);

    const result = await createOrderController.execute(mockHttpRequest);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(fakeOrderResponse);
    expect(mockCreateOrder.execute).toHaveBeenCalledWith(mockHttpRequest.body);
  });

  it('deve retornar status 400 e mensagens de erro ao criar com dados inválidos', async () => {
    const mockHttpRequest = {
      body: {
        userId: 1,
        note: 'Remover cebola',
        status: 'PENDING',
      },
    };
    const validationErrors = { message: 'error to create order', name: 'Crete error validation' };

    mockCreateOrderValidation.validate.mockReturnValue(validationErrors);

    const result = await createOrderController.execute(mockHttpRequest);
    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(validationErrors);
  });

  it('deve lidar com erros lançados pela execução de createOrder', async () => {
    const mockHttpRequest = {
      body: {
        userId: 1,
        note: 'Remover cebola',
        status: 'PENDING',
      },
    };
    const mockError = new Error('Erro simulado');

    mockCreateOrderValidation.validate.mockReturnValue(null);
    mockCreateOrder.execute.mockRejectedValue(mockError);

    await expect(createOrderController.execute(mockHttpRequest)).rejects.toThrow(mockError);

    expect(mockCreateOrder.execute).toHaveBeenCalledWith(mockHttpRequest.body);
  });
});
