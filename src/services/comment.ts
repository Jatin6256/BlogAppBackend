import UserRepository from "../database/repository/user";
import { ICommentPayload, ILoginPayload, IPostPayload, IPostUpdatePayload, IUserPayload } from "../interface";
import bcrypt from "bcrypt"
import APIError from "../utils/errorHandler";
import { STATUS_CODES } from "../utils/cosntants";
import jwt from "jsonwebtoken"
import { genertateHashedPassword } from "../utils/helper";
import PostRepository from "../database/repository/post";
import CommentRepository from "../database/repository/comment";
class CommentService{
    repository: CommentRepository

    constructor() {
        this.repository = new CommentRepository();
    }

    async createNewComment(commentData: ICommentPayload){
        try{

            const newComment = await this.repository.createNewComment(commentData);
            return newComment;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async updateComment(newContent: string, postId: number){
        try{

            const res = await this.repository.updateComment(newContent, postId);
            return res;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async getCommentById(commentId: number){
        try{

            const foundComment = await this.repository.getCommentById(commentId);
            return foundComment;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

    async deleteComment(commentId: number){
        try{

            const deleteCommentRes = await this.repository.deleteComment(commentId);
            return deleteCommentRes;

        }catch(err){
            if(err instanceof APIError)
                throw err;

            throw new APIError("Server Erorr", STATUS_CODES.INTERNAL_ERROR, "Something Went Wrong");
        }
    }

}

export default CommentService;