

import { Express, Request, Response } from "express"
import { AuthorizedRequest, ILoginPayload, IUserPayload } from "../interface";
import CommentService from "../services/comment";
import PostService from "../services/post";
import UserService from "../services/user";
import { success } from "../utils/apiResponse";
import { STATUS_CODES } from "../utils/cosntants";
import APIError from "../utils/errorHandler";
import { checkAuthorizationToken } from "./middlewares/auth";


const Comment = (app: Express) => {

    const commentService = new CommentService();
    const postService = new PostService();

    app.post("/api/comments", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{
            console.log("Create Comment");
            const { content, postId }: any = req.body;

            if(isNaN(parseInt(postId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Post Id");
            }

            const foundPost = await postService.getPostById(postId);
            if(!foundPost){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "Invalid Post Id");
            }


            if(!content){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "Missing required field");
            }

            const newComment = await commentService.createNewComment({postId, content, userId: req.user.id});
            success(res, newComment, "Successfully created Comment");
        }catch(err){
            next(err);
        }
    });

    app.put("/api/comments/:commentId", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{
            console.log("Update Post");
            const { content} = req.body;
            const commentId: any = req.params.commentId;
            
            if(isNaN(parseInt(commentId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Comment Id");
            }
            if(!content){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "You are not allowed to update this fields");
            }

            const foundComment = await commentService.getCommentById(commentId);
            if(!foundComment){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "Invalid Comment Id");
            }

            const updateRes = await commentService.updateComment(content, commentId);
            success(res, updateRes, "Successfully Updated Post");
        }catch(err){
            next(err);
        }
    });

    app.get("/api/comments/:commentId", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{

            const commentId: any = req.params.commentId;
            
            if(isNaN(parseInt(commentId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Comment Id");
            }

            const foundComment = await commentService.getCommentById(commentId);
            if(!foundComment){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "No Comment Exit with the given commentId");
            }

            success(res, foundComment, "Successfully Found Comment");
        }catch(err){
            next(err);
        }

    
    });


    app.delete("/api/comments/:commentId", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{

            const commentId: any = req.params.commentId;
            
            if(isNaN(parseInt(commentId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Comment Id");
            }

            const deleteCommentRes = await commentService.deleteComment(commentId);
     

            success(res, deleteCommentRes, "Successfully Deleted Comment");
        }catch(err){
            next(err);
        }

    
    });




}

export default Comment;