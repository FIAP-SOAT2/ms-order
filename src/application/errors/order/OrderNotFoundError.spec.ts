import { OrderNotFoundError } from "./OrderNotFoundError";

describe('OrderNotFoundError', () => {
  it('should create an instance of OrderNotFoundError', () => {
    const orderNotFoundError = new OrderNotFoundError();
    expect(orderNotFoundError).toBeInstanceOf(OrderNotFoundError);
  });

  it('should have the correct name', () => {
    const orderNotFoundError = new OrderNotFoundError();
    expect(orderNotFoundError.name).toEqual('OrderNotFoundError');
  });

  it('should have the correct error message', () => {
    const orderNotFoundError = new OrderNotFoundError();
    expect(orderNotFoundError.message).toEqual('The Order was not found');
  });

  it('should have the correct stack trace', () => {
    const orderNotFoundError = new OrderNotFoundError();
    expect(orderNotFoundError.stack).toBeDefined();
  });
});
