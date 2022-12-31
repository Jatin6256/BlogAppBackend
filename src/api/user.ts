

import { Express, Request, Response } from "express"
import { nextTick } from "process";
import { AuthorizedRequest, ILoginPayload, IUserPayload } from "../interface";
import UserService from "../services/user";
import { success } from "../utils/apiResponse";
import { STATUS_CODES } from "../utils/cosntants";
import APIError from "../utils/errorHandler";
import { checkAuthorizationToken } from "./middlewares/auth";


const User = (app: Express) => {

    const userService = new UserService();
    app.get("/api/user/:id", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {


        try{
            console.log("Get User By Id: ")
            const { id } = req.params;
            console.log(id, req.user);
            if(!id || id != req.user.id){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "Invalid User Id")
            }
    
            const userData = await userService.getUser(req.user.id);
            // const userData = {
            //     id: req.user.id,
            //     name: req.user.name,
            //     userName: req.user.userName,
            //     email: req.user.email,
            // }
            success(res, userData);
        }catch(err){
            next(err);
        }

    });
}

export default User;