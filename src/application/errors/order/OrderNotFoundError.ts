export class OrderNotFoundError extends Error {
  constructor() {
    super('The Order was not found');
    this.name = 'OrderNotFoundError';
  }
}
