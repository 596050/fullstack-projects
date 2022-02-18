import { STATUS_CODE } from '../utils';
import { CustomError } from './custom-error';

export class RequestError extends CustomError {
  statusCode = STATUS_CODE.BAD_REQUEST;

  constructor(
    public args: {
      message: string;
      statusCodeName?: keyof typeof STATUS_CODE;
    },
  ) {
    super(args.message);
    // because we are extending a built in class
    Object.setPrototypeOf(this, RequestError.prototype);
    if (args.statusCodeName) {
      ({ [args.statusCodeName]: this.statusCode } = STATUS_CODE);
    }
  }

  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
