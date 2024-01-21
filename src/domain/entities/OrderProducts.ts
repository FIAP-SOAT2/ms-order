export class IorderProductsDomain {
  orderId: string;
  productId: number;
  quantity: number;
  price: number;
}

export class OrderProductsEntity implements IorderProductsDomain {
  orderId: string;
  productId: number;
  quantity: number;
  price: number;

  constructor(props: IorderProductsDomain) {
    this.orderId = props.orderId;
    this.productId = props.productId;
    this.quantity = props.quantity;
    this.price = props.price;
  }

  static create(props: IorderProductsDomain): OrderProductsEntity {
    return new OrderProductsEntity(props);
  }
}
