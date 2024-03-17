import { CreateOrder } from './CreateOrder';
import { CreateOrderRepository } from '@application/interfaces/repositories/order/CreateOrderRepository';
import { CreateOrderProductsRepository } from '@application/interfaces/repositories/orderProducts/CreateOrderProductsRepository';
import { PaymentGateway } from '../web-hook/handle-webhook';

describe('CreateOrder', () => {
  let createOrder: CreateOrder;
  let createOrderRepository: jest.Mocked<CreateOrderRepository>;
  let createOrderProductsRepository: jest.Mocked<CreateOrderProductsRepository>;
  let paymentProcess: jest.Mocked<PaymentGateway>;

  beforeEach(() => {
    createOrderRepository = {
      createOrder: jest.fn(),
    } as jest.Mocked<CreateOrderRepository>;

    createOrderProductsRepository = {
      createOrderProducts: jest.fn(),
    } as jest.Mocked<CreateOrderProductsRepository>;

    paymentProcess = {
      pay: jest.fn(),
    } as unknown as jest.Mocked<PaymentGateway>;

    createOrder = new CreateOrder(createOrderRepository, createOrderProductsRepository, paymentProcess);
  });

  it('should create an order successfully', async () => {
    const orderData = {
      userMail: 'johnDoe@mail.com',
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

    paymentProcess.pay.mockResolvedValue(paymentResponse);
    createOrderRepository.createOrder.mockResolvedValue({
      orderNumber: 'ABC123',
    });

    const result = await createOrder.execute(orderData);

    expect(paymentProcess.pay).toHaveBeenCalledWith(orderData.payment);
    expect(createOrderRepository.createOrder).toHaveBeenCalledWith({
      userMail: orderData.userMail,
      status: orderData.status,
      payment: orderData.payment,
      paid: paymentResponse.status,
      paidId: paymentResponse.id,
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
    expect(result).toEqual({
      orderNumber: 'ABC123',
      paymentId: paymentResponse.id,
      paymentStatus: paymentResponse.status,
    });
  });

  describe('with default PaymentGateway', () => {
    it('should create an order successfully with default PaymentGateway', async () => {
      createOrder = new CreateOrder(createOrderRepository, createOrderProductsRepository);
      const paymentResponse = {
        id: 123,
        status: true,
        type: 'CREDIT_CARD',
      };
      paymentProcess.pay.mockResolvedValue(paymentResponse);
    });
  });
});
