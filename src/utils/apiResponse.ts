import { Response } from 'express';
import APIError from './errorHandler';

const success = (res: Response, data: any, message?: string, statusCode?: number) => {
  res.status(statusCode ? statusCode : 200).send({
    data: data,
    message: message,
  });
};

const error = (res: Response, error: any, message?: string) => {
  res.status(error?.statusCode ? error?.statusCode : 500).send({
    err: error,
    message: message
  });
};
export { success, error };