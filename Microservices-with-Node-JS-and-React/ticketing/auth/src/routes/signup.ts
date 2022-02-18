import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { STATUS_CODE } from '../utils';
import { RequestError } from '../errors/request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response,
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new RequestError({
        message: 'Email already exists',
        statusCodeName: 'UNPROCESSABLE_ENTITY',
      });
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(STATUS_CODE.CREATED).send(user);
  },
);

export { router as signupRouter };
