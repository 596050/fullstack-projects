import { STATUS_CODE } from '../utils';
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;

  constructor() {
    super('DatabaseConnectionError');
    // because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
