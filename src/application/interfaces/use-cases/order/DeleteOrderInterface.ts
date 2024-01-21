import { UseCase } from '../UseCase';

export interface DeleteOrderInterface extends UseCase<DeleteOrderInterface.Request, DeleteOrderInterface.Response> {
  execute(orderId: DeleteOrderInterface.Request): Promise<DeleteOrderInterface.Response>;
}

export namespace DeleteOrderInterface {
  export type Request = string;
  export type Response = void;
}
