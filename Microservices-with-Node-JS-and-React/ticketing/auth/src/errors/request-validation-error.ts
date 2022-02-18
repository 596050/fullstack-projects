import { ValidationError } from 'express-validator';
import { STATUS_CODE } from '../utils';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = STATUS_CODE.BAD_REQUEST;
  constructor(public errors: ValidationError[]) {
    super('RequestValidationError');
    // because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return {
        message: err.msg,
        field: err.param,
      };
    });
  }
}
