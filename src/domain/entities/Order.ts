import { OrderProductsEntity } from '@domain/entities/OrderProducts';
import { order_payment_enum, order_status_enum } from '@prisma/client';

export class IOrderDomain {
  id: string;
  userId: number;
  note: string;
  orderProducts?: OrderProductsEntity[];
  payment?: order_payment_enum | string;
  status: order_status_enum | string;
  paid?: boolean;
  paidId?: number;
}

export class OrderEntity implements IOrderDomain {
  id: string;
  userId: number;
  note: string;
  orderProducts?: OrderProductsEntity[];
  payment?: order_payment_enum | string;
  status: order_status_enum | string;
  paid?: boolean;
  paidId?: number;

  constructor(props: IOrderDomain) {
    this.id = props.id;
    this.userId = props.userId;
    this.note = props.note;
    this.orderProducts = props.orderProducts;
    this.payment = props.payment;
    this.status = props.status;
    this.paid = props.paid;
    this.paidId = props.paidId;
  }

  static create(props: IOrderDomain): OrderEntity {
    return new OrderEntity(props);
  }
}
