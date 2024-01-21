import { Router } from 'express';
import { expressRouteAdapter } from '../../main/adapters/express-route-adapter';
import { makeCreateOrderController } from '../factories/controllers/order/create-order/controller-factory';
import { makeGetOrdersController } from '../factories/controllers/order/get-orders/controller-factory';
import { makeGetOrderByIdController } from '../factories/controllers/order/get-order-by-id/controller-factory';
import { makeGetOrderByFiltersController } from '../factories/controllers/order/get-order-by-filters/controller-factory';
import { makeUpdateOrderController } from '../factories/controllers/order/update-order/controller-factory';
import { makeDeleteOrderController } from '../factories/controllers/order/delete-order/controller-factory';

export default (router: Router): void => {
  router.post('/order/', expressRouteAdapter(makeCreateOrderController()));
  router.get('/order/', expressRouteAdapter(makeGetOrdersController()));
  router.get('/order/filters', expressRouteAdapter(makeGetOrderByFiltersController()));
  router.get('/order/:id', expressRouteAdapter(makeGetOrderByIdController()));
  router.patch('/order/:id', expressRouteAdapter(makeUpdateOrderController()));
  router.delete('/order/:id', expressRouteAdapter(makeDeleteOrderController()));
};
