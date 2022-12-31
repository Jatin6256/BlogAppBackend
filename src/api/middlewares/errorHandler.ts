import { Request, Response } from "express";
import APIError from "../../utils/errorHandler";
import { error } from "../../utils/apiResponse";

function errorHandler(err: any, req: Request, res: Response, next: any){
    if(err instanceof APIError){
      console.log("logging API Error: ")
      err.logError();
      error(res,err.getErrorData());    
    }else{
      console.log("logging Error: ")
      error(res, err, "Something Went Wrong");
    }
  
}

export default errorHandler;