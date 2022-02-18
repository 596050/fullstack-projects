import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../utils';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({
    errors: [
      {
        message: err.message || 'Something went wrong',
      },
    ],
  });
};
