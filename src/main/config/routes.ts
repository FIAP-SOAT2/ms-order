import { Express, Router } from 'express';
import healthyRouter from '../routes/healthcheck';
import orderRouter from '../routes/order-routes';
import swaggerRoutes from '../doc/swagger-config';

export default (app: Express): void => {
  const router = Router();
  app.use('/', swaggerRoutes);
  app.use('/api', router);
  healthyRouter(router);
  orderRouter(router);
};
