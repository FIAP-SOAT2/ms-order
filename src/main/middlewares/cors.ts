import { Request, Response, NextFunction } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.removeHeader('X-Powered-By');
  res.set('Content-Security-Policy', 'form-action');
  res.set('X-Content-Type-Options', 'nosniff');
  next();
};
