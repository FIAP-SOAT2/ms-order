import { PrismaClient, order_status_enum, order_payment_enum } from '@prisma/client';
import { OrderRepository } from './OrderRepository';
import { UpdateOrderRepository } from '@application/interfaces/repositories/order/UpdateOrderRepository';

const prismaClient = new PrismaClient();

const setupDb = async () => {
  const order = await prismaClient.order.create({
    data: {
      status: 'PENDING',
      payment: 'CREDITCARD',
      paid: true,
      paidId: 101522,
      note: 'note',
      userMail: 'johnDoe@mail.com',
    },
  });
  return order;
};

describe('[Repository] Order', () => {
  const sut = new OrderRepository();

  beforeEach(async () => {
    await prismaClient.order.deleteMany();
  });

  it('should persist a new order', async () => {
    const order = {
      status: 'PENDING',
      payment: 'CREDITCARD',
      paid: true,
      paidId: 101522,
      note: 'note',
      userMail: 'johnDoe@mail.com',
    };

    await sut.createOrder(order);
    const persisted = await prismaClient.order.findFirst();

    expect(persisted).toBeDefined();
    expect(persisted).toMatchObject(order);
  });

  it('should update an order', async () => {
    const order = await setupDb();

    const updatedOrder: UpdateOrderRepository.Request = {
      orderId: order.id,
      orderData: {
        status: 'INPROGRESS',
        payment: 'CREDITCARD',
        paid: true,
        paidId: 101522,
        note: 'note',
        userMail: 'johnDoe@mail.com',
      },
    };

    await sut.updateOrder(updatedOrder);
    const persisted = await prismaClient.order.findFirst();
    expect(persisted).toMatchObject(updatedOrder.orderData);
  });

  it('should return an order', async () => {
    const order = await setupDb();

    const persisted = await sut.getOrderById(order.id);

    const expectedOrder = { ...order };
    delete expectedOrder.created_at;
    delete expectedOrder.updated_at;

    expect(persisted).toMatchObject(expectedOrder);
  });

  it('should return all orders', async () => {
    await setupDb();

    const params = {
      page: 1,
      paginationLimit: 10,
    };

    const persisted = await sut.getOrders(params);

    expect(persisted).toBeDefined();
  });

  it('should return all orders by filters', async () => {
    await setupDb();

    const params = {
      status: order_status_enum.PENDING,
    };

    const persisted = await sut.getOrderByFilters(params);

    expect(persisted).toBeDefined();
  });

  it('should delete an order', async () => {
    const order = await setupDb();

    await sut.deleteOrder(order.id);
    const persisted = await prismaClient.order.findFirst();

    expect(persisted).toBeNull();
  });

  it('should throw an error when trying to delete a non-existing order', async () => {
    await expect(sut.deleteOrder('non-existing-id')).rejects.toThrow(Error);
  });

  it('should remove products from an order', async () => {
    const order = await setupDb();
    await sut.removeProductsOrders(order.id);
    const products = await prismaClient.orderProduct.findMany({
      where: { orderId: order.id },
    });
    expect(products).toHaveLength(0);
  });

  it('should throw an error when trying to update a non-existing order', async () => {
    const updatedOrder: UpdateOrderRepository.Request = {
      orderId: 'non-existing-id',
      orderData: {
        status: 'INPROGRESS',
        payment: 'CREDITCARD',
        paid: true,
        paidId: 101522,
        note: 'note',
        userMail: 'johnDoe@mail.com',
      },
    };
    await expect(sut.updateOrder(updatedOrder)).rejects.toThrow(Error);
  });
});
