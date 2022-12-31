
import { IPostPayload, IPostUpdatePayload, IUserPayload } from "../../interface";
import User from "../models/user";
import bcrypt from "bcrypt"
import APIError from "../../utils/errorHandler";
import { STATUS_CODES } from "../../utils/cosntants";
import Post from "../models/post";
import Comment from "../models/comments";
import UserLikedPostRelation from "../models/userLikedPost";
import UserUnlikedPostRelation from "../models/userUnlikedPost";
import { sequelize } from "../connect";
import { Op } from "sequelize";


class PostRepository{

    async createNewPost({title, content, keywords, category, userId}: IPostPayload){
        try {
            const newPost = await Post.create({title, content, keywords, category, userId});
            console.log(newPost.toJSON());
            return newPost;
        }catch(err){
            console.log("Creating Post err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async updatePost({title, content, keywords, category}: IPostUpdatePayload, postId: number){
        try {
            const res = await Post.update({title, content, keywords, category},{
                where:{
                    id: postId
                }
            });
            console.log(res);
            return res;
        }catch(err){
            console.log("Updating Post err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async getPostById(postId: number){
        try {
            const foundPost = await Post.findOne({where:{id: postId}, include: Comment});
            console.log("foundPost", foundPost);
            return foundPost;
        }catch(err){
            console.log("Finding Post By Id err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async getAllPosts(orderBy?: string, limit?: number, offset?: number){
        try {

            let order: any = [];
            if(orderBy == 'likes'){
                order = [[ 'like', 'DESC']];
            }else if(orderBy == 'recent'){
                order = [['createdAt', 'DESC']];
            }

            console.log(order);

            const foundPosts = await Post.findAll({include: Comment, order: order, limit: limit, offset: offset});
            console.log("foundPost", foundPosts);
            return foundPosts;
        }catch(err){
            console.log("Finding Post By Id err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async deletePost(postId: number){
        try {
            const deleteRes = await Post.destroy({where:{id: postId}});
            console.log("deleteRes", deleteRes);
            return deleteRes;
        }catch(err){
            console.log("Delete Post By Id err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }


    async likePost(postId: number, userId: number){
        try {
            const resFound = await UserLikedPostRelation.findOne({where:{
                postId: postId,
                userId: userId
            }});

            if(resFound){
                const res = await Post.decrement({like: 1},{where:{id: postId}});
                const newRel = await UserLikedPostRelation.destroy({where: {
                    userId: userId,
                    postId: postId
                }});
                console.log("incrementLike", res);
                return res;                  
            }else{
                const res = await Post.increment({like: 1},{where:{id: postId}});
                const newRel = await UserLikedPostRelation.create({userId, postId});
                console.log("incrementLike", res);
                return res;
            }
        }catch(err){
            console.log("incrementLike err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

    async unlikePost(postId: number, userId: number){
        try {
            const resFound = await UserUnlikedPostRelation.findOne({where:{
                postId: postId,
                userId: userId
            }});

            if(resFound){
                const res = await Post.decrement({unlike: 1},{where:{id: postId}});
                const newRel = await UserUnlikedPostRelation.destroy({where: {
                    userId: userId,
                    postId: postId
                }});
                console.log("incrementLike", res);
                return res;       
            }else{
                const res = await Post.increment({unlike: 1},{where:{id: postId}});
                const newRel = await UserUnlikedPostRelation.create({userId, postId});
                console.log("incrementLike", res);
                return res;                
            }
        }catch(err){
            console.log("incrementLike err:", err);
            throw new APIError("Internal Server Error",STATUS_CODES.INTERNAL_ERROR , "Something Went Wrong");
        }
        
    }

};

export default PostRepository;