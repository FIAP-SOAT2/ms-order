import { BaseController } from '../../../../../infra/http/controllers/BaseController';
import { GetOrderByFiltersController } from '../../../../../infra/http/controllers/order/GetOrderByFiltersController';
import { makeGetOrderByFilters } from '../../../use-cases/order/get-order-by-filters-factory';
import { makeGetOrderByFiltersValidation } from '../../../../../main/factories/controllers/order/get-order-by-filters/validation-factory';

export const makeGetOrderByFiltersController = (): BaseController => {
  const validation = makeGetOrderByFiltersValidation();
  const getOrderByFiltersUseCase = makeGetOrderByFilters();
  return new GetOrderByFiltersController(validation, getOrderByFiltersUseCase);
};
