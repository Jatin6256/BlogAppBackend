
import { ICommentPayload, IPostPayload, IPostUpdatePayload, IUserPayload } from "../../interface";
import User from "../models/user";
import bcrypt from "bcrypt"
import APIError from "../../utils/errorHandler";
import { STATUS_CODES } from "../../utils/cosntants";
import Post from "../models/post";
import Comment from "../models/comments";


class CommentRepository{

    async createNewComment({content, postId, userId}: ICommentPayload){
        try {
            const newComment = await Comment.create({postId, userId, content});
            console.log(newComment.toJSON());
            return newComment;
        }catch(err){
            console.log("Creating Comment err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async updateComment(newContent: string, commentId: number){
        try {
            const res = await Comment.update({content: newContent},{
                where:{
                    id: commentId
                }
            });
            console.log(res);
            return res;
        }catch(err){
            console.log("Updating Comment err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async getCommentById(commentId: number){
        try {
            const foundComment = await Comment.findOne({where:{id: commentId}});
            console.log("foundComment", foundComment);
            return foundComment;
        }catch(err){
            console.log("Finding CommentBy Id err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async deleteComment(commentId: number){
        try {
            const res = await Comment.destroy({where:{id: commentId}});
            console.log("deleteComment", res);
            return res;
        }catch(err){
            console.log("Finding CommentBy Id err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }
};

export default CommentRepository;