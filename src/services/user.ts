import UserRepository from "../database/repository/user";
import { ILoginPayload, IUserPayload } from "../interface";
import bcrypt from "bcrypt"
import APIError from "../utils/errorHandler";
import { STATUS_CODES } from "../utils/cosntants";
import jwt from "jsonwebtoken"
import { genertateHashedPassword } from "../utils/helper";
class UserService{
    repository: UserRepository

    constructor() {
        this.repository = new UserRepository();
    }

    async register(userData: IUserPayload){
        try{
            const hashedPassword = await genertateHashedPassword(userData.password);
            let foundUser = await this.repository.findUserByUserName(userData.userName);
            console.log("foundUser: ", foundUser);
            if(foundUser){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "User already Exist");
            }
            return this.repository.createUser({...userData, password: hashedPassword});


        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async login({userName, password}: ILoginPayload) {
        try{
            
            let foundUser: any = await this.repository.findUserByUserName(userName);
            if(!foundUser){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "User Not Found");
            }


            let isPasswordMatched: boolean = await bcrypt.compare(password, foundUser.password);
            console.log("isPasswordMatched: ",isPasswordMatched);
            if(!isPasswordMatched){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "Incorrect Password");
            }

            let payload = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                userName: foundUser.userName,
            };

            let token = await jwt.sign( payload, process.env.SECRET_KEY || "", { expiresIn: 3*60*60 });
            console.log("token: ", token);

            return { ...payload, token}

        }catch(err){
            if(err instanceof APIError)
                throw err;
            
            console.log("login err:: ", err);
            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }   
    }


    async getUser(userId: number){
        try{

            const foundUser = await this.repository.getUser(userId);
            return foundUser;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }
}

export default UserService;