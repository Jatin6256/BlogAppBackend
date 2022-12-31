

import { Express, Request, Response } from "express"
import { AuthorizedRequest, ILoginPayload, IUserPayload } from "../interface";
import PostService from "../services/post";
import UserService from "../services/user";
import { success } from "../utils/apiResponse";
import { STATUS_CODES } from "../utils/cosntants";
import APIError from "../utils/errorHandler";
import { checkAuthorizationToken } from "./middlewares/auth";


const Post = (app: Express) => {

    const postService = new PostService();
    app.post("/api/posts", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{
            console.log("Create Post");
            const { title, content, category, keywords} = req.body;
            
            if(!title || !content){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "Missing required field");
            }

            const newPost = await postService.createNewPost({title, content, keywords, category, userId: req.user.id});
            success(res, newPost, "Successfully created Post");
        }catch(err){
            next(err);
        }
    });

    app.put("/api/posts/:postId", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{
            console.log("Update Post");
            const { title, content, category, keywords} = req.body;
            const postId: any = req.params.postId;
            
            if(isNaN(parseInt(postId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Post Id");
            }
            if(!title && !content && !keywords && !category){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "You are not allowed to update this fields");
            }

            const foundPost = await postService.getPostById(postId);
            if(!foundPost){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "Invalid Post Id");
            }

            const updateRes = await postService.updatePost({title, content, keywords, category}, postId);
            success(res, updateRes, "Successfully Updated Post");
        }catch(err){
            next(err);
        }
    });

    app.get("/api/posts/:postId", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{

            const postId: any = req.params.postId;
            
            if(isNaN(parseInt(postId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Post Id");
            }

            const foundPost = await postService.getPostById(postId);
            if(!foundPost){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "No Post Exit with the given postId");
            }

            success(res, foundPost, "Successfully Found Post");
        }catch(err){
            next(err);
        }
    });


    app.get("/api/posts/", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{


            const { orderBy, limit, offset}:any = req.query;
            const foundPosts = await postService.getAllPosts(orderBy, limit, offset);


            success(res, foundPosts, "Successfully Found Posts");
        }catch(err){
            next(err);
        }
    });

    app.delete("/api/posts/:postId", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{

            const postId: any = req.params.postId;
            
            if(isNaN(parseInt(postId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Post Id");
            }

            const deleteRes = await postService.deletePost(postId);

            success(res, deleteRes, "Successfully Deleted Post");
        }catch(err){
            next(err);
        }
    });

    app.post("/api/like", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{

            const { postId } = req.body;

            if(isNaN(parseInt(postId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Post Id");
            }

            const foundPost = await postService.getPostById(parseInt(postId));
            if(!foundPost){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "No Post Exit with the given postId");
            }
            const likePostRes = await postService.likePost(postId, req.user.id); 
            success(res, foundPost, "Successfully Liked Post");
        }catch(err){
            next(err);
        }
    });

    app.post("/api/unlike", checkAuthorizationToken, async (req: AuthorizedRequest, res: Response, next: any) => {
        try{

            const { postId } = req.body;

            if(isNaN(parseInt(postId))){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "invalid Post Id");
            }

            const foundPost = await postService.getPostById(parseInt(postId));
            if(!foundPost){
                throw new APIError("Bad Request", STATUS_CODES.BAD_REQUEST, "No Post Exit with the given postId");
            }

            const likePostRes = await postService.unlikePost(postId, req.user.id); 
            success(res, foundPost, "Successfully Unliked Post");
        }catch(err){
            next(err);
        }
    });
}

export default Post;