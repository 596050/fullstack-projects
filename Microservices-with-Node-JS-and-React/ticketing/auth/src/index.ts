import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async (port: number) => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (err) {
    console.error(err);
  }
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start(PORT);
