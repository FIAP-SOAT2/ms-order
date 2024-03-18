import { CreateOrder } from './CreateOrder';
import { CreateOrderRepository } from '@application/interfaces/repositories/order/CreateOrderRepository';
import { CreateOrderProductsRepository } from '@application/interfaces/repositories/orderProducts/CreateOrderProductsRepository';
import { SNSClient } from '@aws-sdk/client-sns';

describe('CreateOrder', () => {
  let createOrder: CreateOrder;
  let createOrderRepository: jest.Mocked<CreateOrderRepository>;
  let createOrderProductsRepository: jest.Mocked<CreateOrderProductsRepository>;

  beforeEach(() => {
    createOrderRepository = {
      createOrder: jest.fn(),
    } as jest.Mocked<CreateOrderRepository>;

    createOrderProductsRepository = {
      createOrderProducts: jest.fn(),
    } as jest.Mocked<CreateOrderProductsRepository>;

    createOrder = new CreateOrder(createOrderRepository, createOrderProductsRepository);
  });

  jest.mock('@aws-sdk/client-sns', () => {
    return {
      SNSClient: jest.fn().mockImplementation(() => {
        return {};
      }),
      PublishCommand: jest.fn().mockImplementation(() => {
        return {};
      }),
    };
  });

  SNSClient.prototype.send = jest.fn().mockResolvedValue({});

  it('should create an order successfully', async () => {
    const orderData = {
      userMail: 'johnDoe@mail.com',
      userPhone: '1234567890',
      status: 'PENDING',
      payment: 'CREDITCARD',
      note: 'Sample Note',
      orderProducts: [
        { productId: 1, quantity: 2, price: 10, orderId: 'ABC123' },
        { productId: 2, quantity: 1, price: 20, orderId: 'ABC123' },
      ],
    };

    const paymentResponse = {
      id: 123,
      status: true,
      type: 'CREDIT_CARD',
    };

    createOrderRepository.createOrder.mockResolvedValue({
      orderNumber: 'ABC123',
    });

    const result = await createOrder.execute(orderData);

    expect(createOrderRepository.createOrder).toHaveBeenCalledWith({
      userMail: orderData.userMail,
      userPhone: orderData.userPhone,
      status: orderData.status,
      payment: orderData.payment,
      paid: paymentResponse.status,
      note: orderData.note,
      orderProducts: orderData.orderProducts.map((op) => ({
        orderId: 'ABC123',
        productId: op.productId,
        quantity: op.quantity,
        price: op.price,
      })),
    });
    expect(createOrderProductsRepository.createOrderProducts).toHaveBeenCalledWith(
      orderData.orderProducts.map((op) => ({
        orderId: 'ABC123',
        productId: op.productId,
        quantity: op.quantity,
        price: op.price,
      })),
    );
  });
});
