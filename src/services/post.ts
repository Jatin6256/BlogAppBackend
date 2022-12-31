import UserRepository from "../database/repository/user";
import { ILoginPayload, IPostPayload, IPostUpdatePayload, IUserPayload } from "../interface";
import bcrypt from "bcrypt"
import APIError from "../utils/errorHandler";
import { STATUS_CODES } from "../utils/cosntants";
import jwt from "jsonwebtoken"
import { genertateHashedPassword } from "../utils/helper";
import PostRepository from "../database/repository/post";
class PostService{
    repository: PostRepository

    constructor() {
        this.repository = new PostRepository();
    }

    async createNewPost(postData: IPostPayload){
        try{

            const newPost = await this.repository.createNewPost(postData);
            return newPost;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async updatePost(postData: IPostUpdatePayload, postId: number){
        try{

            const newPost = await this.repository.updatePost(postData, postId);
            return newPost;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async getPostById(postId: number){
        try{

            const foundPost = await this.repository.getPostById(postId);
            return foundPost;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async getAllPosts(orderBy: string, limit?: number, offset?: number){
        try{

            const foundPosts = await this.repository.getAllPosts(orderBy, limit, offset);
            return foundPosts;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }


    async deletePost(postId: number){
        try{

            const foundPost = await this.repository.deletePost(postId);
            return foundPost;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async likePost(postId: number, userId: number){
        try{

            const res = await this.repository.likePost(postId, userId);
            return res;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async unlikePost(postId: number, userId: number){
        try{

            const res = await this.repository.unlikePost(postId, userId);
            return res;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }
}

export default PostService;