import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { AuthorizedRequest } from '../../interface';
import { error } from '../../utils/apiResponse';
import { STATUS_CODES } from '../../utils/cosntants';
import APIError from '../../utils/errorHandler';

export const checkAuthorizationToken = async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  try {
    const signature = req.header('Authorization');
    console.log("signature:: ", signature);
  
    if (signature) {
      console.log("verifying token:: ", process.env.SECRET_KEY);
      const payload = await jwt.verify(signature, process.env.SECRET_KEY || "");
      console.log("payload: ", payload)
      req.user = payload;
      return next();
    }
    
    error(res, {
        name: "Unauthorized Request",
        statusCode: 400,
    }, "Missing Token");

  } catch (err) {
    console.log("err: ", err)
    error(res, {
        name: "Unauthorized Request",
        statusCode: 400,
    }, "Invalid Token")
    // throw new APIError("Unauthorized Request", STATUS_CODES.UN_AUTHORISED, "Invalid Token");
  }
};
