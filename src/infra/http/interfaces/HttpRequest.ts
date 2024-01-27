export type HttpRequest<TBody = any, TParams = any, TQuery = any, THeaders = any> = {
  body?: TBody;
  query?: TQuery;
  params?: TParams;
  headers?: THeaders;
  userId?: string;
};
