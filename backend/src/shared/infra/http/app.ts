import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
const app = express();
import '../typeorm';
import { router } from './routes/router';
import { AppError } from '../../Errors/AppError';

app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };