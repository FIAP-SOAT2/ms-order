import { NextFunction, Request, Response } from 'express';
import { BaseMiddlewareHttp } from '@infra/http/middlewares/BaseMiddlewareHttp';
import { HttpRequest } from '../../infra/http/interfaces/HttpRequest';

export const expressMiddlewareAdapter = (middleware: BaseMiddlewareHttp) => async (req: Request, res: Response, next: NextFunction) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    headers: req.headers,
  };
  const httpResponse = await middleware.handle(httpRequest);
  if (httpResponse.statusCode === 200) {
    Object.assign(req, httpResponse.body);
    next();
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body?.message,
    });
  }
};
