import { Express, Request, Response } from "express"
import { nextTick } from "process";
import { AuthorizedRequest, ILoginPayload, IUserPayload } from "../interface";
import UserService from "../services/user";
import { success } from "../utils/apiResponse";
import { STATUS_CODES } from "../utils/cosntants";
import APIError from "../utils/errorHandler";
import { checkAuthorizationToken } from "./middlewares/auth";


const Auth = (app: Express) => {

    const userService = new UserService();
    app.get("/", checkAuthorizationToken, (req: AuthorizedRequest, res: Response, next: any) => {

        success(res, req.user);

    });

    app.post("/api/signup", async (req: Request, res: Response, next: any) => {

        console.log("Register: ");
        try{
            let userInput: IUserPayload = req.body;
            if(!userInput || !userInput?.password || !userInput?.userName || !userInput?.email || !userInput?.name){
                throw new APIError("Validation Error", STATUS_CODES.BAD_REQUEST, "Missing required fields"); 
            }

            if(userInput?.password.length <= 5){
                throw new APIError("Validation Error", STATUS_CODES.BAD_REQUEST, "Password length must be greater than 5"); 
            }
            console.log("userInput:", userInput);
            const newUser = await userService.register(userInput);
            success(res, newUser,"Successfully Registered User")
        }catch(err){
            console.log(err);
            next(err);
        }
        

    });

    app.post("/api/login", async (req: Request, res: Response, next: any) => {

        console.log("Login: ");
        try{
            let userInput: ILoginPayload = req.body;
            if(!userInput || !userInput?.password || !userInput?.userName){
                throw new APIError("Validation Error", STATUS_CODES.BAD_REQUEST, "Missing required fields"); 
            }



            console.log("userInput:", userInput);
            const loggedInUser = await userService.login(userInput);
            console.log("loggedInUser:", loggedInUser);
            success(res, loggedInUser,"Successfully Logged In User")
        }catch(err){

            console.log(err)
            next(err);
        }
        

    });
}

export default Auth;