import { OrderEntity } from '@domain/entities/Order';
import { GetOrdersRepository } from '@application/interfaces/repositories/order/GetOrdersRepository';
import { CreateOrderRepository } from '@application/interfaces/repositories/order/CreateOrderRepository';
import { GetOrderByIdRepository } from '@application/interfaces/repositories/order/GetOrderByIdRepository';
import { GetOrderByFiltersRepository } from '@application/interfaces/repositories/order/GetOrderByFiltersRepository';
import { UpdateOrderRepository } from '../../../application/interfaces/repositories/order/UpdateOrderRepository';
import { DeleteOrderRepository } from '../../../application/interfaces/repositories/order/DeleteOrderRepository';
import { prisma } from '../orm/prisma';
import { order_payment_enum, order_status_enum } from '@prisma/client';
export class OrderRepository implements CreateOrderRepository, GetOrderByIdRepository, GetOrderByFiltersRepository, UpdateOrderRepository, DeleteOrderRepository, GetOrdersRepository {
  async createOrder(orderData: CreateOrderRepository.Request): Promise<any> {
    const { userId, note } = orderData;
    const status = orderData.status as unknown as order_status_enum;
    const payment = orderData.payment as unknown as order_payment_enum;
    const creating = await prisma.order.create({
      data: {
        status,
        payment,
        paid: true,
        paidId: 101522,
        note,
        userId,
      },
    });
    const id = creating.id;
    return {
      orderNumber: id,
      paymentId: 305210,
      paymentStatus: true,
    };
  }

  async getOrderById(OrderId: string): Promise<OrderEntity> {
    const data = await prisma.order.findUnique({
      where: { id: OrderId },
    });
    const orderProducts = await this.preloadProducts(OrderId);
    const orders = { ...data, orderProducts };
    return {
      id: orders.id,
      userId: orders.userId,
      note: orders.note,
      orderProducts: orderProducts,
      payment: orders.payment,
      status: orders.status,
      paid: orders.paid,
      paidId: orders.paidId,
    };
  }
  getOrderByFilters(queryString: GetOrderByFiltersRepository.Request): Promise<OrderEntity[]> {
    const { status } = queryString;
    const filter = status as unknown as order_status_enum;
    const data = prisma.order.findMany({
      where: { status: filter },
      include: { orderProducts: true },
    });
    return data;
  }
  updateOrder(params: UpdateOrderRepository.Request): Promise<OrderEntity> {
    const { orderId, orderData } = params;
    return prisma.order.update({
      where: { id: orderId },
      data: {
        userId: orderData.userId,
        note: orderData.note,
        orderProducts: orderData.orderProducts as unknown as any,
        payment: orderData.payment as unknown as order_payment_enum,
        status: orderData.status as unknown as order_status_enum,
        paid: orderData.paid,
        paidId: orderData.paidId,
      },
    });
  }
  async deleteOrder(orderId: string): Promise<void> {
    const removes = await this.removeProductsOrders(orderId);
    if (!removes) {
      throw new Error('Error to remove products from order');
    }
    await prisma.order.delete({
      where: { id: orderId },
    });
  }
  async removeProductsOrders(orderId: string) {
    const dataRemove = await prisma.orderProduct.deleteMany({
      where: { orderId: orderId },
    });
    if (!dataRemove) {
      throw new Error('Error to remove products from order');
    }
    return dataRemove;
  }

  async getOrders(params: GetOrdersRepository.Request): Promise<GetOrdersRepository.Response> {
    const { page, paginationLimit } = params;
    const data = await prisma.order.findMany({
      include: { orderProducts: true },
    });
    const total = await prisma.order.count();
    const totalPages = Math.ceil(total / paginationLimit);
    return { data, page, total, totalPages };
  }

  async preloadProducts(order: string) {
    const orderProducts = await prisma.orderProduct.findMany({
      where: { orderId: order },
    });
    return orderProducts;
  }
}
