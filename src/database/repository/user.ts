
import { IUserPayload } from "../../interface";
import User from "../models/user";
import bcrypt from "bcrypt"
import APIError from "../../utils/errorHandler";
import { STATUS_CODES } from "../../utils/cosntants";
import Post from "../models/post";


class UserRepository{

    async createUser({name, email, userName, password}: IUserPayload){
        try {
            const newUser = await User.create({name, email, userName, password});
            console.log(newUser.toJSON());
            return newUser;
        }catch(err){
            console.log("register err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async findUserByUserName(userName: string){

        try{
            console.log("findUserByUserName:");
            const foundUser = await User.findOne({where:{ userName: userName}});
            console.log("foundUser:",foundUser);
            return foundUser; 
        }catch(err){
            console.log(err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
    }

    async getUser(userId: number){

        try{
            const foundUser = await User.findOne({where:{ id: userId}, include: Post});
            console.log("foundUser:",foundUser);
            return foundUser; 
        }catch(err){
            console.log(err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
    }
};

export default UserRepository;